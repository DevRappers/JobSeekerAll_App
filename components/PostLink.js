import React from 'react';
import { Platform, Alert } from 'react-native';
import { ActionSheet } from '@ant-design/react-native';
import styled from 'styled-components';
import { withNavigation } from 'react-navigation';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';
import styles from '../styles';
import NavIcon from './NavIcon';
import { HOBBY_DETAIL } from './HobbyTest';
import { SEARCH_HOBBY_QUERY } from '../screens/Tabs/TabsQueries';

const Container = styled.TouchableOpacity`padding-right: 20px;`;

export default withNavigation(({ navigation, id, postId }) => {
	const DELETE_POST = gql`
		mutation deletePost($id: String!) {
			deletePost(id: $id)
		}
	`;
	const [ deletePostMutation ] = useMutation(DELETE_POST, {
		variables: {
			id
		},
		refetchQueries: () => [
			{ query: HOBBY_DETAIL, variables: { id: postId } },
			{ query: SEARCH_HOBBY_QUERY, variables: { term: '' } }
		]
	});

	const deletePost = async () => {
		try {
			const { data: { deletePost } } = await deletePostMutation({
				variables: {
					id
				},
				refetchQueries: () => [
					{ query: HOBBY_DETAIL, variables: { id: postId } },
					{ query: SEARCH_HOBBY_QUERY, variables: { term: '' } }
				]
			});
			if (deletePost) {
				Alert.alert('포스트 삭제 성공!!!');
				navigation.goBack(null);
			}
		} catch (e) {
			console.log(e);
			Alert.alert('삭제를 실패하였습니다.', '다시 시도해주세요.');
		}
	};

	const showActionSheet = () => {
		const BUTTONS = [ '포스트수정', '포스트삭제', '취소' ];
		ActionSheet.showActionSheetWithOptions(
			{
				title: '내 모임 관리',
				options: BUTTONS,
				cancelButtonIndex: 2,
				destructiveButtonIndex: 1
			},
			(buttonIndex) => {
				switch (buttonIndex) {
					case 0:
						break;
					case 1:
						deletePost();
						break;
					case 2:
						break;
				}
			}
		);
	};

	return (
		<Container onPress={showActionSheet}>
			<NavIcon name={Platform.OS === 'ios' ? 'ios-more' : 'md-more'} color={styles.blackColor} />
		</Container>
	);
});
