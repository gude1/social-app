import React, {Component} from 'react';
import {View, ActivityIndicator, FlatList, StyleSheet} from 'react-native';
import {checkData, handleTime, hasProperty, isEmpty} from '../../utilities';
import TouchableScale from 'react-native-touchable-scale';
import {
  responsiveFontSize,
  responsiveWidth,
  responsiveHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {Navigation} from 'react-native-navigation';
import {Text, Button, Icon, ListItem} from 'react-native-elements';
import {useTheme} from '../../assets/themes/index';
import {AvatarNavModal, PanelMsg} from './ResuableWidgets';
//import {ListItem} from './ResuableWidgets';

const {colors} = useTheme();

const _setEmptyPlaceHolder = (loading, func) => {
  if (loading == true) {
    return (
      <View
        style={{
          width: '100%',
          height: responsiveHeight(70),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator size="large" color={'silver'} />
      </View>
    );
  } else {
    return (
      <View
        style={{
          width: '100%',
          height: responsiveHeight(70),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Button
          type="outline"
          onPress={func}
          icon={{
            name: 'sync',
            type: 'antdesign',
            size: responsiveFontSize(2),
            color: colors.iconcolor,
          }}
          title="Try again"
          titleStyle={{
            color: colors.iconcolor,
            textAlign: 'center',
            fontSize: responsiveFontSize(1.4),
          }}
          containerStyle={{
            marginTop: 20,
          }}
          buttonStyle={{
            borderColor: colors.iconcolor,
            borderRadius: 15,
            padding: 10,
          }}
        />
      </View>
    );
  }
};

const _setFooterComponent = (loadingmore, len, func) => {
  if (isEmpty(len) || len < 1) {
    return null;
  } else {
    return (
      <Button
        type="clear"
        loading={loadingmore || false}
        disabled={loadingmore || false}
        onPress={func}
        icon={{
          name: 'plus',
          type: 'evilicon',
          size: responsiveFontSize(5),
          color: colors.text,
        }}
        titleStyle={{
          color: colors.text,
          fontSize: responsiveFontSize(2),
        }}
        containerStyle={{
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

const _keyExtractor = (item, index) => index.toString();

export class NotificationList extends Component {
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
    if (checkData(this.props.fetchNotes)) {
      //console.warn('componendidmountfetch nite called');
      this.props.fetchNotes();
    }
  }

  _onAvatarPress = profile => {
    if (isEmpty(profile)) {
      return;
    }
    return () => {
      this.setState({
        avatarnavmodal: {
          ...this.state.avatarnavmodal,
          headername: profile.user.username,
          profile: profile,
          avatar: profile.avatar[1],
          visible: true,
        },
      });
    };
  };

  _arrangeNote = item => {
    if (isEmpty(item)) {
      return null;
    }
    let msg = null;
    let count_msg = null;
    switch (item.type) {
      case 'postlike':
        msg = `${item?.post?.post_text}`;
        count_msg =
          item.related_count > 0
            ? `${item.initiator_profile.profile_name} and ${
                item.related_count
              } others liked your post`
            : `${item.initiator_profile.profile_name} liked your post`;
        return (
          <ListItem
            Component={TouchableScale}
            activeScale={0.8}
            friction={100}
            tension={100}
            leftAvatar={{
              source: {uri: item.initiator_profile.avatar[1]},
              onPress: this._onAvatarPress(item.initiator_profile),
            }}
            onPress={() => {
              Navigation.showModal({
                component: {
                  name: 'PostShow',
                  passProps: {
                    navparent: true,
                    screentype: 'modal',
                    toshowpost: item?.post,
                  },
                },
              });
            }}
            containerStyle={styles.containerStyle}
            title={count_msg}
            titleStyle={styles.titleStyle}
            rightTitle={handleTime(Math.floor(item.updated_at * 1000))}
            rightTitleStyle={styles.rightTitleStyle}
            subtitle={msg}
            subtitleStyle={{color: colors.placeholder}}
          />
        );
        break;
      case 'postcomment':
        msg = `${item?.postcomment?.owner_post?.post_text}`;
        count_msg =
          item.related_count > 0
            ? `${item.initiator_profile.profile_name} and ${
                item.related_count
              } others commented on your post`
            : `${item.initiator_profile.profile_name} commented on your post`;
        return (
          <ListItem
            Component={TouchableScale}
            activeScale={0.8}
            friction={100}
            tension={100}
            leftAvatar={{
              source: {uri: item.initiator_profile.avatar[1]},
              onPress: this._onAvatarPress(item.initiator_profile),
            }}
            onPress={() => {
              Navigation.showModal({
                component: {
                  name: 'PostComment',
                  passProps: {
                    navparent: true,
                    screentype: 'modal',
                    makerequest: false,
                    postcomments: [item.postcomment],
                    ownerpost: item?.postcomment?.owner_post,
                  },
                },
              });
            }}
            containerStyle={styles.containerStyle}
            title={count_msg}
            titleStyle={styles.titleStyle}
            rightTitle={handleTime(Math.floor(item.updated_at * 1000))}
            rightTitleStyle={styles.rightTitleStyle}
            subtitle={msg}
            subtitleStyle={{color: colors.placeholder}}
          />
        );
        break;
      case 'postcommentlike':
        //console.warn(item);
        msg = `${item?.postcomment?.comment_text}`;
        count_msg =
          item.related_count > 0
            ? `${item.initiator_profile.profile_name} and ${
                item.related_count
              } others like your comment`
            : `${item.initiator_profile.profile_name} liked your comment`;
        return (
          <ListItem
            Component={TouchableScale}
            activeScale={0.8}
            friction={100}
            tension={100}
            leftAvatar={{
              source: {uri: item.initiator_profile.avatar[1]},
              onPress: this._onAvatarPress(item.initiator_profile),
            }}
            titleStyle={styles.titleStyle}
            onPress={() => {
              Navigation.showModal({
                component: {
                  name: 'PostCommentReply',
                  passProps: {
                    navparent: true,
                    ownercomment: item?.postcomment,
                  },
                },
              });
            }}
            containerStyle={styles.containerStyle}
            title={count_msg}
            titleStyle={styles.titleStyle}
            rightTitle={handleTime(Math.floor(item.updated_at * 1000))}
            rightTitleStyle={styles.rightTitleStyle}
            subtitle={msg}
            subtitleStyle={{color: colors.placeholder}}
          />
        );
        break;
      case 'postcommentreply':
        msg = `${item?.postcommentreply?.origin?.comment_text}`;
        count_msg =
          item.related_count > 0
            ? `${item.initiator_profile.profile_name} and ${
                item.related_count
              } others replied to your comment`
            : `${item.initiator_profile.profile_name} replied to your comment`;
        return (
          <ListItem
            Component={TouchableScale}
            activeScale={0.8}
            friction={100}
            tension={100}
            leftAvatar={{
              source: {uri: item.initiator_profile.avatar[1]},
              onPress: this._onAvatarPress(item.initiator_profile),
            }}
            onPress={() => {
              Navigation.showModal({
                component: {
                  name: 'PostCommentReply',
                  passProps: {
                    navparent: true,
                    makerequest: false,
                    replies: [item.postcommentreply],
                    ownercomment: item?.postcommentreply?.origin,
                  },
                },
              });
            }}
            rightTitle={handleTime(Math.floor(item.updated_at * 1000))}
            rightTitleStyle={styles.rightTitleStyle}
            containerStyle={styles.containerStyle}
            title={count_msg}
            titleStyle={styles.titleStyle}
            rightTitle={handleTime(Math.floor(item.updated_at * 1000))}
            rightTitleStyle={styles.rightTitleStyle}
            subtitle={msg}
            subtitleStyle={{color: colors.placeholder}}
          />
        );
        break;
      case 'postcommentreplylike':
        msg = `${item?.postcommentreply?.reply_text}`;
        isEmpty(item.postcommentreply) && alert(JSON.stringify(item));
        count_msg =
          item.related_count > 0
            ? `${item.initiator_profile.profile_name} and ${
                item.related_count
              } others liked your reply`
            : `${item.initiator_profile.profile_name} liked your reply`;
        return (
          <ListItem
            Component={TouchableScale}
            activeScale={0.8}
            friction={100}
            tension={100}
            leftAvatar={{
              source: {uri: item.initiator_profile.avatar[1]},
              onPress: this._onAvatarPress(item.initiator_profile),
            }}
            onPress={() => {
              Navigation.showModal({
                component: {
                  name: 'PostCommentReply',
                  passProps: {
                    navparent: true,
                    makerequest: false,
                    replies: [item?.postcommentreply],
                    ownercomment: item?.postcommentreply?.origin,
                  },
                },
              });
            }}
            containerStyle={styles.containerStyle}
            title={count_msg}
            titleStyle={styles.titleStyle}
            rightTitle={handleTime(Math.floor(item.updated_at * 1000))}
            rightTitleStyle={styles.rightTitleStyle}
            subtitle={msg}
            subtitleStyle={{color: colors.placeholder}}
          />
        );
        break;
      case 'profilefollow':
        msg = `${item.initiator_profile.profile_name} started following you`;
        return (
          <ListItem
            Component={TouchableScale}
            activeScale={0.8}
            friction={100}
            tension={100}
            leftAvatar={{
              source: {uri: item.initiator_profile.avatar[1]},
              //onPress: this._onAvatarPress(item.initiator_profile),
            }}
            onPress={() => {
              Navigation.showModal({
                component: {
                  name: 'ViewProfile',
                  passProps: {
                    navparent: true,
                    reqprofile: item.initiator_profile,
                    screentype: 'modal',
                  },
                },
              });
            }}
            containerStyle={styles.containerStyle}
            title={msg}
            titleStyle={styles.titleStyle}
            rightTitle={handleTime(Math.floor(item.updated_at * 1000))}
            rightTitleStyle={styles.rightTitleStyle}
          />
        );
        break;
      default:
        return <PanelMsg message={item.type} />;
        break;
    }
  };

  renderItem = ({item}) => {
    if (
      isEmpty(item) ||
      isEmpty(item.initiator_profile) ||
      isEmpty(item.initiator_profile.user)
    ) {
      return null;
    }
    return this._arrangeNote(item);
  };

  render() {
    let {list, loading, loadingmore, fetchNotes} = this.props;
    list = list || [];
    return (
      <>
        <FlatList
          data={list}
          keyExtractor={_keyExtractor}
          initialNumRender={5}
          showsVerticalScrollIndicator={false}
          renderItem={this.renderItem}
          ListEmptyComponent={_setEmptyPlaceHolder(loading, fetchNotes)}
          ListFooterComponent={_setFooterComponent(
            loadingmore,
            list.length,
            () => fetchNotes([true]),
          )}
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

export class MentionsList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (checkData(this.props.fetchMentions)) {
      // console.warn('componendidmountfetch nite called');
      this.props.fetchMentions();
    }
  }

  renderItem = ({item}) => {
    return <Text style={{color: colors.text}}>{item.id}</Text>;
  };
  render() {
    let {list, loading, loadingmore, fetchMentions} = this.props;
    list = list || [];
    return (
      <FlatList
        data={list}
        keyExtractor={_keyExtractor}
        initialNumRender={5}
        showsVerticalScrollIndicator={false}
        renderItem={this.renderItem}
        ListEmptyComponent={_setEmptyPlaceHolder(loading, fetchMentions)}
        ListFooterComponent={_setFooterComponent(loadingmore, list.length)}
      />
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: colors.background,
    marginBottom: 1,
    paddingLeft: 30,
    borderBottomWidth: 0.3,
    borderColor: colors.border,
  },
  titleStyle: {
    fontWeight: 'bold',
    color: colors.text,
  },
  rightTitleStyle: {
    color: 'silver',
    fontSize: responsiveFontSize(1.8),
    marginRight: 5,
  },
});
