import { FlatList, StyleSheet, View, ActivityIndicator, Alert, TouchableOpacity } from "react-native";
import { Text, Button, Image, Avatar, Icon } from "react-native-elements";
import React, { PureComponent, Component } from 'react';
import { useTheme } from "../../assets/themes/index";
import { responsiveWidth, responsiveHeight, responsiveFontSize } from "react-native-responsive-dimensions";
import FastImage from 'react-native-fast-image';
import { checkData, formatDate, rnPath, convertByteToKbMb,isEmpty } from "../../utilities/index";
import { ModalList, ActivityOverlay } from "./ResuableWidgets";
import moment from 'moment';
import RNFetchBlob from "rn-fetch-blob";
import { Navigation } from "react-native-navigation";

const { colors } = useTheme();

const ShowChat = ({ data, userprofile, onLongPress, onPress }) => {
    if (!Array.isArray(data) || data.length < 1) {
        return null;
    }
    return (
        data.map((item, index) =>
            <PrivateChatItem
                item={item}
                key={index}
                onLongPress={() => item.read == "sending" ? {} : onLongPress(item)}
                userprofile={userprofile}
            />
        ).reverse()
    );
};

class PrivateChatItem extends Component {
    constructor(props) {
        super(props);
        this.state = { chatimageuri: this.returnChatImageUri() };
        this.reswidth = responsiveWidth(100);
        this.resheight = responsiveHeight(100);
        this.ownerchattextcolor = "#181818";
        this.ownerchatbgcolor = "rgb(237,237,237)";

        if (colors.theme == "black") {
            this.ownerchatbgcolor = colors.border;
            this.ownerchattextcolor = colors.text;
        }
        //let t = this.setImageUri();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (
            (this.props.item.sender_id == this.props.userprofile.profile_id &&
                (
                    this.props.item.read != nextProps.item.read ||
                    this.props.item.deleted != nextProps.item.deleted
                )
            )

            ||

            (
                this.state.update != nextState.update
            )
        ) {
            //console.warn(`${this.props.item.read}`, nextProps.item.read);
            return true;
        }
        return false;
    }

    returnChatImageUri = () => {
        let data = this.props.item.chat_pics;
        if (!Array.isArray(data) || data.length < 1) {
            return '';
        } else if (!checkData(this.props.item.private_chatid)) {
            return this.props.item.chat_pics[0].chatpic;
        }

        let imageuri = data[0].chatpic.split('/')[6];
        return imageuri = rnPath(`/storage/emulated/0/CampusMeetup/ChatImages/${imageuri}`);
    };

    _onImageLoadErr = (isowner) => {
        let data = this.props.item.chat_pics[0];
        if (isowner == true) {
            this.setState({
                update: Math.random() * 100000,
                chatimageuri: data.thumbchatpic
            });
        } else if (isowner == false) {
            //console.warn('was here')
            this.setState({
                update: Math.random() * 100000,
                chatimageuri: data.thumbchatpic,
                imageloaded: 'false',
            });
        }
    }

    formatChatTime = (time) => {
        if (isEmpty(time)) {
            return time;
        }
        return moment(time).format('MMM DD YYYY @ h:mm a');
    }

    renderOwnerChat = () => {
        this.item = this.props.item;
        if (this.item.sender_id != this.props.userprofile.profile_id) {
            return null;
        }
        if (checkData(this.item.chat_msg) &&
            (!Array.isArray(this.item.chat_pics) || this.item.chat_pics.length < 1)
        ) {
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

                        <Text style={[styles.ownerChatText, {
                            color: this.ownerchattextcolor,
                            backgroundColor: this.ownerchatbgcolor
                        }]}>
                            {this.props.item.chat_msg}
                        </Text>
                        {this.renderCheck(this.item)}
                    </View >
                </TouchableOpacity>
            );
        } else if (Array.isArray(this.item.chat_pics) || this.item.chat_pics.length > 0) {
            return (
                this.renderOwnerChatImages(this.item.chat_pics)
            )
        } else {
            return null;
        }

    };

    renderOwnerChatImages = (chatimages) => {
        if (!Array.isArray(chatimages) || chatimages.length < 1) {
            return null;
        }
        return chatimages.map((item, index) => {
            return (
                <TouchableOpacity
                    key={index}
                    onLongPress={this.props.onLongPress}
                >
                    <View style={{ marginVertical: 5, alignItems: "flex-end" }}>
                        <TouchableOpacity
                            onPress={() => {
                                Navigation.showModal({
                                    component: {
                                        name: 'PhotoViewer',
                                        passProps: {
                                            navparent: true,
                                            photos: [this.state.chatimageuri]
                                        },
                                    }
                                })
                            }}
                            onLongPress={this.props.onLongPress}
                        >
                            <Image
                                containerStyle={[styles.ownerChatImageContainer, {
                                    borderColor: this.ownerchatbgcolor
                                }]}
                                onLongPress={this.props.onLongPress}
                                onPress={() => {
                                    Navigation.showModal({
                                        component: {
                                            name: 'PhotoViewer',
                                            passProps: {
                                                navparent: true,
                                                photos: [this.state.chatimageuri]
                                            },
                                        }
                                    })
                                }}
                                onError={() => this._onImageLoadErr(true)}
                                placeholderStyle={styles.ownerChatImagePlaceholder}
                                PlaceholderContent={
                                    <Icon
                                        type="feather"
                                        name="image"
                                        color={'white'}
                                        size={responsiveFontSize(4)}
                                    />
                                }
                                resizeMode='cover'
                                source={{ uri: this.state.chatimageuri }}
                            >
                                {checkData(this.item.chat_msg) &&
                                    <View style={{ height: "100%", justifyContent: "flex-end", alignItems: "flex-end" }}>
                                        <Icon
                                            type="antdesign"
                                            name="edit"
                                            color={'white'}
                                            iconStyle={{
                                                fontWeight: "bold",
                                                padding: 5,
                                                backgroundColor: 'rgba(0,0,0,0.2)'
                                            }}
                                            size={responsiveFontSize(3)}
                                        />
                                    </View>
                                }
                            </Image>
                        </TouchableOpacity>
                        {this.renderCheck(this.item)}
                    </View>
                </TouchableOpacity>
            );
        });
    };

    renderCheck = (item) => {
        if (!checkData(item) || item.sender_id != this.props.userprofile.profile_id) {
            return null;
        }

        if (item.read == true || item.read == "true") {
            return (
                <Text style={{
                    color: "#a0a0a0",
                    marginHorizontal: 25,
                    textAlign: "justify",
                    fontSize: responsiveFontSize(1.2),
                }}>{this.formatChatTime(this.item.created_at *1000)}  <Text style={{ letterSpacing: -1, color: colors.blue }}>√√</Text>
                </Text>
            );
        } else if (item.read == "delivered") {
            return (
                <Text style={{
                    color: "#a0a0a0",
                    marginHorizontal: 25,
                    textAlign: "justify",
                    fontSize: responsiveFontSize(1.2),
                }}>{this.formatChatTime(this.item.created_at *1000)}  <Text style={{ letterSpacing: -1, }}>√√</Text>
                </Text>
            );
        } else if (item.read == "sending") {
            return (
                <Text style={{
                    color: "#a0a0a0",
                    marginHorizontal: 25,
                    textAlign: "justify",
                    fontSize: responsiveFontSize(1.2),
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
                    fontSize: responsiveFontSize(1.2),
                }}>{this.formatChatTime(this.item.created_at *1000)}  <Text style={{ letterSpacing: -1, }}>√</Text>
                </Text>
            );
        }
    };

    renderOtherChat = () => {
        this.item = this.props.item;
        if (this.item.receiver_id != this.props.userprofile.profile_id) {
            return null;
        }
        if (checkData(this.item.chat_msg) &&
            (!Array.isArray(this.item.chat_pics) || this.item.chat_pics.length < 1)
        ) {
            return (
                <TouchableOpacity
                    onPress={this.props.onPress}
                    onLongPress={this.props.onLongPress}
                >
                    <View style={{ marginVertical: 5, alignItems: "flex-start" }}>
                        <Text style={styles.othersChatText}>
                            {this.item.chat_msg}
                        </Text>
                        <Text style={styles.othersChatTime}>
                        {this.formatChatTime(this.item.created_at *1000)}
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        } else if (Array.isArray(this.item.chat_pics) || this.item.chat_pics.length > 0) {
            return (
                this.renderOtherChatImages(this.item.chat_pics)
            )
        } else {
            return null;
        }
    };

    showImageDownloadBtn = (size) => {
        //console.warn('download', this.state.imageloaded);
        if (!checkData(size)) {
            return null;
        }
        switch (this.state.imageloaded) {
            case 'false':
                return (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
                        <Button
                            onPress={() => this.downloadOtherChatImage()}
                            type="clear"
                            icon={{
                                name: 'download',
                                type: "antdesign",
                                size: responsiveFontSize(3),
                                color: "white",
                            }
                            }
                            title={convertByteToKbMb(size)}
                            titleStyle={{ color: 'white', fontSize: responsiveFontSize(2) }}
                            buttonStyle={{
                                borderColor: colors.iconcolor,
                                backgroundColor: 'rgba(0,0,0,0.7)',
                                borderRadius: 15,
                                padding: 10
                            }}
                        />
                    </View>
                );
                break;
            case 'downloading':
                return (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
                        <View style={{
                            width: 40, height: 40, justifyContent: 'center', alignItems: "center",
                            backgroundColor: 'rgba(0,0,0,0.3)',
                        }}>
                            <ActivityIndicator size={30} color={'silver'} />
                        </View>
                    </View>
                );
                break;
            default:
                return null;
                break;
        }
    };

    downloadOtherChatImage = () => {
        let arrchatpics = this.props.item.chat_pics;
        let imagename = arrchatpics[0].chatpic.split('/')[6];
        this.setState({
            update: Math.random() * 100000,
            imageloaded: "downloading"
        });
        RNFetchBlob
            .config({
                path: `/storage/emulated/0/CampusMeetup/ChatImages/${imagename}`
            })
            .fetch('GET', arrchatpics[0].chatpic)
            .then(res => {
                //console.warn('downloader', res.path());
                this.setState({
                    update: Math.random() * 100000,
                    chatimageuri: rnPath(res.path()),
                    imageloaded: null
                });
            })
            .catch(err => {
                this.setState({
                    update: Math.random() * 100000,
                    imageloaded: "false"
                });
                // console.warn('downloader err', err.toString());
            });
    }

    renderOtherChatImages = (chatimages) => {
        if (!Array.isArray(chatimages) || chatimages.length < 1) {
            return null;
        }
        return chatimages.map((item, index) => {
            //console.warn(this.state.chatimageuri);
            return (
                <TouchableOpacity
                    key={index}
                    //onPress={this.props.onPress}
                    onLongPress={this.props.onLongPress}
                >
                    <View style={{ marginVertical: 5, alignItems: "flex-start" }}>
                        <TouchableOpacity
                            onPress={() => {
                                Navigation.showModal({
                                    component: {
                                        name: 'PhotoViewer',
                                        passProps: {
                                            navparent: true,
                                            photos: [this.state.chatimageuri]
                                        },
                                    }
                                })
                            }}
                            onLongPress={this.props.onLongPress}
                        >
                            <Image
                                onError={() => this._onImageLoadErr(false)}
                                containerStyle={styles.othersChatImageContainer}
                                placeholderStyle={styles.othersChatImagePlaceholder}
                                onPress={() => {
                                    Navigation.showModal({
                                        component: {
                                            name: 'PhotoViewer',
                                            passProps: {
                                                navparent: true,
                                                photos: [this.state.chatimageuri]
                                            },
                                        }
                                    })
                                }}
                                PlaceholderContent={
                                    <Icon
                                        type="feather"
                                        name="image"
                                        color={'white'}
                                        size={responsiveFontSize(4)}
                                    />
                                }
                                resizeMode='cover'
                                source={{ uri: this.state.chatimageuri }}
                            >
                                <View style={{ height: "100%" }}>
                                    {this.showImageDownloadBtn(item.size)}
                                    {checkData(this.item.chat_msg) &&
                                        <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "flex-end" }}>
                                            <Icon
                                                type="antdesign"
                                                name="edit"
                                                color={'white'}
                                                iconStyle={{
                                                    fontWeight: "bold",
                                                    padding: 5,
                                                    backgroundColor: 'rgba(0,0,0,0.2)'
                                                }}
                                                size={responsiveFontSize(3)}
                                            />
                                        </View>}

                                </View>
                            </Image>
                        </TouchableOpacity>
                        <Text style={styles.othersChatTime}>{this.formatChatTime(this.item.created_at *1000)}</Text>
                    </View>
                </TouchableOpacity>
            );
        });
    };

    render() {
        let { item, userprofile } = this.props;

        /**/
        if (item.deleted == true ||
            (item.sender_deleted == true && item.sender_id == userprofile.profile_id) ||
            (item.receiver_deleted == true && item.receiver_id == userprofile.profile_id)
        ) {
            return null;
        }
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
        this.viewabilityConfig = {
            waitForInteraction: true,
            minimumViewTime: 4000,
            viewAreaCoveragePercentThreshold: 0
        };
    }

    _setListHeaderComponent = () => {
        let data = this.props.data.filter(item => item.deleted != true);
        if (this.props.loaded == false || !Array.isArray(data) || data.length < 1) {
            return null;
        }

        if (this.props.loadingmore == true) {
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
        } else if (this.props.loadingmore == false) {
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
        } else {
            //console.warn(this.props.loadingmore);
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
        let tosendchatdata = this.currentselectedchatitem;
        if (!checkData(tosendchatdata)) {
            alert('Can not resend');
            return;
        }
        let chatSchema = { ...tosendchatdata, read: "sending", partnerprofile: this.props.partnerprofile, };
        if (checkData(tosendchatdata.private_chatid)) {
            /*alert(JSON.stringify(tosendchatdata));
            return;*/
            chatSchema = {
                ...chatSchema,
                private_chatid: null,
                imagehandled: null,
                id: Math.round(new Date().getTime()),
                sender_id: this.props.userprofile.profile_id,
                receiver_id: this.props.partnerprofile.profile_id,
                created_at: `${Math.round(new Date().getTime())}`,

            };
            checkData(this.flatlistref) && this.flatlistref.scrollToOffset({ offset: 0 });
        }
        this.props.sendPrivateChat({
            create_chatid: tosendchatdata.create_chatid,
            chatSchema,
            reqobj: {
                chat_msg: tosendchatdata.chat_msg,
                chat_pics: tosendchatdata.chat_pics,
                setread: 'ok',
                receiver_id: this.props.partnerprofile.profile_id,
            }
        });
    };

    _getItemLayout = (data, index) => {
        if (index == -1) return { index, length: 0, height: 0 };
        return { length: 150, offset: 150 * index, index }
    };

    _keyExtractor = (item, index) => index.toString();

    _renderItem = ({ item, index }) => {
        return (
            <ShowChat
                data={this.props.data}
                // data={[]}
                userprofile={this.props.userprofile}
                onLongPress={(data) => {
                    let imagearr = data.chat_pics;
                    if (checkData(data.private_chatid) && Array.isArray(imagearr) && imagearr.length > 0) {
                        imagearr = data.chat_pics.map(item => {
                            let imageuri = item.chatpic.split('/')[6];
                            return {
                                chatpic: rnPath(`/storage/emulated/0/CampusMeetup/ChatImages/${imageuri}`)
                            };
                        });
                    }
                    this._setCurrentSelectedChatItem({ ...data, chat_pics: imagearr });
                    this.setState({ modallistvisible: true });
                }}
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
                // style={{ height: 50 }}
                viewabilityConfig={this.viewabilityConfig}
                windowSize={50}
                updateCellsBatchingPeriod={0}
                initialNumRender={1}
                getItemLayout={this._getItemLayout}
                //data={this.props.loaded == false && [] || [...this.props.data].reverse()}
                data={this.props.loaded == false && [] || [1]}
                //maxToRenderPerBatch={1}
                inverted
                //updateCellsBatchingPeriod={0}
                initialNumRender={5}
                ListFooterComponent={this._setListHeaderComponent()}
                ListEmptyComponent={this._setEmptyPlaceHolder()}
                renderItem={this._renderItem}
                keyboardShouldPersistTaps='always'
                keyboardDismissMode={'on-drag'}
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
                            `Delete message for you ?`,
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
        textAlign: "justify",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 30,
        padding: 12,
        minWidth: 50,
        maxWidth: responsiveWidth(70)
    },
    othersChatTime: {
        marginHorizontal: 25,
        textAlign: "justify",
        color: "#a0a0a0",
        fontSize: responsiveFontSize(1.2)
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
        textAlign: "justify",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 12,
        borderBottomLeftRadius: 30,
        minWidth: 50,
        maxWidth: responsiveWidth(70)
    }
});

export default PrivateChats;