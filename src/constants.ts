/*
 * @文件描述: 公共变量及方法
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2021-02-02 17:55:44
 * @LastEditors: 廖军
 * @LastEditTime: 2021-02-05 14:22:31
 */

import { appendFileSync, existsSync, writeFileSync } from 'fs';
import {
	red,
	volcano,
	gold,
	yellow,
	lime,
	green,
	cyan,
	blue,
	geekblue,
	purple,
	magenta,
	grey,
} from '@ant-design/colors';
import { shuffle } from 'lodash';
import { ObjectDetectionClass, Theme } from './interfaces';
import { defaultCss } from './styles/css';
import { darkCss } from './styles/darkCss';

// 数据集分类
export const CLASSES: { [key: string]: ObjectDetectionClass } = {
	'1': { name: 'button', id: 1, displayName: 'button' },
	'2': { name: 'checkbox', id: 2, displayName: 'checkbox' },
	'3': { name: 'datepicker', id: 3, displayName: 'datepicker' },
	'4': { name: 'daterangepicker', id: 4, displayName: 'daterangepicker' },
	'5': { name: 'input', id: 5, displayName: 'input' },
	'6': { name: 'inputnumber', id: 6, displayName: 'inputnumber' },
	'7': { name: 'progress', id: 7, displayName: 'progress' },
	'8': { name: 'radio', id: 8, displayName: 'radio' },
	'9': { name: 'rate', id: 9, displayName: 'rate' },
	'10': { name: 'select', id: 10, displayName: 'select' },
	'11': { name: 'slider', id: 11, displayName: 'slider' },
	'12': { name: 'switch', id: 12, displayName: 'switch' },
	'13': { name: 'table', id: 13, displayName: 'table' },
	'14': { name: 'timepicker', id: 14, displayName: 'timepicker' },
	'15': { name: 'timerangepicker', id: 15, displayName: 'timerangepicker' },
	'16': { name: 'upload', id: 16, displayName: 'upload' },
};

// 分类 id 映射
export const classIds = (() => {
	const res: { [key: string]: number } = {};
	Object.keys(CLASSES).forEach(key => {
		res[CLASSES[key].name] = CLASSES[key].id;
	});
	return res;
})();

// 组件分类数量
export const CLASSES_NUMBERS = Object.keys(CLASSES).length;
// 单组件标注数量
export const COMPONENT_LABEL_NUMBER = 3000;
// 页面组件数量
export const PAGE_COMPONENT_NUMBER = 10;
// 页面数量
export const PAGE_NUMBER = (CLASSES_NUMBERS * COMPONENT_LABEL_NUMBER) / PAGE_COMPONENT_NUMBER;

// antd 色板
export const colors = [
	...red.slice(1, 10),
	...volcano.slice(1, 10),
	...gold.slice(1, 10),
	...yellow.slice(3, 10),
	...lime.slice(1, 10),
	...green.slice(1, 10),
	...cyan.slice(1, 10),
	...blue.slice(1, 10),
	...geekblue.slice(1, 10),
	...purple.slice(1, 10),
	...magenta.slice(1, 10),
	...grey.slice(1, 10),
]; // 11 * 10

// 主题色
export const primaryColors = [
	red.primary,
	volcano.primary,
	gold.primary,
	yellow.primary,
	lime.primary,
	green.primary,
	cyan.primary,
	blue.primary,
	geekblue.primary,
	purple.primary,
	magenta.primary,
	grey.primary,
];

export const themes = ['default', 'dark'];

/**
 * 基于色板的随机颜色
 */
export const getRandomColors = () => shuffle(colors);

/**
 * 指定区间随机数
 * @param min
 * @param max
 */
export const randomIndex = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

export const PAGE_WIDTH = 1000;

export const PAGE_HEIGHT = 1000;

export const FOLDER_NAME = 'coco-ui';

/**
 * 重写file
 * @param path
 * @param content
 */
export const reWriteFile = (path: string, content: string) => {
	if (existsSync(path)) {
		writeFileSync(path, content, 'utf8');
	} else {
		appendFileSync(path, content, 'utf8');
	}
};

export const themeCss = {
	default: { primaryColor: '#1890ff', css: defaultCss },
	dark: { primaryColor: '#177ddc', css: darkCss },
};

/**
 * 从主题色获取样式
 * @param color
 */
export const getCssByPrimaryColor = (color: string, theme: Theme) => {
	const { css, primaryColor } = themeCss[theme];
	const colors = [primaryColor, primaryColor.toLocaleUpperCase()];
	if (colors.includes(color)) {
		return css;
	}
	return css.replace(new RegExp(`(${colors.join('|')})`, 'g'), color);
};
