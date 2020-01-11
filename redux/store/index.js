/*
    로그인 유지를 위해 
    redux-persist사용 및 store따로 분리 
*/
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import ReduxThunk from 'redux-thunk';
import rootReducer from '../modules';

// persistConfig 설정 storage를 AsyncStorage로 설정함
const persistConfig = {
	key: 'root',
	storage: AsyncStorage
};

const enhancedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore() {
	const store = createStore(enhancedReducer, applyMiddleware(ReduxThunk));
	const persistor = persistStore(store);
	return { store, persistor };
}
