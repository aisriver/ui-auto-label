/*
 * @文件描述: 批量生成页面html
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2021-02-02 17:49:23
 * @LastEditors: 廖军
 * @LastEditTime: 2021-02-05 14:24:24
 */

import * as React from 'react';
import { render } from 'react-dom';
import { ConfigProvider } from 'antd';
import localeZh from 'antd/lib/locale/zh_CN';
import localeEn from 'antd/lib/locale/en_US';
import getButtons from './components/Buttons';
import getCheckbox from './components/Checkbox';
import getDatePicker from './components/DatePicker';
import { getCssByPrimaryColor, primaryColors, themes } from './constants';
import { Annotations, Theme } from './interfaces';

const locale = {
	zh: localeZh,
	en: localeEn,
};

export default async () => {
	const res: { file_name: string; html: string; image_id: number; anonymous: Annotations[] }[] = [];
	let image_id = 0;

	for (let i = 0; i < primaryColors.length; i += 1) {
		for (let n = 0; n < themes.length; n += 1) {
			image_id += 1;
			// 自定义渲染页面
			const pageDom = document.createElement('div');
			const dom = document.createElement('div');
			const buttons = await getButtons();
			const checkboxNodes = await getCheckbox();
			const datePickerNodes = await getDatePicker();
			const components = [...buttons.splice(0, 30), ...checkboxNodes, ...datePickerNodes];
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
				<ConfigProvider locale={Math.random() > 0.5 ? locale.zh : locale.en}>
					<div style={{ padding: '10px' }}>
						<style type="text/css">{getCssByPrimaryColor(primaryColors[i], themes[n] as Theme)}</style>
						<h1>ces</h1>
						<h2>欢迎使用 React</h2>
						{nodes}
					</div>
				</ConfigProvider>,
				dom
			);
			pageDom.appendChild(dom);
			res.push({ file_name: `page-${image_id}.png`, html: pageDom.innerHTML, image_id, anonymous });
		}
	}

	return res;
};
