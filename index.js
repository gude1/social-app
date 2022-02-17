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
import {
  getGalleryPhotos,
  addDeviceToken,
  setAppInfo,
} from './src/actions/index';
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

export const setAppData = async store => {
  try {
    store.dispatch({type: 'STRUCTURE_STATE'});
    store.dispatch(getGalleryPhotos());
    let actions = await AsyncStorage.getItem('actions');
    // console.warn('actions', actions);
    actions = !isEmpty(actions) ? JSON.parse(actions) : [];

    if (!isEmpty(actions)) {
      actions.forEach(item => {
        doDispatch(store, item);
      });
      AsyncStorage.removeItem('actions');
    }
  } catch (error) {
    console.warn('setAppData', String(error));
  }
};

export const setAppNav = async store => {
  let navdata = await AsyncStorage.getItem('navnote');
  navdata = !isEmpty(navdata) ? JSON.parse(navdata) : {};
  AsyncStorage.removeItem('navnote');
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
  setRoute(store.getState());
  navNote(navdata, store);
};

Navigation.events().registerAppLaunchedListener(async () => {
  persistStore(store, null, async () => {
    setAppData(store);
    setAppNav(store);
  });
});
