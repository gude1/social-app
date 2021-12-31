import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Alert,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
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
  LinkingHandler,
  image_exists,
} from '../../utilities/index';
import moment from 'moment';
import ParsedText from 'react-native-parsed-text';
import {Navigation} from 'react-native-navigation';
import RNFetchBlob from 'rn-fetch-blob';
import {ActivityOverlay, ModalList} from './ResuableWidgets';

const {colors} = useTheme();

const ShowChats = ({data, onLongPress = () => {}, userprofile}) => {
  return data
    .sort((item1, item2) => item1.id - item2.id)
    .map(item => {
      return (
        <PrivateChatItem
          key={item.id}
          item={item}
          onLongPress={() => (item.read == 'sending' ? {} : onLongPress(item))}
          userprofile={userprofile}
        />
      );
    })
    .reverse();
};

class PrivateChatItem extends Component {
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
        this.props.item.read != nextProps.item.read)
    ) {
      return true;
    }

    return false;
  }

  componentDidMount() {
    (async () => {
      let {item, userprofile} = this.props;
      if (
        !isEmpty(item.chat_pics) &&
        item.receiver_id == userprofile.profile_id
      ) {
        let imagename = item.chat_pics.chatpic.split('/')[6];
        let imagepath = rnPath(
          `/storage/emulated/0/CampusMeetup/ChatImages/received/${imagename}`,
        );
        let res = await image_exists(imagepath);
        if (res) {
          this.setState({partnerimageuri: imagepath});
        }
      }
    })();
  }

  renderCheck = item => {
    if (isEmpty(item) || item.sender_id != this.props.userprofile.profile_id) {
      return null;
    }

    if (item.read == true || item.read == 'true') {
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
    } else if (item.read == 'delievered') {
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
    } else if (item.read == 'sending') {
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
    } else if (item.read == 'failed') {
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

  returnOwnerImageUri = (dbconvpic, pending) => {
    if (isEmpty(dbconvpic) || !isEmpty(pending)) {
      return dbconvpic;
    }
    let convpicdir = '/storage/emulated/0/CampusMeetup/ChatImages/sent/';
    return rnPath(`${convpicdir}${dbconvpic.split('/')[6]}`);
  };

  renderOwnerChat = () => {
    let {item, sendConv, onLongPress} = this.props;
    let onPress = null;
    if (checkData(sendConv) && !isEmpty(item.data)) {
      onPress = () => sendConv(item.data);
    }
    if (!isEmpty(item.chat_msg) && isEmpty(item.chat_pics)) {
      return (
        <Animatable.View useNativeDriver={true}>
          <View style={{marginVertical: 5, alignItems: 'flex-end'}}>
            <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
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
    } else if (!isEmpty(item.chat_msg) && !isEmpty(item.chat_pics)) {
      let imageuri = this.returnOwnerImageUri(
        item.chat_pics.chatpic,
        item.pending,
      );
      return (
        <Animatable.View useNativeDriver={true}>
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
              activeOpacity={0.9}
              onLongPress={onLongPress}>
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
    } else if (isEmpty(item.chat_msg) && !isEmpty(item.chat_pics)) {
      let imageuri = this.returnOwnerImageUri(
        item.chat_pics.chatpic,
        item.pending,
      );
      //console.warn(imageuri, item.chat_pics);
      return (
        <Animatable.View useNativeDriver={true}>
          <View style={{marginVertical: 5, alignItems: 'flex-end'}}>
            <TouchableOpacity
              onLongPress={onLongPress}
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
    if (isEmpty(item.chat_pics.chatpic)) {
      return;
    }
    let imagename = item.chat_pics.chatpic.split('/')[6];
    this.setState({
      loadingpartnerimage: true,
    });
    RNFetchBlob.config({
      path: `/storage/emulated/0/CampusMeetup/ChatImages/received/${imagename}`,
    })
      .fetch('GET', item.chat_pics.chatpic)
      .then(res => {
        this.setState({
          loadingpartnerimage: false,
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
    let {item, onLongPress} = this.props;
    if (!isEmpty(item.chat_msg) && isEmpty(item.chat_pics)) {
      return (
        <View style={{marginVertical: 5, alignItems: 'flex-start'}}>
          <ParsedText style={styles.othersChatText}>{item.chat_msg}</ParsedText>
          <Text style={styles.othersChatTime}>
            {this.formatConvTime(item.created_at * 1000)}
          </Text>
        </View>
      );
    } else if (!isEmpty(item.chat_msg) && !isEmpty(item.chat_pics)) {
      return (
        <View style={{marginVertical: 5, alignItems: 'flex-start'}}>
          <TouchableOpacity
            onLongPress={onLongPress}
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
                  ? item.chat_pics.thumbchatpic
                  : this.state.partnerimageuri,
              }}>
              {this.renderDownloadBtn(item.chat_pics.size)}
            </Image>
          </TouchableOpacity>
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
      );
    } else if (isEmpty(item.chat_msg) && !isEmpty(item.chat_pics)) {
      return (
        <View style={{marginVertical: 5, alignItems: 'flex-start'}}>
          <TouchableOpacity
            onLongPress={onLongPress}
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
                  ? item.chat_pics.thumbchatpic
                  : this.state.partnerimageuri,
              }}>
              {this.renderDownloadBtn(item.chat_pics.size)}
            </Image>
          </TouchableOpacity>
          <Text style={styles.othersChatTime}>
            {this.formatConvTime(item.created_at * 1000)}
          </Text>
        </View>
      );
    } else {
      return null;
    }
  };

  render() {
    let {userprofile, item} = this.props;
    //console.warn('meetconvchatitem', item.id);
    let content =
      item.sender_id == userprofile.profile_id
        ? this.renderOwnerChat()
        : this.renderPartnerChat();
    return content;
  }
}

class PrivateChats extends Component {
  constructor(props) {
    super(props);
    this.state = {modallistvisible: false};
    this.previousdata = this.props.data.map(item => item.id);
    this.currentselectedchatitem = null;
    this.flatlistref = null;
    this.viewabilityConfig = {
      waitForInteraction: true,
      minimumViewTime: 4000,
      viewAreaCoveragePercentThreshold: 0,
    };
  }

  _setListHeaderComponent = () => {
    let data = this.props.data.filter(item => item.deleted != true);
    if (this.props.loaded == false || !Array.isArray(data) || data.length < 1) {
      return null;
    }

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
    } else if (this.props.loadingmore == false) {
      return (
        <Button
          onPress={this.props.loadMore}
          type="clear"
          icon={{
            name: 'plus',
            type: 'evilicon',
            size: responsiveFontSize(4),
            color: colors.text,
          }}
          titleStyle={{color: colors.text, fontSize: responsiveFontSize(2)}}
          buttonStyle={{
            alignSelf: 'center',
            borderColor: colors.iconcolor,
            borderRadius: 15,
            padding: 10,
          }}
        />
      );
    } else {
      //console.warn(this.props.loadingmore);
      return null;
    }
  };

  _setEmptyPlaceHolder = () => {
    if (this.props.loaded == false || this.props.fetching == true) {
      return (
        <View
          style={{
            height: responsiveHeight(70),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color={'silver'} />
        </View>
      );
    }
  };

  _setCurrentSelectedChatItem = chatitem => {
    this.currentselectedchatitem = chatitem;
  };

  _reSendChat = () => {
    let tosendchatdata = this.currentselectedchatitem;
    if (
      isEmpty(tosendchatdata) ||
      (tosendchatdata.pending != true || tosendchatdata.read != 'failed')
    ) {
      alert('Can not resend');
      return;
    }
    let chatSchema = {
      ...tosendchatdata,
      read: 'sending',
    };

    this.props.sendPrivateChat({
      create_chatid: tosendchatdata.create_chatid,
      partnerprofile: this.props.partnerprofile,
      chatSchema,
      reqobj: {
        chat_msg: tosendchatdata.chat_msg,
        chat_pics: tosendchatdata.chat_pics,
        receiver_id: this.props.partnerprofile.profile_id,
      },
    });
  };

  _getItemLayout = (data, index) => {
    if (index == -1) return {index, length: 0, height: 0};
    return {length: 150, offset: 150 * index, index};
  };

  onLongPress = data => {
    this._setCurrentSelectedChatItem({...data});
    this.setState({modallistvisible: true});
  };

  _keyExtractor = (item, index) => index.toString();
  _renderItem = ({item, index}) => {
    return (
      <ShowChats
        data={this.props.data}
        userprofile={this.props.userprofile}
        onLongPress={this.onLongPress}
      />
    );
  };

  render() {
    return (
      <>
        <FlatList
          ref={ref => {
            this.flatlistref = ref;
            this.props.setFlatListRef(ref);
          }}
          // style={{ height: 50 }}
          viewabilityConfig={this.viewabilityConfig}
          windowSize={50}
          updateCellsBatchingPeriod={0}
          initialNumRender={1}
          getItemLayout={this._getItemLayout}
          //data={this.props.loaded == false && [] || [...this.props.data].reverse()}
          data={this.props.loaded ? [1] : []}
          //maxToRenderPerBatch={1}
          inverted
          //updateCellsBatchingPeriod={0}
          initialNumRender={5}
          ListFooterComponent={this._setListHeaderComponent()}
          ListEmptyComponent={this._setEmptyPlaceHolder()}
          renderItem={this._renderItem}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode={'on-drag'}
          keyExtractor={this._keyExtractor}
        />

        <ActivityOverlay
          isVisible={this.props.deleting}
          text={'Deleting Chat'}
        />

        <ModalList
          isVisible={this.state.modallistvisible}
          onBackdropPress={() => this.setState({modallistvisible: false})}
          optionsArr={[
            this.currentselectedchatitem?.pending == true && {
              title: 'Resend Message',
              onPress: () => {
                this.setState({modallistvisible: false});
                this._reSendChat();
              },
              icon: {
                name: 'arrow-up',
                color: colors.text,
                size: responsiveFontSize(3),
                type: 'evilicon',
              },
            },
            {
              title: 'Delete Message',
              onPress: () => {
                this.setState({modallistvisible: false});
                Alert.alert(`Delete message for you ?`, null, [
                  {
                    text: 'Yes',
                    onPress: () =>
                      this.props.deletePrivateChat(
                        this.currentselectedchatitem,
                      ),
                  },
                  {
                    text: 'No',
                    style: 'cancel',
                  },
                ]);
              },
              icon: {
                name: 'close-o',
                color: colors.text,
                size: responsiveFontSize(3),
                type: 'evilicon',
              },
            },
          ]}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  parsedText: {
    color: colors.blue,
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
    borderWidth: 4,
    borderBottomLeftRadius: 30,
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
});

export default PrivateChats;
