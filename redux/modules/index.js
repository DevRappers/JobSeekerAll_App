/*
    2020/01/10
    Auth관련 Context -> Redux로 수정 
    rootReducer생성
*/
import { combineReducers } from 'redux';
import auth from './auth';

// 루트 리듀서 만들기(현재는 이런식으로 생성해주지 않아도 되지만 추후 리펙토링시 편리)
const rootReducer = combineReducers({
	auth
});

export default rootReducer;
