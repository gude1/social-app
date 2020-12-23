import { createStore, applyMiddleware } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';

//import { name as appName } from '.././app.json';
import { persistStore, persistReducer, createMigrate } from 'redux-persist';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import migrations from '../migrations';
//import storage from 'redux-persist/es/storage';
const persistConfig = {
    key: 'campusmeetup',
    version: 0,
    storage: AsyncStorage,
    migrate: createMigrate(migrations, { debug: true }),
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
        'followinfo',
        'userslist',
        'offlineactionslist',
        'network'
    ]
};

const pReducer = persistReducer(persistConfig, reducers);
export const store = createStore(pReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
//export { store, persistor };
//persistor.purge();
