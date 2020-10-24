import {
  SET_LOADING,
  REMOVE_LOADING
} from '../actions/types';

const INITIAL_STATE = {
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case REMOVE_LOADING:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};
