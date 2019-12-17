import React, { useState } from 'react';
import styled from 'styled-components';
import HobbyForm from '../../components/HobbyForm';
import useInput from '../../hooks/useInput';
import { SEARCH_HOBBY_QUERY } from '../Tabs/TabsQueries';
import { Alert } from 'react-native';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';

const UPLOAD = gql`
	mutation createHobby(
		$title: String!
		$caption: String!
		$information: String!
		$area: String!
		$proImage: String!
	) {
		createHobby(title: $title, caption: $caption, information: $information, area: $area, proImage: $proImage)
	}
`;

export default ({ navigation }) => {
	const [ loading, setIsLoading ] = useState(false);

	const titleInput = useInput('');
	const captionInput = useInput('');
	const areaInput = useInput('');
	const informationInput = useInput('');
	const imageInput = useInput('');

	const [ uploadMutation ] = useMutation(UPLOAD, {
		refetchQueries: () => [ { query: SEARCH_HOBBY_QUERY, variables: { term: '' } } ]
	});

	const handleSubmit = async () => {
		if (
			titleInput.value === '' ||
			captionInput.value === '' ||
			areaInput.value === '' ||
			informationInput.value === '' ||
			imageInput.value === ''
		) {
			Alert.alert('모든 필드를 입력해주세요!');
		}
		try {
			setIsLoading(true);
			const { data: { createHobby } } = await uploadMutation({
				variables: {
					title: titleInput.value,
					caption: captionInput.value,
					information: informationInput.value,
					area: areaInput.value,
					proImage: imageInput.value
				}
			});
			if (createHobby) {
				Alert.alert('생성 성공!!!');
				navigation.goBack(null);
			}
		} catch (e) {
			console.log(e);
			Alert.alert('모임명이 중복될 수 없습니다. 다른것으로 설정해주세요.');
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<HobbyForm
			navigation={navigation}
			title="신규 모임 생성"
			loading={loading}
			titleInput={titleInput}
			captionInput={captionInput}
			areaInput={areaInput}
			informationInput={informationInput}
			imageInput={imageInput}
			handleSubmit={handleSubmit}
			btnName="생성"
		/>
	);
};
