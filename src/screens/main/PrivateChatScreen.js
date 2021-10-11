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
import {checkData, Toast, formatDate} from '../../utilities/index';

const {colors} = useTheme();

const PrivateChatScreen = ({
  componentId,
  connected,
  addPrivateChat,
  sendPrivateChat,
  setPrivateChat,
  deleteAPrivateChat,
  clearAPrivateChat,
  addPrivateChatListReadArr,
  privatechatlistform,
  deleteOfflineActions,
  setPrivateChatFetchArr,
  updatePrivateChatList,
  setPrivateChatPartnerProfile,
  getPrivateChatInfo,
  //removePrivateChatFetchArr,
  blockProfileAction,
  setPrivateChatForm,
  updatePrivateChatListChats,
  setPrivateChatLastFetchToRead,
  offlineactionslist,
  privatechatform,
  fetchPrivateChats,
  setReset,
  authprofile,
  privatechatobj,
}) => {
  /**CONDITIONAL STATEMENT STARTS HERE */
  privatechatform = !checkData(privatechatform.partnerprofile)
    ? {...privatechatform, ...privatechatobj}
    : privatechatform;
  if (!checkData(startScreen())) {
    Navigation.dismissModal(componentId);
    return null;
  }
  /**CONDITIONAL STATEMENT ENDS HERE */
  let findchatonline = false;
  const [loaded, setLoaded] = useState(false);
  const [chatinfovisible, setChatInfoVisible] = useState(false);
  const [flatlistref, setFlatListRef] = useState(null);
  const [inputtxt, setInputTxt] = useState('');
  const [showactivitymodal, setShowActivityModal] = useState(false);
  const [chatlistoptionsmodalvisible, setChatListOptionsModalVisible] =
    useState(false);
  privatechatform = !checkData(privatechatform.partnerprofile)
    ? {
        ...privatechatform,
        ...privatechatobj,
      }
    : privatechatform;

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
    if (checkData(privatechatobj.chats) && privatechatobj.chats.length > 0) {
      //console.warn('privatechatlength', privatechatobj.chats.length);
      // return null;
      updatePrivateChatListChats({
        create_chatid: privatechatobj.create_chatid,
        partnerprofile: privatechatobj.partnerprofile,
        chats: [{id: privatechatobj.chats[0].id, num_new_msg: null}],
      });
    }
    let chatobj = privatechatlistform.chatlist.find((item) => {
      return (
        item.partnerprofile.profile_id ==
          privatechatobj.partnerprofile.profile_id ||
        item.create_chatid == privatechatobj.create_chatid
      );
    });
    if (checkData(chatobj) && chatobj.deleted != true) {
      let chats = chatobj.chats.filter((item) => item.deleted != true);
      privatechatform = {...privatechatform, ...chatobj, chats};
      setPrivateChatForm({...chatobj, chats});
    } else {
      findchatonline = true;
      setPrivateChatForm({...privatechatform});
    }

    fetchPrivateChats([
      privatechatform.create_chatid,
      privatechatform.last_fetch_arr,
      privatechatform.partnerprofile.profile_id,
      findchatonline,
    ]);

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
      deleteOfflineActions([
        `fetchprivatechat${
          privatechatform.create_chatid ||
          privatechatform.partnerprofile.profile_id
        }`,
        `setprivatechatarrread${
          privatechatform.create_chatid ||
          privatechatform.partnerprofile.profile_id
        }`,
      ]);
      setReset('privatechatform');
    };
  }, []);

  useEffect(() => {
    //console.warn('inside the effect', [privatechatform.fetchstatus, privatechatform.last_fetch_arr])
    if (
      privatechatform.last_fetch_arr.length > 0 &&
      privatechatform.fetchstatus == '200'
    ) {
      // console.warn('in here', privatechatform.last_fetch_arr)
      addPrivateChatListReadArr(privatechatform.last_fetch_arr);
      setPrivateChatLastFetchToRead([
        privatechatform.create_chatid,
        privatechatform.last_fetch_arr,
      ]);
    }
  }, [privatechatform.last_fetch_arr.toString()]);

  function startScreen() {
    if (
      !checkData(privatechatobj.partnerprofile) ||
      privatechatobj.partnerprofile.profile_id == authprofile.profile_id
    ) {
      Toast('chat not found');
      return null;
    }
    return true;
  }

  function sendChatImages() {
    const sendImages = (data) => {
      if (!Array.isArray(data) || data.length < 1) {
        return;
      }
      data.map((item) => {
        sendPrivateChat({
          create_chatid: privatechatform.create_chatid,
          chatSchema: {
            id: Math.round(new Date().getTime() / 1000) - 30,
            partnerprofile: privatechatform.partnerprofile,
            create_chatid: privatechatform.create_chatid,
            sender_id: authprofile.profile_id,
            read: 'sending',
            chat_pics: [{chatpic: item.imageuri}],
            receiver_id: privatechatform.partnerprofile.profile_id,
            created_at: `${Math.round(new Date().getTime() / 1000) - 30}`,
            chat_msg: item.inputtxt,
          },
          reqobj: {
            chat_msg: item.inputtxt,
            chat_pics: [{chatpic: item.imageuri}],
            setread: 'ok',
            receiver_id: privatechatform.partnerprofile.profile_id,
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
          onSubmit: (data) => {
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
      //privatechatobj.partnerprofile.profileblockedu = true;
      if (privatechatform.partnerprofile.profileblockedu) {
        return (
          <PanelMsg message={"You can't send conversations to this chat"} />
        );
      } else if (privatechatform.partnerprofile.ublockedprofile) {
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
            //console.warn('inout', privatechatform.create_chatid);
            //return;
            if (!checkData(inputtxt)) {
              return;
            }
            checkData(flatlistref) && flatlistref.scrollToOffset({offset: 0});
            sendPrivateChat({
              create_chatid: privatechatform.create_chatid,
              chatSchema: {
                id: Math.round(new Date().getTime() / 1000) - 30,
                partnerprofile: privatechatform.partnerprofile,
                create_chatid: privatechatform.create_chatid,
                sender_id: authprofile.profile_id,
                read: 'sending',
                receiver_id: privatechatform.partnerprofile.profile_id,
                created_at: `${Math.round(new Date().getTime() / 1000) - 30}`,
                chat_msg: inputtxt,
              },
              reqobj: {
                chat_msg: inputtxt,
                setread: 'ok',
                receiver_id: privatechatform.partnerprofile.profile_id,
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
        {/*<Button title="Press" onPress={() => {
                console.warn(privatechatform.create_chatid)
                let c = privatechatlistform.chatlist.find(item => item.partnerprofile.profile_id == privatechatform.partnerprofile.profile_id);
                console.warn(c.chats, privatechatlistform.chatlist.length);
            }} />*/}
        <HeaderWithImage
          avatarUri={{uri: getPartnerProfile().avatar[1] || null}}
          onAvatarPress={() => {
            Navigation.showModal({
              component: {
                name: 'ViewProfile',
                passProps: {
                  navparent: true,
                  reqprofile: privatechatform.partnerprofile,
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
                getPrivateChatInfo(privatechatform.create_chatid);
              }}
              containerStyle={{marginTop: 3, marginHorizontal: 10}}
              size={responsiveFontSize(4)}
            />
          }
          title={privatechatform.partnerprofile.profile_name}
          subTitle={getPartnerProfile().last_login}
        />
        <PrivateChats
          loaded={loaded}
          setFlatListRef={setFlatListRef}
          sendPrivateChat={sendPrivateChat}
          deletePrivateChat={deleteAPrivateChat}
          updatePrivateChatList={updatePrivateChatList}
          deleting={privatechatform.deleting}
          partnerprofile={privatechatform.partnerprofile}
          data={privatechatform.chats}
          userprofile={authprofile}
          loadingmore={privatechatform.loadingmore}
        />
        {showInputBox()}

        <ScrollableListOverLay
          contentContainerStyle={{marginLeft: 5}}
          ListTitle={'Chat History'}
          onBackdropPress={() => setChatInfoVisible(false)}
          reLoad={() => getPrivateChatInfo(privatechatform.create_chatid)}
          visible={chatinfovisible}
          loading={privatechatform.fetchingchatinfo}
        >
          {showPrivateInfo()}
        </ScrollableListOverLay>

        <ActivityOverlay isVisible={showactivitymodal} text={'Processing'} />

        <ModalList
          isVisible={chatlistoptionsmodalvisible}
          onBackdropPress={() => setChatListOptionsModalVisible(false)}
          optionsArr={[
            {
              title:
                privatechatform.partnerprofile.ublockedprofile == true
                  ? 'Unblock'
                  : 'Block',
              onPress: () => {
                setChatListOptionsModalVisible(false);
                Alert.alert(
                  privatechatform.partnerprofile.ublockedprofile == true
                    ? `Unblock Chat Partner?`
                    : `Block Chat Partner`,
                  null,
                  [
                    {
                      text: 'Yes',
                      onPress: () => {
                        blockProfileAction(
                          privatechatform.partnerprofile.profile_id,
                          () => {
                            setShowActivityModal(true);
                          },
                          () => {
                            setPrivateChatPartnerProfile(
                              {
                                ...privatechatform.partnerprofile,
                                ublockedprofile:
                                  !privatechatform.partnerprofile
                                    .ublockedprofile,
                              },
                              privatechatform.create_chatid ||
                                privatechatform.partnerprofile.profile_id,
                            );

                            updatePrivateChatList({
                              partnerprofile: {
                                ...privatechatform.partnerprofile,
                                ublockedprofile: false,
                              },
                              create_chatid: privatechatform.create_chatid,
                            });
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
                      let updatedchats = privatechatform.chats.map((item) => {
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
                            privatechatform.create_chatid ||
                              privatechatform.partnerprofile.profile_id,
                          );
                          updatePrivateChatList({
                            create_chatid: privatechatform.create_chatid,
                            partnerprofile: privatechatform.partnerprofile,
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
    if (!checkData(privatechatform.partnerprofile)) {
      return {};
    } else if (privatechatform.partnerprofile.profileblockedu == true) {
      return {
        ...privatechatform.partnerprofile,
        avatar: [null, null],
        last_login: null,
      };
    } else {
      return {
        ...privatechatform.partnerprofile,
        last_login: `Last seen ${privatechatform.partnerprofile.user.last_login}`,
      };
    }
  }

  function showPrivateInfo() {
    let info = privatechatform.privatechatinfo;
    if (checkData(info)) {
      return (
        <>
          <Text
            style={{
              marginVertical: 5,
              color: colors.iconcolor,
              fontSize: responsiveFontSize(2),
            }}
          >
            Chat started on : {info['init_date']}
          </Text>
          <Text
            style={{
              marginVertical: 5,
              color: colors.iconcolor,
              fontSize: responsiveFontSize(2),
            }}
          >
            Total Chats : {info['totalchats']}
          </Text>
          <Text
            style={{
              marginVertical: 5,
              color: colors.iconcolor,
              fontSize: responsiveFontSize(2),
            }}
          >
            Your Chat Contribution :{' '}
            {info['yoursentchats'] + ' out of ' + info['totalchats']}
          </Text>
          <Text
            style={{
              marginVertical: 5,
              color: colors.iconcolor,
              fontSize: responsiveFontSize(2),
            }}
          >
            Partner Chat Contribution :{' '}
            {info['partnersentchats'] + ' out of ' + info['totalchats']}
          </Text>
          <Text
            style={{
              marginVertical: 5,
              color: colors.iconcolor,
              fontSize: responsiveFontSize(2),
            }}
          >
            Your % Chat Contribution : {info['peryoursentchat'] + '%'}
          </Text>

          <Text
            style={{
              marginVertical: 5,
              color: colors.iconcolor,
              fontSize: responsiveFontSize(2),
            }}
          >
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

const mapStateToProps = (state) => ({
  connected: state.network.isConnected,
  privatechatform: state.privatechatform,
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

export default connect(mapStateToProps, actions)(PrivateChatScreen);
