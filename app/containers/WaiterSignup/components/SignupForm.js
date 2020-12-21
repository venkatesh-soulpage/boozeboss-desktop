/* eslint-disable camelcase */
import React, { Component } from 'react';
import {
  Button,
  Input,
  Message,
  InputGroup,
  Icon,
  Alert,
  SelectPicker,
  DatePicker,
} from 'rsuite';

import styled from 'styled-components';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import PasswordStrengthBar from 'react-password-strength-bar';

import PropTypes from 'prop-types';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  margin: 2em 0 0 0;
`;

const StyledButton = styled(Button)`
  width: 300px;
`;

const StyledMessage = styled(Message)`
  width: 300px;
  margin: 0.75em;
`;

const styles = {
  width: '300px',
  margin: '0.75em',
};

export default class SignupForm extends Component {
  state = {
    email: null,
    first_name: null,
    last_name: null,
    phone_number: null,
    date_of_birth: null,
    password: '',
    gender: null,
    confirm: null,
    token: null,
    outlet_event: null,
    outlet_venue: null,
  };

  componentDidMount = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    const token = urlParams.get('token');
    const outlet_event = urlParams.get('outlet_event');
    const outlet_venue = urlParams.get('outlet_venue');
    this.setState({
      email,
      token,
      outlet_event,
      outlet_venue,
    });
  };

  handleChange = (value, name) => {
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const { signup } = this.props;
    const {
      email,
      // eslint-disable-next-line camelcase
      first_name,
      last_name,
      phone_number,
      gender,
      date_of_birth,
      password,
      confirm,
      token,
      outlet_event,
      outlet_venue,
    } = this.state;

    if (
      !email ||
      !first_name ||
      !last_name ||
      !phone_number ||
      !gender ||
      !date_of_birth
    )
      return Alert.error('Missing Fields', 2500);
    if (password !== confirm)
      return Alert.success("Passwords don't match", 2500);

    signup({
      email,
      first_name,
      phone_number,
      last_name,
      password,
      gender,
      date_of_birth,
      token,
      outlet_event,
      outlet_venue,
    });
    return null;
  };

  render() {
    const { error, success } = this.props;
    const {
      email,
      first_name,
      last_name,
      password,
      gender,
      date_of_birth,
      confirm,
    } = this.state;

    if (success) {
      Alert.success('Succesfully Registered', 2500);
    }
    return (
      <StyledContainer>
        <h4>You have been invited to join LiquidIntel</h4>
        <InputGroup style={styles}>
          <InputGroup.Addon>
            <Icon icon="envelope" />
          </InputGroup.Addon>
          <Input
            placeholder="Email"
            disabled
            value={email}
            onChange={value => this.handleChange(value, 'email')}
          />
        </InputGroup>
        <InputGroup style={styles}>
          <InputGroup.Addon>
            <Icon icon="avatar" />
          </InputGroup.Addon>
          <Input
            placeholder="First Name"
            value={first_name}
            onChange={value => this.handleChange(value, 'first_name')}
          />
        </InputGroup>
        <InputGroup style={styles}>
          <InputGroup.Addon>
            <Icon icon="avatar" />
          </InputGroup.Addon>
          <Input
            placeholder="Last Name"
            value={last_name}
            onChange={value => this.handleChange(value, 'last_name')}
          />
        </InputGroup>
        <PhoneInput
          style={{ ...styles, zIndex: 99 }}
          country="us"
          enableSearch
          disableSearchIcon
          inputProps={{
            name: 'phone',
            required: true,
            autoFocus: true,
          }}
          onChange={value => this.handleChange(value, 'phone_number')}
        />
        <InputGroup style={styles}>
          <InputGroup.Addon>
            <Icon icon="genderless" />
          </InputGroup.Addon>
          <SelectPicker
            style={{ width: '100%' }}
            searchable={false}
            placeholder="I identify as..."
            data={[
              { label: 'Male', value: 'MALE' },
              { label: 'Female', value: 'FEMALE' },
              { label: 'Other', value: 'OTHER' },
            ]}
            value={gender}
            onChange={value => this.handleChange(value, 'gender')}
          />
        </InputGroup>
        <InputGroup style={styles}>
          <InputGroup.Addon>
            <Icon icon="calendar" />
          </InputGroup.Addon>
          <DatePicker
            style={{ width: '100%' }}
            oneTap
            placeholder="Date of Birth"
            value={date_of_birth}
            onChange={value => this.handleChange(value, 'date_of_birth')}
          />
        </InputGroup>
        <InputGroup style={styles}>
          <InputGroup.Addon>
            <Icon icon="lock" />
          </InputGroup.Addon>
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={value => this.handleChange(value, 'password')}
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
            onChange={value => this.handleChange(value, 'confirm')}
          />
        </InputGroup>
        <PasswordStrengthBar
          password={password}
          style={{ width: '300px', margin: '0 0 1em 0' }}
        />
        <StyledButton color="green" onClick={this.handleSubmit}>
          Signup
        </StyledButton>
        {error && <StyledMessage type="error" description={error} closable />}
        {success && (
          <StyledMessage type="success" description={success} closable />
        )}
      </StyledContainer>
    );
  }
}

SignupForm.propTypes = {
  signup: PropTypes.func,
  error: PropTypes.string,
  success: PropTypes.string,
};
