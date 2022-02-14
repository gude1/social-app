import AsyncStorage from '@react-native-community/async-storage';
import {persistStore} from 'redux-persist';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import {doDispatch, getAppInfo, isEmpty} from '.';
import {updateFcmNotes} from '../actions';
import {sortAndDisplayNote, structureNote} from './notificationhandler';
import {setAppData} from '../../index';

const fcmHandler = async (remoteMessage, store) => {
  persistStore(store, null, async () => {
    setAppData(store);
  });

  let delaydispatch =
    isEmpty(store) || store?.getState()?._persist?.rehydrated != true;
  let signedin = (await AsyncStorage.getItem('signedin')) || null;
  if (!signedin) {
    return;
  }

  let resdata = !isEmpty(remoteMessage.data.resdata)
    ? JSON.parse(remoteMessage.data.resdata)
    : null;
  let notification = !isEmpty(remoteMessage.data.notification)
    ? JSON.parse(remoteMessage.data.notification)
    : null;
  let structured_note = structureNote(notification, resdata);
  let persistnotes = ['PrivateChat', 'MeetConversation'];

  if (delaydispatch) {
    let actions = await AsyncStorage.getItem('actions');
    actions = !isEmpty(actions) ? JSON.parse(actions) : [];
    !isEmpty(resdata) && actions.push(resdata);
    if (notification && persistnotes.includes(notification.name)) {
      let data = [
        {
          identity: notification.identity,
          name: notification.name,
          sender: notification.sender,
          notes: [
            {
              id: notification.id,
              note_id: notification.note_id,
              body: notification.body,
            },
          ],
        },
      ];
      actions.push(updateFcmNotes(data, false));
    }
    await AsyncStorage.setItem('actions', JSON.stringify(actions));
  } else {
    !isEmpty(resdata) && doDispatch(store, resdata);
    if (notification && persistnotes.includes(notification.name)) {
      store.dispatch(
        updateFcmNotes([
          {
            identity: notification.identity,
            name: notification.name,
            sender: notification.sender,
            notes: [
              {
                id: notification.id,
                note_id: notification.note_id,
                body: notification.body,
              },
            ],
          },
        ]),
      );
      return;
    }
  }
  sortAndDisplayNote(structured_note);
};

export const setFcm = async store => {
  try {
    //set background message handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.warn('setBackgroundMessageHandler');
      try {
        fcmHandler(remoteMessage, store);
      } catch (err) {
        console.warn('fcm BackgroundMessageHandler', err.toString());
      }
    });

    //set foreground message handler
    messaging().onMessage(async remoteMessage => {
      console.warn('onmessage');
      try {
        fcmHandler(remoteMessage, store);
      } catch (err) {
        console.warn('fcm onMessageHandler', err.toString());
      }
    });

    //Register device with FCM
    if (!messaging().isDeviceRegisteredForRemoteMessages) {
      await messaging().registerDeviceForRemoteMessages();
    }
    //Get the token
    const token = await messaging().getToken();

    messaging().onTokenRefresh(async token => {
      console.warn('onTokenRefresh', token);
    });
  } catch (error) {
    console.warn('setFcm', String(error));
  }
};
