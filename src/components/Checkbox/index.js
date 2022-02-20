import Checkbox from '@material-ui/core/Checkbox';
import styled from 'styled-components';

const StyledCheckBox = styled(Checkbox)`
	padding: 3px 5px 0px 0px !important;
`;

const MuiCheckbox = ({ checked = false, handleChange }) => {
	return (
		<StyledCheckBox
			inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
			checked={checked}
			onChange={handleChange}
		/>
	);
};
export default MuiCheckbox;
