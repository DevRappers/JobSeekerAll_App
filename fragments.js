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

export const HOBBY_FRAGMENT = gql`
	fragment HobbyParts on Hobby {
		id
		title
		caption
		area
		proImage
		user {
			id
			avatar
			username
		}
		posts {
			id
			title
			caption
			files {
				id
				url
			}
			likes {
				id
			}
			likeCount
			isLiked
			createdAt
		}
		comments {
			id
			text
			user {
				id
				username
			}
		}
		commentCount
		isMyHobby
		postsCount
		information
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
