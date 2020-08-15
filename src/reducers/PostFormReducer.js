import {
    UPDATE_POST_FORM_IMAGE_CHANGED,
    UPDATE_POST_FORM_TEXT_CHANGED,
    PROCESSING,
    RESET
} from '../actions/types';
import { checkData } from '../utilities'
const INITIAL_STATE = {
    isprocessing: false,
    toposttext: '',
    topostimages: [],
};

const PostFormReducer = (state = INITIAL_STATE, action) => {
    if (checkData(action.payload)) {
        var { key, value } = action.payload;
    }
    switch (action.type) {
        case UPDATE_POST_FORM_TEXT_CHANGED:
            return { ...state, toposttext: action.payload };
            break;
        case UPDATE_POST_FORM_IMAGE_CHANGED:
            return { ...state, topostimages: [...action.payload] };
            break;
        case PROCESSING:
            return key == 'POSTFORM' ? { ...state, isprocessing: value }
                : state;
            break;
        case RESET:
            return key == 'POSTFORM' ? INITIAL_STATE : state;
            break;
        default:
            return state;
            break;
    }

};

export default PostFormReducer;