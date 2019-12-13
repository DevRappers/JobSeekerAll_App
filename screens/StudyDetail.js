import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-apollo-hooks';
import { gql } from 'apollo-boost';
import { STUDY_FRAGMENT } from '../fragments';
import Loader from '../components/Loader';
import StudyDetailPost from '../components/StudyDetailPost';

const STUDY_DETAIL = gql`
    query seeFullStudy($id: String!){
        seeFullStudy(id: $id){
            ...StudyParts
        }
    }
    ${STUDY_FRAGMENT}
`;

const View = styled.View``;
const Text = styled.Text``;

export default ({ navigation }) => {
	const { loading, data } = useQuery(STUDY_DETAIL, {
		variables: { id: navigation.getParam('id') }
	});
	return (
		<View styled={{ flex: 1 }}>
			{loading ? <Loader /> : data && data.seeFullStudy && <StudyDetailPost {...data.seeFullStudy} />}
		</View>
	);
};
