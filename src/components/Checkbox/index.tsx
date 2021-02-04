/*
 * @文件描述: checkbox
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2021-02-04 10:47:13
 * @LastEditors: 廖军
 * @LastEditTime: 2021-02-04 15:37:45
 */

import * as React from 'react';
import { Checkbox } from 'antd';
import { COMPONENT_LABEL_NUMBER, randomIndex, classIds } from '../../constants';
import { ComponentNode } from '../../interfaces';

export default async () => {
	const res: ComponentNode[] = [];

	// 必要
	const disabled = [true, false];
	const checked = [true, false];

	// 随机
	const texts = ['男', '女'];
	const textLength = texts.length;

	let num = 0;
	for (let s = 0; s < disabled.length; s += 1) {
		for (let l = 0; l < checked.length; l += 1) {
			// 大于目标标注组件数量时终止
			if (num > COMPONENT_LABEL_NUMBER) {
				break;
			}
			const style: React.CSSProperties = {
				margin: '10px',
			};
			const key = `checkbox-${s}-${l}`;
			res.push({
				category_id: classIds.button,
				key,
				node: (
					<Checkbox id={key} key={key} style={style} checked={checked[l]} disabled={disabled[s]}>
						{texts[randomIndex(0, textLength)]}
					</Checkbox>
				),
			});
			num += 1;
		}
	}

	return res;
};
