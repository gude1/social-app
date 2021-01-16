import {
    SET_PRIVATECHATFORM, ADD_PRIVATECHAT, SET_PRIVATECHAT,
    SET_PRIVATECHAT_LAST_FETCH_ARR, ADD_PRIVATECHAT_LAST_FETCH_ARR,
    RESET, PROCESSING, REMOVE_PRIVATECHAT_LAST_FETCH_ARR,
    UPDATE_PRIVATECHATFORM_CHATS, REMOVE_PRIVATECHAT, SET_PRIVATECHAT_PARTNER_PROFILE,
} from "../actions/types";
import { checkData } from "../utilities/index";

const INITIAL_STATE = {
    partnerprofile: null,
    fetchstatus: 0,
    create_chatid: null,
    loadingmore: false,
    chats: [],
    last_fetch_arr: []
};

const arrangeChat = (data) => {
    if (!Array.isArray(data) || data.length < 1) {
        return data;
    }
    return data.sort((item1, item2) => item1.created_at - item2.created_at);
};

const updateChats = (state, payload) => {
    if (!checkData(state) || !checkData(payload)) {
        return state;
    }
    let excludeids = [];
    let chats = state.chats.map(chatitem => {
        let payloadchatitem = payload.chats.find(loaditem => loaditem.id == chatitem.id);
        if (checkData(payloadchatitem)) {
            excludeids.push(chatitem.id);
            return { ...chatitem, ...payloadchatitem };
        }
        return chatitem;
    });
    let newchats = payload.chats.filter(pyitem => !excludeids.includes(pyitem.id));
    return [...chats, ...newchats];
};

const handleProcessing = (key, value, state) => {
    if (checkData(key) != true || checkData(state) != true || checkData(value) != true) {
        return state;
    }
    let values = String(value).split('*');
    if (values[1] != state.create_chatid) {
        return state;
    }
    switch (key) {
        case 'privatechatformloadingmore':
            return { ...state, loadingmore: values[0] };
            break;
        case 'privatechatformfetchstatus':
            return { ...state, fetchstatus: values[0] };
            break;
        default:
            return state;
            break;
    }
};

const confirmId = (state, id) => {
    if (!checkData(state) || state.create_chatid != id) {
        return state;
    }
}

let reducerdata = null;

const PrivateChatReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_PRIVATECHATFORM:
            reducerdata = { ...INITIAL_STATE, ...action.payload };
            return { ...reducerdata, chats: arrangeChat(reducerdata.chats) };
            break;
        case ADD_PRIVATECHAT:
            confirmId(state, action.create_chatid);
            let excluded_ids = [];
            let toaddpayloads = [];
            reducerdata = state.chats.map(item => {
                let data = action.payload.find(payloaditem => payloaditem.id == item.id);
                if (checkData(data)) {
                    excluded_ids.push(data.id);
                    return { ...item, ...data };
                }
                return item;
            });
            toaddpayloads = action.payload.filter(toadditem => !excluded_ids.includes(toadditem.id));
            return { ...state, chats: arrangeChat([...reducerdata, ...toaddpayloads]) };
            break;
        case REMOVE_PRIVATECHAT:
            confirmId(state, action.create_chatid);
            reducerdata = state.chats.filter(item => item.id != action.payload.id);
            return { ...state, chats: arrangeChat(reducerdata) };
            break;
        case SET_PRIVATECHAT:
            confirmId(state, action.create_chatid);
            reducerdata = arrangeChat(action.payload);
            return { ...state, chats: reducerdata };
            break;
        case SET_PRIVATECHAT_LAST_FETCH_ARR:
            confirmId(state, action.create_chatid);
            return { ...state, last_fetch_arr: action.payload };
            break;
        case ADD_PRIVATECHAT_LAST_FETCH_ARR:
            confirmId(state, action.create_chatid);
            return { ...state, last_fetch_arr: [...state.last_fetch_arr, ...action.payload] };
            break;
        case REMOVE_PRIVATECHAT_LAST_FETCH_ARR:
            confirmId(state, action.create_chatid);
            reducerdata = state.last_fetch_arr.filter(id => !action.payload.includes(id));
            return { ...state, last_fetch_arr: reducerdata };
            break;
        case SET_PRIVATECHAT_PARTNER_PROFILE:
            confirmId(state, action.create_chatid);
            return { ...state, partnerprofile: { ...state.partnerprofile, ...action.payload } };
            break;
        case PROCESSING:
            return handleProcessing(action.payload.key,
                action.payload.value,
                state
            );
            break;
        case RESET:
            return action.payload.key == "privatechatform" ? INITIAL_STATE : state;
            break;
        default:
            return state;
            break;
    }
};

export default PrivateChatReducer;