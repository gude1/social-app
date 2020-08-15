import React, { Component, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { useTheme } from '../../assets/themes'
import Entypo from 'react-native-vector-icons/Entypo';
import { Navigation, } from 'react-native-navigation';
import {
    responsiveFontSize, responsiveHeight, responsiveWidth
} from 'react-native-responsive-dimensions';
import { LoaderScreen } from '../../components/reusable/ResuableWidgets';
import { Icon, Avatar, Text } from 'react-native-elements';
import { Header } from '../../components/reusable/ResuableWidgets';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import OnlineList from '../../components/reusable/OnlineList';
import * as Animatable from 'react-native-animatable';
import PostList from '../../components/reusable/PostList';
const { colors } = useTheme();
const postwidth = responsiveWidth(90) > 1080 ? 1080 : responsiveWidth(95);
const postheight = responsiveWidth(90) > 1080 ? 1080 : responsiveWidth(95);

const HomeScreen = ({ componentId,
    timelineposts, blackListTimelinePost, fetchMoreTimelinePost, setTimelinePostFormLinks, muteProfileTimelinePost, archiveTimelinePost, deleteTimelinePost, likeTimelinePostAction, shareTimelinePostAction, refreshTimelinePost, setTimelinepostRefresh, fetchTimelinePost, timelinepostform, addTimelinePostForm, updateTimelinePostForm }) => {
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
        Entypo.getImageSource('home', 100).then(e =>
            Navigation.mergeOptions('POST_HOME_SCREEN', {
                bottomTab: {
                    icon: e,
                }
            }));
        const listener = {
            componentDidAppear: () => {
                Navigation.mergeOptions('POST_HOME_SCREEN', {
                    bottomTabs: {
                        visible: true
                    }
                });
            },
            componentDidDisappear: () => {
            }

        };
        start();
        // Register the listener to all events related to our component
        const unsubscribe = Navigation.events().bindComponent(listener, componentId);
        return () => {
            // Make sure to unregister the listener during cleanup
            unsubscribe.remove();
        };
    }, []);

    const start = () => {
        if (timelineposts.timelineposts.length > 0 && timelinepostform.timelineposts.length < 1) {
            addTimelinePostForm(timelineposts.timelineposts);
            setTimelinePostFormLinks(timelineposts.links);
        }
        Navigation.mergeOptions('POST_HOME_SCREEN', {
            bottomTabs: {
                visible: true
            }
        });
        setLoaded(true);
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
        <SafeAreaView style={styles.containerStyle}>
            <Header
                headercolor={colors.card}
                headertext="Campusmeetup"
                headerTextStyle={{
                    fontFamily: 'cursive',
                    fontWeight: 'bold'
                }}
                headertextcolor={colors.text}
                headertextsize={responsiveFontSize(3.8)}
                righticon={righticon}
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
                            <OnlineList status="pending" num={4} />
                        </View>
                        <View style={styles.middleContainer}>
                            <PostList
                                onPostItemLiked={likeTimelinePostAction}
                                onRefresh={refreshTimelinePost}
                                onDeletePress={deleteTimelinePost}
                                onArchivePress={archiveTimelinePost}
                                onBlackListPress={blackListTimelinePost}
                                onMuteProfilePress={muteProfileTimelinePost}
                                onLoadMorePress={fetchMoreTimelinePost}
                                //onReload={refreshTimelinePost}
                                refreshing={timelinepostform.refreshing}
                                onPostItemShared={shareTimelinePostAction}
                                data={timelinepostform.timelineposts}
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
