import { SET_PRIVATECHATFORM, ADD_PRIVATECHAT, SET_PRIVATECHAT, SET_PRIVATECHAT_LAST_FETCH_ARR, ADD_PRIVATECHAT_LAST_FETCH_ARR, RESET, PROCESSING } from "../actions/types";
import { checkData } from "../utilities/index";

const INITIAL_STATE = {
    partnerprofile: null,
    loadingmore: false,
    chats: [],
    last_fetch_arr: []
};

const arrangeChat = (data) => {
    if (!Array.isArray(data) || data.length < 1) {
        return data;
    }
    return data.sort((item1, item2) => item1.id - item2.id);
};

const handleProcessing = (key, value, state) => {
    if (checkData(key) != true || checkData(state) != true || checkData(value) != true) {
        return state;
    }
    switch (key) {
        case 'privatechatformloadingmore':
            return { ...state, loadingmore: value };
            break;
        default:
            return state;
            break;
    }
};

let reducerdata = null;

const PrivateChatReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_PRIVATECHATFORM:
            reducerdata = { ...INITIAL_STATE, ...action.payload };
            return { ...reducerdata, chats: arrangeChat(reducerdata.chats) };
            break;
        case ADD_PRIVATECHAT:
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
            toaddpayloads = action.payload.filter(item => !excluded_ids.includes(item.id));
            return { ...state, chats: arrangeChat([...reducerdata, ...toaddpayloads]) };
            break;
        case SET_PRIVATECHAT:
            reducerdata = arrangeChat(action.payload);
            return { ...state, chats: reducerdata };
            break;
        case SET_PRIVATECHAT_LAST_FETCH_ARR:
            return { ...state, last_fetch_arr: action.payload };
            break;
        case ADD_PRIVATECHAT_LAST_FETCH_ARR:
            return { ...state, last_fetch_arr: [...state.last_fetch_arr, ...action.payload] };
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