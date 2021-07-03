import React, { Component, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Modal, FlatList } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useTheme } from '../../assets/themes';
import { Icon, Avatar, Text, Overlay, Image, Input, Button } from 'react-native-elements';
import { checkData } from '../../utilities';
import { responsiveFontSize, responsiveWidth, responsiveScreenWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import Toast, { DURATION } from 'react-native-easy-toast';
import { ActivityIndicator } from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import { Navigation } from 'react-native-navigation';
import { ViewPager } from './viewpager/index';

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



export class HeaderWithImage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.props.avatarUri != nextProps.avatarUri ||
            this.props.title != nextProps.title ||
            this.props.subTitle != nextProps.subTitle
        ) {
            return true;
        }
        return false;
    }

    render() {
        const { Icon1, Icon2, Icon3, onAvatarPress, title, subTitle, avatarUri, avatarStyle } = this.props;
        return (
            <View style={styles.headerWithImageStyle}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: "center",
                    height: "100%",
                    flex: 1,
                }}>
                    {Icon1 && Icon1}
                    <Avatar
                        rounded
                        size={30}
                        onPress={onAvatarPress}
                        source={avatarUri || null}
                        icon={{ name: 'user', type: 'antdesign', color: 'white' }}
                        resizeMode={'contain'}
                        placeholderStyle={styles.headerImageContainerStyle}
                        containerStyle={[styles.headerImageContainerStyle, { marginTop: 2 }]}
                        overlayContainerStyle={styles.headerImageContainerStyle}
                    />
                    <View style={{ marginHorizontal: 8 }}>
                        <Text
                            ellipsizeMode={'tail'}
                            numberOfLines={1}
                            style={{
                                color: colors.text,
                                marginTop: 3,
                                maxWidth: responsiveWidth(40),
                                fontWeight: 'bold'
                            }}>
                            {title}
                        </Text>
                        {subTitle && <Text
                            ellipsizeMode={'tail'}
                            style={{
                                color: colors.iconcolor,
                                fontSize: responsiveFontSize(1.3),
                                marginTop: 3,
                                maxWidth: responsiveWidth(40)
                            }}
                            numberOfLines={1}
                        >
                            {subTitle}
                        </Text>}
                    </View>
                </View>
                {Icon2 && Icon2}
                {Icon3 && Icon3}
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

export class PanelMsg extends Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return false;
    }
    render() {
        return (
            <View style={{
                width: "100%", flexDirection: 'row', padding: 10, justifyContent: "space-between", alignItems: "center", marginVertical: 5,
                backgroundColor: colors.background,
            }}>
                <Text style={{ color: colors.iconcolor }}>
                    {this.props.message}
                </Text>
                {this.props.buttonTitle && <TouchableScale
                    onPress={this.props.buttonPress}
                >
                    <Text
                        style={{ color: colors.blue }}>
                        {this.props.buttonTitle}</Text>
                </TouchableScale>}
            </View>
        );
    }
}

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
                iterationCount={animationOff ? 1 : 'infinite'}
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
export class ScrollableListOverLay extends Component {

    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.props.visible != nextProps.visible ||
            this.props.loading != nextProps.loading ||
            String(this.props.updateArr) != String(nextProps.updateArr)
        )
            return true;
        else
            return false;
    }

    _render = () => {
        let { loading, children, reLoad } = this.props;
        if (loading == 'true' || loading == true) {
            return (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size={30} color={'silver'} />
                </View>
            )
        } else if (loading == "retry") {
            return (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{
                        color: colors.text,
                        textAlign: "center",
                        fontWeight: "bold",
                    }}>
                        Failed to load
                    </Text>
                    <Button
                        type="outline"
                        onPress={() => checkData(reLoad) ? reLoad() : null}
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
                <ScrollView
                    //showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ marginLeft: 40, ...this.props.contentContainerStyle }}
                    keyboardShouldPersistTaps='always'
                    keyboardDismissMode={'on-drag'}
                >
                    {children || <Text style={{
                        fontSize: responsiveFontSize(3),
                        marginLeft: 60,
                        fontWeight: "bold",
                        marginVertical: 100,
                        color: colors.iconcolor
                    }}>List is Empty</Text>}
                </ScrollView>
            );
        }
    };

    render() {
        let { visible, width, height, submitAction, submitactiontxt, ListTitle, onBackdropPress } = this.props;
        return (
            <Overlay
                fullScreen={false}
                onBackdropPress={onBackdropPress}
                onRequestClose={onBackdropPress}
                animationType="slide"
                isVisible={visible || false}
                overlayStyle={{
                    opacity: 0.9,
                    padding: 0,
                    borderRadius: 10,
                    backgroundColor: colors.card
                }}
            >
                <View
                    style={{
                        width: width || 300,
                        borderRadius: 10,
                        height: height || 300,
                        backgroundColor: colors.card
                    }}>
                    <Header
                        headertext={ListTitle}
                        headerStyle={{ elevation: 0 }}
                        headerTextStyle={{
                            margin: 5,
                            marginTop: 15,
                            fontWeight: "bold",
                            fontSize: responsiveFontSize(2.5),
                            alignSelf: "center",
                            color: colors.text
                        }}
                        righticon={
                            submitAction ?
                                <Button
                                    title={submitactiontxt || 'save'}
                                    buttonStyle={{ backgroundColor: colors.blue }}
                                    containerStyle={{ borderRadius: 10 }}
                                    onPress={() => submitAction()}
                                />
                                : null
                        }
                    //rightIconPress={submitAction}
                    />
                    {this._render()}
                </View>
            </Overlay>
        );
    }
}




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

export const AvatarNavModal = ({
    navBarItemArr,
    avatar,
    onAvatarPress,
    isVisible,
    onBackdropPress,
    headername
}) => {
    avatar = checkData(avatar) ? { uri: avatar } : require('../../assets/images/placeholder.png');
    const renderNavItems = () => {
        if (!Array.isArray(navBarItemArr) && navBarItemArr.length < 1) {
            return null;
        }
        let navitem = navBarItemArr.map((item, index) => {
            return (
                <Button
                    key={index.toString()}
                    onPress={item.onPress}
                    icon={{
                        ...item.icon,
                        color: colors.text,
                        size: responsiveFontSize(5)
                    }}
                    type={'clear'}
                    titleStyle={{ color: colors.text }}
                    buttonStyle={{ borderRadius: 0, flex: 1 }}
                    containerStyle={{ flex: 1, borderRadius: 0, }}
                />
            );
        });
        return navitem;
    };

    return (
        <Overlay
            fullScreen={false}
            isVisible={isVisible}
            onBackdropPress={onBackdropPress}
            animationType="fade"
            overlayStyle={{
                padding: 0,
                margin: 0,
                backgroundColor: colors.background
            }}
        >
            <View style={styles.avatarNavModal}>
                <TouchableScale activeScale={1} onPress={onAvatarPress}>
                    <Image style={{ width: 250, height: 250, }}
                        source={avatar}
                    >
                        <View style={styles.avatarNavModalImageHeader}>
                            <Text style={{ color: 'white', fontSize: responsiveFontSize(2.5) }}>
                                {headername}
                            </Text>
                        </View>
                    </Image>
                </TouchableScale>
                <View style={styles.avatarNavModalNavCtn}>
                    {renderNavItems()}
                </View>
            </View>
        </Overlay>
    )
};

export const ModalList = ({ optionsArr, isVisible, onBackdropPress }) => {
    /**
     * component functions
     */
    function renderModalList() {
        if (Array.isArray(optionsArr) && optionsArr.length > 0) {
            let list = [];
            list = optionsArr.map(item => {
                return (<Button
                    type={'clear'}
                    key={item.title}
                    title={item.title}
                    loading={item.loading}
                    icon={item.icon}
                    onPress={item.onPress}
                    buttonStyle={{ backgroundColor: colors.card, paddingVertical: 10 }}
                    containerStyle={{ backgroundColor: colors.card }}
                    titleStyle={{ color: colors.text }}
                    iconStyle={{ color: colors.iconcolor }}
                />);
            });
            return list;
        }
        return null;
    }


    return (
        <Overlay
            fullScreen={false}
            onBackdropPress={onBackdropPress}
            animationType="slide"
            isVisible={isVisible}
            overlayStyle={{
                padding: 0,
                margin: 0, backgroundColor: colors.card, justifyContent: 'center'
            }}
        >
            <View style={{
                backgroundColor: colors.card,
                borderRadius: 20,
                width: 250, minHeight: 200
            }}>
                {renderModalList()}
            </View>
        </Overlay>
    );
};

export class InputBox extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        //return true;
        if (this.props.inputvalue != nextProps.inputvalue || this.props.update != nextProps.update) {
            return true;
        }
        return false;
    }

    renderAvatar = () => {
        const {
            style,
            inputStyle,
            avatar,
            leftIcon,
            showAvatar,
            placeholder,
            inputvalue,
            onChangeText,
            autoFocus,
            maxLength,
            placeholdercolor,
            onSubmit
         } = this.props;
        if (showAvatar == false) {
            return null;
        }
        return (
            <Avatar
                size={'small'}
                source={avatar}
                containerStyle={{ marginHorizontal: 8 }}
                icon={{ name: 'user', type: 'antdesign', color: 'white' }}
                rounded
                overlayContainerStyle={styles.inputBoxAvatar}
            />
        );
    };
    render() {
        const {
            style,
            avatar,
            leftIcon,
            rightIcon,
            showAvatar,
            inputStyle,
            placeholder,
            returnKeyType,
            returnKeyLabel,
            backgroundColor,
            inputvalue,
            onChangeText,
            onSubmitEditing,
            multiline,
            autoFocus,
            maxLength,
            placeholdercolor,
            onSubmit
         } = this.props;
        return (
            <View style={[styles.inputBoxCtn, style]}>
                {this.renderAvatar()}
                <Input
                    placeholder={placeholder}
                    maxLength={maxLength}
                    placeholderTextColor={placeholdercolor || colors.placeholder}
                    inputStyle={[{ color: colors.text }, inputStyle]}
                    disableFullscreenUI={true}
                    returnKeyType={returnKeyType}
                    leftIcon={leftIcon}
                    onChangeText={onChangeText}
                    onSubmitEditing={onSubmitEditing}
                    value={inputvalue}
                    maxLength={maxLength}
                    selectionColor='#2196F3'
                    autoFocus={autoFocus}
                    multiline={checkData(multiline) ? multiline : false}
                    containerStyle={{
                        backgroundColor: backgroundColor || colors.background,
                        flexDirection: "row",
                        flex: 1,
                    }}
                    leftIcon={leftIcon}
                    leftIconContainerStyle={{ marginHorizontal: 5 }}
                    rightIcon={{
                        onPress: onSubmit,
                        type: "evilicon",
                        name: "sc-telegram",
                        color: colors.text,
                        size: responsiveFontSize(7),
                        ...rightIcon
                    }}
                    inputContainerStyle={{ borderBottomWidth: 0, width: '100%' }}
                />
            </View>
        );
    }
};

export class ListItem extends Component {
    constructor(props) {
        super(props);
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextProps.liked != this.props.liked ||
            nextProps.title != this.props.title ||
            nextProps.subtitle != this.props.subtitle ||
            nextProps.replies != this.props.replies ||
            nextProps.likes != this.props.likes ||
            nextProps.deleted != this.props.deleted ||
            nextProps.time != this.props.time ||
            String(nextProps.leftAvatar) != String(this.props.leftAvatar) ||
            //nextProps.BottomContainerItem != this.props.BottomContainerItem ||
            nextProps.profilemuted != this.props.profilemuted ||
            nextProps.hide != this.props.hide
        ) {
            return true;
        }
        return false
    }

    _setBtnComponent = () => {
        if (this.props.likebtn == true && this.props.hide != true) {
            return (this.props.likeButtonComponent || <Icon
                Component={TouchableScale}
                activeScale={0.8}
                type="antdesign"
                name={this.props.liked == true ? 'heart' : "hearto"}
                onPress={this.props.likePress}
                color={this.props.liked == true ? 'red' : colors.text}
                iconStyle={styles.listItemRightIconStyle}
                size={responsiveFontSize(2.5)}
            />);
        } else if (this.props.hide == true) {
            return (
                <Icon
                    type="feather"
                    name={'eye-off'}
                    color={colors.text}
                    iconStyle={styles.listItemRightIconStyle}
                    size={responsiveFontSize(2.5)}
                />
            )
        }
        return null;
    };

    //onTimePress time liked
    render() {
        const { title, titleStyle, time, likebtn, onLongPress, onAvatarPress, onPress, liked, likeButtonComponent, onRetryPress, numLikesPress, likePress, timeTextStyle, likes,
            replies, subtitle, subtitleStyle, BottomContainerItem,
            replyPress, rightIcon, leftAvatar } = this.props;
        //onRetrypress has precedence
        let longpress = null;
        let onpress = null;
        if (checkData(onRetryPress) || checkData(onPress)) {
            onpress = onPress || onRetryPress;
        } else {
            longpress = onLongPress
        }
        if (this.props.deleted == true) {
            return null;
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
                        onPress={onAvatarPress}
                        size={'small'}
                        containerStyle={{ marginTop: 2 }}
                        icon={{ name: 'user', type: 'antdesign', color: 'white' }}
                        rounded
                        overlayContainerStyle={styles.listItemAvatar}
                    />
                    <View style={styles.listItemTextCtn}>
                        <Text>
                            <Text style={[styles.title, titleStyle]}>{title} </Text>
                            <Text style={{ ...styles.subtitle, ...subtitleStyle }}>
                                {subtitle}
                            </Text>
                        </Text>
                        <View style={styles.listItemBottomCtnStyle}>
                            {checkData(time) ? <Text style={[styles.bottomCtnLeftText, timeTextStyle]}>{time}</Text> : null}
                            {checkData(likes) ? <Text onPress={numLikesPress} style={styles.bottomCtnRightText}>{likes} likes</Text> : null}
                            {replyPress && this.props.hide == false ? <Text onPress={replyPress} style={styles.bottomCtnRightText}>Reply </Text> : null}
                            {checkData(replies) ? <Text onPress={replyPress} style={styles.bottomCtnRightText}>{replies} replies</Text> : null}
                            {BottomContainerItem}
                        </View>
                    </View>
                    {this._setBtnComponent()}
                </View>
            </TouchableScale>
        );
    }
};

export class ActivityOverlay extends Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.props.isVisible != nextProps.isVisible) {
            return true;
        }
        return false;
    }
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

export class ImageGalleryItem extends Component {
    constructor(prop) {
        super(prop);
        this.reswidth = this.props.width || 100;
        this.resheight = this.props.height || 100;
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextProps.avatar != this.props.avatar) {
            return true;
        }
        return false;
    }

    render() {
        let { smallavatar, avatar, onItemClicked } = this.props;
        let smallavataruri = typeof smallavatar == "string" ? { uri: smallavatar } : smallavatar;
        avatar = checkData(avatar) ? avatar : smallavatar;
        let onPress = checkData(onItemClicked) ?
            () => this.props.onItemClicked(smallavatar, avatar)
            :
            () => Navigation.showModal({
                component: {
                    name: 'PhotoViewer',
                    id: "PHOTO_VIEWER",
                    passProps: {
                        navparent: true,
                        onSubmit: this.props.onSubmit,
                        photos: [avatar]
                    },
                }
            });
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                style={{ margin: 1 }}
                onPress={() => onPress()}
            >
                <Image
                    source={smallavataruri}
                    style={{ width: this.reswidth, height: this.resheight }}
                    placeholderStyle={{ backgroundColor: colors.border }}
                    containerStyle={{ backgroundColor: colors.border }}
                    PlaceholderContent={
                        <Icon
                            type="feather"
                            name="image"
                            color={'white'}
                            size={responsiveFontSize(3)}
                        />
                    }
                />
            </TouchableOpacity>
        );
    }
}


export class ImageGallery extends Component {

    constructor(props) {
        super(props);
        this.resheight = checkData(this.props.height) ? this.props.height : 100;
        this.reswidth = checkData(this.props.reswidth) ? this.props.reswidth : 100;
        this.viewabilityConfig = {
            waitForInteraction: true,
            minimumViewTime: 4000,
            viewAreaCoveragePercentThreshold: 0
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return true;
    }

    _keyExtractor = (item, index) => item.avatar;

    _getItemLayout = (data, index) => {
        if (index == -1) return { index, length: 0, height: 0 };
        return { length: this.resheight, offset: this.resheight * index, index }
    };

    _setEmptyPlaceHolder = () => {
        if (this.props.loading == true) {
            return (
                <View style={{ alignItems: "center", height: 200, justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color={'silver'} />
                </View>);
        } else if (this.props.loading == 'retry') {
            return (
                <View style={{ alignItems: "center", height: 200, justifyContent: 'center' }}>
                    <Button
                        onPress={() => {
                            checkData(this.props.Fetch) && this.props.Fetch();
                        }}
                        type="clear"
                        icon={{
                            name: 'sync',
                            type: "antdesign",
                            size: responsiveFontSize(4),
                            color: colors.text
                        }}
                        titleStyle={{ color: colors.text, fontSize: responsiveFontSize(2) }}
                        buttonStyle={{
                            alignSelf: 'center',
                            marginTop: 10,
                            borderColor: colors.iconcolor,
                            padding: 10
                        }}
                    />
                </View>
            );
        } else {
            return (
                <View style={{ alignItems: "center", height: 200, justifyContent: 'center' }}>
                    <Icon
                        name="meh"
                        type={"antdesign"}
                        color={colors.iconcolor}
                        size={responsiveFontSize(5)}
                    />
                    <Text style={{ margin: 5, color: colors.iconcolor }}>Nothing to show</Text>
                </View>
            )
        }
    };

    _setFlatlistFooter = () => {
        if (this.props.photos.length < 1) {
            return null;
        }
        if (this.props.loadingmore == true) {
            return (
                <View style={{ flex: 1, justifyContent: "center", marginTop: 15, alignItems: "center" }}>
                    <ActivityIndicator size={30} color={'silver'} />
                </View>
            );
        } else if (this.props.loadingmore == 'retry') {
            return (
                <Button
                    onPress={() => {
                        checkData(this.props.loadMore) && this.props.loadMore();
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
        } else if (this.props.loadingmore == false) {
            return (
                <Button
                    onPress={() => {
                        checkData(this.props.loadMore) && this.props.loadMore();
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
        } else {
            return null;
        }
    };

    _renderItem = ({ item }) => {
        return (
            <ImageGalleryItem
                smallavatar={item.smallavatar}
                onItemClicked={this.props.onItemClicked}
                avatar={item.avatar}
                onSubmit={this.props.onSubmit}
                width={this.props.width}
                height={this.props.height}
            />
        );
    }
    render() {
        let { photos } = this.props;
        return (
            <FlatList
                viewabilityConfig={this.viewabilityConfig}
                windowSize={50}
                updateCellsBatchingPeriod={0}
                numColumns={this.props.numColumns || 3}
                style={{ flex: 1 }}
                getItemLayout={this._getItemLayout}
                ListEmptyComponent={this._setEmptyPlaceHolder()}
                ListFooterComponent={this._setFlatlistFooter()}
                data={photos}
                initialNumRender={5}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
            />
        );
    }
}

export function optimizeComponent(WrappedComponent, update) {
    return class Optimize extends Component {
        shouldComponentUpdate(nextProps, nextState, nextContext) {
            return checkData(update) ?
                update(nextProps, this.props) : false;
        }
        render() {
            return (
                <WrappedComponent {...this.props} />
            )
        }
    };
};

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
    headerWithImageStyle: {
        paddingHorizontal: 13,
        backgroundColor: colors.card,
        height: 55,
        alignItems: "center",
        borderWidth: 0,
        elevation: 1.5,
        flexDirection: 'row',
    },
    headerImageContainerStyle: {
        backgroundColor: colors.border,
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

    avatarNavModal: {
        width: 250,
        height: 300,
        backgroundColor: colors.background
    },
    avatarNavModalImageHeader: {
        height: 40,
        backgroundColor: "rgba(0,0,0,0.2)",
        padding: 10,
        justifyContent: "center",
    },
    avatarNavModalNavCtn: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: colors.card
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
        width: 150,
        backgroundColor: colors.background,
        flexDirection: 'row',
        height: 70,
        alignItems: "center",
        justifyContent: "space-around"
    }
});