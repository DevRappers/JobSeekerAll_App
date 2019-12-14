import React from 'react';
import { View } from 'react-native';
import { useIsLoggedIn } from '../AuthContext';
import AuthNavigation from '../navigation/AuthNavigation';
import MainNavigation from '../navigation/MainNavigation';

export default () => {
	// 컨텍스트함수를 사용
	const isLoggedIn = useIsLoggedIn();
	console.log(isLoggedIn);
	return <View style={{ flex: '1' }}>{isLoggedIn ? <MainNavigation /> : <AuthNavigation />}</View>;
};
