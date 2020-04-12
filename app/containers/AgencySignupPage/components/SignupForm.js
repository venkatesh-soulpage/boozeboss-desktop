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
  margin: 2em 0 0 0;
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
`;

export default class SignupForm extends Component {

    state = {
        email: null,   
        first_name: null,
    last_name: null,
        password: null,
    confirm: null,
        token: null,
    }

  componentDidMount = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const email  = urlParams.get('email');
    const token = urlParams.get('token');
    this.setState({ email, token });
      }
  
  handleChange = (value, name) => {
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
        const {agencySignup} = this.props;
        const {email, first_name, last_name, password, confirm, token} = this.state;

    if (password !== confirm) return;

    agencySignup({ email, first_name, last_name, password, token });
  };

  render() {
    const { error } = this.props;
    const { email, first_name, last_name, password, confirm } = this.state;
    return (
          <StyledContainer>
              <h4>You have been invited to join Booze Boss</h4>
        <StyledInput
              placeholder="Email" 
          disabled
              value={email}
                onChange={(value) => this.handleChange(value, 'email')}
        />
              <StyledInput 
                placeholder="First Name"
          value={first_name}
                onChange={(value) => this.handleChange(value, 'first_name')}
        />
              <StyledInput 
                placeholder="Last Name"
          value={last_name}
                onChange={(value) => this.handleChange(value, 'last_name')}
        />
              <StyledInput 
                placeholder="Password"
                type="password"
                value={password}
                onChange={(value) => this.handleChange(value, 'password')}
        />
              <StyledInput 
                placeholder="Confirm Password"
          type="password"
                value={confirm}
          onChange={value => this.handleChange(value, 'confirm')}
        />
              <StyledButton 
                color="green"
                onClick={this.handleSubmit}
              >
                Signup
              </StyledButton>
              {error && <StyledMessage type="error" description={error} />}
              
          </StyledContainer>
    );
      }
}

SignupForm.propTypes = {};

}