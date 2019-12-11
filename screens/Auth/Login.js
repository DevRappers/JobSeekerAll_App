import React from 'react';
import styled from 'styled-components';
import AuthButtton from '../../components/AuthButton';
import AuthInput from '../../components/AuthInput';
import useInput from '../../hooks/useInput';

const View = styled.View`
	background-color: ${(props) => props.theme.mintColor};
	justify-content: center;
	align-items: center;
	flex: 1;
`;

const Views = styled.View`height: 60px;`;
const Touchable = styled.TouchableOpacity``;
const LoginLink = styled.View``;

const LoginLinkText = styled.Text`
	color: white;
	margin-top: 20px;
	font-weight: 600;
	font-size: 16px;
`;
export default ({ navigation }) => {
	const emailInput = useInput('');
	const passwordInput = useInput('');
	return (
		<View>
			<AuthInput {...emailInput} placeholder="이메일" keyboardType="email-address" />
			<AuthInput {...passwordInput} placeholder="비밀번호" keyboardType="default" secureTextEntry />
			<Views />
			<AuthButtton text="확인" onPress={() => null} />
			<Touchable onPress={() => navigation.navigate('Signup')}>
				<LoginLink>
					<LoginLinkText>아이디가 없으신가요?</LoginLinkText>
				</LoginLink>
			</Touchable>
		</View>
	);
};
