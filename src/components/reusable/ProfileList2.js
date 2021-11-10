import React, {Component} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  ActivityIndicator,
  Text,
} from 'react-native';
import {ListItem, Button, Icon} from 'react-native-elements';
import {useTheme} from '../../assets/themes/index';
import {
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {checkData} from '../../utilities/index';
import {AvatarNavModal, PanelMsg} from './ResuableWidgets';
import {Navigation} from 'react-native-navigation';
import TouchableScale from 'react-native-touchable-scale/src/TouchableScale';

const {colors} = useTheme();

class ProfileList2Item extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (
      this.props.avatar != nextProps.avatar ||
      this.props.username != nextProps.username
    ) {
      return true;
    }
    return false;
  }

  render() {
    let {
      avatar,
      username,
      bio,
      gender,
      rightTitle,
      containerStyle,
      leftAvatarPress,
      onPress,
    } = this.props;
    avatar = checkData(avatar)
      ? {uri: avatar}
      : require('../../assets/images/placeholder.png');
    return (
      <ListItem
        leftAvatar={{
          source: avatar,
          onPress: leftAvatarPress,
          size: 35,
        }}
        Component={TouchableScale}
        contentContainerStyle={{}}
        activeScale={0.8}
        friction={100}
        tension={100}
        rightTitle={rightTitle}
        rightIcon={{
          name: gender == 'false' ? 'user' : gender,
          type: 'font-awesome',
          size: responsiveFontSize(2),
          marginRight: 15,
          color: colors.text,
        }}
        rightTitleStyle={{
          color: colors.text,
          fontSize: responsiveFontSize(1.2),
          marginRight: 6,
        }}
        title={username}
        onPress={onPress}
        containerStyle={{
          borderBottomWidth: 0.4,
          borderColor: colors.border,
          padding: 5,
          marginLeft: 20,
          backgroundColor: colors.background,
          ...containerStyle,
        }}
        titleStyle={{
          color: colors.text,
          fontSize: responsiveFontSize(2.1),
          fontWeight: 'bold',
        }}
        subtitleStyle={{color: colors.iconcolor}}
        subtitle={bio}
      />
    );
  }
}

class ProfileList2 extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      avatarnavmodal: {
        visible: false,
        avatar: null,
        profile: null,
        headername: '',
      },
    };
    this.navmodallistitem = [
      {
        icon: {
          name: 'user',
          type: 'evilicon',
        },
        onPress: () => {
          this.setState({
            avatarnavmodal: {
              ...this.state.avatarnavmodal,
              visible: false,
            },
          });
          Navigation.showModal({
            component: {
              name: 'ViewProfile',
              passProps: {
                navparent: true,
                reqprofile: this.state.avatarnavmodal.profile,
                screentype: 'modal',
              },
            },
          });
        },
      },
      {
        icon: {
          name: 'comment',
          type: 'evilicon',
        },
        onPress: () => {
          this.setState({
            avatarnavmodal: {
              ...this.state.avatarnavmodal,
              visible: false,
            },
          });

          Navigation.showModal({
            component: {
              name: 'PrivateChat',
              passProps: {
                navparent: true,
                propfindpartnerchat: true,
                privatechatobj: {
                  partnerprofile: this.state.avatarnavmodal.profile,
                },
                screentype: 'modal',
              },
            },
          });
        },
      },
    ];
  }

  componentDidMount() {
    if (checkData(this.props.onFetch)) {
      this.props.onFetch();
    }
  }

  _keyExtractor = (item, index) => index.toString();

  _getItemLayout = (data, index) => {
    if (index == -1) return {index, length: 0, height: 0};
    return {length: 70, offset: 70 * index, index};
  };

  _setFlatlistFooter = () => {
    if (this.props.loadingmore == true) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            marginTop: 15,
            alignItems: 'center',
          }}>
          <ActivityIndicator size={30} color={'silver'} />
        </View>
      );
    } else if (this.props.loadingmore == 'retry') {
      return (
        <Button
          type="clear"
          onPress={() => this.props.onLoadMore()}
          icon={{
            name: 'sync',
            type: 'antdesign',
            size: responsiveFontSize(2.7),
            color: colors.text,
          }}
          title="Retry"
          titleStyle={{color: colors.text, fontSize: responsiveFontSize(2)}}
          buttonStyle={{
            alignSelf: 'center',
            marginTop: 10,
            borderColor: colors.iconcolor,
            borderRadius: 15,
            padding: 10,
          }}
        />
      );
    } else if (this.props.loadingmore == false) {
      return (
        <Button
          onPress={() => this.props.onLoadMore()}
          type="clear"
          icon={{
            name: 'plus',
            type: 'evilicon',
            size: responsiveFontSize(6),
            color: colors.text,
          }}
          titleStyle={{color: colors.text, fontSize: responsiveFontSize(2)}}
          buttonStyle={{
            alignSelf: 'center',
            marginTop: 10,
            borderColor: colors.iconcolor,
            borderRadius: 15,
            padding: 10,
          }}
        />
      );
    }
  };

  _setEmptyPlaceholder = () => {
    if (this.props.fetching == true) {
      return (
        <View
          style={{
            alignItems: 'center',
            height: 200,
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" color={'silver'} />
        </View>
      );
    } else if (this.props.fetching == 'retry') {
      return (
        <View
          style={{alignItems: 'center', height: 200, justifyContent: 'center'}}>
          <Icon
            onPress={() => this.props.onFetch()}
            color={colors.text}
            size={responsiveFontSize(4)}
            name="sync"
            type="antdesign"
          />
          <Text style={{color: colors.text}}>Tap to retry </Text>
        </View>
      );
    }
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 200,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon
          type="entypo"
          name="users"
          style={{borderColor: colors.text, marginHorizontal: 3}}
          color={colors.border}
          size={responsiveFontSize(4.5)}
        />
      </View>
    );
  };
  _setAvatarNavModal = item => {
    if (!checkData(item)) {
      return;
    }
    this.setState({
      avatarnavmodal: {
        //...this.state.avatarnavmodal,
        headername: item.profile.user.username,
        profile: item.profile,
        avatar: item.profile.avatar[1],
        visible: true,
      },
    });
  };

  _setFollowMsg = item => {
    if (item.profile.following == true && item.profile.followsu == true) {
      return 'You follow each other';
    } else if (item.profile.following == true) {
      return 'you follow';
    } else if (item.profile.followsu == true) {
      return 'profile follows you';
    } else {
      return null;
    }
  };

  _renderItem = ({item}) => {
    // return <Text>{item}</Text>
    if (item.profile.ublockedprofile == true && item.allowblockpass != true) {
      return (
        <PanelMsg
          message={'This profile is blocked by you '}
          buttonTitle={'View'}
          buttonPress={() =>
            this.props.updateItem({
              allowblockpass: true,
              profile: {
                ...item.profile,
              },
            })
          }
        />
      );
    } else if (item.profile.profileblockedu == true) {
      return (
        <PanelMsg
          message={'This profile is unavailable to view'}
          buttonTitle={'Learn More'}
        />
      );
    } else if (
      item.profile.user.approved != true ||
      item.profile.user.deleted == true
    ) {
      return null;
    }

    return (
      <ProfileList2Item
        avatar={item.profile.avatar[1]}
        username={item.profile.profile_name}
        gender={item.profile.user.gender}
        leftAvatarPress={() => this._setAvatarNavModal(item)}
        rightTitle={this._setFollowMsg(item)}
        onPress={() =>
          checkData(this.props.onPress)
            ? this.props.onPress(item)
            : this._setAvatarNavModal(item)
        }
        bio={item.profile.user.username}
        textStyle={{color: colors.text}}
        containerStyle={{
          padding: 5,
          marginTop: 8,
          backgroundColor: colors.background,
          borderBottomWidth: 0.3,
        }}
        loading={false}
      />
    );
  };

  render() {
    let placeholder =
      checkData(this.props.placeholder) == true
        ? this.props.placeholder
        : this._setEmptyPlaceholder();
    return (
      <>
        <FlatList
          data={this.props.data}
          contentContainerStyle={{marginTop: 10}}
          initialNumRender={5}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode={'on-drag'}
          windowSize={2}
          maxToRenderPerBatch={1}
          updateCellsBatchingPeriod={1}
          getItemLayout={this._getItemLayout}
          keyExtractor={this._keyExtractor}
          ListEmptyComponent={placeholder}
          ListFooterComponent={
            this.props.data.length > 0 && this._setFlatlistFooter()
          }
          renderItem={this._renderItem}
        />
        <AvatarNavModal
          avatar={this.state.avatarnavmodal.avatar}
          isVisible={this.state.avatarnavmodal.visible}
          onBackdropPress={() =>
            this.setState({
              avatarnavmodal: {
                ...this.state.avatarnavmodal,
                visible: false,
              },
            })
          }
          onAvatarPress={() => {
            this.setState({
              avatarnavmodal: {
                ...this.state.avatarnavmodal,
                visible: false,
              },
            });
            Navigation.showModal({
              component: {
                name: 'PhotoViewer',
                passProps: {
                  navparent: true,
                  photos: [this.state.avatarnavmodal.avatar],
                },
              },
            });
          }}
          headername={this.state.avatarnavmodal.headername}
          navBarItemArr={this.navmodallistitem}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  listItemContainerStyle: {
    backgroundColor: colors.background,
    borderBottomWidth: 0.4,
    borderRadius: 20,
    //elevation: 2,
    padding: 0,
    borderColor: colors.border,
  },
});

export default ProfileList2;
