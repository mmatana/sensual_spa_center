import api from '../apis/api';
import { returnErrors, clearErrors } from './errorActions';
import { setLoading } from './loadingActions';
import history from '../history';
import { tokenConfig } from './tokenActions';
import {
  ADD_APPOINTMENT,
  EDIT_APPOINTMENT,
  LOAD_APPOINTMENTS,
  DELETE_APPOINTMENT
} from './types';

export const loadAppointments = () => async (dispatch, getState) => {
  dispatch(clearErrors());
  dispatch(setLoading());

  api.get('/appointments', tokenConfig(getState))
    .then(res => {
      if (res.data.success === true) {
        dispatch({ type: LOAD_APPOINTMENTS, payload: res.data.data });
      } else {
        dispatch(returnErrors(res.data.message, res.data.status));
      }
    })
    .catch(err => {
      dispatch(returnErrors(err, 0));
    });
};

export const addAppointment = data => async (dispatch, getState) => {
  dispatch(clearErrors());

  data = JSON.stringify(data);

  dispatch(setLoading());

  api.post('/appointments', data, tokenConfig(getState))
    .then(res => {
      if (res.data.success === true) {
        dispatch({ type: ADD_APPOINTMENT, payload: res.data.data });
        history.push('/');
      } else {
        dispatch(returnErrors(res.data.message, res.data.status, 'ADD_APPOINTMENT_ERROR'));
      }
    })
    .catch(err => {
      dispatch(returnErrors(err, 0));
    });
};

export const editAppointment = (id, data) => async (dispatch, getState) => {
  dispatch(clearErrors());

  data = JSON.stringify(data);

  dispatch(setLoading());

  api.put(`/appointments/${id}`, data, tokenConfig(getState))
    .then(res => {
      if (res.data.success === true) {
        dispatch({ type: EDIT_APPOINTMENT });
        dispatch(loadAppointments());
      } else {
        dispatch(returnErrors(res.data.message, res.data.status, 'EDIT_APPOINTMENT_ERROR'));
      }
    })
    .catch(err => {
      dispatch(returnErrors(err, 0));
    });
};

export const deleteAppointment = id => async (dispatch, getState) => {
  dispatch(clearErrors());
  dispatch(setLoading());

  if (!window.confirm('Are you sure ?')) return;

  api.delete(`/appointments/${id}`, tokenConfig(getState))
    .then(res => {
      if (res.data.success === true) {
        dispatch({ type: DELETE_APPOINTMENT, payload: id });
      } else {
        dispatch(returnErrors(res.data.message, res.data.status, 'DELETE_APPOINTMENT_ERROR'));
      }
    })
    .catch(err => {
      dispatch(returnErrors(err, 0));
    });
};
