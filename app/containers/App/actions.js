import {
    AUTHENTICATE
} from './constants';
  

export function authenticate(token) {
    localStorage.setItem('jwt', token);
    return {
      type: AUTHENTICATE,
      token
    };
  }