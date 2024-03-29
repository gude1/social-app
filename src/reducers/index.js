import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
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
import TimelinePostFormReducer, {
  TimelinePostFormConfig,
} from './TimelinePostFormReducer';
import PostCommentFormReducer, {
  PostCommentFormListConfig,
} from './PostCommentFormReducer';
import PostCommentReplyFormReducer, {
  PostCommentReplyFormListConfig,
} from './PostCommentReplyFormReducer';
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
import SearchPrivateChatListReducer from './SearchPrivateChatListReducer';
import MeetupFormReducer from './MeetupFormReducer';
import GiphyGalleryReducer from './GiphyGalleryReducer';
import MeetupMainReducer from './MeetupMainReducer';
import MeetupConvListReducer, {
  MeetConvListConfig,
} from './MeetupConvListReducer';
import NotificationReducer from './NotificationReducer';
import FcmNotificationReducer from './FcmNoitificationReducer';
import {LOGOUT} from '../actions/types';
import PostGalleryReducer from './PostGalleryReducer';

const appReducer = combineReducers({
  user: userReducer,
  auth: AuthReducer,
  profileform: ProfileFormReducer,
  profile: ProfileReducer,
  postform: persistReducer(MakePostFormListConfig, MakePostFormReducer),
  postsetting: PostSettingReducer,
  timelinepostform: persistReducer(
    TimelinePostFormConfig,
    TimelinePostFormReducer,
  ),
  postcommentform: persistReducer(
    PostCommentFormListConfig,
    PostCommentFormReducer,
  ),
  postcommentreplyform: persistReducer(
    PostCommentReplyFormListConfig,
    PostCommentReplyFormReducer,
  ),
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
  meetupconvlist: persistReducer(MeetConvListConfig, MeetupConvListReducer),
  followinfo: FollowInfoReducer,
  userslist: UsersListReducer,
  appinfo: AppInfoReducer,
  mynotes: NotificationReducer,
  fcmnotes: FcmNotificationReducer,
  postgallery: PostGalleryReducer,
  photogalleryform: PhotoGalleryReducer,
  offlineactionslist: persistReducer(
    offlineActionsListConfig,
    OfflineActionsReducer,
  ),
  network,
});

const rootReducer = (state, action) => {
  switch (action.type) {
    case LOGOUT:
      AsyncStorage.removeItem('persist:campusmeetup');
      AsyncStorage.removeItem(`persist:${MakePostFormListConfig.key}`);
      AsyncStorage.removeItem(`persist:${MeetConvListConfig.key}`);
      AsyncStorage.removeItem(`persist:${TimelinePostFormConfig.key}`);
      AsyncStorage.removeItem(`persist:${PostCommentFormListConfig.key}`);
      AsyncStorage.removeItem(`persist:${PostCommentReplyFormListConfig.key}`);
      AsyncStorage.removeItem(`persist:${PrivateChatListConfig.key}`);
      AsyncStorage.removeItem(`persist:${offlineActionsListConfig.key}`);

      return appReducer(undefined, action);
      break;
    case 'STRUCTURE_STATE':
      state = {
        ...state,
        privatechatlistform: {
          ...state.privatechatlistform,
          chatlist: state.privatechatlistform.persistedchatlist,
        },
      };
      return appReducer(state, action);
      break;

    default:
      return appReducer(state, action);
      break;
  }
};

export default rootReducer;
