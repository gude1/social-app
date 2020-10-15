import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Icon, Text, ListItem, Button } from 'react-native-elements';
import { responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import TouchableScale from 'react-native-touchable-scale';
import { useTheme } from '../../assets/themes/index';
import { checkData } from '../../utilities/index';

const { colors } = useTheme();
class ChatListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return false;
    }

    renderSubTitle = () => {
        const { item } = this.props;
        if (checkData(item.chat_msg) && (Array.isArray(item.chat_pics) && item.chat_pics.length > 0)) {
            return (
                <View style={{ flexDirection: 'row', alignItems: "center", marginTop: 5 }}>
                    <Icon
                        type={'evilicons'}
                        name={'image'}
                        iconStyle={{ marginRight: 5, color: colors.iconcolor }}
                        size={responsiveFontSize(2.4)}
                    />
                    <Text style={{ color: colors.iconcolor, fontSize: responsiveFontSize(2) }}>{item.chat_msg}</Text>
                </View>
            );
        } else if (checkData(item.chat_msg)) {
            return (
                <View style={{ flexDirection: 'row', alignItems: "center", marginTop: 5 }}>
                    <Text style={{ color: colors.iconcolor, fontSize: responsiveFontSize(2) }}>{item.chat_msg}</Text>
                </View>
            );
        } else if (Array.isArray(item.chat_pics) && count(item.chat_pics) > 0) {
            return (
                <View style={{ flexDirection: 'row', alignItems: "center", marginTop: 5 }}>
                    <Icon
                        type={'evilicons'}
                        name={'image'}
                        iconStyle={{ marginRight: 5, color: colors.iconcolor }}
                        size={responsiveFontSize(2.4)}
                    />
                    <Text style={{ color: colors.iconcolor, fontSize: responsiveFontSize(2) }}>
                        {'Photo'}
                    </Text>
                </View>
            );
        } else {
            return null;
        }
    };

    renderBadge = () => {
        const { item } = this.props;
        if (checkData(item.num_new_msg)) {
            return {
                value: item.num_new_msg,
                badgeStyle: { backgroundColor: "red", borderWidth: 0, height: 20, borderRadius: 10 },
                textStyle: { padding: 0, fontSize: responsiveFontSize(1.7) },
                containerStyle: { backgroundColor: colors.background, }
            };
        }
        return null;
    };

    render() {
        const { item, userprofile } = this.props;
        let profile = item.sender_profile.profile_id == userprofile.profile_id ?
            item.receiver_profile : item.sender_profile;
        return (
            <ListItem
                Component={TouchableScale}
                activeScale={0.8}
                friction={100}
                tension={100}
                badge={this.renderBadge()}
                containerStyle={styles.listItemContainerStyle}
                leftAvatar={{
                    source: checkData(profile.avatar[1]) ?
                        { uri: profile.avatar[1] } : require('../../assets/images/download.jpeg'),
                    size: 55,
                    resizeMode: "contain"
                }}
                rightTitle={'10:30pm'}
                rightTitleStyle={{ fontSize: 10, color: colors.iconcolor }}
                contentContainerStyle={styles.listItemContentContainerStyle}
                title={profile.user.username}
                subtitle={this.renderSubTitle()}
                titleStyle={{ fontWeight: 'bold', color: colors.text }}
            />
        );
    }
}


class PrivateChatList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.chatlistform = this.props.chatlistform;
    }

    componentDidMount() {
        if (checkData(this.props.fetchList)) {
            this.props.fetchList();
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return false;
    }

    _getItemLayout = (data, index) => {
        if (index == -1) return { index, length: 0, height: 0 };
        return { length: 75, offset: 75 * index, index }
    };

    _keyExtractor = (item, index) => index.toString();

    _renderItem = ({ item }) => {
        return (
            <ChatListItem item={item} userprofile={this.props.userprofile} />
        );
    };

    _setEmptyPlaceHolder = () => {
        if (this.chatlistform.loading == true) {
            return <ActivityIndicator size="large" color={'silver'} />;
        } else if (this.chatlistform.loading == 'retry') {
            return (
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <Text style={{
                        color: colors.text,
                        textAlign: "center",
                        fontWeight: "bold", fontSize: responsiveFontSize(3)
                    }}>
                        Oops!, something went wrong
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
        }
        return (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Text style={{
                    color: colors.text,
                    textAlign: "center",
                    fontWeight: "bold", fontSize: responsiveFontSize(3)
                }}>
                    Send and receive private messages
                    </Text>
                <Button
                    type="outline"
                    icon={{
                        name: 'chat',
                        type: "entypo",
                        size: responsiveFontSize(2.7),
                        color: colors.text
                    }}
                    title="Start Chat"
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
    };

    render() {
        return (
            <FlatList
                data={this.chatlistform.chatlist}
                renderItem={this._renderItem}
                initialNumRender={10}
                getItemLayout={this._getItemLayout}
                keyExtractor={this._keyExtractor}
                ListEmptyComponent={
                    <View style={styles.listEmptyStyle}>
                        {this._setEmptyPlaceHolder()}
                    </View>
                }
            />
        );
    }
}
const styles = StyleSheet.create({
    listItemContainerStyle: {
        backgroundColor: colors.background,
        borderBottomWidth: 0.4,
        borderColor: colors.border,
        marginLeft: 30,
        height: 75,
        paddingVertical: 0,
        paddingLeft: 0,
    },
    listEmptyStyle: {
        height: responsiveHeight(60),
        paddingHorizontal: 15,
        justifyContent: "center",
        alignItems: "center"
    },
    listItemContentContainerStyle: {
        backgroundColor: colors.background,
        justifyContent: "center",
        marginLeft: 5,
        flex: 1,
        marginTop: 5,
    }
});

export default PrivateChatList;