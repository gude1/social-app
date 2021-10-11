import {
  RESET,
  ADD_MEETUPMAIN_REQUESTS,
  REMOVE_PROFILE_MEETUPMAIN,
  UPDATE_MEETUPMAIN_REQUEST,
  PROCESSING,
  SET_MEETUPMAIN_URL,
  SET_MEETUPMAIN,
  SET_MEETUPMAIN_ERRORS,
  ADD_MEETUPMAIN_MY_REQUESTS,
  UPDATE_MEETUPMAIN_MY_REQUESTS,
  REMOVE_MEETUPMAIN_MY_REQUESTS,
  REMOVE_MEETUPMAIN_REQUESTS,
  REMOVE_MEETUPMAIN_REQUESTS_ARR,
  REMOVE_MEETUPMAIN_MY_REQUESTS_ARR,
} from '../actions/types';
import {checkData} from '../utilities/index';

const ERRORS = {};

const INITIAL_STATE = {
  requests: [],
  myrequests: [],
  blacklist: [],
  options: {
    request_category: null,
    request_mood: null,
    campus: null,
  },
  next_url: null,
  errors: ERRORS,
  //creating: false,
  deleting: false,
  blacklisting: false,
  fetching: false,
  myreqfetching: false,
  loadingmore: false,
};

const arrangeRequests = (data: Array) => {
  if (!Array.isArray(data) || data.length < 1) {
    return data;
  }
  data = [...data];
  return data.sort((item1, item2) => item2.created_at - item1.created_at);
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
    case 'meetupmainfetching':
      return {...state, fetching: value};
      break;
    case 'meetupmainloadingmore':
      return {...state, loadingmore: value};
      break;
    case 'meetupmaincreating':
      return {...state, creating: value};
      break;
    case 'meetupmaindeleting':
      return {...state, deleting: value};
      break;
    case 'meetupmainblacklisting':
      return {...state, blacklisting: value};
      break;
    case 'meetupmainmyreqfetching':
      return {...state, myreqfetching: value};
      break;
    default:
      return state;
      break;
  }
};

const MeetupMainReducer = (state = INITIAL_STATE, action) => {
  let reducerdata = null;
  switch (action.type) {
    case ADD_MEETUPMAIN_REQUESTS:
      return {
        ...state,
        requests: arrangeRequests([...state.requests, ...action.payload]),
      };
      break;
    case REMOVE_MEETUPMAIN_REQUESTS:
      reducerdata = state.requests.filter((item) => {
        return item.request_id != action.payload;
      });
      return {...state, requests: arrangeRequests(reducerdata)};
      break;
    case REMOVE_MEETUPMAIN_REQUESTS_ARR:
      reducerdata = state.requests.filter((item) => {
        return !action.payload.includes(item.request_id);
      });
      return {...state, requests: arrangeRequests(reducerdata)};
      break;
    case UPDATE_MEETUPMAIN_REQUEST:
      let updatedstate = state.requests.map((item) => {
        return item.request_id == action.payload.request_id
          ? {...item, ...action.payload}
          : item;
      });
      updatedstate.find(
        (item) => item.request_id == action.payload.request_id,
      ) == undefined && updatedstate.push(action.payload);
      return {...state, requests: arrangeRequests(updatedstate)};
      break;
    case SET_MEETUPMAIN_ERRORS:
      return {...state, errors: {...state.errors, ...action.payload}};
      break;
    case ADD_MEETUPMAIN_MY_REQUESTS:
      return {
        ...state,
        myrequests: arrangeRequests([...state.myrequests, ...action.payload]),
      };
      break;
    case REMOVE_MEETUPMAIN_MY_REQUESTS:
      reducerdata = state.myrequests.filter((item) => {
        return item.request_id != action.payload;
      });
      return {...state, myrequests: arrangeRequests(reducerdata)};
      break;
    case REMOVE_MEETUPMAIN_MY_REQUESTS_ARR:
      reducerdata = state.myrequests.filter((item) => {
        return !action.payload.includes(item.request_id);
      });
      return {...state, myrequests: arrangeRequests(reducerdata)};
      break;
    case REMOVE_PROFILE_MEETUPMAIN:
      reducerdata = state.requests.filter((item) => {
        return item.requester_id != action.payload;
      });
      return {...state, requests: arrangeRequests(reducerdata)};
      break;
    case UPDATE_MEETUPMAIN_MY_REQUESTS:
      reducerdata = state.myrequests.map((item) => {
        return item.request_id == action.payload.request_id
          ? {...item, ...action.payload}
          : item;
      });
      reducerdata.find(
        (item) => item.request_id == action.payload.request_id,
      ) == undefined && reducerdata.push(action.payload);
      return {...state, myrequests: arrangeRequests(reducerdata)};
      break;
    case SET_MEETUPMAIN:
      return {...state, ...action.payload};
      break;
    case SET_MEETUPMAIN_URL:
      return {...state, next_url: action.payload};
      break;
    case PROCESSING:
      return handleProcessing(action.payload.key, action.payload.value, state);
    case RESET:
      return action.payload.key == 'meetupmain' ? INITIAL_STATE : state;
      break;
    default:
      return state;
      break;
  }
};

export default MeetupMainReducer;
