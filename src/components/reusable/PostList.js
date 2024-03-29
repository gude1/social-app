import React, {Component} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import {
  Header,
  ReloadableImage,
  BottomListModal,
  ConfirmModal,
  PanelMsg,
  ActivityOverlay,
  AvatarNavModal,
} from './ResuableWidgets';
import {useTheme} from '../../assets/themes/index';
import {
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {Icon, Avatar, Button} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
//import { ViewPager, IndicatorViewPager, PagerDotIndicator } from '';
import * as Animatable from 'react-native-animatable';
import {
  checkData,
  handleTime,
  hasProperty,
  LinkingHandler,
} from '../../utilities/index';
import {Navigation} from 'react-native-navigation';
import {store} from '../../store/index';
import TouchableScale from 'react-native-touchable-scale';
import {ViewPager, IndicatorViewPager, PagerDotIndicator} from './viewpager';
import ParsedText from 'react-native-parsed-text';

const {colors} = useTheme();
const postwidth = responsiveWidth(94) > 1240 ? 1240 : responsiveWidth(94);
const postheight = postwidth + 110;

class PostImageViewPager extends Component {
  constructor(prop) {
    super(prop);
    this.pagerItems = this._createPagers(this.props.images);
    this.viewpager = null;
  }

  shouldComponentUpdate() {
    return false;
  }

  _renderTitleIndicator = () => (
    <PagerDotIndicator
      pageCount={this.props.images.length}
      dotStyle={{width: 5, height: 5, borderRadius: 50}}
      selectedDotStyle={{
        backgroundColor: colors.blue,
        width: 10,
        height: 10,
        borderRadius: 50,
      }}
      hideSingle
    />
  );

  _viewImage = data => {
    Navigation.showModal({
      component: {
        name: 'PhotoViewer',
        passProps: {
          navparent: true,
          photos: data,
        },
      },
    });
  };

  _createPagers = data => {
    if (checkData(data) != true || data.length < 1 || !Array.isArray(data)) {
      return null;
    }
    let total = data.length;
    let arr = [];
    data.map((image, index) => {
      arr.push(
        <ReloadableImage
          source={{uri: image}}
          key={index + 1}
          onPress={() => this._viewImage([image])}
          progressiveRenderingEnabled={true}
          resizeMode="cover"
          style={styles.postImageStyle}
          placeholderStyle={styles.postImagePlaceHolderStyle}
          containerStyle={styles.postListItemContainerAvatar}>
          <View style={styles.postImageOptions}>
            {total < 2 ? null : (
              <Text style={[styles.imageIndexTextStyle]}>
                {`${index + 1}/${total}`}
              </Text>
            )}
          </View>
        </ReloadableImage>,
      );
    });
    return arr;
  };

  render() {
    return (
      <IndicatorViewPager
        ref={viewpager => (this.viewpager = viewpager)}
        indicator={this._renderTitleIndicator()}
        orientation="horizontal"
        style={{
          width: postwidth,
          height: postheight,
          backgroundColor: colors.background,
        }}
        //showPageIndicator={true}
        initialPage={0}
        keyboardDismissMode="none">
        {this.pagerItems}
      </IndicatorViewPager>
    );
  }
}

export class PostItem extends Component {
  constructor(prop) {
    super(prop);
    this.store = store.getState();
    this.profileid = this.store.profile.profile_id;
    this.bottombariconsize = responsiveFontSize(3.5);
    this.topbariconsize = responsiveFontSize(2.5);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.postliked != this.props.postliked ||
      nextProps.posterusername != this.props.posterusername ||
      nextProps.posteravatar != this.props.posteravatar ||
      nextProps.postshared != this.props.postshared ||
      nextProps.pendingpostshared != this.props.pendingpostshared ||
      nextProps.pendingpostliked != this.props.pendingpostliked ||
      nextProps.deleted != this.props.deleted ||
      nextProps.numlikes != this.props.numlikes ||
      nextProps.numshares != this.props.numshares ||
      nextProps.numcomments != this.props.numcomments ||
      nextProps.created_at != this.props.created_at
    ) {
      return true;
    }
    return false;
  }
  _setLikeIcon = () => {
    let status = this.props.pendingpostliked || this.props.postliked;
    return status == 'postliked' ? (
      <Icon
        type="antdesign"
        name="heart"
        color={'red'}
        style={styles.postListItemBottomBarIcon}
        size={this.bottombariconsize}
      />
    ) : (
      <Icon
        type="antdesign"
        name="hearto"
        color={colors.text}
        style={styles.postListItemBottomBarIcon}
        size={this.bottombariconsize}
      />
    );
  };

  _setShareIcon = () => {
    let status = this.props.pendingpostshared || this.props.postshared;
    return status == 'postshared' ? (
      <Icon
        type="entypo"
        name="forward"
        color={'green'}
        style={styles.postListItemBottomBarIcon}
        size={this.bottombariconsize}
      />
    ) : (
      <Icon
        type="entypo"
        name="forward"
        color={colors.text}
        style={styles.postListItemBottomBarIcon}
        size={this.bottombariconsize}
      />
    );
  };

  render() {
    // console.warn('hha');
    if (this.props.deleted == true) {
      return null;
    }
    return (
      <View
        style={{
          ...styles.postListItemContainer,
        }}>
        {this.props.postinfo && (
          <Text
            style={styles.postInfoText}
            onPress={() => {
              Navigation.showModal({
                component: {
                  name: 'ViewProfile',
                  passProps: {
                    navparent: true,
                    reqprofile: {profile_id: this.props.postinfo[0]},
                    screentype: 'modal',
                  },
                },
              });
            }}>
            {this.props.postinfo[1]}
          </Text>
        )}
        <View
          style={{
            ...styles.postListItemTopBar,
            //borderWidth: 1,
            borderColor: 'green',
          }}>
          <View style={styles.postListItemTopBarItem}>
            <Avatar
              size={35}
              rounded
              onPress={this.props.onAvatarPress}
              ImageComponent={FastImage}
              source={{uri: this.props.posteravatar}}
              containerStyle={styles.postListItemTopBarItemAvatar}
            />
            <View>
              <Text style={styles.postListItemTopBarItemHeaderText}>
                {this.props.posterusername}
              </Text>
              <Text style={styles.postTimeStyle}>{this.props.created_at}</Text>
            </View>
          </View>
          <Icon
            type="antdesign"
            name="ellipsis1"
            Component={TouchableScale}
            onPress={
              this.profileid == this.props.profileid
                ? this.props.onUserPostOption
                : this.props.onOthersPostOption
            }
            activeScale={0.7}
            color={colors.text}
            size={30}
          />
        </View>

        <View style={styles.postImageViewPagerContainer}>
          <PostImageViewPager images={this.props.postimages} />
        </View>

        <View style={styles.postListItemBottomBar}>
          <View style={styles.postListItemBottomBarItem}>
            <TouchableScale
              activeScale={0.8}
              onPress={() =>
                this.props.onLikePress(
                  this.props.postid,
                  this.props.pendingpostliked || this.props.postliked,
                )
              }
              style={styles.postListItemBottomBarItem}>
              {this._setLikeIcon()}
            </TouchableScale>
            <TouchableScale
              onPress={this.props.onViewLikesPress}
              activeScale={1}>
              <Text style={styles.postListItemBottomBarText}>
                {this.props.numlikes}
              </Text>
            </TouchableScale>
          </View>

          <View style={styles.postListItemBottomBarItem}>
            <TouchableScale
              activeScale={0.7}
              onPress={this.props.onCommentPress}>
              <Icon
                type="antdesign"
                name="message1"
                color={colors.text}
                style={styles.postListItemBottomBarIcon}
                size={responsiveFontSize(3)}
              />
            </TouchableScale>
            <Text style={styles.postListItemBottomBarText}>
              {this.props.numcomments}
            </Text>
          </View>
          <View style={styles.postListItemBottomBarItem}>
            <TouchableScale
              style={styles.postListItemBottomBarItem}
              activeScale={0.8}
              onPress={() =>
                this.props.onSharePress(
                  this.props.postid,
                  this.props.pendingpostshared || this.props.postshared,
                )
              }>
              {this._setShareIcon()}
            </TouchableScale>
            <TouchableScale
              onPress={this.props.onViewSharesPress}
              activeScale={1}>
              <Text style={styles.postListItemBottomBarText}>
                {this.props.numshares}
              </Text>
            </TouchableScale>
          </View>
        </View>
        {checkData(this.props.sharemsg) && (
          <View style={[styles.postTextContainer, {marginBottom: 0.7}]}>
            <Text style={{color: colors.iconcolor}}>{this.props.sharemsg}</Text>
          </View>
        )}
        {checkData(this.props.posttext) ? (
          <View style={styles.postTextContainer}>
            <Text style={styles.postText}>
              <Text style={{fontWeight: 'bold'}}>
                {`${this.props.posterusername}: `}
              </Text>
              <ParsedText
                style={{
                  color: colors.text,
                }}
                parse={[
                  {
                    type: 'url',
                    style: styles.parsedText,
                    onPress: LinkingHandler().handleUrlPress,
                  },
                  {
                    type: 'phone',
                    style: styles.parsedText,
                    onPress: LinkingHandler().handlePhonePress,
                  },
                  {
                    type: 'email',
                    style: styles.parsedText,
                    onPress: LinkingHandler().handleEmailPress,
                  },
                  {
                    pattern: /@(\w+)/,
                    style: styles.parsedText,
                    onPress: (username, matchIndex) => {
                      LinkingHandler().handleUsernamePress(
                        username,
                        matchIndex,
                        this.props.mentions,
                      );
                    },
                  },
                ]}
                childrenProps={{allowFontScaling: false}}>
                {this.props.posttext}
              </ParsedText>
            </Text>
          </View>
        ) : null}
      </View>
    );
  }
}

export default class PostList extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      otherspostvisible: false,
      userpostvisible: false,
      confirmdeletevisible: false,
      confirmarchivevisible: false,
      confirmblacklistvisible: false,
      confirmmutevisible: false,
      bottomodallistothersoptions: null,
      profilemuted: false,
      avatarnavmodal: {
        visible: false,
        avatar: null,
        profile: null,
        headername: '',
      },
    };
    this.onEndReachedCalledDuringMomentum = true;
    this.currentselectedpostid = '';
    this.currentselectedpost = null;
    this.currentselectedpostownerid = '';
    this.currentselectedpostownerprofile = null;
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
        listtext: 'View',
        icon: {
          name: 'eye',
          type: 'feather',
        },
        onPress: () => {
          this.setState({userpostvisible: false});
          Navigation.showModal({
            component: {
              name: 'PostShow',
              passProps: {
                navparent: true,
                screentype: 'modal',
                toshowpost: this.currentselectedpost,
              },
            },
          });
        },
      },

      {
        listtext: 'Archive Post',
        onPress: () => {
          this.setState({userpostvisible: false});
          this.setState({confirmarchivevisible: true});
        },
        icon: {
          name: 'archive',
          type: 'entypo',
        },
      },
      {
        listtext: 'Delete Post',
        onPress: () => {
          this.setState({userpostvisible: false});
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
        listtext: 'View',
        icon: {
          name: 'eye',
          type: 'feather',
        },
        onPress: () => {
          this.setState({otherspostvisible: false});
          Navigation.showModal({
            component: {
              name: 'PostShow',
              passProps: {
                navparent: true,
                screentype: 'modal',
                toshowpost: this.currentselectedpost,
              },
            },
          });
        },
      },
      {
        listtext: 'Not interested in this post',
        onPress: () => {
          this.setState({otherspostvisible: false});
          this.setState({confirmblacklistvisible: true});
        },
        icon: {
          name: 'emoji-sad',
          type: 'entypo',
        },
      },
      {
        listtext: 'Report Post',
        icon: {
          name: 'flag-o',
          type: 'font-awesome',
        },
      },
      {
        listtext: 'Mute profile',
        id: 'muteprofile',
        onPress: () => {
          this.setState({otherspostvisible: false});
          this.setState({confirmmutevisible: true});
        },
        icon: {
          name: 'volume-x',
          type: 'feather',
        },
      },
    ];
    this.viewabilityConfig = {
      waitForInteraction: true,
      viewAreaCoveragePercentThreshold: 0,
    };
    this.headertext = 'Posts';
    this.reswidth = responsiveWidth(100);
    this.resheight = postheight;
    this.leftIcon = (
      <Icon
        type="antdesign"
        name="plus"
        style={{
          borderWidth: 2,
          padding: 2,
          borderRadius: 10,
          borderColor: colors.text,
        }}
        color={colors.text}
        size={responsiveFontSize(2.5)}
      />
    );
    this.rightIcon = (
      <Icon
        type="antdesign"
        name="setting"
        color={colors.text}
        size={responsiveFontSize(4)}
      />
    );
  }

  componentDidMount() {
    this.setState({
      bottomodallistothersoptions: this.bottomodallistothersoptions,
    });
  }

  _setSelected = (postid, postprofileid, postitem) => {
    if (checkData(postid) == true && checkData(postprofileid) == true) {
      this.currentselectedpostid = postid;
      this.currentselectedpostownerid = postprofileid;
      this.currentselectedpost = postitem;
    }

    if (this.props.userprofile.profile_id == this.currentselectedpostownerid) {
      this._handleUserPostOptions();
    } else {
      this._setOthersModalList(postitem);
      this._handleOthersPostOptions();
    }
  };

  _setOthersModalList = postitem => {
    if (!checkData(postitem)) {
      return;
    }
    let adjustedlist = null;
    //console.warn(this.props.profileschanges);
    let profilechanges = this.props.profileschanges.find(
      item => item.profileid == this.currentselectedpostownerid,
    );
    //console.warn(postitem);
    let profilechangesmuted = checkData(profilechanges)
      ? profilechanges.profilemuted
      : postitem.profile.profilemuted;
    /*** for  profile muted */
    if (profilechangesmuted == true) {
      adjustedlist = this.state.bottomodallistothersoptions.map(item => {
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
        bottomodallistothersoptions: adjustedlist,
        profilemuted: profilechangesmuted,
      });
    } else {
      adjustedlist = this.state.bottomodallistothersoptions.map(item => {
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
        bottomodallistothersoptions: adjustedlist,
        profilemuted: profilechangesmuted,
      });
    }
  };

  _onDeletePress = () => {
    this.setState({confirmdeletevisible: false});
    this.props.onDeletePress(
      this.currentselectedpostid,
      this.currentselectedpostownerid,
    );
  };

  _onArchivePress = () => {
    this.setState({confirmarchivevisible: false});
    this.props.onArchivePress(
      this.currentselectedpostid,
      this.currentselectedpostownerid,
    );
  };

  _onBlackListPress = () => {
    this.setState({confirmblacklistvisible: false});
    this.props.onBlackListPress(
      this.currentselectedpostid,
      this.currentselectedpostownerid,
    );
  };

  _onMuteProfilePress = () => {
    let initaction = () =>
      this.props.setProcessing(true, 'processmutetimelinepostform');
    let failedaction = () => {};
    let okaction = muted => {
      this.props.updateProfileChanges({
        profileid: this.currentselectedpostownerid,
        profilemuted: muted,
      });
      if (muted) {
        this.props.removeProfilePosts(this.currentselectedpostownerid);
      }
      this.props.setProcessing(false, 'processmutetimelinepostform');
    };
    this.setState({confirmmutevisible: false});
    this.props.onMuteProfilePress(
      this.currentselectedpostownerid,
      initaction,
      okaction,
      failedaction,
    );
  };

  _likePostItem = (postid, likestatus) => {
    if (checkData(postid) != true) {
      return false;
    }
    likestatus = likestatus == 'postliked' ? 'notliked' : 'postliked';
    this.props.onPostItemLiked([postid, likestatus]);
  };

  _sharePostItem = (postid, sharestatus) => {
    if (checkData(postid) != true) {
      return false;
    }
    sharestatus = sharestatus == 'postshared' ? 'notshared' : 'postshared';
    this.props.onPostItemShared([postid, sharestatus]);
  };

  _arrangePostImage = data => {
    if (!Array.isArray(data) || data.length < 1) {
      return null;
    } else {
      let postimages = data.map(image => image.postimage);
      return postimages;
    }
  };

  _handleOthersPostOptions = () => {
    this.setState({otherspostvisible: true});
  };

  _handleUserPostOptions = () => {
    this.setState({userpostvisible: true});
  };

  _openComments = post => {
    if (checkData(post) != true) {
      return;
    }
    Navigation.showModal({
      component: {
        name: 'PostComment',
        passProps: {
          navparent: true,
          screentype: 'modal',
          ownerpost: post,
        },
      },
    });
  };

  _navShowLikes = postid => {
    if (checkData(postid) != true) {
      return;
    }
    Navigation.showModal({
      component: {
        name: 'LikesList',
        passProps: {
          navparent: true,
          screentype: 'modal',
          requrl: 'postlikes',
          reqdata: {postid},
        },
      },
    });
  };

  _navShowShares = postid => {
    if (checkData(postid) != true) {
      return;
    }
    Navigation.showModal({
      component: {
        name: 'SharesList',
        passProps: {
          navparent: true,
          screentype: 'modal',
          requrl: 'postshares',
          reqdata: {postid},
        },
      },
    });
  };

  _renderItem = ({item}) => {
    let sharemsg = null;
    if (
      !hasProperty(item, ['profile']) ||
      !hasProperty(item.profile, ['user'])
    ) {
      return <PanelMsg message={'Post is unavailable'} />;
    } else if (
      item.profile.profilemuted == true &&
      checkData(item.showpost) == false
    ) {
      return (
        <PanelMsg
          message={'This post is from someone you have muted'}
          buttonTitle={'View'}
          buttonPress={() =>
            this.props.updatePostItem({
              postid: item.postid,
              showpost: true,
            })
          }
        />
      );
    } else if (
      item.profile.ublockedprofile == true &&
      checkData(item.showpost) == false
    ) {
      return (
        <PanelMsg
          message={'postowner is blocked by you'}
          buttonTitle={'View'}
          buttonPress={() =>
            this.props.updatePostItem({
              postid: item.postid,
              showpost: true,
            })
          }
        />
      );
    } else if (
      item.profile.profileblockedu == true &&
      checkData(item.showpost) == false
    ) {
      return <PanelMsg message={'You are blocked by postowner'} />;
    } else if (
      item.profile.user.approved != true ||
      item.profile.user.deleted == true
    ) {
      return null;
    }

    if (
      checkData(item.known_sharers_profile) &&
      checkData(item.known_sharers_profile[0])
    ) {
      sharemsg =
        item.known_sharers_profile.length > 1
          ? `shared by ${item.known_sharers_profile[0].profile_name} and others`
          : `shared by ${item.known_sharers_profile[0].profile_name}`;
      sharemsg = (
        <Text
          onPress={() =>
            Navigation.showModal({
              component: {
                name: 'ViewProfile',
                passProps: {
                  navparent: true,
                  reqprofile: item.known_sharers_profile[0],
                  screentype: 'modal',
                },
              },
            })
          }>
          {sharemsg}
        </Text>
      );
    }

    return (
      <PostItem
        posterusername={item.profile.profile_name}
        posteravatar={item.profile.avatar[1]}
        sharemsg={sharemsg}
        postimages={this._arrangePostImage(item.post_image)}
        postinfo={item.info}
        postliked={item.postliked}
        pendingpostliked={item.pendingpostliked}
        pendingpostshared={item.pendingpostshared}
        profileid={item.profile.profile_id}
        created_at={handleTime(Math.floor(item.created_at * 1000))}
        postid={item.postid}
        onOthersPostOption={() => {
          this._setSelected(item.postid, item.profile.profile_id, item);
        }}
        onUserPostOption={() => {
          this._setSelected(item.postid, item.profile.profile_id, item);
        }}
        postshared={item.postshared}
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
        mentions={item.mentions}
        profile={item.profile}
        posttext={item.post_text}
        numlikes={item.num_post_likes}
        numcomments={item.num_post_comments}
        numshares={item.num_post_shares}
        onLikePress={this._likePostItem}
        onViewLikesPress={() => this._navShowLikes(item.postid)}
        onSharePress={this._sharePostItem}
        onViewSharesPress={() => this._navShowShares(item.postid)}
        onCommentPress={() => {
          this._openComments(item);
        }}
      />
    );
  };

  _keyExtractor = (item, index) => item.postid;

  _getItemLayout = (data, index) => ({
    length: this.resheight,
    offset: this.resheight * index,
    index,
  });

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
    } else {
      return (
        <Button
          type="clear"
          onPress={this.props.onLoadMorePress}
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
    if (this.props.refreshing == true) {
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
    } else {
      return (
        <View
          style={{alignItems: 'center', height: 200, justifyContent: 'center'}}>
          <Icon
            onPress={this.props.onRefresh}
            color={colors.text}
            size={responsiveFontSize(4)}
            name="sync"
            type="antdesign"
          />
          <Text style={{color: colors.text}}>Tap to retry </Text>
        </View>
      );
    }
  };

  render() {
    //console.warn(this.props.data);
    //to hide pull to refresh functionality  when data is empty
    let onRefresh = this.props.data < 1 ? null : this.props.onRefresh;
    return (
      <View style={styles.containerStyle}>
        {this.props.hideHeader != true && (
          <Header
            headertext={this.headertext}
            headerTextStyle={{color: colors.text}}
            headerStyle={{elevation: 0}}
            headertextsize={responsiveFontSize(2.5)}
            lefticon={this.leftIcon}
            leftIconPress={() => {
              Navigation.push('POST_HOME_SCREEN', {
                component: {
                  name: 'CreatePost',
                  passProps: {
                    navparent: true,
                  },
                },
              });
            }}
            rightIconPress={() =>
              Navigation.showModal({
                component: {
                  name: 'PostSetting',
                  passProps: {
                    navparent: true,
                    screentype: 'modal',
                  },
                },
              })
            }
            righticon={this.rightIcon}
          />
        )}

        <FlatList
          viewabilityConfig={this.viewabilityConfig}
          //removeClippedSubviews={true}
          //maxToRenderPerBatch={1}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode={'on-drag'}
          //updateCellsBatchingPeriod={1}
          initialNumRender={1}
          windowSize={50}
          refreshing={this.props.refreshing}
          onRefresh={onRefresh}
          //data={this.props.data.length > 0 ? [1] : []}
          data={this.props.data}
          getItemLayout={this._getItemLayout}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          ListEmptyComponent={this._setEmptyPlaceholder()}
          ListFooterComponent={
            this.props.data.length > 0 && this.props.hideFooter != true
              ? this._setFooterComponent()
              : null
          }
        />
        <ConfirmModal
          isVisible={this.state.confirmdeletevisible}
          confirmMsg="Delete Post?"
          acceptText="Yeah"
          acceptAction={this._onDeletePress}
          rejectAction={() => this.setState({confirmdeletevisible: false})}
          rejectText="Nah"
        />
        <ActivityOverlay
          text={'Processing'}
          isVisible={
            this.props.onitemdeleting ||
            this.props.onitemarchiving ||
            this.props.onitemblacklisting ||
            this.props.onitemmuting
          }
        />
        <ConfirmModal
          isVisible={this.state.confirmarchivevisible}
          confirmMsg="Archive Post?"
          acceptText="Yeah"
          acceptAction={this._onArchivePress}
          rejectAction={() => this.setState({confirmarchivevisible: false})}
          rejectText="Nah"
        />

        <ConfirmModal
          isVisible={this.state.confirmblacklistvisible}
          confirmMsg="Blacklist post?"
          acceptText="Yeah"
          acceptAction={this._onBlackListPress}
          rejectAction={() => this.setState({confirmblacklistvisible: false})}
          rejectText="Nah"
        />

        <ConfirmModal
          isVisible={this.state.confirmmutevisible}
          confirmMsg={
            this.state.profilemuted == true ? 'Unmute profile?' : 'Mute Profile'
          }
          acceptText="Yeah"
          acceptAction={this._onMuteProfilePress}
          rejectAction={() => this.setState({confirmmutevisible: false})}
          rejectText="Nah"
        />

        <BottomListModal
          listData={this.state.bottomodallistothersoptions}
          visible={this.state.otherspostvisible}
          onRequestClose={() => {
            this.setState({otherspostvisible: false});
          }}
        />
        <BottomListModal
          listData={this.bottomodallistowneroptions}
          visible={this.state.userpostvisible}
          onRequestClose={() => {
            this.setState({userpostvisible: false});
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: colors.background,
  },
  postInfoText: {
    color: 'dimgray',
    fontWeight: 'bold',
    marginTop: 5,
    width: postwidth,
  },
  postImageViewPagerContainer: {
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postListItemContainer: {
    backgroundColor: colors.background,
    borderBottomColor: colors.border,
    borderBottomWidth: 0.18,
    marginTop: 8,
    alignItems: 'center',
    paddingBottom: 10,
    //justifyContent: 'center',
    width: '100%',
  },
  postImagePlaceHolderStyle: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 0.6,
    borderColor: colors.border,
  },
  imageIndexTextStyle: {
    backgroundColor: 'black',
    opacity: 0.8,
    padding: 6,
    marginVertical: 10,
    width: 35,
    borderRadius: 15,
    fontSize: responsiveFontSize(1.2),
    color: 'white',
    textAlign: 'center',
  },
  btnViewPostImage: {
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 5,
    opacity: 0.9,
  },
  postImageOptions: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    // justifyContent
    //borderColor: 'green',
    // borderWidth: 1,
    marginRight: 10,
  },
  postListItemBottomBarText: {
    color: colors.text,
    marginHorizontal: 6,
    fontSize: responsiveFontSize(2),
  },
  postTextContainer: {
    padding: 0,
    flex: 1,
    marginVertical: 5,
    width: postwidth,
    //borderWidth: 1,
    borderColor: 'red',
    flexDirection: 'row',
  },
  postText: {
    //borderWidth: 1,
    borderColor: 'blue',
    color: colors.text,
  },
  postTimeStyle: {
    marginLeft: 1,
    color: 'dimgray',
  },
  postImageStyle: {
    // borderTopLeftRadius: 15,
    //borderTopRightRadius: 15,
    width: postwidth,
    height: postheight,
  },
  postListItemContainerAvatar: {
    backgroundColor: colors.border,
    //marginHorizontal: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: postwidth,
    height: postheight,
  },
  postListItemBottomBarIcon: {
    marginHorizontal: 1,
    elevation: 3,
  },
  postListItemTopBar: {
    width: postwidth,
    flexDirection: 'row',
    //borderWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  postListItemTopBarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    //borderWidth: 1,
  },
  postListItemTopBarItemAvatar: {
    backgroundColor: colors.border,
    marginRight: 5,
  },
  postListItemTopBarItemHeaderText: {
    color: colors.text,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2),
  },
  postListItemBottomBar: {
    width: postwidth,
    flexDirection: 'row',
    //borderWidth: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 5,
  },
  parsedText: {
    color: colors.blue,
    //textDecorationLine: 'underline',
  },
  postListItemBottomBarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
    justifyContent: 'space-evenly',
    //borderWidth: 1,
  },
  modalChildContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  optionListContainer: {
    width: '100%',
    maxWidth: 1080,
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: colors.background,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    minHeight: '5%',
    elevation: 7,
  },
  bottomModalOptionListRow: {
    flexDirection: 'row',
    width: '100%',
    margin: 5,
    paddingHorizontal: 15,
  },
  bottomModalListIconItem: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomModalListTextItem: {
    flex: 3,
    justifyContent: 'center',
  },
  progressOverlay: {
    width: 100,
    backgroundColor: colors.background,
    flexDirection: 'row',
    height: 70,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
