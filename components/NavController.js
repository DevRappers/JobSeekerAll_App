import React from 'react';
import { View } from 'react-native';
import { useIsLoggedIn, useLogIn, useLogOut } from '../AuthContext';
import AuthNavigation from '../navigation/AuthNavigation';
import MainNavigation from '../navigation/MainNavigation';
export default () => {
	// 로그인상태와 로그인함수 로그아웃함수
	// const isLoggedIn = useIsLoggedIn();
	// const logIn = useLogIn();
	// const logOut = useLogOut();
	const isLoggedIn = true;

	// 로그인 시 MainNavigation을 보여주고 그렇지 않을 경우 AuthNavigation을 보여줌
	return <View style={{ flex: '1' }}>{isLoggedIn ? <MainNavigation /> : <AuthNavigation />}</View>;
};
