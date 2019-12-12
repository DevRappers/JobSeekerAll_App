import React, { useState } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import styled from 'styled-components';
import Loader from '../../components/Loader';
import { useQuery } from 'react-apollo-hooks';
import { STUDY_QUERY } from './TabsQueries';
import StudyPost from '../../components/StudyPost';
import SearchBar from '../../components/SearchBar';

const View = styled.View`
	justify-content: center;
	align-items: center;
	flex: 1;
`;
const Text = styled.Text``;

const Container = styled.View``;

export default ({ navigation }) => {
	const [ refreshing, setRefreshing ] = useState(false);
	const { loading, data, refetch } = useQuery(STUDY_QUERY);
	const [ term, setTerm ] = useState(navigation.getParam('term', ''));
	const refresh = async () => {
		try {
			setRefreshing(true);
			await refetch();
		} catch (e) {
			console.log(e);
		} finally {
			setRefreshing(false);
		}
	};
	const onChange = (text) => {
		setTerm(text);
		navigation.setParams({
			term: text
		});
	};
	const onSubmit = () => {
		console.log(term);
	};
	return (
		<ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}>
			<SearchBar value={navigation.getParam('term', '')} onChange={onChange} onSubmit={onSubmit} />
			{loading ? <Loader /> : data && data.allStudy.map((study) => <StudyPost key={study.id} {...study} />)}
		</ScrollView>
	);
};
