import { FlatList, StyleSheet, View, ActivityIndicator, Alert, TouchableOpacity } from "react-native";
import { Text, Button, Icon } from "react-native-elements";
import React, { PureComponent, Component } from 'react';
import { useTheme } from "../../assets/themes/index";
import { responsiveWidth, responsiveHeight, responsiveFontSize } from "react-native-responsive-dimensions";
import FastImage from 'react-native-fast-image';
import { checkData, formatDate } from "../../utilities/index";
import { ModalList, ActivityOverlay } from "./ResuableWidgets";


const { colors } = useTheme();


class PrivateChatItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.reswidth = responsiveWidth(100);
        this.resheight = responsiveHeight(100);
        this.ownerchattextcolor = "#181818";
        this.ownerchatbgcolor = "rgb(237,237,237)";
        this.item = this.props.item;
        this.otherchattextcolor = '';
        if (colors.theme == "black") {
            this.ownerchatbgcolor = colors.border;
            this.ownerchattextcolor = colors.text;
        }
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.warn('PREVIOUS_PROPS', this.props.item.id);
        console.warn('BEW_PROPS', nextProps.item.id);
        if (this.props.item.id != nextProps.item.id) {
            return false;
        }
        return false;
    }
    renderOwnerChat = () => {
        if (this.item.sender_id != this.props.userprofile.profile_id) {
            return null;
        }
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                onLongPress={this.props.onLongPress}
            >
                <View style={{ marginVertical: 5, alignItems: "flex-end" }}>
                    {checkData(this.props.item.newdate) &&
                        <Text style={{ alignSelf: 'center', color: colors.text, marginVertical: 10 }}>
                            {this.props.item.newdate}
                        </Text>}

                    <Text
                        style={{
                            marginHorizontal: 20,
                            fontSize: responsiveFontSize(2.1),
                            color: this.ownerchattextcolor,
                            textAlign: "justify",
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            padding: 12,
                            borderBottomLeftRadius: 30,
                            backgroundColor: this.ownerchatbgcolor,
                            minWidth: 50,
                            maxWidth: responsiveWidth(70)
                        }}
                    >
                        {this.props.item.chat_msg}
                    </Text>
                    {this.renderCheck(this.item)}
                </View >
            </TouchableOpacity>
        );
    };
    renderCheck = (item) => {
        if (!checkData(item) || item.sender_id != this.props.userprofile.profile_id) {
            return null;
        }
        ///item.read = "failed";
        if (item.read == true || item.read == "true") {
            return (
                <Text style={{
                    color: "#a0a0a0",
                    marginHorizontal: 25,
                    textAlign: "justify",
                    fontSize: responsiveFontSize(1.5),
                }}>{item.created_at}  <Text style={{ letterSpacing: -1, color: colors.blue }}>√√</Text>
                </Text>
            );
        } else if (item.read == "delivered") {
            return (
                <Text style={{
                    color: "#a0a0a0",
                    marginHorizontal: 25,
                    textAlign: "justify",
                    fontSize: responsiveFontSize(1.5),
                }}>{item.created_at}  <Text style={{ letterSpacing: -1, }}>√√</Text>
                </Text>
            );
        } else if (item.read == "sending") {
            return (
                <Text style={{
                    color: "#a0a0a0",
                    marginHorizontal: 25,
                    textAlign: "justify",
                    letterSpacing: -1,
                    fontSize: responsiveFontSize(1.8),
                }}><Text style={{ letterSpacing: -1, }}>sending...</Text>
                </Text>
            );
        } else if (item.read == "failed") {
            return (
                <Icon
                    type="antdesign"
                    name="clockcircleo"
                    iconStyle={{
                        color: "#a0a0a0", fontWeight: "bold", textAlign: "justify"
                    }}
                    size={responsiveFontSize(2)}
                    containerStyle={{
                        marginTop: 2, marginHorizontal: 25
                    }
                    }
                />
            );
        } else {
            return (
                <Text style={{
                    color: "#a0a0a0",
                    marginHorizontal: 25,
                    textAlign: "justify",
                    letterSpacing: -1,
                    fontSize: responsiveFontSize(1.8),
                }}>{item.created_at}  <Text style={{ letterSpacing: -1, }}>√</Text>
                </Text>
            );
        }
    };
    renderOtherChat = () => {
        if (this.item.receiver_id != this.props.userprofile.profile_id) {
            return null;
        }
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                onLongPress={this.props.onLongPress}
            >
                <View style={{ marginVertical: 5, alignItems: "flex-start" }}>
                    {checkData(this.item.newdate) && <Text style={{ alignSelf: 'center', color: colors.text, marginVertical: 10 }}>
                        {this.item.newdate}
                    </Text>}

                    <Text
                        style={{
                            borderWidth: 1,
                            borderColor: colors.border,
                            marginHorizontal: 20,
                            fontSize: responsiveFontSize(2.1),
                            color: colors.text,
                            textAlign: "justify",
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            borderBottomRightRadius: 30,
                            padding: 12,
                            minWidth: 50,
                            maxWidth: responsiveWidth(70)
                        }}
                    >
                        {this.item.chat_msg}
                    </Text>
                    <Text style={{
                        marginHorizontal: 25,
                        textAlign: "justify",
                        color: "#a0a0a0",
                        fontSize: responsiveFontSize(1.5)
                    }}>{this.item.created_at}</Text>
                </View>
            </TouchableOpacity>
        );

    };

    render() {
        console.warn('rendered');
        let { item, userprofile } = this.props;
        //console.warn(item);
        let privatechats = item.sender_id == userprofile.profile_id ? this.renderOwnerChat()
            : this.renderOtherChat();
        return privatechats;
    }
}



class PrivateChats extends Component {
    constructor(props) {
        super(props);
        this.state = { modallistvisible: false };
        this.previousdata = this.props.data.map(item => item.id);
        this.currentselectedchatitem = null;
        this.flatlistref = null;
    }

    _setListHeaderComponent = () => {
        if (this.props.loaded == false) {
            return null;
        }
        if (this.props.loadingmore == false) {
            return (
                <Button
                    onPress={() => { }}
                    type="clear"
                    icon={{
                        name: 'plus',
                        type: "evilicon",
                        size: responsiveFontSize(4),
                        color: colors.text
                    }
                    }
                    titleStyle={{ color: colors.text, fontSize: responsiveFontSize(2) }}
                    buttonStyle={{
                        alignSelf: 'center',
                        borderColor: colors.iconcolor,
                        borderRadius: 15,
                        padding: 10
                    }}
                />
            );
        } else if (this.props.loadingmore == true) {
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
        } else {
            return null;
        }
    };

    _setEmptyPlaceHolder = () => {
        if (this.props.loaded == false || this.props.fetching == true) {
            return (
                <View style={{ height: responsiveHeight(70), justifyContent: "center", alignItems: 'center' }}>
                    <ActivityIndicator size="large" color={'silver'} />
                </View>
            );
            return null;
        }
    };

    _setCurrentSelectedChatItem = (chatitem) => {
        this.currentselectedchatitem = chatitem;
    };

    _reSendChat = () => {
        let currentselectedchatitem = this.currentselectedchatitem;
        let chatSchema = { ...currentselectedchatitem, read: "sending" };
        if (!checkData(currentselectedchatitem)) {
            return;
        } else if (checkData(currentselectedchatitem.private_chatid)) {
            chatSchema = {
                ...chatSchema,
                private_chatid: null,
                id: Math.round(new Date().getTime()),
                sender_id: this.props.userprofile.profile_id,
                receiver_id: this.props.partnerprofile.profile_id,
                created_at: `${Math.round(new Date().getTime())}`,

            };
            checkData(this.flatlistref) && this.flatlistref.scrollToOffset({ offset: 0 });
        }
        this.props.sendPrivateChat({
            create_chatid: this.currentselectedchatitem.create_chatid,
            chatSchema,
            reqobj: {
                chat_msg: currentselectedchatitem.chat_msg,
                setread: 'ok',
                receiver_id: this.props.partnerprofile.profile_id,
            }
        });
    };

    _getItemLayout = (data, index) => {
        if (index == -1) return { index, length: 0, height: 0 };
        return { length: 75, offset: 75 * index, index }
    };

    _keyExtractor = (item, index) => index.toString();

    _renderItem = ({ item, index }) => {
        return (
            <PrivateChatItem
                item={item}
                onPress={() => {
                    this._setCurrentSelectedChatItem(item);
                    this.setState({ modallistvisible: true });
                }}
                userprofile={this.props.userprofile}
            />
        );
    }

    render() {
        return (
            <>
            <FlatList
                ref={ref => {
                    this.flatlistref = ref;
                    this.props.setFlatListRef(ref);
                }}
                style={{ height: 50 }}
                data={this.props.loaded == false && [] || [...this.props.data].reverse()}
                maxToRenderPerBatch={1}
                inverted
                updateCellsBatchingPeriod={1}
                initialNumRender={5}
                //ListFooterComponent={this._setListHeaderComponent()}
                ListEmptyComponent={this._setEmptyPlaceHolder()}
                renderItem={this._renderItem}
                keyboardShouldPersistTaps='always'
                keyboardDismissMode={'on-drag'}
                //getItemLayout={this._getItemLayout}
                keyExtractor={this._keyExtractor}
            />

            <ActivityOverlay
                isVisible={this.props.deleting == "true" ? true : false}
                text={'Deleting Chat'}
            />

            <ModalList
                isVisible={this.state.modallistvisible}
                onBackdropPress={() => this.setState({ modallistvisible: false })}
                optionsArr={[{
                    title: "Resend Message",
                    onPress: () => {
                        this.setState({ modallistvisible: false });
                        this._reSendChat();
                    },
                    icon: {
                        name: 'arrow-up',
                        color: colors.text,
                        size: responsiveFontSize(3),
                        type: "evilicon"
                    }
                },
                {
                    title: "Delete Message",
                    onPress: () => {
                        this.setState({ modallistvisible: false });
                        Alert.alert(
                            `Delete Message ?`,
                            null,
                            [
                                {
                                    text: "Yes",
                                    onPress: () => this.props.deletePrivateChat(this.currentselectedchatitem),
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
                }
                ]}
            />
            </>
        );
    }
}
const styles = StyleSheet.create({

});

export default PrivateChats;