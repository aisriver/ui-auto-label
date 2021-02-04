/*
 * @文件描述: 批量生成页面html
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2021-02-02 17:49:23
 * @LastEditors: 廖军
 * @LastEditTime: 2021-02-04 15:12:09
 */

import * as React from 'react';
import { render } from 'react-dom';
import getButtons from './components/Buttons';
import { getCssByPrimaryColor, primaryColors } from './constants';
import { Annotations } from './interfaces';

export default async () => {
	const res: { file_name: string; html: string; image_id: number; anonymous: Annotations[] }[] = [];
	let image_id = 0;

	// 自定义渲染页面
	const pageDom = document.createElement('div');
	const dom = document.createElement('div');
	const buttons = await getButtons();
	const components = buttons.splice(0, 30);
	const anonymous: Annotations[] = [];
	const nodes: React.ReactNode[] = [];
	components.forEach(({ node, category_id, key }) => {
		anonymous.push({
			id: key,
			image_id,
			category_id,
			bbox: [],
			area: 0,
			segmentation: [],
			iscrowd: 0,
		});
		nodes.push(node);
	});
	render(
		<div style={{ padding: '10px' }}>
			<style type="text/css">{getCssByPrimaryColor(primaryColors[0], 'dark')}</style>
			<h1>ces</h1>
			<h2>欢迎使用 React</h2>
			{nodes}
		</div>,
		dom
	);
	pageDom.appendChild(dom);
	res.push({ file_name: 'page-1', html: pageDom.innerHTML, image_id, anonymous });

	return res;
};
