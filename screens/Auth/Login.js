/*
	Login Screen
*/
import React, { useState } from 'react';
import styled from 'styled-components';
import AuthButtton from '../../components/AuthButton';
import AuthInput from '../../components/AuthInput';
import useInput from '../../hooks/useInput';
import { Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { REQUEST_SECRET, LOG_IN } from './AuthQueries';
import { useMutation } from 'react-apollo-hooks';
import { useLogIn } from '../../AuthContext';

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
	// emailInput과 passwordInput
	const emailInput = useInput('');
	const passwordInput = useInput('');

	// 로딩 상태 관리
	const [ loading, setLoading ] = useState(false);

	// 이메일로 시크릿코드 발송
	const [ requestSecretMutation ] = useMutation(REQUEST_SECRET, {
		variables: {
			email: emailInput.value
		}
	});

	// 로그인
	const [ loginMutation ] = useMutation(LOG_IN, {
		variables: {
			email: emailInput.value,
			password: passwordInput.value
		}
	});

	const logIn = useLogIn();

	const handleLogin = async () => {
		// 이메일 유효성 검사
		const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (emailInput.value === '') {
			return Alert.alert('이메일칸이 비었습니다.');
		} else if (!emailInput.value.includes('@') || !emailInput.value.includes('.')) {
			return Alert.alert('이메일 형식에 어긋납니다.');
		} else if (!emailRegex.test(emailInput.value)) {
			return Alert.alert('이메일 형식에 어긋납니다.');
		}

		if (passwordInput.value === '') {
			return Alert.alert('비밀번호를 입력해주세요.');
		}

		try {
			setLoading(true);
			const { data: { confirmPassword } } = await loginMutation();
			console.log(confirmPassword);
			if (confirmPassword === '2') {
				const { data: { requestSecret } } = await requestSecretMutation();
				Alert.alert('이메일 인증을 부탁드립니다. 발송된 메일을 확인해주세요.');
				navigation.navigate('Confirm', { email: emailInput.value });
			} else if (confirmPassword === '3') {
				Alert.alert('아이디 또는 비밀번호가 틀렸습니다.');
			} else {
				logIn(confirmPassword);
				Alert.alert('로그인 되었습니다!');
			}
		} catch (e) {
			console.log(e);
			Alert.alert('로그인 실패');
		} finally {
			setLoading(false);
		}
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View>
				<AuthInput
					{...emailInput}
					placeholder="이메일"
					keyboardType="email-address"
					returnKeyType="send"
					autoCorrect={false}
				/>
				<AuthInput
					{...passwordInput}
					placeholder="비밀번호"
					secureTextEntry
					returnKeyType="send"
					autoCorrect={false}
				/>
				<Views />
				<AuthButtton loading={loading} text="확인" onPress={handleLogin} />
				<Touchable onPress={() => navigation.navigate('Signup')}>
					<LoginLink>
						<LoginLinkText>아이디가 없으신가요?</LoginLinkText>
					</LoginLink>
				</Touchable>
			</View>
		</TouchableWithoutFeedback>
	);
};
