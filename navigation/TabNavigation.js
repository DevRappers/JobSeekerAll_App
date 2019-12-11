/*
    TabNavigation
    - 로그인시 나오는 화면들로 TabsNavigation으로 구현되었으며 
    Home : 기본화면 
    Hobby: 취미모임관련 화면 
    Study: 스터디관련 화면 
    Profile : 내정보 화면 
    Search : 검색하는 화면 
*/
import { View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Home from '../screens/Tabs/Home';
import Hobby from '../screens/Tabs/Hobby';
import Study from '../screens/Tabs/Study';
import Profile from '../screens/Tabs/Profile';
import Search from '../screens/Tabs/Search';

const TabNavigation = createBottomTabNavigator({
	Home,
	Study,
	Search,
	Add: {
		screen: View,
		navigationOptions: {
			tabBarOnPress: () => {
				console.log('Add');
			}
		}
	},
	Hobby,
	Profile
});

export default createAppContainer(TabNavigation);
