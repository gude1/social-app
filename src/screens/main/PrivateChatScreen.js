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
  addPrivateChat,
  setPrivateChatToRead,
  sendPrivateChat,
  setPrivateChat,
  deleteAPrivateChat,
  clearAPrivateChat,
  updatePrivateChatListArr,
  updatePrivateChatList,
  setPrivateChatPartnerProfile,
  getPrivateChatInfo,
  privatechatlistform,
  blockProfileAction,
  fetchPrivateChats,
  setReset,
  authprofile,
  privatechatobj,
}) => {
  /**CONDITIONAL STATEMENT STARTS HERE */
  if (!checkData(startScreen())) {
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
  const [loaded, setLoaded] = useState(false);
  const [screenstate, setScreenState] = useState({
    privatechatinfo: null,
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
      fetchPrivateChats([
        chatlistitem.created_chatid,
        chatlistitem?.partnerprofile?.profile_id,
      ]);
  }, [loaded]);

  useEffect(() => {
    if (loaded && chatlistitem.first_id > 0) {
      setPrivateChatToRead([
        chatlistitem.created_chatid,
        chatlistitem.first_id,
      ]);
    }
  }, [chatlistitem.first_id]);

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

  function sendChatImages() {
    const sendImages = data => {
      if (!Array.isArray(data) || data.length < 1) {
        return;
      }
      data.map(item => {
        sendPrivateChat({
          created_chatid: chatlistitem.created_chatid,
          chatSchema: {
            id: Math.round(new Date().getTime() / 1000) - 30,
            partnerprofile: chatlistitem.partnerprofile,
            created_chatid: chatlistitem.created_chatid,
            sender_id: authprofile.profile_id,
            read: 'sending',
            chat_pics: [{chatpic: item.imageuri}],
            receiver_id: chatlistitem.partnerprofile.profile_id,
            created_at: `${Math.round(new Date().getTime() / 1000) - 30}`,
            chat_msg: item.inputtxt,
          },
          reqobj: {
            chat_msg: item.inputtxt,
            chat_pics: [{chatpic: item.imageuri}],
            setread: 'ok',
            receiver_id: chatlistitem.partnerprofile.profile_id,
          },
        });
      });
      checkData(flatlistref) && flatlistref.scrollToOffset({offset: 0});
    };

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
              chatSchema: {
                id: Math.round(new Date().getTime() / 1000) - 30,
                partnerprofile: chatlistitem.partnerprofile,
                created_chatid: chatlistitem.created_chatid,
                sender_id: authprofile.profile_id,
                read: 'sending',
                receiver_id: chatlistitem.partnerprofile.profile_id,
                created_at: `${Math.round(new Date().getTime() / 1000) - 30}`,
                chat_msg: inputtxt,
              },
              reqobj: {
                chat_msg: inputtxt,
                setread: 'ok',
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
          setFlatListRef={setFlatListRef}
          sendPrivateChat={sendPrivateChat}
          deletePrivateChat={deleteAPrivateChat}
          updatePrivateChatList={updatePrivateChatList}
          deleting={screenstate.deleting}
          partnerprofile={chatlistitem.partnerprofile}
          data={[...chatlistitem.chats]}
          userprofile={authprofile}
          loadingmore={screenstate.loadingmore}
        />
        {showInputBox()}

        <ScrollableListOverLay
          contentContainerStyle={{marginLeft: 5}}
          ListTitle={'Chat History'}
          onBackdropPress={() => setChatInfoVisible(false)}
          reLoad={() => {
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
                                  ublockedprofile: false,
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
                      let updatedchats = chatlistitem.chats.map(item => {
                        return {...item, deleted: true};
                      });
                      clearAPrivateChat(
                        () => {
                          setShowActivityModal(true);
                        },
                        () => {
                          setShowActivityModal(false);
                          setPrivateChat(
                            [],
                            chatlistitem.created_chatid ||
                              chatlistitem.partnerprofile.profile_id,
                          );
                          updatePrivateChatList({
                            created_chatid: chatlistitem.created_chatid,
                            partnerprofile: chatlistitem.partnerprofile,
                            chats: updatedchats,
                          });
                          Toast(`Chat cleared`);
                        },
                        () => {
                          setShowActivityModal(false);
                        },
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
