import {
    ADD_POST_COMMENT_REPLY_FORM,
    PREPEND_POST_COMMENT_REPLY_FORM,
    POST_COMMENT_REPLY_FORM_DELETE,
    POST_COMMENT_REPLY_FORM_REFRESH,
    REMOVE_POST_COMMENT_REPLY_FORM,
    UPDATE_POST_COMMENT_REPLY_FORM,
    UPDATE_POST_COMMENT_REPLY_FORM_PROFILE_CHANGES,
    SET_POST_COMMENT_REPLY_FORM_LINK,
    PROCESSING,
    RESET,
} from '../actions/types';
import { checkData } from '../utilities/index';

const INITIAL_STATE = {
    postcommentreplies: [],
    profileschanges: [],
    ownerpost: null,
    fetching: false,
    processing: false,
    hiding: false,
    deleting: false,
    loadmore: false,
    refreshing: false,
    nexturl: null
};
const handleProcessing = (key, value, state) => {
    if (checkData(key) != true || checkData(state) != true || checkData(value) != true) {
        return state;
    }
    switch (key) {
        case 'postcommentreplyformfetching':
            return { ...state, fetching: value };
            break;
        case 'postcommentreplyformloadmore':
            return { ...state, loadmore: value };
            break;
        case 'postcommentreplyformdeleting':
            return { ...state, deleting: value };
            break;
        case 'postcommentreplyformhiding':
            return { ...state, hiding: value };
            break;
        default:
            return state;
            break;
    }
};

const handleReset = (action, state) => {
    if (!checkData(action) || !checkData(state)) {
        return state;
    }
    if (action.payload.key == 'postcommentreplyform' && checkData(action.payload.value) == false) {
        return INITIAL_STATE;
    } else if (action.payload.key == 'postcommentreplyform' && checkData(action.payload.value) == true) {
        let postcommentreplies = state.postcommentreplies.filter(item => item.replyid != action.payload.value);
        return { ...state, postcommentreplies };
    } else {
        return state;
    }
};

const PostCommentReplyFormReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PROCESSING:
            //return { ...state, fetching: false };
            return handleProcessing(action.payload.key,
                action.payload.value,
                state
            );
            break;
        case ADD_POST_COMMENT_REPLY_FORM:
            return { ...state, postcommentreplies: [...state.postcommentreplies, ...action.payload] };
            break;
        case PREPEND_POST_COMMENT_REPLY_FORM:
            return { ...state, postcommentreplies: [...action.payload, ...state.postcommentreplies] };
            break;
        case UPDATE_POST_COMMENT_REPLY_FORM:
            let updatedstate = state.postcommentreplies.map(item => {
                return item.commentid == action.payload.commentid ? { ...item, ...action.payload } : item;
            });
            updatedstate.find(item => item.commentid == action.payload.commentid) == undefined ?
                updatedstate.push({ ...action.payload }) : null;
            return { ...state, postcommentreplies: updatedstate };
            break;
        case SET_POST_COMMENT_REPLY_FORM_LINK:
            return { ...state, nexturl: action.payload };
            break;
        case RESET:
            return handleReset(action, state);
            break;
        case POST_COMMENT_REPLY_FORM_REFRESH:
            return { ...state, refreshing: action.payload };
            break;
        case UPDATE_POST_COMMENT_REPLY_FORM_PROFILE_CHANGES:
            let updatedprofilestate = state.profileschanges.map(item => {
                return item.profileid == action.payload.profileid ? { ...item, ...action.payload } : item;
            });
            updatedprofilestate.find(item => item.profileid == action.payload.profileid) == undefined ?
                updatedprofilestate.push({ ...action.payload }) : null;
            return { ...state, profileschanges: updatedprofilestate };
            break;
        case REMOVE_POST_COMMENT_REPLY_FORM:
            let newstate = state.postcommentreplies.filter(item => item.replyid != action.payload);
            return { ...state, postcommentreplies: newstate };
            break;
        default:
            return state;
            break;
    }
};

export default PostCommentReplyFormReducer;