/*
	Signup
	- 회원가입 screen으로 페이스북, 구글 회원가입 및 이메일을 통한 회원가입이 가능하게 만들어놓음
*/
import React, { useState } from 'react';
import styled from 'styled-components';
import { Alert } from 'react-native';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import AuthButton from '../../components/AuthButton';

const View = styled.View`
	background-color: ${(props) => props.theme.mintColor};
	justify-content: center;
	align-items: center;
	flex: 1;
`;

const FBContainer = styled.View`padding-top: 25px;`;

const Touchable = styled.TouchableOpacity``;
const LoginLink = styled.View``;

const LoginLinkText = styled.Text`
	color: white;
	margin-top: 20px;
	font-weight: 600;
	font-size: 16px;
`;

export default ({ navigation }) => {
	const [ loading, setLoading ] = useState(false);
	const fbLogin = async () => {
		try {
			await Facebook.initializeAsync('2584886805126272');
			setLoading(true);
			const { type, token } = await Facebook.logInWithReadPermissionsAsync({
				permissions: [ 'public_profile', 'email' ]
			});
			if (type === 'success') {
				// Get the user's name using Facebook's Graph API
				const response = await fetch(
					`https://graph.facebook.com/me?access_token=${token}&fields=id,email,name`
				);
				const { email, name } = await response.json();
				//updateFormData(email, first_name, last_name);
				Alert.alert('페이스북로그인 성공!', `나머지 정보를 입력해주세요. ${(await response.json()).name}님!`);
				navigation.navigate('Privacy', { email, name });
				setLoading(false);
			} else {
				// type === 'cancel'
			}
		} catch ({ message }) {
			alert(`페이스북 로그인 에러!: ${message}`);
			setLoading(false);
		}
	};
	const googleLogin = async () => {
		const GOOGLE_ID = '160434121506-agq9pcc3jfneuns5nuti8kso8c4hsa5n.apps.googleusercontent.com';
		try {
			setLoading(true);
			const result = await Google.logInAsync({
				iosClientId: GOOGLE_ID,
				scopes: [ 'profile', 'email' ]
			});
			if (result.type === 'success') {
				const user = await fetch('https://www.googleapis.com/userinfo/v2/me', {
					headers: { Authorization: `Bearer ${result.accessToken}` }
				});
				const { email, given_name, family_name } = await user.json();
				const name = given_name + family_name;
				Alert.alert('구글로그인 성공!', `나머지 정보를 입력해주세요. ${name}님!`);
				navigation.navigate('Privacy', { email, name });
				setLoading(false);
			} else {
				return { cancelled: true };
			}
		} catch (e) {
			setLoading(false);
			return { error: true };
		} finally {
			setLoading(false);
		}
	};
	return (
		<View>
			<FBContainer>
				<AuthButton loading={false} onPress={() => navigation.navigate('Privacy')} text="이메일로 회원가입" />
				<AuthButton bgColor={'#2D4DA7'} loading={false} onPress={fbLogin} text="Facebook 연결" />
				<AuthButton bgColor={'#EE1922'} loading={false} onPress={googleLogin} text="Google 연결" />
			</FBContainer>
			<Touchable onPress={() => navigation.navigate('Login')}>
				<LoginLink>
					<LoginLinkText>이미 회원이신가요?</LoginLinkText>
				</LoginLink>
			</Touchable>
		</View>
	);
};
