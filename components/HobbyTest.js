import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Card, WingBlank } from '@ant-design/react-native';
import styled from 'styled-components';
import { ListItem } from 'react-native-elements';
import CommentLink from './CommentLink';

const Bold = styled.Text`
	font-weight: 600;
	font-size: 16px;
	color: ${(props) => props.theme.blackColor};
	margin-bottom: 10px;
`;

export default ({ data, information, caption, posts, comments }) => {
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
						return (
							<TouchableOpacity>
								<ListItem key={i} title={l.title} subtitle={dateString} bottomDivider chevron />
							</TouchableOpacity>
						);
					})}
				</View>
			);
		case 2:
			return (
				<View>
					{comments.map((l, i) => {
						const date = new Date(l.createdAt);
						const dateString = date.toLocaleDateString('ko-KR', {
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						});
						return (
							<WingBlank size="lg" style={{ marginTop: 10 }}>
								<Card>
									<Card.Header
										title={l.user.username}
										thumbStyle={{ width: 30, height: 30, borderRadius: 15 }}
										thumb={l.user.avatar}
										extra={l.isMyComment && <CommentLink />}
									/>
									<Card.Body>
										<View style={{ height: 42 }}>
											<Text style={{ marginLeft: 16 }}>{l.text}</Text>
										</View>
									</Card.Body>
									<Card.Footer extra={dateString} />
								</Card>
							</WingBlank>
						);
					})}
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
