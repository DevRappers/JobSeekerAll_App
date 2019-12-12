import { gql } from 'apollo-boost';

export const STUDY_QUERY = gql`
	{
		allStudy {
			id
			user {
				id
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
		}
	}
`;