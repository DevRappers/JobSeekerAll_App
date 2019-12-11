import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { Text, View, AsyncStorage } from 'react-native';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo-hooks';
import apolloClientOptions from './apollo';

export default function App() {
	// 로딩상태관련 state, 클라이언트 관련 state
	const [ loaded, setLoaded ] = useState(false);
	const [ client, setClient ] = useState(null);

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
				...apolloClientOptions
			});

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
	return loaded && client ? (
		<ApolloProvider client={client}>
			<View>
				<Text>Hello</Text>
			</View>
		</ApolloProvider>
	) : (
		<AppLoading />
	);
}
