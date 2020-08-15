import {
    NEW_PROFILE_PIC,
    SET_PROFILE_DATA,
} from '../actions/types';
const INITIAL_STATE = {
    bio: null,
    campus: null,
    avatarremote: null,
    avatarlocal: null,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case NEW_PROFILE_PIC:
            return { ...state, avatar: action.payload };
        case SET_PROFILE_DATA:
            return { ...state, ...action.payload };
        default:
            return state;
            break;
    };
};