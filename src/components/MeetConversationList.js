import React, { Component } from 'react';
import { View, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { checkData, hasProperty, isEmpty } from '../utilities/index';
import TouchableScale from 'react-native-touchable-scale';
import { Text, Button, Icon, ListItem } from 'react-native-elements';
import { useTheme } from '../assets/themes/index';
import moment from 'moment';
import { responsiveFontSize, responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';


const { colors } = useTheme();

class ConversationItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderCheck = () => {
        const { item, meetsetting } = this.props;
        if (meetsetting.owner_id != item.sender_id) {
            return null;
        }
        //console.warn(item.read);

        if (item.status == "read") {
            return (
                <Text style={{
                    color: colors.blue,
                    fontWeight: "bold",
                    letterSpacing: -1,
                    fontSize: responsiveFontSize(1.8),
                    marginRight: 5
                }}> √√</Text>
            );//
        } else if (item.status == "delivered") {
            return (
                <Text style={{
                    color: "#a0a0a0",
                    fontWeight: "bold",
                    letterSpacing: -1,
                    fontSize: responsiveFontSize(1.8),
                    marginRight: 5
                }}> √√</Text>
            );
        } else if (item.status == "sending") {
            return (
                <Text style={{
                    color: "#a0a0a0",
                    fontWeight: "bold",
                    letterSpacing: -1,
                    fontSize: responsiveFontSize(1.8),
                    marginRight: 5
                }}> sending...</Text>
            );
        } else if (item.status == "failed") {
            return (
                <Icon
                    type="antdesign"
                    name="clockcircleo"
                    iconStyle={{
                        color: "#a0a0a0", fontWeight: "bold", textAlign: "justify"
                    }}
                    size={responsiveFontSize(1.8)}
                    containerStyle={{ marginRight: 5 }}
                />
            );
        } else {
            return (
                <Text style={{
                    color: "#a0a0a0",
                    fontWeight: "bold",
                    letterSpacing: -1,
                    fontSize: responsiveFontSize(1.8),
                    marginRight: 5
                }}> √</Text>
            );
        }
    }

    renderSubTitle = () => {
        const { item } = this.props;
        if (checkData(item.chat_msg) && (Array.isArray(item.chat_pic) && item.chat_pic.length > 0)) {
            return (
                <View style={{ flexDirection: 'row', alignItems: "center", marginTop: 5 }}>
                    {this.renderCheck()}
                    <Icon
                        type={'evilicons'}
                        name={'image'}
                        iconStyle={{ marginRight: 5, color: colors.iconcolor }}
                        size={responsiveFontSize(2.4)}
                    />
                    <Text
                        ellipsizeMode={'tail'}
                        numberOfLines={1}
                        style={{
                            color: colors.iconcolor,
                            // fontSize: responsiveFontSize(2)
                        }}
                    >
                        {item.chat_msg}
                    </Text>
                </View>
            );
        } else if (checkData(item.chat_msg)) {
            return (
                <View style={{ flexDirection: 'row', alignItems: "center", marginTop: 5 }}>
                    {this.renderCheck()}
                    <Text ellipsizeMode={'tail'}
                        numberOfLines={1}
                        style={{
                            flexDirection: "row",
                            color: colors.iconcolor,
                            //fontSize: responsiveFontSize(2)
                        }}>
                        {item.chat_msg}
                    </Text>
                </View>
            );
        } else if (Array.isArray(item.chat_pic) && item.chat_pic.length > 0) {
            return (
                <View style={{ flexDirection: 'row', alignItems: "center", marginTop: 5 }}>
                    {this.renderCheck()}
                    <Icon
                        type={'evilicons'}
                        name={'image'}
                        iconStyle={{ marginRight: 5, color: colors.iconcolor }}
                        size={responsiveFontSize(2.4)}
                    />
                    <Text style={{
                        color: colors.iconcolor,
                        //fontSize: responsiveFontSize(2)
                    }}>
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
        if (checkData(item.num_new_msg) && item.num_new_msg > 0) {
            return {
                value: item.num_new_msg,
                badgeStyle: { backgroundColor: colors.chatbadge, borderWidth: 0, height: 25, width: 25, borderRadius: 50 },
                textStyle: { padding: 0, fontSize: responsiveFontSize(1.4), color: colors.chatbadgetxt },
                containerStyle: { backgroundColor: colors.background, }
            };
        }
        return null;
    };

    rightTitleStyle = () => {
        const { item } = this.props;
        if (checkData(item.num_new_msg) && item.num_new_msg > 0)
            return { fontSize: responsiveFontSize(1.2), color: colors.chatbadge };
        else
            return { fontSize: responsiveFontSize(1.2), color: colors.iconcolor };
    }

    render() {
        let { item, meetsetting, leftAvatarPress, onPress, onLongPress } = this.props;
        let meetprofile = item.sender_meet_profile.owner_id == meetsetting.owner_id ?
            item.receiver_meet_profile : item.sender_meet_profile;
        return (
            <ListItem
                onPress={onPress}
                onLongPress={onLongPress}
                badge={this.renderBadge()}
                containerStyle={styles.listItemContainerStyle}
                leftAvatar={{
                    source: checkData(meetprofile.meetup_avatar) ?
                        { uri: meetprofile.meetup_avatar } : require('../assets/images/download.jpeg'),
                    onPress: () => {
                        console.warn(item, item.created_at)
                    },
                    resizeMode: "contain"
                }}
                rightTitle={moment(item.created_at * 1000).format('h:mm a')}
                rightTitleProps={{ ellipsizeMode: 'tail', numberOfLines: 1 }}
                rightTitleStyle={this.rightTitleStyle()}
                contentContainerStyle={styles.listItemContentContainerStyle}
                title={
                    <View>
                        <Text
                            ellipsizeMode={'tail'}
                            style={{
                                fontWeight: 'bold',
                                color: colors.iconcolor,
                                marginBottom: 5,
                            }}
                            numberOfLines={1}
                        >
                            Tap me to view meet
                        </Text>
                        <Text
                            ellipsizeMode={'tail'}
                            style={{
                                fontWeight: 'bold',
                                color: colors.text,
                                fontSize: responsiveFontSize(1.7)
                            }}
                            numberOfLines={1}
                        >
                            {meetprofile.meetup_name}
                        </Text>
                    </View>
                }
                //title={meetprofile.meetup_name}
                //titleProps={{ ellipsizeMode: 'tail', numberOfLines: 1 }}
                subtitle={this.renderSubTitle()}
            />
        );
    }
}

class MeetConversationList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        checkData(this.props.fetchConvs) && this.props.fetchConvs();
    }

    renderItem = ({ item, index }) => {
        return (
            <ConversationItem
                meetsetting={this.props.meetsetting}
                item={item}
            />
        );
    };

    _setFooterComponent = () => {
        if (this.props.meetupconvs.list.length < 1 || !checkData(this.props.fetchLaterConvs)) {
            return null;
        }
        if (this.props.meetupconvs.loadingmore == true) {
            return (
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    margin: 6,
                    alignItems: "center"
                }}>
                    <ActivityIndicator
                        size={30}
                        color={colors.border} />
                </View>
            );
        } else if (this.props.meetupconvs.loadingmore == false) {
            return (
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    margin: 10,
                    alignItems: "center"
                }}>
                    <Icon
                        color={colors.text}
                        size={responsiveFontSize(5)}
                        onPress={() => this.props.fetchLaterConvs()}
                        name="plus"
                        type="evilicon"
                    />
                </View>
            );
        } else {
            return null;
        }
    };

    _setEmptyPlaceHolder = () => {
        if (this.props.meetupconvs.fetching == true) {
            return (
                <View style={{
                    width: '100%',
                    height: responsiveHeight(70),
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <ActivityIndicator size="large" color={'silver'} />
                </View>
            );
        } else {
            return (
                <View style={{
                    alignItems: "center",
                    justifyContent: "center",
                    height: responsiveHeight(70),
                    width: '100%',
                }}>
                    <Text style={{
                        color: colors.iconcolor,
                        width: '70%',
                        textAlign: "center",
                    }}>
                        Try Again
                    </Text>
                    <Button
                        type="outline"
                        onPress={this.props.fetchConvs}
                        icon={{
                            name: 'sync',
                            type: "antdesign",
                            size: responsiveFontSize(2),
                            color: colors.iconcolor
                        }}
                        title="Tap to retry"
                        titleStyle={{
                            color: colors.iconcolor,
                            textAlign: "center",
                            fontSize: responsiveFontSize(1.4)
                        }}
                        containerStyle={{ marginTop: 20 }}
                        buttonStyle={{
                            borderColor: colors.iconcolor,
                            borderRadius: 15,
                            width: 100,
                            padding: 10
                        }}
                    />
                </View>
            );
        }
    };

    _getItemLayout = (data, index) => {
        if (index == -1) return { index, length: 0, height: 0 };
        return { length: 85, offset: 85 * index, index }
    };

    _keyExtractor = (item, index) => index.toString();

    render() {
        let { meetupconvs } = this.props;
        return (
            <FlatList
                data={meetupconvs.list}
                keyExtractor={this._keyExtractor}
                initialNumRender={5}
                refreshing={meetupconvs.list.length > 0 ? meetupconvs.refreshing : false}
                onRefresh={meetupconvs.list.length > 0 ? this.props.fetchNewConvs : null}
                getItemLayout={this._getItemLayout}
                showsVerticalScrollIndicator={false}
                renderItem={this.renderItem}
                ListEmptyComponent={this._setEmptyPlaceHolder()}
                ListFooterComponent={this._setFooterComponent()}
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
        height: 85,
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

export default MeetConversationList;