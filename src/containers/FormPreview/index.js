import React from 'react';
import styled from 'styled-components';

import { PRIMARY_COLOR } from 'constants';
import { MuiButton } from 'components';

const Wrapper = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	border-radius: 3px;
	border-top-right-radius: 10px;
	border-top-left-radius: 10px;
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
	font-weight: 500;
	border-top-right-radius: 8px;
	border-top-left-radius: 8px;
`;

const QuestionWrapper = styled.div`
	margin-left: 1em;
`;

const QuestionTitleWrapper = styled.div`
	font-weight: 600;
	text-align: left;
	text-transform: capitalize;
`;

const QuestionTypeWrapper = styled.div`
	margin-top: 0.5em;
	text-align: left;
	text-transform: capitalize;
`;

const OptionstitleWrapper = styled.div`
	margin-top: 0.5em;
	text-align: left;
	text-transform: capitalize;
`;

const AnswerOptionsWrapper = styled.div`
	margin-top: 0.5em;
	text-align: justify;
	text-transform: capitalize;
	font-size: 0.8em;
`;

const ButtonWrapper = styled.div`
	margin: 1em 0;
`;

const FormPreview = ({ formData = [], formTitle = '', handleSaveForm }) => {
	return (
		<Wrapper>
			<TitleWrapper>{formTitle}</TitleWrapper>
			<FormQuestionWrapper>
				{formData?.map((eachData, id) => (
					<PreviewDataWrapper key={id}>
						<div>Q{id + 1}</div>
						<QuestionWrapper>
							<QuestionTitleWrapper>
								{eachData?.surveyQuestion}
							</QuestionTitleWrapper>
							<QuestionTypeWrapper>
								Question Type - {eachData?.surveyQuestionType}
							</QuestionTypeWrapper>
							{eachData?.surveyQuestionType !== 'text' ? (
								<div>
									<OptionstitleWrapper>Available Options :</OptionstitleWrapper>
									{eachData?.surveyChoices?.map((eachChoice, surId) => (
										<AnswerOptionsWrapper key={surId}>
											{surId + 1}. {eachChoice?.eachChoice}
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
				<MuiButton onClick={handleSaveForm} text={'Save form'}></MuiButton>
			</ButtonWrapper>
		</Wrapper>
	);
};

// CHECK ARE EQUAL METHOSD AGAIN

// function areEqual(prevProps, nextProps) {
// 	if (prevProps === nextProps) {
// 		return false;
// 	} else {
// 		return true;
// 	}
// }

// const FormPreview = React.memo(DataPreview, areEqual);
export default FormPreview;
