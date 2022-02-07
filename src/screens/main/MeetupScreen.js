import React, {useState, useEffect} from 'react';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {
  Animated,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';
import {
  Text,
  Icon,
  Avatar,
  CheckBox,
  Input,
  Button,
} from 'react-native-elements';
import * as actions from '../../actions';
import {connect} from 'react-redux';
import {useTheme} from '../../assets/themes/index';
import {
  Header,
  ModalList,
  ScrollableListOverLay,
  optimizeComponent,
} from '../../components/reusable/ResuableWidgets';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  IndicatorViewPager,
  PagerTabIndicator,
  PagerDotIndicator,
} from '../../components/reusable/viewpager/index';
import {Navigation} from 'react-native-navigation';
import MeetRequestList from '../../components/reusable/MeetRequestList';
import MeetConversationList from '../../components/MeetConversationList';
import CustomPicker from '../../components/reusable/Picker';
import ExploreScreen from './ExploreScreen';
import EmojiList from '../../assets/static/EmojiList.json';
import HoursList from '../../assets/static/HoursList.json';
import MeetTypes from '../../assets/static/MeetTypes.json';
import CampusList from '../../assets/static/CampusList.json';
import {isEmpty, checkData, Toast} from '../../utilities/index';
import moment from 'moment';
import {DEFAULT_NAV_OPTIONS} from '../../utilities/nav';

const {colors} = useTheme();

/**CREATE OPTIMIZED COMPONENT */
let OAvatar = optimizeComponent(Avatar, (nextprop, oldprop) => {
  let newuri = !isEmpty(nextprop.source)
    ? !isEmpty(nextprop.source.uri)
      ? nextprop.source.uri
      : nextprop.source
    : null;
  let olduri = !isEmpty(oldprop.source)
    ? !isEmpty(oldprop.source.uri)
      ? oldprop.source.uri
      : oldprop.source
    : null;
  if (newuri != olduri) {
    return true;
  }
  return false;
});

let OIcon = optimizeComponent(Icon, (nextprop, oldprop) => {
  return false;
});

const FirstTimeView = ({meetupform, okAction, meetupmain}) => {
  //COMPONENT STARTS HERE
  const renderDotIndicator = () => {
    return (
      <PagerDotIndicator
        pageCount={2}
        dotStyle={{
          borderColor: 'silver',
          width: 13,
          borderWidth: 2,
          backgroundColor: colors.background,
          height: 13,
          borderRadius: 50,
          borderWidth: 1,
        }}
        selectedDotStyle={{
          borderColor: 'silver',
          borderWidth: 2,
          width: 16,
          backgroundColor: colors.text,
          height: 16,
          borderRadius: 50,
          borderWidth: 1,
        }}
        hideSingle
      />
    );
  };

  return (
    <IndicatorViewPager
      style={{flex: 1, marginBottom: 20}}
      initialPage={0}
      indicator={renderDotIndicator()}>
      <View key={0} style={styles.pagerView}>
        <OAvatar
          rounded
          size={200}
          containerStyle={{marginTop: 10, backgroundColor: colors.border}}
          placeholderStyle={{backgroundColor: colors.border}}
          icon={{
            size: responsiveFontSize(4),
            name: 'image',
            type: 'evilicons',
            color: 'white',
          }}
          source={require('../../assets/meetupscreen/icon2.png')}
        />
        <Text style={styles.pagerViewText}>
          Meet New people across and within your community
        </Text>
      </View>

      <View key={1} style={styles.pagerView}>
        <OAvatar
          rounded
          size={200}
          containerStyle={{backgroundColor: colors.border}}
          placeholderStyle={{backgroundColor: colors.border}}
          icon={{
            size: responsiveFontSize(4),
            name: 'image',
            type: 'evilicons',
            color: 'white',
          }}
          source={require('../../assets/meetupscreen/icon3.png')}
        />
        <Text style={styles.pagerViewText}>
          Create Meets and connect with people that share your interest
        </Text>
        <Button
          title={'Get Started'}
          onPress={okAction}
          titleStyle={{color: 'white'}}
          containerStyle={{marginVertical: 15}}
          buttonStyle={{
            width: 250,
            borderRadius: 20,
            backgroundColor: colors.blue,
            padding: 13,
          }}
        />
      </View>
    </IndicatorViewPager>
  );
};

export const MeetupScreen = ({
  componentId,
  updateMeetForm,
  meetupmain,
  setMeetupMain,
  authprofile,
  meetupconvlist,
  meetupform,
  createMeetRequest,
  fetchMeetConv,
  fetchNewMeetConv,
  fetchLaterMeetConv,
  blackListMeetProfile,
  deleteMeetRequest,
  setMeetupConvList,
  //removeMeetupMainMyRequests,
  //removeMeetupMainRequests,
  removeMeetupMainRequestsArr,
  removeMeetupMainMyRequestsArr,
  fetchMyMeetRequests,
  removeMeetConvList,
  fetchMeetRequests,
  fetchMoreMeetRequests,
}) => {
  const REQUEST_SCHEMA = {
    expires_at: 24,
    request_msg: '',
    request_category: 'Hangout',
    request_mood: '😀',
  };
  const MEET_PROFILE_OPTIONS = [
    {
      title: 'View Your Meet Profile',
      onPress: () => {
        setShowMeetProfileOpt(false);
        Navigation.showModal({
          component: {
            name: 'PhotoViewer',
            passProps: {
              navparent: true,
              headerText: meetupform.meetup_name,
              photos: [meetupform.meetup_avatar],
            },
          },
        });
      },
    },
    {
      title: 'Edit Your Meet Profile',
      onPress: () => {
        setShowMeetProfileOpt(false);
        Navigation.showModal({
          component: {
            name: 'MeetupForm',
            passProps: {
              navparent: true,
            },
          },
        });
      },
    },
    {
      title: 'Edit Your Meet Setting',
      onPress: () => {
        setShowMeetProfileOpt(false);
        showMeetSetting(true);
      },
    },
  ];
  const [loaded, setLoaded] = useState(false);
  const [showmeetsetting, showMeetSetting] = useState(false);
  const [createReq, setCreateReq] = useState(REQUEST_SCHEMA);
  const [showmakemeetmodal, setShowMakeMeetModal] = useState(false);
  const [onscreen, setOnScreen] = useState(false);
  const [reqoptions, setReqOptions] = useState(meetupmain.options);
  const [viewpager, setViewPager] = useState(null);
  const [viewedpages, setViewedPages] = useState([]);
  const [showmeetprofileopt, setShowMeetProfileOpt] = useState(false);
  let meetupreqobj = filterMeets();
  let category = meetupreqobj.options.request_category;
  let mood = meetupreqobj.options.request_mood;

  /**conditonal statments */
  if (!loaded) {
    setLoaded(true);
  }
  //COMPONENT FUNCTION STARTS HERE
  useEffect(() => {
    if (
      meetupconvlist?.list?.length < 1 &&
      meetupconvlist?.persistedlist?.length > 0
    ) {
      setMeetupConvList({list: meetupconvlist.persistedlist});
    }
    if (meetupform.accepted == true) {
      fetchMeetRequests();
      fetchMyMeetRequests();
    }
    const listener = {
      componentDidAppear: () => {
        Navigation.mergeOptions(componentId, {
          bottomTabs: {
            visible: true,
          },
        });
        setOnScreen(true);
        setScreenInfo();
      },
      componentDidDisappear: () => {
        setOnScreen(false);
      },
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
    if (onscreen) {
      setScreen();
    }
  }, [
    onscreen,
    meetupform.accepted,
    meetupform.meetup_name,
    meetupform.meetup_avatar,
  ]);

  function filterMeets() {
    let requests = meetupmain.requests.filter(item => {
      if (!isEmpty(category) && category != item.request_category) return false;
      else if (!isEmpty(mood) && mood != item.request_mood) return false;
      else return true;
    });
    return {...meetupmain, requests};
  }

  const setScreenInfo = () => {
    if (isEmpty(meetupmain)) {
      return;
    }
    let current = new Date().getTime() - 60000; //1 min diff from curren time
    let exprequests = meetupmain.requests
      .filter(item => {
        let expires_at = Math.floor(item.expires_at * 1000);
        if (item.deleted == true || expires_at <= current) {
          return true;
        }
        return false;
      })
      .map(item => item.request_id);
    let expmyrequests = meetupmain.myrequests
      .filter(item => {
        let expires_at = Math.floor(item.expires_at * 1000);
        if (item.deleted == true || expires_at <= current) {
          return true;
        }
        return false;
      })
      .map(item => item.request_id);
    let expconvlists = meetupconvlist.list
      .filter(listitem => {
        let expires_at = Math.floor(
          listitem.origin_meet_request.expires_at * 1000,
        );
        if (
          listitem.origin_meet_request.deleted == true ||
          expires_at <= current
        ) {
          return true;
        }
        return false;
      })
      .map(item => item.conversation_id);
    removeMeetupMainRequestsArr(expmyrequests);
    removeMeetupMainMyRequestsArr(expmyrequests);
    removeMeetConvList(expconvlists);
  };

  const setScreen = () => {
    if (
      (isEmpty(meetupform.meetup_name) || isEmpty(meetupform.meetup_avatar)) &&
      meetupform.accepted == true
    ) {
      Alert.alert(
        'Please setup your meet profile to continue',
        'Press ok to start',
        [
          {
            text: 'Ok',
            onPress: () => {
              Navigation.showModal({
                component: {
                  name: 'MeetupForm',
                  passProps: {
                    navparent: true,
                  },
                },
              });
            },
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
      );
    }
  };

  const renderTabIndicator = () => {
    const TABS = [
      {
        text: 'Meets',
      },
      {
        text: 'Meet Msgs',
      },
      {
        text: 'My Meets',
      },
    ];
    return (
      <PagerTabIndicator
        textStyle={{
          fontWeight: 'bold',
          textAlign: 'center',
          letterSpacing: 0.6,
          paddingBottom: 5,
          color: colors.placeholder,
          fontSize: responsiveFontSize(1.8),
        }}
        selectedTextStyle={{
          fontWeight: 'bold',
          textAlign: 'center',
          letterSpacing: 0.6,
          color: colors.text,
          paddingBottom: 5,
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomWidth: 1.5,
          borderColor: colors.text,
          fontSize: responsiveFontSize(1.8),
        }}
        style={{
          borderColor: colors.border,
          height: 50,
          borderBottomWidth: 1,
          backgroundColor: colors.background,
        }}
        itemStyle={{
          height: '100%',
        }}
        selectedItemStyle={{
          height: '100%',
        }}
        tabs={TABS}
      />
    );
  };

  const renderView = () => {
    if (loaded == false) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          {colors.theme == 'white' ? (
            <Image
              source={require('../../assets/animations/loader1white.gif')}
              style={{width: 300, height: 300}}
            />
          ) : (
            <Image
              source={require('../../assets/animations/loader1black.gif')}
              style={{width: 300, height: 300}}
            />
          )}
        </View>
      );
    } else if (!meetupform.accepted) {
      return (
        <FirstTimeView
          meetupform={meetupform}
          okAction={() => {
            updateMeetForm({accepted: true});
            fetchMeetRequests();
            fetchMyMeetRequests();
          }}
        />
      );
    } else {
      return (
        <>
          <Header
            headertext="Meet"
            headertextcolor={colors.text}
            headercolor={colors.card}
            headerStyle={{width: responsiveWidth(100), elevation: 1}}
            headertextsize={responsiveFontSize(4)}
            headerTextStyle={{
              marginHorizontal: 30,
              textAlign: 'center',
              fontFamily: 'cursive',
              fontWeight: 'bold',
            }}
            righticon={
              <>
                <OAvatar
                  rounded
                  size={30}
                  containerStyle={{backgroundColor: colors.border}}
                  placeholderStyle={{backgroundColor: colors.border}}
                  source={
                    isEmpty(meetupform.meetup_avatar)
                      ? null
                      : {uri: meetupform.meetup_avatar}
                  }
                />
              </>
            }
            rightIconPress={() => setShowMeetProfileOpt(true)}
            righticon2={
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
            }
            rightIcon2Press={() => setShowMakeMeetModal(true)}
          />
          <IndicatorViewPager
            initialPage={0}
            offscreenPageLimit={3}
            onPageSelected={e => {
              !viewedpages.includes(e.position) &&
                setViewedPages([...viewedpages, e.position]);
            }}
            ref={viewpager => setViewPager(viewpager)}
            style={{flex: 1, marginTop: 2, borderBottomWidth: 0}}
            indicatorposition={'top'}
            indicator={renderTabIndicator()}
            keyboardDismissMode="none">
            <View key={0} style={{flex: 1}}>
              <MeetRequestList
                meetupreqobj={
                  viewedpages.includes(0)
                    ? meetupreqobj
                    : {...meetupreqobj, fetching: true, requests: []}
                }
                authprofile={authprofile}
                deleteMeetReq={deleteMeetRequest}
                blackList={blackListMeetProfile}
                fetchReqs={fetchMeetRequests}
                fetchMoreReqs={fetchMoreMeetRequests}
              />
            </View>

            <View key={1} style={{flex: 1}}>
              <MeetConversationList
                meetupconvs={
                  viewedpages.includes(1)
                    ? meetupconvlist
                    : {...meetupconvlist, fetching: true, list: []}
                }
                fetchConvs={fetchMeetConv}
                meetsetting={meetupform}
                authprofile={authprofile}
                fetchNewConvs={fetchNewMeetConv}
                fetchLaterConvs={fetchLaterMeetConv}
              />
            </View>

            <View key={2} style={{flex: 1}}>
              <MeetRequestList
                meetupreqobj={
                  viewedpages.includes(2)
                    ? meetupreqobj
                    : {...meetupreqobj, myreqfetching: true, myrequests: []}
                }
                blackList={blackListMeetProfile}
                createMeetReq={createMeetRequest}
                deleteMeetReq={deleteMeetRequest}
                authprofile={authprofile}
                myrequests={true}
                fetchReqs={() => fetchMyMeetRequests()}
              />
            </View>
          </IndicatorViewPager>
          <ModalList
            optionsArr={MEET_PROFILE_OPTIONS}
            isVisible={showmeetprofileopt}
            onBackdropPress={() => setShowMeetProfileOpt(false)}
          />

          <ScrollableListOverLay
            submitAction={() => {
              showMeetSetting(false);
              setMeetupMain({
                options: {
                  ...meetupreqobj.options,
                  ...reqoptions,
                },
              });
              setMeetupMain({requests: []});
              setTimeout(() => {
                fetchMeetRequests();
                Toast('Meet settings saved');
              }, 1000);
            }}
            updateArr={`${reqoptions.campus}${reqoptions.request_mood}`}
            submitactiontxt={'Save'}
            onBackdropPress={() => {
              showMeetSetting(false);
              setReqOptions(meetupreqobj.options);
            }}
            visible={showmeetsetting}
            ListTitle={'Meet Setting'}
            loading={false}
            contentContainerStyle={{
              marginLeft: 0,
              flex: 1,
            }}>
            <View
              style={{
                marginLeft: 10,
                marginTop: 5,
                marginRight: 5,
                flex: 1,
              }}>
              <CustomPicker
                containerPickerStyle={{width: '100%'}}
                pickerContainerStyle={{width: '100%'}}
                onValueChange={(itemValue, itemIndex) => {
                  setReqOptions({
                    ...reqoptions,
                    request_mood: itemValue,
                  });
                }}
                mode="dialog"
                options={EmojiList}
                selectedValue={reqoptions.request_mood}
                labelText="Filter meets by mood"
                borderColor={colors.border}
                labelStyle={{color: colors.text}}
                placeholderColor={colors.placeholder}
                backgroundColor={colors.card}
                icon={{
                  type: 'antdesign',
                  name: 'smileo',
                  color: colors.iconcolor,
                  size: 28,
                }}
              />
              <CustomPicker
                containerPickerStyle={{width: '100%'}}
                pickerContainerStyle={{width: '100%'}}
                onValueChange={(itemValue, itemIndex) => {
                  setReqOptions({
                    ...reqoptions,
                    campus: itemValue,
                  });
                }}
                mode="dialog"
                selectedValue={reqoptions.campus}
                options={CampusList}
                labelText="Filter meets by campus"
                borderColor={colors.border}
                labelStyle={{color: colors.text}}
                placeholderColor={colors.placeholder}
                backgroundColor={colors.card}
                icon={{
                  type: 'antdesign',
                  name: 'book',
                  color: colors.iconcolor,
                  size: 28,
                }}
              />
            </View>
          </ScrollableListOverLay>
          <ScrollableListOverLay
            submitAction={() => {
              createMeetRequest(
                [
                  createReq.request_msg,
                  createReq.request_category,
                  createReq.request_mood,
                  createReq.expires_at,
                ],
                () => {
                  checkData(viewpager) && viewpager.setPage(2);
                },
              );
              setShowMakeMeetModal(false);
              setCreateReq(REQUEST_SCHEMA);
            }}
            updateArr={`${createReq.expires_at} ${createReq.request_category}${
              createReq.request_mood
            }${createReq.request_msg}`}
            height={400}
            submitactiontxt={'Create'}
            onBackdropPress={() => {
              setShowMakeMeetModal(false);
              setCreateReq(REQUEST_SCHEMA);
            }}
            visible={showmakemeetmodal}
            ListTitle={'Create Meet'}
            loading={false}
            contentContainerStyle={{marginLeft: 0}}>
            <View
              style={{
                marginLeft: 10,
                marginTop: 5,
                marginRight: 5,
                flex: 1,
              }}>
              <CustomPicker
                containerPickerStyle={{width: '100%'}}
                pickerContainerStyle={{width: '100%'}}
                onValueChange={(itemValue, itemIndex) => {
                  setCreateReq({
                    ...createReq,
                    request_mood: itemValue,
                  });
                }}
                mode="dialog"
                options={EmojiList}
                selectedValue={createReq.request_mood}
                labelText="Meet mood"
                borderColor={colors.border}
                labelStyle={{color: colors.text}}
                placeholderColor={colors.placeholder}
                backgroundColor={colors.card}
                icon={{
                  type: 'antdesign',
                  name: 'smileo',
                  color: colors.iconcolor,
                  size: 25,
                }}
              />
              <Input
                containerStyle={{
                  marginVertical: 0,
                  marginHorizontal: 0,
                  paddingVertical: 0,
                  paddingHorizontal: 0,
                }}
                onChangeText={text => {
                  setCreateReq({
                    ...createReq,
                    request_msg: text,
                  });
                }}
                multiline={true}
                label="Meet Message (<=200)"
                placeholderTextColor={colors.placeholder}
                placeholder={"film show @ John doe's by 5pm"}
                labelStyle={{color: colors.text}}
                inputStyle={{
                  borderBottomWidth: 1,
                  color: colors.text,
                  borderColor: colors.border,
                }}
                inputContainerStyle={{
                  borderBottomWidth: 0,
                  width: '100%',
                }}
              />

              <CustomPicker
                containerPickerStyle={{width: '100%'}}
                pickerContainerStyle={{width: '100%'}}
                onValueChange={(itemValue, itemIndex) => {
                  setCreateReq({
                    ...createReq,
                    request_category: itemValue,
                  });
                }}
                mode="dialog"
                options={MeetTypes}
                selectedValue={createReq.request_category}
                labelText="Kind of meet ?"
                borderColor={colors.border}
                labelStyle={{color: colors.text}}
                placeholderColor={colors.placeholder}
                backgroundColor={colors.card}
                icon={{
                  type: 'entypo',
                  name: 'network',
                  color: colors.iconcolor,
                  size: 25,
                }}
              />

              <CustomPicker
                containerPickerStyle={{width: '100%'}}
                pickerContainerStyle={{width: '100%'}}
                onValueChange={(itemValue, itemIndex) => {
                  setCreateReq({
                    ...createReq,
                    expires_at: itemValue,
                  });
                }}
                mode="dialog"
                selectedValue={createReq.expires_at}
                options={HoursList}
                labelText="Expries after"
                borderColor={colors.border}
                labelStyle={{color: colors.text}}
                placeholderColor={colors.placeholder}
                backgroundColor={colors.card}
                icon={{
                  type: 'antdesign',
                  name: 'clockcircleo',
                  color: colors.iconcolor,
                  size: 25,
                }}
              />
            </View>
          </ScrollableListOverLay>
        </>
      );
    }
  };

  //COMPONENT FUNCTION ENDS HERE

  return (
    <SafeAreaView style={styles.containerStyle}>
      <View style={styles.contentContainerStyle}>{renderView()}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: colors.background,
    marginBottom: 55,
  },
  pagerView: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    paddingTop: 20,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  pagerViewText: {
    margin: 20,
    fontSize: responsiveFontSize(2.8),
    textAlign: 'center',
    color: 'silver',
  },
  contentContainerStyle: {
    flex: 1,
    backgroundColor: colors.background,
  },
  checkBoxCtn: {
    backgroundColor: colors.background,
    borderColor: colors.iconcolor,
    borderRadius: 10,
  },
});

MeetupScreen.options = {
  ...DEFAULT_NAV_OPTIONS,
  bottomTabs: {
    ...DEFAULT_NAV_OPTIONS.bottomTabs,
    visible: true,
  },
  bottomTab: {
    ...DEFAULT_NAV_OPTIONS.bottomTab,
    text: 'Meet',
    dotIndicator: {
      color: 'green',
      animate: true,
      visible: true,
    },
  },
};

const mapStateToProps = state => ({
  meetupmain: state.meetupmain,
  authprofile: state.profile,
  meetupconvlist: state.meetupconvlist,
  meetupform: state.meetupform,
});

export default connect(
  mapStateToProps,
  actions,
)(MeetupScreen);
