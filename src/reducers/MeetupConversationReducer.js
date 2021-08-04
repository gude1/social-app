import { RESET, SET_MEETUPCONVERSATION, UPDATE_MEETUPCONVERSATION, REMOVE_MEETUPCONVERSATION, UPDATE_MEETUPCONVERSATION_ARR } from "../actions/types";
import { checkData, isEmpty } from "../utilities/index";


const INITIAL_STATE = {
    conversation_id: '',
    meet_request: {},
    partnermeetprofile: {},
    conv_list: []
};

const arrangeConvs = (data) => {
    if (!Array.isArray(data) || data.length < 1) {
        return data;
    }
    return data.sort((item1, item2) => item2.created_at - item1.created_at);
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
            reducerdata = state.conv_list.map(item => {
                return item.id == action.payload.id ? { ...item, ...action.payload } : item;
            });
            reducerdata.find(item => item.id == action.payload.id) == undefined
                && reducerdata.push(action.payload);
            return { ...state, conv_list: arrangeConvs(reducerdata) };
            break;
        case UPDATE_MEETUPCONVERSATION_ARR:
            confirmId(state, action.conversation_id);
            let exclude = [];
            reducerdata = state.conv_list.map(item => {
                let founditem = action.payload.find(newitem => newitem.id == item.id);
                if (founditem) {
                    exclude.push(item.id);
                    return { ...item, ...founditem };
                } else {
                    return item;
                }
            });
            let toadd = action.payload.filter(newitem => !exclude.includes(newitem.id));
            reducerdata = [...reducerdata, ...toadd];
            return { ...state, conv_list: arrangeConvs(reducerdata) };
            break;
        case REMOVE_MEETUPCONVERSATION:
            confirmId(state, action.conversation_id);
            reducerdata = state.conv_list.filter(item => item.id != action.payload.id);
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