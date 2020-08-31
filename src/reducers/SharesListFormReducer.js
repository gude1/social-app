import {
    SET_SHARES_LIST_FORM_LINK,
    PREPEND_SHARES_LIST_FORM,
    PROCESSING,
    RESET,
    UPDATE_SHARES_LIST_FORM,
    ADD_SHARES_LIST_FORM
} from '../actions/types';
import { checkData } from '../utilities/index';

const INITIAL_STATE = {
    shareslist: [],
    refreshing: false,
    nextpageurl: null,
    fetching: false,
    loadingmore: false,
};

const handleProcessing = (key, value, state) => {
    if (checkData(key) != true || checkData(state) != true || checkData(value) != true) {
        return state;
    }
    switch (key) {
        case 'shareslistfetching':
            return { ...state, fetching: value };
            break;
        case 'shareslistrefreshing':
            return { ...state, refreshing: value };
            break;
        case 'shareslistloadingmore':
            return { ...state, loadingmore: value };
            break;
        default:
            return state;
            break;
    }
};

const SharesListFormReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_SHARES_LIST_FORM:
            return { ...state, shareslist: [...state.shareslist, ...action.payload] };
            break;
        case PREPEND_SHARES_LIST_FORM:
            return { ...state, shareslist: [...action.payload, ...state.shareslist] };
            break;
        case SET_SHARES_LIST_FORM_LINK:
            return { ...state, nextpageurl: action.payload };
        case UPDATE_SHARES_LIST_FORM:
            let updatedstate = state.shareslist.map(item => {
                return item.profile.profile_id == action.payload.profile.profile_id ? { ...item, ...action.payload } : item;
            });
            /*updatedstate.find(item => item.profile_id == action.payload.profile_id) == undefined ?
                updatedstate.push({ ...action.payload }) : null;*/
            return { ...state, shareslist: updatedstate };
            break;
        case PROCESSING:
            return handleProcessing(action.payload.key, action.payload.value, state);
            break;
        case RESET:
            if (action.payload.key == 'shareslistform') {
                return INITIAL_STATE;
            }
            return state;
            break;
        default:
            return state;
            break;
    }
};
export default SharesListFormReducer;