import React, { useEffect } from 'react';
import { ScrollView, AsyncStorage } from 'react-native';
import { gql } from 'apollo-boost';
import { USER_FRAGMENT } from '../../fragments';
import Loader from '../../components/Loader';
import { useQuery } from 'react-apollo-hooks';
import UserProfile from '../../components/UserProfile';

export const ME = gql`
  {
    me {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

export default ({ navigation }) => {
	const { loading, data, refetch } = useQuery(ME);
	useEffect(() => {
		refetchData();
	}, []);

	const refetchData = async () => {
		try {
			await refetch();
		} catch (e) {
			console.log(e);
		}
	};
	return (
		<ScrollView style={{ backgroundColor: '#dee2e6' }}>
			{loading ? <Loader /> : data && data.me && <UserProfile navigation={navigation} {...data.me} />}
		</ScrollView>
	);
};
