import React from 'react';
import { View, Text, Image } from 'react-native';
import { Card } from 'react-native-elements';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.TouchableOpacity`
	background-color: ${(props) => (props.studyEnd === '2' ? props.theme.darkGreyColor : props.theme.whiteColor)};
	border-radius: 50px;
	margin-left: 10px;
	margin-right: 10px;
	margin-bottom: 10px;
	border: 7px solid #c3fae8;
	border-color: ${(props) => (props.studyEnd === '2' ? props.theme.blackColor : '#c3fae8')};
`;

const Header = styled.View`
	flex-direction: row;
	align-items: center;
	margin-bottom: 10px;
`;

const Body = styled.View`padding: 15px;`;

const Touchable = styled.TouchableOpacity``;

const HeaderUserContainer = styled.View`margin-left: 10px;`;

const Bold = styled.Text`
	font-weight: 500;
	color: ${(props) => (props.studyEnd === '2' ? props.theme.lightGreyColor : props.theme.blackColor)};
	margin-bottom: 5px;
`;

const End = styled.Text`
	font-weight: 500;
	color: ${(props) => (props.studyEnd === '2' ? props.theme.redColor : props.theme.blueColor)};
`;

const StudyDetailPost = ({
	id,
	navigation,
	user,
	title,
	job,
	area,
	caption,
	information,
	startTime,
	endTime,
	studyEnd
}) => {
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
				<Bold>분야 : {job}</Bold>
				<Bold>지역 : {area}</Bold>
				<Bold>스터디소개 : {caption}</Bold>
				<Bold>신청방법 :</Bold>
				<Bold>{information}</Bold>
				<Bold>시작시간 : {startTime}</Bold>
				<Bold>끝나는시간 : {endTime}</Bold>
				<End studyEnd={studyEnd}>현재 {studyEnd === '2' ? '모집마감' : '모집중'}</End>
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
	startTime: PropTypes.string.isRequired,
	endTime: PropTypes.string.isRequired,
	studyEnd: PropTypes.string.isRequired,
	createdAt: PropTypes.string.isRequired
};

export default StudyDetailPost;
