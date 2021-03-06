import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import userReducer from './userReducer';
import AuthReducer from './AuthReducer';
import ProfileReducer from './ProfileReducer';
import ProfileFormReducer from './ProfileFormReducer';
import PostReducer from './PostReducer';
import PostFormReducer from './PostFormReducer';
import PhotoGalleryReducer from './PhotoGalleryReducer';
import AppInfoReducer from './AppInfoReducer';
import TimelinePostReducer from './TimelinePostReducer';
import TimelinePostFormReducer from './TimelinePostFormReducer';
import PostCommentFormReducer from './PostCommentFormReducer';
import PostCommentReplyFormReducer from './PostCommentReplyFormReducer';
import LikesListFormReducer from './LikesListFormReducer';
import SharesListFormReducer from './SharesListFormReducer';
import ProfileActionFormReducer from './ProfileActionFormReducer';
import PostSettingReducer from './PostSettingReducer';
import UserViewProfileReducer from './UserViewProfileReducer';
import OthersViewProfileReducer from './OthersViewProfileReducer';
import PrivateChatListReducer, { PrivateChatListConfig } from './PrivateChatListReducer';
import FollowInfoReducer from './FollowInfoReducer';
import UsersListReducer from './UsersListReducer';
import { reducer as network } from 'react-native-offline';
import OfflineActionsReducer, { offlineActionsListConfig } from './OfflineActionsReducer';
import PrivateChatReducer from './PrivateChatReducer';
import SearchPrivateChatListReducer from './SearchPrivateChatListReducer';

export default combineReducers({
    user: userReducer,
    auth: AuthReducer,
    profileform: ProfileFormReducer,
    profile: ProfileReducer,
    posts: PostReducer,
    postform: PostFormReducer,
    postsetting: PostSettingReducer,
    timelineposts: TimelinePostReducer,
    timelinepostform: TimelinePostFormReducer,
    postcommentform: PostCommentFormReducer,
    postcommentreplyform: PostCommentReplyFormReducer,
    userviewprofileform: UserViewProfileReducer,
    othersviewprofileform: OthersViewProfileReducer,
    likeslistform: LikesListFormReducer,
    shareslistform: SharesListFormReducer,
    profileactionform: ProfileActionFormReducer,
    privatechatlistform: persistReducer(PrivateChatListConfig, PrivateChatListReducer),
    searchprivatechatlist: SearchPrivateChatListReducer,
    //privatechatlistform: PrivateChatListReducer,
    privatechatform: PrivateChatReducer,
    followinfo: FollowInfoReducer,
    userslist: UsersListReducer,
    appinfo: AppInfoReducer,
    photogalleryform: PhotoGalleryReducer,
    offlineactionslist: persistReducer(offlineActionsListConfig, OfflineActionsReducer),
    network
});