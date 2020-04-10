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

export default class ResetPasswordForm extends Component {

    state = {
      email: null,   
      token: null,
      password: null,
      confirm: null,
    }

    componentDidMount = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const email  = urlParams.get('email');
        const token  = urlParams.get('token');
        this.setState({email, token});
    }

    handleChange = (value, name) => {
      this.setState({[name]: value})
    }

    handleSubmit = () => {
        const { reset } = this.props;
        const {email, password, confirm, token} = this.state;
        if (password !== confirm) return;
        reset({email, password, token});
    }

    render() {
        const {error, success} = this.props;
        return (
        <StyledContainer>
            <h4>Reset Password</h4>
            <p>Please type your new password</p>
            <StyledInput 
              placeholder="Password"
              type="password"
              onChange={(value) => this.handleChange(value, 'password')}
            />
            <StyledInput 
              placeholder="Confirm your password"
              type="password"
              onChange={(value) => this.handleChange(value, 'confirm')}
            />
            <StyledButton 
              color="green"
              onClick={this.handleSubmit}
            >
              Reset
            </StyledButton>
            {error && <StyledMessage type="error" description={error} />}
            {success && <StyledMessage type="success" description={`Password was updated succesfully.`} />}
        </StyledContainer>
        );
    }
}

ResetPasswordForm.propTypes = {
    reset: PropTypes.func.isRequired,
    error: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    success: PropTypes.bool,
};
