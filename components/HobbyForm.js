import React, { useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { TextareaItem, ActionSheet } from '@ant-design/react-native';
import { Card } from 'react-native-elements';
import styled from 'styled-components';
import { AREA_LIST } from '../DataList';
import styles from '../styles';
import constants from '../constants';

const Container = styled.View`
	padding: 20px;
	flex-direction: row;
	align-items: center;
`;

const Form = styled.View`justify-content: flex-start;`;

const STextInput = styled.TextInput`
	margin-bottom: 10px;
	border: 0px solid ${styles.lightGreyColor};
	border-bottom-width: 1px;
	padding-bottom: 10px;
	width: ${constants.width - 180};
`;

const Button = styled.TouchableOpacity`
	background-color: ${(props) => props.theme.blueColor};
	padding: 10px;
	border-radius: 4px;
	align-items: center;
	justify-content: center;
	margin-top: 10px;
`;

const Text = styled.Text`
	color: white;
	font-weight: 600;
`;

export default ({
	navigation,
	loading = false,
	title,
	titleInput,
	informationInput,
	captionInput,
	areaInput,
	imageInput,
	handleSubmit,
	btnName
}) => {
	const showActionSheet = () => {
		ActionSheet.showActionSheetWithOptions(
			{
				title: '분야설정',
				options: AREA_LIST
			},
			(buttonIndex) => {
				areaInput.onChange(AREA_LIST[buttonIndex]);
			}
		);
	};
	const showImageSheet = () => {
		const BUTTONS = [ '앨범에서 선택하기', '사진촬영', '취소' ];
		ActionSheet.showActionSheetWithOptions(
			{
				title: '분야설정',
				options: BUTTONS,
				cancelButtonIndex: 2
			},
			(buttonIndex) => {
				switch (buttonIndex) {
					case 0:
						navigation.navigate('SelectPhoto');
						break;
					case 1:
						navigation.navigate('TakePhoto');
						break;
				}
			}
		);
	};
	return (
		<Card title={title} containerStyle={{ alignItems: 'center', marginTop: 50 }}>
			<Container>
				<Form>
					<STextInput
						onChangeText={titleInput.onChange}
						value={titleInput.value}
						placeholder="모임명"
						multiline={true}
						placeholderTextColor={styles.darkGreyColor}
					/>
					<STextInput
						onFocus={showImageSheet}
						onChangeText={showImageSheet}
						value={imageInput.value}
						placeholder="대표사진"
						multiline={true}
						placeholderTextColor={styles.darkGreyColor}
					/>
					<STextInput
						onFocus={showActionSheet}
						onChangeText={showActionSheet}
						value={areaInput.value}
						placeholder="지역"
						multiline={true}
						placeholderTextColor={styles.darkGreyColor}
					/>
					<STextInput
						onChangeText={captionInput.onChange}
						value={captionInput.value}
						placeholder="간단한 소개"
						multiline={true}
						placeholderTextColor={styles.darkGreyColor}
					/>
					<TextareaItem
						onChangeText={informationInput.onChange}
						value={informationInput.value}
						rows={4}
						placeholder="취미모임 설명"
						count={100}
						style={{ borderBottomColor: 'rgb(230, 230, 230)', borderBottomWidth: 1, fontSize: 14 }}
					/>
					<Button onPress={handleSubmit}>
						{loading ? <ActivityIndicator color="white" /> : <Text>{btnName}</Text>}
					</Button>
				</Form>
			</Container>
		</Card>
	);
};
