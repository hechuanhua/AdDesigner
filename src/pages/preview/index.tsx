import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import useEqualSelector from 'lib/hooks/useEqualSelector'
import GridLayout from 'react-grid-layout';
import { createGlobalStyle } from 'styled-components'
import { useLocation } from "react-router-dom";
import styled from 'styled-components';
import QRCode from 'qrcode.react';

import { GenerateFlowDOM, GenerateFreedomDOM, SetStyle } from 'lib/Draggable';
import WechatPopup from 'components/Library/WechatPopup'
import initData from 'config/initData';
import DouPop from 'components/Library/DouPop'

import { RootState } from 'typings/LayoutData'

const PageDiv = styled.div.attrs(props => ({
	className: 'preview',
}))`
	width: 100%;
	margin: 0 auto;
	height: 800px;
	position: relative;
	max-width: ${initData.maxWidth}px;
	box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
	background:#f8f7f7;
`;
const DragDiv = styled.div`
	width: 200px;
	height: 100px;
	cursor: move;
	z-index: 11;
`;
const FreedomDragBox = styled.div`
	box-sizing: content-box;
`
const QRcodeBox = styled.div`
	position:fixed;
	top:100px;
	left:100px;
	z-index:-1;
	text-align:center;
`
const QRCodeName = styled.div`
	font-size: 20px;
	font-weight: 600;
	margin-bottom: 20px;
	color: red;
`
const CanvasBox = styled.div`
	background:#fff;
	padding:10px;
`
const HiddenInput = styled.input`
	position:absolute;
	left:-99999px;
	opacity: 0;
`

const Preview = () => {
	const [layout, setLayout] = useState([] as any);
	const [showQRcode, setShowQRcode] = useState(false)
	const [style, setStyle] = useState({})
	const dispatch = useDispatch();
	const { flowLayout, freedomLayout, current } = useEqualSelector((state: RootState) => {
		return state.layoutData;
	});

	const FreeBox = useRef<HTMLElement>()

	const query = new URLSearchParams(useLocation().search)

	useEffect(() => {
		const clientWidth = document.documentElement.clientWidth;
		// if(clientWidth > 640 ){
		// 	setShowQRcode(true)
		// }
		// const tid = query.get('tid')
		let scale = 1
		if (initData.maxWidth > clientWidth) {
			scale = clientWidth / initData.maxWidth
		} else {
			scale = clientWidth / initData.maxWidth
		}

		(document.getElementById('viewport') as HTMLElement).setAttribute('content', `width=${initData.maxWidth}, initial-scale=${scale}, minimum-scale=${scale}, maximum-scale=${scale}, user-scalable=no`)

		// if(tid){
		// 	setShowQRcode(true)
		// 	localStorage.clear()
		// 	dispatch({
		// 		type: 'pageData/getLayout',
		// 		payload: {
		// 			tid
		// 		}
		// 	});
		// } else {
		// 	setShowQRcode(false)
		// }

		const ret = freedomLayout.filter(item => item.config.type === 'bottomWechat')
		console.log(ret)
		if (ret.length) {
			setStyle({ 'paddingBottom': '70px' })
		}
	}, [])

	useEffect(() => {

		// setTimeout(()=>{
		// 	const pageHeight = FreeBox.current.style.height
		// 	console.log(pageHeight,'pageHeight')
		// 	setPageHeight(pageHeight)
		// },0)

		const layouts = flowLayout.map(item => item.position);
		setLayout(layouts);
	}, [flowLayout]);

	const [wechatPopupVisibility, setWechatPopupVisibility] = useState(false);
	const [douPopupVisibility, setDouPopupVisibility] = useState(false);

	const showPopup = (popupType: string) => {
		if (popupType === '1') {
			setWechatPopupVisibility(true)
		} else if (popupType === '2') {
			setDouPopupVisibility(true)
		}
	}
	return (
		<>
			{
				showQRcode ? <QRcodeBox>
					<QRCodeName>手机扫码预览</QRCodeName>
					<CanvasBox>
						<QRCode value={window.location.href}></QRCode>
					</CanvasBox>
				</QRcodeBox> : ''
			}
			<HiddenInput type='text' id='copyInput'></HiddenInput>
			<PageDiv>
				<GridLayout
					layout={layout}
					isDraggable={false}
					isResizable={false}
					useCSSTransforms={false}
					cols={375}
					rowHeight={1}
					width={initData.maxWidth}
					compactType={'vertical'}
					containerPadding={[0, 0]} //整个容器边距
					margin={[0, 0]} //每个子项目边距
					ref={FreeBox as any}
				>
					{GenerateFlowDOM({ flowLayout, type: 'preview', showPopup })}
				</GridLayout>
				<FreedomDragBox style={style}>
					{freedomLayout.map((item, index) => (
						<DragDiv
							className={'drag'}
							style={SetStyle(item,'preview')}
							data-id={item.position.i}
							key={item.position.i}
						>
							{GenerateFreedomDOM({ config: item.config, type: 'preview', showPopup })}
						</DragDiv>
					))}
				</FreedomDragBox>
				{
					wechatPopupVisibility ? <WechatPopup onClose={() => { setWechatPopupVisibility(false) }}></WechatPopup> : <></>
				}

			</PageDiv>
			{
				douPopupVisibility ? <DouPop onClose={() => { setDouPopupVisibility(false) }}></DouPop> : ''
			}
		</>
	);
};

export default Preview;


