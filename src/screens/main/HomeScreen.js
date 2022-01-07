import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {useTheme} from '../../assets/themes';
import Entypo from 'react-native-vector-icons/Entypo';
import {Navigation} from 'react-native-navigation';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import notifee, {
  AndroidGroupAlertBehavior,
  AndroidImportance,
  AndroidLaunchActivityFlag,
} from '@notifee/react-native';
import {LoaderScreen} from '../../components/reusable/ResuableWidgets';
import {Icon, Text} from 'react-native-elements';
import {Header} from '../../components/reusable/ResuableWidgets';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import OnlineList from '../../components/reusable/OnlineList';
import * as Animatable from 'react-native-animatable';
import PostList from '../../components/reusable/PostList';
import OfflineActionsDispatcher from '../../components/reusable/OfflineActionsDispatcher';
import {getFileInfo, rnPath, cpFile} from '../../utilities/index';
import RNFetchBlob from 'rn-fetch-blob';
import messaging from '@react-native-firebase/messaging';
import moment from 'moment';
import {NOTIFICATION_CHANNEL_ID} from '../../env';

const {colors} = useTheme();

/*const getConstants = async () => {
    return { statusBarHeight, topBarHeight, bottomTabsHeight } = await Navigation.constants();
}*/

const HomeScreen = ({
  componentId,
  setChatPics,
  blackListTimelinePost,
  fetchMoreTimelinePost,
  setTimelinePostForm,
  setTimelinePostFormLinks,
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
  updateTimelinePostFormProfileChanges,
  fetchTimelinePost,
  timelinepostform,
  addTimelinePostForm,
  updateTimelinePostForm,
}) => {
  let righticon = (
    <Icon
      type="antdesign"
      name="bells"
      color={colors.text}
      size={responsiveFontSize(3.5)}
    />
  );
  let righticon2 = (
    <Icon
      type="antdesign"
      name="search1"
      color={colors.text}
      size={responsiveFontSize(3.5)}
    />
  );
  const [loaded, setLoaded] = useState(false);
  /**compoent function goes here */
  useEffect(() => {
    refreshTimelinePost();

    Entypo.getImageSource('home', 100).then(e => {
      Navigation.mergeOptions('POST_HOME_SCREEN', {
        bottomTab: {
          icon: e,
        },
      });
    });

    Navigation.mergeOptions('POST_HOME_SCREEN', {
      bottomTabs: {
        visible: true,
      },
    });
    const listener = {
      componentDidAppear: () => {
        Navigation.mergeOptions('POST_HOME_SCREEN', {
          bottomTabs: {
            visible: true,
          },
        });
        // createTwoButtonAlert();
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

  /**determines whether to open screen or not */
  if (!loaded) {
    setLoaded(true);
  }

  function startOfflineDispatcher() {
    if (
      privatechatlistform.chatlist.length <
      privatechatlistform.persistedchatlist.length
    ) {
      return null;
    }
    return <OfflineActionsDispatcher />;
  }

  const updatePostItemLiked = postid => {
    alert('liked');
    //updateTimelinePostForm({ postid, likedstatus: "pending" });
  };

  const updatePostItemShared = postid => {
    alert('shared');
    //updateTimelinePostForm({ postid, sharedstatus: "pending" });
  };

  async function onDisplayNotification2() {
    //create channel group
    const groupChannelId = await notifee.createChannelGroup({
      id: 'posts',
      name: 'new group',
    });

    // Create a channel
    const channelId = await notifee.createChannel({
      id: 'test',
      name: 'Test Channel',
      sound: 'default',
      importance: AndroidImportance.HIGH,
      badge: true,
      groupId: groupChannelId,
    });

    notifee.displayNotification({
      subtitle: 'new',
      id: '334',
      android: {
        channelId,
        groupId: groupChannelId,
        showTimestamp: true,
        groupAlertBehavior: AndroidGroupAlertBehavior.SUMMARY,
        pressAction: {
          id: 'default',
          launchActivity: 'default',
          launchActivityFlags: [AndroidLaunchActivityFlag.SINGLE_TOP],
        },
        groupSummary: true,
      },
    });

    // Display a notification
    await notifee.displayNotification({
      title: String(new Date().getMilliseconds()),
      body: 'Main body content of the notification',
      android: {
        channelId,
        showTimestamp: true,
        groupId: groupChannelId,
        groupAlertBehavior: AndroidGroupAlertBehavior.SUMMARY,
        pressAction: {
          id: 'default',
          launchActivity: 'default',
          launchActivityFlags: [AndroidLaunchActivityFlag.SINGLE_TOP],
        },
      },
    });
  }

  async function onDisplayNotification() {
    //create channel group
    const groupChannelId = await notifee.createChannelGroup({
      id: 'conversations',
      name: 'Conversations',
      description: 'categories all notifications related to chats or messages',
    });

    // Create a channel
    const channelId = await notifee.createChannel({
      id: 'test',
      name: 'Test Channel',
      sound: 'default',
      importance: AndroidImportance.HIGH,
      badge: true,
      groupId: groupChannelId,
    });

    notifee.displayNotification({
      subtitle: 'unread chats',
      id: '164',
      android: {
        channelId,
        groupId: groupChannelId,
        showTimestamp: true,
        groupAlertBehavior: AndroidGroupAlertBehavior.SUMMARY,
        pressAction: {
          id: 'default',
          launchActivity: 'default',
          launchActivityFlags: [AndroidLaunchActivityFlag.SINGLE_TOP],
        },
        groupSummary: true,
      },
    });

    // Display a notification
    await notifee.displayNotification({
      title: String(new Date().getMilliseconds()),
      body: 'Main body content of the notification',
      android: {
        channelId,
        showTimestamp: true,
        groupId: groupChannelId,
        groupAlertBehavior: AndroidGroupAlertBehavior.SUMMARY,
        pressAction: {
          id: 'default',
          launchActivity: 'default',
          launchActivityFlags: [AndroidLaunchActivityFlag.SINGLE_TOP],
        },
      },
    });
  }

  /**compoent function ends here */
  return (
    <>
      {startOfflineDispatcher()}
      <SafeAreaView style={styles.containerStyle}>
        <Header
          headercolor={colors.card}
          headertext="Ello"
          headerTextStyle={{
            fontFamily: 'cursive',
            fontWeight: 'bold',
          }}
          lefticon={<Text style={{color: colors.text}}>Hello</Text>}
          leftIconPress={() => {
            onDisplayNotification2();
          }}
          headertextcolor={colors.text}
          headertextsize={responsiveFontSize(3.8)}
          righticon={righticon}
          rightIconPress={() => {
            onDisplayNotification();
            /*Navigation.showModal({
              component: {
                name: 'Notification',
                passProps: {
                  navparent: true,
                },
              },
            });*/

            /* PushNotification.localNotification({
              channelId: NOTIFICATION_CHANNEL_ID,
              showWhen: true,
              when: new Date().getTime(),
              largeIconUrl:
                'https://eportal.oauife.edu.ng/pic.php?image_id=ECN/2016/01320172',
              bigPictureUrl:
                'https://eportal.oauife.edu.ng/pic.php?image_id=ECN/2016/02020172',
              title: `Today 😊`,
              message: `📷 ${moment().format('LLLL')}`,
              actions: [
                {
                  title: 'Yes',
                  input: true,
                },
              ],
            });*/
          }}
        />
        {loaded == false ? (
          <LoaderScreen
            animationOff={true}
            showLoading={true}
            loaderIcon={
              <Icon
                type="entypo"
                name="home"
                color={colors.text}
                size={responsiveFontSize(10)}
              />
            }
            animationType={'zoomIn'}
          />
        ) : (
          <View style={styles.contentContainerStyle}>
            <View style={styles.onlineListContainer}>
              <OnlineList
                status="pending"
                onPress={() =>
                  Navigation.showModal({
                    component: {
                      name: 'FindUser',
                      passProps: {
                        navparent: true,
                        screentype: 'modal',
                      },
                    },
                  })
                }
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
                updateProfileChanges={dataobj => {
                  updateTimelinePostFormProfileChanges(dataobj);
                }}
                removeProfilePosts={id => {
                  removeProfileTimeLinePostForm(id);
                }}
                refreshing={timelinepostform.refreshing}
                onPostItemShared={shareTimelinePostAction}
                data={timelinepostform.timelineposts}
                onitemdeleting={timelinepostform.deleting}
                onitemarchiving={timelinepostform.archiving}
                onitemblacklisting={timelinepostform.blacklisting}
                onitemmuting={timelinepostform.muting}
                loadingmore={timelinepostform.loadingmore}
                extraData={timelinepostform.timelineposts}
              />
            </View>
          </View>
        )}
      </SafeAreaView>
    </>
  );
};
HomeScreen.options = {
  topBar: {
    visible: false,
  },
  bottomTabs: {
    // visible: true
  },
  bottomTab: {
    text: 'Home',
  },
};

const mapStateToProps = state => ({
  //timelineposts: state.timelineposts,
  timelinepostform: state.timelinepostform,
  profileactionform: state.profileactionform,
  privatechatlistform: state.privatechatlistform,
  profile: state.profile,
});

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: colors.background,
  },
  onlineListContainer: {
    height: 90,
    flexDirection: 'row',
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
    marginBottom: 50,
  },
});

export default connect(
  mapStateToProps,
  actions,
)(HomeScreen);
