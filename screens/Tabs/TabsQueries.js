import { gql } from 'apollo-boost';
import { STUDY_FRAGMENT } from '../../fragments';

export const STUDY_QUERY = gql`
	{
		allStudy {
			...StudyParts
		}
	}
	${STUDY_FRAGMENT}
`;

export const SEARCH_STUDY_QUERY = gql`
	query searchStudy($term: String!) {
		searchStudy(term: $term) {
			...StudyParts
		}
	}
	${STUDY_FRAGMENT}
`;
