import { useEffect, useRef, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

const MyPage = styled.div``;

const Icon = styled.div.attrs(props => ({
	className: 'iconfont',
}))`
	font-size: 18px;
	margin-left:5px;
`;
const FlexItem = styled.div`
	flex:1;
	margin:0 20px
`;
const Li = styled.li`
	display: flex;
	align-items: center;
	font-size: 14px;
	padding:0 10px;
`;
const Operation = styled.div`
	display:flex;
	cursor: pointer;
`
const PopupTemplate = () => {
	return (
		<MyPage>
			<h2>我的页面</h2>
			<ul>
				<Li>
					<span>1</span>
					<FlexItem>我的页面1</FlexItem>
					<Operation>
						<Icon>&#xe613;</Icon>
						<Icon>&#xe65f;</Icon>
					</Operation>
				</Li>
				<Li>
					<span>2</span>
					<FlexItem>我的页面2</FlexItem>
					<Operation>
						<Icon>&#xe613;</Icon>
						<Icon>&#xe65f;</Icon>
					</Operation>
				</Li>
				<Li>
					<span>3</span>
					<FlexItem>我的页面3</FlexItem>
					<Operation>
						<Icon>&#xe613;</Icon>
						<Icon>&#xe65f;</Icon>
					</Operation>
				</Li>
			</ul>
		</MyPage>
	);
};

export default PopupTemplate;