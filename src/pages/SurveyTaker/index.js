import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';

import { PRIMARY_COLOR } from 'constants';
import { MuiCheckbox, MuiButton, MuiTextField, MuiRadio } from 'components';
import { Header } from 'containers';

const Wrapper = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	border-radius: 3px;
	border-top-right-radius: 10px;
	border-top-left-radius: 10px;
`;

const SurveyContentWrapper = styled.div`
	display: flex;
	flex: 1;
	justify-content: center;
	padding: 1em 0em;
`;

const SurveyContent = styled.div`
	display: flex;
	flex-direction: column;
	width: 60%;
	box-shadow: 3px 4px 10px #f3dada;
`;

const PreviewDataWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	padding: 0.5em 0.5em 0.5em 0.5em;
	margin-bottom: 0.5em;
	background: white;
	box-shadow: 3px 4px 10px #f3dada;
`;

const FormQuestionWrapper = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
	padding: 1em 0em 0em 0em;
`;

const TitleWrapper = styled.div`
	align-items: center;
	display: flex;
	background: ${PRIMARY_COLOR};
	color: white;
	padding: 0.5em;
	font-weight: 600;
	border-top-right-radius: 8px;
	border-top-left-radius: 8px;
`;

const QuestionWrapper = styled.div`
	margin-left: 1em;
	flex: 1;
	display: flex;
	flex-direction: column;
`;

const QuestionTitleWrapper = styled.div`
	font-weight: 600;
	text-align: left;
	text-transform: capitalize;
`;

const AnswerOptionsWrapper = styled.div`
	margin-top: 0.5em;
	text-align: justify;
	text-transform: capitalize;
	font-size: 0.8em;
	cursor: pointer;
	display: flex;
	align-items: center;
`;

const TextBoxWrapper = styled.div`
	display: flex;
	margin-top: 1em;
`;

const ButtonWrapper = styled.div`
	padding: 1em 0;
`;

const SurveyTaker = () => {
	let allForms = JSON.parse(localStorage.getItem('formsList'));
	const { formId } = useParams();
	const [selecedForm, setSelectedForm] = React.useState({});
	let totalResponses = 0;
	const navigate = useNavigate();
	useEffect(() => {
		getSelectedFormId();
	}, []);

	const getSelectedFormId = () => {
		let formInddex = 0;
		if (allForms?.length) {
			formInddex = allForms?.findIndex((eachForm) => eachForm?.slug === formId);
			setSelectedForm(allForms[formInddex]);
			totalResponses = allForms[formInddex]?.numberOfResponses;
		}
		return formInddex;
	};

	const handleCheckBoxSelection = (id, optionId) => {
		let updatedForm = { ...selecedForm };
		updatedForm.questions[id].surveyChoices[optionId].isSelected =
			!updatedForm.questions[id].surveyChoices[optionId].isSelected;
		setSelectedForm(updatedForm);
	};

	const handleRadioSelection = (id, optionId) => {
		let updatedForm = { ...selecedForm };
		let surveyOptions = updatedForm.questions[id].surveyChoices;
		let updatedSurveyOptions = surveyOptions?.map((eachOprions, id) => {
			let newObj = {
				...eachOprions,
				isSelected: id === optionId ? true : false
			};
			return newObj;
		});
		updatedForm.questions[id].surveyChoices = updatedSurveyOptions;
		setSelectedForm(updatedForm);
	};

	const handleAnswerData = (e, id) => {
		let { value } = e.target;
		let updatedForm = { ...selecedForm };
		updatedForm.questions[id].surveyAnswer = value;
		setSelectedForm(updatedForm);
	};

	const handleUpdatedFormData = () => {
		let selectedFormId = getSelectedFormId();
		let allForms = JSON.parse(localStorage.getItem('formsList'));
		allForms[selectedFormId] = {
			...selecedForm,
			numberOfResponses: totalResponses + 1
		};
		localStorage.clear();
		localStorage.setItem('formsList', JSON.stringify(allForms));
		navigate('/');
	};

	return (
		<Wrapper>
			<Header link='/forms-list' linkText='Lists' />
			{formId ? (
				<SurveyContentWrapper>
					<SurveyContent>
						<TitleWrapper>{selecedForm?.formTitle}</TitleWrapper>
						<FormQuestionWrapper>
							{selecedForm?.questions?.map((eachData, id) => (
								<PreviewDataWrapper key={id}>
									<div>Q{id + 1}</div>
									<QuestionWrapper>
										<QuestionTitleWrapper>
											{eachData?.surveyQuestion}
										</QuestionTitleWrapper>
										{eachData?.surveyQuestionType === 'text' ? (
											<TextBoxWrapper>
												<MuiTextField
													value={eachData?.surveyAnswer}
													onChange={(e) => handleAnswerData(e, id)}
													label='Type your response here'
													width={'100%'}
												/>
											</TextBoxWrapper>
										) : (
											''
										)}
										{eachData?.surveyQuestionType === 'radio' ? (
											<div>
												{eachData?.surveyChoices?.map((eachChoice, surId) => (
													<AnswerOptionsWrapper
														key={surId}
														onClick={() => handleRadioSelection(id, surId)}
													>
														<MuiRadio isValue={eachChoice?.isSelected} />
														{eachChoice?.eachChoice}
													</AnswerOptionsWrapper>
												))}
											</div>
										) : (
											''
										)}
										{eachData?.surveyQuestionType === 'multichoice' ? (
											<div>
												{eachData?.surveyChoices?.map((eachChoice, surId) => (
													<AnswerOptionsWrapper
														key={surId}
														onClick={() => handleCheckBoxSelection(id, surId)}
													>
														<MuiCheckbox checked={eachChoice?.isSelected} />
														{eachChoice?.eachChoice}
													</AnswerOptionsWrapper>
												))}
											</div>
										) : (
											''
										)}
									</QuestionWrapper>
								</PreviewDataWrapper>
							))}
						</FormQuestionWrapper>
						<ButtonWrapper>
							<MuiButton
								onClick={handleUpdatedFormData}
								text={'Save form'}
							></MuiButton>
						</ButtonWrapper>
					</SurveyContent>
				</SurveyContentWrapper>
			) : (
				''
			)}
		</Wrapper>
	);
};
export default SurveyTaker;
