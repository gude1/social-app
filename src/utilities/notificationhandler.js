import notifee, {
  AndroidGroupAlertBehavior,
  AndroidImportance,
  AndroidStyle,
  AndroidLaunchActivityFlag,
  EventType,
} from '@notifee/react-native';
import {doDispatch, getAppInfo, isEmpty} from '.';
import {persistStore} from 'redux-persist';
import appObj from '../../app.json';
import {Navigation} from 'react-native-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import {removeFcmNotes} from '../actions';
import {useTheme} from '../assets/themes';
import {setAppData, setAppNav} from '../..';

const {colors} = useTheme();
//GROUP CHANNELS
export const DEFAULT_GROUP_CHANNEL = {
  id: 'defaultnotegroup',
  name: 'Notifcations',
  description: 'Notifications from hello',
};

export const POST_GROUP_CHANNEL = {
  id: 'post',
  name: 'Posts',
  description: 'Notifications from posts',
};

export const POSTCOMMENT_GROUP_CHANNEL = {
  id: 'postcomment',
  name: 'PostComment',
  description: 'Notifications from postcomment',
};

export const POSTCOMMENTREPLY_GROUP_CHANNEL = {
  id: 'postcommentreply',
  name: 'PostCommentReply',
  description: 'Notifications from postcommentreplies',
};

export const MEETCONV_GROUP_CHANNEL = {
  id: 'meetconv',
  name: 'Meet Conversations',
  description: 'Notifications from meet conversations',
};

export const PRIVATECHAT_GROUP_CHANNEL = {
  id: 'privatechat',
  name: 'PrivateChats',
  description: 'Notifications from private chats',
};

//CHANNELS
export const DEFAULT_CHANNEL = {
  id: `${appObj.name}default`,
  name: `notes`,
  sound: 'default',
  importance: AndroidImportance.HIGH,
  badge: true,
};

export const MESSAGE_CHANNEL = {
  ...DEFAULT_CHANNEL,
  id: 'messagechannel',
  name: 'Messages',
};

export const LIKES_CHANNEL = {
  ...DEFAULT_CHANNEL,
  id: 'likechannel',
  name: 'Likes',
};

export const structureNote = notification => {
  if (
    isEmpty(notification) ||
    isEmpty(notification.identity) ||
    isEmpty(notification.name) ||
    isEmpty(notification.sender)
  ) {
    return notification;
  }
  switch (notification.name) {
    case 'PrivateChat':
      return {
        name: notification?.name,
        id: notification?.identity,
        data: {
          id: notification?.identity,
          sender: JSON.stringify(notification?.sender),
          name: notification?.name,
        },
        android: {
          style: {
            type: AndroidStyle.MESSAGING,
            person: {
              name: notification?.sender?.profile_name,
              icon: notification?.sender?.avatar[1],
            },
            messages: [{text: notification.body, timestamp: Date.now()}],
          },
        },
      };
      break;
    case 'MeetConversation':
      return {
        name: notification?.name,
        id: notification?.identity,
        data: {
          id: notification?.identity,
          sender: JSON.stringify(notification?.sender),
          name: notification?.name,
        },
        android: {
          style: {
            type: AndroidStyle.MESSAGING,
            person: {
              name: notification?.sender?.meetup_name,
              icon: notification?.sender?.meetup_avatar,
            },
            messages: [{text: notification.body, timestamp: Date.now()}],
          },
        },
      };
      break;
    default:
      return notification;
      break;
  }
};

export const handleEvent = async (type = '', detail = {}, store = {}) => {
  let state = store?.getState() || {};
  persistStore(store, null, async () => {
    setAppData(store);
  });

  if (isEmpty(detail)) {
    console.warn('handleEvent', 'validation failed');
    return;
  }
  const {notification, pressAction} = detail;
  if (
    isEmpty(store) ||
    state?._persist?.rehydrated != true ||
    state?.appinfo?.routed != true
  ) {
    console.warn('store not ready');
    await AsyncStorage.setItem('navnote', JSON.stringify(notification.data));
    return;
  }
  switch (type) {
    case EventType.ACTION_PRESS:
      console.warn('action_press', EventType.ACTION_PRESS);
      break;
    case EventType.APP_BLOCKED:
      console.warn('app_blocked', EventType.APP_BLOCKED);
      break;
    case EventType.DELIVERED:
      console.warn('deleivered', EventType.DELIVERED);
      break;
    case EventType.CHANNEL_BLOCKED:
      console.warn('channel blocked', EventType.CHANNEL_BLOCKED);
      break;
    case EventType.CHANNEL_GROUP_BLOCKED:
      console.warn('channel_group_blocked', EventType.CHANNEL_GROUP_BLOCKED);
      break;
    case EventType.PRESS:
      navNote(notification.data, store);
      console.warn('press', EventType.PRESS);
      break;
    case EventType.DISMISSED:
      console.warn('dismissed', EventType.DISMISSED);
      break;
    default:
      console.warn('default');
      break;
  }
};

export const navNote = (navdata = {}, store) => {
  try {
    if (
      isEmpty(navdata) ||
      isEmpty(navdata?.id) ||
      isEmpty(navdata?.name) ||
      isEmpty(navdata?.sender) ||
      isEmpty(store) ||
      store?.getState()?._persist?.rehydrated != true ||
      getAppInfo(store?.getState()?.user, 'user') != 'usertrue' ||
      getAppInfo(store?.getState()?.profile, 'profile') != 'profiletrue' ||
      getAppInfo(store?.getState()?.postform, 'post') != 'posttrue'
    ) {
      console.warn('navNote', [
        store?.getState()?._persist?.rehydrated != true,
        getAppInfo(store?.getState()?.user, 'user') != 'usertrue',
        getAppInfo(store?.getState()?.profile, 'profile') != 'profiletrue',
        getAppInfo(store?.getState()?.postform, 'post') != 'posttrue',
      ]);
      return;
    }
    switch (navdata.name) {
      case 'PrivateChat':
        store.dispatch(removeFcmNotes([navdata.id]));
        Navigation.showModal({
          component: {
            name: 'PrivateChat',
            id: navdata.id,
            passProps: {
              navparent: true,
              privatechatobj: {
                partnerprofile: JSON.parse(navdata.sender),
                created_chatid: navdata.created_chatid,
              },
              screentype: 'modal',
            },
          },
        });
        break;
      case 'MeetConversation':
        store.dispatch(removeFcmNotes([navdata.id]));
        Navigation.showModal({
          component: {
            name: 'MeetConversation',
            id: navdata.id,
            passProps: {
              navparent: true,
              privatechatobj: {
                partnerprofile: JSON.parse(navdata.sender),
                created_chatid: navdata.created_chatid,
              },
              screentype: 'modal',
            },
          },
        });
        break;
      case 'PostCommentReply':
        break;
      case 'PostComment':
        break;
      case 'Post':
        break;
      case 'PostCommentReplyLike':
        break;
      case 'PostCommentLike':
        break;
      case 'PostLike':
        break;
      default:
        break;
    }
  } catch (err) {
    console.warn('navNote', String(err));
  }
};

export const setForegroundEvent = store => {
  return notifee.onForegroundEvent(async ({type, detail}) => {
    try {
      handleEvent(type, detail, store);
    } catch (err) {
      console.log(`setForegroundEvent`, err.toString());
    }
  });
};

export const setBackgroundEvent = async store => {
  return notifee.onBackgroundEvent(async ({type, detail}) => {
    console.warn('notifee background');
    try {
      handleEvent(type, detail, store);
    } catch (err) {
      console.log(`setBackgroundEvent`, err.toString());
    }
  });
};

export const sortAndDisplayNote = (data = {}) => {
  if (isEmpty(data) || isEmpty(data.name)) {
    console.warn('sortAndDisplayNote', 'validation failed');
    return;
  }
  switch (data.name) {
    case 'PrivateChat':
      displayNote(data, PRIVATECHAT_GROUP_CHANNEL, MESSAGE_CHANNEL);
      break;
    case 'MeetConversation ':
      displayNote(data, PRIVATECHAT_GROUP_CHANNEL, MESSAGE_CHANNEL);
      break;
    case 'PostCommentReply':
      displayNote(data, POSTCOMMENTREPLY_GROUP_CHANNEL, DEFAULT_CHANNEL);
      break;
    case 'PostComment':
      displayNote(data, POSTCOMMENT_GROUP_CHANNEL, DEFAULT_CHANNEL);
      break;
    case 'Post':
      displayNote(data, POST_GROUP_CHANNEL, DEFAULT_CHANNEL);
      break;
    case 'PostCommentReplyLike':
      displayNote(data, POSTCOMMENTREPLY_GROUP_CHANNEL, LIKES_CHANNEL);
      break;
    case 'PostCommentLike':
      displayNote(data, POSTCOMMENT_GROUP_CHANNEL, LIKES_CHANNEL);
      break;
    case 'PostLike':
      displayNote(data, POST_GROUP_CHANNEL, LIKES_CHANNEL);
      break;
    default:
      displayNote(data);
      break;
  }
};

export async function displayNote(data = {}, groupchannel = {}, channel = {}) {
  try {
    if (isEmpty(data) || typeof data != 'object') {
      return false;
    }
    let grpchnobj = {...DEFAULT_GROUP_CHANNEL, ...groupchannel};
    let chnobj = {...DEFAULT_CHANNEL, ...channel};

    //create a channel group
    const groupChannelId = await notifee.createChannelGroup(grpchnobj);

    // Create a channel
    const channelId = await notifee.createChannel({
      groupId: groupChannelId,
      ...chnobj,
    });

    // Required for iOS
    // See https://notifee.app/react-native/docs/ios/permissions
    await notifee.requestPermission();

    //group summary
    notifee.displayNotification({
      subtitle: grpchnobj.name,
      id: grpchnobj.id,
      android: {
        channelId,
        groupId: groupChannelId,
        showTimestamp: true,
        groupAlertBehavior: AndroidGroupAlertBehavior.SUMMARY,
        pressAction: {
          id: grpchnobj.id,
          launchActivity: 'default',
          launchActivityFlags: [AndroidLaunchActivityFlag.SINGLE_TOP],
        },
        groupSummary: true,
      },
    });

    // Display a notification
    return await notifee.displayNotification({
      ...data,
      android: {
        channelId,
        circularLargeIcon: true,
        showTimestamp: true,
        groupId: groupChannelId,
        groupAlertBehavior: AndroidGroupAlertBehavior.SUMMARY,
        pressAction: {
          id: 'default',
          launchActivity: 'default',
          launchActivityFlags: [AndroidLaunchActivityFlag.SINGLE_TOP],
        },
        ...data?.android,
      },
    });
  } catch (err) {
    console.log(`displayNotification`, err.toString());
  }
}
