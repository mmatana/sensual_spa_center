import api from '../apis/api';
import { returnErrors, clearErrors } from './errorActions';
import { setLoading } from './loadingActions';
import history from '../history';
import { tokenConfig } from './tokenActions';
import {
  ADD_SERVICE,
  DELETE_SERVICE,
  EDIT_SERVICE,
  LOAD_SERVICES
} from './types';

export const loadServices = () => async (dispatch, getState) => {
  dispatch(clearErrors());
  dispatch(setLoading());

  api.get('/services', tokenConfig(getState))
    .then(res => {
      if (res.data.success === true) {
        dispatch({ type: LOAD_SERVICES, payload: res.data.data });
      } else {
        dispatch(returnErrors(res.data.message, res.data.status));
      }
    })
    .catch(err => {
      dispatch(returnErrors(err, 0));
    });
};

export const addService = data => async (dispatch, getState) => {
  dispatch(clearErrors());
  data = JSON.stringify(data);
  dispatch(setLoading());
  api.post('/services', data, tokenConfig(getState))
    .then(res => {
      if (res.data.success === true) {
        dispatch({ type: ADD_SERVICE, payload: res.data.data });
        history.push('/');
      } else {
        dispatch(returnErrors(res.data.message, res.data.status, 'ADD_SERVICE_ERROR'));
      }
    })
    .catch(err => {
      dispatch(returnErrors(err, 0));
    });
};

export const editService = (id, data) => async (dispatch, getState) => {
  dispatch(clearErrors());
  data = JSON.stringify(data);
  dispatch(setLoading());
  api.put(`/services/${id}`, data, tokenConfig(getState))
    .then(res => {
      if (res.data.success === true) {
        dispatch({ type: EDIT_SERVICE });
        dispatch(loadServices());
      } else {
        dispatch(returnErrors(res.data.message, res.data.status, 'EDIT_SERVICE_ERROR'));
      }
    })
    .catch(err => {
      dispatch(returnErrors(err, 0));
    });
};

export const deleteService = id => async (dispatch, getState) => {
  dispatch(clearErrors());
  dispatch(setLoading());

  if (!window.confirm('Are you sure ?')) return;

  api.delete(`/services/${id}`, tokenConfig(getState))
    .then(res => {
      if (res.data.success === true) {
        dispatch({ type: DELETE_SERVICE, payload: id });
      } else {
        dispatch(returnErrors(res.data.message, res.data.status, 'DELETE_SERVICE_ERROR'));
      }
    })
    .catch(err => {
      dispatch(returnErrors(err, 0));
    });
};
