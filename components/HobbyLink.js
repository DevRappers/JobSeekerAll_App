import React from 'react';
import { Platform, Alert } from 'react-native';
import { ActionSheet } from '@ant-design/react-native';
import styled from 'styled-components';
import { withNavigation } from 'react-navigation';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';
import styles from '../styles';
import NavIcon from './NavIcon';
import { SEARCH_HOBBY_QUERY } from '../screens/Tabs/TabsQueries';

const Container = styled.TouchableOpacity`padding-right: 20px;`;

export default withNavigation(({ navigation }) => {
	const DELETE_HOBBY = gql`
		mutation deleteHobby($id: String!) {
			deleteHobby(id: $id)
		}
	`;

	const [ deleteHobbyMutation ] = useMutation(DELETE_HOBBY, {
		variables: {
			id: navigation.getParam('id')
		},
		refetchQueries: () => [ { query: SEARCH_HOBBY_QUERY, variables: { term: '' } } ]
	});

	const deleteStudyPost = async () => {
		try {
			const { data: { deleteHobby } } = await deleteHobbyMutation({
				variables: {
					id: navigation.getParam('id')
				},
				refetchQueries: () => [ { query: SEARCH_HOBBY_QUERY, variables: { term: '' } } ]
			});
			if (deleteHobby) {
				Alert.alert('취미모임 삭제 성공!!!');
				navigation.goBack(null);
			}
		} catch (e) {
			console.log(e);
			Alert.alert('삭제를 실패하였습니다.', '다시 시도해주세요.');
		}
	};

	const showActionSheet = () => {
		const BUTTONS = [ '모임삭제', '모임수정', '취소' ];
		ActionSheet.showActionSheetWithOptions(
			{
				title: '내 모임 관리',
				options: BUTTONS,
				cancelButtonIndex: 2,
				destructiveButtonIndex: 0
			},
			(buttonIndex) => {
				switch (buttonIndex) {
					case 0:
						deleteStudyPost();
						break;
					case 1:
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
