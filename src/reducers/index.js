import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import userReducer from './userReducer';
import AuthReducer from './AuthReducer';
import ProfileReducer from './ProfileReducer';
import ProfileFormReducer from './ProfileFormReducer';
import MakePostFormReducer, {
  MakePostFormListConfig,
} from './MakePostFormReducer';
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
import PrivateChatListReducer, {
  PrivateChatListConfig,
} from './PrivateChatListReducer';
import FollowInfoReducer from './FollowInfoReducer';
import UsersListReducer from './UsersListReducer';
import {reducer as network} from 'react-native-offline';
import OfflineActionsReducer, {
  offlineActionsListConfig,
} from './OfflineActionsReducer';
import PrivateChatReducer from './PrivateChatReducer';
import SearchPrivateChatListReducer from './SearchPrivateChatListReducer';
import MeetupFormReducer from './MeetupFormReducer';
import GiphyGalleryReducer from './GiphyGalleryReducer';
import MeetupMainReducer from './MeetupMainReducer';
import MeetupConvListReducer from './MeetupConvListReducer';
import MeetupConversationReducer from './MeetupConversationReducer';
import NotificationReducer from './NotificationReducer';

export default combineReducers({
  user: userReducer,
  auth: AuthReducer,
  profileform: ProfileFormReducer,
  profile: ProfileReducer,
  postform: persistReducer(MakePostFormListConfig, MakePostFormReducer),
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
  privatechatlistform: persistReducer(
    PrivateChatListConfig,
    PrivateChatListReducer,
  ),
  searchprivatechatlist: SearchPrivateChatListReducer,
  meetupform: MeetupFormReducer,
  meetupmain: MeetupMainReducer,
  giphygallery: GiphyGalleryReducer,
  meetupconvlist: MeetupConvListReducer,
  meetupconvs: MeetupConversationReducer,
  privatechatform: PrivateChatReducer,
  followinfo: FollowInfoReducer,
  userslist: UsersListReducer,
  appinfo: AppInfoReducer,
  mynotes: NotificationReducer,
  photogalleryform: PhotoGalleryReducer,
  offlineactionslist: persistReducer(
    offlineActionsListConfig,
    OfflineActionsReducer,
  ),
  network,
});
