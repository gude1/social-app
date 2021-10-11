import React, {useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView, View, Image} from 'react-native';
import {Text} from 'react-native-elements';
import * as actions from '../../actions';
import {connect} from 'react-redux';
import {useTheme} from '../../assets/themes';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {Avatar, Button, Input, Image as EImage} from 'react-native-elements';
import {Navigation} from 'react-native-navigation';
import {
  PagerDotIndicator,
  IndicatorViewPager,
} from '../../components/reusable/viewpager/index';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {checkData} from '../../utilities/index';
import {
  ImageGallery,
  ActivityOverlay,
  Header,
} from '../../components/reusable/ResuableWidgets';
import moment from 'moment';
import {ScrollView} from 'react-native';
import TouchableScale from 'react-native-touchable-scale/src/TouchableScale';

const {colors} = useTheme();

const RequestCategoryItem = ({onClick, icon, avatar, catName}) => {
  let width = responsiveWidth(44);
  let height = responsiveWidth(15);

  return (
    <TouchableScale
      activeScale={0.7}
      tension={10}
      onPress={() => {
        Navigation.showModal({
          component: {
            name: 'MeetupMain',
            id: 'MEETUP_MAIN',
            passProps: {
              screentype: 'modal',
              catName,
            },
          },
        });
      }}
    >
      <EImage
        style={{width, height, maxWidth: 300, maxHeight: 300}}
        containerStyle={{
          elevation: 3,
          marginVertical: 10,
          marginHorizontal: 10,
          backgroundColor: colors.border,
        }}
        placeholderStyle={{backgroundColor: colors.border}}
        resizeMode="cover"
        source={avatar}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <Text
            style={{
              backgroundColor: 'rgba(0,0,0,0.03)',
              color: 'white',
              fontWeight: 'bold',
              fontSize: responsiveFontSize(2.6),
            }}
          >
            {catName}
          </Text>
        </View>
      </EImage>
    </TouchableScale>
  );
};

const MeetupScreen = ({
  componentId,
  meetupform,
  privatechatlistform,
  authprofile,
  updateMeetForm,
  saveMeetupDetails,
  connected,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [inputvalue, setInputValue] = useState('');
  const [time, setTime] = useState(null);
  let avatar = meetupform.avatar_name || meetupform.meetup_avatar;
  /**CONDITIONAL STATEMENTS  STARTS HERE */
  if (checkData(avatar)) {
    avatar = {uri: avatar};
  } else {
    avatar = null;
  }
  /**CONDITIONAL STATEMENTS  ENDS HERE*/

  /**compoent function goes here */
  useEffect(() => {
    updateMeetForm({processing: false});
    EntypoIcon.getImageSource('network', 100).then((e) =>
      Navigation.mergeOptions(componentId, {
        bottomTab: {
          icon: e,
        },
      }),
    );
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
      if (meetupform.visited != true) {
        updateMeetForm({visited: true});
      }
      // Make sure to unregister the listener during cleanup
      unsubscribe.remove();
    };
  }, []);

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
    } else if (
      !checkData(meetupform.meetup_avatar) ||
      !checkData(meetupform.meetup_name)
    ) {
      const renderDotIndicator = () => (
        <PagerDotIndicator
          pageCount={3}
          dotStyle={{
            borderColor: 'silver',
            width: 10,
            borderWidth: 2,
            backgroundColor: colors.background,
            height: 10,
            borderRadius: 50,
            borderWidth: 1,
          }}
          selectedDotStyle={{
            borderColor: 'silver',
            borderWidth: 2,
            width: 13,
            backgroundColor: colors.text,
            height: 13,
            borderRadius: 50,
            borderWidth: 1,
          }}
          hideSingle
        />
      );
      return (
        <>
          <IndicatorViewPager
            style={{flex: 0.9}}
            initialPage={meetupform.visited == false ? 0 : 2}
            indicator={renderDotIndicator()}
          >
            <View key={0} style={styles.pagerView}>
              <Avatar
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
                Find and Meet with new people across campuses
              </Text>
            </View>

            <View key={1} style={styles.pagerView}>
              <Avatar
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
                Connect with like minds and make memories
              </Text>
            </View>

            <View key={2} style={styles.pagerView}>
              <Avatar
                size={160}
                source={avatar}
                onPress={() => {
                  Navigation.showModal({
                    component: {
                      name: 'GiphyGallery',
                      id: 'GIPHY_GALLERY',
                      passProps: {
                        screentype: 'modal',
                        onSubmitAction: (smallavatar, avatar) => {
                          Navigation.dismissAllModals();
                          saveMeetupDetails([null, avatar]);
                        },
                      },
                    },
                  });
                }}
                rounded
                containerStyle={{marginTop: 20, backgroundColor: '#673ab7'}}
                placeholderStyle={{backgroundColor: '#673ab7'}}
                icon={{
                  size: responsiveFontSize(6),
                  name: 'camerao',
                  type: 'antdesign',
                  color: 'white',
                }}
              />
              <Text
                style={{
                  marginTop: 3,
                  fontSize: responsiveFontSize(2),
                  textAlign: 'center',
                  color: 'red',
                }}
              >
                {meetupform.errors.meetup_avatar_err ||
                  meetupform.errors.meetup_avatar_name_err}
              </Text>
              <Input
                placeholder="Set A Meet Name"
                leftIcon={{
                  name: 'pencil',
                  type: 'evilicon',
                  color: colors.iconcolor,
                  size: responsiveFontSize(5),
                }}
                onChangeText={(txt) => {
                  setInputValue(txt);
                }}
                onSubmitEditing={() => {
                  saveMeetupDetails([inputvalue]);
                }}
                value={inputvalue}
                returnKeyType={'go'}
                errorMessage={meetupform.errors.meetup_name_err}
                selectionColor="#2196F3"
                maxLength={15}
                errorStyle={{color: 'red'}}
                inputContainerStyle={{borderWidth: 0, borderBottomWidth: 0}}
                placeholderTextColor={colors.placeholder}
                containerStyle={{maxWidth: 300, marginTop: 10, borderWidth: 0}}
                inputStyle={{
                  color: colors.text,
                  borderWidth: 0,
                  borderBottomWidth: 1,
                  borderColor: colors.border,
                }}
              />
              <Button
                type="outline"
                icon={{
                  name: 'arrow-right',
                  type: 'evilicon',
                  size: responsiveFontSize(4),
                  color: colors.text,
                }}
                onPress={() => {
                  saveMeetupDetails([inputvalue]);
                }}
                iconRight
                title={'Next'}
                titleStyle={{color: colors.iconcolor}}
                buttonStyle={{
                  borderColor: colors.text,
                  alignItems: 'center',
                  borderRadius: 50,
                  padding: 10,
                }}
                containerStyle={{marginBottom: 50}}
              />
            </View>
          </IndicatorViewPager>
          <ActivityOverlay
            text={'Processing'}
            isVisible={meetupform.processing}
          />
        </>
      );
    } else {
      let reqCategory = [
        {
          avatar: require('../../assets/meetupscreen/requestcat/hangout.jpeg'),
          catName: 'Hangout',
        },
        {
          avatar: require('../../assets/meetupscreen/requestcat/music.jpeg'),
          catName: 'Music',
        },
        {
          avatar: require('../../assets/meetupscreen/requestcat/sport.jpeg'),
          catName: 'Sport',
        },
        {
          avatar: require('../../assets/meetupscreen/requestcat/study.jpeg'),
          catName: 'Study',
        },
        {
          avatar: require('../../assets/meetupscreen/requestcat/party.jpeg'),
          catName: 'Party',
        },
        {
          avatar: require('../../assets/meetupscreen/requestcat/gaming.jpeg'),
          catName: 'Gaming',
        },
      ];
      return (
        <View style={styles.containerStyle}>
          <Header
            headertext="Meet"
            headertextcolor={colors.text}
            headercolor={colors.card}
            headerStyle={{width: responsiveWidth(100), elevation: 0.6}}
            headertextsize={responsiveFontSize(4)}
            headerTextStyle={{
              marginHorizontal: 30,
              textAlign: 'center',
              // width: '100%',
              fontFamily: 'cursive',
              fontWeight: 'bold',
            }}
          />
          <ScrollView
            style={{marginTop: 5}}
            contentContainerStyle={styles.requestCatCtn}
          >
            {reqCategory.map((item, index) => {
              return (
                <RequestCategoryItem
                  avatar={item.avatar}
                  key={index}
                  catName={item.catName}
                />
              );
            })}
          </ScrollView>
        </View>
      );
    }
  };

  /**component function ends here */
  return (
    <SafeAreaView style={styles.containerStyle}>{renderView()}</SafeAreaView>
  );
};
MeetupScreen.options = {
  bottomTabs: {
    visible: true,
  },
  bottomTab: {
    text: 'Meet',
  },
};

const mapStateToProps = (state) => ({
  connected: state.network.isConnected,
  privatechatlistform: state.privatechatlistform,
  meetupform: state.meetupform,
  authprofile: state.profile,
  offlineactions: state.offlineactions,
});

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    // alignItems: "center",
    backgroundColor: colors.background,
  },
  pagerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pagerViewText: {
    margin: 20,
    fontSize: responsiveFontSize(2.8),
    textAlign: 'center',
    color: 'silver',
  },
  requestCatCtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: colors.background,
    flexWrap: 'wrap',
  },
});

export default connect(mapStateToProps, actions)(MeetupScreen);
