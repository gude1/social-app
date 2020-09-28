import {
    RESET,
    PROCESSING,
    ADD_OTHERS_VIEWPROFILEFORM_POSTS,
    UPDATE_OTHERS_VIEWPROFILEFORM_POSTS,
    SET_OTHERS_VIEWPROFILEFORM_PROFILE_STATUS,
    SET_OTHERS_VIEWPROFILEFORM,
    SET_OTHERS_VIEWPROFILEFORM_LINK,

} from '../actions/types';
import { checkData } from '../utilities/index';


const INITIAL_STATE = {
    viewprofile: {},
    viewprofileposts: [],
    viewprofilepostsnexturl: null,
    following: false,
    blocking: false,
    muting: false,
    viewpostloading: false,
    viewpostloadingmore: false,
};



//to determine the type of processing request if user profile
const handleProcessing = (key, value, state) => {
    if (checkData(key) != true || checkData(state) != true || checkData(value) != true) {
        return state;
    }
    switch (key) {
        case 'othersviewprofileformpostloading':
            return { ...state, viewpostloading: value };
            break;
        case 'othersviewprofileformpostloadingmore':
            return { ...state, viewpostloadingmore: value };
            break;
        case 'othersviewprofileformblocking':
            return { ...state, blocking: value };
            break;
        case 'othersviewprofileformmuting':
            return { ...state, muting: value };
            break;
        case 'othersviewprofileformfollowing':
            return { ...state, following: value };
            break;
        default:
            return state;
            break;
    }
};



//original reducer
const OthersViewProfileReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_OTHERS_VIEWPROFILEFORM_POSTS:
            return { ...state, viewprofileposts: [...state.viewprofileposts, ...action.payload] };
            break;
        case PROCESSING:
            return handleProcessing(action.payload.key,
                action.payload.value, state);
            break;
        case SET_OTHERS_VIEWPROFILEFORM:
            return { ...state, viewprofile: { ...state.viewprofile, ...action.payload } };
            break;
        case SET_OTHERS_VIEWPROFILEFORM_LINK:
            return { ...state, viewprofilepostsnexturl: action.payload };
            break;
        case RESET:
            if (action.payload.key == 'othersviewprofileform') {
                return INITIAL_STATE;
            }
            return state;
            break;
        default:
            return state;
            break;
    };
};

export default OthersViewProfileReducer;