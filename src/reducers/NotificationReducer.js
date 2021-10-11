import {
  PROCESSING,
  SET_MENTIONS,
  SET_NOTIFICATIONS,
  UPDATE_MENTIONS,
  UPDATE_NOTIFICATIONS,
  RESET,
} from '../actions/types';
import {isEmpty, checkData} from '../utilities';

const INITIAL_STATE = {
  notifications: [],
  loadingnotes: false,
  loadingmorenotes: false,
  loadingmentions: false,
  loadingmorementions: false,
  metions: [],
};

const arrangeItems = data => {
  if (!Array.isArray(data) || data.length < 1) {
    return data;
  }
  data = [...data];
  return data.sort((item1, item2) => item2.created_at - item1.created_at);
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
    case 'loadingnotifications':
      return {...state, loadingnotes: value};
      break;
    default:
      return state;
      break;
  }
};
const NotificationReducer = (state = INITIAL_STATE, action) => {
  let reducerdata = null;
  let exclude_ids = null;
  let toadditems = null;
  switch (action.type) {
    case SET_NOTIFICATIONS:
      return {...state, notifications: action.payload};
      break;
    case UPDATE_NOTIFICATIONS:
      exclude_ids = [];
      toadditems = [];
      reducerdata = state.notifications.map(item => {
        let newitem = action.payload.find(newitem => newitem.id == item.id);
        if (newitem) {
          exclude_ids.push(newitem.id);
          return {...item, ...newitem};
        } else {
          return item;
        }
      });
      toadditems = action.payload.filter(
        item => !exclude_ids.includes(item.id),
      );
      return {
        ...state,
        notifications: arrangeItems([...reducerdata, ...toadditems]),
      };
      break;
    case SET_MENTIONS:
      return {...state, metions: action.payload};
      break;
    case UPDATE_MENTIONS:
      exclude_ids = [];
      toadditems = [];
      reducerdata = state.metions.map(item => {
        let newitem = action.payload.find(newitem => newitem.id == item.id);
        if (newitem) {
          exclude_ids.push(newitem.id);
          return {...item, ...newitem};
        } else {
          return item;
        }
      });
      toadditems = action.payload.filter(
        item => !exclude_ids.includes(item.id),
      );
      return {
        ...state,
        metions: arrangeItems([...reducerdata, ...toadditems]),
      };
      break;
    case PROCESSING:
      return handleProcessing(action.payload.key, action.payload.value, state);
      break;
    case RESET:
      return action.payload.key == 'mynotifications' ? INITIAL_STATE : state;
      break;
    default:
      return state;
      break;
  }
};
export default NotificationReducer;
