import {
  PROCESSING,
  RESET,
  ADD_FOLLOWINFO_LIST,
  ADD_FOLLOWINFO_URL,
  UPDATE_FOLLOWINFO_LIST,
} from '../actions/types';
import {checkData} from '../utilities/index';

const INITIAL_STATE = {
  list: [],
  nexturl: null,
  loadingmore: false,
  loading: false,
};

const handleProcessing = (key, value, state) => {
  if (
    checkData(key) != true ||
    checkData(state) != true ||
    checkData(value) != true
  ) {
    return state;
  }
  switch (key) {
    case 'followinfoloading':
      return {...state, loading: value};
      break;
    case 'followinfoloadingmore':
      return {...state, loadingmore: value};
      break;
    default:
      return state;
      break;
  }
};

const FollowInfoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_FOLLOWINFO_LIST:
      return {...state, list: [...state.list, ...action.payload]};
      break;
    case UPDATE_FOLLOWINFO_LIST:
      let updatedstate = state.list.map((item) => {
        return item.profile.profile_id == action.payload.profile.profile_id
          ? {...item, ...action.payload}
          : item;
      });
      return {...state, list: updatedstate};
    case ADD_FOLLOWINFO_URL:
      return {...state, nexturl: action.payload};
      break;
      return {...state, list: updatedstate};
      break;
    case PROCESSING:
      return handleProcessing(action.payload.key, action.payload.value, state);
      break;
    case RESET:
      if (action.payload.key == 'followinfo') {
        return INITIAL_STATE;
      }
      return state;
      break;
    default:
      return state;
      break;
  }
};
export default FollowInfoReducer;
