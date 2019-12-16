import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Card, WingBlank } from '@ant-design/react-native';
import { ListItem } from 'react-native-elements';
import Loader from './Loader';
import styled from 'styled-components';
import { useQuery } from 'react-apollo-hooks';
import { gql } from 'apollo-boost';
import CommentLink from './CommentLink';

const Bold = styled.Text`
	font-weight: 500;
	color: ${(props) => (props.studyEnd === 2 ? props.theme.lightGreyColor : props.theme.blackColor)};
	font-size: 16px;
`;

export const HOBBY_DETAIL = gql`
	query seeFullHobby($id: String!) {
		seeFullHobby(id: $id) {
			id
			comments {
				id
				text
				user {
					id
					username
					avatar
				}
				isMyComment
				createdAt
			}
			posts {
				id
				createdAt
				title
			}
		}
	}
`;

export default ({ id, switchs, information, caption, posts }) => {
	const { loading, data } = useQuery(HOBBY_DETAIL, {
		variables: { id }
	});
	console.log(data);
	switch (switchs) {
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
					{loading ? (
						<Loader />
					) : (
						data.seeFullHobby.posts.map((l, i) => {
							const date = new Date(l.createdAt);
							const dateString = date.toLocaleDateString('ko-KR', {
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							});
							return (
								<TouchableOpacity key={i}>
									<ListItem key={i} title={l.title} subtitle={dateString} bottomDivider chevron />
								</TouchableOpacity>
							);
						})
					)}
				</View>
			);
		case 2:
			return (
				<View style={{ paddingTop: 10 }}>
					{loading ? (
						<Loader />
					) : (
						data.seeFullHobby.comments.map((l, i) => {
							const date = new Date(l.createdAt);
							const dateString = date.toLocaleDateString('ko-KR', {
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							});
							return (
								<WingBlank size="lg" style={{ marginTop: 10 }} key={i}>
									<Card>
										<Card.Header
											title={l.user.username}
											thumbStyle={{ width: 30, height: 30, borderRadius: 15 }}
											thumb={l.user.avatar}
											extra={l.isMyComment && <CommentLink id={l.id} postId={id} />}
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
						})
					)}
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
