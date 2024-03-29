import {
  ADD_POST_COMMENT_REPLY_FORM,
  PREPEND_POST_COMMENT_REPLY_FORM,
  POST_COMMENT_REPLY_FORM_DELETE,
  POST_COMMENT_REPLY_FORM_REFRESH,
  REMOVE_POST_COMMENT_REPLY_FORM,
  UPDATE_POST_COMMENT_REPLY_FORM,
  UPDATE_POST_COMMENT_REPLY_FORM_PROFILE_CHANGES,
  SET_POST_COMMENT_REPLY_FORM_LINK,
  PROCESSING,
  RESET,
  SET_POST_COMMENT_REPLY_FORM,
  SET_POST_COMMENT_REPLY_FORM_OWNER_COMMENT,
  UPDATE_POST_COMMENT_REPLY_FORM_OWNER_COMMENT,
  UPDATE_PENDING_POST_COMMENT_REPLY_FORM,
  REMOVE_PENDING_POST_COMMENT_REPLY_FORM,
} from '../actions/types';
import {checkData} from '../utilities/index';
import AsyncStorage from '@react-native-community/async-storage';

const INITIAL_STATE = {
  pendingpostcommentreplies: [],
  postcommentreplies: [],
  profileschanges: [],
  ownercomment: null,
  fetching: false,
  processing: false,
  hiding: false,
  muting: false,
  deleting: false,
  loadmore: false,
  refreshing: false,
  nexturl: null,
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
    case 'postcommentreplyformfetching':
      return {...state, fetching: value};
      break;
    case 'postcommentreplyformloadmore':
      return {...state, loadmore: value};
      break;
    case 'postcommentreplyformdeleting':
      return {...state, deleting: value};
      break;
    case 'postcommentreplyformmuting':
      return {...state, muting: value};
      break;
    case 'postcommentreplyformhiding':
      return {...state, hiding: value};
      break;
    default:
      return state;
      break;
  }
};

const arrangePostCommentReply = (data = []) => {
  if (!Array.isArray(data) || data.length < 1) {
    return data;
  }
  data = [...data];
  return data.sort((item1, item2) => item2.created_at - item1.created_at);
};

let reducerdata = null;

const PostCommentReplyFormReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PROCESSING:
      //return { ...state, fetching: false };
      return handleProcessing(action.payload.key, action.payload.value, state);
      break;
    case SET_POST_COMMENT_REPLY_FORM_OWNER_COMMENT:
      return {...state, ownercomment: action.payload};
      break;
    case UPDATE_PENDING_POST_COMMENT_REPLY_FORM:
      reducerdata = state.pendingpostcommentreplies.map(item => {
        return item.replyid == action.payload.replyid
          ? {...item, ...action.payload}
          : item;
      });
      reducerdata.find(item => item.replyid == action.payload.replyid) ==
        undefined && reducerdata.push({...action.payload});
      return {
        ...state,
        pendingpostcommentreplies: arrangePostCommentReply(reducerdata),
      };
      break;
    case REMOVE_PENDING_POST_COMMENT_REPLY_FORM:
      reducerdata = state.pendingpostcommentreplies.filter(item => {
        return item.replyid != action.payload;
      });
      return {
        ...state,
        pendingpostcommentreplies: arrangePostCommentReply(reducerdata),
      };
      break;
    case UPDATE_POST_COMMENT_REPLY_FORM_OWNER_COMMENT:
      return {
        ...state,
        ownercomment: {...state.ownercomment, ...action.payload},
      };
      break;
    case ADD_POST_COMMENT_REPLY_FORM:
      return {
        ...state,
        postcommentreplies: arrangePostCommentReply([
          ...state.postcommentreplies,
          ...action.payload,
        ]),
      };
      break;
    case SET_POST_COMMENT_REPLY_FORM:
      return {
        ...state,
        postcommentreplies: arrangePostCommentReply(action.payload),
      };
      break;
    case PREPEND_POST_COMMENT_REPLY_FORM:
      return {
        ...state,
        postcommentreplies: arrangePostCommentReply([
          ...action.payload,
          ...state.postcommentreplies,
        ]),
      };
      break;
    case UPDATE_POST_COMMENT_REPLY_FORM:
      let updatedstate = state.postcommentreplies.map(item => {
        return item.replyid == action.payload.replyid
          ? {...item, ...action.payload}
          : item;
      });
      updatedstate.find(item => item.replyid == action.payload.replyid) ==
      undefined
        ? updatedstate.push({...action.payload})
        : null;
      return {
        ...state,
        postcommentreplies: arrangePostCommentReply(updatedstate),
      };
      break;
    case SET_POST_COMMENT_REPLY_FORM_LINK:
      return {...state, nexturl: action.payload};
      break;
    case RESET:
      if (action.payload.key == 'postcommentreplyform') {
        return INITIAL_STATE;
      } else if (action.payload.key == 'postcommentreplies') {
        return {
          ...INITIAL_STATE,
          pendingpostcommentreplies: state.pendingpostcommentreplies,
        };
      } else {
        return state;
      }
      break;
    case POST_COMMENT_REPLY_FORM_REFRESH:
      return {...state, refreshing: action.payload};
      break;
    case UPDATE_POST_COMMENT_REPLY_FORM_PROFILE_CHANGES:
      let updatedprofilestate = state.profileschanges.map(item => {
        return item.profileid == action.payload.profileid
          ? {...item, ...action.payload}
          : item;
      });
      updatedprofilestate.find(
        item => item.profileid == action.payload.profileid,
      ) == undefined
        ? updatedprofilestate.push({...action.payload})
        : null;
      return {...state, profileschanges: updatedprofilestate};
      break;
    case REMOVE_POST_COMMENT_REPLY_FORM:
      let newstate = state.postcommentreplies.map(item => {
        if (item.replyid == action.payload) {
          return {...item, deleted: true};
        }
        return item;
      });
      return {...state, postcommentreplies: arrangePostCommentReply(newstate)};
      break;
    default:
      return state;
      break;
  }
};

export const PostCommentReplyFormListConfig = {
  key: 'pendingreplies',
  storage: AsyncStorage,
  whitelist: ['pendingpostcommentreplies'],
};

export default PostCommentReplyFormReducer;
