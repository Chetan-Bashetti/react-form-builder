import React, { useEffect } from 'react';
import styled from 'styled-components';
import CancelIcon from '@material-ui/icons/Cancel';

//COMPONENTS
import { MuiTextField, MuiSelect, MuiButton, MuiSnackbar } from 'components';

const FormBuilderWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

const ChoicesWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

const ChoiceTitle = styled.div`
	margin-top: 20px;
`;

const ChoicesTextBoxWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const AddedChoices = styled.div`
	display: flex;
	flex-direction: column;
`;

const FormActions = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	margin-top: 1em;
	margin-bottom: 1em;
`;

const EveryChoice = styled.div`
	display: flex;
	padding: 0.3em;
	align-items: center;
	justify-content: space-between;
	border: 1px solid lightgray;
	margin: 0.1em 0;
	border-radius: 3px;
`;

const ChoiceText = styled.div`
	font-size: 0.8em;
`;

const IconWrapper = styled.div`
	color: #f50057;
	cursor: pointer;
`;

const Form = ({ handleFormData }) => {
	const [question, setQuestion] = React.useState('');
	const [questionType, setQuestionType] = React.useState('');
	const [choices, setChoices] = React.useState([]);
	const [eachChoice, setEachChoice] = React.useState('');
	const [isError, setIsError] = React.useState(false);
	const [message, setMessage] = React.useState(false);

	const handleFields = (e, setState) => {
		let { value } = e.target;
		setState(value);
	};

	const handleAddChoices = () => {
		let updatedChoices = [...choices];
		let newChoice = {
			isSelected: false,
			eachChoice
		};
		updatedChoices.push(newChoice);
		setEachChoice('');
		setChoices(updatedChoices);
	};

	const handleRemoveChoice = (id) => {
		let updatedChoices = [...choices];
		updatedChoices.splice(id, 1);
		setChoices(updatedChoices);
	};

	const handleSaveForm = () => {
		let formData =
			questionType === 'multichoice' || questionType === 'radio'
				? {
						surveyQuestion: question,
						surveyQuestionType: questionType,
						surveyChoices: choices
				  }
				: {
						surveyQuestion: question,
						surveyQuestionType: questionType,
						surveyAnswer: ''
				  };
		if (question === '') {
			setMessage('Please enter the question');
			setIsError(true);
			// alert('Please enter the question');
		} else if (questionType === '') {
			// alert('Please select a question type');
			setMessage('Please select a question type');
			setIsError(true);
		} else if (questionType === 'multichoice' || questionType === 'radio') {
			if (choices.length < 2) {
				setMessage('Please add minimum of 2 choices');
				setIsError(true);
			} else {
				handleFormData(formData);
				clearDataFields();
			}
		} else {
			handleFormData(formData);
			clearDataFields();
		}
	};

	useEffect(() => {
		var timer = setTimeout(() => {
			setIsError(false);
		}, 2000);
		return () => clearTimeout(timer);
	}, [isError]);

	const clearDataFields = () => {
		setChoices([]);
		setEachChoice('');
		setQuestion('');
		setQuestionType('');
	};

	return (
		<FormBuilderWrapper>
			<MuiTextField
				value={question}
				onChange={handleFields}
				setState={setQuestion}
				label='Question'
				width='300px'
			/>
			<MuiSelect
				value={questionType}
				onChange={handleFields}
				setState={setQuestionType}
			/>
			{questionType === 'multichoice' || questionType === 'radio' ? (
				<ChoicesWrapper>
					<ChoiceTitle>Add choices</ChoiceTitle>
					<ChoicesTextBoxWrapper>
						<MuiTextField
							value={eachChoice}
							onChange={handleFields}
							setState={setEachChoice}
							label={'Add options'}
							width='230px'
						/>
						<MuiButton
							onClick={handleAddChoices}
							text={'Add'}
							disabled={eachChoice?.length ? false : true}
						></MuiButton>
					</ChoicesTextBoxWrapper>
					<AddedChoices>
						{choices?.map((eachVal, id) => (
							<EveryChoice key={id}>
								<ChoiceText>{eachVal?.eachChoice}</ChoiceText>
								<IconWrapper onClick={() => handleRemoveChoice(id)}>
									<CancelIcon fontSize='small' />
								</IconWrapper>
							</EveryChoice>
						))}
					</AddedChoices>
				</ChoicesWrapper>
			) : (
				''
			)}
			<FormActions>
				<MuiButton
					onClick={handleSaveForm}
					text={'Save Question'}
					right={'10px !important'}
				/>
				<MuiButton onClick={clearDataFields} text={'Clear form'} />
			</FormActions>

			<MuiSnackbar
				open={isError}
				message={message}
				handleClose={() => setIsError(false)}
			/>
		</FormBuilderWrapper>
	);
};
export default Form;
