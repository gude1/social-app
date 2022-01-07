import messaging from '@react-native-firebase/messaging';

export const setFcm = async () => {
  //Register device with FCM
  if (!messaging().isDeviceRegisteredForRemoteMessages) {
    await messaging().registerDeviceForRemoteMessages();
  }

  //Get the token
  const token = await messaging().getToken();

  messaging().onTokenRefresh(async token => {});

  messaging().onMessage(async remoteMessage => {
    console.warn('onMessage', remoteMessage);
    return;
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

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.warn('setBackgroundMessageHandler', remoteMessage);
  });
};
