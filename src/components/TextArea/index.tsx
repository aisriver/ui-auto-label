/*
 * @文件描述: TextArea
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2021-02-07 10:33:03
 * @LastEditors: 廖军
 * @LastEditTime: 2021-02-07 17:14:10
 */

import * as React from 'react';
import { Input } from 'antd';
import { COMPONENT_LABEL_NUMBER, randomIndex, classIds, randomParagraph, randomPlaceholder } from '../../constants';
import { ComponentNode } from '../../interfaces';

const { TextArea } = Input;

export default async () => {
	const res: ComponentNode[] = [];
	// 增加倍数
	const multiple = 10;

	// 必要
	const disabled = [true, false];
	const showCount = [true, false];

	// 随机
	const widths = [200, 400, 500, 600, 700, 800];
	const rows = [2, 3, 4, 5, 6, 7];

	let num = 0;
	for (let i = 0; i < multiple; i += 1) {
		for (let l = 0; l < disabled.length; l += 1) {
			for (let c = 0; c < showCount.length; c += 1) {
				// 大于目标标注组件数量时终止
				if (num > COMPONENT_LABEL_NUMBER) {
					break;
				}
				const style: React.CSSProperties = {
					margin: '10px',
					width: widths[randomIndex(0, widths.length)],
				};
				const key = `textarea-${i}-${l}-${c}`;
				res.push({
					category_id: classIds.textarea,
					key,
					node: (
						<TextArea
							className={Math.random() > 0.5 ? 'ant-input-focused' : ''}
							id={key}
							key={key}
							style={style}
							disabled={disabled[l]}
							showCount={showCount[c]}
							rows={rows[randomIndex(0, rows.length)]}
							value={Math.random() > 0.4 ? randomParagraph() : null}
							placeholder={Math.random() > 0.4 ? randomPlaceholder('input') : null}
						/>
					),
				});
				num += 1;
			}
		}
	}
	return res;
};
