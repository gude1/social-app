import AsyncStorage from '@react-native-community/async-storage';
import messaging from '@react-native-firebase/messaging';
import {doDispatch, getAppInfo, isEmpty} from '.';
import {updateFcmNotes} from '../actions';
import {sortAndDisplayNote} from './notificationhandler';

export const setFcmHandler = async store => {
  try {
    //Register device with FCM
    if (!messaging().isDeviceRegisteredForRemoteMessages) {
      await messaging().registerDeviceForRemoteMessages();
    }
    //Get the token
    const token = await messaging().getToken();

    messaging().onTokenRefresh(async token => {});

    messaging().onMessage(async remoteMessage => {
      let signedin = (await AsyncStorage.getItem('signedin')) || null;
      if (isEmpty(store?.getState()) || !signedin) {
        return;
      }
      try {
        let resdata = !isEmpty(remoteMessage.data.resdata)
          ? JSON.parse(remoteMessage.data.resdata)
          : null;
        let notification = !isEmpty(remoteMessage.data.notification)
          ? JSON.parse(remoteMessage.data.notification)
          : null;
        let persistnotes = ['PrivateChat', 'MeetConversation'];
        resdata && doDispatch(store, resdata);

        if (notification && persistnotes.includes(notification.name)) {
          console.warn('yeah message');
          store.dispatch(
            updateFcmNotes([
              {
                identity: notification.identity,
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
        notification && sortAndDisplayNote(notification);
      } catch (err) {
        console.warn('fcm onMessage', err.toString());
      }
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      let delaydispatch = isEmpty(store) || isEmpty(store?.getState());
      let signedin = (await AsyncStorage.getItem('signedin')) || null;
      if (!signedin) {
        return;
      }
      try {
        let resdata = !isEmpty(remoteMessage.data.resdata)
          ? JSON.parse(remoteMessage.data.resdata)
          : null;
        let notification = !isEmpty(remoteMessage.data.notification)
          ? JSON.parse(remoteMessage.data.notification)
          : null;
        let persistnotes = ['PrivateChat', 'MeetConversation'];
        if (delaydispatch) {
          let actions = await AsyncStorage.getItem('actions');
          actions = !isEmpty(actions) ? JSON.parse(actions) : [];
          resdata && actions.push(resdata);
          if (notification && persistnotes.includes(notification.name)) {
            actions.push(
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
          }
          await AsyncStorage.setItem('actions', JSON.stringify(actions));
        } else {
          resdata && doDispatch(store, resdata);
          if (notification && notification.name.includes(persistnotes))
            store.dispatch(
              updateFcmNotes([
                {
                  identity: notification.identity,
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
        sortAndDisplayNote(notification);
      } catch (err) {
        console.warn('fcm BackgroundMessageHandler', err.toString());
      }
    });
  } catch (error) {
    console.warn('setFcmHandler', String(error));
  }
};
