import {
  SET_GALLERY_PHOTOS,
  SET_SELECTED_LIST,
  RESET,
  SET_ERRORS,
  SET_GALLERY_PHOTOS_NUM,
  UNSET_SELECTED_LIST,
} from '../actions/types';

const INITIAL_STATE = {
  photos: [],
  error: '',
  numphotos: 0,
};

const PhotoGalleryReducer = (state = INITIAL_STATE, action) => {
  if (action.payload != undefined) {
    var {key, value} = action.payload;
    //console.warn(value);
    //alert(key);
  }
  switch (action.type) {
    case SET_GALLERY_PHOTOS:
      return {...state, photos: action.payload};
      break;
    case SET_SELECTED_LIST:
      return {...state, selected: action.payload};
      break;
    case UNSET_SELECTED_LIST:
      return {...state, selected: [...action.payload]};
      break;
    case SET_GALLERY_PHOTOS_NUM:
      return {...state, numphotos: action.payload};
      break;
    case SET_ERRORS:
      return key == 'photogallery' ? {...state, error: value} : state;
      break;
    case RESET:
      return key == 'photogallery' ? INITIAL_STATE : state;
      break;
    default:
      return state;
      break;
  }
};

export default PhotoGalleryReducer;
