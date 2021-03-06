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
    data = [...data];
    data = data.map(item => {
        return { ...item, chats: arrangeChats(item.chats) };
    });
    return data.sort((item1, item2) => item1.chats[0].created_at - item2.chats[0].created_at);
};

const arrangeChats = (data: Array) => {
    if (!Array.isArray(data) || data.length < 1) {
        return data;
    }
    data = [...data];
    return data.sort((item1, item2) => item2.created_at - item1.created_at);
}


const arrayReduce = (data) => {
    if (!Array.isArray(data) || data.length < 1) {
        return data;
    };

    data = [...data];
    data = data.filter(item => item.deleted != true);
    if (data.length > 100) {
        for (i = data.length; i > 100; i--) {
            data.shift();
        }
        return data;
    }
    return data;
};

const findDebug = (data) => {
    console.warn(data, 'i was called');
}

const updateChats = (state, payload) => {
    if (!checkData(state) || !checkData(payload)) {
        return state;
    }
    //console.warn('reducerinside', payload);
    let chatlistnewstate = state.chatlist.map(item => {
        if (item.create_chatid == payload.create_chatid ||
            item.partnerprofile.profile_id == payload.partnerprofile.profile_id) {
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
            if (newchats.length > 0) {
                return { last_fetch_arr: [], ...item, ...payload, deleted: false, chats: arrangeChats([...itemchat, ...newchats]) };
            }
            return { last_fetch_arr: [], ...item, ...payload, chats: arrangeChats([...itemchat, ...newchats]) };
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
let bolval = false;

const PrivateChatListReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PREPEND_PRIVATECHATLIST:
            findDebug('prepend_chatlist');
            reducerdata = [...makeList(action.payload), ...state.chatlist];
            return { ...state, chatlist: reducerdata, persistedchatlist: arrayReduce(reducerdata) };
            break;
        case SET_PRIVATE_CHATLIST_NEXTURL:
            findDebug('set_private_chatlist_nexturl');
            return { ...state, nexturl: action.payload };
            break;
        case ADD_PRIVATECHATLIST:
            findDebug('ADD_PRIVATECHATLIST');
            reducerdata = makeList([...state.chatlist, ...action.payload]);
            return { ...state, chatlist: reducerdata, persistedchatlist: arrayReduce(reducerdata) };
            break;
        case UPDATE_PRIVATECHATLIST:
            findDebug('UPDATE_PRIVATECHATLIST');
            let updatedstate = state.chatlist.map(item => {
                if (item.create_chatid == action.payload.create_chatid ||
                    item.partnerprofile.profile_id == action.payload.partnerprofile.profile_id
                ) {
                    return { last_fetch_arr: [], deleted: false, ...item, ...action.payload };
                } else {
                    return item;
                }
            });
            bolval = state.chatlist.find(item =>
                item.create_chatid == action.payload.create_chatid ||
                item.partnerprofile.profile_id == action.payload.partnerprofile.profile_id
            );
            if (!checkData(bolval)) {
                updatedstate.push({ last_fetch_arr: [], deleted: false, ...action.payload });
            }
            reducerdata = [...makeList(updatedstate)];
            return { ...state, chatlist: reducerdata, persistedchatlist: arrayReduce(reducerdata) };
            break;
        case UPDATE_PRIVATECHATLIST_CHATS:
            findDebug('UPDATE_PRIVATECHATLIST_CHATS');
            //console.warn('privatechatlist', action.payload);
            let findchatobj = state.chatlist.find(item =>
                item.create_chatid == action.payload.create_chatid ||
                item.partnerprofile.profile_id == action.payload.partnerprofile.profile_id
            );
            if (!checkData(findchatobj)) {
                reducerdata = state.chatlist;
                reducerdata.push({ last_fetch_arr: [], deleted: false, ...action.payload });
            } else {
                reducerdata = updateChats(state, action.payload);
            }
            reducerdata = [...makeList(reducerdata)];
            return { ...state, chatlist: reducerdata, persistedchatlist: arrayReduce(reducerdata) };
            break;
        case REMOVE_PRIVATECHATLIST_CHATS:
            findDebug('REMOVE_PRIVATECHATLIST_CHATS');
            reducerdata = state.chatlist.map(item => {
                //console.warn('before', reducerdata.length);
                if (item.create_chatid == action.payload.create_chatid ||
                    item.partnerprofile.profile_id == action.payload.partnerprofile.profile_id) {
                    let newchats = [];
                    newchats = item.chats.map(chatitem => {
                        return chatitem.id == action.payload.id ? { ...chatitem, deleted: true } : chatitem;
                    });
                    return { ...item, chats: arrangeChats(newchats) };
                }
                return item;
            });
            reducerdata = [...makeList(reducerdata)];
            // console.warn('after', reducerdata.length)
            return { ...state, chatlist: reducerdata, persistedchatlist: arrayReduce(reducerdata) };
            break;
        case UPDATE_ARRAY_PRIVATECHATLIST:
            findDebug('UPDATE_ARRAY_PRIVATECHATLIST');
            let updatestate = state.chatlist.map(item => {
                let value = action.payload.find(newitem => newitem.create_chatid == item.create_chatid);
                return checkData(value) ? { ...item, ...value } : item;
            });
            reducerdata = [...makeList(updatestate)];
            return { ...state, chatlist: reducerdata, persistedchatlist: arrayReduce(reducerdata) };
            break;
        case DELETE_PRIVATECHATLIST:
            findDebug('DELETE_PRIVATECHATLIST');
            let newstate = state.chatlist.map(item => {
                if (item.create_chatid == action.payload ||
                    item.partnerprofile.profile_id == action.payload
                ) {
                    let itemchats = item.chats.map(chatitem => {
                        return { ...chatitem, deleted: true };
                    });
                    return { ...item, chats: itemchats, deleted: true };
                }
                return item;
            });
            reducerdata = [...makeList(newstate)];
            return { ...state, chatlist: reducerdata, persistedchatlist: arrayReduce(reducerdata) };
            break;
        case ADD_PRIVATECHATLIST_TOSETREADARR:
            findDebug('ADD_PRIVATECHATLIST_TOSETREADARR');
            return { ...state, tosetreadarr: [...state.tosetreadarr, ...action.payload] };
            break;
        case REMOVE_PRIVATECHATLIST_TOSETREADARR:
            findDebug('REMOVE_PRIVATECHATLIST_TOSETREADARR');
            reducerdata = state.tosetreadarr.filter(item => !action.payload.includes(item));
            return { ...state, tosetreadarr: reducerdata };
            break;
        case PIN_PRIVATECHATLIST:
            findDebug('PIN_PRIVATECHATLIST');
            return { ...state, pinnedchatarr: [...state.pinnedchatarr, action.payload] };
            break;
        /*case ADD_PRIVATECHATLIST_EACH_CHAT_ARR:
            findDebug('ADD_PRIVATECHATLIST_EACH_CHAT_ARR');
            let excludepayloadids = [];
            let toaddpayloads = [];
            reducerdata = state.each_chat_arr.map(item => {
                let payload = action.payload.find(payloaditem => {
                    return item.create_chatid == payloaditem.create_chatid ||
                        item.partnerprofile.profile_id == payload.partnerprofile.profile_id
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
            break;*/
        case UNPIN_PRIVATECHATLIST:
            findDebug('UNPIN_PRIVATECHATLIST');
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
            return action.payload.key == "privatechatlist" ? INITIAL_STATE : state;
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

