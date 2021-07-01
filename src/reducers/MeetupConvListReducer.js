import { RESET, SET_MEETCONVLIST, PROCESSING, UPDATE_MEETCONVLIST } from "../actions/types";
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

const arrangeConvList = (data: Array) => {
    if (!Array.isArray(data) || data.length < 1) {
        return data;
    }
    data = [...data];

    return data.sort((item1, item2) => {
        let id1 = !isEmpty(item1.conv_list) && Array.isArray(item1.conv_list) ?
            item1.conv_list[0].id : item1.id;
        let id2 = !isEmpty(item2.conv_list) && Array.isArray(item2.conv_list) ?
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
            reducerdata = state.list.map(item => {
                return item.conversation_id == action.payload.conversation_id ?
                    { ...item, ...action.payload } : item;
            });
            reducerdata.find(item => item.conversation_id == action.payload.conversation_id) == undefined &&
                reducerdata.push(action.payload);
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