import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

const MuiSnackbar = ({ open, message, handleClose }) => {
	return (
		<Snackbar
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={open}
			autoHideDuration={2000}
			onClose={handleClose}
			message={message}
		/>
	);
};
export default MuiSnackbar;
