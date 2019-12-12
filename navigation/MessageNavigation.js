/*
	MessageNavigation
	- 메세지 네비게이션으로 채팅할 때 사용됨 
*/
import { createStackNavigator } from 'react-navigation-stack';
import Messages from '../screens/Message/Messages';
import Message from '../screens/Message/Message';
import { stackStyles } from './config';

export default createStackNavigator(
	{
		Messages,
		Message
	},
	{
		defaultNavigationOptions: {
			headerStyle: {
				...stackStyles
			}
		}
	}
);
