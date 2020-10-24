import {
  ADD_SERVICE,
  DELETE_SERVICE,
  EDIT_SERVICE,
  LOAD_SERVICES
} from '../actions/types';
import _ from 'lodash';

const INITIAL_STATE = {
  services: [],
  message: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_SERVICES:
      return {
        ...state,
        services: action.payload,
        message: ''
      };
    case ADD_SERVICE:
      return {
        ...state,
        services: [...state.services, action.payload],
        message: 'Appointment Added'
      };
    case EDIT_SERVICE:
      return {
        ...state,
        message: 'Appointment Updated'
      };
    case DELETE_SERVICE:
      return {
        ...state,
        services: _.remove(state.services, function (el) {
          return el.appointment_id !== action.payload;
        })
      };
    default:
      return state;
  }
};
