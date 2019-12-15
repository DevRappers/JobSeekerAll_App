import React, { useState } from 'react';
import { TouchableOpacity, View, Text, Alert } from 'react-native';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';
import { ListItem } from 'react-native-elements';
import PropTypes from 'prop-types';
import { useLogOut } from '../AuthContext';
import { StackActions, NavigationActions } from 'react-navigation';
import { Modal } from '@ant-design/react-native';
import { ME } from '../screens/Tabs/Profile';

const UserProfile = ({ navigation, id, avatar, username, email, myStudy }) => {
	const [ cname, setCname ] = useState('');
	const DELETE_USER = gql`
		mutation deleteUser {
			deleteUser
		}
	`;

	const CHANGE_USERNAME = gql`
		mutation changeUsername($username: String) {
			changeUsername(username: $username)
		}
	`;

	const [ deleteUserMutation ] = useMutation(DELETE_USER);

	const [ changeUserMutation ] = useMutation(CHANGE_USERNAME);

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
				{
					text: '확인',
					onPress: async () => {
						try {
							const resetAction = StackActions.reset({
								index: 0,
								actions: [ NavigationActions.navigate({ routeName: 'TabNavigation' }) ]
							});
							navigation.dispatch(resetAction);
							await logOut();
						} catch (e) {
							await logOut();
						}
					}
				}
			],
			{ cancelable: false }
		);
	};
	const delUser = () => {
		Alert.alert(
			'정말 회원탈퇴 하시겠습니까?',
			'',
			[
				{
					text: '취소',
					onPress: () => console.log('회원탈퇴 취소'),
					style: 'cancel'
				},
				{
					text: '확인',
					onPress: () => {
						deleteUserMutation();
						logOut();
					}
				}
			],
			{ cancelable: false }
		);
	};

	const updateName = () => {
		Modal.prompt(
			'닉네임변경',
			'변경할 이름을 입력해주세요',
			[
				{
					text: '취소',
					onPress: () => {
						setCname('text');
					}
				},
				{
					text: '변경',
					onPress: async (text) => {
						setCname(text);
						try {
							await changeUserMutation({
								variables: {
									username: text
								},
								refetchQueries: () => [ { query: ME } ]
							});
							Alert.alert('닉네임변경성공');
						} catch (e) {
							Alert.alert('중복되는 닉네임이 있습니다. 다른것으로 설정해주세요.');
						}
					}
				}
			],
			'default',
			null,
			[ '닉네임' ]
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
			<TouchableOpacity onPress={updateName}>
				<ListItem title={'닉네임 변경하기'} bottomDivider chevron />
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigation.navigate('MyStudy', { myStudy })}>
				<ListItem title={'나의 스터디'} bottomDivider chevron />
			</TouchableOpacity>
			<TouchableOpacity>
				<ListItem title={'나의 취미모임'} bottomDivider chevron />
			</TouchableOpacity>
			<TouchableOpacity onPress={delUser}>
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
			time: PropTypes.string.isRequired,
			createdAt: PropTypes.string,
			updatedAt: PropTypes.string
		})
	)
};
export default UserProfile;
