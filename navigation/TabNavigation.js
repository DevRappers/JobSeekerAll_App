/*
    TabNavigation
    - 로그인시 나오는 화면들로 TabsNavigation으로 구현되었으며 
    Home : 기본화면 
    Hobby: 취미모임관련 화면 
    Study: 스터디관련 화면 
    Profile : 내정보 화면 
*/
import React from 'react';
import { View, Platform } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import styles from '../styles';
import StudyLink from '../components/StudyLink';
import NavIcon from '../components/NavIcon';
import HobbyLink from '../components/HobbyLink';
import PostLink from '../components/PostLink';
import Home from '../screens/Tabs/Home';
import Hobby from '../screens/Tabs/Hobby';
import Study from '../screens/Tabs/Study';
import Profile from '../screens/Tabs/Profile';
import StudyDetail from '../screens/Detail/StudyDetail';
import MyStudy from '../screens/My/MyStudy';
import StudyEdit from '../screens/Edit/StudyEdit';
import HobbyDetail from '../screens/Detail/HobbyDetail';
import PostDetail from '../screens/Detail/PostDetail';
import SelectPhoto from '../screens/Post/SelectPhoto';
import TakePhoto from '../screens/Post/TakePhoto';
import HobbyEdit from '../screens/Edit/HobbyEdit';
import NewPost from '../screens/Post/NewPost';
import MyHobby from '../screens/My/MyHobby';
import PostEdit from '../screens/Edit/PostEdit';

// 헤더를 만들어주기 위한 함수로 tabnavigation의 있는 정보가 들어오면 스택네비게이션으로 반환해줌
// tab네비게이션을 스택네비게이션으로 만들어주는 과정
const stackFactory = (initialRoute, customConfig) =>
	createStackNavigator({
		InitialRout: {
			screen: initialRoute,
			navigationOptions: {
				...customConfig
			}
		},
		MyStudy: {
			screen: MyStudy,
			navigationOptions: ({ navigation }) => ({
				headerTintColor: styles.blackColor,
				title: '나의 스터디'
			})
		},
		MyHobby: {
			screen: MyHobby,
			navigationOptions: ({ navigation }) => ({
				headerTintColor: styles.blackColor,
				title: '나의 모임'
			})
		},
		StudyEdit: {
			screen: StudyEdit,
			navigationOptions: ({ navigation }) => ({
				headerTintColor: styles.blackColor,
				title: '스터디수정'
			})
		},
		StudyDetail: {
			screen: StudyDetail,
			navigationOptions: ({ navigation }) => ({
				headerTintColor: styles.blackColor,
				title: navigation.getParam('title'),
				headerRight: navigation.getParam('isMyStudy') ? <StudyLink /> : null
			})
		},
		HobbyEdit: {
			screen: HobbyEdit,
			navigationOptions: ({ navigation }) => ({
				headerTintColor: styles.blackColor,
				title: '모임수정'
			})
		},
		HobbyDetail: {
			screen: HobbyDetail,
			navigationOptions: ({ navigation }) => ({
				headerTintColor: styles.blackColor,
				title: '취미모임',
				headerRight: navigation.getParam('isMyHobby') ? <HobbyLink /> : null
			})
		},
		NewPost: {
			screen: NewPost,
			navigationOptions: ({ navigation }) => ({
				headerTintColor: styles.blackColor,
				title: '공고올리기'
			})
		},
		PostEdit: {
			screen: PostEdit,
			navigationOptions: ({ navigation }) => ({
				headerTintColor: styles.blackColor,
				title: '포스트수정'
			})
		},
		PostDetail: {
			screen: PostDetail,
			navigationOptions: ({ navigation }) => ({
				headerTintColor: styles.blackColor,
				title: '포스트',
				headerRight: navigation.getParam('isMyPost') ? (
					<PostLink id={navigation.getParam('id')} postId={navigation.getParam('hobbyId')} />
				) : null
			})
		},
		SelectPhoto: {
			screen: SelectPhoto,
			navigationOptions: {
				title: '사진선택'
			}
		},
		TakePhoto: {
			screen: TakePhoto,
			navigationOptions: {
				title: '사진촬영'
			}
		}
	});

export default (TabNavigation = createBottomTabNavigator(
	{
		Home: {
			screen: stackFactory(Home, {
				title: '취준모아'
			}),
			navigationOptions: {
				tabBarIcon: ({ focused }) => (
					<NavIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'} />
				),
				tabBarLabel: '홈'
			}
		},
		Study: {
			screen: stackFactory(Study, {
				title: '스터디'
			}),
			navigationOptions: {
				tabBarIcon: ({ focused }) => (
					<NavIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-book' : 'md-book'} />
				),
				tabBarLabel: '스터디'
			}
		},
		Add: {
			screen: () => <View />,
			navigationOptions: {
				tabBarOnPress: ({ navigation }) => navigation.navigate('PostNavigation'),
				tabBarIcon: ({ focused }) => (
					<NavIcon
						focused={focused}
						size={32}
						name={Platform.OS === 'ios' ? 'ios-add-circle-outline' : 'md-add-circle-outline'}
					/>
				),
				tabBarLabel: '빠른추가'
			}
		},
		Hobby: {
			screen: stackFactory(Hobby, {
				title: '취미모임'
			}),
			navigationOptions: {
				tabBarIcon: ({ focused }) => (
					<NavIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-heart' : 'md-heart'} />
				),
				tabBarLabel: '취미모임'
			}
		},
		Profile: {
			screen: stackFactory(Profile, {
				title: '내정보'
			}),
			navigationOptions: {
				tabBarIcon: ({ focused }) => (
					<NavIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'} />
				),
				tabBarLabel: '내정보'
			}
		}
	},
	{
		tabBarOptions: {
			activeTintColor: '#2BC0BC',
			style: {
				backgroundColor: '#FAFAFA'
			}
		}
	}
));
