/*
	Query
	- 여러 컴포넌트에서 사용하는 Query Component
*/
import { gql } from 'apollo-boost';
import { HOBBY_FRAGMENT } from '../fragments';

export const HOBBY_DETAIL = gql`
	query seeFullHobby($id: String!) {
		seeFullHobby(id: $id) {
            ...HobbyParts
		}
	}
    ${HOBBY_FRAGMENT}
`;
