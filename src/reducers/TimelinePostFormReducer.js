import {
    ADD_TIMELINE_POST_FORM,
    UPDATE_TIMELINE_POST_FORM,
    ADD_TIMELINE_POST,
    SET_TIMELINE_POST_FORM_LINKS,
    TIMELINE_POST_FORM_REFRESH,
    DELETE_TIMELINE_POST_FORM,
    REMOVE_PROFILE_TIMELINE_POST_FORM,
    PROCESSING,
    RESET,
} from '../actions/types';
import { checkData } from '../utilities/index';

const INITIAL_STATE = {
    timelineposts: [],
    loadingmore: false,
    refreshing: false,
    processing: false,
    deleting: false,
    blacklisting: false,
    muting: false,
    archiving: false,
    links: []
};

//to handle deleteing/removing a post
const handleDelete = (state, data) => {
    if (checkData(state) != true || checkData(data) != true) {
        return state;
    }
    if (Array.isArray(data)) {
        let updatestate = state.timelineposts.filter(item => !data.includes(item.postid));
        return { ...state, timelineposts: updatestate };
    } else {
        let updatestate = state.timelineposts.filter(item => item.postid != data)
        return { ...state, timelineposts: updatestate };
    }
};

//to determine the type of processing request
const handleProcessing = (key, value, state) => {
    if (checkData(key) != true || checkData(state) != true || checkData(value) != true) {
        return;
    }
    switch (key) {
        case 'timelinepostform':
            return { ...state, processing: value };
            break;
        case 'processdeletetimelinepostform':
            return { ...state, deleting: value };
            break;
        case 'processarchivetimelinepostform':
            return { ...state, archiving: value };
            break;
        case 'processblacklisttimelinepostform':
            return { ...state, blacklisting: value };
            break;
        case 'processmutetimelinepostform':
            return { ...state, muting: value };
            break;
        case 'processloadmoretimelinepostform':
            return { ...state, loadingmore: value };
            break;
        default:
            return state;
            break;
    }


};

const TimelinePostFormReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_TIMELINE_POST_FORM:
            return { ...state, timelineposts: [...state.timelineposts, ...action.payload] };
            break;
        case UPDATE_TIMELINE_POST_FORM:
            let updatedstate = state.timelineposts.map(item => {
                return item.postid == action.payload.postid ? { ...item, ...action.payload } : item;
            });
            updatedstate.find(item => item.postid == action.payload.postid) == undefined ?
                updatedstate.push({ ...action.payload }) : null;
            return { ...state, timelineposts: updatedstate };
            break;
        case SET_TIMELINE_POST_FORM_LINKS:
            return { ...state, links: [...action.payload] };
            break;
        case PROCESSING:
            return handleProcessing(action.payload.key,
                action.payload.value, state);
            break;
        case TIMELINE_POST_FORM_REFRESH:
            return { ...state, refreshing: action.payload };
            break;
        case DELETE_TIMELINE_POST_FORM:
            return handleDelete(state, action.payload);
            break;
        case REMOVE_PROFILE_TIMELINE_POST_FORM:
            let newstate = state.timelineposts.filter(item => item.profile.profile_id != action.payload);
            return { ...state, timelineposts: newstate };
            break;
        case RESET:
            if (action.payload.key == 'timelinepostform') {
                return INITIAL_STATE;
            }
            return state;
            break;

        default:
            return state;
            break;
    }
};

export default TimelinePostFormReducer;