import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components';
import { ListItem } from 'react-native-elements';

const Bold = styled.Text`
	font-weight: 600;
	font-size: 16px;
	color: ${(props) => props.theme.blackColor};
	margin-bottom: 10px;
`;

export default ({ data, information, caption, posts }) => {
	switch (data) {
		case 0:
			return (
				<View style={{ flex: 1, marginTop: 10, marginLeft: 10 }}>
					<Bold>모임소개</Bold>
					<Text style={{ marginBottom: 10 }}>{caption}</Text>
					<Text>{information}</Text>
				</View>
			);
		case 1:
			return (
				<View>
					{posts.map((l, i) => {
						const date = new Date(l.createdAt);
						const dateString = date.toLocaleDateString('ko-KR', {
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						});
						return(
						<ListItem 
						key={l.id} 
						title={l.title} 
						subtitle={dateString} bottomDivider chevron />
					)})}
				</View>
			);
		case 2:
			return (
				<View>
					<Text>댓글</Text>
				</View>
			);
		default:
			return (
				<View>
					<Text>ERROR</Text>
				</View>
			);
	}
};
