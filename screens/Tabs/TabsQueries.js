import { gql } from 'apollo-boost';

export const STUDY_QUERY = gql`
	{
		allStudy {
			id
			user {
				id
				avatar
				username
			}
			title
			caption
			information
			job
			area
			startTime
			endTime
			studyEnd
			createdAt
		}
	}
`;

export const SEARCH_STUDY_QUERY = gql`
	query searchStudy($term: String!) {
		searchStudy(term: $term) {
			id
			user {
				id
				avatar
				username
			}
			title
			caption
			information
			job
			area
			startTime
			endTime
			studyEnd
			createdAt
		}
	}
`;
