/*
	NavController
	- 로그인 여부에 따라 Navigation을 정해주는 Component

	수정 
	context -> react-redux useSelector 방식
*/
import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import AuthNavigation from '../navigation/AuthNavigation';
import MainNavigation from '../navigation/MainNavigation';

export default () => {
	const { isLoggedIn } = useSelector((state) => ({
		isLoggedIn: state.auth.isLoggedIn
	}));

	return <View style={{ flex: '1' }}>{isLoggedIn ? <MainNavigation /> : <AuthNavigation />}</View>;
};
