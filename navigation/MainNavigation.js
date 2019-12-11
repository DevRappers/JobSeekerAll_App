/*
	MainNavigation 
	- 탭 네비게이션안에 있는 스크린들이 Stack으로 구현될 수 있도록 하기
*/

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import TabNavigation from './TabNavigation';
import PostNavigation from './PostNavigation';

const MainNavigation = createStackNavigator(
	{
		TabNavigation,
		PostNavigation
	},
	{
		headerMode: 'none',
		mode: 'modal'
	}
);

export default createAppContainer(MainNavigation);