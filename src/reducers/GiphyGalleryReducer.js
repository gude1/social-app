import {
  PROCESSING,
  RESET,
  APPEND_GIPHY_GALLERY_RESULTS,
  PREPEND_GIPHY_GALLERY_RESULTS,
  SET_GIPHY_GALLERY,
  UPDATE_GIPHY_GALLERY,
} from '../actions/types';
import {checkData} from '../utilities/index';

export const SEARCH_INITIAL_STATE = {
  results: [],
  percount: 50,
  fetching: false,
  loadingmore: 'done',
  offset: 0,
};

const INITIAL_STATE = {
  results: [],
  percount: 50,
  fetching: false,
  loadingmore: false,
  offset: 0,
  searchobj: SEARCH_INITIAL_STATE,
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
    case 'giphygalleryfetching':
      return {...state, fetching: value};
      break;
    case 'giphygalleryloadingmore':
      return {...state, loadingmore: value};
      break;
    case 'giphysearchgalleryfetching':
      return {...state, searchobj: {...state.searchobj, fetching: value}};
      break;
    case 'giphysearchgalleryloadingmore':
      return {...state, searchobj: {...state.searchobj, loadingmore: value}};
      break;
    default:
      return state;
      break;
  }
};

const GiphyGalleryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case APPEND_GIPHY_GALLERY_RESULTS:
      return {...state, results: [...action.payload, ...state.results]};
      break;
    case PREPEND_GIPHY_GALLERY_RESULTS:
      return {...state, results: [...state.results, ...action.payload]};
      break;
    case SET_GIPHY_GALLERY:
      return {...INITIAL_STATE, ...action.payload};
      break;
    case UPDATE_GIPHY_GALLERY:
      return {...state, ...action.payload};
      break;
    case PROCESSING:
      return handleProcessing(action.payload.key, action.payload.value, state);
      break;
    case RESET:
      return action.payload.key == 'giphygallery' ? INITIAL_STATE : state;
      break;
    default:
      return state;
      break;
  }
};

export default GiphyGalleryReducer;
