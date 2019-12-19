/*
	MyHobby
	- 내가 만든 취미모임을 볼 수 있는 스크린
*/
import React from 'react';
import { ScrollView } from 'react-native';
import HobbyPost from '../../components/HobbyPost';

export default ({ navigation }) => {
	const data = navigation.getParam('myHobby');
	return (
		<ScrollView>
			<HobbyPost navigation={navigation} data={data} />
		</ScrollView>
	);
};
