import {
    AUTHENTICATE,
    LOGOUT,
} from './constants';
  

export function authenticate(token) {
    localStorage.setItem('jwt', token);
    return {
      type: AUTHENTICATE,
      token
    };
}


export function logout() {
    localStorage.setItem('jwt', null);
    return {
      type: LOGOUT,
    };
  }