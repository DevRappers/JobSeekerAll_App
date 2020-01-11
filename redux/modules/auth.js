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
	// 기존의 App.js apollo client에서 token정보를 불러오는 부분이 있기 때문에
	// state가 아닌 token정보를 AsyncStorage를 사용하여 저장
	await AsyncStorage.setItem('jwt', token);
	dispatch({ type: USER_LOGIN });
};

// 로그아웃
export const useLogOut = () => async (dispatch) => {
	// 로그아웃시 AsyncStorage클리어
	await AsyncStorage.clear();
	dispatch({ type: USER_LOGOUT });
};

// 초기 상태
const initialState = {
	// 로그인 여부, 토큰은 AsyncStorage로 따로 저장해주기 때문에 state설정X
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
