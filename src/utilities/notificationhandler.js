import notifee, {
  AndroidGroupAlertBehavior,
  AndroidImportance,
  AndroidStyle,
  AndroidLaunchActivityFlag,
  EventType,
} from '@notifee/react-native';
import {getAppInfo, isEmpty} from '.';
import {persistStore} from 'redux-persist';
import appObj from '../../app.json';
import {Navigation} from 'react-native-navigation';
import AsyncStorage from '@react-native-community/async-storage';

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

export const navNote = (data = {}, store) => {
  try {
    if (
      isEmpty(data) ||
      isEmpty(data?.id) ||
      isEmpty(data?.name) ||
      isEmpty(data?.sender) ||
      isEmpty(store) ||
      store?.getState()?._persist?.rehydrated != true ||
      getAppInfo(store?.getState(), 'user') != 'usertrue' ||
      getAppInfo(store?.getState(), 'profile') != 'profiletrue' ||
      getAppInfo(store?.getState(), 'post') != 'posttrue'
    ) {
      console.warn('navNote', 'validation failed');
      return;
    }
    switch (data.name) {
      case 'PrivateChat':
        Navigation.showModal({
          component: {
            name: 'PrivateChat',
            id: data.id,
            passProps: {
              navparent: true,
              privatechatobj: {
                partnerprofile: data.sender,
                created_chatid: data.created_chatid,
              },
              screentype: 'modal',
            },
          },
        });
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
  } catch (err) {}
};

export const setForegroundEvent = store => {
  try {
    return notifee.onForegroundEvent(async ({type, detail}) => {
      const {notification, pressAction} = detail;
      if (isEmpty(store) || store.getState()._persist.rehydrated != true) {
        await AsyncStorage.setItem(
          'navnote',
          JSON.stringify(notification.data),
        );
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
          console.warn(
            'channel_group_blocked',
            EventType.CHANNEL_GROUP_BLOCKED,
          );
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
    });
  } catch (err) {
    console.log(`setForegroundEvent`, err.toString());
  }
};

export const setBackgroundEvent = async store => {
  try {
    return notifee.onBackgroundEvent(async ({type, detail}) => {
      const {notification, pressAction} = detail;
      if (isEmpty(store) || store.getState()._persist.rehydrated != true) {
        await AsyncStorage.setItem(
          'navnote',
          JSON.stringify(notification.data),
        );
        return;
      }
      console.warn('backgroundevent');
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
          console.warn(
            'channel_group_blocked',
            EventType.CHANNEL_GROUP_BLOCKED,
          );
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
    });
  } catch (err) {
    console.log(`setForegroundEvent`, err.toString());
  }
};

export const sortAndDisplayNote = (data = {}) => {
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
