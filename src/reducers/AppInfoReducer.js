import {SET_APP_INFO} from '../actions/types';

const INITIAL_STATE = {
  editprofileinformed: false,
  currentscreen: {name: '', id: ''}, //the currently appearing screen
  postinformed: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_APP_INFO:
      return {...state, ...action.payload};
      break;
    default:
      return state;
      break;
  }
};
