import React, { useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { TextareaItem, ActionSheet } from '@ant-design/react-native';
import { Card } from 'react-native-elements';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import useInput from '../../hooks/useInput';
import styles from '../../styles';
import constants from '../../constants';
import { useMutation } from 'react-apollo-hooks';
import { SEARCH_STUDY_QUERY } from '../Tabs/TabsQueries';
import { JOB_LIST } from '../../DataList';

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

const UPLOAD = gql`
	mutation createStudy(
		$title: String!
		$caption: String!
		$information: String!
		$job: String!
		$area: String!
		$time: String!
	) {
		createStudy(title: $title, caption: $caption, information: $information, job: $job, area: $area, time: $time)
	}
`;

export default ({ navigation }) => {
	const [ loading, setIsLoading ] = useState(false);

	const titleInput = useInput('');
	const captionInput = useInput('');
	const informationInput = useInput('');
	const jobInput = useInput('');
	const areaInput = useInput('');
	const timeInput = useInput('');

	const [ uploadMutation ] = useMutation(UPLOAD, {
		refetchQueries: () => [ { query: SEARCH_STUDY_QUERY, variables: { term: '' } } ]
	});

	const showActionSheet = () => {
		const BUTTONS = [ 'IT', '경영,사무', '공모전', '자격증', '외국어', '교육', '기타', '취소' ];
		ActionSheet.showActionSheetWithOptions(
			{
				title: '내글관리',
				options: JOB_LIST,
				cancelButtonIndex: 7
			},
			(buttonIndex) => {
				if (buttonIndex !== 7) {
					jobInput.onChange(BUTTONS[buttonIndex]);
				}
			}
		);
	};
	const handleSubmit = async () => {
		if (
			titleInput.value === '' ||
			captionInput.value === '' ||
			informationInput.value === '' ||
			jobInput.value === '' ||
			areaInput.value === '' ||
			timeInput.value === ''
		) {
			Alert.alert('모든 필드를 입력해주세요!');
		}
		try {
			setIsLoading(true);
			const { data: { createStudy } } = await uploadMutation({
				variables: {
					title: titleInput.value,
					caption: captionInput.value,
					information: informationInput.value,
					job: jobInput.value,
					area: areaInput.value,
					time: timeInput.value
				}
			});
			if (createStudy) {
				Alert.alert('업로드 성공!!!');
				navigation.navigate('TabNavigation');
			}
		} catch (e) {
			console.log(e);
			Alert.alert('업로드를 실패하였습니다.', '다시 시도해주세요.');
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<Card title="신규스터디 생성" containerStyle={{ alignItems: 'center', marginTop: 50 }}>
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
						{loading ? <ActivityIndicator color="white" /> : <Text>생성</Text>}
					</Button>
				</Form>
			</Container>
		</Card>
	);
};
