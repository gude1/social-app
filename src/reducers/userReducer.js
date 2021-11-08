import {SAVE_USER, UPDATE_USER} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SAVE_USER:
      console.warn('save_user', 'i was called');
      return {...state, ...action.payload};
      break;
    case UPDATE_USER:
      return {...state, ...action.payload};
      break;
    default:
      return state;
      break;
  }
};
