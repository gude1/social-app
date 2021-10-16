import React, {useEffect, useState} from 'react';
import {Navigation} from 'react-native-navigation';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import {LoaderScreen, Header} from '../../components/reusable/ResuableWidgets';
import {Icon, Avatar, Input, Text} from 'react-native-elements';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  IndicatorViewPager,
  PagerTabIndicator,
} from '../../components/reusable/viewpager/index';
import {useTheme} from '../../assets/themes/index';
import ProfileList from '../../components/reusable/ProfileList';
import {checkData} from '../../utilities/index';
import {
  MentionsList,
  NotificationList,
} from '../../components/reusable/NoteList';

const {colors} = useTheme();
const NotificationScreen = ({
  screenname,
  screentype,
  componentId,
  setReset,
  mynotes,
  fetchNotifications,
  navparent,
}) => {
  const [loaded, setLoaded] = useState(false);
  let lefticon =
    navparent == true ? (
      <Icon
        type="evilicon"
        name="arrow-left"
        color={colors.text}
        size={responsiveFontSize(6)}
      />
    ) : null;
  let lefticonpress = navparent == true ? setDismissNav() : null;
  /***Component functtion starts here */
  useEffect(() => {
    setReset('mynotes');
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
      setReset('mynotes');
      unsubscribe.remove();
    };
  }, []);

  //function to determine dismiss of navigation based on screentype
  function setDismissNav() {
    if (screentype == 'screen') return () => Navigation.pop(componentId);
    else return () => Navigation.dismissModal(componentId);
  }

  const renderTabIndicator = () => {
    const TABS = [
      {
        text: 'All',
      },
      {
        text: 'Mentions',
      },
    ];
    return (
      <PagerTabIndicator
        textStyle={{
          fontWeight: 'bold',
          textAlign: 'center',
          letterSpacing: 1,
          paddingBottom: 5,
          color: colors.placeholder,
          fontSize: responsiveFontSize(1.8),
        }}
        selectedTextStyle={{
          fontWeight: 'bold',
          textAlign: 'center',
          letterSpacing: 1,
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
          borderBottomWidth: 0.5,
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

  function renderView() {
    if (loaded == false) {
      return (
        <LoaderScreen
          loaderIcon={
            <Icon
              type="antdesign"
              name="bells"
              color={colors.text}
              size={responsiveFontSize(10)}
            />
          }
          animationType={'zoomIn'}
        />
      );
    }
    return (
      <>
        <Header
          headertext={screenname || 'Notifications'}
          headercolor={colors.card}
          lefticon={lefticon}
          leftIconPress={lefticonpress}
          headerTextStyle={{color: colors.text}}
          headertextsize={responsiveFontSize(2.9)}
        />
        <IndicatorViewPager
          initialPage={0}
          //ref={viewpager => (viewpagerref = viewpager)}
          style={{flex: 1}}
          indicatorposition={'top'}
          indicator={renderTabIndicator()}
          keyboardDismissMode="none">
          <View key={0}>
            <NotificationList
              list={mynotes.notifications}
              loading={mynotes.loadingnotes}
              loadingmore={mynotes.loadingmorenotes}
              fetchNotes={fetchNotifications}
            />
          </View>

          <View key={1}>
            <MentionsList
              list={mynotes.mentions}
              loading={mynotes.loadingmentions}
              loadingmore={mynotes.loadingmorementions}
              //fetchMentions={}
            />
          </View>
        </IndicatorViewPager>
      </>
    );
  }

  /**Component function ends here */
  return (
    <SafeAreaView style={styles.containerStyle}>{renderView()}</SafeAreaView>
  );
};

const mapStateToProps = state => ({
  state: state,
  mynotes: state.mynotes,
});

NotificationScreen.options = {
  topBar: {
    visible: false,
  },
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
)(NotificationScreen);
