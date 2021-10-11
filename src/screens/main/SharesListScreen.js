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
import ProfileList from '../../components/reusable/ProfileList';
import {checkData} from '../../utilities/index';

const {colors} = useTheme();

const SharesListScreen = ({
  screenname,
  componentId,
  setReset,
  navparent,
  requrl,
  reqdata,
  fetchShares,
  fetchMoreShares,
  updateSharesListForm,
  shareslistform,
  followProfileAction,
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
  let lefticonpress =
    navparent == true ? () => Navigation.dismissModal(componentId) : null;
  let righticon = '';
  let righticonpress = '';
  useEffect(() => {
    setReset('shareslistform');
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
  return (
    <SafeAreaView style={styles.containerStyle}>
      <Header
        headertext={screenname || 'Shares'}
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
              type="entypo"
              name="forward"
              color={colors.text}
              size={responsiveFontSize(10)}
            />
          }
          animationType={'zoomIn'}
        />
      ) : (
        <View style={styles.parentStyle}>
          <ProfileList
            data={shareslistform.shareslist}
            onFetch={() => fetchShares(requrl, reqdata)}
            fetching={shareslistform.fetching}
            followProfileAction={followProfileAction}
            processfollowing={profileactionform.followingprofile}
            updateItem={updateSharesListForm}
            onLoadMore={() => fetchMoreShares(reqdata)}
            loadingmore={shareslistform.loadingmore}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  shareslistform: state.shareslistform,
  profileactionform: state.profileactionform,
});
SharesListScreen.options = {
  topBar: {
    visible: false,
  },
};

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
export default connect(mapStateToProps, actions)(SharesListScreen);
