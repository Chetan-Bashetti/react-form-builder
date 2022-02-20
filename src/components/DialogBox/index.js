import React from 'react';
import { Dialog, DialogContent } from '@material-ui/core';
import styled from 'styled-components';
import CancelIcon from '@material-ui/icons/Cancel';

const StyledDialogTitle = styled.div`
	text-transform: capitalize;
	display: flex;
	padding: 1em;
	justify-content: space-between;
`;

const IconWrapper = styled.div`
	color: #f50057;
	cursor: pointer;
`;

const MuiDialog = ({ open, handleClose, children, formTitle }) => {
	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby='form-dialog-title'
		>
			<StyledDialogTitle id='form-dialog-title'>
				{formTitle}
				<IconWrapper onClick={handleClose}>
					<CancelIcon fontSize='small' />
				</IconWrapper>
			</StyledDialogTitle>
			<DialogContent>{children}</DialogContent>
		</Dialog>
	);
};
export default MuiDialog;
