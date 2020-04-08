import React, { Component } from 'react';
import { Button, Input, Message } from 'rsuite';
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

const StyledMessage = styled(Message)`
  width: 300px;
  margin: 0.75em;
`

export default class LoginForm extends Component {

    state = {
      email: null,   
      password: null,
    }

    handleChange = (value, name) => {
      this.setState({[name]: value})
    }

    handleSubmit = () => {
      const {login} = this.props;
      const {email, password} = this.state;
      login({email, password});
    }

    render() {
        const {error} = this.props;
        return (
        <StyledContainer>
            <h3>Member Access</h3>
            <StyledInput 
              placeholder="Email" 
              onChange={(value) => this.handleChange(value, 'email')}
            />
            <StyledInput 
              placeholder="Password"
              type="password"
              onChange={(value) => this.handleChange(value, 'password')}
            />
            <StyledButton 
              color="green"
              onClick={this.handleSubmit}
            >
              Login
            </StyledButton>
            <StyledLink to="/forget">I forgot my password</StyledLink>
            {error && <StyledMessage type="error" description={error} />}
            
        </StyledContainer>
        );
    }
}

LoginForm.propTypes = {
    login: PropTypes.func
};
