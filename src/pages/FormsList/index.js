import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CancelIcon from '@material-ui/icons/Cancel';

//COMPONENTS
import { Header } from 'containers';
import { MuiButton, MuiSnackbar } from 'components';

// IMAGES
import NoDataLogo from '../../assets/images/Error.jpeg';

const StyledListWrapper = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
`;

const StyledFormsListWrapper = styled.div`
	flex: 1;
	flex-wrap: wrap;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: flex-start;
	padding: 4em 2em;
`;

const FormsListWrapper = styled.div`
	width: 200px;
	box-shadow: 1px 5px 12px #edd7d7;
	margin: 1em;
`;

const NoDataWrapper = styled.div`
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

const StyledLink = styled(Link)`
	text-decoration: none !important;
`;

const PreviewTitle = styled.div`
	padding: 0.5em;
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	box-shadow: 0px 4px 7px #fff0f3;
	justify-content: space-between;
	text-transform: capitalize;
`;

const PreviewContainer = styled.div`
	padding: 1em;
	min-height: 100px;
	display: flex;
	flex-direction: column;
	word-break: break-word;
`;

const TitleText = styled.div`
	flex-direction: column;
	text-align: left;
`;

const TitleDate = styled.div`
	font-size: 0.6em;
`;

const UrlWrapper = styled.div`
	font-size: 0.8em;
	flex: 1;
	display: flex;
	justify-content: space-between;
	text-align: left;
	margin-bottom: 1em;
	align-items: center;
`;

const NoteWrapper = styled.div`
	position: fixed;
	background: white;
	bottom: 10px;
	right: 10px;
	box-shadow: 1px 5px 12px #edd7d7;
	padding: 0.5em 1em 0.5em 1em;
`;

const IconWrapper = styled.div`
	color: #f50057;
	cursor: pointer;
	position: relative;
	top: -15px;
	right: -15px;
`;

const RemoveAllButtonWrapper = styled.div`
	position: fixed;
	top: 80px;
	right: 10px;
`;

const ResponseCount = styled.div`
	color: #0f698e;
	font-size: 2em;
`;

const FormsList = () => {
	const [savedForms, setSavedForms] = React.useState([]);
	const [isError, setIsError] = React.useState(false);
	const [message, setMessage] = React.useState(false);

	React.useEffect(() => {
		handleFormsList();
	}, []);

	const handleFormsList = () => {
		let allForms = localStorage.getItem('formsList');
		setSavedForms(JSON.parse(allForms));
	};

	const handleRemove = (slug) => {
		let forms = [...savedForms];
		let filteredForms = forms.filter((each) => each.slug !== slug);
		localStorage.clear();
		localStorage.setItem('formsList', JSON.stringify(filteredForms));
		handleFormsList();
		setMessage('Form removed successfully');
		setIsError(true);
	};

	return (
		<StyledListWrapper>
			<Header link='/' linkText='Home' />
			{savedForms?.length ? (
				<StyledFormsListWrapper>
					{savedForms?.map((eachForm, id) => (
						<FormsListWrapper key={eachForm?.slug}>
							<PreviewTitle>
								<TitleText>
									<TitleText> {eachForm?.formTitle}</TitleText>
									<TitleDate>Created - {eachForm?.createdAt}</TitleDate>
								</TitleText>
								<IconWrapper onClick={() => handleRemove(eachForm?.slug)}>
									<CancelIcon />
								</IconWrapper>
							</PreviewTitle>
							<PreviewContainer>
								<UrlWrapper>URL - {eachForm?.slug}</UrlWrapper>

								<UrlWrapper>
									<div>Total Responses -</div>
									<ResponseCount>{eachForm?.numberOfResponses}</ResponseCount>
								</UrlWrapper>
								<StyledLink to={`/forms/${eachForm?.slug}`}>
									<MuiButton text={'Take Survey'}></MuiButton>
								</StyledLink>
							</PreviewContainer>
						</FormsListWrapper>
					))}
				</StyledFormsListWrapper>
			) : (
				<NoDataWrapper>
					<div>
						<img src={NoDataLogo} alt='No Data' style={{ height: '300px' }} />
					</div>
					No forms added please add a form here
					<StyledLink to='/'>
						<MuiButton text={'Add Forms'} top='20px'></MuiButton>
					</StyledLink>
				</NoDataWrapper>
			)}

			{savedForms?.length ? (
				<NoteWrapper>
					Note : Click on the Take survey button to go to survey taker page
				</NoteWrapper>
			) : (
				''
			)}
			{savedForms?.length ? (
				<RemoveAllButtonWrapper>
					<MuiButton
						onClick={() => {
							localStorage.clear();
							setMessage('All forms removed successfully');
							setIsError(true);
							handleFormsList();
						}}
						text={'Remove all'}
					></MuiButton>
				</RemoveAllButtonWrapper>
			) : (
				''
			)}
			<MuiSnackbar
				open={isError}
				message={message}
				handleClose={() => setIsError(false)}
			/>
		</StyledListWrapper>
	);
};

export default FormsList;
