import React, { createContext, useContext, useState } from 'react';
import { AsyncStorage } from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({ isLoggedIn: isLoggedInProps, children }) => {
	const [ isLoggedIn, setIsLoggedIn ] = useState(isLoggedInProps);
	// 로그인 함수
	const logUserIn = async (token) => {
		try {
			await AsyncStorage.setItem('isLoggedIn', 'true');
			await AsyncStorage.setItem('jwt', token);
			setIsLoggedIn(true);
		} catch (e) {
			console.log(e);
		}
	};

	// 로그아웃 함수
	const logUserOut = async () => {
		try {
			await AsyncStorage.clear();
			await AsyncStorage.setItem('isLoggedIn', 'false');
			setIsLoggedIn(false);
		} catch (e) {
			console.log(e);
		}
	};
	return <AuthContext.Provider value={{ isLoggedIn, logUserIn, logUserOut }}>{children}</AuthContext.Provider>;
};

export const useIsLoggedIn = () => {
	const { isLoggedIn } = useContext(AuthContext);
	return isLoggedIn;
};

export const useLogIn = () => {
	const { logUserIn } = useContext(AuthContext);
	return logUserIn;
};

export const useLogOut = () => {
	const { logUserOut } = useContext(AuthContext);
	return logUserOut;
};
