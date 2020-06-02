import { decode } from 'utils/tokenUtils';
import {
    AUTHENTICATE,
    LOGOUT,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_ERROR
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