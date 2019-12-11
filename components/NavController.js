import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useIsLoggedIn, useLogIn, useLogOut } from '../AuthContext';
import AuthNavigation from '../navigation/AuthNavigation';

export default () => {
	// 로그인상태와 로그인함수 로그아웃함수
	const isLoggedIn = useIsLoggedIn();
	const logIn = useLogIn();
	const logOut = useLogOut();

	return (
		<View style={{ flex: '1' }}>
			{isLoggedIn ? (
				<TouchableOpacity onPress={logOut}>
					<Text>Log Outs</Text>
				</TouchableOpacity>
			) : (
				<AuthNavigation />
			)}
		</View>
	);
};
