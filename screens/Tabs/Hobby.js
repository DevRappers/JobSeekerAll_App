/*
	Hobby
	- 취미모임 화면
*/
import React, { useState } from 'react';
import { ScrollView, RefreshControl, Platform } from 'react-native';
import { SearchBar, ButtonGroup } from 'react-native-elements';
import { useQuery } from 'react-apollo-hooks';
import Loader from '../../components/Loader';
import { SEARCH_HOBBY_QUERY } from './TabsQueries';
import { AREA_LIST } from '../../DataList';
import HobbyPost from '../../components/HobbyPost';

export default ({ navigation }) => {
	const [ buttonIndex, setButtonIndex ] = useState(0);
	const [ refreshing, setRefreshing ] = useState(false);
	const [ term, setTerm ] = useState('');
	const { loading, data, refetch } = useQuery(SEARCH_HOBBY_QUERY, {
		variables: {
			term
		}
	});

	const updateIndex = async (selectedIndex) => {
		if (selectedIndex === 0) {
			setButtonIndex(selectedIndex);
			setTerm('');
		} else {
			setButtonIndex(selectedIndex);
			setTerm(AREA_LIST[selectedIndex]);
		}
		try {
			await refetch({ variables: { term } });
		} catch (e) {
			console.log(e);
		}
	};

	const refresh = async () => {
		try {
			setRefreshing(true);
			await refetch({ variables: { term } });
		} catch (e) {
			console.log(e);
		} finally {
			setRefreshing(false);
		}
	};
	const onChange = (text) => {
		setTerm(text);
	};
	const onSubmit = async () => {
		await refetch({ variables: { term } });
	};
	return (
		<ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}>
			<SearchBar
				value={null}
				onChangeText={onChange}
				onSubmit={onSubmit}
				platform={Platform.OS === 'ios' ? 'ios' : 'android'}
				placeholder="취미모임 검색"
			/>
			<ScrollView
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				style={{ marginBottom: 10, marginTop: 10 }}
			>
				<ButtonGroup
					onPress={updateIndex}
					selectedIndex={buttonIndex}
					buttons={AREA_LIST}
					containerStyle={{ height: 20 }}
					buttonStyle={{ width: 100 }}
					selectedButtonStyle={{ backgroundColor: '#2BC0BC' }}
				/>
			</ScrollView>
			{loading ? <Loader /> : data && <HobbyPost navigation={navigation} data={data.searchHobby} />}
		</ScrollView>
	);
};
