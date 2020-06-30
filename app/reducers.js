/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';

import { LOGOUT } from 'containers/App/constants';
import globalReducer from 'containers/App/reducer';

import history from 'utils/history';
import languageProviderReducer from 'containers/LanguageProvider/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    language: languageProviderReducer,
    global: globalReducer,
    ...injectedReducers,
  });

  const appReducer = (state, action) => {
    if (action.type === LOGOUT) {
        state = undefined;
    }

    return rootReducer(state, action);
};

  // Wrap the root reducer and return a new root reducer with router state
  const mergeWithRouterState = connectRouter(history);
  return mergeWithRouterState(appReducer);
}
