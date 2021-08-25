import { RESET, SET_MEETCONVLIST, PROCESSING, UPDATE_MEETCONVLIST, UPDATE_MEETCONVLIST_CONVS, REMOVE_MEETCONVLIST_CONVS, UPDATE_MEETCONVLIST_CONVS_ARR, SET_FCM_MEET_CONV_TO_DELIVERED, SET_FCM_MEET_CONV_TO_READ, ADD_FCM_MEET_CONV } from "../actions/types";
import { checkData, isEmpty } from "../utilities/index";

const INITIAL_STATE = {
    list: [],
    fetching: false,
    refreshing: false,
    loadingmore: false,
};

const handleProcessing = (key, value, state) => {
    if (checkData(key) != true || checkData(state) != true || checkData(value) != true) {
        return state;
    }
    switch (key) {
        case 'meetupconvlistfetching':
            return { ...state, fetching: value };
            break;
        case 'meetupconvlistloadingmore':
            return { ...state, loadingmore: value };
            break;
        case 'meetupconvlistrefreshing':
            return { ...state, refreshing: value };
            break;
        default:
            return state;
            break;
    }
};

const arrangeConvs = (data) => {
    if (!Array.isArray(data) || data.length < 1) {
        return data;
    }
    return data.sort((item1, item2) => item2.created_at - item1.created_at);
};

const arrangeConvList = (data: Array) => {
    if (!Array.isArray(data) || data.length < 1) {
        return data;
    }
    data = [...data];

    return data.sort((item1, item2) => {
        let id1 = item1.conv_list && Array.isArray(item1.conv_list) ?
            item1.conv_list[0].id : item1.id;
        let id2 = item2.conv_list && Array.isArray(item2.conv_list) ?
            item2.conv_list[0].id : item2.id;

        return id2 - id1;
    });
};

let reducerdata = null;

const MeetupConvListReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_MEETCONVLIST:
            return { ...state, ...action.payload };
            break;
        case UPDATE_MEETCONVLIST:
            if (isEmpty(action.payload.conversation_id)) {
                return state;
            }
            reducerdata = state.list.map(listitem => {
                return listitem.conversation_id == action.payload.conversation_id ?
                    { ...listitem, ...action.payload } : listitem;
            });
            reducerdata.find(listitem => listitem.conversation_id == action.payload.conversation_id) == undefined &&
                reducerdata.push(action.payload);
            return { ...state, list: arrangeConvList(reducerdata) };
            break;
        case UPDATE_MEETCONVLIST_CONVS:
            if (isEmpty(action.payload.conversation_id)) {
                return state;
            }
            reducerdata = state.list.map(listitem => {
                if (listitem.conversation_id == action.payload.conversation_id) {
                    let convlist = listitem.conv_list.map(item => {
                        return item.id == action.payload.id ?
                            { ...item, ...action.payload } : item;
                    });
                    convlist.find(item => item.id == action.payload.id) == undefined
                        && convlist.push(action.payload);
                    return { ...listitem, ...action.payload, conv_list: arrangeConvs(convlist) };
                }
                return listitem;
            });
            reducerdata.find(listitem => listitem.conversation_id == action.payload.conversation_id) == undefined &&
                reducerdata.push(action.payload);
            return { ...state, list: arrangeConvList(reducerdata) };
            break;
        case UPDATE_MEETCONVLIST_CONVS_ARR:
            if (isEmpty(action.payload.conversation_id)) {
                return state;
            }
            reducerdata = state.list.map(listitem => {
                if (action.payload.conversation_id == listitem.conversation_id) {
                    if (!isEmpty(action.payload.conv_list)) {
                        let excludeconvs = [];
                        let newconvs = listitem.conv_list.map(convitem => {
                            let foundconvitem = action.payload.conv_list.find(newconvitem => newconvitem.id == convitem.id);
                            if (foundconvitem) {
                                excludeconvs.push(foundconvitem.id);
                                return { ...convitem, ...foundconvitem };
                            } else {
                                return convitem;
                            }
                        });
                        let tobeaddedconvs = action.payload.conv_list.filter(newconvitem => !excludeconvs.includes(newconvitem.id));
                        newconvs = [...newconvs, ...tobeaddedconvs];
                        return { ...listitem, ...action.payload, conv_list: arrangeConvs(newconvs) };
                    } else {
                        return { ...listitem, ...action.payload };
                    }
                }
                return listitem;
            });
            reducerdata.find(listitem => listitem.conversation_id == action.payload.conversation_id) == undefined &&
                reducerdata.push(action.payload);
            return { ...state, list: arrangeConvList(reducerdata) };
            break;
        case REMOVE_MEETCONVLIST_CONVS:
            reducerdata = state.list.map(listitem => {
                if (listitem.conversation_id == action.payload.conversation_id) {
                    let convlist = listitem.conv_list.filter(item => item.id != action.payload.id);
                    return { ...listitem, conv_list: arrangeConvs(convlist) };
                }
                return listitem;
            });
            return { ...state, list: arrangeConvList(reducerdata) };
            break;
        case SET_FCM_MEET_CONV_TO_READ:
            reducerdata = state.list.map(listitem => {
                if (listitem.conversation_id == action.conv_id) {
                    let convlist = listitem.conv_list.map(item => {
                        return item.id <= action.payload ? { ...item, status: "read" } : item;
                    });
                    return { ...listitem, conv_list: arrangeConvs(convlist) };
                }
                return listitem;
            });
            return { ...state, list: arrangeConvList(reducerdata) };
            break;
        case SET_FCM_MEET_CONV_TO_DELIVERED:
            reducerdata = state.list.map(listitem => {
                if (listitem.conversation_id == action.conv_id) {
                    let convlist = listitem.conv_list.map(item => {
                        return item.id <= action.payload ? { ...item, status: "delievered" } : item;
                    });
                    return { ...listitem, conv_list: arrangeConvs(convlist) };
                }
                return listitem;
            });
            return { ...state, list: arrangeConvList(reducerdata) };
            break;
        case ADD_FCM_MEET_CONV:
            let found = false;
            reducerdata = state.list.map(listitem => {
                if (listitem.conversation_id == action.conv_id) {
                    let convlist = listitem.conv_list;
                    convlist.push(action.payload);
                    found = true;
                    return {
                        ...listitem,
                        ...action.payload,
                        num_new_msg: (listitem.num_new_msg || 0) + 1,
                        conv_list: arrangeConvs(convlist)
                    };
                }
                return listitem;
            });
            found == false && reducerdata.push({
                ...action.payload,
                num_new_msg: 1,
                conv_list: [action.payload]
            })
            return { ...state, list: arrangeConvList(reducerdata) };
            break;
        case PROCESSING:
            return handleProcessing(action.payload.key,
                action.payload.value,
                state
            );
            break;
        case RESET:
            return action.payload.key == "meetupconvlist" ? INITIAL_STATE : state;
            break;
        default:
            return state;
            break;
    }
};

export default MeetupConvListReducer;