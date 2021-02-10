/*
 * @文件描述: input
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2021-02-07 10:33:03
 * @LastEditors: 廖军
 * @LastEditTime: 2021-02-10 16:04:28
 */

import * as React from 'react';
import { Input } from 'antd';
import {
	UserOutlined,
	SearchOutlined,
	AudioOutlined,
	LockOutlined,
	EyeTwoTone,
	EyeInvisibleOutlined,
} from '@ant-design/icons';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { COMPONENT_LABEL_NUMBER, randomIndex, classIds, randomPlaceholder } from '../../constants';
import { ComponentNode } from '../../interfaces';

export default async () => {
	const res: ComponentNode[] = [];
	// 增加倍数
	const multiple = 2;

	// 必要
	const sizes = ['small', 'middle', 'large'];
	const disabled = [true, false];

	// 随机
	const widths = [150, 250, 350, 450, 550, 650];
	const icons = [<UserOutlined />, <SearchOutlined />, <LockOutlined />];
	const suffixIcons = [<AudioOutlined />, <EyeTwoTone />, <EyeInvisibleOutlined />];

	let num = 0;
	for (let i = 0; i < multiple; i += 1) {
		for (let s = 0; s < sizes.length; s += 1) {
			for (let l = 0; l < disabled.length; l += 1) {
				// 大于目标标注组件数量时终止
				if (num > COMPONENT_LABEL_NUMBER) {
					break;
				}
				const style: React.CSSProperties = {
					margin: '10px',
					width: widths[randomIndex(0, widths.length)],
				};
				const icon = icons[randomIndex(0, 15)];
				const key = `input-${i}-${s}-${l}`;
				res.push({
					category_id: classIds.input,
					key,
					node: (
						<Input
							className={Math.random() > 0.5 ? 'ant-input-focused' : ''}
							id={key}
							key={key}
							style={style}
							size={sizes[s] as SizeType}
							disabled={disabled[l]}
							prefix={icon}
							suffix={icon ? null : suffixIcons[randomIndex(0, 20)]}
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
