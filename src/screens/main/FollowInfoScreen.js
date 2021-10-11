import React, {useEffect, useState} from 'react';
import {Navigation} from 'react-native-navigation';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import {LoaderScreen, Header} from '../../components/reusable/ResuableWidgets';
import {Icon, Avatar, Input} from 'react-native-elements';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useTheme} from '../../assets/themes/index';
import {checkData} from '../../utilities/index';
import ProfileList from '../../components/reusable/ProfileList';

const {colors} = useTheme();
const FollowInfoScreen = ({
  screenname,
  componentId,
  setReset,
  screentype,
  runAction,
  loadMore,
  navparent,
  followinfoform,
  followProfileAction,
  updateFollowInfoList,
  profileactionform,
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
  let lefticonpress = navparent == true ? () => setDismissNav() : null;
  let righticon = '';
  let righticonpress = '';
  useEffect(() => {
    setReset('followinfo');
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

  /**
   * component functions
   */
  function setDismissNav() {
    if (screentype == 'screen') return Navigation.pop(componentId);
    else return Navigation.dismissModal(componentId);
  }

  /**component functions */

  return (
    <SafeAreaView style={styles.containerStyle}>
      <Header
        headertext={screenname || 'Info'}
        headercolor={colors.card}
        lefticon={lefticon}
        leftIconPress={lefticonpress}
        headerTextStyle={{color: colors.text}}
        headertextsize={responsiveFontSize(2.9)}
      />
      {loaded == false ? (
        <LoaderScreen
          /*loaderIcon={<Icon
                    type="antdesign"
                    name="heart"
                    color={colors.text}
                    size={responsiveFontSize(10)}
                />}*/
          animationType={'zoomIn'}
        />
      ) : (
        <View style={styles.parentStyle}>
          <ProfileList
            data={followinfoform.list}
            onFetch={() => runAction()}
            fetching={followinfoform.loading}
            followProfileAction={followProfileAction}
            processfollowing={profileactionform.followingprofile}
            updateItem={updateFollowInfoList}
            onLoadMore={() => loadMore()}
            loadingmore={followinfoform.loadingmore}
          />
        </View>
      )}
    </SafeAreaView>
  );
};
FollowInfoScreen.options = {
  topBar: {
    visible: false,
  },
};

const mapStateToProps = (state) => ({
  profileactionform: state.profileactionform,
  followinfoform: state.followinfo,
});
const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: colors.background,
  },
  parentStyle: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default connect(mapStateToProps, actions)(FollowInfoScreen);
