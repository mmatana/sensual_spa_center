import {
  ADD_APPOINTMENT,
  EDIT_APPOINTMENT,
  DELETE_APPOINTMENT,
  LOAD_APPOINTMENTS
} from '../actions/types';
import _ from 'lodash';

const INITIAL_STATE = {
  appointments: [],
  message: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_APPOINTMENTS:
      return {
        ...state,
        appointments: action.payload,
        message: ''
      };
    case ADD_APPOINTMENT:
      return {
        ...state,
        appointments: [...state.appointments, action.payload],
        message: 'Appointment Added'
      };
    case EDIT_APPOINTMENT:
      return {
        ...state,
        message: 'Appointment Updated'
      };
    case DELETE_APPOINTMENT:
      return {
        ...state,
        appointments: _.remove(state.appointments, function (el) {
          return el.appointment_id !== action.payload;
        })
      };
    default:
      return state;
  }
};
