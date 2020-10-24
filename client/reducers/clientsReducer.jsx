import {
  CREATE_CLIENT,
  DELETE_CLIENT,
  FETCH_CLIENT,
  FETCH_CLIENTS,
  UPDATE_CLIENT
} from '../actions/types';
import _ from 'lodash';

const INITIAL_STATE = {
  clients: [],
  loading: false,
  message: '',
  count: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CLIENTS:
      return {
        ...state,
        clients: action.payload.clients,
        count: action.payload.count,
        loading: false,
        message: ''
      };
    case CREATE_CLIENT:
      return {
        ...state,
        clients: [...state.clients, action.payload],
        message: 'Client Added'
      };
    case FETCH_CLIENT:
      return { ...state, [action.payload.id]: action.payload };
    case UPDATE_CLIENT:
      return {
        ...state,
        message: 'Client Updated'
      };
    case DELETE_CLIENT:
      return {
        ...state,
        clients: _.remove(state.clients, function (el) {
          return el._id !== action.payload;
        })
      };
    default:
      return state;
  }
};
