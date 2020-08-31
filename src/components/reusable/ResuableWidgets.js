import React, { Component, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal } from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import * as Animatable from 'react-native-animatable';
import { useTheme } from '../../assets/themes';
import { Icon, Avatar, Overlay, Image, Input } from 'react-native-elements';
import { checkData } from '../../utilities';
import { responsiveFontSize, responsiveWidth, responsiveScreenWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import Toast, { DURATION } from 'react-native-easy-toast';
import { ActivityIndicator } from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
const { colors } = useTheme();
export class Header extends React.PureComponent {
    render() {
        let {
            headertext,
            headertextsize,
            headercolor,
            headerStyle,
            headerTextStyle,
            headertextcolor,
            lefticon,
            righticon,
            righticon2,
            leftIconPress,
            rightIconPress,
            rightIcon2Press,
        } = this.props;
        lefticon = lefticon == null || lefticon == undefined || lefticon == '' ? null :
            <TouchableScale
                style={{
                    marginHorizontal: 5,
                    justifyContent: "center",
                    alignItems: "center",
                    width: responsiveWidth(18),
                    height: responsiveHeight(8),
                }}
                onPressIn={leftIconPress}
            >
                {lefticon}
            </TouchableScale>;
        righticon = righticon == null || righticon == undefined || righticon == '' ? null :
            <TouchableScale
                style={{
                    marginHorizontal: 5,
                    //borderWidth: 2,
                    justifyContent: "center",
                    alignItems: "center",
                    width: responsiveWidth(18),
                    height: responsiveHeight(8),
                }}
                onPressIn={rightIconPress}
            >
                {righticon}
            </TouchableScale>;
        righticon2 = righticon2 == null || righticon2 == undefined || righticon2 == '' ? null :
            <TouchableScale
                style={{
                    marginHorizontal: 5,
                    //borderWidth: 2,
                    justifyContent: "center",
                    alignItems: "center",
                    width: responsiveWidth(18),
                    height: responsiveHeight(8),
                }}
                onPressIn={rightIcon2Press}
            >
                {righticon2}
            </TouchableScale>;
        return (
            <View style={[styles.headerStyle, { backgroundColor: headercolor, ...headerStyle }]}>
                {lefticon}
                <Text style={{
                    fontSize: headertextsize,
                    /// fontWeight: 'bold',
                    marginHorizontal: 15,
                    color: headertextcolor,
                    ...headerTextStyle
                }}>
                    {headertext}
                </Text>
                {righticon2}
                {righticon}
            </View >
        );
    }
};

export const OverlayWithImage = ({ isVisible, onAccept,
    theme, overlaytext, overlaystyle,
    imagesource, imagesize, style, }) => {

    return (
        <Overlay
            isVisible={isVisible}
            overlayStyle={[styles.overlayStyle, {
                backgroundColor: theme.card,
                ...overlaystyle
            }]}
        >
            <Animatable.View
                animation="zoomInDown"
                useNativeDriver={true}
                style={{ alignItems: 'center' }}
            >
                <View style={[styles.overlayChildStyle, style]}>
                    <View style={[styles.overlayChildItemStyle, {}]}>
                        <Avatar
                            rounded
                            source={imagesource}
                            size={imagesize}
                        />
                    </View>
                    <View style={[styles.overlayChildItemStyle, {
                        padding: 10,
                        alignItems: "center"
                    }]}>

                        <Text style={{ color: theme.text, fontWeight: "bold", textAlign: "center", fontSize: 18 }}>
                            {overlaytext}
                        </Text>
                        <TouchableOpacity
                            onPressIn={onAccept}
                        >
                            <Text style={{ textAlign: "center", fontSize: 23, margin: 5, color: "#2196F3" }}>
                                OK
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animatable.View>
        </Overlay>
    )
};


export class ImageViewPager extends React.Component {
    constructor(props) {
        super(props);
        this.pageritems = this._createItems(this.props.images, this.props.images.length);
    }
    shouldComponentUpdate(nextProp, nextState) {
        if (this.props.images.length != nextProp.images.length) {
            return true;
        }
        return false;
    }

    _createItems = (data, total) => {
        if (checkData(data) != true) {
            return [];
        }
        let items = [];
        let { colors, reswidth } = this.props;
        data.map((image, index) => {
            items.push(
                <View key={index + 1}
                    style={{
                        flex: 1, backgroundColor: colors.background,
                        borderColor: colors.border,
                    }}>
                    <Image
                        style={{ width: reswidth, height: reswidth }}
                        placeholderStyle={{
                            borderColor: colors.border,
                            borderWidth: 1,
                            backgroundColor: colors.background
                        }}
                        PlaceholderContent={<Icon
                            type="feather"
                            name="image"
                            color={colors.border}
                            size={responsiveFontSize(6)}
                        />}
                        resizeMode='cover'
                        source={{ uri: image }}
                    >
                        {total < 2 ? null
                            : <Text style={[styles.imageIndexTextStyle]}>
                                {`${index + 1}/${total}`}
                            </Text>}
                    </Image>
                </View>
            );
        })
        return items;
    };

    render() {

        return (
            <ViewPager
                orientation='horizontal'
                style={{
                    width: this.props.reswidth,
                    height: this.props.reswidth,
                    backgroundColor: this.props.colors.border,
                }}
                initialPage={0}
                keyboardDismissMode='none'
            >
                {this.pageritems}
            </ViewPager >
        );
    }
};


export const LoaderScreen = ({ animationType, loaderIcon, animationOff, showLoading }) => {
    animationType = checkData(animationType) != true ? 'zoomIn' : animationType;
    loaderIcon = checkData(loaderIcon) != true ? <Icon
        type="antdesign"
        name="smileo"
        color={colors.text}
        size={responsiveFontSize(10)}
    /> : loaderIcon;
    return (
        <View style={[styles.containerStyle, {
            alignItems: 'center',
            backgroundColor: colors.background,
            justifyContent: "center"
        }]}>
            <Animatable.View
                animation={animationType}
                useNativeDriver={true}
                iterationCount={animationOff ? 0 : 'infinite'}
            >
                {loaderIcon}
            </Animatable.View>
            {
                showLoading ? <View style={{ flexDirection: "row", marginVertical: 5, }}>
                    <ActivityIndicator size="small" color={colors.tabiconcolor} />
                </View> : null
            }

        </View>
    );
};

export class BottomListModal extends Component {
    shouldComponentUpdate(nextProp, nextState) {
        if (this.props.visible != nextProp.visible) {
            return true;
        }
        return false;
    }
    _renderList = () => {
        let listData = this.props.listData;
        if (!Array.isArray(listData) || listData.length < 1) {
            return null;
        }
        let list = listData.map((listitem, index) => {
            return (<TouchableOpacity
                onPress={listitem.onPress}
                key={index}
            >
                <View style={styles.bottomModalOptionListRow}>
                    <View style={styles.bottomModalListIconItem}>
                        <Icon
                            name={listitem.icon.name}
                            type={listitem.icon.type}
                            size={responsiveFontSize(3.5)}
                            color={colors.tabiconcolor}
                        />
                    </View>
                    <View style={styles.bottomModalListTextItem}>
                        <Text style={styles.bottomModalListTextStyle}>
                            {listitem.listtext}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>);
        });
        return list;
    };

    render() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.visible}
                ModalComponent={Modal}
                onRequestClose={this.props.onRequestClose}
            >
                <View style={styles.modalChildContainer}>
                    <View style={styles.optionListContainer}>
                        <TouchableOpacity
                            onPress={this.props.onRequestClose}
                        >
                            <Icon
                                name={'closecircleo'}
                                type={'antdesign'}
                                style={{ marginVertical: 2 }}
                                size={responsiveFontSize(3.5)}
                                color={colors.tabiconcolor}
                            />
                        </TouchableOpacity>
                        {this._renderList()}
                    </View>
                </View>
            </Modal>
        );
    }

};


export const ConfirmModal = ({ isVisible, acceptText, acceptAction, rejectAction, rejectText, confirmMsg, }) => {
    return (
        <Overlay
            fullScreen={false}
            animationType="slide"
            isVisible={isVisible}
            overlayStyle={{ opacity: 0.9, padding: 0, borderRadius: 10, backgroundColor: colors.background }}
        >
            <View style={styles.confirmModalCard}>
                <Text style={styles.confirmModalText}>
                    {confirmMsg}
                </Text>
                <View style={styles.confirmModalBtnCtn}>
                    <TouchableOpacity
                        onPress={acceptAction}
                    >
                        <Text style={styles.confirmModalBtn}>
                            {!!acceptText ? acceptText : 'Ok'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={rejectAction}
                    >
                        <Text style={styles.confirmModalBtn}>
                            {!!rejectText ? rejectText : 'Cancel'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Overlay>
    );
};

export const InputBox = ({ avatar, placeholder, inputvalue, onChangeText, autoFocus, maxLength, placeholdercolor, onSubmit }) => {
    return (
        <View style={styles.inputBoxCtn}>
            <Avatar
                size={'small'}
                source={avatar}
                containerStyle={{ marginHorizontal: 8 }}
                icon={{ name: 'user', type: 'antdesign', color: 'white' }}
                rounded
                overlayContainerStyle={styles.inputBoxAvatar}
            />
            <Input
                placeholder={placeholder}
                maxLength={maxLength}
                placeholderTextColor={placeholdercolor || colors.placeholder}
                inputStyle={{ color: colors.text }}
                disableFullscreenUI={true}
                onChangeText={onChangeText}
                value={inputvalue}
                maxLength={maxLength}
                selectionColor='#2196F3'
                autoFocus={autoFocus}
                multiline={true}
                containerStyle={{
                    backgroundColor: colors.background,
                    flexDirection: "row",
                    flex: 1,
                }}
                rightIcon={{
                    onPress: onSubmit,
                    type: "evilicon",
                    name: "sc-telegram",
                    color: colors.text,
                    size: responsiveFontSize(6)
                }}
                inputContainerStyle={{ borderBottomWidth: 0, width: '100%' }}
            />
        </View>
    );
};

export class ListItem extends Component {
    constructor(props) {
        super(props);
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextProps.liked != this.props.liked ||
            nextProps.replies != this.props.replies ||
            nextProps.likes != this.props.likes ||
            nextProps.time != this.props.time ||
            nextProps.BottomContainerItem != this.props.BottomContainerItem ||
            nextProps.profilemuted != this.props.profilemuted ||
            nextProps.hide != this.props.hide
        ) {
            return true;
        }
        return false
    }
    //onTimePress time liked
    render() {
        const { title, time, likebtn, onLongPress, liked, likeButtonComponent, onRetryPress, numLikesPress, likePress, timeTextStyle, likes,
            replies, subtitle, BottomContainerItem,
            replyPress, rightIcon, leftAvatar } = this.props;
        //onRetrypress has precedence
        let longpress = null;
        let onpress = null;
        if (checkData(onRetryPress) == true) {
            onpress = onRetryPress;
        } else {
            longpress = onLongPress
        }

        return (
            <TouchableScale
                friction={90}
                tension={100}
                onPress={onpress}
                onLongPress={longpress}
                activeScale={checkData(longpress) == true || checkData(onpress) == true ? 0.8 : 1}
            >
                <View style={styles.listItemStyle}>
                    <Avatar
                        source={leftAvatar}
                        size={'small'}
                        containerStyle={{ marginTop: 2 }}
                        icon={{ name: 'user', type: 'antdesign', color: 'white' }}
                        rounded
                        overlayContainerStyle={styles.listItemAvatar}
                    />
                    <View style={styles.listItemTextCtn}>
                        <Text>
                            <Text style={styles.title}>{title} </Text>
                            <Text style={styles.subtitle}>
                                {subtitle}
                            </Text>
                        </Text>
                        <View style={styles.listItemBottomCtnStyle}>
                            {checkData(time) ? <Text style={[styles.bottomCtnLeftText, timeTextStyle]}>{time}</Text> : null}
                            {checkData(likes) ? <Text onPress={numLikesPress} style={styles.bottomCtnRightText}>{likes} likes</Text> : null}
                            {replyPress ? <Text onPress={replyPress} style={styles.bottomCtnRightText}>Reply </Text> : null}
                            {checkData(replies) ? <Text style={styles.bottomCtnRightText}>{replies} replies</Text> : null}
                            {BottomContainerItem}
                        </View>
                    </View>
                    {likebtn == true ? likeButtonComponent || <Icon
                        Component={TouchableScale}
                        activeScale={0.8}
                        type="antdesign"
                        name={liked == true ? 'heart' : "hearto"}
                        onPress={likePress}
                        color={liked == true ? 'red' : colors.text}
                        iconStyle={styles.listItemRightIconStyle}
                        size={responsiveFontSize(2.5)}
                    /> : null}
                </View>
            </TouchableScale>
        );
    }
};

export class ActivityOverlay extends React.PureComponent {
    render() {
        const { isVisible, text } = this.props;
        return (
            <Overlay
                isVisible={isVisible}
                animationType="fade"
                overlayStyle={styles.activityOverlay}
            >
                <View style={styles.activityOverlay}>
                    <Text style={{ color: colors.text }}>{text}</Text>
                    <ActivityIndicator
                        size={'small'}
                        color={colors.border} />
                </View>
            </Overlay>
        );
    }
}


const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: 'white',
    },
    headerStyle: {
        flexDirection: 'row',
        height: 55,
        backgroundColor: colors.card,
        elevation: 2,
        alignItems: 'center',
        justifyContent: "space-between",
    },
    overlayStyle: {
        padding: 0,
        borderRadius: 10,
    },
    overlayChildStyle: {
        width: 250,
        alignItems: "center"
    },
    overlayChildItemStyle: {
        // borderWidth: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    imageIndexTextStyle: {
        backgroundColor: "black",
        alignSelf: 'flex-end',
        width: 50,
        opacity: 0.7,
        marginHorizontal: 25,
        marginVertical: 10,
        borderRadius: 5,
        fontSize: responsiveFontSize(3),
        padding: 2,
        color: 'white',
        textAlign: "center",
    },
    modalChildContainer: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    optionListContainer: {
        width: '100%',
        maxWidth: 1080,
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: colors.background,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        minHeight: '5%',
        elevation: 7
    },
    bottomModalOptionListRow: {
        flexDirection: 'row',
        width: '100%',
        margin: 5,
        paddingHorizontal: 15
    },
    bottomModalListIconItem: {
        flex: 1,
        justifyContent: "center"
    },
    bottomModalListTextItem: {
        flex: 3,
        justifyContent: "center"
    },
    bottomModalListTextStyle: {
        color: colors.text,
        fontSize: 16,
    },
    confirmModalChild: {
        width: 200,
        minHeight: 100,
        backgroundColor: colors.background
    },
    confirmModalBtnCtn: {
        flexDirection: 'row',
        justifyContent: "space-between",
        //borderColor: "white",
        alignItems: "center",
        padding: 5,
        //borderWidth: 2,
        flex: 1,

    },
    confirmModalCard: {
        height: 250,
        borderRadius: 10,
        backgroundColor: colors.background,
        //opacity: 0.7,
        elevation: 7,
        justifyContent: "space-between",
        width: 250,
    },
    confirmModalText: {
        color: colors.text,
        fontSize: 20,
        //borderColor: "green",
        textAlign: "center",
        textAlignVertical: "center",
        minHeight: 200,
        //borderWidth: 1,
        padding: 5,
    },
    confirmModalBtn: {
        color: colors.text,
        alignSelf: "center",
        margin: 5,
        marginHorizontal: 10,
        fontSize: 18,
    },


    inputBoxCtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-around',
        borderTopWidth: 0.3,
        borderBottomWidth: 0.3,
        padding: 5,
        borderColor: colors.border,
        backgroundColor: colors.background,
        maxHeight: 160,

    },
    inputBoxAvatar: {
        backgroundColor: colors.border,
    },


    listItemStyle: {
        flexDirection: 'row',
        marginHorizontal: 10,
        //borderWidth: 1,
        padding: 10,
        marginVertical: 8,
    },
    listItemAvatar: {
        backgroundColor: colors.border,
    },
    listItemRightIconStyle: {
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        margin: 5
    },
    listItemBottomCtnStyle: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
        //borderWidth: 2,
        marginTop: 2
    },
    bottomCtnLeftText: {
        fontSize: responsiveFontSize(1.4),
        color: 'silver',
        //marginRight: 15
    },
    bottomCtnRightText: {
        fontSize: responsiveFontSize(1.5),
        fontWeight: "bold",
        marginHorizontal: 10,
        color: 'silver'
    },
    title: {
        color: colors.text,
        fontWeight: "bold"
    },
    subtitle: {
        color: colors.text,
    },
    listItemTextCtn: {
        marginHorizontal: 10,
        justifyContent: "space-between",
        flex: 1
    },
    activityOverlay: {
        width: 100,
        backgroundColor: colors.background,
        flexDirection: 'row',
        height: 70,
        alignItems: "center",
        justifyContent: "space-around"
    }
});