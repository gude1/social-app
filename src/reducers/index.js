import { combineReducers } from 'redux';
import userReducer from './userReducer';
import AuthReducer from './AuthReducer';
import ProfileReducer from './ProfileReducer';
import ProfileFormReducer from './ProfileFormReducer';
import PostReducer from './PostReducer';
import PostFormReducer from './PostFormReducer';
import PhotoGalleryReducer from './PhotoGalleryReducer';
import AppInfoReducer from './AppInfoReducer';
import TimelinePostReducer from './TimelinePostReducer';
import TimelinePostFormReducer from './TimelinePostFormReducer'
import PostCommentFormReducer from './PostCommentFormReducer';
import LikesListFormReducer from './LikesListFormReducer';
import ProfileActionFormReducer from './ProfileActionFormReducer';

export default combineReducers({
    user: userReducer,
    auth: AuthReducer,
    profileform: ProfileFormReducer,
    profile: ProfileReducer,
    posts: PostReducer,
    postform: PostFormReducer,
    timelineposts: TimelinePostReducer,
    timelinepostform: TimelinePostFormReducer,
    postcommentform: PostCommentFormReducer,
    likeslistform: LikesListFormReducer,
    profileactionform: ProfileActionFormReducer,
    appinfo: AppInfoReducer,
    photogalleryform: PhotoGalleryReducer,
});