/*
	HobbyEdit
	- 취미모임 수정 스크린
*/
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { gql } from 'apollo-boost';
import axios from 'axios';
import { useMutation } from 'react-apollo-hooks';
import useInput from '../../hooks/useInput';
import HobbyForm from '../../components/HobbyForm';
import { SEARCH_HOBBY_QUERY } from '../Tabs/TabsQueries';

const EDIT = gql`
	mutation editHobby(
		$id: String!
		$title: String
		$caption: String
		$area: String
		$proImage: String
		$information: String
	) {
		editHobby(
			id: $id
			title: $title
			caption: $caption
			area: $area
			proImage: $proImage
			information: $information
		)
	}
`;

export default ({ navigation }) => {
	const [ loading, setIsLoading ] = useState(false);
	const [ photo, setPhoto ] = useState();
	const [ uri, setUri ] = useState(navigation.getParam('proImage', ''));
	const [ heights, setheights ] = useState(80);

	const setChange = (photo) => {
		setPhoto(photo);
		setUri(photo.uri);
		setheights(80);
	};

	const id = navigation.getParam('id');
	const titleInput = useInput(navigation.getParam('title', ''));
	const captionInput = useInput(navigation.getParam('caption', ''));
	const informationInput = useInput(navigation.getParam('information', ''));
	const areaInput = useInput(navigation.getParam('area', ''));
	const imageInput = useInput('');

	const [ updateMutation ] = useMutation(EDIT, {
		refetchQueries: () => [ { query: SEARCH_HOBBY_QUERY, variables: { term: '' } } ]
	});

	const handleSubmit = async () => {
		if (
			titleInput.value === '' ||
			captionInput.value === '' ||
			informationInput.value === '' ||
			areaInput.value === ''
		) {
			Alert.alert('모든 필드를 입력해주세요!');
		}
		let imgLink = '';
		if (photo !== undefined) {
			const formData = new FormData();
			const name = photo.filename;
			const [ , type ] = name.split('.');
			formData.append('file', {
				name,
				type: type.toLowerCase(),
				uri: photo.uri
			});

			const { data: { location } } = await axios.post('https://jobseekerall.herokuapp.com/api/upload', formData, {
				headers: {
					'content-type': 'multipart/form-data'
				}
			});
			imgLink = location;
		}
		try {
			setIsLoading(true);
			const { data: { editHobby } } = await updateMutation({
				variables: {
					id: navigation.getParam('id'),
					title: titleInput.value,
					caption: captionInput.value,
					information: informationInput.value,
					area: areaInput.value,
					proImage: photo !== undefined ? imgLink : uri
				}
			});
			if (editHobby) {
				Alert.alert('모임 수정 성공!!!');
				navigation.goBack(null);
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
		<HobbyForm
			navigation={navigation}
			title="모임 정보 수정"
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
			btnName="수정"
		/>
	);
};
