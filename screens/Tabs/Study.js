import React, { useState } from 'react';
import { ScrollView, RefreshControl, Platform } from 'react-native';
import { SearchBar } from 'react-native-elements';
import styled from 'styled-components';
import Loader from '../../components/Loader';
import { useQuery } from 'react-apollo-hooks';
import { SEARCH_STUDY_QUERY } from './TabsQueries';
import StudyPost from '../../components/StudyPost';
//import SearchBar from '../../components/SearchBar';

const View = styled.View`
	justify-content: center;
	align-items: center;
	flex: 1;
`;
const Text = styled.Text``;

const Container = styled.View``;

export default ({ navigation }) => {
	const [ refreshing, setRefreshing ] = useState(false);
	const [ term, setTerm ] = useState('');
	const { loading, data, refetch } = useQuery(SEARCH_STUDY_QUERY, {
		variables: {
			term
		}
	});

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
				value={term}
				onChangeText={onChange}
				onSubmit={onSubmit}
				platform={Platform.OS === 'ios' ? 'ios' : 'android'}
				placeholder="스터디 검색"
			/>
			{loading ? (
				<Loader />
			) : (
				data && data.searchStudy.map((study) => <StudyPost navigation={navigation} key={study.id} {...study} />)
			)}
		</ScrollView>
	);
};
