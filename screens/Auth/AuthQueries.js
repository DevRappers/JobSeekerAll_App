/*
	AuthQueries
	- 회원가입, 로그인, 이메일 인증시 사용되는 쿼리들을 모아놓은 js
*/
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

export const CREATE_ACCOUNT = gql`
	mutation createAccount(
		$username: String!
		$email: String!
		$password: String!
		$age: Int!
		$department: String!
		$area: String
	) {
		createAccount(
			username: $username
			email: $email
			password: $password
			age: $age
			department: $department
			area: $area
		)
	}
`;
