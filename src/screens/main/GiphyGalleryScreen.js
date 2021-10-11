import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ActivityIndicator,
  Image,
} from 'react-native';
import {Text, Icon, Button} from 'react-native-elements';
import * as actions from '../../actions';
import {connect} from 'react-redux';
import {useTheme} from '../../assets/themes';
import {
  ImageGallery,
  InputBox,
  LoaderScreen,
} from '../../components/reusable/ResuableWidgets';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Navigation} from 'react-native-navigation';
import axios from 'axios';
import {GIPHY_API_KEY1, GIPHY_API_KEY2} from '../../env';
import {checkData} from '../../utilities/index';
import {SEARCH_INITIAL_STATE} from '../../reducers/GiphyGalleryReducer';
import IndicatorViewPager from '../../components/reusable/viewpager/IndicatorViewPager';
import PagerTabIndicator from '../../components/reusable/viewpager/indicator/PagerTabIndicator';

const {colors} = useTheme();

const GiphyGalleryScreen = ({
  componentId,
  screentype,
  setReset,
  searchGiphyGifs,
  updateGiphyGallery,
  fetchGiphyGifs,
  fetchMoreGiphyGifs,
  authprofile,
  authuser,
  giphygallery,
  onSubmitAction,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [inputvalue, setInputValue] = useState('');
  const TABS = [
    {
      iconSource: 'image',
      iconType: 'feather',
    },
    {
      iconSource: 'search',
      iconType: 'evilicons',
    },
  ];
  let viewpagerref = null;
  let giphyresults = giphygallery.results.map((item) => {
    return {smallavatar: item.preview_gif.url, avatar: item.fixed_width.url};
  });
  let giphysearchresults = giphygallery.searchobj.results.map((item) => {
    return {smallavatar: item.preview_gif.url, avatar: item.fixed_width.url};
  });

  /**COMPONENT FUNCTIONS STARTS HERE */

  useEffect(() => {
    updateGiphyGallery({searchobj: SEARCH_INITIAL_STATE});
    if (giphygallery.results.length < 1) {
      fetchGiphyGifs();
    }
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
      updateGiphyGallery({searchobj: SEARCH_INITIAL_STATE});
      // Make sure to unregister the listener during cleanup
      unsubscribe.remove();
    };
  }, []);

  function setDismissNav() {
    if (screentype == 'screen') return Navigation.pop(componentId);
    else return Navigation.dismissModal(componentId);
  }

  const renderTabIndicator = () => {
    if (!Array.isArray(TABS)) {
      return null;
    }
    return (
      <PagerTabIndicator
        iconStyle={{fontSize: 30, color: '#808080'}}
        selectedIconStyle={{fontSize: 32, color: colors.text}}
        selectedTextStyle={{color: colors.text}}
        style={{
          borderColor: colors.border,
          backgroundColor: colors.background,
          borderBottomWidth: 0.25,
        }}
        itemStyle={{
          paddingVertical: 10,
        }}
        selectedItemStyle={{
          paddingVertical: 10,
          //borderBottomWidth: 1,
          borderColor: colors.text,
        }}
        tabs={TABS}
      />
    );
  };

  function returnView() {
    if (loaded == false) {
      return (
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
      );
    } else {
      return (
        <>
          <InputBox
            style={{borderTopWidth: 0}}
            onSubmitEditing={() => {
              searchGiphyGifs(inputvalue);
              checkData(viewpagerref) && viewpagerref.setPage(1);
            }}
            showAvatar={false}
            returnKeyType={'search'}
            multiline={false}
            inputvalue={inputvalue}
            autoFocus={false}
            onChangeText={(txt) => {
              if (txt.length < 1) {
                //checkData(viewpagerref) && viewpagerref.setPage(0);
                updateGiphyGallery({searchobj: SEARCH_INITIAL_STATE});
              }
              setInputValue(txt);
            }}
            leftIcon={{
              type: 'antdesign',
              onPress: () => setDismissNav(),
              name: 'arrowleft',
              size: responsiveFontSize(4),
              color: colors.text,
            }}
            rightIcon={{
              size: responsiveFontSize(3.5),
              type: 'antdesign',
              name: 'close',
              colors: colors.text,
              onPress: () => {
                setInputValue('');
                updateGiphyGallery({searchobj: SEARCH_INITIAL_STATE});
              },
            }}
            placeholder={'Search through giphy here...'}
          />
          <IndicatorViewPager
            initialPage={0}
            ref={(viewpager) => (viewpagerref = viewpager)}
            style={{flex: 1}}
            indicatorposition={'top'}
            indicator={renderTabIndicator()}
            keyboardDismissMode="none"
          >
            <View key={0} style={{flex: 1}}>
              <ImageGallery
                photos={giphyresults}
                onSubmit={onSubmitAction}
                onItemClicked={(smallavatar, avatar) => {
                  Navigation.showModal({
                    component: {
                      name: 'GiphyViewer',
                      id: 'GIPHY_VIEWER',
                      passProps: {
                        navparent: true,
                        smallavatar,
                        avatar,
                        onSubmit: () => {
                          checkData(onSubmitAction) &&
                            onSubmitAction(smallavatar, avatar);
                        },
                      },
                    },
                  });
                }}
                Fetch={fetchGiphyGifs}
                loadMore={fetchMoreGiphyGifs}
                height={responsiveWidth(100) / 4}
                numColumns={4}
                width={responsiveWidth(100) / 4}
                loading={giphygallery.fetching}
                loadingmore={giphygallery.loadingmore}
              />
            </View>
            <View key={1} style={{flex: 1}}>
              <ImageGallery
                photos={giphysearchresults}
                onSubmit={onSubmitAction}
                onItemClicked={(smallavatar, avatar) => {
                  Navigation.showModal({
                    component: {
                      name: 'GiphyViewer',
                      id: 'GIPHY_VIEWER',
                      passProps: {
                        navparent: true,
                        smallavatar,
                        avatar,
                        onSubmit: () => {
                          checkData(onSubmitAction) &&
                            onSubmitAction(smallavatar, avatar);
                        },
                      },
                    },
                  });
                }}
                Fetch={() => searchGiphyGifs(inputvalue)}
                height={responsiveWidth(100) / 4}
                numColumns={4}
                width={responsiveWidth(100) / 4}
                loading={giphygallery.searchobj.fetching}
                loadingmore={giphygallery.searchobj.loadingmore}
              />
            </View>
          </IndicatorViewPager>
        </>
      );
    }
  }

  /**COMPONENT FUNCTIONS ENDS HERE */
  return <View style={styles.containerStyle}>{returnView()}</View>;
};

const mapStateToProps = (state) => ({
  authuser: state.user,
  authprofile: state.profile,
  giphygallery: state.giphygallery,
  offlineactions: state.offlineactions,
});

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default connect(mapStateToProps, actions)(GiphyGalleryScreen);
