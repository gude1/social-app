import {Provider} from 'react-redux';
import {Navigation} from 'react-native-navigation';
import {useTheme} from './src/assets/themes/index';
import {store} from './src/store';
import {connect} from 'react-redux';
import * as actions from './src/actions';
import {ReduxNetworkProvider} from 'react-native-offline';
import React, {useEffect, useState} from 'react';

import SignupScreen from './src/screens/SignupScreen';
import SigninScreen from './src/screens/SigninScreen';
import EditProfileScreen from './src/screens/main/EditProfileScreen';
import CreatePostScreen from './src/screens/main/CreatePostScreen';
import PhotoListScreen from './src/screens/main/PhotoListScreen';
import PhotoViewerScreen from './src/screens/main/PhotoViewerScreen';
import HomeScreen from './src/screens/main/HomeScreen';
import MeetupScreen from './src/screens/main/MeetupScreen';
import MeetupFormScreen from './src/screens/main/MeetupFormScreen';
import ViewProfileScreen from './src/screens/main/ViewProfileScreen';
import ExploreScreen from './src/screens/main/ExploreScreen';
import PostCommentScreen from './src/screens/main/PostCommentScreen';
import PostCommentReplyScreen from './src/screens/main/PostCommentReplyScreen';
import PrivateChatListScreen from './src/screens/main/PrivateChatListScreen';
import PostShowScreen from './src/screens/main/PostShowScreen';
import LikesListScreen from './src/screens/main/LikesListScreen';
import SharesListScreen from './src/screens/main/SharesListScreen';
import PostSettingScreen from './src/screens/main/PostSettingScreen';
import FollowInfoScreen from './src/screens/main/FollowInfoScreen';
import FindUserScreen from './src/screens/main/FindUserScreen';
import PrivateChatScreen from './src/screens/main/PrivateChatScreen';
import GiphyGalleryScreen from './src/screens/main/GiphyGalleryScreen.js';
import GiphyViewerScreen from './src/screens/main/GiphyViewerScreen.js';
import MeetupConversationScreen from './src/screens/main/MeetupConversationScreen';
import NotificationScreen from './src/screens/main/NotificationScreen';

const {colors} = useTheme();

const App = ({privatechatlistform}) => {
  return null;
};

Navigation.registerComponent(
  'Home',
  () => props => (
    <Provider store={store}>
      <ReduxNetworkProvider
        pingServerUrl={'http://127.0.0.1:8000/'}
        pingInterval={5000}>
        <HomeScreen {...props} />
      </ReduxNetworkProvider>
    </Provider>
  ),
  () => HomeScreen,
);

Navigation.registerComponent(
  'Meetup',
  () => props => (
    <Provider store={store}>
      <MeetupScreen {...props} />
    </Provider>
  ),
  () => MeetupScreen,
);

Navigation.registerComponent(
  'Chat',
  () => props => (
    <Provider store={store}>
      <PrivateChatListScreen {...props} />
    </Provider>
  ),
  () => PrivateChatListScreen,
);
Navigation.registerComponent(
  'Signup',
  () => props => (
    <Provider store={store}>
      <SignupScreen {...props} />
    </Provider>
  ),
  () => SignupScreen,
);
Navigation.registerComponent(
  'Signin',
  () => props => (
    <Provider store={store}>
      <SigninScreen {...props} />
    </Provider>
  ),
  () => SigninScreen,
);
Navigation.registerComponent(
  'ViewProfile',
  () => props => (
    <Provider store={store}>
      <ViewProfileScreen {...props} />
    </Provider>
  ),
  () => ViewProfileScreen,
);
Navigation.registerComponent(
  'Explore',
  () => props => (
    <Provider store={store}>
      <ExploreScreen {...props} />
    </Provider>
  ),
  () => ExploreScreen,
);
Navigation.setLazyComponentRegistrator(componentName => {
  switch (componentName) {
    case 'EditProfile':
      Navigation.registerComponent(
        'EditProfile',
        () => props => (
          <Provider store={store}>
            <EditProfileScreen {...props} />
          </Provider>
        ),
        () => EditProfileScreen,
      );
      break;
    case 'CreatePost':
      Navigation.registerComponent(
        'CreatePost',
        () => props => (
          <Provider store={store}>
            <CreatePostScreen {...props} />
          </Provider>
        ),
        () => CreatePostScreen,
      );
      break;
    case 'PhotoList':
      Navigation.registerComponent(
        'PhotoList',
        () => props => (
          <Provider store={store}>
            <PhotoListScreen {...props} />
          </Provider>
        ),
        () => PhotoListScreen,
      );
      break;
    case 'PhotoViewer':
      Navigation.registerComponent(
        'PhotoViewer',
        () => props => (
          <Provider store={store}>
            <PhotoViewerScreen {...props} />
          </Provider>
        ),
        () => PhotoViewerScreen,
      );
      break;
    case 'PostComment':
      Navigation.registerComponent(
        'PostComment',
        () => props => (
          <Provider store={store}>
            <PostCommentScreen {...props} />
          </Provider>
        ),
        () => PostCommentScreen,
      );
      break;
    case 'PostCommentReply':
      Navigation.registerComponent(
        'PostCommentReply',
        () => props => (
          <Provider store={store}>
            <PostCommentReplyScreen {...props} />
          </Provider>
        ),
        () => PostCommentReplyScreen,
      );
      break;
    case 'PostShow':
      Navigation.registerComponent(
        'PostShow',
        () => props => (
          <Provider store={store}>
            <PostShowScreen {...props} />
          </Provider>
        ),
        () => PostShowScreen,
      );
      break;
    case 'LikesList':
      Navigation.registerComponent(
        'LikesList',
        () => props => (
          <Provider store={store}>
            <LikesListScreen {...props} />
          </Provider>
        ),
        () => LikesListScreen,
      );
      break;
    case 'SharesList':
      Navigation.registerComponent(
        'SharesList',
        () => props => (
          <Provider store={store}>
            <SharesListScreen {...props} />
          </Provider>
        ),
        () => SharesListScreen,
      );
      break;
    case 'PostSetting':
      Navigation.registerComponent(
        'PostSetting',
        () => props => (
          <Provider store={store}>
            <PostSettingScreen {...props} />
          </Provider>
        ),
        () => PostSettingScreen,
      );
      break;
    case 'FollowInfo':
      Navigation.registerComponent(
        'FollowInfo',
        () => props => (
          <Provider store={store}>
            <FollowInfoScreen {...props} />
          </Provider>
        ),
        () => FollowInfoScreen,
      );
      break;
    case 'FindUser':
      Navigation.registerComponent(
        'FindUser',
        () => props => (
          <Provider store={store}>
            <FindUserScreen {...props} />
          </Provider>
        ),
        () => FindUserScreen,
      );
      break;
    case 'PrivateChat':
      Navigation.registerComponent(
        'PrivateChat',
        () => props => (
          <Provider store={store}>
            <PrivateChatScreen {...props} />
          </Provider>
        ),
        () => PrivateChatScreen,
      );
      break;
    case 'SearchPrivateChatList':
      Navigation.registerComponent(
        'SearchPrivateChatList',
        () => props => (
          <Provider store={store}>
            <SearchPrivateChatListScreen {...props} />
          </Provider>
        ),
        () => SearchPrivateChatListScreen,
      );
      break;
    case 'GiphyGallery':
      Navigation.registerComponent(
        'GiphyGallery',
        () => props => (
          <Provider store={store}>
            <GiphyGalleryScreen {...props} />
          </Provider>
        ),
        () => GiphyGalleryScreen,
      );
      break;
    case 'GiphyViewer':
      Navigation.registerComponent(
        'GiphyViewer',
        () => props => (
          <Provider store={store}>
            <GiphyViewerScreen {...props} />
          </Provider>
        ),
        () => GiphyViewerScreen,
      );
      break;
    case 'MeetupForm':
      Navigation.registerComponent(
        'MeetupForm',
        () => props => (
          <Provider store={store}>
            <MeetupFormScreen {...props} />
          </Provider>
        ),
        () => MeetupFormScreen,
      );
      break;
    case 'MeetupConversation':
      Navigation.registerComponent(
        'MeetupConversation',
        () => props => (
          <Provider store={store}>
            <MeetupConversationScreen {...props} />
          </Provider>
        ),
        () => MeetupConversationScreen,
      );
      break;
    case 'Notification':
      Navigation.registerComponent(
        'Notification',
        () => props => (
          <Provider store={store}>
            <NotificationScreen {...props} />
          </Provider>
        ),
        () => NotificationScreen,
      );
      break;
    default:
      break;
  }
});

const mapStateToProps = state => ({
  privatechatlistform: state.privatechatlistform,
});

export default connect(
  mapStateToProps,
  actions,
)(App);
