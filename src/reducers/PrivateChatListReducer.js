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
    UNPIN_PRIVATECHATLIST
} from '../actions/types';
import AsyncStorage from '@react-native-community/async-storage';
import { checkData } from '../utilities/index';

const INITIAL_STATE = {
    chatlist: [],
    persistedchatlist: [],
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
    return data.sort((item1, item2) => item2.id - item1.id);
};

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
            reducerdata = state.tosetreadarr.filter(item => !action.payload.contains(item));
            return { ...state, tosetreadarr: reducerdata };
            break;
        case PIN_PRIVATECHATLIST:
            return { ...state, pinnedchatarr: [...state.pinnedchatarr, action.payload] };
            break;
        case UNPIN_PRIVATECHATLIST:
            reducerdata = state.pinnedchatarr.filter(id => id != action.payload);
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

