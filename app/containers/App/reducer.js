/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */


import { fromJS } from 'immutable';
import {  AUTHENTICATE, LOGOUT } from './constants';

import { decode } from 'utils/tokenUtils';

const tokenIsExpired = () => {
  const token = decode(localStorage.getItem('jwt'));
  const isExpired = new Date() > new Date(token.exp * 1000) ;
  return isExpired;
}

// The initial state of the App
export const initialState = fromJS({
  loading: false,
  error: false,
  isAuthenticated: !!localStorage.getItem('jwt') && !tokenIsExpired(),
});

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return state.set('isAuthenticated', true);
    case LOGOUT: 
      return state.set('isAuthenticated', false);
    default:
      return state;
  }
};

export default appReducer;
