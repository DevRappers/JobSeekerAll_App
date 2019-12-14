import React from 'react';
import { Platform, Alert } from 'react-native';
import { ActionSheet } from '@ant-design/react-native';
import styled from 'styled-components';
import { withNavigation } from 'react-navigation';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';
import styles from '../styles';
import NavIcon from './NavIcon';
import { SEARCH_STUDY_QUERY } from '../screens/Tabs/TabsQueries';

const Container = styled.TouchableOpacity`padding-right: 20px;`;

export default withNavigation(({ navigation }) => {
	const DELETE_STUDY = gql`
		mutation deleteStudy($id: String!) {
			deleteStudy(id: $id)
		}
	`;

	const [ deleteStudyMutation ] = useMutation(DELETE_STUDY, {
		variables: {
			id: navigation.getParam('id')
		},
		refetchQueries: () => [ { query: SEARCH_STUDY_QUERY, variables: { term: '' } } ]
	});

	const deleteStudyPost = async () => {
		try {
			const { data: { deleteStudy } } = await deleteStudyMutation({
				variables: {
					id: navigation.getParam('id')
				}
			});
			if (deleteStudy) {
				Alert.alert('스터디 삭제 성공!!!');
				navigation.goBack(null);
			}
		} catch (e) {
			console.log(e);
			Alert.alert('업로드를 실패하였습니다.', '다시 시도해주세요.');
		}
	};

	const showActionSheet = () => {
		const BUTTONS = [ '글수정', '스터디마감', '글삭제', '취소' ];
		ActionSheet.showActionSheetWithOptions(
			{
				title: '내글관리',
				options: BUTTONS,
				cancelButtonIndex: 3,
				destructiveButtonIndex: 2
			},
			(buttonIndex) => {
				switch (buttonIndex) {
					case 0:
						console.log('글수정');
						navigation.navigate('Home');
						break;
					case 1:
						console.log('스터디마감');
						break;
					case 2:
						deleteStudyPost();
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
