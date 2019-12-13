import { gql } from 'apollo-boost';

export const STUDY_FRAGMENT = gql`
	fragment StudyParts on Study {
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
`;
