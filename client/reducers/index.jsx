import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import loadingReducer from './loadingReducer';
import appointmentReducer from './appointmentReducer';
import serviceReducer from './serviceReducer';
import testimonialsReducer from './testimonialsReducer';
import { LOGOUT_SUCCESS } from '../actions/types';
import { LOCAL_STORAGE_NAME } from '../PersistedStore';

const appReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  error: errorReducer,
  loading: loadingReducer,
  appointment: appointmentReducer,
  service: serviceReducer,
  testimonial: testimonialsReducer
});

export const rootReducer = (state, action) => {
  if (action.type === LOGOUT_SUCCESS) {
    // for all keys defined in your persistConfig(s)
    localStorage.removeItem(LOCAL_STORAGE_NAME);

    state = undefined;
  }
  return appReducer(state, action);
};
