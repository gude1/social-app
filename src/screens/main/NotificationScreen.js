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
import {useTheme} from '../../assets/themes/index';
import ProfileList from '../../components/reusable/ProfileList';
import {checkData} from '../../utilities/index';

const {colors} = useTheme();
const NotificationScreen = ({
  screenname,
  screentype,
  componentId,
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

  //function to determine dismiss of navigation based on screentype
  function setDismissNav() {
    if (screentype == 'screen') return () => Navigation.pop(componentId);
    else return () => Navigation.dismissModal(componentId);
  }

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
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{color: colors.placeholder}}>
            Notifications goes here
          </Text>
        </View>
      </>
    );
  }
  /**Component function ends here */
  return (
    <SafeAreaView style={styles.containerStyle}>{renderView()}</SafeAreaView>
  );
};

const mapStateToProps = state => ({});

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
