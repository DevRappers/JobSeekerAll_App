/*
	StudyForm
	- 스터디 생성, 수정 할때 사용하는 Form컴포넌트
*/
import React from 'react';
import { ActivityIndicator, TouchableWithoutFeedback, Keyboard } from 'react-native';
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
	loading = false,
	title,
	titleInput,
	jobInput,
	informationInput,
	captionInput,
	areaInput,
	timeInput,
	handleSubmit,
	btnName
}) => {
	const showActionSheet = () => {
		const BUTTONS = [ 'IT', '경영,사무', '공모전', '자격증', '외국어', '교육', '기타' ];
		ActionSheet.showActionSheetWithOptions(
			{
				title: '분야설정',
				options: BUTTONS
			},
			(buttonIndex) => {
				jobInput.onChange(BUTTONS[buttonIndex]);
			}
		);
	};
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<Card title={title} containerStyle={{ alignItems: 'center', marginTop: 50 }}>
				<Container>
					<Form>
						<STextInput
							onChangeText={titleInput.onChange}
							value={titleInput.value}
							placeholder="스터디명"
							multiline={true}
							placeholderTextColor={styles.darkGreyColor}
						/>
						<STextInput
							onFocus={showActionSheet}
							onChangeText={showActionSheet}
							value={jobInput.value}
							placeholder="분야"
							multiline={true}
							placeholderTextColor={styles.darkGreyColor}
						/>
						<STextInput
							onChangeText={areaInput.onChange}
							value={areaInput.value}
							placeholder="지역"
							multiline={true}
							placeholderTextColor={styles.darkGreyColor}
						/>
						<STextInput
							onChangeText={informationInput.onChange}
							value={informationInput.value}
							placeholder="지원방법"
							multiline={true}
							placeholderTextColor={styles.darkGreyColor}
						/>
						<STextInput
							onChangeText={timeInput.onChange}
							value={timeInput.value}
							placeholder="진행시간"
							multiline={true}
							placeholderTextColor={styles.darkGreyColor}
						/>
						<TextareaItem
							onChangeText={captionInput.onChange}
							value={captionInput.value}
							rows={4}
							placeholder="스터디소개"
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
