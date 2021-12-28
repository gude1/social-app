import React, {Component, useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import {Avatar, Button, Input, Icon, Text} from 'react-native-elements';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import {useTheme} from '../../assets/themes/index';
import {
  HeaderWithImage,
  InputBox,
  LoaderScreen,
} from '../../components/reusable/ResuableWidgets';
import {Navigation} from 'react-native-navigation';
import {
  isEmpty,
  checkData,
  resizeImage,
  getFileInfo,
  Toast,
} from '../../utilities/index';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import MeetConversation from '../../components/reusable/MeetConversation';
import * as Animatable from 'react-native-animatable';

const {colors} = useTheme();

const MeetupConversationScreen = ({
  navparent,
  meetconvobj,
  authprofile,
  authmeetprofile,
  meetupconvlist,
  screentype,
  componentId,
  fetchMeetConversations,
  setMeetupConversation,
  updateMeetConvListConvsArr,
  sendMeetConversation,
  setProcessing,
  setMeetupConvStatus,
  setReset,
}) => {
  /**CONDITIONAL STATEMENT STARTS HERE */
  if (!startScreen()) {
    Navigation.dismissModal(componentId);
    return null;
  }
  /**CONDITIONAL STATEMENT ENDS HERE */
  const [loaded, setLoaded] = useState(false);
  const [showparentmeet, setShowParentMeet] = useState(false);
  const [flatlistref, setFlatListRef] = useState(null);
  const [screenstate, setScreenState] = useState({
    msgcount: 10,
    loadingprev: false,
  });
  const [inputtxt, setInputTxt] = useState('');
  let meetconvlistitem = meetupconvlist.list.find(
    item => item?.conversation_id == meetconvobj?.conversation_id,
  );

  Toast;
  meetconvlistitem = !isEmpty(meetconvlistitem)
    ? {...meetconvobj, ...meetconvlistitem}
    : {
        conv_list: [],
        num_new_msg: 0,
        conversation_id: `${meetconvobj?.origin_meet_request?.request_id}${
          meetconvobj?.origin_meet_request?.requester_id
        }${authmeetprofile.owner_id}`,
        ...meetconvobj,
      };

  let chatlistitemschema = {
    id: meetconvlistitem.id,
    conversation_id: meetconvlistitem.conversation_id,
    conv_list: meetconvlistitem.conv_list,
    partnermeetprofile: meetconvlistitem.partnermeetprofile,
  };

  /**COMPONENT FUNCTIONS */
  useEffect(() => {
    const listener = {
      componentDidAppear: () => {
        setLoaded(true);
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
    if (loaded) {
      if (meetconvlistitem.num_new_msg > 0) {
        updateMeetConvListConvsArr([
          {
            conversation_id: meetconvlistitem.conversation_id,
            num_new_msg: 0,
          },
        ]);
      }
      fetchMeetConversations([
        meetconvlistitem.conversation_id,
        meetconvlistitem.origin_meet_request.request_id,
      ]);
    }
  }, [loaded]);

  //to handle new messages gotten in realtime
  useEffect(() => {
    if (loaded && meetconvlistitem.latest_id > 0) {
      updateMeetConvListConvsArr([
        {
          conversation_id: meetconvlistitem.conversation_id,
          num_new_msg: 0,
        },
      ]);
      setMeetupConvStatus([
        '2',
        meetconvlistitem.conversation_id,
        meetconvlistitem.latest_id,
      ]);
    }
    flatlistref && flatlistref.scrollToOffset({offset: 0});
  }, [meetconvlistitem?.latest_id, loaded]);

  function startScreen() {
    if (
      isEmpty(meetconvobj) ||
      isEmpty(meetconvobj.partnermeetprofile) ||
      isEmpty(meetconvobj.origin_meet_request) ||
      !Array.isArray(meetconvobj.conv_list) ||
      (meetconvobj.origin_meet_request.requester_id ==
        authmeetprofile.owner_id &&
        meetconvobj.conv_list.length < 1) ||
      meetconvobj.origin_meet_request.deleted == true
    ) {
      Toast('conversation not found');
      return false;
    }
    return true;
  }

  const renderConvInfo = () => {
    return (
      <Animatable.View
        style={{
          flexDirection: 'row',
          width: 300,
          alignSelf: 'center',
          marginTop: 20,
          marginBottom: 10,
          //borderWidth: 4,
          //borderColor: "green",
          padding: 15,
          borderRadius: 20,
          backgroundColor:
            colors.theme == 'white' ? 'rgb(237,237,237)' : colors.card,
        }}
        animation={'slideInRight'}
        useNativeDriver={true}>
        <Text
          style={{
            textAlign: 'justify',
            fontSize: responsiveFontSize(1.2),
            color: colors.placeholder,
          }}>
          Meet Conversations disappear as soon as the meet is deleted or
          expires. Avoid sharing personal information and only meet with
          strangers at public places
        </Text>
      </Animatable.View>
    );
  };

  function sendImageConv(data) {
    if (!Array.isArray(data) || isEmpty(data)) {
      return;
    }
    data.forEach(dataobj => {
      sendMeetConversation([
        meetconvlistitem.conversation_id,
        meetconvlistitem.origin_meet_request,
        meetconvlistitem.partnermeetprofile,
        dataobj.inputtxt,
        {chat_pic: dataobj.imageuri},
      ]);
    });
    !isEmpty(flatlistref) && flatlistref.scrollToOffset({offset: 0});
  }

  function renderView() {
    if (!startScreen()) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{textAlign: 'center', color: colors.text}}>
            Something went wrong
          </Text>
          <Button
            type="outline"
            onPress={setDismissNav}
            icon={{
              name: 'arrow-left',
              type: 'evilicon',
              size: responsiveFontSize(4),
              color: colors.iconcolor,
            }}
            title="Go Back"
            titleStyle={{
              color: colors.iconcolor,
              textAlign: 'center',
              fontSize: responsiveFontSize(1.4),
            }}
            containerStyle={{marginTop: 20}}
            buttonStyle={{
              borderColor: colors.iconcolor,
              borderRadius: 15,
              width: 100,
            }}
          />
        </View>
      );
    } else {
      if (!loaded) {
        return (
          <LoaderScreen
            loaderIcon={
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{
                    color: colors.text,
                    marginVertical: 5,
                    fontSize: responsiveFontSize(3),
                  }}>
                  {meetconvlistitem?.partnermeetprofile?.meetup_name}
                </Text>
                <Icon
                  type={'evilicon'}
                  name={'comment'}
                  color={colors.text}
                  size={responsiveFontSize(8)}
                />
              </View>
            }
          />
        );
      }
      return (
        <>
          <HeaderWithImage
            title={meetconvlistitem.partnermeetprofile.meetup_name}
            avatarUri={{uri: meetconvlistitem.partnermeetprofile.meetup_avatar}}
            onAvatarPress={() => {
              Navigation.showModal({
                component: {
                  name: 'PhotoViewer',
                  passProps: {
                    navparent: true,
                    headerText: meetconvlistitem.partnermeetprofile.meetup_name,
                    photos: [meetconvlistitem.partnermeetprofile.meetup_avatar],
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
                onPress={setDismissNav}
                containerStyle={{marginRight: 15}}
                size={responsiveFontSize(6)}
              />
            }
            Icon2={
              <Icon
                type="antdesign"
                name="infocirlceo"
                color={colors.text}
                onPress={() => {
                  setShowParentMeet(true);
                }}
                containerStyle={{marginTop: 3, marginHorizontal: 10}}
                size={responsiveFontSize(3)}
              />
            }
          />

          {renderConvInfo()}

          <MeetConversation
            conv_list={getConvList()}
            setFlatListRef={setFlatListRef}
            authprofile={authprofile}
            authmeetprofile={authmeetprofile}
            loadingprev={screenstate.loadingprev}
            loadPrev={loadPrevConvChat}
            showparentmeet={showparentmeet}
            setShowParentMeet={setShowParentMeet}
            sendConv={sendMeetConversation}
            origin_meet_request={meetconvlistitem.origin_meet_request}
            partnermeetprofile={meetconvlistitem.partnermeetprofile}
          />

          <InputBox
            showAvatar={false}
            placeholder={'Type a message'}
            update={flatlistref}
            onChangeText={setInputTxt}
            inputvalue={inputtxt}
            multiline={true}
            onSubmit={() => {
              console.warn([
                meetconvlistitem.conversation_id,
                meetconvlistitem.origin_meet_request.request_id,
                inputtxt,
              ]);
              sendMeetConversation([
                meetconvlistitem.conversation_id,
                meetconvlistitem.origin_meet_request,
                meetconvlistitem.partnermeetprofile,
                inputtxt,
              ]);
              //flatlistref && flatlistref.scrollToOffset({ offset: 0 });
              setInputTxt('');
            }}
            leftIcon={{
              onPress: () => {
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
                        sendImageConv(data);
                      },
                    },
                  },
                });
              },
              type: 'entypo',
              name: 'images',
              color: colors.text,
              size: responsiveFontSize(4),
            }}
            rightIcon={{
              size: responsiveFontSize(5.5),
            }}
            //maxLength={300}
            autoFocus={false}
            avatar={null}
          />
        </>
      );
    }
  }

  function setDismissNav() {
    Keyboard.dismiss();
    if (screentype == 'screen') return Navigation.pop(componentId);
    else return Navigation.dismissModal(componentId);
  }

  function loadPrevConvChat() {
    let newcount = screenstate.msgcount + 10;
    if (meetconvlistitem.conv_list.length < 1) {
      return;
    }
    setScreenState({...screenstate, loadingprev: false});
    if (meetconvlistitem.conv_list.length < newcount) {
      fetchMeetConversations(
        [
          meetconvlistitem.conversation_id,
          meetconvlistitem.origin_meet_request.request_id,
          meetconvlistitem.conv_list[meetconvlistitem.conv_list.length - 1].id,
        ],
        () => {
          setScreenState({
            ...screenstate,
            msgcount: newcount,
            loadingprev: false,
          });
        },
        () => {
          setScreenState({...screenstate, loadingprev: false});
        },
      );
    } else {
      setScreenState({...screenstate, msgcount: newcount, loadingprev: false});
    }
  }

  function getConvList() {
    let conv_list = meetconvlistitem.conv_list.slice(0, screenstate.msgcount);
    return conv_list;
  }

  /**COMPONENT FUNCTIONS */

  return (
    <SafeAreaView style={styles.containerStyle}>
      <View style={styles.containerStyle}>{renderView()}</View>
    </SafeAreaView>
  );
};

MeetupConversationScreen.options = {
  topBar: {
    visible: false,
  },
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
});

const mapStateToProps = state => ({
  authprofile: state.profile,
  meetupconvlist: state.meetupconvlist,
  authmeetprofile: {
    meetup_name: state.meetupform.meetup_name,
    meetup_avatar: state.meetupform.meetup_avatar,
    owner_id: state.profile.profile_id,
  },
});

export default connect(
  mapStateToProps,
  actions,
)(MeetupConversationScreen);
