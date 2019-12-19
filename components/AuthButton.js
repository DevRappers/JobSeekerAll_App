/*
	AuthButton
	- 회원가입, 로그인, 이메일 인증 시 사용되는 버튼 Component
*/
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import constants from '../constants';

const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
	background-color: ${(props) => (props.bgColor ? props.bgColor : props.theme.blueColor)};
	padding: 10px;
	margin: 5px 50px;
	border-radius: 4px;
	width: ${constants.width / 1.7};
`;
const Text = styled.Text`
	color: white;
	text-align: center;
	font-weight: 600;
	font-size: 18px;
`;

const AuthButtton = ({ text, onPress, loading = false, bgColor = null }) => (
	<Touchable disabled={loading} onPress={onPress}>
		<Container bgColor={bgColor}>{loading ? <ActivityIndicator color="white" /> : <Text>{text}</Text>}</Container>
	</Touchable>
);

AuthButtton.propTypes = {
	loading: PropTypes.bool,
	text: PropTypes.string.isRequired,
	onPress: PropTypes.func.isRequired
};

export default AuthButtton;
