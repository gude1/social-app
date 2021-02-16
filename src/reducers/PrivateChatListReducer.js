import {
    PREPEND_PRIVATECHATLIST,
    ADD_PRIVATECHATLIST,
    UPDATE_PRIVATECHATLIST,
    RESET,
    PROCESSING,
    DELETE_PRIVATECHATLIST,
    UPDATE_ARRAY_PRIVATECHATLIST,
    ADD_PRIVATECHATLIST_TOSETREADARR,
    REMOVE_PRIVATECHATLIST_TOSETREADARR,
    SET_PRIVATE_CHATLIST_NEXTURL,
    PIN_PRIVATECHATLIST,
    UNPIN_PRIVATECHATLIST,
    ADD_PRIVATECHATLIST_EACH_CHAT_ARR,
    UPDATE_PRIVATECHATLIST_CHATS,
    REMOVE_PRIVATECHATLIST_CHATS
} from '../actions/types';
import AsyncStorage from '@react-native-community/async-storage';
import { checkData } from '../utilities/index';
import { store } from '../store/index';

const INITIAL_STATE = {
    chatlist: [],
    persistedchatlist: [],
    //each_chat_arr: [],
    tosetreadarr: [],
    pinnedchatarr: [],
    nexturl: null,
    loading: false,
    deleting: false,
    loadingmore: false,
};

const makeList = (data: Array) => {
    if (!Array.isArray(data) || data.length < 1) {
        return data;
    }
    return data.sort((item1, item2) => item1.chats[0].created_at - item2.chats[0].created_at);
};

const arrangeChats = (data: Array) => {
    if (!Array.isArray(data) || data.length < 1) {
        return data;
    }
    return data.sort((item1, item2) => item2.created_at - item1.created_at);
}


const arrayReduce = (data) => {
    if (!Array.isArray(data) || data.length < 1) {
        return data;
    };
    if (data.length > 100) {
        for (i = data.length; i > 100; i--) {
            data.pop();
        }
        return data;
    }
    return data;
};

const updateChats = (state, payload) => {
    if (!checkData(state) || !checkData(payload)) {
        return state;
    }
    let chatlistnewstate = state.chatlist.map(item => {
        if (item.create_chatid == payload.create_chatid) {
            let excludeids = [];
            /** chat */
            let itemchat = item.chats.map(chatitem => {
                let payloadchatitem = payload.chats.find(loaditem => loaditem.id == chatitem.id);
                if (checkData(payloadchatitem)) {
                    excludeids.push(chatitem.id);
                    return { ...chatitem, ...payloadchatitem };
                }
                return chatitem;
            });
            /**chats */
            let newchats = payload.chats.filter(pyitem => !excludeids.includes(pyitem.id));
            return { ...item, ...payload, chats: arrangeChats([...itemchat, ...newchats]) };
        } else {
            return item;
        }
    });
    return chatlistnewstate;
};

const handleProcessing = (key, value, state) => {
    if (checkData(key) != true || checkData(state) != true || checkData(value) != true) {
        return state;
    }
    switch (key) {
        case 'privatechatlistloading':
            return { ...state, loading: value };
            break;
        case 'privatechatlistdeleting':
            return { ...state, deleting: value };
            break;
        case 'privatechatlistloadingmore':
            return { ...state, loadingmore: value };
            break;
        default:
            return state;
            break;
    }
};

let reducerdata = null;

const PrivateChatListReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PREPEND_PRIVATECHATLIST:
            reducerdata = [...makeList(action.payload), ...state.chatlist];
            return { ...state, chatlist: reducerdata, persistedchatlist: arrayReduce(reducerdata) };
            break;
        case SET_PRIVATE_CHATLIST_NEXTURL:
            return { ...state, nexturl: action.payload };
            break;
        case ADD_PRIVATECHATLIST:
            reducerdata = [...state.chatlist, ...makeList(action.payload)];
            return { ...state, chatlist: reducerdata, persistedchatlist: arrayReduce(reducerdata) };
            break;
        case UPDATE_PRIVATECHATLIST:
            let updatedstate = state.chatlist.map(item => {
                return item.create_chatid == action.payload.create_chatid ? { ...item, ...action.payload } : item
            });
            updatedstate.find(item => item.create_chatid == action.payload.create_chatid) == undefined ?
                updatedstate.push({ ...action.payload }) : null;
            reducerdata = [...makeList(updatedstate)];
            return { ...state, chatlist: reducerdata, persistedchatlist: arrayReduce(reducerdata) };
            break;
        case UPDATE_PRIVATECHATLIST_CHATS:
            reducerdata = updateChats(state, action.payload);
            reducerdata = [...makeList(reducerdata)];
            return { ...state, chatlist: reducerdata, persistedchatlist: arrayReduce(reducerdata) };
            break;
        case REMOVE_PRIVATECHATLIST_CHATS:
            // console.warn('out out', action.payload);
            reducerdata = state.chatlist.map(item => {
                //console.warn('out', action.payload);
                if (item.create_chatid == action.payload.create_chatid) {
                    //console.warn('in', action.payload);
                    let newchats = item.chats.filter(chatitem => chatitem.id != action.payload.id);
                    //console.warn('newchats', newchats);
                    return { ...item, chats: arrangeChats(newchats), renderid: Math.round(new Date().getTime()) };
                }
                return item;
            });
            reducerdata = [...makeList(reducerdata)];
            return { ...state, chatlist: reducerdata, persistedchatlist: arrayReduce(reducerdata) };
            break;
        case UPDATE_ARRAY_PRIVATECHATLIST:
            let updatestate = state.chatlist.map(item => {
                let value = action.payload.find(newitem => newitem.create_chatid == item.create_chatid);
                return checkData(value) ? { ...item, ...value } : item;
            });
            reducerdata = [...makeList(updatestate)];
            return { ...state, chatlist: reducerdata, persistedchatlist: arrayReduce(reducerdata) };
            break;
        case DELETE_PRIVATECHATLIST:
            let newstate = state.chatlist.filter(item => item.create_chatid != action.payload);
            reducerdata = [...makeList(newstate)];
            return { ...state, chatlist: reducerdata, persistedchatlist: arrayReduce(reducerdata) };
            break;
        case ADD_PRIVATECHATLIST_TOSETREADARR:
            return { ...state, tosetreadarr: [...state.tosetreadarr, ...action.payload] };
            break;
        case REMOVE_PRIVATECHATLIST_TOSETREADARR:
            reducerdata = state.tosetreadarr.filter(item => !action.payload.includes(item));
            return { ...state, tosetreadarr: reducerdata };
            break;
        case PIN_PRIVATECHATLIST:
            return { ...state, pinnedchatarr: [...state.pinnedchatarr, action.payload] };
            break;
        case ADD_PRIVATECHATLIST_EACH_CHAT_ARR:
            let excludepayloadids = [];
            let toaddpayloads = [];
            reducerdata = state.each_chat_arr.map(item => {
                let payload = action.payload.find(payloaditem => {
                    return item.create_chatid == payloaditem.create_chatid;
                });
                if (checkData(payload)) {
                    excludepayloadids.push(payload.create_chatid);
                    //console.warn('INSIDE e', excludepayloadids);
                    return { ...item, ...payload };
                }
                //console.warn('INSIDE no', excludepayloadids);
                return item;
            });
            //console.warn('OUTSIDE', excludepayloadids);
            toaddpayloads = action.payload.filter(item => {
                return !excludepayloadids.includes(item.create_chatid);
            })
            return { ...state, each_chat_arr: [...reducerdata, ...toaddpayloads] };
            break;
        case UNPIN_PRIVATECHATLIST:
            reducerdata = state.pinnedchatarr.filter(create_chatid => create_chatid != action.payload);
            return { ...state, pinnedchatarr: reducerdata };
            break;
        case PROCESSING:
            return handleProcessing(action.payload.key,
                action.payload.value,
                state
            );
            break;
        case RESET:
            return action.payload.key == "privatechatlist" ? console.warn('yeah iw') && INITIAL_STATE : state;
            break;
        default:
            return state;
            break;
    };
};

export const PrivateChatListConfig = {
    key: "privatechat",
    storage: AsyncStorage,
    whitelist: ['persistedchatlist', 'tosetreadarr', 'pinnedchatarr']
};

export default PrivateChatListReducer;

