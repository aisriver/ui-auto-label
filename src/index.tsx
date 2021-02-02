/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2021-02-02 15:35:29
 * @LastEditors: 廖军
 * @LastEditTime: 2021-02-02 17:02:45
 */

import * as puppeteer from 'puppeteer';
import * as React from 'react';
import { render } from 'react-dom';
import { JSDOM } from 'jsdom';

const dom = new JSDOM(`<!DOCTYPE html>`);
globalThis.window = (dom.window as unknown) as Window & typeof globalThis;
globalThis.document = window.document;

(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	page.setViewport({ width: 1000, height: 1000 });
	// 自定义渲染页面
	const pageDom = document.createElement('div');
	const dom = document.createElement('div');
	render(
		<div>
			<h1>ces</h1>
			<h2>欢迎使用 React</h2>
		</div>,
		dom
	);
	pageDom.appendChild(dom);
	await page.setContent(pageDom.innerHTML);
	// 截屏
	await page.screenshot({ path: './coco-ui/example.png' });

	await browser.close();
})();
