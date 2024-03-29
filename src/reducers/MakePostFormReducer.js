import {
  UPDATE_POST_FORM_IMAGE_CHANGED,
  UPDATE_POST_FORM_TEXT_CHANGED,
  UPDATE_POST,
  REMOVE_POST,
  PROCESSING,
  RESET,
} from '../actions/types';
import {checkData} from '../utilities';
import AsyncStorage from '@react-native-community/async-storage';

const secondState = {
  isprocessing: false,
  toposttext: '',
  topostimages: [],
  postshow: false,
};

const INITIAL_STATE = {
  savedposts: [],
  ...secondState,
};

const arrangePost = (data = []) => {
  if (!Array.isArray(data) || data.length < 1) {
    return data;
  }
  data = [...data];
  return data.sort((item1, item2) => item1.created_at - item2.created_at);
};

//to determine the type of processing request if user profile
const handleProcessing = (key, value, state) => {
  if (
    checkData(key) != true ||
    checkData(state) != true ||
    checkData(value) != true
  ) {
    return state;
  }
  switch (key) {
    case 'POSTFORM':
      return {...state, isprocessing: value};
      break;
    case 'postformshow':
      return {...state, postshow: value};
      break;
    default:
      return state;
      break;
  }
};
let reducerdata = null;
const MakePostFormReducer = (state = INITIAL_STATE, action) => {
  if (checkData(action.payload)) {
    var {key, value} = action.payload;
  }
  switch (action.type) {
    case UPDATE_POST_FORM_TEXT_CHANGED:
      return {...state, toposttext: action.payload};
      break;
    case UPDATE_POST_FORM_IMAGE_CHANGED:
      return {...state, topostimages: arrangePost([...action.payload])};
      break;
    case UPDATE_POST:
      return {...state, savedposts: [{...action.payload}]};
      break;
    case REMOVE_POST:
      reducerdata = state.savedposts.filter(item => {
        return item.postid != action.payload;
      });
      return {...state, savedposts: reducerdata};
      break;
    case PROCESSING:
      return handleProcessing(action.payload.key, action.payload.value, state);
      break;
    case RESET:
      if (key == 'POSTFORM') {
        return {...state, ...secondState};
      } else if (key == 'POSTFORMALL') {
        return INITIAL_STATE;
      } else {
        return state;
      }
      break;
    default:
      return state;
      break;
  }
};

export const MakePostFormListConfig = {
  key: 'makepostform',
  storage: AsyncStorage,
  whitelist: ['savedposts', 'topostimages', 'toposttext'],
};

export default MakePostFormReducer;
