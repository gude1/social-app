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
  SET_PRIVATE_CHAT_READ_STATUS,
} from '../actions/types';
import AsyncStorage from '@react-native-community/async-storage';
import {checkData, isEmpty} from '../utilities/index';
import {store} from '../store/index';

const INITIAL_STATE = {
  chatlist: [],
  persistedchatlist: [],
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
  return data.sort((item1, item2) => item2?.chats[0]?.id - item1?.chats[0]?.id);
};

const arrangeChats = (data = []) => {
  if (!Array.isArray(data) || data.length < 1) {
    return data;
  }
  data = [...data].filter(item => item.deleted != true);
  return data.sort((item1, item2) => item2?.id - item1?.id);
};

const arrayReduce = data => {
  if (!Array.isArray(data) || data.length < 1) {
    return data;
  }
  data = [...data].filter(item => item.deleted != true);
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
let found = false;

const PrivateChatListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_PRIVATECHATLIST_ARR:
      let to_exclude_ids = [];
      reducerdata = state.chatlist.map(item => {
        let chatlistitem = action.payload.find(
          newitem =>
            newitem.created_chatid == item.created_chatid ||
            item?.partnerprofile?.profile_id ==
              newitem?.partnerprofile?.profile_id,
        );
        if (chatlistitem) {
          to_exclude_ids = [
            ...to_exclude_ids,
            item.created_chatid || item?.partnerprofile?.profile_id,
          ];

          if (!isEmpty(chatlistitem.chats)) {
            let exclude_chat_ids = [];
            let newchats = item.chats.map(chatitem => {
              let chat = chatlistitem.chats.find(newchatitem => {
                return newchatitem.private_chatid == chatitem.private_chatid;
              });
              if (chat) {
                exclude_chat_ids = [...exclude_chat_ids, chat.private_chatid];
                return {...chatitem, ...chat};
              }
              return chatitem;
            });
            let to_add_chats = chatlistitem.chats.filter(
              item => !exclude_chat_ids.includes(item.private_chatid),
            );
            newchats = [...newchats, ...to_add_chats];
            return {...item, ...chatlistitem, chats: newchats};
          }

          return {...item, ...chatlistitem};
        }
        return item;
      });
      let to_add_list = action.payload.filter(item => {
        if (to_exclude_ids.includes(item.created_chatid)) return false;
        else if (to_exclude_ids.includes(item?.partnerprofile?.profile_id))
          return false;
        else return true;
      });
      reducerdata = makeList([...reducerdata, ...to_add_list]);
      return {
        ...state,
        chatlist: reducerdata,
        persistedchatlist: arrayReduce(reducerdata),
      };
      break;
    case UPDATE_PRIVATECHATLIST_CHATS:
      found = false;
      reducerdata = state.chatlist.map(chatlistitem => {
        if (
          chatlistitem.created_chatid == action.payload.created_chatid ||
          chatlistitem?.partnerprofile?.profile_id ==
            action.payload?.partnerprofile?.profile_id
        ) {
          //console.warn('list found');
          found = true;
          let to_exclude_ids = [];
          let newchats = chatlistitem.chats.map(chatitem => {
            let chat = action.payload.chats.find(newchatitem => {
              return newchatitem.private_chatid == chatitem.private_chatid;
            });
            if (chat) {
              /*console.warn('chat found', [
                chatitem.private_chatid,
                chat.private_chatid,
              ]);*/
              to_exclude_ids = [...to_exclude_ids, chat.private_chatid];
              return {...chatitem, ...chat};
            }
            return chatitem;
          });
          let to_add_chats = action.payload.chats.filter(
            item => !to_exclude_ids.includes(item.private_chatid),
          );
          newchats = [...newchats, ...to_add_chats];
          return {...chatlistitem, chats: newchats};
        } else {
          return chatlistitem;
        }
      });
      found == false && reducerdata.push(action.payload);
      reducerdata = makeList(reducerdata);
      return {
        ...state,
        chatlist: reducerdata,
        persistedchatlist: arrayReduce(reducerdata),
      };
      break;
    case UPDATE_PRIVATECHATLIST:
      return {...state, ...action.payload};
      break;
    case PIN_PRIVATECHATLIST:
      return {
        ...state,
        pinnedchatarr: [action.payload, ...state.pinnedchatarr],
      };
    case UNPIN_PRIVATECHATLIST:
      reducerdata = state.pinnedchatarr.filter(
        created_chatid => created_chatid != action.payload,
      );
      return {...state, pinnedchatarr: reducerdata};
      break;
    case DELETE_PRIVATECHATLIST:
      reducerdata = state.chatlist.filter(item => {
        if (item.created_chatid == action.payload) return false;
        else if (item?.partnerprofile?.profile_id == action.payload)
          return false;
        else return true;
      });
      let pinnedchatarr = state.pinnedchatarr.filter(
        created_chatid => created_chatid != action.payload,
      );
      reducerdata = makeList(reducerdata);
      return {
        ...state,
        chatlist: reducerdata,
        pinnedchatarr,
        persistedchatlist: arrayReduce(reducerdata),
      };
      break;
    case REMOVE_PRIVATECHATLIST_CHATS:
      reducerdata = state.chatlist.map(chatlistitem => {
        if (
          chatlistitem.created_chatid == action.payload.created_chatid ||
          chatlistitem?.partnerprofile?.profile_id ==
            action?.partnerprofile?.profile_id
        ) {
          let chats = chatlistitem.chats.map(chatitem => {
            return chatitem.private_chatid == action.payload.private_chatid
              ? {...chatitem, deleted: true}
              : chatitem;
          });
          return {...chatlistitem, chats};
        }
        return chatlistitem;
      });
      reducerdata = makeList(reducerdata);
      return {
        ...state,
        chatlist: reducerdata,
        persistedchatlist: arrayReduce(reducerdata),
      };
      break;
    case SET_PRIVATE_CHAT_READ_STATUS:
      reducerdata = state.chatlist.map(chatlistitem => {
        let payload = action.payload.find(
          item => item.created_chatid == chatlistitem.created_chatid,
        );
        if (!isEmpty(payload)) {
          let chats = chatlistitem.chats.map(chatitem => {
            if (payload.min) {
              return chatitem.id <= payload.min
                ? {
                    ...chatitem,
                    read:
                      chatitem.read != 'true' ? payload.status : chatitem.read,
                  }
                : chatitem;
            } else if (payload.max) {
              return chatitem.id >= payload.max
                ? {
                    ...chatitem,
                    read:
                      chatitem.read != 'true' ? payload.status : chatitem.read,
                  }
                : chatitem;
            } else {
              return chatitem;
            }
          });
          return {...chatlistitem, chats};
        }
        return chatlistitem;
      });
      reducerdata = makeList(reducerdata);
      return {
        ...state,
        chatlist: reducerdata,
        persistedchatlist: arrayReduce(reducerdata),
      };
      break;
    case 'SET_FCM_PRIVATECHAT':
      let newchat = action.payload[0];
      let partnerprofile = action.payload[1];
      reducerdata = state.chatlist.map(chatlistitem => {
        if (
          chatlistitem.created_chatid == newchat.created_chatid ||
          (!isEmpty(chatlistitem?.partnerprofile?.profile_id) &&
            chatlistitem?.partnerprofile?.profile_id ==
              partnerprofile?.profile_id)
        ) {
          found = true;
          return {
            ...chatlistitem,
            partnerprofile,
            created_chatid: newchat.created_chatid,
            num_new_msg: chatlistitem.num_new_msg + 1,
            first_id: action.payload.id,
            chats: [...chatlistitem.chats, newchat],
          };
        }
        return chatlistitem;
      });
      found == false &&
        reducerdata.push({
          created_chatid: newchat.created_chatid,
          num_new_msg: 1,
          partnerprofile,
          chats: [newchat],
          first_id: newchat.id,
          last_id: newchat.id,
        });

      reducerdata = makeList(reducerdata);
      return {
        ...state,
        chatlist: reducerdata,
        persistedchatlist: arrayReduce(reducerdata),
      };
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
  whitelist: ['persistedchatlist', 'lowest', 'highest', 'pinnedchatarr'],
};

export default PrivateChatListReducer;
