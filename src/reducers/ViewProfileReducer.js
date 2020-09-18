import {
    RESET,
    PROCESSING,
    ADD_VIEWPROFILEFORM_POSTS,
    UPDATE_VIEWPROFILEFORM_POSTS,
    SET_VIEWPROFILEFORM
} from '../actions/types';
import { checkData } from '../utilities/index';

const INITIAL_STATE = {
    viewprofile: {},
    viewprofileposts: [],
    viewprofilepostsnexturl: null,
    viewpostloading: false,
    viewpostloadingmore: false,
};

//to determine the type of processing request
const handleProcessing = (key, value, state) => {
    if (checkData(key) != true || checkData(state) != true || checkData(value) != true) {
        return;
    }
    switch (key) {
        case 'viewprofileformpostloading':
            return { ...state, viewpostloading: value };
            break;
        case 'viewprofileformpostnexturl':
            return { ...state, viewprofilepostsnexturl: value };
            break;
        default:
            return state;
            break;
    }
};


export const ViewProfileReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_VIEWPROFILEFORM_POSTS:
            return { ...state, viewprofileposts: [...state.viewprofileposts, ...action.payload] };
            break;
        case PROCESSING:
            return handleProcessing(action.payload.key,
                action.payload.value, state);
            break;
        case RESET:
            if (action.payload.key == 'viewprofileform') {
                return INITIAL_STATE;
            }
            return state;
            break;
        default:
            return state;
            break;
    }
};

export default ViewProfileReducer;