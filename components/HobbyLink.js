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
				null;
			}
		);
	};

	return (
		<Container onPress={showActionSheet}>
			<NavIcon name={Platform.OS === 'ios' ? 'ios-more' : 'md-more'} color={styles.blackColor} />
		</Container>
	);
});
