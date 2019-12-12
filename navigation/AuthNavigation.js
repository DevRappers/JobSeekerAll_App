/*
    AuthNavigation
    - 처음 화면으로 로그인, 회원가입, 패스워드확인, 이메일인증을 포함한 Navigation임.
*/
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Signup from '../screens/Auth/Signup';
import Confirm from '../screens/Auth/Confirm';
import Login from '../screens/Auth/Login';
import Privacy from '../screens/Auth/Privacy';
import AuthHome from '../screens/Auth/AuthHome';

// StackNavigator를 생성해줌 StackNavigator는 점점쌓이는 형태의 네비게이션임
const AuthNavigation = createStackNavigator(
	{
		AuthHome,
		Signup,
		Privacy,
		Login,
		Confirm
	},
	{
		headerMode: 'none'
	}
);

// AppContainer를 반환해줘야함.
export default createAppContainer(AuthNavigation);
