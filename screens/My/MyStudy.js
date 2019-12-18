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
