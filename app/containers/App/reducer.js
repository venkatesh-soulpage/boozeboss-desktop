/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */


import { fromJS } from 'immutable';
import { 
  AUTHENTICATE, LOGOUT,
  GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_ERROR
} from './constants';

import { decode } from 'utils/tokenUtils';

const tokenIsExpired = () => {
  const token = decode(localStorage.getItem('jwt'));
  const isExpired = new Date() > new Date(token.exp * 1000) ;
  return isExpired;
}

const getScope = () => {
  const token = decode(localStorage.getItem('jwt'));
  return token.scope;
}

const getRole = () => {
  const token = decode(localStorage.getItem('jwt'));
  return token.role;
}

// The initial state of the App
export const initialState = fromJS({
  loading: false,
  error: false,
  user: null,
  isAuthenticated: !!localStorage.getItem('jwt') && !tokenIsExpired(),
  scope: !!localStorage.getItem('jwt') && getScope(),
  role: !!localStorage.getItem('jwt') && getRole(),
});

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return state
      .set('isAuthenticated', true)
      .set('scope', action.scope)
      .set('role', action.role);
    case LOGOUT: 
      return state.set('isAuthenticated', false);
    case GET_USER_REQUEST:
      return state;
    case GET_USER_SUCCESS:
      return state.set('user', action.user);
    case GET_USER_ERROR:
      return state.set('error', action.error);
    default:
      return state;
  }
};

export default appReducer;
