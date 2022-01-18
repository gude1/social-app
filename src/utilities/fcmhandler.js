import messaging from '@react-native-firebase/messaging';
import {doDispatch, getAppInfo, isEmpty} from '.';
import {updateFcmNotes} from '../actions';
import {sortAndDisplayNote} from './notificationhandler';

export const setFcmHandler = async store => {
  //Register device with FCM
  if (!messaging().isDeviceRegisteredForRemoteMessages) {
    await messaging().registerDeviceForRemoteMessages();
  }

  //Get the token
  const token = await messaging().getToken();

  messaging().onTokenRefresh(async token => {});

  messaging().onMessage(async remoteMessage => {
    if (!isEmpty(store)) {
      return;
    }
    let {user, profile} = store.getState();
    if (
      getAppInfo('user', user) != 'usertrue' ||
      getAppInfo('profile', profile) != 'profiletrue'
    ) {
      return;
    }
    try {
      let resdata = !isEmpty(remoteMessage.data.resdata)
        ? JSON.parse(remoteMessage.data.resdata)
        : null;
      doDispatch(store, resdata);
      if (!isEmpty(remoteMessage.data.notification)) {
        let notification = JSON.parse(remoteMessage.data.notification);
        store.dispatch(
          updateFcmNotes([
            {
              identity: notification.identity,
              receiver: notification.receiver_profile,
              notes: [
                {
                  id: notification.id,
                  note_id: notification.note_id,
                  name: notification.name,
                  body: notification.body,
                },
              ],
            },
          ]),
        );
        sortAndDisplayNote({
          id: notification.id,
          name: notification.name,
          body: notification.body,
        });
      }
    } catch (err) {
      console.warn('fcm onMessage', err.toString());
    }
  });

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.warn('setBackgroundMessageHandler', remoteMessage);
  });
};
