/*
 * @文件描述: DateRangePicker
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2021-02-05 15:00:42
 * @LastEditors: 廖军
 * @LastEditTime: 2021-02-05 15:35:25
 */

import * as React from 'react';
import { DatePicker } from 'antd';
import { COMPONENT_LABEL_NUMBER, classIds } from '../../constants';
import { ComponentNode, PanelMode } from '../../interfaces';

const { RangePicker } = DatePicker;

export default async () => {
	const res: ComponentNode[] = [];

	// 必要
	const pickers = ['date', 'week', 'month', 'quarter', 'year'];
	const disabled = [true, false];
	const bordered = [true, false];

	let num = 0;
	for (let m = 0; m < pickers.length; m += 1) {
		for (let s = 0; s < disabled.length; s += 1) {
			for (let l = 0; l < bordered.length; l += 1) {
				// 大于目标标注组件数量时终止
				if (num > COMPONENT_LABEL_NUMBER) {
					break;
				}
				const style: React.CSSProperties = {
					margin: '10px',
					display: 'inline-block',
				};
				const key = `daterangepicker-${m}-${s}-${l}`;
				res.push({
					category_id: classIds.daterangepicker,
					key,
					node: (
						<div id={key} key={key} style={style}>
							<RangePicker
								className={Math.random() > 0.5 ? 'ant-picker-focused' : ''}
								disabled={disabled[s]}
								bordered={bordered[l]}
								picker={pickers[m] as PanelMode}
							/>
						</div>
					),
				});
				num += 1;
			}
		}
	}

	return res;
};
