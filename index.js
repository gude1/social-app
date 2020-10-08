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
import PrivateChatScreen from './src/screens/main/PrivateChatScreen';
import ViewProfileScreen from './src/screens/main/ViewProfileScreen';
import ExploreScreen from './src/screens/main/ExploreScreen';
import PostCommentScreen from './src/screens/main/PostCommentScreen';
import PostCommentReplyScreen from './src/screens/main/PostCommentReplyScreen';
import PostShowScreen from './src/screens/main/PostShowScreen';
import LikesListScreen from './src/screens/main/LikesListScreen';
import SharesListScreen from './src/screens/main/SharesListScreen';
import PostSettingScreen from './src/screens/main/PostSettingScreen';
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
        content: {
            background: {
                color: colors.theme
            }
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
        Navigation.registerComponent('Home', () => (props) =>
            <Provider store={store}>
                <HomeScreen {...props} />
            </Provider>,
            () => HomeScreen
        );
        Navigation.registerComponent('Gist', () => (props) =>
            <Provider store={store}>
                <GistScreen {...props} />
            </Provider>,
            () => GistScreen
        );
        Navigation.registerComponent('Chat', () => (props) =>
            <Provider store={store}>
                <PrivateChatScreen {...props} />
            </Provider>,
            () => PrivateChatScreen
        );
        Navigation.registerComponent('Signup', () => (props) =>
            <Provider store={store}>
                <SignupScreen {...props} />
            </Provider>,
            () => SignupScreen
        );
        Navigation.registerComponent('Signin', () => (props) =>
            <Provider store={store}>
                <SigninScreen {...props} />
            </Provider>,
            () => SigninScreen
        );
        Navigation.registerComponent('ViewProfile', () => (props) =>
            <Provider store={store}>
                <ViewProfileScreen {...props} />
            </Provider>,
            () => ViewProfileScreen
        );
        Navigation.registerComponent('Explore', () => (props) =>
            <Provider store={store}>
                <ExploreScreen {...props} />
            </Provider>,
            () => ExploreScreen
        );
        Navigation.setLazyComponentRegistrator(componentName => {
            switch (componentName) {
                /*case 'Gist':
                    Navigation.registerComponent('Gist', () => (props) =>
                        <Provider store={store}>
                            <GistScreen {...props} />
                        </Provider>,
                        () => GistScreen
                    );
                    break;
                case 'Chat':
                    Navigation.registerComponent('Chat', () => (props) =>
                        <Provider store={store}>
                            <ChatScreen {...props} />
                        </Provider>,
                        () => ChatScreen
                    );
                    break;
                case 'ViewProfile':
                    Navigation.registerComponent('ViewProfile', () => (props) =>
                        <Provider store={store}>
                            <ViewProfileScreen {...props} />
                        </Provider>,
                        () => ViewProfileScreen
                    );
                    break;
                case 'Explore':
                    Navigation.registerComponent('Explore', () => (props) =>
                        <Provider store={store}>
                            <ExploreScreen {...props} />
                        </Provider>,
                        () => ExploreScreen
                    );
                    break;
                case 'Signup':
                    Navigation.registerComponent('Signup', () => (props) =>
                        <Provider store={store}>
                            <SignupScreen {...props} />
                        </Provider>,
                        () => SignupScreen
                    );
                    break;
                case 'Signin':
                    Navigation.registerComponent('Signin', () => (props) =>
                        <Provider store={store}>
                            <SigninScreen {...props} />
                        </Provider>,
                        () => SigninScreen
                    );
                    break;*/
                case 'EditProfile':
                    Navigation.registerComponent('EditProfile', () => (props) =>
                        <Provider store={store}>
                            <EditProfileScreen {...props} />
                        </Provider>,
                        () => EditProfileScreen
                    );
                    break;
                case 'CreatePost':
                    Navigation.registerComponent('CreatePost', () => (props) =>
                        <Provider store={store}>
                            <CreatePostScreen {...props} />
                        </Provider>,
                        () => CreatePostScreen
                    );
                    break;
                case 'PhotoList':
                    Navigation.registerComponent('PhotoList', () => (props) =>
                        <Provider store={store}>
                            <PhotoListScreen {...props} />
                        </Provider>,
                        () => PhotoListScreen
                    );
                    break;
                case 'PhotoViewer':
                    Navigation.registerComponent('PhotoViewer', () => (props) =>
                        <Provider store={store}>
                            <PhotoViewerScreen {...props} />
                        </Provider>,
                        () => PhotoViewerScreen
                    );
                    break;
                case 'PostComment':
                    Navigation.registerComponent('PostComment', () => (props) =>
                        <Provider store={store}>
                            <PostCommentScreen {...props} />
                        </Provider>,
                        () => PostCommentScreen
                    );
                    break;
                case 'PostCommentReply':
                    Navigation.registerComponent('PostCommentReply', () => (props) =>
                        <Provider store={store}>
                            <PostCommentReplyScreen {...props} />
                        </Provider>,
                        () => PostCommentReplyScreen
                    );
                    break;
                case 'PostShow':
                    Navigation.registerComponent('PostShow', () => (props) =>
                        <Provider store={store}>
                            <PostShowScreen {...props} />
                        </Provider>,
                        () => PostShowScreen
                    );
                    break;
                case 'LikesList':
                    Navigation.registerComponent('LikesList', () => (props) =>
                        <Provider store={store}>
                            <LikesListScreen {...props} />
                        </Provider>,
                        () => LikesListScreen
                    );
                    break;
                case 'SharesList':
                    Navigation.registerComponent('SharesList', () => (props) =>
                        <Provider store={store}>
                            <SharesListScreen {...props} />
                        </Provider>,
                        () => SharesListScreen
                    );
                    break;
                case 'PostSetting':
                    Navigation.registerComponent('PostSetting', () => (props) =>
                        <Provider store={store}>
                            <PostSettingScreen {...props} />
                        </Provider>,
                        () => PostSettingScreen
                    );
                    break;
                default:
                    break;
            }
        });
        store.dispatch(getGalleryPhotos());
        setTheDefault();
        setRoute(store.getState());
    });
    /* persistStore(store, null, () => {
         //Navigation.registerComponent('Login', () => LoginScreen);
             //Navigation.registerComponentWithRedux('Home', () => HomeScreen, Provider, store);
             Navigation.registerComponentWithRedux('Gist', () => GistScreen, Provider, store);
             Navigation.registerComponentWithRedux('Chat', () => ChatScreen, Provider, store);
             Navigation.registerComponentWithRedux('ViewProfile', () => ViewProfileScreen, Provider, store);
             Navigation.registerComponentWithRedux('Explore', () => ExploreScreen, Provider, store);
             Navigation.registerComponent('Settings', () => SettingsScreen);
             Navigation.registerComponentWithRedux('Yo', () => RouterScreen, Provider, store);
             Navigation.registerComponentWithRedux('Signup', () => SignupScreen, Provider, store);
             //Navigation.registerComponentWithRedux('Signin', () => SigninScreen, Provider, store);
             Navigation.registerComponentWithRedux('EditProfile', () => EditProfileScreen, Provider, store);
             Navigation.registerComponentWithRedux('CreatePost', () => CreatePostScreen, Provider, store);
             Navigation.registerComponentWithRedux('PhotoList', () => PhotoListScreen, Provider, store);
             Navigation.registerComponentWithRedux('PhotoViewer', () => PhotoViewerScreen, Provider, store);
             Navigation.registerComponentWithRedux('PostComment', () => PostCommentScreen, Provider, store);
             Navigation.registerComponentWithRedux('PostCommentReply', () => PostCommentReplyScreen, Provider, store);
             Navigation.registerComponentWithRedux('PostShow', () => PostShowScreen, Provider, store);
             Navigation.registerComponentWithRedux('LikesList', () => LikesListScreen, Provider, store);
             Navigation.registerComponentWithRedux('SharesList', () => SharesListScreen, Provider, store);
             Navigation.registerComponentWithRedux('PostSetting', () => PostSettingScreen, Provider, store);
             //Navigation.setRoot(AUTHROUTE);
             store.dispatch(getGalleryPhotos());
             setTheDefault();
             setRoute(store.getState());
         });*/
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