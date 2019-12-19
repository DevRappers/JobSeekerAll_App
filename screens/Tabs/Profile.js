import React, { useEffect } from 'react';
import { ScrollView, TouchableOpacity, View, Text, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import { gql } from 'apollo-boost';
import { USER_FRAGMENT } from '../../fragments';
import Loader from '../../components/Loader';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { Modal, Provider } from '@ant-design/react-native';
import { DELETE_USER, CHANGE_USERNAME } from './TabsQueries';
import { useLogOut } from '../../AuthContext';

export const ME = gql`
  {
    me {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

export default ({ navigation }) => {
	const [ changeUserMutation ] = useMutation(CHANGE_USERNAME);

	const [ deleteUserMutation ] = useMutation(DELETE_USER);

	const { loading, data, refetch } = useQuery(ME);

	const refetchData = async () => {
		try {
			await refetch();
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		refetchData();
	}, []);

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
						console.log('취소');
					}
				},
				{
					text: '변경',
					onPress: async (text) => {
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
		<Provider>
			<ScrollView style={{ backgroundColor: '#dee2e6' }}>
				{loading ? (
					<Loader />
				) : (
					data &&
					data.me && (
						<View>
							<ListItem
								style={{ marginTop: 30, marginBottom: 30 }}
								leftAvatar={{ source: { uri: data.me.avatar } }}
								title={data.me.username}
								subtitle={data.me.email}
								bottomDivider
							/>
							<Text style={{ paddingLeft: 10, paddingBottom: 5 }}>계정정보</Text>
							<TouchableOpacity onPress={updateName}>
								<ListItem title={'닉네임 변경하기'} bottomDivider chevron />
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => navigation.navigate('MyStudy', { myStudy: data.me.myStudy })}
							>
								<ListItem title={'나의 스터디'} bottomDivider chevron />
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => navigation.navigate('MyHobby', { myHobby: data.me.myHobby })}
							>
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
					)
				)}
			</ScrollView>
		</Provider>
	);
};
