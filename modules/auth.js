/*
    2020/01/10
    Auth관련 Context -> Redux로 수정 
    auth모듈 생성
*/
import { AsyncStorage } from 'react-native';

// 액션 타입
const USER_LOGIN = 'auth/USER_LOGIN';
const USER_LOGOUT = 'auth/USER_LOGOUT';

// 액션 생성함수

// 로그인
export const useLogIn = (token) => async (dispatch) => {
	await AsyncStorage.setItem('isLoggedIn', 'true');
	await AsyncStorage.setItem('jwt', token);
	dispatch({ type: USER_LOGIN });
};

// 로그아웃
export const useLogOut = () => async (dispatch) => {
	await AsyncStorage.setItem('isLoggedIn', 'false');
	await AsyncStorage.clear();
	dispatch({ type: USER_LOGOUT });
};

// 초기 상태
const initialState = {
	isLoggedIn: false
};

// 리듀서
export default function auth(state = initialState, action) {
	switch (action.type) {
		case USER_LOGIN:
			return {
				...state,
				isLoggedIn: true
			};
		case USER_LOGOUT:
			return {
				...state,
				isLoggedIn: false
			};
		default:
			return state;
	}
}
