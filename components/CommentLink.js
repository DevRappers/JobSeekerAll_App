import React from 'react';
import { Platform, Alert } from 'react-native';
import { ActionSheet } from '@ant-design/react-native';
import styled from 'styled-components';
import { withNavigation } from 'react-navigation';
import styles from '../styles';
import NavIcon from './NavIcon';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';
import { SEARCH_HOBBY_QUERY } from '../screens/Tabs/TabsQueries';
import { HOBBY_DETAIL } from './HobbyTest';

const Container = styled.TouchableOpacity`align-items: flex-end;`;

export default withNavigation(({ navigation, id, postId }) => {
	const DELETE_COMMENT = gql`
		mutation deleteComment($id: String!) {
			deleteComment(id: $id)
		}
	`;
	const [ deleteCommentMutation ] = useMutation(DELETE_COMMENT, {
		variables: {
			id
		},
		refetchQueries: () => [
			{ query: HOBBY_DETAIL, variables: { id: postId } },
			{ query: SEARCH_HOBBY_QUERY, variables: { term: '' } }
		]
	});

	const deleteComment = async () => {
		try {
			const { data: { deleteComment } } = await deleteCommentMutation({
				variables: {
					id
				},
				refetchQueries: () => [
					{ query: HOBBY_DETAIL, variables: { id: postId } },
					{ query: SEARCH_HOBBY_QUERY, variables: { term: '' } }
				]
			});
			if (deleteComment) {
				Alert.alert('댓글 삭제 성공!!!');
			}
		} catch (e) {
			console.log(e);
			Alert.alert('삭제를 실패하였습니다.', '다시 시도해주세요.');
		}
	};

	const showActionSheet = () => {
		const BUTTONS = [ '댓글삭제', '취소' ];
		ActionSheet.showActionSheetWithOptions(
			{
				title: '내 댓글 관리',
				options: BUTTONS,
				cancelButtonIndex: 1,
				destructiveButtonIndex: 0
			},
			(buttonIndex) => {
				switch (buttonIndex) {
					case 0:
						deleteComment();
						break;
					case 1:
						break;
				}
			}
		);
	};

	return (
		<Container onPress={showActionSheet}>
			<NavIcon name={Platform.OS === 'ios' ? 'ios-close-circle' : 'md-close-circle'} color={styles.blackColor} />
		</Container>
	);
});
