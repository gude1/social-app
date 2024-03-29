import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, ScrollView} from 'react-native';
import {useTheme} from '../../assets/themes';
import {Navigation} from 'react-native-navigation';
import {
  LoaderScreen,
  ActivityOverlay,
} from '../../components/reusable/ResuableWidgets';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {Icon, Text, CheckBox, ListItem} from 'react-native-elements';
import {Header} from '../../components/reusable/ResuableWidgets';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import {checkData, isEmpty} from '../../utilities/index';
import TouchableScale from 'react-native-touchable-scale/src/TouchableScale';

const {colors} = useTheme();

const PostSettingScreen = ({
  componentId,
  navparent,
  postsetting,
  getPostSetting,
  postSettingUpdate,
  updatePostSetting,
}) => {
  const [loaded, setLoaded] = useState(false);
  postsetting = !isEmpty(postsetting) ? postsetting : {};
  let followedcheck =
    postsetting.timeline_post_range == 'followedpost' ? true : false;
  let campuscheck = postsetting.timeline_post_range == 'campus' ? true : false;
  let allcheck =
    postsetting.timeline_post_range == 'all' ||
    !checkData(postsetting.timeline_post_range)
      ? true
      : false;
  let lefticon =
    navparent == true ? (
      <Icon
        type="evilicon"
        name="arrow-left"
        color={colors.text}
        size={responsiveFontSize(6)}
      />
    ) : null;
  let lefticonpress =
    navparent == true ? () => Navigation.dismissModal(componentId) : null;
  let righticon = '';
  let righticonpress = '';
  /**compoent function goes here */
  useEffect(() => {
    //updatePostSetting({...postsetting, processing: false});
    getPostSetting();
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
  /**compoent function ends here */

  return (
    <SafeAreaView style={styles.containerStyle}>
      <Header
        headertext="PostSetting"
        headercolor={colors.card}
        lefticon={lefticon}
        leftIconPress={lefticonpress}
        headerTextStyle={{color: colors.text}}
        headertextsize={responsiveFontSize(2.9)}
      />
      {loaded == false ? (
        <LoaderScreen
          loaderIcon={
            <Icon
              type="antdesign"
              name="setting"
              color={colors.text}
              size={responsiveFontSize(10)}
            />
          }
          animationType={'zoomIn'}
        />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode={'on-drag'}>
          <View style={styles.contentContainerStyle}>
            <View>
              <Text
                style={{
                  color: colors.text,
                  fontSize: responsiveFontSize(2.4),
                  fontWeight: 'bold',
                }}>
                Post Range
              </Text>
              <Text style={{color: colors.iconcolor}}>
                Restrict posts that appear on your timeline
              </Text>
              <CheckBox
                title="All posts"
                checked={allcheck}
                containerStyle={styles.checkBoxCtn}
                onPress={() => {
                  postSettingUpdate({timeline_post_range: 'all'});
                }}
              />
              <CheckBox
                title="Posts from my location only"
                checked={campuscheck}
                onPress={() => {
                  postSettingUpdate({timeline_post_range: 'campus'});
                }}
                containerStyle={styles.checkBoxCtn}
              />
              <CheckBox
                title="Posts from people am following only"
                checked={followedcheck}
                onPress={() => {
                  postSettingUpdate({timeline_post_range: 'followedpost'});
                }}
                containerStyle={styles.checkBoxCtn}
              />
            </View>

            <ListItem
              title={'Blacklisted Posts'}
              subtitle={'Press to view posts you blacklisted'}
              subtitleStyle={{color: colors.iconcolor}}
              Component={TouchableScale}
              activeScale={0.9}
              containerStyle={styles.listItem}
              friction={90}
              //onPress={() => console.warn('coool')}
              titleStyle={{color: colors.text, fontWeight: 'bold'}}
              chevron={{
                name: 'block',
                size: responsiveFontSize(2.6),
                color: colors.text,
                type: 'entypo',
              }}
            />

            <ListItem
              title={'Archived Posts'}
              subtitle={'Press to view posts you archived'}
              subtitleStyle={{color: colors.iconcolor}}
              Component={TouchableScale}
              activeScale={0.9}
              containerStyle={styles.listItem}
              friction={90}
              //onPress={() => console.warn('coool')}
              titleStyle={{color: colors.text, fontWeight: 'bold'}}
              chevron={{
                name: 'archive',
                size: responsiveFontSize(2.6),
                color: colors.text,
                type: 'entypo',
              }}
            />

            <ActivityOverlay
              text="Processing"
              isVisible={postsetting.processing}
            />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  postsetting: state.postsetting,
});

PostSettingScreen.options = {
  topBar: {
    visible: false,
  },
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: colors.background,
  },
  postRangeContainer: {},
  contentContainerStyle: {
    flex: 1,
    marginLeft: 20,
    marginTop: 10,
    backgroundColor: colors.background,
  },
  listItem: {
    backgroundColor: colors.background,
  },
  checkBoxCtn: {
    backgroundColor: colors.background,
    borderColor: colors.iconcolor,
    borderRadius: 10,
  },
});

export default connect(
  mapStateToProps,
  actions,
)(PostSettingScreen);
