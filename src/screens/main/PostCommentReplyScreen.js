import React, {useEffect, useState} from 'react';
import {Navigation} from 'react-native-navigation';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import {
  LoaderScreen,
  Header,
  InputBox,
} from '../../components/reusable/ResuableWidgets';
import {Icon, Avatar, Input} from 'react-native-elements';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useTheme} from '../../assets/themes/index';
import TouchableScale from 'react-native-touchable-scale';
import {checkData} from '../../utilities/index';
import PostCommentReplyList from '../../components/reusable/PostCommentReplyList';

const {colors} = useTheme();

const PostCommentReplyScreen = ({
  navparent,
  componentId,
  ownercomment,
  replies,
  profile,
  makerequest,
  muteProfileAction,
  profileactionform,
  postcommentreplyform,
  screentype,
  fetchPostCommentReply,
  setProcessing,
  setPostCommentReplyFormOwnerComment,
  setPostCommentReplyForm,
  updatePostCommentReplyForm,
  updatePostCommentReplyFormProfileChanges,
  makePostCommentReply,
  likePostCommentReply,
  hidePostCommentReply,
  loadMorePostCommentReply,
  refreshPostCommentReply,
  deletePostCommentReply,
  setReset,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [inputtext, setInputText] = useState('');
  let flatlistref = null;
  let lefticon =
    navparent == true ? (
      <Icon
        type="evilicon"
        name="arrow-left"
        color={colors.text}
        size={responsiveFontSize(6)}
      />
    ) : null;
  let lefticonpress = navparent == true ? () => setDismissNav() : null;
  let righticon = '';
  let righticonpress = '';

  /**component functions starts here */
  useEffect(() => {
    setReset('postcommentreplyform'); // set the replies to empty
    setPostCommentReplyFormOwnerComment(ownercomment);
    setPostCommentReplyForm(replies || []);
    if (makerequest != false) {
      fetchPostCommentReply(ownercomment.commentid);
    }
    const listener = {
      componentDidAppear: () => {
        if (!loaded) {
          setLoaded(true);
        }
      },
      componentDidDisappear: () => {},
    };
    // Register the listener to all events related to our component
    const unsubscribe = Navigation.events().bindComponent(
      listener,
      componentId,
    );
    return () => {
      // Make sure to unregister the listener during cleanup
      unsubscribe.remove();
    };
  }, []);
  const setFlatlistRef = ref => {
    flatlistref = ref;
  };

  //function to determine dismiss of navigation based on screentype
  function setDismissNav() {
    if (screentype == 'screen') return Navigation.pop(componentId);
    else return Navigation.dismissModal(componentId);
  }

  function renderView() {
    if (!loaded) {
      return (
        <LoaderScreen
          loaderIcon={
            <Icon
              type="antdesign"
              name="message1"
              color={colors.text}
              size={responsiveFontSize(10)}
            />
          }
          animationType={'zoomIn'}
        />
      );
    } else if (
      !checkData(postcommentreplyform.ownercomment) ||
      !checkData(postcommentreplyform.ownercomment.profile) ||
      !checkData(postcommentreplyform.ownercomment.profile.user) ||
      !Array.isArray(postcommentreplyform.postcommentreplies)
    ) {
      setDismissNav();
    } else {
      return (
        <>
          <PostCommentReplyList
            onFetch={fetchPostCommentReply}
            fetching={postcommentreplyform.fetching}
            userprofile={profile}
            profileschanges={postcommentreplyform.profileschanges}
            updatePostCommentReplyProfile={
              updatePostCommentReplyFormProfileChanges
            }
            updateReply={updatePostCommentReplyForm}
            setFlatlistRef={setFlatlistRef}
            origin={postcommentreplyform.ownercomment}
            onItemLike={likePostCommentReply}
            data={postcommentreplyform.postcommentreplies}
            onLoadMore={loadMorePostCommentReply}
            loadingmore={postcommentreplyform.loadmore}
            onMute={muteProfileAction}
            setProcessing={setProcessing}
            muting={postcommentreplyform.muting}
            onRefresh={refreshPostCommentReply}
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
              makePostCommentReply(ownercomment.commentid, inputtext);
              if (checkData(inputtext)) {
                flatlistref.scrollToOffset({offset: 0});
              }
            }}
            maxLength={300}
            autoFocus={false}
            avatar={{uri: profile.avatar[1]}}
          />
        </>
      );
    }
  }

  /**component functions ends here */
  return (
    <SafeAreaView style={styles.containerStyle}>
      <Header
        headertext="PostCommentReply"
        headercolor={colors.card}
        lefticon={lefticon}
        leftIconPress={lefticonpress}
        headerTextStyle={{color: colors.text}}
        headertextsize={responsiveFontSize(2.9)}
      />
      {renderView()}
    </SafeAreaView>
  );
};

PostCommentReplyScreen.options = {
  topBar: {
    visible: false,
  },
};

const mapStateToProps = state => {
  return {
    profile: state.profile,
    profileactionform: state.profileactionform,
    postcommentreplyform: state.postcommentreplyform,
  };
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: colors.background,
  },
  parentStyle: {
    flex: 1,
    //borderWidth: 2,
    backgroundColor: colors.background,
  },
});

export default connect(
  mapStateToProps,
  actions,
)(PostCommentReplyScreen);
