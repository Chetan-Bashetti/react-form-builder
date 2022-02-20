import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// COMPONENTS
import { MuiButton } from 'components';

// IMAGES
import NoMatchLogo from '../../assets/images/404.jpeg';

const Wrapper = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const NotFoundText = styled.div`
	font-size: 1.3em;
	margin: 2em 0em;
`;

const StyledLink = styled(Link)`
	text-decoration: none !important;
`;

const NoMatch = () => {
	return (
		<Wrapper>
			<img src={NoMatchLogo} alt='404logo' style={{ height: '400px' }} />
			<NotFoundText>
				This page dosen't exist, Please go to home page and try again.
			</NotFoundText>
			<StyledLink to={'/'}>
				<MuiButton text={'Home'}></MuiButton>
			</StyledLink>
		</Wrapper>
	);
};

export default NoMatch;
