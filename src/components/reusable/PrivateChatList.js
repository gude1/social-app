import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, FlatList, ActivityIndicator, Alert } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Icon, Text, ListItem, Button } from 'react-native-elements';
import { responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import TouchableScale from 'react-native-touchable-scale';
import { useTheme } from '../../assets/themes/index';
import { checkData, cutText } from '../../utilities/index';
import { AvatarNavModal, ModalList, ActivityOverlay } from './ResuableWidgets';

const { colors } = useTheme();
class ChatListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextProps.item.read != this.props.item.read ||
            nextProps.item.created_at != this.props.item.created_at ||
            nextProps.item.num_new_msg != this.props.item.num_new_msg
        ) {
            return true;
        }
        return false;
    }

    renderCheck = () => {
        const { item, userprofile } = this.props;
        if (userprofile.profile_id != item.sender_profile.profile_id) {
            return null;
        }
        //console.warn(item.read);

        if (item.read == true) {
            return (
                <Text style={{
                    color: "#2196F3",
                    fontWeight: "bold",
                    letterSpacing: -1,
                    fontSize: responsiveFontSize(1.8),
                    marginRight: 5
                }}> √√</Text>
            );//
        } else if (item.read == "delivered") {
            return (
                <Text style={{
                    color: "#a0a0a0",
                    fontWeight: "bold",
                    letterSpacing: -1,
                    fontSize: responsiveFontSize(1.8),
                    marginRight: 5
                }}> √√</Text>
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
        if (checkData(item.chat_msg) && (Array.isArray(item.chat_pics) && item.chat_pics.length > 0)) {
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
                        style={{ color: colors.iconcolor, fontSize: responsiveFontSize(2) }}>{item.chat_msg}</Text>
                </View>
            );
        } else if (checkData(item.chat_msg)) {
            return (
                <View style={{ flexDirection: 'row', alignItems: "center", marginTop: 5 }}>
                    {this.renderCheck()}
                    <Text ellipsizeMode={'tail'}
                        numberOfLines={1}
                        style={{ flexDirection: "row", color: colors.iconcolor, fontSize: responsiveFontSize(2) }}>
                        {item.chat_msg}
                    </Text>
                </View>
            );
        } else if (Array.isArray(item.chat_pics) && count(item.chat_pics) > 0) {
            return (
                <View style={{ flexDirection: 'row', alignItems: "center", marginTop: 5 }}>
                    {this.renderCheck()}
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
        if (checkData(item.num_new_msg) && item.num_new_msg > 0) {
            return {
                value: item.num_new_msg,
                badgeStyle: { backgroundColor: colors.chatbadge, borderWidth: 0, height: 25, width: 25, borderRadius: 50 },
                textStyle: { padding: 0, fontSize: responsiveFontSize(1.7), color: colors.chatbadgetxt },
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
        const { item, userprofile, leftAvatarPress, checkmark, onPress, onLongPress } = this.props;
        let profile = item.sender_profile.profile_id == userprofile.profile_id ?
            item.receiver_profile : item.sender_profile;
        return (
            <ListItem
                Component={TouchableScale}
                onPress={onPress}
                onLongPress={onLongPress}
                checkmark={checkmark}
                activeScale={0.8}
                friction={100}
                tension={100}
                badge={this.renderBadge()}
                containerStyle={styles.listItemContainerStyle}
                leftAvatar={{
                    source: checkData(profile.avatar[1]) ?
                        { uri: profile.avatar[1] } : require('../../assets/images/download.jpeg'),
                    size: 55,
                    onPress: () => leftAvatarPress({ ...item, profile: profile }),
                    //onPress: () => { alert('s') },
                    resizeMode: "contain"
                }}
                rightTitle={item.created_at}
                rightTitleProps={{ ellipsizeMode: 'tail', numberOfLines: 1 }}
                rightTitleStyle={this.rightTitleStyle()}
                contentContainerStyle={styles.listItemContentContainerStyle}
                title={profile.profile_name}
                titleProps={{ ellipsizeMode: 'tail', numberOfLines: 1 }}
                subtitle={this.renderSubTitle()}
                titleStyle={{ fontWeight: 'bold', color: colors.text }}
            />
        );
    }
}

class PrivateChatList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarnavmodal: {
                visible: false,
                avatar: null,
                profile: null,
                headername: '',
            },
            modallistvisible: false,
        };
        this.currentselectedchat = null;
        this.headerdata = [];
        this.bodydata = [];
        this.navmodallistitem = [{
            icon: {
                name: "user",
                type: "evilicon"
            },
            onPress: () => {
                this.setState({
                    avatarnavmodal: {
                        ...this.state.avatarnavmodal,
                        visible: false,
                    }
                });
                Navigation.showModal({
                    component: {
                        name: 'ViewProfile',
                        passProps: {
                            navparent: true,
                            reqprofile: this.state.avatarnavmodal.profile,
                            screentype: 'modal'
                        },
                    }
                });
            }
        }, {
            icon: {
                name: "comment",
                type: "evilicon"
            },
            onPress: () => {
                this.setState({
                    avatarnavmodal: {
                        ...this.state.avatarnavmodal,
                        visible: false,
                    }
                });
            }
        }];
    }

    componentDidMount() {
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return true;
    }

    _getItemLayout = (data, index) => {
        if (index == -1) return { index, length: 0, height: 0 };
        return { length: 75, offset: 75 * index, index }
    };

    _keyExtractor = (item, index) => index.toString();

    _setAvatarNavModal = (item) => {
        if (!checkData(item)) {
            return;
        }
        this.setState({
            avatarnavmodal: {
                ...this.state.avatarnavmodal,
                headername: item.profile.user.username,
                profile: item.profile,
                avatar: item.profile.avatar[1],
                visible: true
            }
        });
    };

    _setCurrentSelectedChat = (chat) => {
        this.currentselectedchat = chat;
    };

    _setData = () => {
        let pinnedchatarr = [...this.props.chatlistform.pinnedchatarr];
        let chatlist = this.props.chatlistform.chatlist;
        if (pinnedchatarr.length < 1) {
            return [[], chatlist];
        }
        pinnedchatarr = pinnedchatarr.reverse();
        let headerdata = pinnedchatarr.map(id => {
            return chatlist.find(item => item.create_chatid == id);
        });
        //console.warn(pinnedchatarr);
        let bodydata = chatlist.filter(item => {
            return !pinnedchatarr.includes(item.create_chatid);
        });
        return [headerdata, bodydata];
    }

    _renderItem = ({ item }) => {
        return (
            <ChatListItem
                item={item}
                userprofile={this.props.userprofile}
                leftAvatarPress={this._setAvatarNavModal}
                onLongPress={() => {
                    this._setCurrentSelectedChat(item);
                    this.setState({ modallistvisible: true });
                }}
            />
        );
    };

    _setListHeaderComponent = () => {
        if (!Array.isArray(this.headerdata) || this.headerdata.length < 1) {
            return null;
        }
        //console.warn(data[0]);
        //console.warn('----------------------------------------');
        //console.warn(data[1]);
        let pinnedlist = this.headerdata.map((item, index) => {
            return (
                <ChatListItem
                    key={index.toString()}
                    item={item}
                    checkmark={{
                        name: 'thumb-tack',
                        color: colors.iconcolor,
                        size: responsiveFontSize(2.2),
                        type: "font-awesome"
                    }}
                    userprofile={this.props.userprofile}
                    leftAvatarPress={this._setAvatarNavModal}
                    onLongPress={() => {
                        this._setCurrentSelectedChat(item);
                        this.setState({ modallistvisible: true });
                    }}
                />
            );
        });
        return (
            <ScrollView showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flex: 1 }}
                keyboardShouldPersistTaps='always'
                keyboardDismissMode={'on-drag'}
            >
                {pinnedlist}
            </ScrollView>
        );
    };

    _setEmptyPlaceHolder = () => {
        if (this.props.chatlistform.loading == true) {
            return <ActivityIndicator size="large" color={'silver'} />;
        } else if (this.props.chatlistform.loading == 'retry') {
            return (
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <Text style={{
                        color: colors.text,
                        textAlign: "center",
                        fontWeight: "bold", fontSize: responsiveFontSize(3)
                    }}>
                        chat not fetched,something went wrong
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
        };

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
                    onPress={() => Navigation.showModal({
                        component: {
                            name: 'FindUser',
                            passProps: {
                                navparent: true,
                                screentype: 'modal'
                            },
                        }
                    })}
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

    _renderTxtHeader = () => {

    };

    _rPinned = () => {
        if (!checkData(this.currentselectedchat)) {
            return [{
                title: "Pin chat",
                onPress: () => {
                    this.setState({ modallistvisible: false });
                    this.props.pinPrivateChatList(this.currentselectedchat.create_chatid);
                },
                icon: {
                    name: 'thumb-tack',
                    color: colors.text,
                    size: responsiveFontSize(3),
                    type: "font-awesome"
                }
            }
            ];
        }
        let check = this.headerdata.find(
            item => item.create_chatid == this.currentselectedchat.create_chatid
        );
        if (!checkData(check)) {
            return [{
                title: "Pin chat",
                onPress: () => {
                    this.setState({ modallistvisible: false });
                    this.props.pinPrivateChatList(this.currentselectedchat.create_chatid);
                },
                icon: {
                    name: 'thumb-tack',
                    color: colors.text,
                    size: responsiveFontSize(3),
                    type: "font-awesome"
                }
            }
            ];
        } else {
            return [{
                title: "UnPin chat",
                onPress: () => {
                    this.setState({ modallistvisible: false });
                    this.props.unPinPrivateChatList(this.currentselectedchat.create_chatid);
                },
                icon: {
                    name: 'thumb-tack',
                    color: colors.text,
                    size: responsiveFontSize(3),
                    type: "font-awesome"
                }
            }
            ];
        }
    };
    _setFlatlistFooter = () => {
        if (this.props.chatlistform.chatlist.length < 1) {
            return null;
        }
        if (this.props.chatlistform.loadingmore == true) {
            return (
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    marginTop: 15,
                    alignItems: "center"
                }}>
                    <ActivityIndicator size={30} color={'silver'} />
                </View>
            );
        } else if (this.props.chatlistform.loadingmore == 'retry') {
            return (
                <Button
                    type="clear"
                    onPress={() => {
                        this.props.fetchMoreList();
                    }}
                    icon={{
                        name: 'sync',
                        type: "antdesign",
                        size: responsiveFontSize(2.7),
                        color: colors.text
                    }}
                    title="Retry"
                    titleStyle={{ color: colors.text, fontSize: responsiveFontSize(2) }}
                    buttonStyle={{
                        alignSelf: 'center',
                        marginTop: 10,
                        borderColor: colors.iconcolor,
                        borderRadius: 15,
                        padding: 10
                    }}
                />
            );
        } else if (this.props.chatlistform.loadingmore == 'done') {
            return null;
        }
        return (
            <Button
                onPress={() => {
                    this.props.fetchMoreList();
                }}
                type="clear"
                icon={{
                    name: 'plus',
                    type: "evilicon",
                    size: responsiveFontSize(6),
                    color: colors.text
                }}
                titleStyle={{ color: colors.text, fontSize: responsiveFontSize(2) }}
                buttonStyle={{
                    alignSelf: 'center',
                    marginTop: 10,
                    borderColor: colors.iconcolor,
                    borderRadius: 15,
                    padding: 10
                }}
            />
        );
    };

    render() {
        let pinneddata = this._setData();
        this.headerdata = pinneddata[0];
        this.bodydata = pinneddata[1];
        let emptyplaceholder = !checkData(this.headerdata) ?
            <View style={styles.listEmptyStyle}>
                {this._setEmptyPlaceHolder()}
            </View> : null;

        return (
            <>
            <FlatList
                data={this.bodydata}
                renderItem={this._renderItem}
                //extraData={this.props.chatlistform.chatlist}
                initialNumRender={10}
                getItemLayout={this._getItemLayout}
                keyExtractor={this._keyExtractor}
                ListEmptyComponent={emptyplaceholder}
                ListHeaderComponent={this._setListHeaderComponent()}
                keyboardShouldPersistTaps='always'
                keyboardDismissMode={'on-drag'}
                ListFooterComponent={this._setFlatlistFooter()}
            />

            <ModalList
                isVisible={this.state.modallistvisible}
                onBackdropPress={() => this.setState({ modallistvisible: false })}
                optionsArr={[{
                    title: "Delete Chat",
                    onPress: () => {
                        this.setState({ modallistvisible: false });
                        let item = this.currentselectedchat;
                        let profile = this.props.userprofile.profile_id == item.sender_profile.profile_id ?
                            item.receiver_profile : item.sender_profile;
                        Alert.alert(
                            `Delete Chat between ${profile.profile_name} and you?`,
                            null,
                            [
                                {
                                    text: "Yes",
                                    onPress: () => this.props.deletePrivateChatList(item),
                                },
                                {
                                    text: "No",
                                    style: "cancel"
                                },
                            ]
                        );
                    },
                    icon: {
                        name: 'close-o',
                        color: colors.text,
                        size: responsiveFontSize(3),
                        type: "evilicon"
                    }
                },
                ...this._rPinned(),
                ]}
            />
            <ActivityOverlay
                isVisible={this.props.chatlistform.deleting}
                text={'Deleting Chat'}
            />

            <AvatarNavModal
                avatar={this.state.avatarnavmodal.avatar}
                isVisible={this.state.avatarnavmodal.visible}
                onBackdropPress={() => this.setState({
                    avatarnavmodal: {
                        ...this.state.avatarnavmodal,
                        visible: false,
                    }
                })}
                onAvatarPress={() => {
                    this.setState({
                        avatarnavmodal: {
                            ...this.state.avatarnavmodal,
                            visible: false,
                        }
                    });
                    Navigation.showModal({
                        component: {
                            name: 'PhotoViewer',
                            passProps: {
                                navparent: true,
                                photos: [this.state.avatarnavmodal.avatar]
                            },
                        }
                    })
                }}
                headername={this.state.avatarnavmodal.headername}
                navBarItemArr={this.navmodallistitem}
            />
            </>
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