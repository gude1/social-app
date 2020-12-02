import { UPDATE_POST_SETTINGS, RESET, PROCESSING } from '../actions/types';
import { checkData } from '../utilities/index';

const INITIAL_STATE = {
    processing: false,
    timeline_post_range: null,
};

const handleProcessing = (key, value, state) => {
    if (checkData(key) != true || checkData(state) != true || checkData(value) != true) {
        return state;
    }
    switch (key) {
        case 'postsettingprocess':
            return { ...state, processing: value };
            break;
        default:
            return state;
            break;
    }
};

const PostSettingReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_POST_SETTINGS:
            return { ...state, ...action.payload };
            break;
        case PROCESSING:
            return handleProcessing(action.payload.key,
                action.payload.value,
                state
            );
            break;
        case RESET:
            if (action.payload.key == 'postsetting') {
                return INITIAL_STATE;
            }
            return state;
            break;
        default:
            return state;
            break;
    }
};

export default PostSettingReducer;
