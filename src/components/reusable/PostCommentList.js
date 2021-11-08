import React from 'react';
import {FlatList, StyleSheet, View, ActivityIndicator} from 'react-native';
import {
  ListItem,
  ConfirmModal,
  BottomListModal,
  PanelMsg,
  ActivityOverlay,
  AvatarNavModal,
} from './ResuableWidgets';
import {
  responsiveFontSize,
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {useTheme} from '../../assets/themes';
import {checkData, handleTime, hasProperty, isEmpty} from '../../utilities';
import {Icon, Overlay, Text, Button} from 'react-native-elements';
import {Navigation} from 'react-native-navigation';
import TouchableScale from 'react-native-touchable-scale/src/TouchableScale';

const {colors} = useTheme();

export const ShowComment = ({
  data,
  onAvatarPress,
  updateComment,
  onLongPress,
  likePress,
  numLikesPress,
  replyPress,
}) => {
  if (!Array.isArray(data) || data.length < 1) {
    return null;
  }
  return data.map((item, index) => {
    if (item.profile.profilemuted == true && item.muted != false) {
      return (
        <PanelMsg
          message={'This comment is from someone you have muted '}
          buttonTitle={'View'}
          buttonPress={() => {
            checkData(updateComment) &&
              updateComment({
                commentid: item.commentid,
                muted: false,
              });
          }}
        />
      );
    } else if (
      item.profile.ublockedprofile == true &&
      item.allowblockpass != true
    ) {
      return (
        <PanelMsg
          message={'This comment is from someone you have blocked '}
          buttonTitle={'View'}
          buttonPress={() => {
            checkData(updateComment) &&
              updateComment({
                commentid: item.commentid,
                muted: false,
              });
          }}
        />
      );
    } else if (item.profile.profileblockedu == true) {
      return (
        <PanelMsg
          message={'This comment is unavailable '}
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
      <ListItem
        key={index}
        time={
          checkData(item.sendingmsg)
            ? item.sendingmsg
            : handleTime(Math.floor(item.created_at * 1000))
        }
        onRetryPress={item.onRetry}
        onLongPress={() => {
          checkData(onLongPress) && onLongPress(item);
        }}
        //replyPress={}
        leftAvatar={{uri: item.profile.avatar[1]}}
        onAvatarPress={() => {
          checkData(onAvatarPress) && onAvatarPress(item);
        }}
        title={item.profile.profile_name}
        subtitle={item.comment_text}
        deleted={item.deleted}
        profilemuted={item.profile.profilemuted}
        likes={item.num_likes}
        hide={item.hidden}
        numLikesPress={() => {
          checkData(numLikesPress) && numLikesPress(item);
        }}
        likebtn
        likePress={() => {
          checkData(likePress) && likePress(item);
        }}
        liked={item.commentliked}
        replies={item.num_replies}
        replyPress={() => {
          checkData(replyPress) && replyPress(item);
        }}
      />
    );
  });
};

export default class PostCommentList extends React.Component {
  constructor(props) {
    super(props);
    this.reswidth = responsiveWidth(100);
    this.resheight = responsiveHeight(100);
    this.state = {
      confirmdeletevisible: false,
      confirmhidevisible: false,
      commenthidden: false,
      profilemuted: false,
      confirmmutevisible: false,
      usercommentmodal: false,
      otherscommentmodal: false,
      avatarnavmodal: {
        visible: false,
        avatar: null,
        profile: null,
        headername: '',
      },
    };
    this.currentcommentid = null;
    this.currentcommentownerprofile = null;
    this.currentcommentownerid = null;
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

    this.bottomodallistowneroptions = [
      {
        listtext: 'Delete Comment',
        onPress: () => {
          this.setState({usercommentmodal: false});
          this.setState({confirmdeletevisible: true});
        },
        icon: {
          name: 'trash',
          type: 'entypo',
        },
      },
    ];
    this.bottomodallistothersoptions = [
      {
        listtext: 'Mute profile',
        id: 'muteprofile',
        icon: {
          name: 'volume-x',
          type: 'feather',
        },
        onPress: () => {
          this.setState({otherscommentmodal: false});
          this.setState({confirmmutevisible: true});
        },
      },
    ];
    if (
      this.props.userprofile.profile_id ==
      this.props.parentpost.profile.profile_id
    ) {
      this.bottomodallistothersoptions = [
        ...this.bottomodallistothersoptions,
        {
          listtext: 'Hide comment',
          id: 'hidec',
          icon: {
            name: 'eye-off',
            type: 'feather',
          },
          onPress: () => {
            this.setState({otherscommentmodal: false});
            this.setState({confirmhidevisible: true});
          },
        },
      ];
    }
  }
  componentDidMount() {
    this.setState({
      othersbottommodallist: this.bottomodallistothersoptions,
      userbottommodallist: this.bottomodallistowneroptions,
    });
    /*if (checkData(this.props.parentpost)) {
            this.props.onFetch(this.props.parentpost.postid);
        }*/
  }
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
            onPress={() => this.props.onFetch(this.props.parentpost.postid)}
            color={colors.text}
            size={responsiveFontSize(4)}
            name="sync"
            type="antdesign"
          />
          <Text style={{color: colors.text}}>Tap to retry </Text>
        </View>
      );
    }
    return null;
  };

  _setSelected = (commentid, ownerid, item) => {
    if (checkData(commentid) && checkData(ownerid) && checkData(item.profile)) {
      this.currentcommentid = commentid;
      this.currentcommentownerid = ownerid;
      this.currentcommentownerprofile = item.profile;
    }
    if (ownerid == this.props.userprofile.profile_id) {
      this._openUserBottomModal();
    } else {
      this._setOthersModalList(item);
      this._openOthersBottomModal();
    }
  };

  _setOthersModalList = item => {
    if (!checkData(item) || !checkData(item.profile)) {
      return;
    }
    let adjustedlist = null;
    let profilechangemuted = this.props.profileschanges.find(
      item => item.profileid == this.currentcommentownerid,
    );
    profilechangemuted = checkData(profilechangemuted)
      ? profilechangemuted.profilemuted
      : null;
    profilechangemuted = checkData(profilechangemuted)
      ? profilechangemuted
      : item.profile.profilemuted;
    /*** for  profile muted */
    if (profilechangemuted) {
      adjustedlist = this.state.othersbottommodallist.map(item => {
        return item.id == 'muteprofile'
          ? {
              ...item,
              listtext: 'Unmute profile',
              icon: {
                name: 'volume',
                type: 'feather',
              },
            }
          : item;
      });
      this.setState({
        othersbottommodallist: adjustedlist,
        profilemuted: profilechangemuted,
      });
    } else {
      adjustedlist = this.state.othersbottommodallist.map(item => {
        return item.id == 'muteprofile'
          ? {
              ...item,
              listtext: 'Mute profile',
              icon: {
                name: 'volume-x',
                type: 'feather',
              },
            }
          : item;
      });
      this.setState({
        othersbottommodallist: adjustedlist,
        profilemuted: profilechangemuted,
      });
    }
    /**for hide comment */
    if (
      this.props.userprofile.profile_id !=
      this.props.parentpost.profile.profile_id
    ) {
      return;
    }
    if (item.hidden == true) {
      adjustedlist = this.state.othersbottommodallist.map(item => {
        return item.id == 'hidec'
          ? {
              ...item,
              listtext: 'Unhide comment',
              icon: {
                name: 'eye',
                type: 'feather',
              },
            }
          : item;
      });
      this.setState({
        othersbottommodallist: adjustedlist,
        commenthidden: item.hidden,
      });
    } else {
      adjustedlist = this.state.othersbottommodallist.map(item => {
        return item.id == 'hidec'
          ? {
              ...item,
              listtext: 'Hide comment',
              icon: {
                name: 'eye-off',
                type: 'feather',
              },
            }
          : item;
      });
      this.setState({
        othersbottommodallist: adjustedlist,
        commenthidden: item.hidden,
      });
    }
  };

  _muteProfile = () => {
    let initaction = () =>
      this.props.setProcessing(true, 'postcommentformmuting');
    let failedaction = () =>
      this.props.setProcessing(false, 'postcommentformmuting');
    let okaction = () => {
      this.props.updateComment({
        commentid: this.currentcommentid,
        muted: !this.state.profilemuted,
        profile: {
          ...this.currentcommentownerprofile,
          profilemuted: !this.state.profilemuted,
        },
      });
      this.props.updatePostCommentProfile({
        profileid: this.currentcommentownerid,
        profilemuted: !this.state.profilemuted,
      });
      this.props.setProcessing(false, 'postcommentformmuting');
    };
    this.props.onMute(
      this.currentcommentownerid,
      initaction,
      okaction,
      failedaction,
    );
  };

  _openOthersBottomModal = () => {
    this.setState({otherscommentmodal: true});
  };

  _openUserBottomModal = () => {
    this.setState({usercommentmodal: true});
  };

  _onDeletePress = () => {
    this.setState({confirmdeletevisible: false});
    this.props.onDelete(this.currentcommentid, this.currentcommentownerid);
  };

  _onItemLiked = (commentid, likestatus, numlikes) => {
    if (
      checkData(commentid) != true ||
      checkData(likestatus) != true ||
      checkData(numlikes) != true
    ) {
      return;
    }
    numlikes = Number(numlikes);
    likestatus = likestatus == true ? false : true;
    if (likestatus) {
      numlikes = numlikes + 1 < 1 ? 1 : numlikes + 1;
    } else {
      numlikes = numlikes - 1 < 0 ? 0 : numlikes - 1;
    }
    this.props.onItemLike(commentid, likestatus, numlikes);
  };

  _navShowLikes = commentid => {
    if (checkData(commentid) != true) {
      return;
    }
    Navigation.showModal({
      component: {
        name: 'LikesList',
        passProps: {
          navparent: true,
          requrl: 'postcommentlikes',
          reqdata: {commentid},
        },
      },
    });
  };

  _navShowReplies = comment => {
    if (checkData(comment) != true) {
      return;
    }
    Navigation.showModal({
      component: {
        name: 'PostCommentReply',
        passProps: {
          navparent: true,
          ownercomment: comment,
        },
      },
    });
  };

  _getItemLayout = (data, index) => {
    if (index == -1) return {index, length: 0, height: 0};
    return {length: 100, offset: 100 * index, index};
  };

  _keyExtractor = (item, index) => item.commentid;

  _setHeaderComponent = () => {
    return checkData(this.props.parentpost) == true ? (
      <View style={styles.postTextContainer}>
        {
          <ListItem
            time={handleTime(
              Math.floor(this.props.parentpost.created_at * 1000),
            )}
            likes={this.props.parentpost.num_post_likes}
            numLikesPress={() =>
              Navigation.showModal({
                component: {
                  name: 'LikesList',
                  passProps: {
                    navparent: true,
                    requrl: 'postlikes',
                    reqdata: {postid: this.props.parentpost.postid},
                  },
                },
              })
            }
            onPress={() =>
              Navigation.showModal({
                component: {
                  name: 'PostShow',
                  passProps: {
                    navparent: true,
                    toshowpost: this.props.parentpost,
                  },
                },
              })
            }
            title={this.props.parentpost.profile.profile_name}
            leftAvatar={{uri: this.props.parentpost.profile.avatar[1]}}
            onAvatarPress={() => {
              this.setState({
                avatarnavmodal: {
                  ...this.state.avatarnavmodal,
                  headername: this.props.parentpost.profile.user.username,
                  profile: this.props.parentpost.profile,
                  avatar: this.props.parentpost.profile.avatar[1],
                  visible: true,
                },
              });
            }}
            subtitle={this.props.parentpost.post_text}
            timeTextStyle={{fontSize: responsiveFontSize(1.6)}}
            BottomContainerItem={
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.5),
                    color: 'silver',
                    margin: 2,
                  }}>
                  {this.props.parentpost.num_post_comments} comments
                </Text>
              </View>
            }
          />
        }
      </View>
    ) : null;
  };

  _setFooterComponent = () => {
    if (this.props.loadingmore == true) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            margin: 6,
            alignItems: 'center',
          }}>
          <ActivityIndicator size={30} color={colors.border} />
        </View>
      );
    } else if (this.props.loadingmore == 'retry') {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            margin: 6,
            alignItems: 'center',
          }}>
          <Icon
            color={colors.text}
            size={responsiveFontSize(4)}
            onPress={() => this.props.onLoadMore(this.props.parentpost.postid)}
            name="sync"
            type="antdesign"
          />
          <Text
            style={{color: colors.border, fontSize: responsiveFontSize(1.5)}}>
            Tap to retry
          </Text>
        </View>
      );
    } else if (this.props.loadingmore == false) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            margin: 10,
            alignItems: 'center',
          }}>
          <Icon
            color={colors.text}
            size={responsiveFontSize(5)}
            onPress={() => this.props.onLoadMore(this.props.parentpost.postid)}
            name="plus"
            type="evilicon"
          />
        </View>
      );
    } else {
      return null;
    }
  };

  _onPress = item => {
    if (
      !isEmpty(item) &&
      item.retry == true &&
      checkData(this.props.makeComment)
    ) {
      this.props.makeComment([
        this.props.parentpost.postid,
        item.comment_text,
        item.commentid,
      ]);
    } else {
      return null;
    }
  };

  _renderItem = ({item}) => {
    if (
      !hasProperty(item, ['profile']) ||
      !hasProperty(item.profile, ['user']) ||
      item.profile.user.approved != true ||
      item.profile.user.deleted == true
    ) {
      return <PanelMsg message={'Comment is unavailable'} />;
    } else if (item.profile.profilemuted == true && item.muted != false) {
      return (
        <PanelMsg
          message={'This comment is from someone you have muted '}
          buttonTitle={'View'}
          buttonPress={() =>
            this.props.updateComment({
              commentid: item.commentid,
              muted: false,
            })
          }
        />
      );
    } else if (
      item.profile.ublockedprofile == true &&
      item.allowblockpass != true
    ) {
      return (
        <PanelMsg
          message={'This comment is from someone you have blocked '}
          buttonTitle={'View'}
          buttonPress={() =>
            this.props.updateComment({
              commentid: item.commentid,
              allowblockpass: true,
            })
          }
        />
      );
    } else if (item.profile.profileblockedu == true) {
      return (
        <PanelMsg
          message={'This comment is unavailable '}
          buttonTitle={'Learn More'}
        />
      );
    }

    return (
      <ListItem
        time={
          checkData(item.sendingmsg)
            ? item.sendingmsg
            : handleTime(Math.floor(item.created_at * 1000))
        }
        onPress={() => this._onPress(item)}
        onLongPress={() =>
          this._setSelected(item.commentid, item.profile.profile_id, item)
        }
        //replyPress={}
        leftAvatar={{uri: item.profile.avatar[1]}}
        onAvatarPress={() => {
          this.setState({
            avatarnavmodal: {
              ...this.state.avatarnavmodal,
              headername: item.profile.user.username,
              profile: item.profile,
              avatar: item.profile.avatar[1],
              visible: true,
            },
          });
        }}
        deleted={item.deleted}
        title={item.profile.profile_name}
        subtitle={item.comment_text}
        profilemuted={item.profile.profilemuted}
        likes={item.num_likes}
        hide={item.hidden}
        numLikesPress={() => this._navShowLikes(item.commentid)}
        likebtn
        likePress={() =>
          this._onItemLiked(item.commentid, item.commentliked, item.num_likes)
        }
        liked={item.commentliked}
        replies={item.num_replies}
        replyPress={() => this._navShowReplies(item)}
      />
    );
  };
  render() {
    //to hide pull to refresh functionality  when data is empty
    let onRefresh =
      this.props.data < 1
        ? null
        : () => this.props.onRefresh(this.props.parentpost.postid);
    return (
      <>
        <FlatList
          ref={ref => {
            this.props.setFlatlistRef(ref);
          }}
          data={this.props.data}
          //data={this.props.data.length > 0 ? [1] : []}
          getItemLayout={this._getItemLayout}
          refreshing={this.props.refreshing}
          maxToRenderPerBatch={1}
          updateCellsBatchingPeriod={1}
          //windowSize={50}
          onRefresh={onRefresh}
          keyboardShouldPersistTaps="always"
          initialNumRender={5}
          keyboardDismissMode={'on-drag'}
          keyExtractor={this._keyExtractor}
          ListHeaderComponent={this._setHeaderComponent()}
          ListEmptyComponent={this._setEmptyPlaceholder()}
          ListFooterComponent={
            this.props.data.length && this._setFooterComponent()
          }
          renderItem={this._renderItem}
        />
        <ConfirmModal
          isVisible={this.state.confirmdeletevisible}
          confirmMsg="Delete comment?"
          acceptText="Yeah"
          acceptAction={this._onDeletePress}
          rejectAction={() => this.setState({confirmdeletevisible: false})}
          rejectText="Nah"
        />
        <ActivityOverlay text="deleting" isVisible={this.props.deleting} />
        <ConfirmModal
          isVisible={this.state.confirmhidevisible}
          confirmMsg={
            this.state.commenthidden == true
              ? 'Unhide comment?'
              : 'Hide comment?'
          }
          acceptText="Yeah"
          acceptAction={() => {
            this.setState({confirmhidevisible: false});
            this.props.onHide(
              this.currentcommentid,
              this.props.userprofile.profile_id,
            );
          }}
          rejectAction={() => this.setState({confirmhidevisible: false})}
          rejectText="Nah"
        />
        <ActivityOverlay
          text={this.state.commenthidden == true ? 'unhiding' : 'hiding'}
          isVisible={this.props.hiding}
        />

        <ConfirmModal
          isVisible={this.state.confirmmutevisible}
          confirmMsg={
            this.state.profilemuted == true
              ? 'Unmute profile?'
              : 'Mute profile?'
          }
          acceptText="Yeah"
          acceptAction={() => {
            this.setState({confirmmutevisible: false});
            this._muteProfile();
          }}
          rejectAction={() => this.setState({confirmmutevisible: false})}
          rejectText="Nah"
        />
        <ActivityOverlay text={'processing'} isVisible={this.props.muting} />
        <BottomListModal
          listData={this.state.userbottommodallist}
          visible={this.state.usercommentmodal}
          onRequestClose={() => {
            this.setState({usercommentmodal: false});
          }}
        />
        <BottomListModal
          listData={this.state.othersbottommodallist}
          visible={this.state.otherscommentmodal}
          onRequestClose={() => {
            this.setState({otherscommentmodal: false});
          }}
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
  postTextContainer: {
    borderBottomWidth: 0.3,
    borderColor: colors.border,
  },
});
