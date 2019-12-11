import React, { createContext, useContext, useState } from 'react';
import { AsyncStorage } from 'react-native';

// Context를 생성함
export const AuthContext = createContext();

// Provider
export const AuthProvider = ({ isLoggedIn: isLoggedInProps, children }) => {
	// 로그인 관련 state
	const [ isLoggedIn, setIsLoggedIn ] = useState(isLoggedInProps);

	// 로그인 함수
	const logUserIn = async (token) => {
		try {
			// 로그인시 AsyncStorage에 isLoggedIn을 true로 만들어줌
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
			// 로그아웃시 AsyncStorage에 isLoggedIn을 false로 만들어줌
			await AsyncStorage.setItem('isLoggedIn', 'false');
			setIsLoggedIn(false);
		} catch (e) {
			console.log(e);
		}
	};
	// Context Provider로 로그인상태와 로그인함수, 로그아웃함수를 사용할 수 있도록 함.
	return <AuthContext.Provider value={{ isLoggedIn, logUserIn, logUserOut }}>{children}</AuthContext.Provider>;
};

// 다른 곳에서 로그인상태를 관리할 수 있도록
export const useIsLoggedIn = () => {
	const { isLoggedIn } = useContext(AuthContext);
	return isLoggedIn;
};

// 다른 곳에서 로그인함수를 사용할 수 있도록
export const useLogIn = () => {
	const { logUserIn } = useContext(AuthContext);
	return logUserIn;
};

// 다른 곳에서 로그아웃함수를 사용할 수 있도록
export const useLogOut = () => {
	const { logUserOut } = useContext(AuthContext);
	return logUserOut;
};
