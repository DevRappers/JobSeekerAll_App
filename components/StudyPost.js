import React from 'react';
import { Image } from 'react-native';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.TouchableOpacity`
	background-color: ${(props) => (props.studyEnd === 2 ? props.theme.darkGreyColor : props.theme.whiteColor)};
	border-radius: 50px;
	margin-left: 10px;
	margin-right: 10px;
	margin-bottom: 10px;
	border: 7px solid #c3fae8;
	border-color: ${(props) => (props.studyEnd === 2 ? props.theme.blackColor : '#c3fae8')};
`;

const Header = styled.View`
	padding: 15px;
	flex-direction: row;
	align-items: center;
`;

const Body = styled.View`padding: 15px;`;

const Touchable = styled.TouchableOpacity``;

const HeaderUserContainer = styled.View`margin-left: 10px;`;

const Bold = styled.Text`
	font-weight: 500;
	color: ${(props) => (props.studyEnd === 2 ? props.theme.lightGreyColor : props.theme.blackColor)};
`;

const End = styled.Text`
	font-weight: 500;
	color: ${(props) => (props.studyEnd === 2 ? props.theme.redColor : props.theme.blueColor)};
`;

const StudyPost = ({ id, navigation, user, title, job, area, studyEnd, isMyStudy }) => {
	return (
		<Container
			studyEnd={studyEnd}
			onPress={() => navigation.navigate('StudyDetail', { id, title, isMyStudy, studyEnd })}
		>
			<Header>
				<Touchable>
					<Image style={{ height: 30, width: 30, borderRadius: 15 }} source={{ uri: user.avatar }} />
				</Touchable>
				<Touchable>
					<HeaderUserContainer>
						<Bold studyEnd={studyEnd}>{user.username}</Bold>
					</HeaderUserContainer>
				</Touchable>
			</Header>
			<Body>
				<Bold studyEnd={studyEnd}>스터디명 : {title}</Bold>
				<Bold studyEnd={studyEnd}>분야 : {job}</Bold>
				<Bold studyEnd={studyEnd}>지역 : {area}</Bold>
				<End studyEnd={studyEnd}>{studyEnd === 2 ? '모집마감' : '모집중'}</End>
			</Body>
		</Container>
	);
};

StudyPost.propTypes = {
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
	isMyStudy: PropTypes.bool.isRequired,
	studyEnd: PropTypes.number.isRequired,
	createdAt: PropTypes.string.isRequired
};

export default StudyPost;
