import { decode } from 'utils/tokenUtils';
import {
    AUTHENTICATE,
    LOGOUT,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_ERROR,
    REFRESH_TOKEN_REQUEST, REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_ERROR
} from './constants';
  

export function authenticate(token) {
    localStorage.setItem('jwt', token);
    const decoded = decode(token);
    const {scope, role} = decoded;
    return {
      type: AUTHENTICATE,
      token,
      scope, 
      role
    };
}


export function logout() {
    localStorage.clear();
    return {
      type: LOGOUT,
    };
  }


// GET USER 
export function getUser() {
  return {
    type: GET_USER_REQUEST,
  }  
}

export function getUserSuccess(user) {
  return {
    type: GET_USER_SUCCESS,
    user
  }  
}

export function getUserError(error) {
  return {
    type: GET_USER_ERROR,
    error
  }  
}

/**
 * Refresh token request
 *
 * @return {object}    An action object with a type of REFRESH_TOKEN
 */
export function refreshToken() {
  return {
    type: REFRESH_TOKEN_REQUEST,
  };
}

/**
 *  Receive the new jwt token
 * 
 * @return {object}    An action object with a type of REFRESH_TOKEN_SUCCESS
 */
export function refreshTokenSuccess(credentials) {
  localStorage.setItem('jwt', credentials.token);
  localStorage.setItem('refresh_token', credentials.refresh_token)
  return {
    type: REFRESH_TOKEN_SUCCESS,
  };
}


/**
 * Get the error
 * 
 * @param  {object} error  The error object
 * @return {object}    An action object with a type of REFRESH_TOKEN_ERROR and error object
 */
export function refreshTokenError(error) {
  return {
    type: REFRESH_TOKEN_ERROR,
    error,
  };
}