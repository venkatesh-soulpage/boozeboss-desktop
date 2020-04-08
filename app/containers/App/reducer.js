/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */


import { fromJS } from 'immutable';
import {  AUTHENTICATE } from './constants';

// The initial state of the App
export const initialState = fromJS({
  loading: false,
  error: false,
  isAuthenticated: false,
});

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return state.set('isAuthenticated', true);
    default:
      return state;
  }
};

export default appReducer;
