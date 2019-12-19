/*
	TabQueries
	- TabNavigation에서 자주사용되는 쿼리를 정리해놓은 js
*/
import { gql } from 'apollo-boost';
import { STUDY_FRAGMENT, HOBBY_FRAGMENT } from '../../fragments';

export const STUDY_QUERY = gql`
	{
		allStudy {
			...StudyParts
		}
	}
	${STUDY_FRAGMENT}
`;

export const ADMIN_POST_QUERY = gql`
	{
		allAdminPost {
			id
			title
			caption
			img
			createdAt
		}
	}
`;

export const SEARCH_STUDY_QUERY = gql`
	query searchStudy($term: String!) {
		searchStudy(term: $term) {
			...StudyParts
		}
	}
	${STUDY_FRAGMENT}
`;

export const SEARCH_HOBBY_QUERY = gql`
	query searchHobby($term: String!) {
		searchHobby(term: $term) {
			...HobbyParts
		}
	}
	${HOBBY_FRAGMENT}
`;

export const DELETE_USER = gql`
	mutation deleteUser {
		deleteUser
	}
`;

export const CHANGE_USERNAME = gql`
	mutation changeUsername($username: String) {
		changeUsername(username: $username)
	}
`;
