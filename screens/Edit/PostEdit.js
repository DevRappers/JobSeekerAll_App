/*
	PostEdit
	- 포스트 수정 스크린
*/
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { gql } from 'apollo-boost';
import axios from 'axios';
import { useMutation } from 'react-apollo-hooks';
import useInput from '../../hooks/useInput';
import { SEARCH_HOBBY_QUERY } from '../Tabs/TabsQueries';
import PostForm from '../../components/PostForm';
import { HOBBY_DETAIL } from '../../components/Query';

const EDIT = gql`
	mutation editPost($id: String!, $title: String, $caption: String, $file: String) {
		editPost(id: $id, title: $title, caption: $caption, file: $file)
	}
`;

export default ({ navigation }) => {
	const hobbyId = navigation.getParam('hobbyId');
	const id = navigation.getParam('id');
	const files = navigation.getParam('files');
	const [ loading, setIsLoading ] = useState(false);
	const [ photo, setPhoto ] = useState();
	const [ uri, setUri ] = useState(files[0].url);
	const [ heights, setheights ] = useState(80);

	const setChange = (photo) => {
		setPhoto(photo);
		setUri(photo.uri);
		setheights(80);
	};
	const titleInput = useInput(navigation.getParam('title', ''));
	const captionInput = useInput(navigation.getParam('caption', ''));
	const imageInput = useInput('');

	const [ updateMutation ] = useMutation(EDIT, {
		refetchQueries: () => [
			{ query: HOBBY_DETAIL, variables: { id: hobbyId } },
			{ query: SEARCH_HOBBY_QUERY, variables: { term: '' } }
		]
	});

	const handleSubmit = async () => {
		if (titleInput.value === '' || captionInput.value === '') {
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

			const { data: { location } } = await axios.post('http://localhost:4000/api/upload', formData, {
				headers: {
					'content-type': 'multipart/form-data'
				}
			});
			imgLink = location;
		}
		try {
			setIsLoading(true);
			const { data: { editPost } } = await updateMutation({
				variables: {
					id,
					title: titleInput.value,
					caption: captionInput.value,
					file: photo !== undefined ? imgLink : uri
				}
			});
			if (editPost) {
				Alert.alert('포스트 수정 성공!!!');
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
		<PostForm
			navigation={navigation}
			title="포스트 수정"
			uri={uri}
			heights={heights}
			setChange={setChange}
			loading={loading}
			titleInput={titleInput}
			captionInput={captionInput}
			imageInput={imageInput}
			handleSubmit={handleSubmit}
			btnName="수정"
		/>
	);
};
