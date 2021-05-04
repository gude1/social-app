import { RESET, ADD_MEETUPMAIN_REQUESTS, UPDATE_MEETUPMAIN_REQUEST, PROCESSING, SET_MEETUPMAIN_URL, SET_MEETUPMAIN, SET_MEETUPMAIN_ERRORS, ADD_MEETUPMAIN_MY_REQUESTS } from "../actions/types";
import { checkData } from "../utilities/index";


const ERRORS = {
};

const INITIAL_STATE = {
    requests: [],
    myrequests: [],
    options: {
        campus: null,
        mood: null,
    },
    next_url: null,
    errors: ERRORS,
    creating: false,
    deleting: false,
    blacklisting: false,
    fetching: false,
    loadingmore: false,
};

const arrangeRequests = (data: Array) => {
    if (!Array.isArray(data) || data.length < 1) {
        return data;
    }
    data = [...data];
    return data.sort((item1, item2) => item2.id - item1.id);
};

const handleProcessing = (key, value, state) => {
    if (checkData(key) != true || checkData(state) != true || checkData(value) != true) {
        return state;
    }
    switch (key) {
        case 'meetupmainfetching':
            return { ...state, fetching: value };
            break;
        case 'meetupmainloadingmore':
            return { ...state, loadingmore: value };
            break;
        case 'meetupmaincreating':
            return { ...state, loadingmore: value };
            break;
        case 'meetupmaindeleting':
            return { ...state, deleting: value };
            break;
        case 'meetupmainblacklisting':
            return { ...state, blacklisting: value };
            break;
        default:
            return state;
            break;
    }
};


const MeetupMainReducer = (state = INITIAL_STATE, action) => {
    let reducerdata = null;
    switch (action.type) {
        case ADD_MEETUPMAIN_REQUESTS:
            return { ...state, requests: arrangeRequests([...state.requests, ...action.payload]) };
            break;
        case UPDATE_MEETUPMAIN_REQUEST:
            let updatedstate = state.requests.map(item => {
                item.request_id == action.payload.request_id ? { ...item, ...action.payload } : item;
            });
            updatedstate.find(item => item.request_id == action.payload.request_id) == undefined &&
                updatedstate.push(action.payload);
            return { ...state, requests: arrangeRequests(updatedstate) };
            break;
        case SET_MEETUPMAIN_ERRORS:
            return { ...state, errors: { ...state.errors, ...action.payload } };
            break;
        case ADD_MEETUPMAIN_MY_REQUESTS:
            return { ...state, myrequests: [...state.myrequests, ...action.payload] };
            break;
        case SET_MEETUPMAIN:
            return { ...state, ...action.payload };
            break;
        case SET_MEETUPMAIN_URL:
            return { ...state, next_url: action.payload };
            break;
        case PROCESSING:
            return handleProcessing(
                action.payload.key,
                action.payload.value,
                state
            );
        case RESET:
            return action.payload.key == "meetupmain" ? INITIAL_STATE : state;
            break;
        default:
            return state;
            break;
    }
};

export default MeetupMainReducer;