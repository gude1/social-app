import React, { useEffect, useState } from 'react';
import { Navigation } from 'react-native-navigation';
import { View, Text, StyleSheet, SafeAreaView, } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { LoaderScreen, Header, InputBox, } from '../../components/reusable/ResuableWidgets';
import { Icon, Avatar, Input } from 'react-native-elements';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import { useTheme } from '../../assets/themes/index';
import TouchableScale from 'react-native-touchable-scale';
import { checkData } from '../../utilities/index';
import PostCommentReplyList from '../../components/reusable/PostCommentReplyList';

const { colors } = useTheme();

const PostCommentReplyScreen = ({
    navparent,
    componentId,
    ownercommentid,
    ownerreplyid,
    profile,
    profileimage,
    muteProfileAction,
    profileactionform,
    postcommentreplyform,
    postcommentform,
    fetchPostCommentReply,
    updatePostCommentReplyForm,
    updatePostCommentReplyFormProfileChanges,
    makePostCommentReply,
    likePostCommentReply,
    hidePostCommentReply,
    loadMorePostCommentReply,
    deletePostCommentReply,
    setReset,
}) => {
    let origin = checkData(ownercommentid) ?
        postcommentform.postcomments.find(item => item.commentid == ownercommentid)
        : postcommentreplyform.postcommentreplies.find(item => item.replyid == ownerreplyid)
        ;
    const [loaded, setLoaded] = useState(false);
    const [inputtext, setInputText] = useState('');
    let flatlistref = null;
    let lefticon = navparent == true ? <Icon
        type="evilicon"
        name="arrow-left"
        color={colors.text}
        size={responsiveFontSize(6)}
    /> : null;
    let lefticonpress = navparent == true ? () => Navigation.dismissModal(componentId) : null;
    let righticon = '';
    let righticonpress = '';
    useEffect(() => {
        setReset('postcommentreplyform')// set the replies to empty
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
        };
    }, []);
    /**component functions starts here */
    const setFlatlistRef = (ref) => {
        flatlistref = ref;
    };
    /**component functions ends here */
    return (
        <SafeAreaView style={styles.containerStyle}>
            <Header
                headertext="PostReply"
                headercolor={colors.card}
                lefticon={lefticon}
                leftIconPress={lefticonpress}
                headerTextStyle={{ color: colors.text }}
                headertextsize={responsiveFontSize(2.9)}
            />
            {
                loaded == false ? <LoaderScreen
                    loaderIcon={<Icon
                        type="antdesign"
                        name="message1"
                        color={colors.text}
                        size={responsiveFontSize(10)}
                    />}
                    animationType={'zoomIn'}
                /> : <>
                    <PostCommentReplyList
                        onFetch={fetchPostCommentReply}
                        fetching={postcommentreplyform.fetching}
                        userprofile={profile}
                        profileschanges={postcommentreplyform.profileschanges}
                        updatePostCommentReplyProfile={updatePostCommentReplyFormProfileChanges}
                        updateReply={updatePostCommentReplyForm}
                        userprofile={profile}
                        setFlatlistRef={setFlatlistRef}
                        origin={origin}
                        onItemLike={likePostCommentReply}
                        data={postcommentreplyform.postcommentreplies}
                        onLoadMore={loadMorePostCommentReply}
                        loadingmore={postcommentreplyform.loadmore}
                        onMute={muteProfileAction}
                        muting={profileactionform.mutingprofile}
                        refreshing={postcommentreplyform.refreshing}
                        onHide={hidePostCommentReply}
                        hiding={postcommentreplyform.hiding}
                        onDelete={deletePostCommentReply}
                        deleting={postcommentreplyform.deleting}
                    />
                    <InputBox
                        placeholder={'Post a reply'}
                        onChangeText={setInputText}
                        inputvalue={inputtext}
                        onSubmit={() => {
                            setInputText('');
                            makePostCommentReply(origin.commentid || origin.replyid, inputtext);
                            if (checkData(inputtext)) {
                                flatlistref.scrollToOffset({ offset: 0 })
                            }
                        }}
                        maxLength={300}
                        autoFocus={false}
                        avatar={{ uri: profileimage }}
                    />
                    </>
            }
        </SafeAreaView>
    );
};

PostCommentReplyScreen.options = {
    topBar: {
        visible: false
    }
};

const mapStateToProps = (state) => {
    return {
        profileimage: state.profile.avatarlocal || state.profile.avatarremote,
        profile: state.profile,
        profileactionform: state.profileactionform,
        postcommentform: state.postcommentform,
        postcommentreplyform: state.postcommentreplyform
    }
};

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: colors.background
    },
    parentStyle: {
        flex: 1,
        //borderWidth: 2,
        backgroundColor: colors.background,
    },
});

export default connect(mapStateToProps, actions)(PostCommentReplyScreen);
