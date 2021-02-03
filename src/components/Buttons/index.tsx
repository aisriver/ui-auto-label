/*
 * @文件描述: 所以按钮标注组件
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2021-02-03 09:47:56
 * @LastEditors: 廖军
 * @LastEditTime: 2021-02-03 17:05:44
 */

import * as React from 'react';
import { Button } from 'antd';
import { DownloadOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { ButtonType } from 'antd/lib/button';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { COMPONENT_LABEL_NUMBER, getRandomColors, randomIndex, classIds } from '../../constants';
import { ComponentNode } from '../../interfaces';

const res: ComponentNode[] = [];

// 必要
const colors = getRandomColors();
const sizes = ['small', 'middle', 'large'];
const loadings = [true, false];

// 随机
const types = ['default', 'primary', 'ghost', 'dashed'];
const widths = [150, 250, 350, 450, 550, 650];
const icons = [<DownloadOutlined />, <SearchOutlined />, <PlusOutlined />];
const texts = ['提交', '新建', '删除', '取消', '确定', '提交审核', '发布', '取消发布', '搜索', '重置', '下载', '保存'];
const radius = [0, 2, 4, 6, 8, 10, 14, 16, 20];
const textLength = texts.length;

let num = 0;
for (let c = 0; c < colors.length; c += 1) {
	for (let s = 0; s < sizes.length; s += 1) {
		for (let l = 0; l < loadings.length; l += 1) {
			// 大于目标标注组件数量时终止
			if (num > COMPONENT_LABEL_NUMBER) {
				break;
			}
			const borderRadius = radius[randomIndex(0, 20)] || 0;
			const type = (types[randomIndex(0, 12)] || 'primary') as ButtonType;
			const style: React.CSSProperties = {
				borderColor: colors[c],
				margin: '10px',
				borderRadius: `${borderRadius}px`,
			};
			const width = widths[randomIndex(0, 20)];
			const icon = icons[randomIndex(0, 15)];
			if (width) {
				style.width = `${width}px`;
			}
			if (type === 'primary') {
				style.background = colors[c];
			}
			const key = `button-${c}-${s}-${l}`;
			res.push({
				category_id: classIds.button,
				key,
				node: (
					<Button
						id={key}
						key={key}
						style={style}
						type={type}
						size={sizes[s] as SizeType}
						loading={loadings[l]}
						icon={icon}
					>
						{texts[randomIndex(0, textLength)]}
					</Button>
				),
			});
			num += 1;
		}
	}
}

export default res;
