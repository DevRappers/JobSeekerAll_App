import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useIsLoggedIn, useLogIn, useLogOut } from '../AuthContext';

export default () => {
	// 컨텍스트함수를 사용함
	const isLoggedIn = useIsLoggedIn();
	const logIn = useLogIn();
	const logOut = useLogOut();

	return (
		<View style={{ flex: '1', justifyContent: 'center', alignItems: 'center' }}>
			{isLoggedIn ? (
				<TouchableOpacity onPress={logOut}>
					<Text>Log Outs</Text>
				</TouchableOpacity>
			) : (
				<TouchableOpacity onPress={logIn}>
					<Text>Log In</Text>
				</TouchableOpacity>
			)}
		</View>
	);
};
