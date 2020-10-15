import React, { Component, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { useTheme } from '../../assets/themes'
import { Navigation, } from 'react-native-navigation';
import { LoaderScreen } from '../../components/reusable/ResuableWidgets';
import {
    responsiveFontSize, responsiveHeight, responsiveWidth
} from 'react-native-responsive-dimensions';
import { Icon, Text } from 'react-native-elements';
import { Header } from '../../components/reusable/ResuableWidgets';
import PostShowList from '../../components/reusable/PostShowList';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import * as Animatable from 'react-native-animatable';
import { checkData, Toast } from '../../utilities/index';
import { ToastAndroid } from 'react-native';

const { colors } = useTheme();
const PostShowScreen = ({
    componentId,
    profileactionform,
    blackListTimelinePost,
    removeProfileTimeLinePostForm,
    removeProfileTimeLinePost,
    archiveTimelinePost,
    deleteTimelinePost,
    updateTimelinePostForm,
    deleteTimelinePostForm,/*offline*/
    updateTimelinePostProfileChanges,
    setTimelinepostRefresh,
    updateTimelinePostFormProfileChanges,
    likeTimelinePostAction,
    muteProfileAction,
    shareTimelinePostAction,
    toshowpost,
    profile,
    navparent,
    timelinepostform,
    fetchParticularPost,
    screentype
    }) => {
    const [loaded, setLoaded] = useState(false);
    let foreign = false;
    toshowpost = setShowPost();
    let lefticon = navparent == true ? <Icon
        type="evilicon"
        name="arrow-left"
        color={colors.text}
        size={responsiveFontSize(6)}
    /> : null;
    let lefticonpress = navparent == true ? () => setDismissNav() : null;
    let righticon = '';
    let righticonpress = '';
    useEffect(() => {
        if (checkData(toshowpost)) {
            fetchParticularPost(toshowpost.postid);
        } else {
            Toast('cannot show post', null, ToastAndroid.CENTER);
        }
        const listener = {
            componentDidAppear: () => {
                if (!loaded) {
                    setLoaded(true);
                }
            },
            componentDidDisappear: () => {
            }

        };
        // Register the listener to all events related to our component
        const unsubscribe = Navigation.events().bindComponent(listener, componentId);
        return () => {
            // Make sure to unregister the listener during cleanup
            unsubscribe.remove();
            if (foreign && checkData(toshowpost)) {
                deleteTimelinePostForm(toshowpost.postid)
            }
        };
    }, []);
    /**component functions starts here */
    function setShowPost() {
        if (!checkData(toshowpost)) {
            return null;
        } else if (!checkData(toshowpost.postid) || !checkData(toshowpost.profile)) {
            return null;
        }
        let check = timelinepostform.timelineposts.find(item => item.postid == toshowpost.postid);
        if (!checkData(check)) {
            foreign = true;
            updateTimelinePostForm(toshowpost);
            return toshowpost;
        }
        return check;
    }
    //function to determine dismiss of navigation based on screentype
    function setDismissNav() {
        if (screentype != "modal")
            return Navigation.pop(componentId);
        else
            return Navigation.dismissModal(componentId)

    }
    /**component functions ends here */
    return (
        <SafeAreaView style={styles.containerStyle}>
            <Header
                headertext="PostShow"
                headercolor={colors.card}
                lefticon={lefticon}
                leftIconPress={lefticonpress}
                headerTextStyle={{ color: colors.text }}
                headertextsize={responsiveFontSize(2.9)}
            />
            {
                loaded == false ?
                    <LoaderScreen
                        loaderIcon={<Icon
                            type="entypo"
                            name="pencil"
                            color={colors.text}
                            size={responsiveFontSize(10)}
                        />}
                        animationType={'zoomIn'}
                    /> : <>
                    {toshowpost &&
                        <PostShowList
                            data={[toshowpost]}
                            fetching={timelinepostform.fetching}
                            onPostItemLiked={likeTimelinePostAction}
                            onPostItemShared={shareTimelinePostAction}
                            onBlackListPress={blackListTimelinePost}
                            updatePostItem={updateTimelinePostForm}
                            onRefresh={() => {
                                let onrefresh = () => setTimelinepostRefresh(true);
                                let offrefresh = () => setTimelinepostRefresh(false);
                                fetchParticularPost(postid, onrefresh, null, offrefresh);
                            }}
                            onDeletePress={deleteTimelinePost}
                            removeProfilePosts={(id) => {
                                removeProfileTimeLinePost(id);
                                removeProfileTimeLinePostForm(id);
                            }}
                            onArchivePress={archiveTimelinePost}
                            userprofile={profile}
                            profileschanges={timelinepostform.profileschanges}
                            updateProfileChanges={(dataobj) => {
                                updateTimelinePostProfileChanges(dataobj);
                                updateTimelinePostFormProfileChanges(dataobj);
                            }}
                            onBlackListPress={blackListTimelinePost}
                            refreshing={timelinepostform.refreshing}
                            onMuteProfilePress={muteProfileAction}
                            onitemblacklisting={timelinepostform.blacklisting}
                            onitemdeleting={timelinepostform.deleting}
                            onitemarchiving={timelinepostform.archiving}
                            onitemblacklisting={timelinepostform.blacklisting}
                            onitemmuting={profileactionform.mutingprofile}
                        />}
                    </>
            }
        </SafeAreaView>
    );
};
PostShowScreen.options = {
    topBar: {
        visible: false
    },
};

const mapStateToProps = (state) => ({
    timelinepostform: state.timelinepostform,
    profileactionform: state.profileactionform,
    profile: state.profile
});

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: colors.background
    },
});

export default connect(mapStateToProps, actions)(PostShowScreen);
