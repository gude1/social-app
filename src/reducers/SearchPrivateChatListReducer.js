import {
  RESET,
  PROCESSING,
  UPDATE_SEARCH_PRIVATE_CHATLIST,
  SET_SEARCH_PRIVATE_CHATLIST_NEXTURL,
} from '../actions/types';
import {checkData} from '../utilities/index';

const INITIAL_STATE = {
  searchresults: [],
  searchword: null,
  next_url: null,
  searching: false,
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
    case 'searchprivatechatlistfetching':
      return {...state, searching: value};
      break;
    case 'searchprivatechatlistloadingmore':
      return {...state, loadingmore: value};
      break;
    default:
      return state;
      break;
  }
};

const SearchPrivateChatListReducer = (state = INITIAL_STATE, action) => {
  let reducerdata = [];
  let boolval = false;
  switch (action.type) {
    case UPDATE_SEARCH_PRIVATE_CHATLIST:
      reducerdata = [];
      boolval = false;
      reducerdata = state.searchresults.map((item) => {
        if (item.profile.profile_id == action.payload.profile.profile_id) {
          boolval = true;
          return {...item, ...action.payload};
        }
        return item;
      });
      if (boolval != true) {
        reducerdata.push({...action.payload});
      }
      return {...state, searchresults: reducerdata};
      break;
    case SET_SEARCH_PRIVATE_CHATLIST_NEXTURL:
      return {...state, next_url: action.payload};
      break;
    case PROCESSING:
      return handleProcessing(action.payload.key, action.payload.value, state);
      break;
    case RESET:
      return action.payload.key == 'searchprivatechatlist'
        ? INITIAL_STATE
        : state;
      break;
    default:
      return state;
      break;
  }
};

export default SearchPrivateChatListReducer;
