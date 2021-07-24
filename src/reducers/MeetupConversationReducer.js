import { RESET, SET_MEETUPCONVERSATION, UPDATE_MEETUPCONVERSATION, REMOVE_MEETUPCONVERSATION } from "../actions/types";
import { checkData, isEmpty } from "../utilities/index";


const INITIAL_STATE = {
    conversation_id: '',
    partnermeetprofile: {},
    conv_list: []
};

const arrangeConvs = (data) => {
    if (!Array.isArray(data) || data.length < 1) {
        return data;
    }

    return data.sort((item1, item2) => item2.id - item1.id);
};

const confirmId = (state, id) => {
    if (
        isEmpty(state) ||
        isEmpty(state.partnermeetprofile) ||
        (state.conversation_id != id)
    ) {
        console.warn('MEETUPCONVERSATIONREDUCER_CONFIRMID', 'fucked');
        return state;
    }
}

let reducerdata = null;
const MeetupConversationReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_MEETUPCONVERSATION:
            return { ...state, ...action.payload };
            break;
        case UPDATE_MEETUPCONVERSATION:
            confirmId(state, action.conversation_id);
            reducerdata = state.map(item => {
                return item.id == action.payload.id ? { ...item, ...action.payload } : item;
            });
            reducerdata.find(item => item.id == action.payload) == undefined
                && reducerdata.push(action.payload);
            return { ...state, conv_list: arrangeConvs(reducerdata) };
            break;
        case REMOVE_MEETUPCONVERSATION:
            confirmId(state, action.conversation_id);
            reducerdata = state.filter(item => item.id != action.payload.id);
            return { ...state, conv_list: arrangeConvs(reducerdata) };
            break;
        case RESET:
            return action.payload.key == "meetupconversation" ? INITIAL_STATE : state;
            break;
        default:
            return state;
            break;
    }
};

export default MeetupConversationReducer;