/*
	StudyDetailPost
	- 스터디 상세정보 Component
*/
import React from 'react';
import { View, Text, Image } from 'react-native';
import { Card } from 'react-native-elements';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Header = styled.View`
	flex-direction: row;
	align-items: center;
	margin-bottom: 10px;
`;

const Touchable = styled.TouchableOpacity``;

const HeaderUserContainer = styled.View`margin-left: 10px;`;

const Bold = styled.Text`
	font-weight: 500;
	color: ${(props) => (props.studyEnd === 2 ? props.theme.lightGreyColor : props.theme.blackColor)};
	margin-bottom: 5px;
`;

const End = styled.Text`
	font-weight: 500;
	color: ${(props) => (props.studyEnd === 2 ? props.theme.redColor : props.theme.blueColor)};
`;

const StudyDetailPost = ({ user, title, job, area, caption, information, time, studyEnd }) => {
	return (
		<Card title={title}>
			<View>
				<Header>
					<Touchable>
						<Image style={{ height: 30, width: 30, borderRadius: 15 }} source={{ uri: user.avatar }} />
					</Touchable>
					<Touchable>
						<HeaderUserContainer>
							<Text>{user.username}</Text>
						</HeaderUserContainer>
					</Touchable>
				</Header>
				<Bold>
					분야 : <Bold style={{ color: 'purple' }}>{job}</Bold>
				</Bold>
				<Bold>
					지역 : <Bold style={{ color: 'purple' }}>{area}</Bold>
				</Bold>
				<Bold>스터디 소개 : </Bold>
				<Bold style={{ color: 'purple' }}>{caption}</Bold>
				<Bold>신청방법 :</Bold>
				<Bold style={{ color: 'purple' }}>{information}</Bold>
				<Bold>
					진행일정 : <Bold style={{ color: 'purple' }}>{time}</Bold>
				</Bold>
				<End studyEnd={studyEnd}>현재 {studyEnd === 2 ? '모집마감' : '모집중'}</End>
			</View>
		</Card>
	);
};

StudyDetailPost.propTypes = {
	id: PropTypes.string.isRequired,
	user: PropTypes.shape({
		id: PropTypes.string.isRequired,
		avatar: PropTypes.string,
		username: PropTypes.string.isRequired
	}).isRequired,
	title: PropTypes.string.isRequired,
	caption: PropTypes.string.isRequired,
	information: PropTypes.string.isRequired,
	job: PropTypes.string.isRequired,
	area: PropTypes.string.isRequired,
	time: PropTypes.string.isRequired,
	studyEnd: PropTypes.number.isRequired,
	createdAt: PropTypes.string.isRequired
};

export default StudyDetailPost;
