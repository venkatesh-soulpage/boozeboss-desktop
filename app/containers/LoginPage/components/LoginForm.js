import React, { Component } from 'react';
import { Button, Input } from 'rsuite';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
`;

const StyledInput = styled(Input)`
  max-width: 300px;
  margin: 0.75em;
`;

const StyledButton = styled(Button)`
  width: 300px;
`;

const StyledLink = styled(Link)`
  color: gray;
  margin: 0.75em;

  &:hover {
    color: gray;
    opacity: 0.75;
  }
`;

export default class LoginForm extends Component {

    state = {
        email: null,
        password: null,
    }

    render() {
        return (
        <StyledContainer>
            <h3>Member Access</h3>
            <StyledInput placeholder="Email" />
            <StyledInput placeholder="Password" type="password" />
            <StyledButton color="green">Login</StyledButton>
            <StyledLink to="/forget">I forgot my password</StyledLink>
        </StyledContainer>
        );
    }
}

LoginForm.propTypes = {
    login: PropTypes.func
};
