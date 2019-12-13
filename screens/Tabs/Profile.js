import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { gql } from 'apollo-boost';
import { USER_FRAGMENT } from '../../fragments';
import Loader from '../../components/Loader';
import { useQuery } from 'react-apollo-hooks';
import UserProfile from '../../components/UserProfile';
import styled from 'styled-components';

export const ME = gql`
  {
    me {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

export default ({ navigation }) => {
	const { loading, data } = useQuery(ME);
	return (
		<ScrollView style={{ backgroundColor: '#dee2e6' }}>
			{loading ? <Loader /> : data && data.me && <UserProfile {...data.me} />}
		</ScrollView>
	);
};
