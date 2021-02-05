/*
 * @文件描述: 自动生成cocoJSON数据集
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2021-02-02 15:35:29
 * @LastEditors: 廖军
 * @LastEditTime: 2021-02-05 14:23:20
 */

import * as puppeteer from 'puppeteer';
import { SerializableOrJSHandle } from 'puppeteer';
import { JSDOM } from 'jsdom';
import { existsSync, mkdirSync } from 'fs';
import createPageHtml from './createPageHtml';
import { CLASSES, PAGE_HEIGHT, PAGE_WIDTH, FOLDER_NAME, reWriteFile } from './constants';
import { CocoJSON } from './interfaces';

const dom = new JSDOM(`<!DOCTYPE html>`);
globalThis.window = (dom.window as unknown) as Window & typeof globalThis;
globalThis.document = window.document;
globalThis.cancelAnimationFrame = () => {};

const cocoJSON: CocoJSON = {
	info: {
		year: '2021',
		version: '1',
		description: 'UI组件coco数据集自动生成与标注ui',
		contributor: '廖君',
		url: 'https://github.com/aisriver/ui-auto-label',
		date_created: new Date().toUTCString(),
	},
	licenses: [
		{
			id: 1,
			url: 'https://creativecommons.org/publicdomain/zero/1.0/',
			name: 'Public Domain',
		},
	],
	categories: Object.keys(CLASSES).map(key => ({
		id: CLASSES[key].id,
		name: CLASSES[key].name,
		supercategory: 'ui',
	})),
	images: [],
	annotations: [],
};

(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	page.setViewport({ width: PAGE_WIDTH, height: PAGE_HEIGHT });
	// 检查根目录是否有写入目录
	if (!existsSync(`./${FOLDER_NAME}`)) {
		mkdirSync(`./${FOLDER_NAME}`);
	}
	const htmlPages = await createPageHtml();
	let annotationId = 0;
	for (let i = 0; i < htmlPages.length; i += 1) {
		const { html, file_name, anonymous, image_id } = htmlPages[i];
		await page.setContent(html);
		cocoJSON.images.push({
			id: image_id,
			license: 1,
			file_name,
			height: PAGE_HEIGHT,
			width: PAGE_WIDTH,
			date_captured: new Date().toUTCString(),
		});
		// 自动标注
		for (let n = 0; n < anonymous.length; n += 1) {
			const item = anonymous[n];
			const { x, y, width, height } = await page.evaluate(item => {
				const { x, y, width, height } = document.getElementById(item.id).getBoundingClientRect();
				return {
					x,
					y,
					width,
					height,
				};
			}, (item as unknown) as SerializableOrJSHandle);
			// 预留2个像素的标注空隙
			cocoJSON.annotations.push({
				...item,
				id: annotationId,
				bbox: [x - 2, y - 2, width + 4, height + 4],
				area: width * height,
			});
			annotationId += 1;
		}
		// 截屏并写入
		await page.screenshot({ path: `./${FOLDER_NAME}/${file_name}` });
	}
	// 写入cocoJSON
	reWriteFile(`./${FOLDER_NAME}/_annotations.coco.json`, JSON.stringify(cocoJSON));

	await browser.close();
})();
