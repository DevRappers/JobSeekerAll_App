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
import UploadPost from '../screens/Post/UploadPost';
import { createStackNavigator } from 'react-navigation-stack';
import { stackStyles } from './config';

const PostTabs = createMaterialTopTabNavigator(
	{
		NewHobby,
		NewStudy
	},
	{
		tabBarPosition: 'bottom'
	}
);

export default createStackNavigator(
	{
		PostTabs,
		UploadPost
	},
	{
		defaultNavigationOptions: {
			headerStyle: {
				...stackStyles
			}
		}
	}
);
