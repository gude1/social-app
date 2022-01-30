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
  AndroidStyle,
  AndroidLaunchActivityFlag,
} from '@notifee/react-native';
import {LoaderScreen} from '../../components/reusable/ResuableWidgets';
import {Icon, Text} from 'react-native-elements';
import {Header} from '../../components/reusable/ResuableWidgets';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import OnlineList from '../../components/reusable/OnlineList';
import PostList from '../../components/reusable/PostList';
import OfflineActionsDispatcher from '../../components/reusable/OfflineActionsDispatcher';
import {
  displayNote,
  navNote,
  sortAndDisplayNote,
} from '../../utilities/notificationhandler';
import AsyncStorage from '@react-native-community/async-storage';
import {store} from '../../store';
import {isEmpty} from '../../utilities/index';
import {DEFAULT_NAV_OPTIONS} from '../../utilities/nav';

const {colors} = useTheme();

/*const getConstants = async () => {
    return { statusBarHeight, topBarHeight, bottomTabsHeight } = await Navigation.constants();
}*/

const HomeScreen = ({
  componentId,
  blackListTimelinePost,
  fcmnotes,
  fetchMoreTimelinePost,
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
  updateTimelinePostFormProfileChanges,
  timelinepostform,
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

  /**CONDITIONAL STATEMENTS*/
  if (!loaded) {
    setLoaded(true);
  }

  /**COMPONENT FUNCTIONS */
  useEffect(() => {
    setBottomTabIcons();
    refreshTimelinePost();
    const listener = {
      componentDidAppear: () => {
        Navigation.mergeOptions(componentId, {
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

  async function onDisplayNotification2() {
    let test = await displayNote({
      title: 'elujoba posted an update',
      body: 'CHECK THUS OUT',
      android: {
        largeIcon:
          'https://static2.srcdn.com/wordpress/wp-content/uploads/2021/02/Avatar-studios-Avatar-the-last-airbender-new-movie.jpg?q=50&fit=crop&w=960&h=500&dpr=1.5',
      },
    });
    console.warn('onDisplay2', test);
  }

  async function onDisplayNotification() {
    console.warn(`${Math.random()}`, fcmnotes);
    let test = await sortAndDisplayNote({
      name: 'PrivateChat',
      id: `hagashsajas`,
      data: {
        id: `pchat${privatechatlistform.persistedchatlist[0].created_chatid}`,
        sender: JSON.stringify(
          privatechatlistform.persistedchatlist[0].partnerprofile,
        ),
        name: 'PrivateChat',
      },
      android: {
        style: {
          type: AndroidStyle.MESSAGING,
          person: {
            name: 'John Doe',
            icon:
              'https://static2.srcdn.com/wordpress/wp-content/uploads/2021/02/Avatar-studios-Avatar-the-last-airbender-new-movie.jpg?q=50&fit=crop&w=960&h=500&dpr=1.5',
          },
          messages: [
            {
              text: 'Hey, how are you?',
              timestamp: Date.now() - 600000, // 10 minutes ago
            },
            {
              text:
                'You no see your tacha see wetin she dae do for that video lol',
              timestamp: Date.now() - 600000, // 10 minutes ago
            },
            {
              text: 'Na wa oo :)',
              timestamp: Date.now() - 600000, // 10 minutes ago
            },
          ],
        },
      },
    });
    console.warn('onDisplay1', test);
  }

  async function navigateNote() {
    let navdata = await AsyncStorage.getItem('navnote');
    navdata = !isEmpty(navdata) ? JSON.parse(navdata) : {};
    navNote(navdata, store);
    AsyncStorage.removeItem('navnote');
  }

  async function setBottomTabIcons() {
    Entypo.getImageSource('home', 100).then(e => {
      Navigation.mergeOptions('POST_HOME_SCREEN', {
        bottomTab: {
          icon: e,
        },
        bottomTabs: {
          visible: true,
        },
      });
    });

    Entypo.getImageSource('network', 100).then(e =>
      Navigation.mergeOptions('MEETUP_SCREEN', {
        bottomTab: {
          icon: e,
        },
      }),
    );
    Entypo.getImageSource('chat', 100).then(e =>
      Navigation.mergeOptions('CHAT_SCREEN', {
        bottomTab: {
          icon: e,
        },
        bottomTabs: {
          visible: true,
        },
      }),
    );
    Entypo.getImageSource('user', 100).then(e =>
      Navigation.mergeOptions('VIEW_PROFILE_SCREEN', {
        bottomTab: {
          icon: e,
        },
      }),
    );
  }
  /**COMPONENT FUNCTIONS ENDS HERE */

  return (
    <>
      <OfflineActionsDispatcher />
      <View style={styles.containerStyle}>
        <Header
          headercolor={colors.card}
          headertext="Ello"
          headerTextStyle={{
            fontFamily: 'cursive',
            fontWeight: 'bold',
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
                onPress={() => {
                  onDisplayNotification2();
                  return;
                  Navigation.showModal({
                    component: {
                      name: 'FindUser',
                      passProps: {
                        navparent: true,
                        screentype: 'modal',
                      },
                    },
                  });
                }}
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
      </View>
    </>
  );
};
HomeScreen.options = {
  ...DEFAULT_NAV_OPTIONS,
  topBar: {
    visible: false,
  },
  bottomTabs: {
    visible: true,
  },
  bottomTab: {
    ...DEFAULT_NAV_OPTIONS.bottomTab,
    text: 'Home',
  },
};

const mapStateToProps = state => ({
  //timelineposts: state.timelineposts,
  fcmnotes: state.fcmnotes,
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
