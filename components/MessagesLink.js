import React from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components';
import { withNavigation } from 'react-navigation';
import styles from '../styles';
import NavIcon from './NavIcon';

const Container = styled.TouchableOpacity`padding-right: 20px;`;

const Text = styled.Text``;

export default withNavigation(({ navigation }) => (
	<Container onPress={() => navigation.navigate('MessageNavigation')}>
		<NavIcon name={Platform.OS === 'ios' ? 'ios-paper-plane' : 'md-paper-plane'} ccolor={styles.blackColor} />
	</Container>
));
