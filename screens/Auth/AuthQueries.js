import { gql } from 'apollo-boost';

export const REQUEST_SECRET = gql`
	mutation requestSecret($email: String!) {
		requestSecret(email: $email)
	}
`;

export const CONFIRM_SECRET = gql`
	mutation confirmSecret($secret: String!, $email: String!) {
		confirmSecret(secret: $secret, email: $email)
	}
`;

export const LOG_IN = gql`
	mutation confirmPassword($email: String!, $password: String!) {
		confirmPassword(email: $email, password: $password)
	}
`;
