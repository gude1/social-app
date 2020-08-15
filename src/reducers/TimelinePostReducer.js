import {
    ADD_TIMELINE_POST,
    UPDATE_TIMELINE_POST,
    RESET,
    DELETE_TIMELINE_POST,
    SET_TIMELINE_POST_LINKS,
    REMOVE_PROFILE_TIMELINE_POST
} from '../actions/types';
import { checkData } from '../utilities/index';

const arrayReduce = (data = []) => {
    if (!Array.isArray(data) || data.length < 1) {
        return data;
    }
    if (data.length > 10) {
        for (i = data.length; i > 10; i--) {
            data.pop();
        }
        return data;
    }
    return data;
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

const INITIAL_STATE = {
    timelineposts: [],
    links: []
}


const TimelinePostReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_TIMELINE_POST:
            let addedstate = { ...state, timelineposts: [...state.timelineposts, ...action.payload] };
            return { ...addedstate, timelineposts: arrayReduce(addedstate.timelineposts) };
            break;
        case UPDATE_TIMELINE_POST:
            let updatedstate = state.timelineposts.map(item => {
                return item.postid == action.payload.postid ? { ...item, ...action.payload } : item;
            });
            return { ...state, timelineposts: updatedstate };
            break;
        case REMOVE_PROFILE_TIMELINE_POST:
            let newstate = state.timelineposts.filter(item => item.profile.profile_id != action.payload);
            return { ...state, timelineposts: newstate };
            break;
        case SET_TIMELINE_POST_LINKS:
            return { ...state, links: [...action.payload] };
            break;
        case RESET:
            if (action.payload.key == 'timelinepost') {
                return INITIAL_STATE;
            }
            return state;
            break;
        case DELETE_TIMELINE_POST:
            return handleDelete(state, action.payload);
            break;
        default:
            return state;
            break;
    }
};

export default TimelinePostReducer;