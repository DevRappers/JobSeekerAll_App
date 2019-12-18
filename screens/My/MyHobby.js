import React from 'react';
import HobbyPost from '../../components/HobbyPost';

export default ({ navigation }) => {
	const data = navigation.getParam('myHobby');
	return <HobbyPost navigation={navigation} data={data} />;
};
