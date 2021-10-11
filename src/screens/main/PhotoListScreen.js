import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  useDimensionsChange,
  responsiveFontSize,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import PhotoGallery from '../../components/reusable/photo-browsing/PhotoGallery';
import {useTheme} from '../../assets/themes';
import {toNav} from '../../utilities';
import {Navigation} from 'react-native-navigation';
import {Image, Icon} from 'react-native-elements';
import CameraRoll from '@react-native-community/cameraroll';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import {LoaderScreen} from '../../components/reusable/ResuableWidgets';

const {colors} = useTheme();

const PhotoListScreen = ({
  navparent,
  photogalleryform,
  showinput,
  maxselect,
  componentId,
  getGalleryPhotos,
  onSubmit,
  setSelected,
  setReset,
}) => {
  const responsive = {
    resheight: responsiveHeight(100) / 3,
    reswidth: responsiveWidth(100) / 3,
    fontsize: responsiveFontSize(4.5),
    num: 3,
  };
  const {reswidth, resheight} = responsive;
  const [loaded, setLoaded] = useState(false);
  //const [show, setShow] = useState(false);
  let {photos, numphotos, selected, error} = photogalleryform;
  /**
   * functions
   */
  useEffect(() => {
    const listener = {
      componentDidAppear: () => {
        // getGalleryPhotos();
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
  /* Navigation.mergeOptions(componentId, {
         statusBar: {
             visible: true,
         },
         topBar: {
             visible: false,
         },
     })*/

  const itemClicked = (data) => {
    Navigation.showModal({
      component: {
        name: 'PhotoViewer',
        id: 'PHOTO_VIEWER',
        options: {},
        passProps: {
          ...data,
          showinput: showinput || false,
        },
      },
    });
    //toNav(Navigation, componentId, 'PhotoViewer', data);
  };
  /**
   * functions
   */
  return (
    <SafeAreaView
      style={[styles.containerStyle, {backgroundColor: colors.background}]}
    >
      {loaded == false ? (
        <LoaderScreen
          loaderIcon={
            <Icon
              type="entypo"
              name="images"
              color={colors.text}
              size={responsiveFontSize(10)}
            />
          }
          animationType={'zoomIn'}
        />
      ) : (
        <PhotoGallery
          photoList={photos}
          maxSelect={maxselect || 7}
          showinput={showinput}
          colors={colors}
          componentId={componentId}
          dimensions={responsive}
          onCancel={() => Navigation.dismissModal(componentId)}
          onItemClick={itemClicked}
          onSubmit={onSubmit}
          onDisplayImages={itemClicked}
        />
      )}
    </SafeAreaView>
  );
};

PhotoListScreen.options = {
  statusBar: {
    visible: true,
  },
  topBar: {
    visible: false,
  },
};

const mapStateToProps = (state) => ({
  photogalleryform: state.photogalleryform,
});

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
});

export default connect(mapStateToProps, actions)(PhotoListScreen);
