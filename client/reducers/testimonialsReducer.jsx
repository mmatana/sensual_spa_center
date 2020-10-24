import {
  ADD_TESTIMONIAL,
  DELETE_TESTIMONIAL,
  EDIT_TESTIMONIAL,
  LOAD_TESTIMONIALS
} from '../actions/types';
import _ from 'lodash';

const INITIAL_STATE = {
  testimonials: [],
  message: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_TESTIMONIALS:
      return {
        ...state,
        testimonials: action.payload,
        message: ''
      };
    case ADD_TESTIMONIAL:
      return {
        ...state,
        testimonials: action.payload,
        message: 'Testimonial Added'
      };
    case EDIT_TESTIMONIAL:
      return {
        ...state,
        message: 'Testimonial Updated'
      };
    case DELETE_TESTIMONIAL:
      return {
        ...state,
        testimonials: _.remove(state.testimonials, function (el) {
          return el.testimonial_id !== action.payload;
        })
      };
    default:
      return state;
  }
};
