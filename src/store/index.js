import {createStore, applyMiddleware} from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import {persistStore, persistReducer, createMigrate} from 'redux-persist';
import thunk from 'redux-thunk';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import migrations from '../migrations';
import rootReducer from '../reducers';

const persistConfig = {
  key: 'campusmeetup',
  version: 0,
  storage: AsyncStorage,
  migrate: createMigrate(migrations, {debug: true}),
  stateReconciler: autoMergeLevel2,
  blacklist: [
    'auth',
    'profileform',
    'postform',
    'photogalleryform',
    'timelinepostform',
    'postcommentform',
    'postcommentreplyform',
    'likeslistform',
    'shareslistform',
    'profileactionform',
    'userviewprofileform',
    'othersviewprofileform',
    'privatechatlistform',
    'privatechatform',
    'meetupconvlist',
    'followinfo',
    'userslist',
    'offlineactionslist',
    'searchprivatechatlist',
    'giphygallery',
  ],
};
const pReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(pReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
//export { store, persistor };
//persistor.purge();
