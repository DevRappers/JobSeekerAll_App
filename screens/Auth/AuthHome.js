import React from 'react';
import styled from 'styled-components';
import constants from '../../constants';
import AuthButton from '../../components/AuthButton';

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

const LoginLink = styled.View``;

const LoginLinkText = styled.Text`
	color: white;
	margin-top: 20px;
	font-weight: 600;
	font-size: 16px;
`;

export default ({ navigation }) => (
	<View>
		<Image resizeMode={'contain'} source={require('../../assets/logo.png')} />
		<AuthButton text="이메일로 계정 생성" onPress={() => navigation.navigate('Signup')} />
		<Touchable onPress={() => navigation.navigate('Login')}>
			<LoginLink>
				<LoginLinkText>이미 회원이신가요?</LoginLinkText>
			</LoginLink>
		</Touchable>
	</View>
);
