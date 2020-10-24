import api from '../apis/api';
import { returnErrors, clearErrors } from './errorActions';
import { setLoading } from './loadingActions';
import { tokenConfig } from './tokenActions';
import {
  LOAD_TESTIMONIALS,
  ADD_TESTIMONIAL
} from './types';

export const loadTestimonials = () => async (dispatch, getState) => {
  dispatch(clearErrors());
  dispatch(setLoading());

  api.get('/testimonials', tokenConfig(getState))
    .then(res => {
      if (res.data.success === true) {
        dispatch({ type: LOAD_TESTIMONIALS, payload: res.data.data });
      } else {
        dispatch(returnErrors(res.data.message, res.data.status));
      }
    })
    .catch(err => {
      dispatch(returnErrors(err, 0));
    });
};

export const addTestimonial = data => async (dispatch, getState) => {
  dispatch(clearErrors());

  data = JSON.stringify(data);
  dispatch(setLoading());

  api.post('/testimonials', data, tokenConfig(getState))
    .then(res => {
      if (res.data.success === true) {
        dispatch({ type: ADD_TESTIMONIAL, payload: res.data.data });
      } else {
        dispatch(returnErrors(res.data.message, res.data.status, 'ADD_TESTIMONIAL_ERROR'));
      }
    })
    .catch(err => {
      dispatch(returnErrors(err, 0));
    });
};
