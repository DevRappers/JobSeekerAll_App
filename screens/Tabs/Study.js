/*
	Study
	- 스터디 화면
*/

import React, { useState } from 'react';
import { ScrollView, RefreshControl, Platform } from 'react-native';
import { SearchBar, ButtonGroup } from 'react-native-elements';
import Loader from '../../components/Loader';
import { useQuery } from 'react-apollo-hooks';
import { SEARCH_STUDY_QUERY } from './TabsQueries';
import StudyPost from '../../components/StudyPost';
import { JOB_LIST } from '../../DataList';

export default ({ navigation }) => {
	const [ buttonIndex, setButtonIndex ] = useState(0);
	const [ refreshing, setRefreshing ] = useState(false);
	const [ term, setTerm ] = useState('');
	const { loading, data, refetch } = useQuery(SEARCH_STUDY_QUERY, {
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
			setTerm(JOB_LIST[selectedIndex]);
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
				placeholder="스터디 검색"
			/>
			<ScrollView
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				style={{ marginBottom: 10, marginTop: 10 }}
			>
				<ButtonGroup
					onPress={updateIndex}
					selectedIndex={buttonIndex}
					buttons={JOB_LIST}
					containerStyle={{ height: 20 }}
					buttonStyle={{ width: 100 }}
					selectedButtonStyle={{ backgroundColor: '#2BC0BC' }}
				/>
			</ScrollView>
			{loading ? (
				<Loader />
			) : (
				data && data.searchStudy.map((study) => <StudyPost navigation={navigation} key={study.id} {...study} />)
			)}
		</ScrollView>
	);
};
