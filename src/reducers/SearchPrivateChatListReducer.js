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
  switch (action.type) {
    case UPDATE_SEARCH_PRIVATE_CHATLIST:
      let excluded = [];
      reducerdata = state.searchresults.map(item => {
        let payload = action.payload.find(
          newitem => item.profile.profile_id == newitem.profile_id,
        );
        if (payload) {
          excluded.push(payload.profile.profile_id);
          return {...item, ...payload};
        }
        return item;
      });
      let added = action.payload.filter(
        item => !excluded.includes(item.profile.profile_id),
      );
      return {...state, searchresults: [...reducerdata, ...added]};
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
