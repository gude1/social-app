import {
  ADD_TIMELINE_POST,
  UPDATE_TIMELINE_POST,
  RESET,
  DELETE_TIMELINE_POST,
  UPDATE_TIMELINE_POST_PROFILE_CHANGES,
  SET_TIMELINE_POST_PROFILE_CHANGES,
  SET_TIMELINE_POST_LINKS,
  REMOVE_PROFILE_TIMELINE_POST,
  PREPEND_TIMELINE_POST,
  SET_TIMELINE_POST,
} from '../actions/types';
import {checkData} from '../utilities/index';

const arrayReduce = (data = []) => {
  if (!Array.isArray(data) || data.length < 1) {
    return data;
  }
  if (data.length > 10) {
    for (i = data.length; i > 10; i--) {
      data.pop();
    }
    return data;
  }
  return data;
};

const arrangePost = (data: Array) => {
  if (!Array.isArray(data) || data.length < 1) {
    return data;
  }
  data = [...data];
  return data.sort((item1, item2) => item2.created_at - item1.created_at);
};

//to handle deleteing/removing a post
const handleDelete = (state, data) => {
  if (checkData(state) != true || checkData(data) != true) {
    return state;
  }
  if (Array.isArray(data)) {
    let updatestate = state.timelineposts.filter(
      (item) => !data.includes(item.postid),
    );
    return {...state, timelineposts: updatestate};
  } else {
    let updatestate = state.timelineposts.filter((item) => item.postid != data);
    return {...state, timelineposts: updatestate};
  }
};

const INITIAL_STATE = {
  timelineposts: [],
  links: [],
  profileschanges: [],
};

const TimelinePostReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TIMELINE_POST:
      let addedstate = {
        ...state,
        timelineposts: [...state.timelineposts, ...action.payload],
      };
      return {
        ...addedstate,
        timelineposts: arrayReduce(arrangePost(addedstate.timelineposts)),
      };
      break;
    case SET_TIMELINE_POST:
      return {
        ...state,
        timelineposts: arrayReduce(arrangePost(action.payload)),
      };
      break;
    case PREPEND_TIMELINE_POST:
      let addedstate2 = {
        ...state,
        timelineposts: [...action.payload, ...state.timelineposts],
      };
      return {
        ...addedstate2,
        timelineposts: arrayReduce(arrangePost(addedstate2.timelineposts)),
      };
      break;
    case UPDATE_TIMELINE_POST:
      let updatedstate = state.timelineposts.map((item) => {
        return item.postid == action.payload.postid
          ? {...item, ...action.payload}
          : item;
      });
      return {...state, timelineposts: arrangePost(updatedstate)};
      break;
    case REMOVE_PROFILE_TIMELINE_POST:
      let newstate = state.timelineposts.filter(
        (item) => item.profile.profile_id != action.payload,
      );
      return {...state, timelineposts: arrangePost(newstate)};
      break;
    case SET_TIMELINE_POST_LINKS:
      return {...state, links: [...action.payload]};
      break;
    case SET_TIMELINE_POST_PROFILE_CHANGES:
      return {...state, profileschanges: action.payload};
      break;
    case UPDATE_TIMELINE_POST_PROFILE_CHANGES:
      let updatedprofilestate = state.profileschanges.map((item) => {
        return item.profileid == action.payload.profileid
          ? {...item, ...action.payload}
          : item;
      });
      updatedprofilestate.find(
        (item) => item.profileid == action.payload.profileid,
      ) == undefined
        ? updatedprofilestate.push({...action.payload})
        : null;
      return {...state, profileschanges: updatedprofilestate};
      break;
    case RESET:
      if (action.payload.key == 'timelinepost') {
        return INITIAL_STATE;
      }
      return state;
      break;
    case DELETE_TIMELINE_POST:
      return handleDelete(state, action.payload);
      break;
    default:
      return state;
      break;
  }
};

export default TimelinePostReducer;
