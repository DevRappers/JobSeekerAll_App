import React, { useState } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import useInput from '../../hooks/useInput';
import styles from '../../styles';
import constants from '../../constants';
import { useMutation } from 'react-apollo-hooks';
import { SEARCH_STUDY_QUERY } from '../Tabs/TabsQueries';
import StudyForm from '../../components/StudyForm';

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
			Alert.alert('스터디명이 중복될 수 없습니다. 다른것으로 설정해주세요.');
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<StudyForm
			loading={loading}
			title="신규스터디 생성"
			titleInput={titleInput}
			jobInput={jobInput}
			informationInput={informationInput}
			captionInput={captionInput}
			areaInput={areaInput}
			timeInput={timeInput}
			handleSubmit={handleSubmit}
			btnName="생성"
		/>
	);
};
