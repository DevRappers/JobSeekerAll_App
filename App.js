import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { AsyncStorage } from 'react-native';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import ApolloClient from 'apollo-boost';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from 'react-apollo-hooks';
import apolloClientOptions from './apollo';
import styles from './styles';
import NavController from './components/NavController';
import { AuthProvider } from './AuthContext';

export default function App() {
	// 로딩상태관련 state, 클라이언트 관련 state, 로그인 관련 state
	const [ loaded, setLoaded ] = useState(false);
	const [ client, setClient ] = useState(null);
	const [ isLoggedIn, setIsLoggedIn ] = useState(null);

	// App에 필요한 정보를 가져온다.
	const preLoad = async () => {
		try {
			await Font.loadAsync({
				...Ionicons.font
			});
			await Asset.loadAsync([ require('./assets/logo.png') ]);

			// 이전에 사용했던 cache정보를 불러올때 사용함.
			const cache = new InMemoryCache();

			// cache를 불러옴 AsyncStorage에서
			await persistCache({
				cache,
				storage: AsyncStorage
			});

			// ApolloClient 생성
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

			// AsyncStorage에서 로그인상태를 가져온다.
			const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
			// 기기에 저장된 로그인 정보가 false이거나 null이면 로그인상태를 false로 설정해주고, true일 경우 로그인상태를 true로 처리
			if (!isLoggedIn || isLoggedIn === 'false') {
				setIsLoggedIn(false);
			} else {
				setIsLoggedIn(true);
			}

			// loaded를 true로 만들어 뷰가 보이도록, client정보를 저장함
			setLoaded(true);
			setClient(client);
		} catch (e) {
			console.log(e);
		}
	};

	// useEffect로 앱이 mount되면 preLoad를 호출함.
	useEffect(() => {
		preLoad();
	}, []);

	// loaded상태가 true일 경우 뷰를 보여주고 그렇지 않을 경우 AppLoading을 보여줌.
	return loaded && client && isLoggedIn !== null ? (
		<ApolloProvider client={client}>
			<ThemeProvider theme={styles}>
				<AuthProvider isLoggedIn={isLoggedIn}>
					<NavController />
				</AuthProvider>
			</ThemeProvider>
		</ApolloProvider>
	) : (
		<AppLoading />
	);
}
