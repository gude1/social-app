import { RESET, ADD_MEETUPMAIN_REQUESTS, UPDATE_MEETUPMAIN_REQUEST, PROCESSING } from "../actions/types";

const INITIAL_STATE = {
    requests: [],
    fetching: false,
    loadingmore: false,
};

const arrangeRequests = (data: Array) => {
    if (!Array.isArray(data) || data.length < 1) {
        return data;
    }
    data = [...data];
    return data.sort((item1, item2) => item1.id - item2.id);
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
        case PROCESSING:
            return handleProcessing(action.payload.key,
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