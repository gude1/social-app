import {
    offlineActionTypes,
    offlineActionCreators,
    checkInternetConnection
} from 'react-native-offline';
import { RESET, ADD_OFFLINE_ACTION, DELETE_OFFLINE_ACTION, DELETE_OFFLINE_ACTIONS } from '../actions/types';
import { store as availableStore } from '../store/index';
import { checkData } from '../utilities/index';
import AsyncStorage from '@react-native-community/async-storage';
import * as reduceractions from '../actions';


const { connectionChange } = offlineActionCreators;
const INITIAL_STATE = {
    persistedActionsQueue: [],
    actionsQueue: [],
};


const addOfflineAction = (state, toaddaction) => {
    if (!checkData(state) || !checkData(toaddaction)) {
        return state;
    }
    let persistedActionsQueue = state.persistedActionsQueue || [];
    let actionsQueue = state.actionsQueue || [];
    if (toaddaction.override == true) {
        persistedActionsQueue = persistedActionsQueue.filter(action => {
            return action.id != toaddaction.id
        });
        actionsQueue = actionsQueue.filter(action => {
            return action.id != toaddaction.id
        });
    }

    if (toaddaction.persist == true) {
        persistedActionsQueue.push({
            id: toaddaction.id,
            funcName: toaddaction.funcName,
            param: toaddaction.param
        });
    } else {
        actionsQueue.push({
            id: toaddaction.id,
            funcName: toaddaction.funcName,
            param: toaddaction.param
        });
    }
    return { ...state, persistedActionsQueue, actionsQueue };
};

let data1 = [];
let data2 = [];

const OfflineActionsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_OFFLINE_ACTION:
            return addOfflineAction(state, action.payload);
            break;
        case DELETE_OFFLINE_ACTION:
            data1 = state.persistedActionsQueue.filter(offlineaction => {
                return offlineaction.id != action.payload.id
            });
            data2 = state.actionsQueue.filter(offlineaction => {
                return offlineaction.id != action.payload.id
            });
            return { ...state, persistedActionsQueue: data1, actionsQueue: data2 };
            break;
        case DELETE_OFFLINE_ACTIONS:
            data1 = state.persistedActionsQueue.filter(offlineaction => {
                return !action.payload.ids.includes(offlineaction.id);
            });
            data2 = state.actionsQueue.filter(offlineaction => {
                return !action.payload.ids.includes(offlineaction.id);
            });
            return { ...state, persistedActionsQueue: data1, actionsQueue: data2 };
            break;
        case RESET:
            return action.payload.key == "offlineactionsreducer" ? INITIAL_STATE : state;
            break;
        default:
            return state;
            break;
    }
};

export const offlineActionsListConfig = {
    key: "offlineactions",
    storage: AsyncStorage,
    whitelist: ['persistedActionsQueue']
};


export default OfflineActionsReducer;