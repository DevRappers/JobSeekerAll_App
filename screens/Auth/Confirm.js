import React, { useState } from 'react';
import styled from 'styled-components';
import AuthButton from '../../components/AuthButton';
import AuthInput from '../../components/AuthInput';
import useInput from '../../hooks/useInput';
import { Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useMutation } from 'react-apollo-hooks';
import { CONFIRM_SECRET } from './AuthQueries';
import { useLogIn } from '../../AuthContext';

const View = styled.View`
	background-color: ${(props) => props.theme.mintColor};
	justify-content: center;
	align-items: center;
	flex: 1;
`;

export default ({ navigation }) => {
	const confirmInput = useInput('');
	// Hooks함수는 다른 function에서 사용불가능함
	const logIn = useLogIn();
	const [ loading, setLoading ] = useState(false);
	const [ confirmSecretMutation ] = useMutation(CONFIRM_SECRET, {
		variables: {
			secret: confirmInput.value,
			email: navigation.getParam('email')
		}
	});
	const handleConfirm = async () => {
		const { value } = confirmInput;
		if (value === '' || !value.includes(' ')) {
			return Alert.alert('시크릿코드 형식에 어긋납니다.');
		}
		try {
			setLoading(true);
			const { data: { confirmSecret } } = await confirmSecretMutation();
			if (confirmSecret !== '' || confirmSecret !== false) {
				logIn(confirmSecret);
			} else {
				Alert.alert('시크릿코드 불일치!');
			}
		} catch (e) {
			console.log(e);
			Alert.alert('시크릿코드를 다시 확인해주세요.');
		} finally {
			setLoading(false);
		}
	};
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View>
				<AuthInput
					{...confirmInput}
					placeholder="시크릿코드"
					returnKeyType="send"
					onSubmitEditing={handleConfirm}
					autoCorrect={false}
				/>
				<AuthButton loading={loading} onPress={handleConfirm} text="확인" />
			</View>
		</TouchableWithoutFeedback>
	);
};
