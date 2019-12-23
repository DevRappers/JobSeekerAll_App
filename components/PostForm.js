/*
	PostForm
	- 포스트 생성, 수정 할때 사용하는 컴포넌트 
*/
import React from 'react';
import { ActivityIndicator, Image, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';
import { TextareaItem, ActionSheet } from '@ant-design/react-native';
import { Card } from 'react-native-elements';
import styled from 'styled-components';
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

const View = styled.View`align-items: center;`;

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
	uri,
	heights,
	setChange,
	titleInput,
	captionInput,
	imageInput,
	handleSubmit,
	btnName
}) => {
	const showImageSheet = () => {
		const BUTTONS = [ '앨범에서 선택하기', '사진촬영', '취소' ];
		ActionSheet.showActionSheetWithOptions(
			{
				title: '사진업로드',
				options: BUTTONS,
				cancelButtonIndex: 2
			},
			(buttonIndex) => {
				switch (buttonIndex) {
					case 0:
						navigation.navigate('SelectPhoto', { setChange: setChange });
						break;
					case 1:
						navigation.navigate('TakePhoto', { setChange: setChange });
						break;
				}
			}
		);
	};
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<Card title={title} containerStyle={{ alignItems: 'center', marginTop: 10 }}>
				<Container>
					<Form>
						<STextInput
							onChangeText={titleInput.onChange}
							value={titleInput.value}
							placeholder="공고명"
							multiline={true}
							placeholderTextColor={styles.darkGreyColor}
						/>
						<View>
							<Image source={{ uri }} style={{ height: heights, width: 80, alignItems: 'center' }} />
						</View>
						<STextInput
							onFocus={showImageSheet}
							onChangeText={showImageSheet}
							value={imageInput.value}
							placeholder="공고 포스터 업로드"
							multiline={true}
							placeholderTextColor={styles.darkGreyColor}
						/>
						<TextareaItem
							onChangeText={captionInput.onChange}
							value={captionInput.value}
							rows={4}
							placeholder="공고내용"
							count={100}
							style={{ borderBottomColor: 'rgb(230, 230, 230)', borderBottomWidth: 1, fontSize: 14 }}
						/>
						<Button onPress={handleSubmit}>
							{loading ? <ActivityIndicator color="white" /> : <Text>{btnName}</Text>}
						</Button>
					</Form>
				</Container>
			</Card>
		</TouchableWithoutFeedback>
	);
};
