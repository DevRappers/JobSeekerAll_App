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
		time
		studyEnd
		isMyStudy
		createdAt
	}
`;

export const USER_FRAGMENT = gql`
    fragment UserParts on User{
        id
        username
        avatar
        email
        phoneNumber
        age
        area
        department
        isSelf
        createdAt
        updatedAt
        myStudy{
            ...StudyParts
        }
    }
    ${STUDY_FRAGMENT}
`;
