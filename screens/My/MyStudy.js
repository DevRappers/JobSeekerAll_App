/*
	MyStudy
	- 내가 만든 스터디를 볼 수 있는 화면 
*/
import React from 'react';
import { ScrollView } from 'react-native';
import StudyPost from '../../components/StudyPost';

export default ({ navigation }) => {
	const data = navigation.getParam('myStudy');
	return (
		<ScrollView>
			{data && data.map((study) => <StudyPost navigation={navigation} key={study.id} {...study} />)}
		</ScrollView>
	);
};
