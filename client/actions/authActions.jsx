import api from '../apis/api';
import { returnErrors, clearErrors } from './errorActions';
import { setLoading } from './loadingActions';
import history from '../history';
import { tokenConfig } from './tokenActions';
import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from './types';

export const loadUser = () => async (dispatch, getState) => {
  dispatch(clearErrors());

  dispatch(setLoading());
  api.get('/user/me', tokenConfig(getState))
    .then(res => {
      if (res.data.success === true) {
        dispatch({ type: USER_LOADED, payload: res.data.data });
      } else {
        dispatch(returnErrors(res.data.message, res.data.status));
      }
    })
    .catch(err => {
      dispatch(returnErrors(err, 0));
      dispatch({ type: AUTH_ERROR });
    });
};

export const register = data => async dispatch => {
  dispatch(clearErrors());
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  data = JSON.stringify(data);
  dispatch(setLoading());
  api.post('/user/register', data, config)
    .then(res => {
      if (res.data.success === true) {
        dispatch({ type: REGISTER_SUCCESS, payload: res.data.data });
        history.push('/');
      } else {
        dispatch(returnErrors(res.data.message, res.data.status, 'REGISTER_FAIL'));
      }
    })
    .catch(err => {
      dispatch(returnErrors(err, 0));
      dispatch({ type: REGISTER_FAIL });
    });
};

export const login = data => dispatch => {
  dispatch(clearErrors());
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  data = JSON.stringify(data);

  dispatch(setLoading());
  api.post('user/login', data, config)
    .then(res => {
      if (res.data.success === true) {
        dispatch({ type: LOGIN_SUCCESS, payload: res.data.data });
        history.push('/appointments');
      } else {
        dispatch(returnErrors(res.data.message, res.data.status, 'LOGIN_FAIL'));
      }
    })
    .catch(err => {
      dispatch(returnErrors(err, 0));
      dispatch({ type: LOGIN_FAIL });
    });
};

export const logout = () => {
  history.push('/');
  return {
    type: LOGOUT_SUCCESS
  };
};
