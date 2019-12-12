import React, { useState } from 'react';
import { parseValue } from 'graphql';

const useInput = (initalValue) => {
	const [ value, setValue ] = useState(initalValue);
	const onChange = (text) => {
		setValue(text);
	};

	return { value, onChange, setValue };
};

export default useInput;
