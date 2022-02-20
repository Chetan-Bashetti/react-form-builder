import React, { useEffect } from 'react';
import styled from 'styled-components';

//CONTAINERS
import { Form, FormPreview, Header } from 'containers';

//COMPONENTS
import { MuiTextField, MuiButton, MuiDialog, MuiSnackbar } from 'components';

const StyledWrapper = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
`;

const PreviewWrapper = styled.div`
	display: flex;
	flex: 1;
	padding: 1em;
	background: #fff5f8;
	overflow-x: scroll;
`;

const FormTitleWrapper = styled.div`
	display: flex;
	flex: 1;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

const StyledContentWrapper = styled.div`
	display: flex;
	flex-direction: row-reverse;
	flex: 1;
	overflow: hidden;
`;

const FormBuilder = () => {
	const [forms, setForms] = React.useState([]);
	const [formTitle, setFormTitle] = React.useState('');
	const [formData, setFormData] = React.useState([]);
	const [dialogOpen, setDialogOpen] = React.useState(false);
	const [isError, setIsError] = React.useState(false);
	const [message, setMessage] = React.useState(false);

	useEffect(() => {
		let allForms = localStorage.getItem('formsList');
		if (allForms?.length) setForms(JSON.parse(allForms));
	}, []);

	const handleFormTitle = (e, setState) => {
		let { value } = e.target;
		setState(value);
	};

	const handleFormData = (newQuestion) => {
		let updatedFormData = [...formData];
		updatedFormData.push(newQuestion);
		setFormData(updatedFormData);
	};

	const handleSaveForm = () => {
		let updatedForms = [...forms];
		var date = new Date();
		var timeStamp = Date.now();
		let newForm = {
			slug: formTitle?.toLocaleLowerCase()?.replace(/ /g, '_') + timeStamp,
			createdAt: date.toLocaleString(),
			formTitle: formTitle,
			questions: formData,
			numberOfResponses: 0
		};
		updatedForms.push(newForm);
		setForms(updatedForms);
		localStorage.setItem('formsList', JSON.stringify(updatedForms));
		setMessage('Form added successfully');
		setIsError(true);
		setFormData([]);
		setFormTitle('');
	};

	return (
		<StyledWrapper>
			<Header link='forms-list' linkText='Lists' />
			<StyledContentWrapper>
				{formData?.length ? (
					<PreviewWrapper>
						<FormPreview
							formData={formData}
							formTitle={formTitle}
							handleSaveForm={handleSaveForm}
						/>
					</PreviewWrapper>
				) : (
					''
				)}
				<FormTitleWrapper>
					<MuiTextField
						value={formTitle}
						onChange={handleFormTitle}
						setState={setFormTitle}
						label='Form title'
						width='300px'
						right='10px !important'
					/>

					<MuiButton
						onClick={() => setDialogOpen(true)}
						text={'Add Question'}
						disabled={!formTitle.length}
					/>
				</FormTitleWrapper>
				<MuiDialog
					open={dialogOpen}
					handleClose={() => setDialogOpen(false)}
					formTitle={formTitle}
					children={<Form handleFormData={handleFormData} />}
				/>
			</StyledContentWrapper>
			<MuiSnackbar
				open={isError}
				message={message}
				handleClose={() => setIsError(false)}
			/>
		</StyledWrapper>
	);
};

export default FormBuilder;
