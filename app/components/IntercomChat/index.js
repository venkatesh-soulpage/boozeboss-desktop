/**
 *
 * IntercomChat
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeSelectIsAuthenticated, makeSelectUser } from '../../containers/App/selectors';

/* eslint-disable react/prefer-stateless-function */
class IntercomChat extends React.Component {

  componentDidMount = () => {
    const {user, isAuthenticated} = this.props;

    setTimeout(() => {
      if (isAuthenticated) {
        
          if (user) {
            window.Intercom("boot", {
              app_id: "vdwcv93y",
              name: `${user.first_name} ${user.last_name}`, // Full name
              email: user.email, // Email address
              created_at: user.created_at,// Signup date as a Unix timestamp
            });
          } else {
            setTimeout(() => {
              window.Intercom("boot", {
                app_id: "vdwcv93y",
                name: `${user.first_name} ${user.last_name}`, // Full name
                email: user.email, // Email address
                created_at: user.created_at,// Signup date as a Unix timestamp
              });
            }, 1000);
        } 
      } else {
        window.Intercom("boot", {
          app_id: "vdwcv93y",
        });
      }
    }, 1000)
  }

  render() {
    return <div />;
  }
}

IntercomChat.propTypes = {};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: makeSelectIsAuthenticated(),
  user: makeSelectUser()
});

const mapDispatchToProps = dispatch => ({
})


const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(IntercomChat);
