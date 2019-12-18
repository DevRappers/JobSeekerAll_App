import React, { useState } from 'react';
import { Alert } from 'react-native';
import { gql } from 'apollo-boost';
import useInput from '../../hooks/useInput';
import { useMutation } from 'react-apollo-hooks';
import { SEARCH_STUDY_QUERY } from '../Tabs/TabsQueries';
import StudyForm from '../../components/StudyForm';

const EDIT = gql`
	mutation editStudy(
		$id: String!
		$title: String
		$caption: String
		$information: String
		$job: String
		$area: String
		$time: String
	) {
		editStudy(
			id: $id
			title: $title
			caption: $caption
			information: $information
			job: $job
			area: $area
			time: $time
		)
	}
`;

export default ({ navigation }) => {
	const [ loading, setIsLoading ] = useState(false);

	const titleInput = useInput(navigation.getParam('title', ''));
	const captionInput = useInput(navigation.getParam('caption', ''));
	const informationInput = useInput(navigation.getParam('information', ''));
	const jobInput = useInput(navigation.getParam('job', ''));
	const areaInput = useInput(navigation.getParam('area', ''));
	const timeInput = useInput(navigation.getParam('time', ''));

	const [ uploadMutation ] = useMutation(EDIT, {
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
			const { data: { editStudy } } = await uploadMutation({
				variables: {
					id: navigation.getParam('id'),
					title: titleInput.value,
					caption: captionInput.value,
					information: informationInput.value,
					job: jobInput.value,
					area: areaInput.value,
					time: timeInput.value
				}
			});
			if (editStudy) {
				Alert.alert('스터디 수정 성공!!!');
				navigation.goBack(null);
			}
		} catch (e) {
			console.log(e);
			Alert.alert('수정을 실패하였습니다.', '다시 시도해주세요.');
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<StudyForm
			loading={loading}
			title="스터디 수정"
			titleInput={titleInput}
			jobInput={jobInput}
			informationInput={informationInput}
			captionInput={captionInput}
			areaInput={areaInput}
			timeInput={timeInput}
			handleSubmit={handleSubmit}
			btnName="수정"
		/>
	);
};
