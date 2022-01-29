import React, {useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView, View} from 'react-native';
import {Icon, Button} from 'react-native-elements';
import {Header} from '../../components/reusable/ResuableWidgets';
import {LoaderScreen} from '../../components/reusable/ResuableWidgets';
import {useTheme} from '../../assets/themes';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {Navigation} from 'react-native-navigation';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import PrivateChatList from '../../components/reusable/PrivateChatList';
import {DEFAULT_NAV_OPTIONS} from '../../utilities/nav';
//import OfflineActionsDispatcher from '../../components/reusable/OfflineActionsDispatcher';

const {colors} = useTheme();

const PrivateChatListScreen = ({
  componentId,
  privatechatlistform,
  updatePrivateChatList,
  fetchPrivateChatList,
  fetchMoreChatList,
  pinPrivateChatList,
  unPinPrivateChatList,
  delPrivateChatList,
  addPrivateChatList,
  profile,
}) => {
  const [loaded, setLoaded] = useState(false);
  let requestmade = false;
  let righticon = (
    <Icon
      type="antdesign"
      name="plus"
      style={{
        borderWidth: 2,
        padding: 2,
        borderRadius: 10,
        borderColor: colors.text,
      }}
      color={colors.text}
      size={responsiveFontSize(2.5)}
    />
  );
  let righticonpress = () =>
    Navigation.showModal({
      component: {
        name: 'FindUser',
        passProps: {
          navparent: true,
          screentype: 'modal',
        },
      },
    });
  let righticon2 = (
    <Icon
      type="antdesign"
      name="search1"
      color={colors.text}
      size={responsiveFontSize(3.5)}
    />
  );
  let righticon2press = () =>
    Navigation.showModal({
      component: {
        name: 'SearchPrivateChatList',
        passProps: {
          navparent: true,
          screentype: 'modal',
        },
      },
    });

  /**conditonal statments */
  if (!loaded) {
    setLoaded(true);
  }
  /**compoent function goes here */
  useEffect(() => {
    EntypoIcon.getImageSource('chat', 100).then(e =>
      Navigation.mergeOptions(componentId, {
        bottomTab: {
          icon: e,
        },
        bottomTabs: {
          visible: true,
        },
      }),
    );

    if (
      privatechatlistform.chatlist.length < 1 &&
      privatechatlistform.persistedchatlist.length > 0
    ) {
      updatePrivateChatList({chatlist: privatechatlistform.persistedchatlist});
    }
    fetchPrivateChatList();

    const listener = {
      componentDidAppear: () => {
        Navigation.mergeOptions(componentId, {
          bottomTabs: {
            visible: true,
          },
        });
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

  //function to determine dismiss of navigation based on screentype
  function setDismissNav() {
    if (screentype == 'modal') return Navigation.dismissModal(componentId);
    else return Navigation.pop(componentId);
  }

  const renderView = () => {
    if (loaded == false) {
      return (
        <LoaderScreen
          animationOff={true}
          loaderIcon={
            <Icon
              type="entypo"
              name="chat"
              color={colors.text}
              size={responsiveFontSize(8)}
            />
          }
          animationType={'zoomIn'}
        />
      );
    } else if (loaded == true) {
      return (
        <View style={styles.contentContainerStyle}>
          <PrivateChatList
            chatlistform={privatechatlistform}
            fetchList={fetchPrivateChatList}
            fetchMoreList={fetchMoreChatList}
            deletePrivateChatList={delPrivateChatList}
            pinPrivateChatList={pinPrivateChatList}
            unPinPrivateChatList={unPinPrivateChatList}
            userprofile={profile}
          />
        </View>
      );
    }
  };
  /**compoent function ends here */
  return (
    <SafeAreaView style={styles.containerStyle}>
      <Header
        headertext="PrivateChat"
        headercolor={colors.card}
        headerTextStyle={{color: colors.text}}
        headerStyle={{elevation: 1}}
        headertextsize={responsiveFontSize(2.9)}
        righticon={righticon}
        rightIconPress={righticonpress}
        righticon2={righticon2}
        rightIcon2Press={righticon2press}
      />
      {renderView()}
    </SafeAreaView>
  );
};
PrivateChatListScreen.options = {
  ...DEFAULT_NAV_OPTIONS,
  topBar: {
    visible: false,
  },
  bottomTabs: {
    ...DEFAULT_NAV_OPTIONS.bottomTabs,
    visible: true,
  },
  bottomTab: {
    ...DEFAULT_NAV_OPTIONS.bottomTab,
    text: 'Chat',
  },
};

const mapStateToProps = state => ({
  profile: state.profile,
  privatechatlistform: state.privatechatlistform,
  offlineactions: state.offlineactionslist,
});
const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainerStyle: {
    flex: 1,
    marginTop: 5,
    marginBottom: 55,
    backgroundColor: colors.background,
  },
});

export default connect(
  mapStateToProps,
  actions,
)(PrivateChatListScreen);
