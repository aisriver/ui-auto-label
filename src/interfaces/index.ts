/*
 * @文件描述: 定义
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2021-02-03 14:38:55
 * @LastEditors: 廖军
 * @LastEditTime: 2021-02-03 17:16:15
 */

import * as React from 'react';

export interface ObjectDetectionClass {
	name: string;
	id: number;
	displayName: string;
}

export interface ComponentNode {
	node: React.ReactNode;
	category_id: number;
	key: string;
}

export interface Annotations {
	id: string | number;
	image_id: number;
	category_id: number;
	bbox: number[];
	area: number;
	segmentation: number[];
	iscrowd: number;
}

export interface ImagesType {
	id: number;
	license: number;
	file_name: string;
	height: number;
	width: number;
	date_captured: string;
}

export interface CocoJSON {
	info: {
		year: string;
		version: string;
		description: string;
		contributor: string;
		url: string;
		date_created: string;
	};
	licenses: {
		id: number;
		url: string;
		name: string;
	}[];
	categories: {
		id: number;
		name: string;
		supercategory: string;
	}[];
	images: ImagesType[];
	annotations: Annotations[];
}
