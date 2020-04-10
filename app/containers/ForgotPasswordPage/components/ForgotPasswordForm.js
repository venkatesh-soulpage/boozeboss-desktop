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

export default class ForgotPasswordForm extends Component {

    state = {
      email: null,   
    }

    handleChange = (value, name) => {
      this.setState({[name]: value})
    }

    handleSubmit = () => {
      const {forgot} = this.props;
      const {email} = this.state;
      forgot(email);
    }

    render() {
        const {error, success} = this.props;
        const { email } = this.state;
        return (
        <StyledContainer>
            <h4>Forgot password</h4>
            <StyledInput 
              placeholder="Email" 
              disabled={success}
              onChange={(value) => this.handleChange(value, 'email')}
            />
            <StyledButton 
              color="green"
              onClick={this.handleSubmit}
            >
              Reset
            </StyledButton>
            {error && <StyledMessage type="error" description={error} />}
            {success && <StyledMessage type="success" description={`We sen't an email to ${email} with the recovery instructions.`} />}
            <StyledLink to="/login">Login</StyledLink>
        </StyledContainer>
        );
    }
}

ForgotPasswordForm.propTypes = {
    forgot: PropTypes.func
};
