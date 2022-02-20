import React from 'react';
import Radio from '@material-ui/core/Radio';
import styled from 'styled-components';

const StyledRadio = styled(Radio)`
	padding: 3px 5px 0px 0px !important;
`;

const MuiRadio = ({ isValue, value, onChange }) => {
	return (
		<StyledRadio
			checked={isValue}
			onChange={onChange}
			value={value}
			name='radio-button-demo'
			inputProps={{ 'aria-label': 'A' }}
		></StyledRadio>
	);
};

export default MuiRadio;
