/**
 * @format
 */
import {Navigation} from 'react-native-navigation';
import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import {store, persistor} from './src/store';
import {persistStore} from 'redux-persist';
import {useTheme} from './src/assets/themes/index';
import {setRoute, isEmpty, doDispatch} from './src/utilities';
import {getGalleryPhotos, addDeviceToken} from './src/actions/index';
import AsyncStorage from '@react-native-community/async-storage';
import {
  setBackgroundEvent,
  navNote,
  setForegroundEvent,
} from './src/utilities/notificationhandler';
import {setFcm} from './src/utilities/fcmhandler';
import {App} from './App';
import {DEFAULT_NAV_OPTIONS} from './src/utilities/nav';

const {colors} = useTheme();

setFcm(store);
setForegroundEvent(store);
setBackgroundEvent(store);

Navigation.events().registerAppLaunchedListener(async () => {
  persistStore(store, null, async () => {
    Navigation.registerComponent(
      'App',
      () => props => (
        <Provider store={store}>
          <App {...props} />
        </Provider>
      ),
      () => App,
    );
    Navigation.setDefaultOptions(DEFAULT_NAV_OPTIONS);
    let actions = await AsyncStorage.getItem('actions');
    let navdata = await AsyncStorage.getItem('navnote');
    navdata = !isEmpty(navdata) ? JSON.parse(navdata) : {};
    if (!isEmpty(actions)) {
      actions = JSON.parse(actions);
      actions.forEach(item => {
        doDispatch(store, item);
      });
    }
    store.dispatch(getGalleryPhotos());
    setRoute(store.getState());
    navNote(navdata, store);
    AsyncStorage.removeItem('actions');
    AsyncStorage.removeItem('navnote');
  });
});
