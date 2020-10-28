import {
    ADD_TIMELINE_POST_FORM,
    UPDATE_TIMELINE_POST_FORM,
    ADD_TIMELINE_POST,
    SET_TIMELINE_POST_FORM_LINKS,
    TIMELINE_POST_FORM_REFRESH,
    DELETE_TIMELINE_POST_FORM,
    REMOVE_PROFILE_TIMELINE_POST_FORM,
    SET_TIMELINE_POST_FORM_PROFILE_CHANGES,
    UPDATE_TIMELINE_POST_FORM_PROFILE_CHANGES,
    PREPEND_TIMELINE_POST_FORM,
    PROCESSING,
    RESET,
    SET_TIMELINE_POST_FORM,
} from '../actions/types';
import { checkData } from '../utilities/index';

const INITIAL_STATE = {
    timelineposts: [],
    profileschanges: [],
    loadingmore: false,
    refreshing: false,
    processing: false,
    fetching: false,
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
        return state;
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
        case 'processfetchtimelinepostform':
            return { ...state, fetching: value };
            break;
        default:
            return state;
            break;
    }
};

const timeSort = (data) => {
    if (!Array.isArray(data)) {
        return data;
    }
    return data.sort((item1, item2) => item2.id - item1.id);
};

const TimelinePostFormReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_TIMELINE_POST_FORM:
            return { ...state, timelineposts: [...state.timelineposts, ...action.payload] };
            break;
        case SET_TIMELINE_POST_FORM:
            return { ...state, timelineposts: [...action.payload] };
            break;
        case PREPEND_TIMELINE_POST_FORM:
            return { ...state, timelineposts: [...action.payload, ...state.timelineposts] };
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
        case SET_TIMELINE_POST_FORM_PROFILE_CHANGES:
            return { ...state, profileschanges: action.payload };
            break;
        case UPDATE_TIMELINE_POST_FORM_PROFILE_CHANGES:
            let updatedprofilestate = state.profileschanges.map(item => {
                return item.profileid == action.payload.profileid ? { ...item, ...action.payload } : item;
            });
            updatedprofilestate.find(item => item.profileid == action.payload.profileid) == undefined ?
                updatedprofilestate.push({ ...action.payload }) : null;
            return { ...state, profileschanges: updatedprofilestate };
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