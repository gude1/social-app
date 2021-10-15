import React, {Component} from 'react';
import {View, ActivityIndicator, FlatList, StyleSheet} from 'react-native';
import {checkData, hasProperty, isEmpty} from '../../utilities';
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
    this.state = {};
  }

  componentDidMount() {
    if (checkData(this.props.fetchNotes)) {
      //console.warn('componendidmountfetch nite called');
      this.props.fetchNotes();
    }
  }

  renderItem = ({item}) => {
    return <Text style={{color: colors.text}}>{item.id}</Text>;
  };

  render() {
    let {list, loading, loadingmore, fetchNotes} = this.props;
    list = list || [];
    return (
      <FlatList
        data={list}
        keyExtractor={_keyExtractor}
        initialNumRender={5}
        showsVerticalScrollIndicator={false}
        renderItem={this.renderItem}
        ListEmptyComponent={_setEmptyPlaceHolder(loading, fetchNotes)}
        ListFooterComponent={_setFooterComponent(loadingmore, list.length, () =>
          fetchNotes([true]),
        )}
      />
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

const styles = StyleSheet.create({});
