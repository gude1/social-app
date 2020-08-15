import {
    ADD_POST_COMMENT_FORM,
    PREPEND_POST_COMMENT_FORM,
    POST_COMMENT_FORM_DELETE,
    POST_COMMENT_FORM_REFRESH,
    REMOVE_POST_COMMENT_FORM,
    UPDATE_POST_COMMENT_FORM,
    PROCESSING,
    RESET,
    SET_POST_COMMENT_FORM_LINK
} from '../actions/types';
import { checkData } from '../utilities/index';

const INITIAL_STATE = {
    postcomments: [],
    ownerpost: null,
    fetching: false,
    processing: false,
    loadmore: false,
    refreshing: false,
    nexturl: null
};
const handleProcessing = (key, value, state) => {
    if (checkData(key) != true || checkData(state) != true || checkData(value) != true) {
        return state;
    }
    switch (key) {
        case 'postcommentformfetching':
            return { ...state, fetching: value };
            break;
        case 'postcommentformloadmore':
            return { ...state, loadmore: value };
            break;
        default:
            return state;
            break;
    }
};

const PostCommentFormReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PROCESSING:
            //return { ...state, fetching: false };
            return handleProcessing(action.payload.key,
                action.payload.value,
                state
            );
            break;
        case ADD_POST_COMMENT_FORM:
            return { ...state, postcomments: [...state.postcomments, ...action.payload] };
            break;
        case PREPEND_POST_COMMENT_FORM:
            return { ...state, postcomments: [...action.payload, ...state.postcomments] };
            break;
        case UPDATE_POST_COMMENT_FORM:
            let updatedstate = state.postcomments.map(item => {
                return item.commentid == action.payload.commentid ? { ...item, ...action.payload } : item;
            });
            updatedstate.find(item => item.commentid == action.payload.commentid) == undefined ?
                updatedstate.push({ ...action.payload }) : null;
            return { ...state, postcomments: updatedstate };
            break;
        case SET_POST_COMMENT_FORM_LINK:
            return { ...state, nexturl: action.payload };
            break;
        case RESET:
            if (action.payload.key == 'postcommentform') {
                return INITIAL_STATE;
            }
        case POST_COMMENT_FORM_REFRESH:
            return { ...state, refreshing: action.payload };
            break;
        case REMOVE_POST_COMMENT_FORM:
            let newstate = state.postcomments.filter(item => item.commentid != action.payload);
            return { ...state, postcomments: newstate };
            break;
        default:
            return state;
            break;
    }
};

export default PostCommentFormReducer;