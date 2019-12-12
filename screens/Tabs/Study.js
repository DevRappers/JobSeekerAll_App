import React, { useState } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import styled from 'styled-components';
import Loader from '../../components/Loader';
import { useQuery } from 'react-apollo-hooks';
import { STUDY_QUERY } from './TabsQueries';
import StudyPost from '../../components/StudyPost';

const View = styled.View`
	justify-content: center;
	align-items: center;
	flex: 1;
`;
const Text = styled.Text``;

export default () => {
	const [ refreshing, setRefreshing ] = useState(false);
	const { loading, data, refetch } = useQuery(STUDY_QUERY);
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
	return (
		<ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}>
			{loading ? <Loader /> : data && data.allStudy.map((study) => <StudyPost key={study.id} {...study} />)}
		</ScrollView>
	);
};
