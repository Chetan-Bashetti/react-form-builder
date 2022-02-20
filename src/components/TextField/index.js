import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';

const StyledTextField = styled(TextField)`
	width: ${(props) => (props.width ? props.width : '200px')};
	margin-right: ${(props) => (props.right ? props.right : '0px')};
`;

const MuiTextField = ({
	value = '',
	onChange,
	setState,
	label = '',
	width = '200px',
	right = '10px'
}) => {
	return (
		<StyledTextField
			id='outlined-basic'
			label={label}
			variant='outlined'
			margin='dense'
			value={value}
			onChange={(e) => onChange(e, setState)}
			width={width}
			right={right}
		/>
	);
};

export default MuiTextField;
