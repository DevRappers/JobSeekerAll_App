import React from 'react';
import styled from 'styled-components';
import constants from '../../constants';

const View = styled.View`
	justify-content: center;
	align-items: center;
	flex: 1;
	background-color: ${(props) => props.theme.mintColor};
`;

const Image = styled.Image`
	width: ${constants.width / 1.8};
	margin-bottom: 0px;
`;

const Touchable = styled.TouchableOpacity``;

const SignUpBtn = styled.View`
	background-color: ${(props) => props.theme.blueColor};
	padding: 10px;
	margin: 0px 50px;
	border-radius: 4px;
	width: ${constants.width / 1.8};
	margin-bottom: 25px;
`;

const SignUpBtnText = styled.Text`
	color: white;
	text-align: center;
	font-weight: 600;
	font-size: 18px;
`;

const LoginLink = styled.View``;

const LoginLinkText = styled.Text`
	color: white;
	font-weight: 600;
	font-size: 16px;
`;

export default ({ navigation }) => (
	<View>
		<Image resizeMode={'contain'} source={require('../../assets/logo.png')} />
		<Touchable onPress={() => navigation.navigate('Signup')}>
			<SignUpBtn>
				<SignUpBtnText>이메일로 계정 생성</SignUpBtnText>
			</SignUpBtn>
		</Touchable>
		<Touchable onPress={() => navigation.navigate('Login')}>
			<LoginLink>
				<LoginLinkText>아이디가 있으신가요?</LoginLinkText>
			</LoginLink>
		</Touchable>
	</View>
);
