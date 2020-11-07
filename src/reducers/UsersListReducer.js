import {
    SET_PROFILES_LIST,
    SET_PROFILES_LIST_NEXT_URL,
    ADD_PROFILES_LIST,
    PREPEND_PROFILES_LIST,
    SET_SEARCH_LIST,
    SET_SEARCH_LIST_NEXT_URL,
    ADD_SEARCH_LIST,
    PREPEND_SEARCH_LIST,
    RESET,
    PROCESSING,
    SET_PROFILES_LIST_RESET,
    SET_SEARCH_LIST_RESET,
    UPDATE_PROFILES_LIST,
    UPDATE_SEARCH_LIST
} from '../actions/types';

import { checkData } from '../utilities/index';

let updatedprofilestate = [];
const PROFILE_LIST = {
    profileslist: [],
    profileslistnexturl: null,
    profileslistfetching: false,
    profileslistloadingmore: false,
};
const SEARCH_LIST = {
    searchlist: [],
    searchlistnexturl: null,
    searchlistfetching: false,
    searchlistloadingmore: false,
    searchword: null,
};

const INITIAL_STATE = {
    ...PROFILE_LIST,
    ...SEARCH_LIST
};

const handleProcessing = (key, value, state) => {
    if (checkData(key) != true || checkData(state) != true || checkData(value) != true) {
        return state;
    }
    switch (key) {
        case 'searchlistfetching':
            return { ...state, searchlistfetching: value };
            break;
        case 'searchlistloadingmore':
            return { ...state, searchlistloadingmore: value };
            break;
        case 'profileslistfetching':
            return { ...state, profileslistfetching: value };
            break;
        case 'profileslistloadingmore':
            return { ...state, profileslistloadingmore: value };
            break;
        case 'setsearchlistkeyword':
            return { ...state, searchword: value };
            break;
        default:
            return state;
            break;
    }
};

const UsersListReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_PROFILES_LIST:
            return { ...state, profileslist: [...state.profileslist, ...action.payload] };
            break;
        case UPDATE_PROFILES_LIST:
            updatedprofilestate = state.profileslist.map(item => {
                return item.profileid == action.payload.profileid ? { ...item, ...action.payload } : item;
            });
            return { ...state, profileslist: updatedprofilestate };
            break;
        case UPDATE_SEARCH_LIST:
            updatedprofilestate = state.searchlist.map(item => {
                return item.profileid == action.payload.profileid ? { ...item, ...action.payload } : item;
            });
            return { ...state, searchlist: updatedprofilestate };
            break;
        case PREPEND_PROFILES_LIST:
            return { ...state, profileslist: [...action.payload, ...state.profileslist] };
            break;
        case SET_PROFILES_LIST_NEXT_URL:
            return { ...state, profileslistnexturl: action.payload };
            break;
        case SET_PROFILES_LIST:
            return { ...state, profileslist: action.payload };
            break;
        case ADD_SEARCH_LIST:
            return { ...state, searchlist: [...state.searchlist, ...action.payload] };
            break;
        case PREPEND_SEARCH_LIST:
            return { ...state, searchlist: [...action.payload, ...state.searchlist] };
            break;
        case SET_SEARCH_LIST_NEXT_URL:
            return { ...state, searchlistnexturl: action.payload };
            break;
        case SET_SEARCH_LIST:
            return { ...state, searchlist: action.payload };
            break;
        case PROCESSING:
            return handleProcessing(action.payload.key,
                action.payload.value,
                state
            );
            break;
        case SET_PROFILES_LIST_RESET:
            return { ...state, ...PROFILE_LIST };
            break;
        case SET_SEARCH_LIST_RESET:
            return { ...state, ...SEARCH_LIST };
            break;
        case RESET:
            return action.payload.key == "userlistreducer" ? INITIAL_STATE : state;
            break;
        default:
            return state;
            break;
    }
};

export default UsersListReducer;