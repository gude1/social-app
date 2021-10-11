import React, {Component} from 'react';
import {Icon, Avatar} from 'react-native-elements';
import {View, StyleSheet} from 'react-native';
import {checkData} from '../../utilities/index';
import * as Animatable from 'react-native-animatable';
import {useTheme} from '../../assets/themes/index';
import {Navigation} from 'react-native-navigation';
const {colors} = useTheme();

export default class OnlineList extends Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return false;
  }

  makePlacholders = (num) => {
    if (isNaN(num)) {
      return null;
    } else if (this.props.status == 'pending') {
      let arr = [];
      for (let i = 0; i < num; i++) {
        arr.push(
          <Animatable.View
            key={i}
            animation="pulse"
            iterationCount="infinite"
            useNativeDriver={true}
          >
            <Avatar
              rounded
              //source={require('../../assets/images/Penguins.jpg')}
              size={60}
              containerStyle={styles.placeholderAvatar}
            />
          </Animatable.View>,
        );
      }
      return arr;
    } else if (this.props.status == 'retry') {
      return (
        <Avatar
          size={60}
          icon={{
            name: 'sync',
            type: 'antdesign',
            size: 30,
            color: colors.tabiconcolor,
          }}
          containerStyle={{backgroundColor: colors.background}}
        />
      );
    }
  }; //closing function braces

  render() {
    return (
      <View style={styles.onlineList}>
        <Avatar
          rounded
          onPress={() => this.props.onPress()}
          size={60}
          icon={{
            name: 'users',
            type: 'entypo',
            size: 30,
            color: colors.tabiconcolor,
          }}
          containerStyle={[styles.placeholderAvatar, {marginHorizontal: 5}]}
        />
        {this.props.status == 'done'
          ? null
          : this.makePlacholders(this.props.num)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  onlineList: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    justifyContent: 'center',
    //borderWidth: 1
    //borderBottomColor: colors.border,
    //borderBottomWidth: 0.4,
  },
  placeholderAvatar: {
    backgroundColor: colors.background,
    borderColor: colors.tabiconcolor,
    borderWidth: 0.6,
    marginHorizontal: 2,
  },
});
