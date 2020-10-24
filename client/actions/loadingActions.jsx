import {
  SET_LOADING,
  REMOVE_LOADING
} from './types';

export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};

export const removeLoading = () => {
  return {
    type: REMOVE_LOADING
  };
};
