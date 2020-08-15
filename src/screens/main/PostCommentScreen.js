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
import PostCommentList from '../../components/PostCommentList';
import { checkData } from '../../utilities/index';

const { colors } = useTheme();
const PostCommentScreen = ({ navparent,
    componentId,
    ownerpostid,
    timelineposts,
    profileimage,
    setReset,
    postcommentform,
    fetchPostComment,
    makePostComment,
    loadMorePostComment,
    likePostComment,
    refreshPostComment
}) => {
    let ownerpost = timelineposts.find(item => item.postid == ownerpostid);
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
        setReset('postcommentform')// set the comments to empty
        const listener = {
            componentDidAppear: () => {
                if (!loaded) {
                    setLoaded(true);
                }
            },
            componentDidDisappear: () => {
            }

        };
        //console.warn('bold')
        // Register the listener to all events related to our component
        const unsubscribe = Navigation.events().bindComponent(listener, componentId);
        return () => {
            // Make sure to unregister the listener during cleanup
            unsubscribe.remove();
        };
    }, []);
    const setFlatlistRef = (ref) => {
        flatlistref = ref;
    };
    return (

        <SafeAreaView style={styles.containerStyle} >
            <Header
                headertext="Postcomment"
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
                /> :
                    <>
                    <View style={styles.parentStyle}>
                        <PostCommentList
                            onFetch={fetchPostComment}
                            setFlatlistRef={setFlatlistRef}
                            parentpost={ownerpost}
                            data={postcommentform.postcomments}
                            onItemLike={likePostComment}
                            onLoadMore={loadMorePostComment}
                            loadingmore={postcommentform.loadmore}
                            onRefresh={refreshPostComment}
                            refreshing={postcommentform.refreshing}
                            fetching={postcommentform.fetching}
                        />
                    </View>
                    <InputBox
                        placeholder={'Add a comment'}
                        onChangeText={setInputText}
                        inputvalue={inputtext}
                        onSubmit={() => {
                            //flatlistref.scrollToOffset({ offset: 0, animated: true })
                            setInputText('');
                            makePostComment(ownerpost.postid, inputtext);
                            if (checkData(inputtext)) {
                                flatlistref.scrollToIndex({ index: 0 })
                            }
                        }}
                        maxLength={300}
                        autoFocus={false}
                        avatar={{ uri: profileimage }}
                    />
                    </>
            }
        </SafeAreaView >
    );
};

PostCommentScreen.options = {
    topBar: {
        visible: false
    },
};
const mapStateToProps = (state) => {
    return {
        profileimage: state.profile.avatarlocal || state.profile.avatarremote,
        timelineposts: state.timelinepostform.timelineposts,
        postcommentform: state.postcommentform
    }
};


const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: colors.background
    },
    postTextContainer: {
        borderBottomWidth: 0.3,
        borderColor: colors.border
    },
    parentStyle: {
        flex: 1,
        //borderWidth: 2,
        backgroundColor: colors.background,
    },
});

export default connect(mapStateToProps, actions)(PostCommentScreen);
