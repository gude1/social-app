import { RESET, SET_MEETUPCONVERSATION, UPDATE_MEETUPCONVERSATION, REMOVE_MEETUPCONVERSATION, UPDATE_MEETUPCONVERSATION_ARR, SET_FCM_MEET_CONV_TO_DELIVERED, SET_FCM_MEET_CONV_TO_READ, ADD_FCM_MEET_CONV, PROCESSING } from "../actions/types";
import { checkData, isEmpty } from "../utilities/index";


const INITIAL_STATE = {
    conversation_id: '',
    meet_request: {},
    partnermeetprofile: {},
    loadingprev: false,
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
        state.conversation_id != id
    ) {
        console.warn('MEETUPCONVERSATIONREDUCER_CONFIRMID', 'fucked');
        return false;
    }
    return true;
};

const handleProcessing = (key, value, state) => {
    if (checkData(key) != true || checkData(state) != true || checkData(value) != true) {
        return state;
    }
    switch (key) {
        case 'meetupconvloadingprev':
            return { ...state, loadingprev: value };
            break;
        default:
            return state;
            break;
    }
};


let reducerdata = null;
let confirmed = false;
const MeetupConversationReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_MEETUPCONVERSATION:
            return { ...state, ...action.payload };
            break;
        case UPDATE_MEETUPCONVERSATION:
            confirmed = confirmId(state, action.conversation_id);
            if (!confirmed) {
                return state;
            }
            reducerdata = state.conv_list.map(item => {
                return item.id == action.payload.id ? { ...item, ...action.payload } : item;
            });
            reducerdata.find(item => item.id == action.payload.id) == undefined
                && reducerdata.push(action.payload);
            return { ...state, conv_list: arrangeConvs(reducerdata) };
            break;
        case UPDATE_MEETUPCONVERSATION_ARR:
            confirmed = confirmId(state, action.conversation_id);
            if (!confirmed) {
                return state;
            }
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
            confirmed = confirmId(state, action.conversation_id);
            if (!confirmed) {
                return state;
            }
            reducerdata = state.conv_list.filter(item => item.id != action.payload.id);
            return { ...state, conv_list: arrangeConvs(reducerdata) };
            break;
        case SET_FCM_MEET_CONV_TO_DELIVERED:
            confirmed = confirmId(state, action.conv_id);
            if (!confirmed) {
                return state;
            }
            reducerdata = state.conv_list.map(item => {
                if (item.id <= action.payload) {
                    return { ...item, status: 'delievered' };
                }
                return item;
            });
            return { ...state, conv_list: arrangeConvs(reducerdata) };
            break;
        case SET_FCM_MEET_CONV_TO_READ:
            confirmed = confirmId(state, action.conv_id);
            if (!confirmed) {
                return state;
            }
            reducerdata = state.conv_list.map(item => {
                if (item.id <= action.payload) {
                    return { ...item, status: 'read' };
                }
                return item;
            });
            return { ...state, conv_list: arrangeConvs(reducerdata) };
            break;
        case ADD_FCM_MEET_CONV:
            confirmed = confirmId(state, action.conv_id);
            if (!confirmed) {
                return state;
            }
            reducerdata = state.conv_list.map(item => {
                return item.id == action.payload.id ? { ...item, ...action.payload } : item;
            });
            reducerdata.find(item => item.id == action.payload.id) == undefined
                && reducerdata.push(action.payload);
            return { ...state, conv_list: arrangeConvs(reducerdata) };
            break;
        case PROCESSING:
            return handleProcessing(action.payload.key, action.payload.value, state);
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