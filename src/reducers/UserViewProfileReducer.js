import {
    RESET,
    PROCESSING,
    ADD_USER_VIEWPROFILEFORM_POSTS,
    UPDATE_USER_VIEWPROFILEFORM_POSTS,
    SET_USER_VIEWPROFILEFORM_PROFILE_STATUS,
    SET_USER_VIEWPROFILEFORM
} from '../actions/types';
import { checkData } from '../utilities/index';


const INITIAL_STATE = {
    viewprofile: {},
    viewprofileposts: [],
    viewprofilepostsnexturl: null,
    viewpostloading: false,
    viewpostloadingmore: false,
}



//to determine the type of processing request if user profile
const handleProcessing = (key, value, state) => {
    if (checkData(key) != true || checkData(state) != true || checkData(value) != true) {
        return state;
    }
    switch (key) {
        case 'userviewprofileformpostloading':
            return { ...state, viewpostloading: value };
            break;
        case 'userviewprofileformpostnexturl':
            return { ...state, viewprofilepostsnexturl: value };
            break;
        default:
            return state;
            break;
    }
};



//original reducer
const UserViewProfileReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_USER_VIEWPROFILEFORM_POSTS:
            return { ...state, viewprofileposts: [...state.viewprofileposts, ...action.payload] };
            break;
        case PROCESSING:
            return handleProcessing(action.payload.key,
                action.payload.value, state);
            break;
        case RESET:
            if (action.payload.key == 'userviewprofileform') {
                return INITIAL_STATE;
            }
            return state;
            break;
        default:
            return state;
            break;
    };
};

export default UserViewProfileReducer;