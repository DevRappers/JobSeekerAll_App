import React from 'react';
import { TouchableOpacity, View, Text, Alert } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles';
import constants from '../constants';
import PropTypes from 'prop-types';
import { useLogOut } from '../AuthContext';

const UserProfile = ({ avatar, username, email }) => {
	const logOut = useLogOut();
	const logOutButton = () => {
		Alert.alert(
			'정말 로그아웃 하시겠습니까?',
			'',
			[
				{
					text: '취소',
					onPress: () => console.log('로그아웃 취소'),
					style: 'cancel'
				},
				{ text: '확인', onPress: () => logOut() }
			],
			{ cancelable: false }
		);
	};
	return (
		<View>
			<ListItem
				style={{ marginTop: 30, marginBottom: 30 }}
				leftAvatar={{ source: { uri: avatar } }}
				title={username}
				subtitle={email}
				bottomDivider
			/>
			<Text style={{ paddingLeft: 10, paddingBottom: 5 }}>계정정보</Text>
			<TouchableOpacity>
				<ListItem title={'내정보 변경하기'} bottomDivider chevron />
			</TouchableOpacity>
			<TouchableOpacity>
				<ListItem title={'나의 스터디'} bottomDivider chevron />
			</TouchableOpacity>
			<TouchableOpacity>
				<ListItem title={'나의 취미모임'} bottomDivider chevron />
			</TouchableOpacity>
			<TouchableOpacity>
				<ListItem title={'회원탈퇴'} bottomDivider chevron />
			</TouchableOpacity>
			<TouchableOpacity onPress={logOutButton}>
				<ListItem title={'로그아웃'} bottomDivider chevron />
			</TouchableOpacity>
			<Text style={{ marginTop: 30, paddingLeft: 10, paddingBottom: 5 }}>기타</Text>
			<TouchableOpacity>
				<ListItem title={'개발자 정보'} bottomDivider chevron />
			</TouchableOpacity>
		</View>
	);
};

UserProfile.propTypes = {
	id: PropTypes.string.isRequired,
	avatar: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
	email: PropTypes.string.isRequired,
	phoneNumber: PropTypes.string,
	age: PropTypes.number.isRequired,
	area: PropTypes.string,
	department: PropTypes.string.isRequired,
	isSelf: PropTypes.bool.isRequired,
	myStudy: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			user: PropTypes.shape({
				id: PropTypes.string.isRequired,
				avatar: PropTypes.string.isRequired,
				username: PropTypes.string.isRequired
			}),
			title: PropTypes.string.isRequired,
			caption: PropTypes.string.isRequired,
			information: PropTypes.string.isRequired,
			job: PropTypes.string.isRequired,
			area: PropTypes.string.isRequired,
			startTime: PropTypes.string.isRequired,
			endTime: PropTypes.string.isRequired,
			createdAt: PropTypes.string,
			updatedAt: PropTypes.string
		})
	)
};
export default UserProfile;
