/*
	useInput
	- useState를 더욱 편하게 사용하고 텍스트 수정시 사용하려고 만든 컴포넌트
*/
import { useState } from 'react';

const useInput = (initalValue) => {
	const [ value, setValue ] = useState(initalValue);
	const onChange = (text) => {
		setValue(text);
	};

	return { value, onChange, setValue };
};

export default useInput;
