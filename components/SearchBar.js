import React from 'react';
import { TextInput } from 'react-native';
import PropTypes from 'prop-types';
import constants from '../constants';
import styles from '../styles';

const SearchBar = ({ onChange, value, onSubmit }) => (
	<TextInput
		style={{
			width: constants.width - 20,
			height: 35,
			backgroundColor: styles.lightGreyColor,
			padding: 10,
			borderRadius: 10,
			marginBottom: 10,
			marginLeft: 10,
			marginRight: 20,
			marginTop: 10
		}}
		textAlign={'center'}
		returnKeyType="search"
		onChangeText={onChange}
		onEndEditing={onSubmit}
		value={value}
		placeholder={'검색'}
		placeholderTextColor={styles.darkGreyColor}
	/>
);

SearchBar.propTypes = {
	onChange: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired,
	onSubmit: PropTypes.func.isRequired
};

export default SearchBar;
