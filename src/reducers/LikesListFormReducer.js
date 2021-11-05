import {
  SET_LIKES_LIST_FORM_LINK,
  PREPEND_LIKES_LIST_FORM,
  PROCESSING,
  RESET,
  UPDATE_LIKES_LIST_FORM,
  ADD_LIKES_LIST_FORM,
} from '../actions/types';
import {checkData} from '../utilities/index';

const INITIAL_STATE = {
  likeslist: [],
  refreshing: false,
  nextpageurl: null,
  fetching: false,
  loadingmore: false,
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
    case 'likeslistfetching':
      return {...state, fetching: value};
      break;
    case 'likeslistrefreshing':
      return {...state, refreshing: value};
      break;
    case 'likeslistloadingmore':
      return {...state, loadingmore: value};
      break;
    default:
      return state;
      break;
  }
};

const LikesListFormReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_LIKES_LIST_FORM:
      return {...state, likeslist: [...state.likeslist, ...action.payload]};
      break;
    case PREPEND_LIKES_LIST_FORM:
      return {...state, likeslist: [...action.payload, ...state.likeslist]};
      break;
    case SET_LIKES_LIST_FORM_LINK:
      return {...state, nextpageurl: action.payload};
    case UPDATE_LIKES_LIST_FORM:
      let updatedstate = state.likeslist.map(item => {
        return item.profile.profile_id == action.payload.profile.profile_id
          ? {...item, ...action.payload}
          : item;
      });
      /*updatedstate.find(item => item.profile_id == action.payload.profile_id) == undefined ?
                updatedstate.push({ ...action.payload }) : null;*/
      return {...state, likeslist: updatedstate};
      break;
    case PROCESSING:
      return handleProcessing(action.payload.key, action.payload.value, state);
      break;
    case RESET:
      if (action.payload.key == 'likeslistform') {
        return INITIAL_STATE;
      }
      return state;
      break;
    default:
      return state;
      break;
  }
};
export default LikesListFormReducer;
