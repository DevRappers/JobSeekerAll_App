import React, { useState } from 'react';
import axios from 'axios';
import useInput from '../../hooks/useInput';
import { SEARCH_HOBBY_QUERY } from '../Tabs/TabsQueries';
import { Alert } from 'react-native';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';
import { HOBBY_DETAIL } from '../../components/HobbyTest';
import PostForm from '../../components/PostForm';

const UPLOAD = gql`
	mutation upload($title: String!, $caption: String!, $files: [String!]!, $hId: String!) {
		upload(title: $title, caption: $caption, files: $files, hId: $hId)
	}
`;

export default ({ navigation }) => {
	const hId = navigation.getParam('id');
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
	const imageInput = useInput('');

	const [ uploadMutation ] = useMutation(UPLOAD, {
		refetchQueries: () => [
			{ query: SEARCH_HOBBY_QUERY, variables: { term: '' } },
			{ query: HOBBY_DETAIL, variables: { id: hId } }
		]
	});

	const handleSubmit = async () => {
		if (titleInput.value === '' || captionInput.value === '' || photo === undefined) {
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
			const { data: { upload } } = await uploadMutation({
				variables: {
					title: titleInput.value,
					caption: captionInput.value,
					files: [ 'http://localhost:4000/' + path ],
					hId: hId
				}
			});
			if (upload) {
				Alert.alert('생성 성공!!!');
				navigation.goBack(null);
			}
		} catch (e) {
			console.log(e);
			Alert.alert('공고생성 에러!!! 다시시도해주세요.');
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<PostForm
			navigation={navigation}
			title="신규 공고 생성"
			uri={uri}
			heights={heights}
			setChange={setChange}
			loading={loading}
			titleInput={titleInput}
			captionInput={captionInput}
			imageInput={imageInput}
			handleSubmit={handleSubmit}
			btnName="생성"
		/>
	);
};
