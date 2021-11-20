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
  REMOVE_PRIVATECHATLIST_CHATS,
  UPDATE_PRIVATECHATLIST_ARR,
} from '../actions/types';
import AsyncStorage from '@react-native-community/async-storage';
import {checkData} from '../utilities/index';
import {store} from '../store/index';

const INITIAL_STATE = {
  chatlist: [],
  persistedchatlist: [],
  lowest: null,
  highest: null,
  pinnedchatarr: [],
  loading: false,
  deleting: false,
  loadingmore: false,
};

const makeList = (data = []) => {
  if (!Array.isArray(data) || data.length < 1) {
    return data;
  }
  data = [...data];
  data = data.map(item => {
    return {...item, chats: arrangeChats(item.chats)};
  });
  return data.sort(
    (item1, item2) => item2.chats[0].created_at - item1.chats[0].created_at,
  );
};

const arrangeChats = (data = []) => {
  if (!Array.isArray(data) || data.length < 1) {
    return data;
  }
  data = [...data];
  return data.sort((item1, item2) => item2.created_at - item1.created_at);
};

const arrayReduce = data => {
  if (!Array.isArray(data) || data.length < 1) {
    return data;
  }
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

const findDebug = data => {
  console.warn(data, 'i was called');
};

const updateChats = (state, payload) => {
  if (!checkData(state) || !checkData(payload)) {
    return state;
  }
  //console.warn('reducerinside', payload);
  let chatlistnewstate = state.chatlist.map(item => {
    if (
      item.d == payload.d ||
      item.partnerprofile.profile_id == payload.partnerprofile.profile_id
    ) {
      let excludeids = [];
      /** chat */
      let itemchat = item.chats.map(chatitem => {
        let payloadchatitem = payload.chats.find(
          loaditem => loaditem.id == chatitem.id,
        );
        if (checkData(payloadchatitem)) {
          excludeids.push(chatitem.id);
          return {...chatitem, ...payloadchatitem};
        }
        return chatitem;
      });
      /**chats */
      let newchats = payload.chats.filter(
        pyitem => !excludeids.includes(pyitem.id),
      );
      if (newchats.length > 0) {
        return {
          last_fetch_arr: [],
          ...item,
          ...payload,
          deleted: false,
          chats: arrangeChats([...itemchat, ...newchats]),
        };
      }
      return {
        last_fetch_arr: [],
        ...item,
        ...payload,
        chats: arrangeChats([...itemchat, ...newchats]),
      };
    } else {
      return item;
    }
  });
  return chatlistnewstate;
};

const handleProcessing = (key, value, state) => {
  if (
    checkData(key) != true ||
    checkData(state) != true ||
    checkData(value) != true
  ) {
    return state;
  }
  switch (key) {
    case 'privatechatlistloading':
      return {...state, loading: value};
      break;
    case 'privatechatlistdeleting':
      return {...state, deleting: value};
      break;
    case 'privatechatlistloadingmore':
      return {...state, loadingmore: value};
      break;
    default:
      return state;
      break;
  }
};

let reducerdata = null;

const PrivateChatListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_PRIVATECHATLIST_ARR:
      let to_exclude_ids = [];
      reducerdata = state.chatlist.map(item => {
        let chatlistitem = action.payload.find(
          newitem => newitem.created_chatid == item.created_chatid,
        );
        if (chatlistitem) {
          to_exclude_ids = [...to_exclude_ids, item.created_chatid];
          return {...item, ...chatlistitem};
        }
        return item;
      });
      let to_add_list = action.payload.filter(
        item => !to_exclude_ids.includes(item.created_chatid),
      );
      reducerdata = makeList([...reducerdata, ...to_add_list]);
      return {
        ...state,
        chatlist: reducerdata,
        persistedchatlist: arrayReduce(reducerdata),
        highest: reducerdata[0].chats[0].id,
        lowest: reducerdata[reducerdata.length - 1].chats[0].id,
      };
      break;
    case UPDATE_PRIVATECHATLIST_CHATS:
      reducerdata = state.chatlist.map(chatlistitem => {
        if (chatlistitem.created_chatid == action.payload.created_chatid) {
          let to_exclude_ids = [];
          let newchats = chatlistitem.chats.map(chatitem => {
            let chat = action.payload.chats.find(newchatitem => {
              return newchatitem.private_chatid == chatitem.private_chatid;
            });
            if (chat) {
              to_exclude_ids = [...to_exclude_ids, chat.private_chatid];
              return {...chatitem, ...chat};
            }
            return item;
          });
          let to_add_chats = action.payload.filter(
            item => !to_exclude_ids.includes(item.private_chatid),
          );
          newchats = [...newchats, ...to_add_chats];
          return {...chatlistitem, chats: newchats};
        } else {
          return chatlistitem;
        }
      });
      reducerdata = makeList(reducerdata);
      return {
        ...state,
        chatlist: reducerdata,
        persistedchatlist: arrayReduce(reducerdata),
        highest: reducerdata[0].chats[0].id,
        lowest: reducerdata[reducerdata.length - 1].chats[0].id,
      };
      break;
    case UPDATE_PRIVATECHATLIST:
      return {...state, ...action.payload};
      break;
    case PIN_PRIVATECHATLIST:
      findDebug('PIN_PRIVATECHATLIST');
      return {
        ...state,
        pinnedchatarr: [...state.pinnedchatarr, action.payload],
      };
    case UNPIN_PRIVATECHATLIST:
      findDebug('UNPIN_PRIVATECHATLIST');
      reducerdata = state.pinnedchatarr.filter(
        created_chatid => created_chatid != action.payload,
      );
      return {...state, pinnedchatarr: reducerdata};
      break;
    case PROCESSING:
      return handleProcessing(action.payload.key, action.payload.value, state);
      break;
    case RESET:
      return action.payload.key == 'privatechatlist' ? INITIAL_STATE : state;
      break;
    default:
      return state;
      break;
  }
};

export const PrivateChatListConfig = {
  key: 'privatechat',
  storage: AsyncStorage,
  whitelist: ['persistedchatlist', 'lowest', 'highest','pinnedchatarr'],
};

export default PrivateChatListReducer;
