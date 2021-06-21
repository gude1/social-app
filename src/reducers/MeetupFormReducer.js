import { RESET, UPDATE_MEETUP_FORM, PROCESSING, UPDATE_MEETUP_FORM_ERRORS } from "../actions/types";
import { checkData } from "../utilities/index";


const INITIAL_STATE = {
    processing: false,
    accepted: false,
    meetup_name: null,
    avatar_name: null,
    meetup_avatar: null,
    errors: {
        meetup_name_err: null,
        avatar_name_err: null,
        meetup_avatar_err: null,
    }
};

const handleProcessing = (key, value, state) => {
    if (checkData(key) != true || checkData(state) != true || checkData(value) != true) {
        return state;
    }
    switch (key) {
        case 'meetupformprocessing':
            return { ...state, processing: value };
            break;
        default:
            return state;
            break;
    }
};

const MeetupFormReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_MEETUP_FORM:
            return { ...state, ...action.payload };
            break;
        case UPDATE_MEETUP_FORM_ERRORS:
            return { ...state, errors: { ...state.errors, ...action.payload } };
            break;
        case PROCESSING:
            return handleProcessing(action.payload.key,
                action.payload.value,
                state
            );
            break;
        case RESET:
            return action.payload.key == "meetupform" ? INITIAL_STATE : state;
            break;
        default:
            return state;
            break;
    }
};

export default MeetupFormReducer;