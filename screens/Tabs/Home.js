/*
	Home
	- 홈화면으로 취준생에게 도움되는 포스트를 보여줌
*/
import React, { useState } from 'react';
import { ScrollView, RefreshControl, Image, View } from 'react-native';
import { Card } from 'react-native-elements';
import { useQuery } from 'react-apollo-hooks';
import styled from 'styled-components';
import Loader from '../../components/Loader';
import { ADMIN_POST_QUERY } from './TabsQueries';
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
	const [ refreshing, setRefreshing ] = useState(false);
	const { loading, data, refetch } = useQuery(ADMIN_POST_QUERY);

	const refresh = async () => {
		try {
			setRefreshing(true);
			await refetch();
		} catch (e) {
			console.log(e);
		} finally {
			setRefreshing(false);
		}
	};
	return (
		<ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}>
			{loading ? (
				<Loader />
			) : (
				data &&
				data.allAdminPost.map((post) => {
					const date = new Date(post.createdAt);
					const dateString = date.toLocaleDateString('ko-KR', {
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					});
					return (
						<Card
							title={post.title}
							key={post.id}
							containerStyle={{ borderRadius: 50, marginLeft: 20, marginRight: 20, marginBottom: 10 }}
						>
							<View>
								<Image
									resizeMode="cover"
									style={{ width: '100%', height: constants.height / 4, marginBottom: 10 }}
									source={{ uri: post.img }}
								/>

								<InfoContainer>
									<Bold>제목 : {post.title}</Bold>
									<Bold>내용 : {post.caption}</Bold>

									<CommentCount>{dateString}</CommentCount>
								</InfoContainer>
							</View>
						</Card>
					);
				})
			)}
		</ScrollView>
	);
};
