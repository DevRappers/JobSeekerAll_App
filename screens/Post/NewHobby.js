import React, { useState } from 'react';
import axios from 'axios';
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

	const [ photo, setPhoto ] = useState();
	const [ uri, setUri ] = useState();
	const [ heights, setheights ] = useState(0);

	const setChange = (photo) => {
		setPhoto(photo);
		setUri(photo.uri);
		setheights(80);
	};

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
			photo.uri === ''
		) {
			Alert.alert('모든 필드를 입력해주세요!');
		}
		const formData = new FormData();
		const name = photo.filename;
		const [ , type ] = name.split('.');
		formData.append('file', {
			name,
			type: type.toLowerCase(),
			uri: photo.uri
		});

		const { data: { path } } = await axios.post('http://localhost:4000/api/upload', formData, {
			headers: {
				'content-type': 'multipart/form-data'
			}
		});

		try {
			setIsLoading(true);
			const { data: { createHobby } } = await uploadMutation({
				variables: {
					title: titleInput.value,
					proImage: 'http://localhost:4000/' + path,
					caption: captionInput.value,
					information: informationInput.value,
					area: areaInput.value
				}
			});
			if (createHobby) {
				Alert.alert('생성 성공!!!');
				navigation.navigate('Hobby');
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
			uri={uri}
			heights={heights}
			setChange={setChange}
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
