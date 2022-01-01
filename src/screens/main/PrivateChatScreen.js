import React, {useEffect, useState} from 'react';
import {Navigation} from 'react-native-navigation';
import {StyleSheet, View, Alert, SafeAreaView} from 'react-native';
import {
  responsiveWidth,
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import * as actions from '../../actions';
import {connect} from 'react-redux';
import {useTheme} from '../../assets/themes/index';
import {Icon, Avatar, Text, Button} from 'react-native-elements';
import {
  HeaderWithImage,
  ModalList,
  ActivityOverlay,
  InputBox,
  ScrollableListOverLay,
  PanelMsg,
  LoaderScreen,
} from '../../components/reusable/ResuableWidgets';
import PrivateChats from '../../components/reusable/PrivateChats';
import {checkData, Toast, formatDate, isEmpty} from '../../utilities/index';

const {colors} = useTheme();

const PrivateChatScreen = ({
  componentId,
  connected,
  setPrivateChatToRead,
  delPrivateChatList,
  sendPrivateChat,
  deleteAPrivateChat,
  updatePrivateChatListArr,
  updatePrivateChatList,
  getPrivateChatInfo,
  privatechatlistform,
  blockProfileAction,
  fetchPrivateChats,
  setReset,
  authprofile,
  privatechatobj,
}) => {
  /**CONDITIONAL STATEMENT STARTS HERE */
  if (!startScreen()) {
    Navigation.dismissModal(componentId);
    return null;
  }
  /**CONDITIONAL STATEMENT ENDS HERE */
  let chatlistitem = privatechatlistform.chatlist.find(
    listitem =>
      listitem?.partnerprofile?.profile_id ==
      privatechatobj?.partnerprofile?.profile_id,
  );
  chatlistitem = isEmpty(chatlistitem)
    ? {
        chats: [],
        partnerprofile: privatechatobj.partnerprofile,
        created_chatid: privatechatobj.created_chatid,
        first_id: privatechatobj.first_id,
        last_id: privatechatobj.last_id,
      }
    : chatlistitem;
  // console.warn(chatlistitem.partnerprofile);
  const [loaded, setLoaded] = useState(false);
  const [screenstate, setScreenState] = useState({
    privatechatinfo: null,
    msgcount: 10,
    fetchingchatinfo: false,
    deleting: false,
    loadingmore: false,
  });
  const [chatinfovisible, setChatInfoVisible] = useState(false);
  const [flatlistref, setFlatListRef] = useState(null);
  const [inputtxt, setInputTxt] = useState('');
  const [showactivitymodal, setShowActivityModal] = useState(false);
  const [
    chatlistoptionsmodalvisible,
    setChatListOptionsModalVisible,
  ] = useState(false);

  /**component function starts here */
  Navigation.mergeOptions(componentId, {
    animations: {
      showModal: {
        waitForRender: true,
        alpha: {
          from: 0,
          to: 1,
          duration: 10000,
        },
      },
    },
  });

  useEffect(() => {
    const listener = {
      componentDidAppear: () => {
        if (loaded != true) {
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

  useEffect(() => {
    if (loaded)
      if (chatlistitem.num_new_msg > 0)
        updatePrivateChatListArr([
          {
            created_chatid: chatlistitem.created_chatid,
            num_new_msg: 0,
            partnerprofile: chatlistitem?.partnerprofile,
          },
        ]);
    fetchPrivateChats([
      chatlistitem.created_chatid,
      chatlistitem?.partnerprofile?.profile_id,
    ]);
  }, [loaded]);

  //to add setting new messages received to read
  useEffect(() => {
    if (
      loaded &&
      chatlistitem?.chats[0]?.id > 0 &&
      chatlistitem?.chats[0]?.pending != true
    ) {
      setPrivateChatToRead([
        chatlistitem.created_chatid,
        chatlistitem?.chats[0]?.id,
      ]);
      checkData(flatlistref) && flatlistref.scrollToOffset({offset: 0});
    }
  }, [chatlistitem?.chats[0]?.id, loaded]);

  const deleteChat = chatitem => {
    if (isEmpty(chatitem)) {
      return;
    }

    setScreenState({...screenstate, deleting: true});
    deleteAPrivateChat(
      [chatitem, chatlistitem.partnerprofile],
      () => {
        setScreenState({...screenstate, deleting: false});
      },
      () => setScreenState({...screenstate, deleting: false}),
    );
  };

  const sendImages = data => {
    if (!Array.isArray(data) || data.length < 1) {
      return;
    }
    data.forEach(item => {
      sendPrivateChat({
        created_chatid: chatlistitem.created_chatid,
        partnerprofile: chatlistitem.partnerprofile,
        chatSchema: {
          id: Math.round(new Date().getTime()),
          pending: true,
          created_chatid: chatlistitem.created_chatid,
          sender_id: authprofile.profile_id,
          private_chatid: `${Math.round(new Date().getTime())}`,
          read: 'sending',
          chat_pics: {chatpic: item.imageuri},
          receiver_id: chatlistitem.partnerprofile.profile_id,
          created_at: `${Math.round(new Date().getTime())}`,
          chat_msg: item.inputtxt,
        },
        reqobj: {
          chat_msg: item.inputtxt,
          chat_pics: {chatpic: item.imageuri},
          receiver_id: chatlistitem.partnerprofile.profile_id,
        },
      });
    });
    checkData(flatlistref) && flatlistref.scrollToOffset({offset: 0});
  };

  function startScreen() {
    if (
      !checkData(privatechatobj?.partnerprofile) ||
      privatechatobj?.partnerprofile?.profile_id == authprofile?.profile_id
    ) {
      Toast('chat not found');
      return null;
    }
    return true;
  }

  function loadPrevChat() {
    let newcount = screenstate.msgcount + 10;
    if (chatlistitem.chats.length < 1) {
      return;
    }
    setScreenState({...screenstate, loadingmore: true});
    if (chatlistitem.chats.length < newcount) {
      fetchPrivateChats(
        [
          chatlistitem.created_chatid,
          chatlistitem?.partnerprofile?.profile_id,
          chatlistitem.chats[chatlistitem.chats.length - 1]?.id,
        ],
        () => {
          console.warn(
            'ok',
            chatlistitem.chats[chatlistitem.chats.length - 1]?.id,
          );
          setScreenState({
            ...screenstate,
            msgcount: newcount,
            loadingmore: false,
          });
        },
        () => {
          setScreenState({
            ...screenstate,
            loadingmore: false,
          });
        },
      );
    } else {
      setScreenState({
        ...screenstate,
        loadingmore: false,
        msgcount: newcount,
      });
    }
  }

  function getChats() {
    return chatlistitem.chats.slice(0, screenstate.msgcount);
  }

  function sendChatImages() {
    Navigation.showModal({
      component: {
        name: 'PhotoList',
        id: 'PHOTO_LIST_CHAT',
        passProps: {
          navparent: true,
          showinput: true,
          onSubmit: data => {
            Navigation.dismissModal('PHOTO_VIEWER');
            Navigation.dismissModal('PHOTO_LIST_CHAT');
            sendImages(data);
          },
        },
      },
    });
  }

  function renderView() {
    startScreen();
    const showInputBox = () => {
      if (chatlistitem.partnerprofile.profileblockedu) {
        return (
          <PanelMsg message={"You can't send conversations to this chat"} />
        );
      } else if (chatlistitem.partnerprofile.ublockedprofile) {
        return <PanelMsg message={'You have blocked user'} />;
      }
      return (
        <InputBox
          showAvatar={false}
          update={checkData(flatlistref) ? 'no' : 'yes'}
          placeholder={'Type a message'}
          onChangeText={setInputTxt}
          inputvalue={inputtxt}
          multiline={true}
          onSubmit={() => {
            if (!checkData(inputtxt)) {
              return;
            }
            checkData(flatlistref) && flatlistref.scrollToOffset({offset: 0});
            sendPrivateChat({
              created_chatid: chatlistitem.created_chatid,
              partnerprofile: chatlistitem.partnerprofile,
              chatSchema: {
                id: Math.round(new Date().getTime()),
                created_chatid: chatlistitem.created_chatid,
                sender_id: authprofile.profile_id,
                pending: true,
                private_chatid: `${Math.round(new Date().getTime())}`,
                read: 'sending',
                receiver_id: chatlistitem.partnerprofile.profile_id,
                created_at: `${Math.round(new Date().getTime())}`,
                chat_msg: inputtxt,
              },
              reqobj: {
                chat_msg: inputtxt,
                receiver_id: chatlistitem.partnerprofile.profile_id,
              },
            });
            setInputTxt('');
          }}
          leftIcon={{
            onPress: () => {
              sendChatImages();
            },
            type: 'entypo',
            name: 'images',
            color: colors.text,
            size: responsiveFontSize(5),
          }}
          maxLength={300}
          autoFocus={false}
          avatar={null}
        />
      );
    };

    return (
      <>
        <HeaderWithImage
          avatarUri={{uri: getPartnerProfile().avatar[1] || null}}
          onAvatarPress={() => {
            Navigation.showModal({
              component: {
                name: 'ViewProfile',
                passProps: {
                  navparent: true,
                  reqprofile: chatlistitem.partnerprofile,
                  screentype: 'modal',
                },
              },
            });
          }}
          Icon1={
            <Icon
              type="evilicon"
              name="arrow-left"
              color={colors.text}
              onPress={() => Navigation.dismissModal(componentId)}
              containerStyle={{marginRight: 15}}
              size={responsiveFontSize(6)}
            />
          }
          Icon2={
            <Icon
              type="antdesign"
              name="downcircleo"
              color={colors.text}
              onPress={() => setChatListOptionsModalVisible(true)}
              containerStyle={{marginTop: 3, marginHorizontal: 10}}
              size={responsiveFontSize(4)}
            />
          }
          Icon3={
            <Icon
              type="antdesign"
              name="infocirlceo"
              color={colors.text}
              onPress={() => {
                setChatInfoVisible(true);
                setScreenState({...screenstate, fetchingchatinfo: true});
                getPrivateChatInfo(
                  chatlistitem.created_chatid,
                  chatinfo => {
                    setScreenState({
                      ...screenstate,
                      privatechatinfo: chatinfo,
                      fetchingchatinfo: false,
                    });
                  },
                  () => {
                    setScreenState({
                      ...screenstate,
                      fetchingchatinfo: 'retry',
                    });
                  },
                );
              }}
              containerStyle={{marginTop: 3, marginHorizontal: 10}}
              size={responsiveFontSize(4)}
            />
          }
          title={chatlistitem.partnerprofile.profile_name}
          subTitle={getPartnerProfile().last_login}
        />
        <PrivateChats
          loaded={loaded}
          loadMore={loadPrevChat}
          setFlatListRef={setFlatListRef}
          sendPrivateChat={sendPrivateChat}
          deletePrivateChat={deleteChat}
          updatePrivateChatList={updatePrivateChatList}
          deleting={screenstate.deleting}
          partnerprofile={chatlistitem.partnerprofile}
          data={getChats()}
          userprofile={authprofile}
          loadingmore={screenstate.loadingmore}
        />
        {showInputBox()}

        <ScrollableListOverLay
          contentContainerStyle={{marginLeft: 5}}
          ListTitle={'Chat History'}
          onBackdropPress={() => setChatInfoVisible(false)}
          reLoad={() => {
            setScreenState({...screenstate, fetchingchatinfo: true});
            getPrivateChatInfo(
              chatlistitem.created_chatid,
              chatinfo => {
                setScreenState({
                  ...screenstate,
                  privatechatinfo: chatinfo,
                  fetchingchatinfo: false,
                });
              },
              () => {
                setScreenState({
                  ...screenstate,
                  fetchingchatinfo: 'retry',
                });
              },
            );
          }}
          visible={chatinfovisible}
          loading={screenstate.fetchingchatinfo}>
          {showPrivateInfo()}
        </ScrollableListOverLay>

        <ActivityOverlay isVisible={showactivitymodal} text={'Processing'} />

        <ModalList
          isVisible={chatlistoptionsmodalvisible}
          onBackdropPress={() => setChatListOptionsModalVisible(false)}
          optionsArr={[
            {
              title:
                chatlistitem.partnerprofile.ublockedprofile == true
                  ? 'Unblock'
                  : 'Block',
              onPress: () => {
                setChatListOptionsModalVisible(false);
                Alert.alert(
                  chatlistitem.partnerprofile.ublockedprofile == true
                    ? `Unblock Chat Partner?`
                    : `Block Chat Partner`,
                  null,
                  [
                    {
                      text: 'Yes',
                      onPress: () => {
                        blockProfileAction(
                          chatlistitem.partnerprofile.profile_id,
                          () => {
                            setShowActivityModal(true);
                          },
                          () => {
                            updatePrivateChatListArr([
                              {
                                partnerprofile: {
                                  ...chatlistitem?.partnerprofile,
                                  ublockedprofile: !chatlistitem.partnerprofile
                                    .ublockedprofile,
                                },
                                created_chatid: chatlistitem?.created_chatid,
                              },
                            ]);
                            setShowActivityModal(false);
                          },
                          () => setShowActivityModal(false),
                        );
                      },
                    },
                    {
                      text: 'No',
                      style: 'cancel',
                    },
                  ],
                );
              },
            },
            {
              title: 'Clear Chat',
              onPress: () => {
                setChatListOptionsModalVisible(false);
                Alert.alert('Clear Chat', null, [
                  {
                    text: 'Yes',
                    onPress: () => {
                      delPrivateChatList(
                        chatlistitem?.created_chatid ||
                          chatlistitem?.partnerprofile?.profile_id,
                      );
                    },
                  },
                  {
                    text: 'No',
                    style: 'cancel',
                  },
                ]);
              },
            },
          ]}
        />
      </>
    );
  }

  function getPartnerProfile() {
    if (!checkData(chatlistitem.partnerprofile)) {
      return {};
    } else if (chatlistitem.partnerprofile.profileblockedu == true) {
      return {
        ...chatlistitem.partnerprofile,
        avatar: [null, null],
        last_login: null,
      };
    } else {
      return {
        ...chatlistitem.partnerprofile,
        last_login: `Last seen ${chatlistitem.partnerprofile.user.last_login}`,
      };
    }
  }

  function showPrivateInfo() {
    let info = screenstate.privatechatinfo;
    if (checkData(info)) {
      return (
        <>
          <Text
            style={{
              marginVertical: 5,
              color: colors.iconcolor,
              fontSize: responsiveFontSize(2),
            }}>
            Chat started on : {info['init_date']}
          </Text>
          <Text
            style={{
              marginVertical: 5,
              color: colors.iconcolor,
              fontSize: responsiveFontSize(2),
            }}>
            Total Chats : {info['totalchats']}
          </Text>
          <Text
            style={{
              marginVertical: 5,
              color: colors.iconcolor,
              fontSize: responsiveFontSize(2),
            }}>
            Your Chat Contribution :{' '}
            {info['yoursentchats'] + ' out of ' + info['totalchats']}
          </Text>
          <Text
            style={{
              marginVertical: 5,
              color: colors.iconcolor,
              fontSize: responsiveFontSize(2),
            }}>
            Partner Chat Contribution :{' '}
            {info['partnersentchats'] + ' out of ' + info['totalchats']}
          </Text>
          <Text
            style={{
              marginVertical: 5,
              color: colors.iconcolor,
              fontSize: responsiveFontSize(2),
            }}>
            Your % Chat Contribution : {info['peryoursentchat'] + '%'}
          </Text>

          <Text
            style={{
              marginVertical: 5,
              color: colors.iconcolor,
              fontSize: responsiveFontSize(2),
            }}>
            Partner % Chat Contribution : {info['perothersentchats'] + '%'}
          </Text>
        </>
      );
    }
    return null;
  }

  /**component function ends here*/
  return (
    <SafeAreaView style={styles.containerStyle}>{renderView()}</SafeAreaView>
  );
};

const mapStateToProps = state => ({
  connected: state.network.isConnected,
  privatechatlistform: state.privatechatlistform,
  offlineactionslist: state.offlineactionslist,
  authprofile: state.profile,
});

PrivateChatScreen.options = {
  /* animations: {
         showModal: {
             waitForRender: true,
             translationX: {
                 from: responsiveWidth(100),
                 to: 0,
                 duration: 100
             }
         },
         dismissModal: {
             translationX: {
                 from: 0,
                 to: responsiveWidth(100),
                 duration: 100
             }
         }
     }*/
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default connect(
  mapStateToProps,
  actions,
)(PrivateChatScreen);
