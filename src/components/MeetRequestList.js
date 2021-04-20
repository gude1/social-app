import React, { Component } from 'react';
import { FlatList, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Text, Icon, ListItem } from 'react-native-elements';
import { PostItem } from './PostList';
import { useTheme } from '../../assets/themes/index';
import { ConfirmModal, ActivityOverlay, BottomListModal, PanelMsg, AvatarNavModal } from './ResuableWidgets';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { checkData, handleTime } from '../../utilities/index';
import EmojiData from '../../assets/static/EmojiList.json';
import TouchableScale from 'react-native-touchable-scale/src/TouchableScale';


const { colors } = useTheme();

class MeetRequestList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return true;
    }

    _setEmptyPlaceHolder = () => {
        if (this.props.meetupreqobj.fetching == true) {
            return (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size="large" color={'silver'} />
                </View>
            );
        } else if (this.props.meetupreqobj.fetching == 'retry') {
            return (
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <Text style={{
                        color: colors.text,
                        textAlign: "center",
                        fontWeight: "bold", fontSize: responsiveFontSize(3)
                    }}>
                        Meet Request not fetched ,something went wrong
                        </Text>
                    <Button
                        type="outline"
                        onPress={() => this.props.fetchList()}
                        icon={{
                            name: 'sync',
                            type: "antdesign",
                            size: responsiveFontSize(2.7),
                            color: colors.text
                        }}
                        title="Tap to retry"
                        titleStyle={{ color: colors.text, fontSize: responsiveFontSize(2) }}
                        buttonStyle={{
                            marginTop: 40,
                            borderColor: colors.iconcolor,
                            borderRadius: 15,
                            width: 150,
                            padding: 10
                        }}
                    />
                </View>
            );
        } else {
            return (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ textAlign: "center", color: colors.iconcolor }}>
                        No meet request yet on this category,please change category or update meet settings for wider options
                    </Text>
                </View>
            );
        }

    };

    _keyExtractor = (item, index) => index.toString();

    _getItemLayout = (data, index) => {
        if (index == -1) return { index, length: 0, height: 0 };
        return { length: this.resheight, offset: this.resheight * index, index }
    };

    renderItem = ({ item, index }) => {
        return (
            <ListItem
                containerStyle={styles.requestItemCtn}
                leftAvatar={{ source: require('../../assets/meetupscreen/requestcat/sport.jpeg') }}
                title={'Debola'}
                titleStyle={{ color: colors.text }}
                rightTitle={
                    <Icon
                        type="antdesign"
                        Component={TouchableScale}
                        containerStyle={{ marginBottom: 10 }}
                        size={responsiveFontSize(4)}
                        name="ellipsis1"
                        color={colors.text}
                    />
                }
                rightSubtitle={EmojiData[index].value}
                rightSubtitleStyle={styles.requestItemRightSubtitle}
                subtitle={'Need help with ecn 403 please i dont have any idea'}
                subtitleProps={{
                    ellipsizeMode: 'tail',
                    numberOfLines: 1
                }}
                subtitleStyle={styles.requestItemLeftSubtitle}
            />
        );
    };


    render() {
        return (
            <FlatList
                data={this.props.meetupmain.data}
                keyExtractor={this._keyExtractor}
                //getItemLayout={this._getItemLayout}
                //onRefresh={onRefresh}
                //refreshing={refreshing}
                showsVerticalScrollIndicator={false}
                renderItem={this.renderItem}
                ListEmptyComponent={this._setEmptyPlaceholder()}
            />
        );
    }
}

const styles = StyleSheet.create({
    requestItemCtn: {
        margin: 10,
        width: responsiveWidth(90),
        maxWidth: 400,
        padding: 15,
        backgroundColor: colors.card,
        elevation: 3,
        borderRadius: 20
    },
    requestItemTitle: {

    },
    requestItemLeftSubtitle: {
        color: colors.placeholder
    },
    requestItemRightSubtitle: {
        color: colors.text,
        fontSize: responsiveFontSize(3)
    }
});

export default MeetRequestList; 