/*
 * @文件描述: inputNumber
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2021-02-10 16:06:42
 * @LastEditors: 廖军
 * @LastEditTime: 2021-02-10 16:28:05
 */

import * as React from 'react';
import { InputNumber } from 'antd';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { COMPONENT_LABEL_NUMBER, classIds, randomIndex } from '../../constants';
import { ComponentNode } from '../../interfaces';

export default async () => {
	const res: ComponentNode[] = [];
	// 增加倍数
	const multiple = 4;

	// 必要
	const sizes = ['small', 'middle', 'large'];
	// disabled 效果与普通input无明显差异，暂不使用
	// const disabled = [true, false];

	// 随机

	let num = 0;
	for (let i = 0; i < multiple; i += 1) {
		for (let s = 0; s < sizes.length; s += 1) {
			// for (let l = 0; l < disabled.length; l += 1) {
			// 大于目标标注组件数量时终止
			if (num > COMPONENT_LABEL_NUMBER) {
				break;
			}
			const style: React.CSSProperties = {
				margin: '10px',
			};
			const key = `inputnumber-${i}-${s}`;
			res.push({
				category_id: classIds.inputnumber,
				key,
				node: (
					<InputNumber
						className={Math.random() > 0.5 ? 'ant-input-focused' : ''}
						id={key}
						key={key}
						style={style}
						size={sizes[s] as SizeType}
						// disabled={disabled[l]}
						value={Math.random() > 0.5 ? randomIndex(1, 10000) : null}
						formatter={value =>
							Math.random() > 0.5 && value
								? `${Math.random() > 0.5 ? '$' : '¥'} ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
								: '' + value
						}
					/>
				),
			});
			num += 1;
		}
		// }
	}
	return res;
};
