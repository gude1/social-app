/**
 * @format
 */
import {Navigation} from 'react-native-navigation';
//import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {store, persistor} from './src/store';
import {persistStore} from 'redux-persist';
import {Provider} from 'react-redux';
import SignupScreen from './src/screens/SignupScreen';
import SigninScreen from './src/screens/SigninScreen';
import EditProfileScreen from './src/screens/main/EditProfileScreen';
import CreatePostScreen from './src/screens/main/CreatePostScreen';
import PhotoListScreen from './src/screens/main/PhotoListScreen';
import PhotoViewerScreen from './src/screens/main/PhotoViewerScreen';
import RouterScreen from './src/screens/RouterScreen';
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
import SearchPrivateChatListScreen from './src/screens/main/SearchPrivateChatListScreen';
import GiphyGalleryScreen from './src/screens/main/GiphyGalleryScreen';
import GiphyViewerScreen from './src/screens/main/GiphyViewerScreen';
import MeetupConversationScreen from './src/screens/main/MeetupConversationScreen';
import NotificationScreen from './src/screens/main/NotificationScreen';
import {
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {AUTHROUTE, SETUPROUTE} from './src/routes';
import {useTheme} from './src/assets/themes/index';
import {setRoute, isEmpty, doDispatch} from './src/utilities';
import {getGalleryPhotos, addDeviceToken} from './src/actions/index';
import AsyncStorage from '@react-native-community/async-storage';
import {ReduxNetworkProvider} from 'react-native-offline';
import messaging from '@react-native-firebase/messaging';
import {NOTIFICATION_CHANNEL_ID, NOTIFICATION_CHANNEL_NAME} from './src/env';
import {
  setBackgroundEvent,
  setForegroundEvent,
} from './src/utilities/notificationhandler';

const {colors} = useTheme();

setForegroundEvent();

setBackgroundEvent();

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.warn('setBackgroundMessageHandler', remoteMessage);
  let {user} = store.getState();
  try {
    let responseData = !isEmpty(remoteMessage.data.responseData)
      ? JSON.parse(remoteMessage.data.responseData)
      : null;
    if (!isEmpty(remoteMessage.data.notification)) {
      let notification = JSON.parse(remoteMessage.data.notification);
      /* PushNotification.localNotification({
        channelId: NOTIFICATION_CHANNEL_ID,
        showWhen: true,
        when: remoteMessage.sentTime,
        data: responseData,
        title: notification.title || '',
        largeIconUrl: notification.largeIconUrl,
        bigPictureUrl: notification.bigPictureUrl,
        message: notification.body || '',
      });*/
    }
    if (!isEmpty(responseData)) {
      if (isEmpty(user) || isEmpty(user.token)) {
        let actions = await AsyncStorage.getItem('actions');
        actions = !isEmpty(actions) ? JSON.parse(actions) : [];
        actions.push(responseData);
        await AsyncStorage.setItem('actions', JSON.stringify(actions));
      } else {
        doDispatch(store, responseData);
      }
    }
  } catch (err) {
    console.warn('fcm backgroundhandler', err.toString());
  }
});

const setTheDefault = store => {
  let {user} = store.getState();

  //handles remote notification received in foreground
  messaging().onMessage(async remoteMessage => {
    console.warn('onMessage', remoteMessage);
    try {
      let responseData = !isEmpty(remoteMessage.data.responseData)
        ? JSON.parse(remoteMessage.data.responseData)
        : null;
      if (!isEmpty(remoteMessage.data.notification)) {
        let notification = JSON.parse(remoteMessage.data.notification);
        console.warn(notification, remoteMessage);
        /*PushNotification.localNotification({
          channelId: NOTIFICATION_CHANNEL_ID,
          showWhen: true,
          when: remoteMessage.sentTime,
          data: responseData,
          title: notification.title || '',
          largeIconUrl: notification.largeIconUrl,
          bigPictureUrl: notification.bigPictureUrl,
          message: notification.body || '',
        });*/
      }
      if (!isEmpty(responseData)) {
        console.warn('onmessage yeah');
        doDispatch(store, responseData);
      }
    } catch (err) {
      console.warn('fcm onMessage', err.toString());
    }
  });

  //handles  interactions on remote notfication received in quit state
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      //console.warn('getInitialNoti', remoteMessage)
    });

  //handles  interactions on remote notfication received in backgroundS state
  messaging().onNotificationOpenedApp(message => {
    //console.warn('firebase background state', message);
    //alert('firebase background state');
  });

  /*onRegister: function(tokenobj) {
    try {
      if (!isEmpty(user) && isEmpty(user.device_token)) {
        store.dispatch(addDeviceToken());
      } else {
        console.warn('already sent');
      }
    } catch (error) {
      console.warn('PUSH ntification onRegister', error.toString);
    }
  },*/
  /*PushNotification.createChannel(
    {
      channelId: NOTIFICATION_CHANNEL_ID,
      channelName: NOTIFICATION_CHANNEL_NAME,
      channelDescription: 'A channel to test notification',
    },
    created => console.log(`created returned ${created}`),
  );*/

  Navigation.setDefaultOptions({
    layout: {
      fitSystemWindows: true,
      //orientation: ['portrait']
    },
    navigationBar: {
      visible: true,
      backgroundColor: 'black',
    },
    statusBar: {
      animate: false,
    },
    topBar: {
      visible: false,
    },
    content: {
      background: {
        color: colors.background,
      },
    },
    bottomTab: {
      fontSize: 14,
      //textColor: '#606060',
      textColor: colors.text,
      selectedFontSize: 15,
      iconColor: colors.tabiconcolor,
      fontWeight: '200',
      selectedTextColor: '#2196F3',
      selectedIconColor: '#2196F3',
    },
    bottomTabs: {
      animate: true,
      elevation: 2,
      //translucent: true,
      drawBehind: true,
      visible: false, //only set to true on mainpage screens
      titleDisplayMode: 'alwaysShow',
      //tabsAttachMode: 'afterInitialTab',
      backgroundColor: colors.card,
    },
    statusBar: {
      backgroundColor: colors.statusbar,
      style: colors.statusbartext,
    },
    animations: {
      setRoot: {
        waitForRender: true,
        alpha: {
          from: 0,
          to: 1,
          duration: 0,
        },
      },
      push: {
        waitForRender: true,
        content: {
          alpha: {
            from: 0,
            to: 1,
            duration: 100,
          },
        },
      },
      showModal: {
        waitForRender: true,
        alpha: {
          from: 0,
          to: 1,
          duration: 100,
        },
      },
      /*dismissModal: {
                waitForRender: true,
                alpha: {
                    from: 1,
                    to: 0,
                    duration: 100
                }
            }*/
    },
  });
};
Navigation.events().registerAppLaunchedListener(async () => {
  persistStore(store, null, async () => {
    let actions = await AsyncStorage.getItem('actions');
    if (!isEmpty(actions)) {
      actions = JSON.parse(actions);
      actions.forEach(item => {
        doDispatch(store, item);
      });
      AsyncStorage.removeItem('actions');
    }
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
    store.dispatch(getGalleryPhotos());
    setTheDefault(store);
    setRoute(store.getState());
  });
  /* persistStore(store, null, () => {
         //Navigation.registerComponent('Login', () => LoginScreen);
             //Navigation.registerComponentWithRedux('Home', () => HomeScreen, Provider, store);
             Navigation.registerComponentWithRedux('Gist', () => GistScreen, Provider, store);
             Navigation.registerComponentWithRedux('Chat', () => ChatScreen, Provider, store);
             Navigation.registerComponentWithRedux('ViewProfile', () => ViewProfileScreen, Provider, store);
             Navigation.registerComponentWithRedux('Explore', () => ExploreScreen, Provider, store);
             Navigation.registerComponent('Settings', () => SettingsScreen);
             Navigation.registerComponentWithRedux('Yo', () => RouterScreen, Provider, store);
             Navigation.registerComponentWithRedux('Signup', () => SignupScreen, Provider, store);
             //Navigation.registerComponentWithRedux('Signin', () => SigninScreen, Provider, store);
             Navigation.registerComponentWithRedux('EditProfile', () => EditProfileScreen, Provider, store);
             Navigation.registerComponentWithRedux('CreatePost', () => CreatePostScreen, Provider, store);
             Navigation.registerComponentWithRedux('PhotoList', () => PhotoListScreen, Provider, store);
             Navigation.registerComponentWithRedux('PhotoViewer', () => PhotoViewerScreen, Provider, store);
             Navigation.registerComponentWithRedux('PostComment', () => PostCommentScreen, Provider, store);
             Navigation.registerComponentWithRedux('PostCommentReply', () => PostCommentReplyScreen, Provider, store);
             Navigation.registerComponentWithRedux('PostShow', () => PostShowScreen, Provider, store);
             Navigation.registerComponentWithRedux('LikesList', () => LikesListScreen, Provider, store);
             Navigation.registerComponentWithRedux('SharesList', () => SharesListScreen, Provider, store);
             Navigation.registerComponentWithRedux('PostSetting', () => PostSettingScreen, Provider, store);
             //Navigation.setRoot(AUTHROUTE);
             store.dispatch(getGalleryPhotos());
             setTheDefault();
             setRoute(store.getState());
         });*/
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  settings: {
    flex: 1,
    color: 'green',
  },
});
