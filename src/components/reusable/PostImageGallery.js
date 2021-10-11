import React, {Component} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {Icon, Image, Text} from 'react-native-elements';
import {checkData} from '../../utilities/index';
import FastImage from 'react-native-fast-image';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import TouchableScale from 'react-native-touchable-scale/src/TouchableScale';
import {useTheme} from '../../assets/themes/index';

const {colors} = useTheme();
class PostImageItem extends Component {
  constructor(props) {
    super(props);
    this.reswidth = responsiveWidth(50);
    this.resheight = responsiveWidth(50) - 2;
    this.leftchild = (
      <Icon
        iconStyle={{margin: 5}}
        type="feather"
        onPress={() =>
          Navigation.showModal({
            component: {
              name: 'PostShow',
              passProps: {
                navparent: true,
                screentype: 'modal',
                toshowpost: this.props.item,
              },
            },
          })
        }
        name="eye"
        color="white"
        size={responsiveFontSize(3)}
      />
    );
    this.rightchild =
      this.props.item.post_image.length > 1 ? (
        <Icon
          iconStyle={{margin: 5}}
          type="feather"
          name="copy"
          color="white"
          size={responsiveFontSize(3)}
        />
      ) : null;
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return false;
  }

  render() {
    let {item} = this.props;
    return (
      <Image
        source={{
          uri: item.post_image[0].postimage,
          //priority: FastImage.priority.high
        }}
        //ImageComponent={FastImage}
        placeholderStyle={{backgroundColor: colors.border}}
        containerStyle={{
          margin: 0.5,
        }}
        style={{height: this.resheight, width: this.reswidth}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {this.leftchild}
          {this.rightchild}
        </View>
      </Image>
    );
  }
}

export default class PostImageGallery extends Component {
  constructor(props) {
    super(props);
    this.reswidth = responsiveWidth(50);
    this.resheight = responsiveHeight(50);
    this.viewabilityConfig = {
      waitForInteraction: true,
      minimumViewTime: 4000,
      viewAreaCoveragePercentThreshold: 0,
    };
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (
      this.props.loading != nextProps.loading ||
      this.props.loadingmore != nextProps.loadingmore
    ) {
      return true;
    }
    return false;
  }

  componentDidMount() {
    if (checkData(this.props.fetchPost)) {
      this.props.fetchPost();
    }
  }

  _getItemLayout = (data, index) => {
    if (index == -1) return {index, length: 0, height: 0};
    return {length: this.reswidth, offset: this.reswidth * index, index};
  };

  _keyExtractor = (item, index) => item.postid;

  _setEmptyPlaceholder = () => {
    if (this.props.loading == true) {
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
    } else if (this.props.loading == 'retry') {
      return (
        <View
          style={{alignItems: 'center', height: 200, justifyContent: 'center'}}>
          <Icon
            onPress={() => this.props.fetchPost()}
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
        style={{alignItems: 'center', height: 200, justifyContent: 'center'}}>
        <Icon
          //onPress={() => this.props.fetchPost()}
          color={colors.text}
          size={responsiveFontSize(4)}
          name="meh"
          type="antdesign"
        />
        <Text style={{color: colors.text}}>No Posts</Text>
      </View>
    );
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
            onPress={() => this.props.fetchMorePost()}
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
            size={responsiveFontSize(7)}
            onPress={this.props.fetchMorePost}
            name="plus"
            type="evilicon"
          />
        </View>
      );
    } else {
      return null;
    }
  };

  _renderItem = ({item}) => {
    return <PostImageItem item={item} />;
  };

  render() {
    let onScrollBeginDrag =
      this.props.data.length > 0 ? this.props.onScrollBeginDrag : null;
    return (
      <FlatList
        viewabilityConfig={this.viewabilityConfig}
        windowSize={50}
        onScroll={onScrollBeginDrag}
        //updateCellsBatchingPeriod={0}
        numColumns={2}
        initialNumRender={5}
        getItemLayout={this._getItemLayout}
        ListEmptyComponent={this._setEmptyPlaceholder()}
        ListFooterComponent={
          this.props.data.length > 0 ? this._setFooterComponent() : null
        }
        data={this.props.data}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}
