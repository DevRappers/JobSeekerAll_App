/*
    PostNavigation
	- 가운데에 있는 버튼을 눌렀을때 나오는 창으로 
	간편하게 새로운 모임과 스터디를 생성할 수 있도록 구현하였음 
	newHobby : 새로운 취미모임 생성 
	newStudy : 새로운 스터디 생성 
	UploadPost : 아직 미정임 
*/
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import NewHobby from '../screens/Post/NewHobby';
import NewStudy from '../screens/Post/NewStudy';
import SelectPhoto from '../screens/Post/SelectPhoto';
import TakePhoto from '../screens/Post/TakePhoto';
import { createStackNavigator, HeaderTitle } from 'react-navigation-stack';
import { stackStyles } from './config';
import styles from '../styles';

const PostTabs = createMaterialTopTabNavigator(
	{
		NewHobby: {
			screen: NewHobby,
			navigationOptions: {
				tabBarLabel: '취미모임 만들기'
			}
		},
		NewStudy: {
			screen: NewStudy,
			navigationOptions: {
				tabBarLabel: '스터디 만들기'
			}
		}
	},
	{
		tabBarPosition: 'top',
		tabBarOptions: {
			indicatorStyle: {
				backgroundColor: styles.mintColor,
				marginBottom: 0
			},
			labelStyle: {
				color: styles.blackColor,
				fontWeight: '600'
			},
			style: {
				...stackStyles
			}
		}
	}
);

export default createStackNavigator(
	{
		Tabs: {
			screen: PostTabs,
			navigationOptions: {
				title: '빠른추가',
				headerBackTitle: null
			}
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
	},
	{
		defaultNavigationOptions: {
			headerStyle: {
				...stackStyles
			}
		}
	}
);
