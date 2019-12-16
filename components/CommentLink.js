import React from 'react';
import { Platform, Alert } from 'react-native';
import { ActionSheet } from '@ant-design/react-native';
import styled from 'styled-components';
import { withNavigation } from 'react-navigation';
import styles from '../styles';
import NavIcon from './NavIcon';

const Container = styled.TouchableOpacity`align-items: flex-end;`;

export default withNavigation(({ navigation }) => {
	const showActionSheet = () => {
		const BUTTONS = [ '댓글삭제', '취소' ];
		ActionSheet.showActionSheetWithOptions(
			{
				title: '내 모임 관리',
				options: BUTTONS,
				cancelButtonIndex: 1,
				destructiveButtonIndex: 0
			},
			(buttonIndex) => {
				null;
			}
		);
	};

	return (
		<Container onPress={showActionSheet}>
			<NavIcon name={Platform.OS === 'ios' ? 'ios-close-circle' : 'md-close-circle'} color={styles.blackColor} />
		</Container>
	);
});
