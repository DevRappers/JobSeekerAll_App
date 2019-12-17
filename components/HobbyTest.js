import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { Card, WingBlank, TextareaItem } from '@ant-design/react-native';
import { ListItem, Button, Overlay } from 'react-native-elements';
import Loader from './Loader';
import styled from 'styled-components';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { gql } from 'apollo-boost';
import CommentLink from './CommentLink';
import useInput from '../hooks/useInput';
import { SEARCH_HOBBY_QUERY } from '../screens/Tabs/TabsQueries';

const Bold = styled.Text`
	font-weight: 500;
	color: ${(props) => (props.studyEnd === 2 ? props.theme.lightGreyColor : props.theme.blackColor)};
	font-size: 16px;
	margin-bottom: 10px;
`;

const ButtonGroups = styled.View`
	margin-top: 10px;
	flex-direction: row;
`;

const CustomButton = styled.TouchableOpacity`
	position: absolute;
	right: 40;
	height: 40;
	width: 40;
	border-radius: 20;
	background-color: #2bc0bc;
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
				caption
				isMyPost
				files {
					id
					url
				}
			}
		}
	}
`;
export const ADD_COMMENT = gql`
	mutation addComment($text: String!, $hobbyId: String!) {
		addComment(text: $text, hobbyId: $hobbyId)
	}
`;

export default ({ navigation, id, switchs, information, caption, posts }) => {
	const [ visible, setVisible ] = useState(false);
	const textInput = useInput('');
	const { loading, data } = useQuery(HOBBY_DETAIL, {
		variables: { id }
	});
	const [ addCommentMutation ] = useMutation(ADD_COMMENT, {
		variables: {
			hobbyId: id,
			text: textInput.value
		},
		refetchQueries: () => [
			{ query: HOBBY_DETAIL, variables: { id } },
			{ query: SEARCH_HOBBY_QUERY, variables: { term: '' } }
		]
	});
	const addComment = async () => {
		if (textInput.value === '') {
			Alert.alert('댓글을 입력해주세요!');
			return;
		}
		try {
			const { data: { addComment } } = await addCommentMutation({
				variables: {
					hobbyId: id,
					text: textInput.value
				},
				refetchQueries: () => [
					{ query: HOBBY_DETAIL, variables: { id } },
					{ query: SEARCH_HOBBY_QUERY, variables: { term: '' } }
				]
			});
			if (addComment) {
				Alert.alert('댓글 등록 성공');
				setVisible(false);
				textInput.onChange('');
			}
		} catch (e) {
			console.log(e);
			Alert.alert('댓글 등록 실패.', '다시 시도해주세요.');
		}
	};
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
							const { id: postId, createdAt, title, caption, files, isMyPost } = l;
							return (
								<TouchableOpacity
									key={i}
									onPress={() =>
										navigation.navigate('PostDetail', {
											hobbyId: id,
											id: postId,
											title,
											createdAt,
											caption,
											files,
											isMyPost
										})}
								>
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
					<Button
						title="방명록 남기기"
						type="outline"
						onPress={() => setVisible(true)}
						style={{ marginLeft: 10, marginRight: 10 }}
					/>
					<Overlay isVisible={visible} height={310} borderRadius={10}>
						<View>
							<TextareaItem
								onChangeText={textInput.onChange}
								value={textInput.value}
								rows={10}
								placeholder="방명록을 입력하세요."
								count={50}
								style={{ fontSize: 14 }}
							/>
							<ButtonGroups>
								<Button
									title="확인"
									type="outline"
									style={{ marginRight: 5, marginLeft: 210 }}
									onPress={addComment}
								/>
								<Button
									title="취소"
									type="outline"
									style={{ width: 50, alignItems: 'flex-end' }}
									onPress={() => {
										setVisible(false);
										textInput.onChange('');
									}}
								/>
							</ButtonGroups>
						</View>
					</Overlay>
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
