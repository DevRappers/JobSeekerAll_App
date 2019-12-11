import React from 'react';
import styled from 'styled-components';
import constants from '../constants';
import PropTypes from 'prop-types';

const Touchable = styled.TouchableOpacity``;
const Container = styled.View`
	background-color: ${(props) => props.theme.blueColor};
	padding: 10px;
	margin: 0px 50px;
	border-radius: 4px;
	width: ${constants.width / 1.8};
`;
const Text = styled.Text`
	color: white;
	text-align: center;
	font-weight: 600;
	font-size: 18px;
`;

const AuthButtton = ({ text, onPress }) => (
	<Touchable onPress={onPress}>
		<Container>
			<Text>{text}</Text>
		</Container>
	</Touchable>
);

AuthButtton.propTypes = {
	text: PropTypes.string.isRequired,
	onPress: PropTypes.func.isRequired
};

export default AuthButtton;
