import {
  RESET,
  SET_MEETCONVLIST,
  PROCESSING,
  UPDATE_MEETCONVLIST,
  UPDATE_MEETCONVLIST_CONVS,
  REMOVE_MEETCONVLIST_CONVS,
  UPDATE_MEETCONVLIST_CONVS_ARR,
  SET_FCM_MEET_CONV_TO_DELIVERED,
  SET_FCM_MEET_CONV_TO_READ,
  ADD_FCM_MEET_CONV,
  REMOVE_MEETCONVLIST,
} from '../actions/types';
import AsyncStorage from '@react-native-community/async-storage';
import {checkData, isEmpty, hasProperty} from '../utilities/index';

const INITIAL_STATE = {
  list: [],
  persistedlist: [],
  fetching: false,
  refreshing: false,
  loadingmore: false,
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
    case 'meetupconvlistfetching':
      return {...state, fetching: value};
      break;
    case 'meetupconvlistloadingmore':
      return {...state, loadingmore: value};
      break;
    case 'meetupconvlistrefreshing':
      return {...state, refreshing: value};
      break;
    default:
      return state;
      break;
  }
};

const arrangeConvs = data => {
  if (!Array.isArray(data) || data.length < 1) {
    return data;
  }
  return data.sort((item1, item2) => item2.created_at - item1.created_at);
};

const arrangeConvList = (data = []) => {
  if (!Array.isArray(data) || data.length < 1) {
    return data;
  }
  data = [...data];
  data = data.map(item => {
    return {...item, conv_list: arrangeConvs(item.conv_list)};
  });
  return data.sort((item1, item2) => {
    return item2?.conv_list[0]?.created_at - item1?.conv_list[0]?.created_at;
  });
};

const arrayReduce = data => {
  if (!Array.isArray(data) || data.length < 1) {
    return data;
  }
  data = [...data].filter(item => item?.origin_meet_request?.deleted != true);
  if (data.length > 100) {
    for (i = data.length; i > 100; i--) {
      data.shift();
    }
    return data;
  }
  return data;
};

let reducerdata = null;

const MeetupConvListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_MEETCONVLIST:
      return {...state, ...action.payload};
      break;
    case UPDATE_MEETCONVLIST:
      if (isEmpty(action.payload.conversation_id)) {
        return state;
      }
      reducerdata = state.list.map(convlistitem => {
        return convlistitem.conversation_id == action.payload.conversation_id
          ? {...convlistitem, ...action.payload}
          : convlistitem;
      });
      reducerdata.find(
        convlistitem =>
          convlistitem.conversation_id == action.payload.conversation_id,
      ) == undefined && reducerdata.push(action.payload);

      reducerdata = arrangeConvList(reducerdata);
      return {
        ...state,
        list: reducerdata,
        persistedlist: arrayReduce(reducerdata),
      };
      break;
    case UPDATE_MEETCONVLIST_CONVS_ARR:
      let exclude_convlist_ids = [];
      reducerdata = state.list.map(convlistitem => {
        let foundconvlistitem = action.payload.find(
          newlistitem =>
            newlistitem.conversation_id == convlistitem.conversation_id,
        );
        if (foundconvlistitem) {
          exclude_convlist_ids.push(foundconvlistitem.conversation_id);
          if (!isEmpty(foundconvlistitem.conv_list)) {
            let excludeconvs = [];
            let newconvs = convlistitem.conv_list.map(convitem => {
              let foundconvitem = foundconvlistitem.conv_list.find(
                newconvitem => newconvitem.id == convitem.id,
              );
              if (foundconvitem) {
                excludeconvs.push(foundconvitem.id);
                return {...convitem, ...foundconvitem};
              } else {
                return convitem;
              }
            });
            let tobeaddedconvs = foundconvlistitem.conv_list.filter(
              newconvitem => !excludeconvs.includes(newconvitem.id),
            );
            newconvs = [...newconvs, ...tobeaddedconvs];
            return {
              ...convlistitem,
              ...foundconvlistitem,
              conv_list: newconvs,
            };
          } else {
            return {...convlistitem, ...foundconvlistitem};
          }
        }
        return convlistitem;
      });
      let to_add_list = action.payload.filter(
        listitem => !exclude_convlist_ids.includes(listitem.conversation_id),
      );
      reducerdata = arrangeConvList([...reducerdata, ...to_add_list]);
      return {
        ...state,
        list: reducerdata,
        persistedlist: arrayReduce(reducerdata),
      };
      break;
    case REMOVE_MEETCONVLIST_CONVS:
      reducerdata = state.list.map(convlistitem => {
        if (convlistitem.conversation_id == action.payload.conversation_id) {
          let convlist = convlistitem.conv_list.filter(
            item => item.id != action.payload.id,
          );
          return {...convlistitem, conv_list: convlist};
        }
        return convlistitem;
      });
      reducerdata = arrangeConvList(reducerdata);
      return {
        ...state,
        list: reducerdata,
        persistedlist: arrayReduce(reducerdata),
      };
      break;
    case REMOVE_MEETCONVLIST:
      reducerdata = state.list.filter(
        convlistitem => !action.payload.includes(convlistitem.conversation_id),
      );
      reducerdata = arrangeConvList(reducerdata);
      return {
        ...state,
        list: reducerdata,
        persistedlist: arrayReduce(reducerdata),
      };
      break;
    case SET_FCM_MEET_CONV_TO_READ:
      reducerdata = state.list.map(convlistitem => {
        if (convlistitem.conversation_id == action.conv_id) {
          let convlist = convlistitem.conv_list.map(item => {
            if (action.payload.min)
              return item.id <= action.payload.min
                ? {...item, status: 'read'}
                : item;
            else if (action.payload.max)
              return item.id >= action.payload.max
                ? {...item, status: 'read'}
                : item;
            else return item;
          });
          return {...convlistitem, conv_list: convlist};
        }
        return convlistitem;
      });
      reducerdata = arrangeConvList(reducerdata);
      return {
        ...state,
        list: reducerdata,
        persistedlist: arrayReduce(reducerdata),
      };
      break;
    case SET_FCM_MEET_CONV_TO_DELIVERED:
      reducerdata = state.list.map(convlistitem => {
        if (convlistitem.conversation_id == action.conv_id) {
          let convlist = convlistitem.conv_list.map(item => {
            if (action.payload.min)
              return item.id <= action.payload.min
                ? {...item, status: 'delievered'}
                : item;
            else if (action.payload.max)
              return item.id >= action.payload.max
                ? {...item, status: 'delievered'}
                : item;
            else return item;
          });
          return {...convlistitem, conv_list: convlist};
        }
        return convlistitem;
      });
      reducerdata = arrangeConvList(reducerdata);
      return {
        ...state,
        list: reducerdata,
        persistedlist: arrayReduce(reducerdata),
      };
      break;
    case ADD_FCM_MEET_CONV:
      let found = false;
      reducerdata = state.list.map(convlistitem => {
        if (convlistitem.conversation_id == action.conv_id) {
          let convlist = convlistitem.conv_list;
          convlist.push(action.payload);
          found = true;
          return {
            ...convlistitem,
            ...action.payload,
            num_new_msg: (convlistitem.num_new_msg || 0) + 1,
            latest_id: action.payload.id,
            conv_list: convlist,
          };
        }
        return convlistitem;
      });
      found == false &&
        reducerdata.push({
          ...action.payload,
          latest_id: action.payload.id,
          num_new_msg: 1,
          conv_list: [action.payload],
        });
      reducerdata = arrangeConvList(reducerdata);
      return {
        ...state,
        list: reducerdata,
        persistedlist: arrayReduce(reducerdata),
      };
      break;
    case PROCESSING:
      return handleProcessing(action.payload.key, action.payload.value, state);
      break;
    case RESET:
      return action.payload.key == 'meetupconvlist' ? INITIAL_STATE : state;
      break;
    default:
      return state;
      break;
  }
};
export const MeetConvListConfig = {
  key: 'meetconversation',
  storage: AsyncStorage,
  whitelist: ['persistedlist'],
};
export default MeetupConvListReducer;
