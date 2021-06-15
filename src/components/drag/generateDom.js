import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ChatDialog from '../library/ChatDialog';
import { createUuid } from '../../utils/index';
import initData from '../../config/initData';

import PreviewImage from '../library/Image';
import PreviewRadio from '../library/Radio';
import PreviewText from '../library/Text';
import RemoveIcon from '../library/RemoveIcon';


export const generateFlowDOM = ({ flowLayout, current, removeItem, showPopup }) => {
	current = current || {};

	return flowLayout.map((item, index) => {
		if (item.config.type == 'img') {
			return (
				<div
					key={item.id}
					data-grid={item.position}
					top={item.position.y}
					left={item.position.x}
					className={item.id === current.id ? 'active' : ''}
				>
					<RemoveIcon removeItem={removeItem} id={item.id}></RemoveIcon>
					<PreviewImage config={item.config} showPopup={showPopup}></PreviewImage>
				</div>
			);
		} else if (item.config.type == 'text') {
			return (
				<div
					key={item.id}
					data-grid={item.position}
					top={item.position.y}
					left={item.position.x}
					className={item.id === current.id ? 'active' : ''}
					onClick={item.config.popup ? showPopup : () => {}}
				>
					<RemoveIcon removeItem={removeItem} id={item.id}></RemoveIcon>
					<PreviewText config={item.config}></PreviewText>
				</div>
			);
		} else if (item.config.type == 'radio') {
			return (
				<div
					key={item.id}
					data-grid={item.position}
					top={item.position.y}
					left={item.position.x}
					className={item.id === current.id ? 'active' : ''}
				>
					<RemoveIcon removeItem={removeItem} id={item.id}></RemoveIcon>
					<PreviewRadio config={item.config} id={item.id}></PreviewRadio>
				</div>
			);
		} else if (item.config.type == 'chat') {
			return (
				<div
					key={item.id}
					data-grid={item.position}
					className={item.id === current.id ? 'active' : ''}
				>
					<RemoveIcon removeItem={removeItem} id={item.id}></RemoveIcon>
					<ChatDialog data={item.config.data}></ChatDialog>;
				</div>
			);
		}
	});
};

export const generateFreedomDOM = ({ config, type, blur, showPopup }) => {
	if (!config) return null;
	if (config.type == 'img') {
		return <PreviewImage config={config} showPopup={showPopup}></PreviewImage>;
	} else if (config.type == 'text') {
		return <PreviewText config={config} blur={blur} showPopup={showPopup}></PreviewText>;
	} else if (config.type == 'radio') {
		return <PreviewRadio config={config} id={config.id}></PreviewRadio>;
	} else if (config.type == 'chat') {
		return <ChatDialog data={config.data}></ChatDialog>;
	}
};

export const onDrop = (e, dragType, dispatch) => {
	const type = e.dataTransfer.getData('text');
	if (type !== 'img' && type !== 'radio' && type !== 'text' && type !== 'chat') return;
	console.log(type, '类型');
	let scale = 1;
	let y = 0;
	if (dragType === 'freedom') {
		scale = 10;
		// let x = e.pageX - 470 || page.current.offsetLeft;
		y = e.pageY - 100; //  page.current.offsetTop;
	}
	const id = createUuid(6);
	const position = {
		x: 0,
		y,
		w: initData[type].w * scale,
		h: initData[type].h,
		i: id,
	};
	const payload = {
		id,
		position,
		config: initData[type].config,
		type: dragType,
	};
	dispatch({
		type: 'layoutData/add',
		payload: payload,
	});
};
