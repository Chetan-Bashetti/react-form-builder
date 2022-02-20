import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// COMPONENTS
import Logo from '../../assets/images/simform.svg';
import { MuiButton } from 'components';

const StyledHeader = styled.div`
	display: flex;
	flex-direction: row;
	padding: 1em;
	justify-content: space-between;
	box-shadow: 0px 0px 8px #dfb7b7;
	align-items: center;
`;

const IconWrapper = styled.div`
	height: 30px;
`;

const Image = styled.img`
	height: inherit;
`;

const StyledLink = styled(Link)`
	text-decoration: none !important;
`;

const ListsWrapper = styled.div``;

const Header = ({ link = '', linkText = '' }) => {
	return (
		<StyledHeader>
			<IconWrapper>
				<Image src={Logo} alt='logo' />
			</IconWrapper>
			<ListsWrapper>
				<StyledLink to={link}>
					<MuiButton text={linkText}></MuiButton>
				</StyledLink>
			</ListsWrapper>
		</StyledHeader>
	);
};

export default Header;
