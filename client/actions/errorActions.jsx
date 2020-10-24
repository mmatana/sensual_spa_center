import { GET_ERRORS, CLEAR_ERRORS } from './types';
import { removeLoading } from './loadingActions';

export const returnErrors = (msg, status, id = null) => {
  removeLoading();
  return {
    type: GET_ERRORS,
    payload: { msg, status, id }
  };
};

export const clearErrors = () => {
  removeLoading();
  return {
    type: CLEAR_ERRORS
  };
};
