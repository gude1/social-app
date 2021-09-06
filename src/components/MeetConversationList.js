import React, { Component } from 'react';
import { View, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { checkData, hasProperty, isEmpty } from '../utilities/index';
import TouchableScale from 'react-native-touchable-scale';
import { Text, Button, Icon, ListItem } from 'react-native-elements';
import { useTheme } from '../assets/themes/index';
import moment from 'moment';
import { responsiveFontSize, responsiveWidth, responsiveHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { Navigation } from 'react-native-navigation';
import { ScrollableListOverLay, ListItem as CustomListItem, PanelMsg } from './reusable/ResuableWidgets';
import { BottomContainerItem } from './reusable/MeetRequestList';
import * as  Animatable from 'react-native-animatable';


const { colors } = useTheme();

class ConversationItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showparentmeet: false
        };
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        let prevconvlist = Array.isArray(this.props.item.conv_list)
            ? this.props.item.conv_list : [{}];
        let nextconvlist = Array.isArray(nextProps.item.conv_list)
            ? nextProps.item.conv_list : [{}];

        if (nextProps.item.id != this.props.item.id ||
            this.state.showparentmeet != nextState.showparentmeet
        ) {
            return true;
        } else if (this.props.item.conversation_id == nextProps.item.conversation_id &&
            (
                this.props.item.num_new_msg != nextProps.item.num_new_msg ||
                prevconvlist[0].id != nextconvlist[0].id ||
                prevconvlist[0].status != nextconvlist[0].status
            )
        ) {
            return true;
        }
        return false;
    }

    getConvTime = (time) => {
        if (!checkData(time))
            return null;
        let parsedtimeformat = moment(time).format('DD/MM/YYYY');
        let currenttimeformat = moment().format('DD/MM/YYYY');
        return parsedtimeformat == currenttimeformat ? moment(time).format('h:mm a') : parsedtimeformat;
    };

    renderCheck = (item) => {
        let { meetsetting } = this.props;
        if (meetsetting.owner_id != item.sender_id) {
            return null;
        }

        if (item.status == "read") {
            return (
                <Text
                    style={{
                        color: colors.blue,
                        fontWeight: "bold",
                        letterSpacing: -1,
                        fontSize: responsiveFontSize(1.8),
                        marginRight: 5
                    }}> √√</Text>
            );//
        } else if (item.status == "delievered") {
            return (
                <Text
                    style={{
                        color: "#a0a0a0",
                        fontWeight: "bold",
                        letterSpacing: -1,
                        fontSize: responsiveFontSize(1.8),
                        marginRight: 5
                    }}> √√</Text>
            );
        } else if (item.status == "sending") {
            return (
                <Text
                    style={{
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

    renderMeetModal() {
        let item = this.props.item;
        let { sender_meet_profile, receiver_meet_profile, origin_meet_request } = item;
        let meet_profile = item.sender_meet_profile.owner_id == origin_meet_request.requester_id ?
            item.sender_meet_profile : item.receiver_meet_profile;

        return (
            <ScrollableListOverLay
                width={300}
                onBackdropPress={() => {
                    this.setState({ showparentmeet: false })
                }}
                contentContainerStyle={{ marginLeft: 0 }}
                visible={this.state.showparentmeet}
                ListTitle={'Message on Meet Request :'}
                height={300}
            >
                <CustomListItem
                    leftAvatar={{ uri: meet_profile.meetup_avatar }}
                    onAvatarPress={() => {
                        this.setState({ showparentmeet: false })
                        Navigation.showModal({
                            component: {
                                name: 'PhotoViewer',
                                passProps: {
                                    navparent: true,
                                    headerText: meet_profile.meetup_name,
                                    photos: [meet_profile.meetup_avatar]
                                },
                            }
                        })
                    }}
                    title={meet_profile.meetup_name}
                    titleStyle={{ color: colors.iconcolor }}
                    subtitle={`   ${item.origin_meet_request.request_msg}`}
                    subtitleStyle={{ fontWeight: 'bold' }}
                    BottomContainerItem={
                        <BottomContainerItem
                            request_category={item.origin_meet_request.request_category}
                            request_mood={item.origin_meet_request.request_mood}
                            campus={meet_profile.campus}
                            created_at={`expires ${moment(item.origin_meet_request.expires_at * 1000).fromNow()}`}
                        />
                    }
                />
            </ScrollableListOverLay>
        );
    }

    renderSubTitle = () => {
        let { item } = this.props;
        item = item.conv_list[0];
        if (!isEmpty(item.chat_msg) && !isEmpty(item.chat_pic)) {
            return (
                <View style={{ flexDirection: 'row', alignItems: "center", marginTop: 5 }}>
                    {this.renderCheck(item)}
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
        } else if (!isEmpty(item.chat_msg)) {
            return (
                <View style={{ flexDirection: 'row', alignItems: "center", marginTop: 5 }}>
                    {this.renderCheck(item)}
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
        } else if (!isEmpty(item.chat_pic)) {
            return (
                <View style={{ flexDirection: 'row', alignItems: "center", marginTop: 5 }}>
                    {this.renderCheck(item)}
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
        if (!isEmpty(item.num_new_msg) && item.num_new_msg > 0) {
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
        let { item, meetsetting, leftAvatarPress, } = this.props;
        let meetprofile = item.sender_meet_profile.owner_id == meetsetting.owner_id ?
            item.receiver_meet_profile : item.sender_meet_profile;
        return (
            <>
            <ListItem
                Component={TouchableScale}
                onPress={() => {
                    Navigation.showModal({
                        component: {
                            name: 'MeetupConversation',
                            passProps: {
                                navparent: true,
                                chatitem: {
                                    conversation_id: item.conversation_id,
                                    conv_list: item.conv_list,
                                    meet_request: item.origin_meet_request,
                                    partnermeetprofile: meetprofile
                                }
                            },
                        }
                    });
                }}
                chevron={
                    <Icon
                        size={responsiveFontSize(3)}
                        onPress={() => {
                            this.setState({ showparentmeet: true });
                        }}
                        containerStyle={{
                            marginRight: 5
                        }}
                        name={'infocirlceo'}
                        color={colors.text}
                        type={'antdesign'}
                    />
                }
                activeScale={0.9}
                friction={100}
                tension={100}
                //onLongPress={onLongPress}
                badge={this.renderBadge()}
                containerStyle={styles.listItemContainerStyle}
                leftAvatar={{
                    source: checkData(meetprofile.meetup_avatar) ?
                        { uri: meetprofile.meetup_avatar } : require('../assets/images/download.jpeg'),
                    onPress: () => {
                        Navigation.showModal({
                            component: {
                                name: 'PhotoViewer',
                                passProps: {
                                    navparent: true,
                                    headerText: meetprofile.meetup_name,
                                    photos: [meetprofile.meetup_avatar]
                                },
                            }
                        });
                    },
                    resizeMode: "contain"
                }}
                rightTitle={this.getConvTime(item.conv_list[0].created_at * 1000)}
                rightTitleProps={{ ellipsizeMode: 'tail', numberOfLines: 1 }}
                rightTitleStyle={this.rightTitleStyle()}
                contentContainerStyle={styles.listItemContentContainerStyle}
                title={meetprofile.meetup_name}
                titleStyle={{ color: colors.text, fontSize: responsiveFontSize(2) }}
                titleProps={{ ellipsizeMode: 'tail', numberOfLines: 1 }}
                subtitle={this.renderSubTitle()}
            />
            {this.renderMeetModal()}
            </>
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
        if (!hasProperty(item, ['sender_meet_profile', 'conv_list', 'receiver_meet_profile', 'origin_meet_request'])) {
            return (
                <PanelMsg
                    message={'This conversation is unavailable'}
                />
            );
        } else if (item.conv_list.length < 1) {
            return (
                <PanelMsg
                    message={'This conversation is unavailable'}
                />
            );
        }
        return (
            <ConversationItem
                meetsetting={this.props.meetsetting}
                item={item}
            />
        );
    }

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