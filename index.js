/**
 * @format
 */

import { Navigation } from 'react-native-navigation';
//import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native';
import { store, persistor } from './src/store';
import { persistStore } from 'redux-persist';
import { Provider } from 'react-redux';
import SignupScreen from './src/screens/SignupScreen';
import SigninScreen from './src/screens/SigninScreen';
import EditProfileScreen from './src/screens/main/EditProfileScreen';
import CreatePostScreen from './src/screens/main/CreatePostScreen';
import PhotoListScreen from './src/screens/main/PhotoListScreen';
import PhotoViewerScreen from './src/screens/main/PhotoViewerScreen';
import RouterScreen from './src/screens/RouterScreen';
import HomeScreen from './src/screens/main/HomeScreen';
import GistScreen from './src/screens/main/GistScreen';
import ChatScreen from './src/screens/main/ChatScreen';
import ProfileScreen from './src/screens/main/ProfileScreen';
import ExploreScreen from './src/screens/main/ExploreScreen';
import PostCommentScreen from './src/screens/main/PostCommentScreen';
import LikesListScreen from './src/screens/main/LikesListScreen';
import SharesListScreen from './src/screens/main/SharesListScreen';
import { responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { AUTHROUTE, SETUPROUTE } from './src/routes';
import { useTheme } from './src/assets/themes/index';
import { setRoute } from './src/utilities';
import { getGalleryPhotos } from './src/actions/index';

const { colors } = useTheme();
const setTheDefault = () => {
    Navigation.setDefaultOptions({
        layout: {
            fitSystemWindows: true,
            //orientation: ['landscape']
        },
        statusBar: {
            animate: false,
        },
        topBar: {
            visible: false,
        },
        bottomTab: {
            fontSize: 14,
            textColor: '#606060',
            selectedFontSize: 15,
            iconColor: colors.tabiconcolor,
            fontWeight: "bold",
            selectedTextColor: "#2196F3",
            selectedIconColor: "#2196F3"
        },
        bottomTabs: {
            animate: true,
            //translucent: true,
            drawBehind: true,
            visible: false,//only set to true on mainpage screens
            titleDisplayMode: "alwaysShow",
            //tabsAttachMode: 'afterInitialTab',
            backgroundColor: colors.card,
        },
        statusBar: {
            backgroundColor: colors.statusbar,
            style: colors.statusbartext,
        },
        animations: {
            setRoot: {
                waitForRender: true,
                alpha: {
                    from: 0,
                    to: 1,
                    duration: 0
                },
            },
            push: {
                waitForRender: true,
                content: {
                    alpha: {
                        from: 0,
                        to: 1,
                        duration: 100
                    },
                }
            },
            showModal: {
                waitForRender: true,
                alpha: {
                    from: 0,
                    to: 1,
                    duration: 100
                }
            },
            dismissModal: {
                alpha: {
                    from: 1,
                    to: 0,
                    duration: 100
                }
            }
        }
    });
}

Navigation.events().registerAppLaunchedListener(async () => {
    persistStore(store, null, () => {
        Navigation.registerComponent('Login', () => LoginScreen);
        Navigation.registerComponentWithRedux('Home', () => HomeScreen, Provider, store);
        Navigation.registerComponentWithRedux('Gist', () => GistScreen, Provider, store);
        Navigation.registerComponentWithRedux('Chat', () => ChatScreen, Provider, store);
        Navigation.registerComponentWithRedux('Profile', () => ProfileScreen, Provider, store);
        Navigation.registerComponentWithRedux('Explore', () => ExploreScreen, Provider, store);
        Navigation.registerComponent('Settings', () => SettingsScreen);
        Navigation.registerComponentWithRedux('Yo', () => RouterScreen, Provider, store);
        Navigation.registerComponentWithRedux('Signup', () => SignupScreen, Provider, store);
        Navigation.registerComponentWithRedux('Signin', () => SigninScreen, Provider, store);
        Navigation.registerComponentWithRedux('EditProfile', () => EditProfileScreen, Provider, store);
        Navigation.registerComponentWithRedux('CreatePost', () => CreatePostScreen, Provider, store);
        Navigation.registerComponentWithRedux('PhotoList', () => PhotoListScreen, Provider, store);
        Navigation.registerComponentWithRedux('PhotoViewer', () => PhotoViewerScreen, Provider, store);
        Navigation.registerComponentWithRedux('PostComment', () => PostCommentScreen, Provider, store);
        Navigation.registerComponentWithRedux('LikesList', () => LikesListScreen, Provider, store);
        Navigation.registerComponentWithRedux('SharesList', () => SharesListScreen, Provider, store);
        //Navigation.setRoot(AUTHROUTE);
        store.dispatch(getGalleryPhotos());
        setTheDefault();
        setRoute(store.getState());
    });
});



const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.background
    },
    settings: {
        flex: 1,
        color: "green"
    }
});