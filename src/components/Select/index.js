import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	formControl: {
		marginTop: 10,
		minWidth: 120
	},
	selectEmpty: {
		marginTop: theme.spacing(2)
	}
}));

const MuiSelect = ({ value, onChange, setState }) => {
	const classes = useStyles();
	return (
		<FormControl variant='outlined' className={classes.formControl}>
			<InputLabel id='demo-simple-select-outlined-label'>
				Question type
			</InputLabel>
			<Select
				labelId='demo-simple-select-outlined-label'
				id='demo-simple-select-outlined'
				value={value}
				onChange={(e) => onChange(e, setState)}
				label='Age'
				margin='dense'
			>
				<MenuItem value=''>
					<em>None</em>
				</MenuItem>
				<MenuItem value={'text'}>Text</MenuItem>
				<MenuItem value={'multichoice'}>Multiple choice</MenuItem>
				<MenuItem value={'radio'}>Radio</MenuItem>
			</Select>
		</FormControl>
	);
};

export default MuiSelect;
