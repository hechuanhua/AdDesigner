import { useEffect, useRef, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Form, Input, Button, Select, Upload, Switch } from 'antd';
import { PlusOutlined, InboxOutlined } from '@ant-design/icons';
import { getImgInfo } from '../../utils/index';
import globalConfig  from '../../config/config'
import initData from '../../config/initData';

const ImgSetting = props => {
	const config = useSelector(state => {
		return state.layoutData?.current?.config;
	});
	const dispatch = useDispatch();
	const [form] = Form.useForm();

	console.log(config, 'ImgSettingconfig');

	const normFile = e => {
		console.log('Upload event:', e);
		if (Array.isArray(e)) {
			return e;
		}
		// return e && e.fileList;
	};
	const onValuesChange = (changedValues, allValues) => {
		console.log(changedValues, allValues,'onValuesChange')
		if (Object.keys(changedValues)[0] === 'img') {
			const { status, response } = changedValues.img.file;
			if (status === 'done') {
				let url = response.data.url;
				getImgInfo(url).then(res => {
					console.log(res, 'img');
					const h = (initData.maxWidth * res.height) / res.width;
					const position = {
						h,
					};
					dispatch({
						type: 'layoutData/setting',
						payload: {
							position,
							config: {
								url: url,
							},
						},
					});
				});
			}
		} else {
			dispatch({
				type: 'layoutData/setting',
				payload: {
					config: changedValues,
				},
			});
		}
	};
	return (
		<Form
			labelCol={{ span: 8 }}
			wrapperCol={{ span: 16 }}
			form={form}
			name="control-hooks"
			onValuesChange={onValuesChange}
		>
			{console.log(config,2222)}
			<Form.Item label="上传图片：">
				<Form.Item
					// name="img"
					// valuePropName="fileList"
					// getValueFromEvent={normFile}
					noStyle
					accept="image/png,image/jpeg,image/gif,image/pjpeg"
				>
					<Upload.Dragger
						// name="files"
						action={`${globalConfig.baseUrl}/upload`}
						maxCount={1}
						// fileList={[{url:config.url,name:'img.jpg'},]}
						// onChange={onChange}
					>
						<p className="ant-upload-drag-icon">
							<InboxOutlined />
						</p>
						<p className="ant-upload-text">点击上传</p>
					</Upload.Dragger>
				</Form.Item>
			</Form.Item>
			<Form.Item label="固定位置" name="fixed">
				<Select allowClear>
					<Select.Option value="current">固定当前位置</Select.Option>
					<Select.Option value="bottom">固定底部</Select.Option>
				</Select>
			</Form.Item>
			<Form.Item name="popup" label="点击弹窗">
        <Switch checked={config.popup}></Switch>
      </Form.Item>
		</Form>
	);
};

export default ImgSetting;
