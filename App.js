import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { AsyncStorage, StatusBar } from 'react-native';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import ApolloClient from 'apollo-boost';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from 'react-apollo-hooks';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import apolloClientOptions from './apollo';
import styles from './styles';
import NavController from './components/NavController';
import configureStore from './redux/store';

export default function App() {
	// store, persistor 불러오기
	const { store, persistor } = configureStore();

	// 로딩관련, client관련, 로그인관련 state
	const [ loaded, setLoaded ] = useState(false);
	const [ client, setClient ] = useState(null);

	const preLoad = async () => {
		try {
			// 폰트 불러오기
			await Font.loadAsync({
				...Ionicons.font
			});

			// 앱에 필요한 이미지를 불러옴
			await Asset.loadAsync([ require('./assets/logo.png') ]);

			const cache = new InMemoryCache();
			await persistCache({
				cache,
				storage: AsyncStorage
			});

			// 클라이언트 생성
			const client = new ApolloClient({
				cache,
				request: async (operation) => {
					const token = await AsyncStorage.getItem('jwt');
					return operation.setContext({
						headers: { Authorization: `Bearer ${token}` }
					});
				},
				...apolloClientOptions
			});

			setLoaded(true);
			setClient(client);
		} catch (e) {
			console.log(e);
		}
	};

	// useEffect로 앱 시작시 preLoad함수를 호출함
	useEffect(() => {
		preLoad();
	}, []);

	// 로딩이 완료되고 client가 있으면 화면을 보여주고 그렇지 않을 경우 로딩창 출력
	return loaded && client !== null ? (
		<ApolloProvider client={client}>
			<ThemeProvider theme={styles}>
				<Provider store={store}>
					<PersistGate persistor={persistor}>
						<StatusBar barStyle="dark-content" />
						<NavController />
					</PersistGate>
				</Provider>
			</ThemeProvider>
		</ApolloProvider>
	) : (
		<AppLoading />
	);
}
