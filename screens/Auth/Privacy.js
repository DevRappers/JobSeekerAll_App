import React, { useState } from 'react';
import styled from 'styled-components';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import AuthButton from '../../components/AuthButton';
import AuthInput from '../../components/AuthInput';
import useInput from '../../hooks/useInput';
import { Alert } from 'react-native';
import { useMutation } from 'react-apollo-hooks';
import { CREATE_ACCOUNT } from './AuthQueries';

const View = styled.View`
	background-color: ${(props) => props.theme.mintColor};
	justify-content: center;
	align-items: center;
	flex: 1;
`;

const Views = styled.View`margin-bottom: 30px;`;

export default ({ navigation }) => {
	const usernameInput = useInput(navigation.getParam('name', ''));
	const emailInput = useInput(navigation.getParam('email', ''));
	const passInput = useInput('');
	const ageInput = useInput('');
	const departmentInput = useInput('');
	const areaInput = useInput('');

	const [ loading, setLoading ] = useState(false);

	const [ createAccountMutation ] = useMutation(CREATE_ACCOUNT, {
		variables: {
			username: usernameInput.value,
			email: emailInput.value,
			password: passInput.value,
			age: parseInt(ageInput.value),
			department: departmentInput.value,
			area: areaInput.value
		}
	});

	const handleSingup = async () => {
		const { value: username } = usernameInput;
		const { value: email } = emailInput;
		const { value: password } = passInput;
		const { value: age } = ageInput;
		const { value: department } = departmentInput;
		const { value: area } = areaInput;

		const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!emailRegex.test(email)) {
			return Alert.alert('이메일형식에 맞게 입력해주세요.');
		}
		if (username === '') {
			return Alert.alert('사용자이름을 입력해주세요.');
		}
		if (password === '') {
			return Alert.alert('패스워드를 입력해주세요.');
		}
		if (age === '') {
			return Alert.alert('나이를 입력해주세요.');
		}
		if (department === '') {
			return Alert.alert('활동분야 또는 학과를 입력해주세요.');
		}
		if (area === '') {
			return Alert.alert('지역을 입력해주세요.');
		}
		try {
			setLoading(true);
			const { data: { createAccount } } = await createAccountMutation();
			if (createAccount) {
				Alert.alert('회원가입완료!', '로그인해주세요.');
				navigation.navigate('Login', { email });
			}
		} catch (e) {
			console.log(e);
			Alert.alert('이미 존재하는 이름입니다.', '가입하신 이메일로 로그인해주세요.');
			navigation.navigate('Login', { email });
		} finally {
			setLoading(false);
		}
	};
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View>
				<AuthInput {...usernameInput} placeholder="사용자이름" returnKeyType="send" autoCorrect={false} />
				<AuthInput
					{...emailInput}
					placeholder="이메일"
					keyboardType="email-address"
					returnKeyType="send"
					autoCorrect={false}
				/>
				<AuthInput {...passInput} placeholder="비밀번호" returnKeyType="send" autoCorrect={false} secureTextEntry />
				<AuthInput
					{...ageInput}
					placeholder="나이"
					keyboardType="number-pad"
					returnKeyType="send"
					autoCorrect={false}
				/>
				<AuthInput {...departmentInput} placeholder="활동분야 또는 학과" returnKeyType="send" autoCorrect={false} />
				<AuthInput {...areaInput} placeholder="활동지역" returnKeyType="send" autoCorrect={false} />
				<Views />
				<AuthButton loading={loading} onPress={handleSingup} text="회원가입" />
			</View>
		</TouchableWithoutFeedback>
	);
};
