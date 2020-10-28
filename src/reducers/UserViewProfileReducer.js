import {
    RESET,
    PROCESSING,
    ADD_USER_VIEWPROFILEFORM_POSTS,
    UPDATE_USER_VIEWPROFILEFORM_POSTS,
    SET_USER_VIEWPROFILEFORM_PROFILE_STATUS,
    SET_USER_VIEWPROFILEFORM_LINK,
    SET_USER_VIEWPROFILEFORM,
    UPDATE_USER_VIEWPROFILEFORM_POSTS_ARRAY,
    SET_USER_VIEWPROFILEFORM_POSTS
} from '../actions/types';
import { checkData } from '../utilities/index';


const INITIAL_STATE = {
    viewprofile: {},
    viewprofileposts: [],
    viewprofilepostsnexturl: null,
    viewpostloading: false,
    viewpostloadingmore: false,
};

//to determine the type of processing request if user profile
const handleProcessing = (key, value, state) => {
    if (checkData(key) != true || checkData(state) != true || checkData(value) != true) {
        return state;
    }
    switch (key) {
        case 'userviewprofileformpostloading':
            return { ...state, viewpostloading: value };
            break;
        case 'userviewprofileformpostloadingmore':
            return { ...state, viewpostloadingmore: value };
            break;
        default:
            return state;
            break;
    }
};


const handleUpdatePostArray = (prevdata, newdata, type) => {
    if (type == "reset" || (newdata.length > 1 && prevdata.length < 1)) {
        return newdata;
    } else if (prevdata.length > 1 && newdata.length < 1) {
        return prevdata;
    }
    let updateddata = prevdata.viewprofileposts.map(item => {
        let value = newdata.viewprofileposts.find(newitem => newitem.id == item.id);
        return checkData(value) ? { ...item, ...value } : item;
    });
    return updateddata;
};


//original reducer
const UserViewProfileReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_USER_VIEWPROFILEFORM_POSTS:
            return { ...state, viewprofileposts: [...state.viewprofileposts, ...action.payload] };
            break;
        case UPDATE_USER_VIEWPROFILEFORM_POSTS_ARRAY:
            return {
                ...state,
                viewprofileposts:
                    handleUpdatePostArray(
                        state.viewprofileposts,
                        action.payload.data,
                        action.payload.type
                    )
            };
            break;
        case PROCESSING:
            return handleProcessing(action.payload.key,
                action.payload.value, state);
            break;
        case SET_USER_VIEWPROFILEFORM_POSTS:
            return { ...state, viewprofileposts: action.payload };
            break;
        case SET_USER_VIEWPROFILEFORM_LINK:
            return { ...state, viewprofilepostsnexturl: action.payload };
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