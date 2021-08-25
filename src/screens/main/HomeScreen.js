import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, } from 'react-native';
import { useTheme } from '../../assets/themes'
import Entypo from 'react-native-vector-icons/Entypo';
import { Navigation, } from 'react-native-navigation';
import {
    responsiveFontSize, responsiveHeight, responsiveWidth
} from 'react-native-responsive-dimensions';
import { LoaderScreen } from '../../components/reusable/ResuableWidgets';
import { Icon, Text } from 'react-native-elements';
import { Header } from '../../components/reusable/ResuableWidgets';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import OnlineList from '../../components/reusable/OnlineList';
import * as Animatable from 'react-native-animatable';
import PostList from '../../components/reusable/PostList';
import OfflineActionsDispatcher from '../../components/reusable/OfflineActionsDispatcher';
import { getFileInfo, rnPath, cpFile } from '../../utilities/index';
import RNFetchBlob from 'rn-fetch-blob';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import moment from 'moment';
import { NOTIFICATION_CHANNEL_ID } from '../../env';

const { colors } = useTheme();

/*const getConstants = async () => {
    return { statusBarHeight, topBarHeight, bottomTabsHeight } = await Navigation.constants();
}*/

const HomeScreen = ({
    componentId,
    setChatPics,
    timelineposts,
    blackListTimelinePost,
    fetchMoreTimelinePost,
    setTimelinePostForm,
    setTimelinePostFormLinks,
    removeProfileTimeLinePost,
    removeProfileTimeLinePostForm,
    privatechatlistform,
    setProcessing,
    muteProfileAction,
    archiveTimelinePost,
    deleteTimelinePost,
    likeTimelinePostAction,
    shareTimelinePostAction,
    refreshTimelinePost,
    profile,
    profileactionform,
    setTimelinepostRefresh,
    setTimelinePostFormProfileChanges,
    updateTimelinePostProfileChanges,
    updateTimelinePostFormProfileChanges,
    fetchTimelinePost,
    timelinepostform,
    addTimelinePostForm,
    updateTimelinePostForm,
}) => {
    let righticon = <Icon
        type="antdesign"
        name="bells"
        color={colors.text}
        size={responsiveFontSize(3.5)}
    />
    let righticon2 = <Icon
        type="antdesign"
        name="search1"
        color={colors.text}
        size={responsiveFontSize(3.5)}
    />
    const [loaded, setLoaded] = useState(false);
    /**compoent function goes here */
    useEffect(() => {
        refreshTimelinePost(() => {
            // console.warn(timelinepostform.timelineposts);
        }, () => {
            start();
        });

        Entypo.getImageSource('home', 100).then(e => {
            Navigation.mergeOptions('POST_HOME_SCREEN', {
                bottomTab: {
                    icon: e,
                }
            });
        });

        Navigation.mergeOptions('POST_HOME_SCREEN', {
            bottomTabs: {
                visible: true
            }
        });
        const listener = {
            componentDidAppear: async () => {
                Navigation.mergeOptions('POST_HOME_SCREEN', {
                    bottomTabs: {
                        visible: true
                    }
                });
                // createTwoButtonAlert();
            },
            componentDidDisappear: () => {
            }

        };
        // Register the listener to all events related to our component
        const unsubscribe = Navigation.events().bindComponent(listener, componentId);
        return () => {
            // Make sure to unregister the listener during cleanup
            unsubscribe.remove();
        };
    }, []);

    /**determines whether to open screen or not */
    if (!loaded) {
        //console.warn('ye');
        setLoaded(true);
    }

    function startOfflineDispatcher() {
        if (privatechatlistform.chatlist.length < privatechatlistform.persistedchatlist.length) {
            return null;
        }
        return <OfflineActionsDispatcher />;

    };

    const start = () => {
        //console.warn(timelineposts);
        if (timelineposts.timelineposts.length > 0 && timelinepostform.timelineposts.length < 1) {
            setTimelinePostForm(timelineposts.timelineposts);
            setTimelinePostFormLinks(timelineposts.links);
            setTimelinePostFormProfileChanges(timelineposts.profileschanges);
        }
    };

    const updatePostItemLiked = (postid) => {
        alert('liked');
        //updateTimelinePostForm({ postid, likedstatus: "pending" });
    }

    const updatePostItemShared = (postid) => {
        alert('shared');
        //updateTimelinePostForm({ postid, sharedstatus: "pending" });
    }


    /**compoent function ends here */
    return (
        <>
        {startOfflineDispatcher()}
        <SafeAreaView style={styles.containerStyle}>
            <Header
                headercolor={colors.card}
                headertext="appname"
                headerTextStyle={{
                    fontFamily: 'cursive',
                    fontWeight: 'bold'
                }}
                headertextcolor={colors.text}
                headertextsize={responsiveFontSize(3.8)}
                righticon={righticon}
                rightIconPress={() => {
                    PushNotification.localNotification({
                        channelId: NOTIFICATION_CHANNEL_ID,
                        showWhen: true,
                        when: new Date().getTime(),
                        largeIconUrl: "https://eportal.oauife.edu.ng/pic.php?image_id=ECN/2016/01320172",
                        bigPictureUrl: "https://eportal.oauife.edu.ng/pic.php?image_id=ECN/2016/02020172",
                        title: `Today 😊`,
                        message: `📷 ${moment().format('LLLL')}`
                    });
                }}
                righticon2={righticon2}
            />
            {
                loaded == false ? <LoaderScreen
                    animationOff={true}
                    showLoading={true}
                    loaderIcon={<Icon
                        type="entypo"
                        name="home"
                        color={colors.text}
                        size={responsiveFontSize(10)}
                    />}
                    animationType={'zoomIn'}
                /> :

                    <View style={styles.contentContainerStyle}>
                        <View style={styles.onlineListContainer}>
                            <OnlineList
                                status="pending"
                                onPress={() => Navigation.showModal({
                                    component: {
                                        name: 'FindUser',
                                        passProps: {
                                            navparent: true,
                                            screentype: 'modal'
                                        },
                                    }
                                })}
                                num={4}
                            />
                        </View>
                        <View style={styles.middleContainer}>
                            <PostList
                                onPostItemLiked={likeTimelinePostAction}
                                onRefresh={() => refreshTimelinePost()}
                                onDeletePress={deleteTimelinePost}
                                setProcessing={setProcessing}
                                onArchivePress={archiveTimelinePost}
                                onBlackListPress={blackListTimelinePost}
                                onMuteProfilePress={muteProfileAction}
                                onLoadMorePress={fetchMoreTimelinePost}
                                userprofile={profile}
                                profileschanges={timelinepostform.profileschanges}
                                updatePostItem={updateTimelinePostForm}
                                updateProfileChanges={(dataobj) => {
                                    updateTimelinePostProfileChanges(dataobj);
                                    updateTimelinePostFormProfileChanges(dataobj);
                                }}
                                removeProfilePosts={(id) => {
                                    removeProfileTimeLinePost(id);
                                    removeProfileTimeLinePostForm(id);
                                }}
                                //onReload={refreshTimelinePost}
                                refreshing={timelinepostform.refreshing}
                                onPostItemShared={shareTimelinePostAction}
                                data={timelinepostform.timelineposts}
                                //data={[]}
                                onitemdeleting={timelinepostform.deleting}
                                onitemarchiving={timelinepostform.archiving}
                                onitemblacklisting={timelinepostform.blacklisting}
                                onitemmuting={timelinepostform.muting}
                                loadingmore={timelinepostform.loadingmore}
                                //loading={timelinepostform.processing}
                                extraData={timelinepostform.timelineposts}
                            />
                        </View>
                    </View>
            }
        </SafeAreaView >
        </>
    );
};
HomeScreen.options = {
    topBar: {
        visible: false
    },
    bottomTabs: {
        // visible: true
    },
    bottomTab: {
        text: 'Home'
    }
};

const mapStateToProps = (state) => ({
    timelineposts: state.timelineposts,
    timelinepostform: state.timelinepostform,
    profileactionform: state.profileactionform,
    privatechatlistform: state.privatechatlistform,
    profile: state.profile
});

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: colors.background
    },
    onlineListContainer: {
        height: 90,
        flexDirection: "row",
        borderBottomColor: colors.border,
        borderBottomWidth: 0.26,
    },
    middleContainer: {
        flex: 1,
        marginBottom: 10,
        //borderWidth: 1,
    },
    contentContainerStyle: {
        flex: 1,
        marginBottom: 50
    }
});

export default connect(mapStateToProps, actions)(HomeScreen);
