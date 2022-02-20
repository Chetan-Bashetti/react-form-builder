import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { MuiButton } from 'components';

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

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { error: null, errorInfo: null };

		if (this.props.showError === false) {
			this.state.error = null;
			this.state.errorInfo = null;
		}
	}

	componentDidCatch = (error, info) => {
		this.setState({ error: error, errorInfo: info });
	};

	render() {
		if (this.state.errorInfo) {
			return (
				<Wrapper>
					<NotFoundText>An error has occured!! Please try again.</NotFoundText>
					<StyledLink to={'/'}>
						<MuiButton text={'Home'}></MuiButton>
					</StyledLink>
				</Wrapper>
			);
		} else {
			return this.props.children;
		}
	}
}

export default ErrorBoundary;
