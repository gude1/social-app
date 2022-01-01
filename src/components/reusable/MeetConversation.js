import React, {Component} from 'react';
import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Text, Button, Icon, Image} from 'react-native-elements';
import {useTheme} from '../../assets/themes/index';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  isEmpty,
  checkData,
  rnPath,
  convertByteToKbMb,
  image_exists,
  LinkingHandler,
} from '../../utilities/index';
import moment from 'moment';
import ParsedText from 'react-native-parsed-text';
import {Navigation} from 'react-native-navigation';
import RNFetchBlob from 'rn-fetch-blob';
import {BottomContainerItem} from './MeetRequestList';
import {ScrollableListOverLay, ListItem} from './ResuableWidgets';

const {colors} = useTheme();

//const PressableWrapper = Animatable.createAnimatableComponent(TouchableOpacity);

const ShowConvs = props => {
  return props.data
    .sort((item1, item2) => item1.id - item2.id)
    .map(item => {
      return <MeetConversationItem key={item.id} {...props} item={item} />;
    })
    .reverse();
};

class MeetConversationItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partnerimageuri: '',
      loadingpartnerimage: false,
    };
    this.ownerchattextcolor = '#181818';
    this.ownerchatbgcolor = 'rgb(237,237,237)';
    this.imageplacholdericon = (
      <Icon
        type="feather"
        name="image"
        color={'white'}
        size={responsiveFontSize(4)}
      />
    );

    if (colors.theme == 'black') {
      this.ownerchatbgcolor = colors.border;
      this.ownerchattextcolor = colors.text;
    }
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (
      this.props.item.id != nextProps.item.id ||
      this.state.partnerimageuri != nextState.partnerimageuri ||
      this.state.loadingpartnerimage != nextState.loadingpartnerimage ||
      (this.props.item.id == nextProps.item.id &&
        this.props.item.status != nextProps.item.status)
    ) {
      return true;
    }

    return false;
  }

  componentDidMount() {
    (async () => {
      let {item} = this.props;
      if (!isEmpty(item.chat_pic) && !isEmpty(item.chat_pic.chatpic)) {
        let imagename = item.chat_pic.chatpic.split('/')[6];
        let imagepath = rnPath(
          `/storage/emulated/0/CampusMeetup/MeetConversations/received/${imagename}`,
        );
        let res = await image_exists(imagepath);
        if (res) {
          this.setState({partnerimageuri: imagepath});
        }
      }
    })();
  }

  renderCheck = item => {
    if (isEmpty(item) || item.sender_id != this.props.authprofile.profile_id) {
      return null;
    }

    if (item.status == 'read') {
      return (
        <Text
          style={{
            color: '#a0a0a0',
            marginHorizontal: 25,
            textAlign: 'justify',
            fontSize: responsiveFontSize(1.2),
          }}>
          {this.formatConvTime(item.created_at * 1000)}{' '}
          <Text style={{letterSpacing: -1, color: colors.blue}}>√√</Text>
        </Text>
      );
    } else if (item.status == 'delievered') {
      return (
        <Text
          style={{
            color: '#a0a0a0',
            marginHorizontal: 25,
            textAlign: 'justify',
            fontSize: responsiveFontSize(1.2),
          }}>
          {this.formatConvTime(item.created_at * 1000)}{' '}
          <Text style={{letterSpacing: -1}}>√√</Text>
        </Text>
      );
    } else if (item.status == 'sending') {
      return (
        <Text
          style={{
            color: '#a0a0a0',
            marginHorizontal: 25,
            textAlign: 'justify',
            fontSize: responsiveFontSize(1.5),
          }}>
          <Text style={{letterSpacing: -1}}>sending...</Text>
        </Text>
      );
    } else if (item.status == 'failed') {
      return (
        <Icon
          type="antdesign"
          name="clockcircleo"
          iconStyle={{
            color: '#a0a0a0',
            fontWeight: 'bold',
            textAlign: 'justify',
          }}
          size={responsiveFontSize(2)}
          containerStyle={{
            marginTop: 2,
            marginHorizontal: 25,
          }}
        />
      );
    } else {
      return (
        <Text
          style={{
            color: '#a0a0a0',
            marginHorizontal: 25,
            textAlign: 'justify',
            fontSize: responsiveFontSize(1.2),
          }}>
          {this.formatConvTime(item.created_at * 1000)}{' '}
          <Text style={{letterSpacing: -1}}>√</Text>
        </Text>
      );
    }
  };

  formatConvTime = time => {
    if (isEmpty(time)) {
      return time;
    }
    return moment(time).format('MMM DD YYYY @ h:mm a');
  };

  returnPartnerImageUri = async () => {};

  returnOwnerImageUri = (dbconvpic, processed) => {
    if (isEmpty(dbconvpic) || processed != undefined || processed != null) {
      return dbconvpic;
    }
    let convpicdir = '/storage/emulated/0/CampusMeetup/MeetConversations/sent/';
    return rnPath(`${convpicdir}${dbconvpic.split('/')[6]}`);
  };

  renderOwnerChat = () => {
    let {item, sendConv} = this.props;
    let onPress = null;
    if (checkData(sendConv) && !isEmpty(item.data)) {
      onPress = () => sendConv(item.data);
    }

    if (!isEmpty(item.chat_msg) && isEmpty(item.chat_pic)) {
      return (
        <Animatable.View animation={'slideInRight'} useNativeDriver={true}>
          <View style={{marginVertical: 5, alignItems: 'flex-end'}}>
            <TouchableOpacity onPress={onPress}>
              <ParsedText
                style={[
                  styles.ownerChatText,
                  {
                    color: this.ownerchattextcolor,
                    backgroundColor: this.ownerchatbgcolor,
                  },
                ]}
                parse={[
                  {
                    type: 'url',
                    style: styles.parsedText,
                    onPress: LinkingHandler().handleUrlPress,
                    renderText: this.renderUrlText,
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
                  {pattern: /@(\w+)/, style: styles.parsedText},
                ]}>
                {item.chat_msg}
              </ParsedText>
            </TouchableOpacity>
            {this.renderCheck(item)}
          </View>
        </Animatable.View>
      );
    } else if (!isEmpty(item.chat_msg) && !isEmpty(item.chat_pic)) {
      let imageuri = this.returnOwnerImageUri(
        item.chat_pic.chatpic,
        item.chat_pic.processed,
      );
      return (
        <Animatable.View animation={'slideInRight'} useNativeDriver={true}>
          <View style={{marginVertical: 5, alignItems: 'flex-end'}}>
            <TouchableOpacity
              onPress={
                checkData(onPress)
                  ? onPress
                  : () =>
                      Navigation.showModal({
                        component: {
                          name: 'PhotoViewer',
                          passProps: {
                            navparent: true,
                            photos: [imageuri],
                          },
                        },
                      })
              }
              activeOpacity={0.9}>
              <Image
                containerStyle={[
                  styles.ownerChatImageContainer,
                  {
                    borderColor: this.ownerchatbgcolor,
                  },
                ]}
                onPress={onPress}
                //onError={() => this._onImageLoadErr(true)}
                placeholderStyle={styles.ownerChatImagePlaceholder}
                PlaceholderContent={this.imageplacholdericon}
                resizeMode="cover"
                source={{
                  uri: imageuri,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={onPress}>
              <ParsedText
                style={[
                  styles.ownerChatText,
                  {
                    color: this.ownerchattextcolor,
                    backgroundColor: this.ownerchatbgcolor,
                  },
                ]}
                parse={[
                  {
                    type: 'url',
                    style: styles.parsedText,
                    onPress: LinkingHandler().handleUrlPress,
                    renderText: this.renderUrlText,
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
                  {pattern: /@(\w+)/, style: styles.parsedText},
                ]}>
                {item.chat_msg}
              </ParsedText>
            </TouchableOpacity>
            {this.renderCheck(item)}
          </View>
        </Animatable.View>
      );
    } else if (isEmpty(item.chat_msg) && !isEmpty(item.chat_pic)) {
      let imageuri = this.returnOwnerImageUri(
        item.chat_pic.chatpic,
        item.chat_pic.processed,
      );
      //console.warn(this.returnOwnerImageUri(item.chat_pic.chatpic, item.chat_pic.processed));
      return (
        <Animatable.View animation={'slideInRight'} useNativeDriver={true}>
          <View style={{marginVertical: 5, alignItems: 'flex-end'}}>
            <TouchableOpacity
              onPress={
                checkData(onPress)
                  ? onPress
                  : () =>
                      Navigation.showModal({
                        component: {
                          name: 'PhotoViewer',
                          passProps: {
                            navparent: true,
                            photos: [imageuri],
                          },
                        },
                      })
              }
              activeOpacity={0.9}>
              <Image
                containerStyle={[
                  styles.ownerChatImageContainer,
                  {
                    borderColor: this.ownerchatbgcolor,
                  },
                ]}
                //onError={() => this._onImageLoadErr(true)}
                placeholderStyle={styles.ownerChatImagePlaceholder}
                PlaceholderContent={this.imageplacholdericon}
                resizeMode="cover"
                source={{
                  uri: imageuri,
                }}
              />
            </TouchableOpacity>
            {this.renderCheck(item)}
          </View>
        </Animatable.View>
      );
    } else {
      return null;
    }
  };

  renderDownloadBtn = size => {
    if (isEmpty(size) || !isEmpty(this.state.partnerimageuri)) {
      return null;
    }
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Button
          onPress={this.downloadPartnerImage}
          loading={this.state.loadingpartnerimage}
          disabled={this.state.loadingpartnerimage}
          type="clear"
          title={convertByteToKbMb(size)}
          icon={{
            name: 'download',
            type: 'antdesign',
            size: responsiveFontSize(2),
            color: 'white',
          }}
          titleStyle={{
            color: 'white',
            fontWeight: 'normal',
          }}
          buttonStyle={{
            borderRadius: 15,
            backgroundColor: 'rgba(0,0,0,0.7)',
            padding: 10,
          }}
        />
      </View>
    );
  };

  downloadPartnerImage = () => {
    let {item} = this.props;
    if (isEmpty(item.chat_pic.chatpic)) {
      return;
    }
    let imagename = item.chat_pic.chatpic.split('/')[6];
    this.setState({
      loadingpartnerimage: true,
    });
    RNFetchBlob.config({
      path: `/storage/emulated/0/CampusMeetup/MeetConversations/received/${imagename}`,
    })
      .fetch('GET', item.chat_pic.chatpic)
      .then(res => {
        //console.warn('downloader', res.path());
        this.setState({
          loadingpartnerimage: true,
          partnerimageuri: rnPath(res.path()),
        });
      })
      .catch(err => {
        console.warn(err.toString());
        this.setState({
          loadingpartnerimage: false,
        });
        // console.warn('downloader err', err.toString());
      });
  };

  renderPartnerChat = () => {
    let {item} = this.props;
    if (!isEmpty(item.chat_msg) && isEmpty(item.chat_pic)) {
      return (
        <Animatable.View animation={'slideInLeft'} useNativeDriver={true}>
          <View style={{marginVertical: 5, alignItems: 'flex-start'}}>
            <ParsedText
              style={styles.othersChatText}
              parse={[
                {
                  type: 'url',
                  style: styles.parsedText,
                  onPress: LinkingHandler().handleUrlPress,
                  renderText: this.renderUrlText,
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
                {pattern: /@(\w+)/, style: styles.parsedText},
              ]}>
              {item.chat_msg}
            </ParsedText>
            <Text style={styles.othersChatTime}>
              {this.formatConvTime(item.created_at * 1000)}
            </Text>
          </View>
        </Animatable.View>
      );
    } else if (!isEmpty(item.chat_msg) && !isEmpty(item.chat_pic)) {
      return (
        <Animatable.View animation={'slideInLeft'} useNativeDriver={true}>
          <View style={{marginVertical: 5, alignItems: 'flex-start'}}>
            <TouchableOpacity
              onPress={
                isEmpty(this.state.partnerimageuri)
                  ? null
                  : () =>
                      Navigation.showModal({
                        component: {
                          name: 'PhotoViewer',
                          passProps: {
                            navparent: true,
                            photos: [this.state.partnerimageuri],
                          },
                        },
                      })
              }
              activeOpacity={0.9}>
              <Image
                //onError={() => this._onImageLoadErr(false)}
                containerStyle={styles.othersChatImageContainer}
                placeholderStyle={styles.othersChatImagePlaceholder}
                PlaceholderContent={this.imageplacholdericon}
                resizeMode="cover"
                source={{
                  uri: isEmpty(this.state.partnerimageuri)
                    ? item.chat_pic.thumbchatpic
                    : this.state.partnerimageuri,
                }}>
                {this.renderDownloadBtn(item.chat_pic.size)}
              </Image>
            </TouchableOpacity>
            <ParsedText style={styles.othersChatText}>
              {item.chat_msg}
            </ParsedText>
            <Text style={styles.othersChatTime}>
              {this.formatConvTime(item.created_at * 1000)}
            </Text>
          </View>
        </Animatable.View>
      );
    } else if (isEmpty(item.chat_msg) && !isEmpty(item.chat_pic)) {
      return (
        <Animatable.View animation={'slideInLeft'} useNativeDriver={true}>
          <View style={{marginVertical: 5, alignItems: 'flex-start'}}>
            <TouchableOpacity
              onPress={
                isEmpty(this.state.partnerimageuri)
                  ? null
                  : () =>
                      Navigation.showModal({
                        component: {
                          name: 'PhotoViewer',
                          passProps: {
                            navparent: true,
                            photos: [this.state.partnerimageuri],
                          },
                        },
                      })
              }
              activeOpacity={0.9}>
              <Image
                //onError={() => this._onImageLoadErr(false)}
                containerStyle={styles.othersChatImageContainer}
                placeholderStyle={styles.othersChatImagePlaceholder}
                PlaceholderContent={this.imageplacholdericon}
                resizeMode="cover"
                source={{
                  uri: isEmpty(this.state.partnerimageuri)
                    ? item.chat_pic.thumbchatpic
                    : this.state.partnerimageuri,
                }}>
                {this.renderDownloadBtn(item.chat_pic.size)}
              </Image>
            </TouchableOpacity>
            <Text style={styles.othersChatTime}>
              {this.formatConvTime(item.created_at * 1000)}
            </Text>
          </View>
        </Animatable.View>
      );
    } else {
      return null;
    }
  };

  render() {
    let {authprofile, item} = this.props;
    //console.warn('meetconvchatitem', item.id);
    let content =
      item.sender_id == authprofile.profile_id
        ? this.renderOwnerChat()
        : this.renderPartnerChat();
    return content;
  }
}

class MeetConversation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getItemLayout = (data, index) => {
    if (index == -1) return {index, length: 0, height: 0};
    return {length: 150, offset: 150 * index, index};
  };

  keyExtractor = (item, index) => String(index);

  returnHeaderComponent = () => {
    if (
      !Array.isArray(this.props.conv_list) ||
      this.props.conv_list.length < 1
    ) {
      return null;
    }
    return (
      <Button
        onPress={() => {
          this.props.loadPrev();
        }}
        loading={this.props.loadingprev}
        disabled={this.props.loadingprev}
        type="clear"
        icon={{
          name: 'plus',
          type: 'evilicon',
          size: responsiveFontSize(4),
          color: colors.text,
        }}
        titleStyle={{
          color: colors.text,
          fontSize: responsiveFontSize(2),
        }}
        containerStyle={{
          alignSelf: 'center',
          borderColor: colors.iconcolor,
          borderRadius: 15,
          padding: 10,
        }}
      />
    );
  };

  renderParentMeetReq = () => {
    let {
      origin_meet_request,
      showparentmeet,
      setShowParentMeet,
      partnermeetprofile,
      authmeetprofile,
    } = this.props;
    let meet_profile =
      origin_meet_request.requester_id == authmeetprofile.owner_id
        ? authmeetprofile
        : partnermeetprofile;
    return (
      <ScrollableListOverLay
        width={300}
        onBackdropPress={() => {
          setShowParentMeet(false);
        }}
        contentContainerStyle={{marginLeft: 0}}
        visible={showparentmeet}
        ListTitle={'Meet Request'}
        height={300}>
        <ListItem
          leftAvatar={{uri: meet_profile.meetup_avatar}}
          onAvatarPress={() => {
            setShowParentMeet(false);
            Navigation.showModal({
              component: {
                name: 'PhotoViewer',
                passProps: {
                  navparent: true,
                  headerText: meet_profile.meetup_name,
                  photos: [meet_profile.meetup_avatar],
                },
              },
            });
          }}
          title={meet_profile.meetup_name}
          titleStyle={{color: colors.iconcolor}}
          subtitle={`   ${origin_meet_request.request_msg}`}
          subtitleStyle={{fontWeight: 'bold'}}
          BottomContainerItem={
            <BottomContainerItem
              request_category={origin_meet_request.request_category}
              request_mood={origin_meet_request.request_mood}
              campus={meet_profile.campus}
              created_at={`expires ${moment(
                origin_meet_request.expires_at * 1000,
              ).fromNow()}`}
            />
          }
        />
      </ScrollableListOverLay>
    );
  };

  renderItem = ({item}) => {
    return (
      <ShowConvs
        data={this.props.conv_list}
        sendConv={this.props.sendConv}
        authprofile={this.props.authprofile}
      />
    );
  };

  render() {
    let {conv_list, authprofile} = this.props;
    //let data = conv_list.sort((item1, item2) => item2.created_at - item1.created_at);
    return (
      <>
        <FlatList
          data={conv_list.length > 0 ? [1] : []}
          ref={ref => {
            this.props.setFlatListRef && this.props.setFlatListRef(ref);
          }}
          contentContainerStyle={{marginTop: 10}}
          renderItem={this.renderItem}
          inverted
          ListFooterComponent={this.returnHeaderComponent()}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode={'on-drag'}
          keyExtractor={this.keyExtractor}
        />
        {this.renderParentMeetReq()}
      </>
    );
  }
}

const styles = StyleSheet.create({
  parsedText: {
    color: colors.blue,
  },
  ownerChatText: {
    marginHorizontal: 20,
    fontSize: responsiveFontSize(2.1),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 12,
    borderBottomLeftRadius: 30,
    minWidth: 50,
    maxWidth: responsiveWidth(70),
  },
  ownerChatImagePlaceholder: {
    width: responsiveWidth(60),
    backgroundColor: colors.background,
    height: responsiveWidth(60),
  },
  ownerChatImageContainer: {
    marginHorizontal: 20,
    width: responsiveWidth(60),
    height: responsiveWidth(60),
    borderColor: colors.border,
    margin: 0,
    padding: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 20,
    borderWidth: 1.5,
    borderBottomLeftRadius: 30,
  },
  othersChatText: {
    borderWidth: 1,
    borderColor: colors.border,
    marginHorizontal: 20,
    fontSize: responsiveFontSize(2.1),
    color: colors.text,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 30,
    padding: 12,
    minWidth: 50,
    maxWidth: responsiveWidth(70),
  },
  othersChatTime: {
    marginHorizontal: 25,
    textAlign: 'justify',
    color: '#a0a0a0',
    fontSize: responsiveFontSize(1.2),
  },
  othersChatImageContainer: {
    marginHorizontal: 20,
    width: responsiveWidth(60),
    height: responsiveWidth(60),
    margin: 0,
    padding: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 30,
    borderColor: colors.border,
    borderWidth: 1.5,
  },
  othersChatImagePlaceholder: {
    width: responsiveWidth(60),
    backgroundColor: colors.background,
    height: responsiveWidth(60),
  },
});

export default MeetConversation;
