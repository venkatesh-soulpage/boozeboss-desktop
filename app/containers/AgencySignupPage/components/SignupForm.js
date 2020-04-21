import React, { Component } from 'react';
import { Button, Input, Message,  InputGroup, Icon } from 'rsuite';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

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
`

const styles = {
  width: '300px',
  margin: '0.75em'
}

export default class SignupForm extends Component {

    state = {
        email: null,   
        first_name: null,
        last_name: null,
        phone_number: null,
        password: null,
        confirm: null,
        token: null
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
        const {agencySignup} = this.props;
        const {email, first_name, last_name, phone_number, password, confirm, token} = this.state;

        if (password !== confirm) return;

        agencySignup({email, first_name, last_name, phone_number,  password, token});
      }
  
      render() {
          const {error} = this.props;
          const {email, first_name, last_name, phone_number, password, confirm} = this.state;
          return (
          <StyledContainer>
              <h4>You have been invited to join Booze Boss</h4>
              <InputGroup style={styles}>
                <InputGroup.Addon>
                  <Icon icon="envelope" />
                </InputGroup.Addon>
                <Input 
                  placeholder="Email"
                  disabled={true}
                  value={email}
                  onChange={(value) => this.handleChange(value, 'email')}
                />
              </InputGroup>
              <InputGroup style={styles}>
                <InputGroup.Addon>
                  <Icon icon="avatar" />
                </InputGroup.Addon>
                <Input 
                  placeholder="First Name"
                  value={first_name}
                  onChange={(value) => this.handleChange(value, 'first_name')}
                />
              </InputGroup>
              <InputGroup style={styles}>
                <InputGroup.Addon>
                  <Icon icon="avatar" />
                </InputGroup.Addon>
                <Input 
                  placeholder="Last Name"
                  value={last_name}
                  onChange={(value) => this.handleChange(value, 'last_name')}
                />
              </InputGroup>
              <PhoneInput
                  style={{...styles, zIndex: 99}}
                  country={'us'}
                  enableSearch
                  disableSearchIcon
                  inputProps={{
                    name: 'phone',
                    required: true,
                  }}
                  onChange={(value) => this.handleChange(value, 'phone_number')}
                />
              <InputGroup style={styles}>
                <InputGroup.Addon>
                  <Icon icon="lock" />
                </InputGroup.Addon>
                <Input 
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(value) => this.handleChange(value, 'password')}
                />
              </InputGroup>
              <InputGroup style={styles}>
                <InputGroup.Addon>
                  <Icon icon="lock" />
                </InputGroup.Addon>
                <Input 
                  placeholder="Confirm Password"
                  type="password"
                  value={confirm}
                  onChange={(value) => this.handleChange(value, 'confirm')}
                />
              </InputGroup>
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

SignupForm.propTypes = {

}