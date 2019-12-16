import React, { useState } from 'react';
import { ScrollView, RefreshControl, Platform } from 'react-native';
import { SearchBar, ButtonGroup } from 'react-native-elements';
import styled from 'styled-components';
import Loader from '../../components/Loader';
import StudyPost from '../../components/StudyPost';

const View = styled.View`
	justify-content: center;
	align-items: center;
	flex: 1;
`;
const Text = styled.Text``;

const Container = styled.View``;

export default ({ navigation }) => {
	const data = navigation.getParam('myStudy');
	return (
		<ScrollView>
			{data && data.map((study) => <StudyPost navigation={navigation} key={study.id} {...study} />)}
		</ScrollView>
	);
};
