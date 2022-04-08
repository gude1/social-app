import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, ScrollView} from 'react-native';
import {useTheme} from '../../assets/themes';
import {Navigation} from 'react-native-navigation';
import {
  LoaderScreen,
  ActivityOverlay,
} from '../../components/reusable/ResuableWidgets';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Icon, Text, CheckBox, ListItem} from 'react-native-elements';
import {Header} from '../../components/reusable/ResuableWidgets';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import {checkData, isEmpty} from '../../utilities/index';
import {DEFAULT_NAV_OPTIONS} from '../../utilities/nav';
import PostImageGallery from '../../components/reusable/PostImageGallery';

const PostGalleryScreen = ({navparent,type}) => {
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
  let lefticonpress = navparent == true ? () => setDismissNav() : null;

  /**Component function goes here */
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
};

function setDismissNav() {
  if (screentype == 'screen') return () => Navigation.pop(componentId);
  else return () => Navigation.dismissModal(componentId);
}

function renderView() {
  let
  let fetchPost = null;
  let fetchMorePost = null;
  if (!loaded) {
  }
  return (
    <PostImageGallery
      data={viewprofileform.viewprofileposts}
      loading={viewprofileform.viewpostloading}
      loadingmore={viewprofileform.viewpostloadingmore}
      fetchPost={fetchPost}
      fetchMorePost={fetchMorePost}
    />
  );
}
/**Component function ends */

PostGalleryScreen.options = {
  ...DEFAULT_NAV_OPTIONS,
  topBar: {
    visible: false,
  },
};

const mapStateToProps = state => ({});

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default connect(
  mapStateToProps,
  actions,
)(PostGalleryScreen);
