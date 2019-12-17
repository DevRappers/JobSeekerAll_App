import React, { useState } from 'react';
import { Image, View, TouchableOpacity, ScrollView, Text, StyleSheet } from 'react-native';
import { SegmentedControl } from '@ant-design/react-native';
import styled from 'styled-components';
import HobbyTest from '../../components/HobbyTest';

const ProfileHeader = styled.View`
	padding: 20px;
	flex-direction: row;
	align-items: center;
`;

const HeaderUserContainer = styled.View`margin-left: 10px;`;

const Bold = styled.Text`
	font-weight: 600;
	color: ${(props) => props.theme.blackColor};
`;

export default ({ navigation }) => {
	const isMyHobby = navigation.getParam('isMyHobby');
	const id = navigation.getParam('id');
	const title = navigation.getParam('title');
	const proImage = navigation.getParam('proImage');
	const caption = navigation.getParam('caption');
	const information = navigation.getParam('information');
	const postsCount = navigation.getParam('postsCount');
	const commentCount = navigation.getParam('commentCount');
	const posts = navigation.getParam('posts');
	const comments = navigation.getParam('comments');

	const [ value, setValue ] = useState(0);

	const onChange = (e) => {
		setValue(e.nativeEvent.selectedSegmentIndex);
	};
	const onValueChange = (value) => {};

	return (
		<ScrollView style={{ flex: 1 }}>
			<ProfileHeader>
				<Image style={{ height: 50, width: 50, borderRadius: 25 }} source={{ uri: proImage }} />
				<HeaderUserContainer>
					<Bold>{title}</Bold>
				</HeaderUserContainer>
			</ProfileHeader>
			<SegmentedControl
				tintColor={'blue'}
				values={[ '모임소개', `모집공고`, `방명록` ]}
				onChange={onChange}
				onValueChange={onValueChange}
			/>
			<HobbyTest
				navigation={navigation}
				id={id}
				switchs={value}
				information={information}
				caption={caption}
				posts={posts}
				comments={comments}
			/>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	scene: {
		flex: 1
	}
});
