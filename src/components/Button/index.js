import Button from '@material-ui/core/Button';
import styled from 'styled-components';

const StyledButton = styled(Button)`
	font-size: 0.8em !important;
	text-transform: capitalize !important;
	padding: 0.7em 1em !important;
	font-weight: 600 !important;
	top: ${(props) => (props.top ? props.top : '0px')};
	margin-right: ${(props) => (props.right ? props.right : '0px')};
`;

const MuiButton = ({ onClick, text, disabled, top = '2px', right = '0px' }) => {
	return (
		<StyledButton
			variant='contained'
			color='secondary'
			onClick={onClick}
			disabled={disabled}
			top={top}
			right={right}
		>
			{text}
		</StyledButton>
	);
};

export default MuiButton;
