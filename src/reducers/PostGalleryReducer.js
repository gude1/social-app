import {
  PROCESSING,
  RESET,
  UPDATE_POSTGALLERY_ARCHIVE,
  UPDATE_POSTGALLERY_BLACKLIST,
  UPDATE_POSTGALLERY_OTHERS,
} from '../actions/types';
import {checkData, isEmpty} from '../utilities';

const INITIAL_STATE = {
  archived: [],
  blacklist: [],
  others: [],
  loading: false,
  loadingmore: false,
};

const arrangeArchive = (data = []) => {
  if (!Array.isArray(data) || data.length < 1) {
    return data;
  }
  return [...data].sort(
    (item1, item2) => item2?.archived_at - item1?.archived_at,
  );
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
    default:
      return state;
      break;
  }
};

const PostGalleryReducer = (state = INITIAL_STATE, action) => {
  let reducerdata = [];
  let exclude_ids = [];
  let to_add = [];
  switch (action.type) {
    case UPDATE_POSTGALLERY_ARCHIVE:
      exclude_ids = [];
      reducerdata = state.archived.map(postitem => {
        let found = action.payload.find(
          newpostitem => newpostitem.postid == postitem.postid,
        );
        if (found) {
          exclude_ids.push(found.postid);
          return {...postitem, ...found};
        } else return postitem;
      });
      to_add = action.payload.filter(
        postitem => !exclude_ids.includes(postitem.postid),
      );
      reducerdata = [...reducerdata, ...to_add];
      return {...state, archived: arrangeArchive(reducerdata)};
      break;
    case UPDATE_POSTGALLERY_BLACKLIST:
      exclude_ids = [];
      reducerdata = state.blacklist.map(postitem => {
        let found = action.payload.find(
          newpostitem => newpostitem.postid == postitem.postid,
        );
        if (found) {
          exclude_ids.push(found.postid);
          return {...postitem, ...found};
        } else return postitem;
      });
      to_add = action.payload.filter(
        postitem => !exclude_ids.includes(postitem.postid),
      );
      reducerdata = [...reducerdata, ...to_add];
      return {...state, blacklist: reducerdata};
      break;
    case UPDATE_POSTGALLERY_OTHERS:
      exclude_ids = [];
      reducerdata = state.others.map(postitem => {
        let found = action.payload.find(
          newpostitem => newpostitem.postid == postitem.postid,
        );
        if (found) {
          exclude_ids.push(found.postid);
          return {...postitem, ...found};
        } else return postitem;
      });
      to_add = action.payload.filter(
        postitem => !exclude_ids.includes(postitem.postid),
      );
      reducerdata = [...reducerdata, ...to_add];
      return {...state, others: reducerdata};
      break;
    case PROCESSING:
      return handleProcessing(action.payload.key, action.payload.value, state);
      break;
    case RESET:
      return action.payload.key == 'postgallery' ? INITIAL_STATE : state;
      break;
    default:
      return INITIAL_STATE;
      break;
  }
};

export default PostGalleryReducer;
