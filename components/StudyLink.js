import React from 'react';
import { Platform } from 'react-native';
import { ActionSheet } from '@ant-design/react-native';
import styled from 'styled-components';
import { withNavigation } from 'react-navigation';
import styles from '../styles';
import NavIcon from './NavIcon';

const Container = styled.TouchableOpacity`padding-right: 20px;`;

export default withNavigation(({ navigation }) => {
	const showActionSheet = () => {
		const BUTTONS = [ '글수정', '스터디마감', '글삭제', '취소' ];
		ActionSheet.showActionSheetWithOptions(
			{
				title: '내글관리',
				options: BUTTONS,
				cancelButtonIndex: 3,
				destructiveButtonIndex: 2
			},
			(buttonIndex) => {}
		);
	};
	return (
		<Container onPress={showActionSheet}>
			<NavIcon name={Platform.OS === 'ios' ? 'ios-more' : 'md-more'} color={styles.blackColor} />
		</Container>
	);
});
