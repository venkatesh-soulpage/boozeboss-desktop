// import { SIGNUP_REQUEST } from '../SignupPage/constants'
import { LOGIN_REQUEST } from '../LoginPage/constants'
import { REFRESH_TOKEN_REQUEST } from './constants'

const ignoredActionTypes = [
    REFRESH_TOKEN_REQUEST,
    // SIGNUP_REQUEST,
    LOGIN_REQUEST,
];

function identifyAction(action) {
    return action.type.split('_').slice(0, -1).join('_')
}

export function getSuccessType(action) {
    return `${identifyAction(action)}_SUCCESS`
}

export function getFailType(action) {
    return `${identifyAction(action)}_ERROR`
}

export function monitorableAction(action) {
  return action.type
    .includes('REQUEST') && ignoredActionTypes
        .every(fragment => !action.type.includes(fragment));
}