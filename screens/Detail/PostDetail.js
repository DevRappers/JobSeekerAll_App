import React from 'react';
import { Image, View, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import styled from 'styled-components';
import constants from '../../constants';

const Bold = styled.Text`
	font-weight: 500;
	margin-bottom: 10px;
`;
const InfoContainer = styled.View`padding: 10px;`;
const CommentCount = styled.Text`
	opacity: 0.5;
	font-size: 13px;
`;

export default ({ navigation }) => {
	const files = navigation.getParam('files');
	const isMyPost = navigation.getParam('isMyPost');
	const id = navigation.getParam('id');
	const createdAt = navigation.getParam('createdAt');
	const title = navigation.getParam('title');
	const caption = navigation.getParam('caption');
	console.log(files);
	const date = new Date(createdAt);
	const dateString = date.toLocaleDateString('ko-KR', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
	return (
		<ScrollView>
			<Card title={title}>
				<View>
					{files.map((file) => (
						<Image
							resizeMode="cover"
							style={{ width: '100%', height: constants.height / 2.5, marginBottom: 10 }}
							key={file.id}
							source={{ uri: file.url }}
						/>
					))}
					<InfoContainer>
						<Bold>제목 : {title}</Bold>
						<Bold>내용 : {caption}</Bold>

						<CommentCount>{dateString}</CommentCount>
					</InfoContainer>
				</View>
			</Card>
		</ScrollView>
	);
};
