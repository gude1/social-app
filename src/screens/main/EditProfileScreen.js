import React, { useState, useEffect, useMemo } from 'react';
import {
    SafeAreaView,
    View,
    StyleSheet,
    StatusBar,
    ActivityIndicator,
    ToastAndroid,
    TouchableOpacity,
    Dimensions,
    ScrollView
} from 'react-native';
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Progressive,
    ShineOverlay,
} from 'rn-placeholder';
import { Input, Text, Image, Avatar, Card, Icon, Overlay, Divider } from 'react-native-elements';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import CustomPicker from '../../components/reusable/Picker';
import pickerData from '../../assets/static/CampusList.json';
import GenderData from '../../assets/static/GenderList.json';
import { Header, OverlayWithImage, LoaderScreen } from '../../components/reusable/ResuableWidgets';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'rn-fetch-blob';
import session from '../../api/session';
import { rnPath, getAppInfo, checkData } from '../../utilities';
import { Navigation } from 'react-native-navigation';
import * as Animatable from 'react-native-animatable';
import { responsiveFontSize, responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions'
import { useTheme } from '../../assets/themes';

const { colors } = useTheme();
let inputwidth = responsiveWidth(85);
let containerinputwidth = responsiveWidth(90);
inputwidth = inputwidth > 450 ? 450 : inputwidth;
containerinputwidth = containerinputwidth > 550 ? 550 : containerinputwidth;


const EditProfileScreen = ({ navigation,
    user,
    profile,
    posts,
    profileform,
    navparent,
    componentId,
    setUpdateUsername,
    saveProfileUpdate,
    setUpdateGender,
    setProcessing,
    setUpdateBio,
    setImageTry,
    editprofileinfo,
    setAppInfo,
    setProfileData,
    setUpdateCampus,
    uploadProfilePic,
}) => {
    const placeholderColor = '#606060';
    let lefticon = navparent == true ? <Icon
        type="evilicon"
        name="arrow-left"
        color={colors.text}
        size={responsiveFontSize(6)}
    /> : null;
    let lefticonpress = navparent == true ? () => Navigation.pop(componentId) : null;
    const [modalstate, setModalState] = useState({
        chooseimagestate: false,
        screeninfomodal: false,
    });
    const [loaded, setLoaded] = useState(false);
    let righticon2 = null;
    let rightIcon2Press = null;

    /**
     * component function goes here
     */
    useEffect(() => {
        const listener = {
            componentDidAppear: () => {
                //to show toast modal if profile is not here completed and pageinfo modal has already being shown
                if (editprofileinfo == true && getAppInfo(profile, 'profile') == 'profilefalse') {
                    ToastAndroid.show('Make sure you upload your profile picture and complete your profile so as to continue into the app',
                        ToastAndroid.LONG);
                }
                if (getimagetry) {
                    setImageTry(false);
                }
                if (!loaded) {
                    setLoaded(true);
                    return;
                }
            },
            componentDidDisappear: () => {
                //console.log('RNN', `componentDidDisappear`);
            }
        };
        // Register the listener to all events related to our component
        const unsubscribe = Navigation.events().bindComponent(listener, componentId);
        return () => {
            // Make sure to unregister the listener during cleanup
            unsubscribe.remove();
        };
    }, []);


    Navigation.mergeOptions(componentId, {
        statusBar: {
            backgroundColor: colors.statusbar,
            style: colors.statusbartext
        },
        topBar: {
            visible: false,
        }
    });



    const openDeviceCamera = () => {
        setModalState({ ...modalstate, chooseimagestate: false });
        ImagePicker.openCamera({
            width: 300,
            height: 300,
            cropping: true,
            cropperActiveWidgetColor: '#2196F3',
            // cropperToolbarTitle: "Edit Photo",
            avoidEmptySpaceAroundImage: true,
            hideBottomControls: true,
            enableRotationGesture: true,
            showCropGuidelines: true,
            cropperToolbarColor: "#2196F3",
            cropperStatusBarColor: 'black',
        }).then(image => {
            uploadProfilePic(image);
        })
            .catch(err => { });
    };
    const openModal = () => {
        setModalState({ ...modalstate, chooseimagestate: true });
    };
    const openDeviceGallery = () => {
        setModalState({ ...modalstate, chooseimagestate: false });
        ImagePicker.openPicker({
            width: 200,
            height: 200,
            cropping: true,
            cropperActiveWidgetColor: '#2196F3',
            cropperToolbarTitle: "Edit Photo",
            avoidEmptySpaceAroundImage: true,
            hideBottomControls: true,
            enableRotationGesture: false,
            showCropGuidelines: true,
            showCropFrame: true,
            cropperToolbarColor: "#2196F3",
            cropperStatusBarColor: 'black',
        }).then(image => {
            uploadProfilePic(image);
        })
            .catch(err => { });

    };


    const downloadImage = (uri) => {
        if (uri == '' || uri == null || uri == undefined) {
            return;
        }
        if (getimagetry == false) {
            let image = uri.split('/');
            if (image[7] == undefined || image[7] == '' || image[7] == null) {
                setProfileData({ avatarremote: "" });
                return;
            }
            let dirs = RNFetchBlob.fs.dirs;
            let task = RNFetchBlob.config({ path: `${dirs.CacheDir}/${image[7]}` }).fetch('GET', uri, {})
            task.then((res) => {
                setProfileData({ avatarlocal: rnPath(res.path()) });
                if (getimagetry) {
                    setImageTry(false);
                    //console.log('from here');
                }

                console.log('The file saved to ', rnPath(res.path()))
            })
                .catch(e => {
                    setImageTry(true);
                    console.log(e.toString());
                });
        }
    };
    const checkImage = (data) => {
        RNFetchBlob.fs.exists(data)
            .then(res => {
                //console.warn(res);
                if (res == false) {
                    setProfileData({ avatarlocal: '' });
                }
            })
            .catch(e => e);
    };
    /**
     * component function ends here
     */

    let { name, username, phone, gender } = user;
    let { bio, campus, avatar, avatarlocal, avatarremote } = profile;
    let { getimagetry, updateProfile: { updatedusername, errors, updatedbio, updatedcampus, updatedgender, isProcessing, isProcessingImage } } = profileform;
    username = updatedusername == null ? username : updatedusername;
    bio = updatedbio == null ? bio : updatedbio;
    campus = updatedcampus == null ? campus : updatedcampus;
    let genderenable = gender == 'false' ? true : false;
    //gender = gender == 0 ? 'male' : gender == 1 ? 'female' : gender;
    gender = updatedgender == null ? gender : updatedgender;
    let gendericon = (gender == null || gender == "none" || gender == 'false') ? 'question' : gender;
    let genderfont = 'font-awesome';
    let loadingplaceholder = null;
    avatar = (avatarlocal == null || avatarlocal == "" || avatarlocal == undefined) ?
        null :
        { uri: avatarlocal };
    let profilemodaltext = isProcessing ? 'saving profile' : 'uploading profile picture';
    let profilemodalstate = false;

    /**
     * CONDITIONAL IF ELSE STATEMENTS STARTS HERE
     */
    //show toast message to user asking to complete profile if editprofile info modal has already being displayed
    if (editprofileinfo == false || checkData(editprofileinfo) == false) {
        setTimeout(() => {
            setModalState({ ...modalstate, screeninfomodal: true });
            setAppInfo({ editprofileinformed: true });
        }, 1000);
    }
    if (modalstate.chooseimagestate == true && getimagetry == false) {
        setImageTry(true);
    }
    if ((avatarlocal == null || avatarlocal == "" || avatarlocal == undefined) &&
        (avatarremote != "" && avatarremote != null && avatarremote != undefined) &&
        getimagetry == false) {
        //if local image is empty but uri is available
        //getimagetry is to only try to download the image once
        loadingplaceholder = <ActivityIndicator size="large" color="#2196F3" />;
        downloadImage(avatarremote);
    } else if (avatarlocal != null & avatarlocal != "" && avatarlocal != undefined) {
        //if local image is existent confirm it is actually in cache
        checkImage(avatarlocal);
    }
    if (isProcessing == true || isProcessingImage == true) {
        profilemodalstate = true;
    }
    if (getAppInfo(posts, 'post') == 'postfalse'
        && getAppInfo(profile, 'profile') == 'profiletrue'
        && navparent != true) {
        righticon2 = <Text
            style={{
                fontSize: responsiveFontSize(2.8),
                color: "#2196F3"
            }}
        >Next</Text>;
        rightIcon2Press = () => Navigation.push(componentId, {
            component: {
                name: 'CreatePost',
                passProps: {
                    navparent: true
                },
            }
        });
    }
    /**
    * CONDITIONAL IF ELSE STATEMENTS ENDS HERE
    */

    return (
        <SafeAreaView style={[styles.containerStyle, { backgroundColor: colors.background }]}>
            <Header
                headercolor={colors.card}
                headertext="EditProfile"
                headertextcolor={colors.text}
                headertextsize={responsiveFontSize(2.9)}
                lefticon={lefticon}
                righticon={<Icon
                    type="antdesign"
                    name="adduser"
                    color={colors.text}
                    size={responsiveFontSize(4.5)}
                />
                }
                righticon2={righticon2}
                //saveProfileUpdate(username, bio, campus, gender)
                leftIconPress={lefticonpress}
                rightIconPress={() => saveProfileUpdate(username, bio, campus, gender, componentId)}
                rightIcon2Press={rightIcon2Press}
            />

            <OverlayWithImage
                isVisible={modalstate.screeninfomodal}
                theme={colors}
                onAccept={() => setModalState({ ...modalstate, screeninfomodal: false })}
                overlaystyle={{ opacity: 0.9 }}
                imagesize={130}
                imagesource={require('../../assets/emojiimages/excited.jpeg')}
                overlaytext={`Hi ${username},upload your profile picture and fill your profile details to proceed`}

            />

            <Overlay
                isVisible={profilemodalstate}
                overlayStyle={{ padding: 0, backgroundColor: colors.card, }}
            >
                <Animatable.View
                    animation="bounceIn"
                    useNativeDriver={true}
                    style={{ alignItems: 'center' }}
                >
                    <View style={[styles.overlayChildViewStyle]}>
                        <ActivityIndicator size="large" color="#2196F3" />
                        <Text style={[styles.overlayTextStyle, { color: colors.text, marginHorizontal: 5 }]}>
                            {profilemodaltext}
                        </Text>
                    </View>
                </Animatable.View>
            </Overlay>
            <Overlay
                isVisible={modalstate.chooseimagestate}
                onBackdropPress={() => setModalState({ ...modalstate, chooseimagestate: false })}
                overlayStyle={{ padding: 0, backgroundColor: colors.card, opacity: 0.8, }}
            >
                <Animatable.View
                    animation="bounceIn"
                    useNativeDriver={true}
                    style={{ alignItems: 'center' }}
                >
                    <View style={[styles.overlayImageChildViewStyle]}>
                        <TouchableOpacity
                            onPressIn={() => openDeviceCamera()}
                            style={[styles.imageModalListStyle]}
                        >
                            <Icon
                                name="camera"
                                type="evilicon"
                                color={colors.text}
                                size={40}
                            />
                            <Text style={[styles.overlayTextStyle, { color: colors.text }]}>
                                Open Camera
                            </Text>
                        </TouchableOpacity>
                        <Divider />
                        <TouchableOpacity
                            onPressIn={() => openDeviceGallery()}
                            style={[styles.imageModalListStyle]}
                        >
                            <Icon
                                name="image"
                                type="evilicon"
                                color={colors.text}
                                size={40}
                            />
                            <Text style={[styles.overlayTextStyle, { color: colors.text }]}>
                                Open Gallery
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Animatable.View>

            </Overlay>
            {loaded == false ? <LoaderScreen
                loaderIcon={<Icon
                    type="antdesign"
                    name="adduser"
                    color={colors.text}
                    size={responsiveFontSize(10)}
                />}
                animationType={'zoomIn'}
            />

                : <ScrollView showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps='always'
                    keyboardDismissMode={'on-drag'}
                >
                    <Animatable.View
                        animation="fadeIn"
                        useNativeDriver={true} style={[styles.containerStyle, { backgroundColor: colors.background }]}>
                        <View style={styles.formContainerStyle}>
                            <View style={styles.formHeadContainerStyle}>
                                <Avatar
                                    source={avatar}
                                    resizeMode='contain'
                                    renderPlaceholderContent={loadingplaceholder}
                                    size={150} rounded
                                    icon={{ name: 'user', type: 'antdesign', size: 60, color: 'white' }}
                                    onAccessoryPress={() => {
                                        openModal();
                                    }}
                                    accessory={{
                                        type: 'evilicon',
                                        name: 'camera',
                                        size: 50,
                                        color: 'white',
                                    }}
                                    showAccessory
                                    placeholderStyle={{ backgroundColor: colors.border }}
                                    containerStyle={{ backgroundColor: colors.border, borderWidth: 5, elevation: 5, borderColor: colors.card, }}
                                    overlayContainerStyle={styles.imageContainerStyle}
                                    titleStyle={{ fontSize: 20 }}
                                />
                            </View>
                            <View style={styles.bottomFormContainerStyle}>
                                <Input
                                    label="Name"
                                    labelStyle={[styles.labelStyle, { color: colors.text }]}
                                    maxLength={25}
                                    inputStyle={{ color: colors.text }}
                                    inputContainerStyle={[styles.inputContainerStyle,
                                    { borderColor: colors.border }]}
                                    selectionColor='#2196F3'
                                    containerStyle={styles.containerInputStyle}
                                    placeholder="eg: John Doe"
                                    leftIconContainerStyle={styles.leftIconContainerStyle}
                                    placeholderTextColor={placeholderColor}
                                    editable={false}
                                    value={name}
                                    leftIcon={{
                                        type: 'font-awesome',
                                        name: 'user-o',
                                        color: colors.iconcolor,
                                        size: 25
                                    }} />

                                <Input
                                    containerStyle={styles.containerInputStyle}
                                    inputStyle={{ color: colors.text }}
                                    label="Username"
                                    autoCorrect={false}
                                    maxLength={10}
                                    errorStyle={[styles.errorStyle]}
                                    selectionColor='#2196F3'
                                    errorMessage={errors.usernameerr}
                                    labelStyle={[styles.labelStyle, { color: colors.text }]}
                                    inputContainerStyle={[styles.inputContainerStyle,
                                    { borderColor: colors.border }]}
                                    placeholder="eg: ak"
                                    leftIconContainerStyle={styles.leftIconContainerStyle}
                                    placeholderTextColor={placeholderColor}
                                    value={username}
                                    onChangeText={(txt) => setUpdateUsername(txt)}
                                    leftIcon={{
                                        type: 'font-awesome',
                                        name: 'user-o',
                                        color: colors.iconcolor,
                                        size: 25
                                    }} />

                                <Input
                                    containerStyle={styles.containerInputStyle}
                                    inputStyle={[styles.inputStyle, { color: colors.text }]}
                                    label="Bio"
                                    maxLength={150}
                                    errorStyle={[styles.errorStyle]}
                                    selectionColor='#2196F3'
                                    labelStyle={[styles.labelStyle, { color: colors.text }]}
                                    errorMessage={errors.bioerr}
                                    inputContainerStyle={[styles.inputContainerStyle,
                                    { borderColor: colors.border }]}
                                    placeholder="Tell us something about you..."
                                    leftIconContainerStyle={styles.leftIconContainerStyle}
                                    placeholderTextColor={placeholderColor}
                                    value={bio}
                                    onChangeText={(txt) => setUpdateBio(txt)}
                                    multiline={true}
                                    leftIcon={{
                                        type: 'feather',
                                        name: 'edit-2',
                                        color: colors.iconcolor,
                                        size: 28
                                    }} />

                                <CustomPicker
                                    containerPickerStyle={styles.containerInputStyle}
                                    pickerContainerStyle={styles.inputContainerStyle}
                                    mode="dropdown"
                                    options={GenderData}
                                    selectedValue={gender}
                                    errorMessage={errors.gendererr}
                                    onValueChange={(itemValue, itemIndex) => {
                                        setUpdateGender(itemValue);
                                    }}
                                    enabled={genderenable}
                                    labelText="Gender"
                                    borderColor={colors.border}
                                    labelStyle={{ color: colors.text }}
                                    placeholderColor={placeholderColor}
                                    backgroundColor={colors.card}
                                    icon={{
                                        type: genderfont,
                                        name: gendericon,
                                        color: colors.iconcolor,
                                        size: 28
                                    }}
                                />

                                <CustomPicker
                                    containerPickerStyle={styles.containerInputStyle}
                                    pickerContainerStyle={styles.inputContainerStyle}
                                    errorMessage={errors.campuserr}
                                    selectedValue={campus}
                                    onValueChange={(itemValue, itemIndex) => {
                                        setUpdateCampus(itemValue);
                                    }}
                                    mode="dropdown"
                                    options={pickerData}
                                    labelText="Campus"
                                    borderColor={colors.border}
                                    labelStyle={{ color: colors.text }}
                                    placeholderColor={placeholderColor}
                                    backgroundColor={colors.card}
                                    icon={{
                                        type: 'antdesign',
                                        name: 'book',
                                        color: colors.iconcolor,
                                        size: 28
                                    }}
                                />
                                <Input
                                    containerStyle={styles.containerInputStyle}
                                    inputStyle={[styles.inputStyle, { color: colors.text }]}
                                    label="Campus (optional)"
                                    maxLength={50}
                                    errorStyle={[styles.errorStyle]}
                                    selectionColor='#2196F3'
                                    labelStyle={[styles.labelStyle, { color: colors.text }]}
                                    errorMessage={errors.campuserr}
                                    inputContainerStyle={[styles.inputContainerStyle,
                                    { borderColor: colors.border }]}
                                    placeholder="eg : oou oau"
                                    leftIconContainerStyle={styles.leftIconContainerStyle}
                                    placeholderTextColor={placeholderColor}
                                    value={campus}
                                    onChangeText={(txt) => setUpdateCampus(txt)}
                                    multiline={true}
                                    leftIcon={{
                                        type: 'antdesign',
                                        name: 'book',
                                        color: colors.iconcolor,
                                        size: 28
                                    }} />


                                {/*<Input
                                containerStyle={styles.containerInputStyle}
                                inputStyle={{ color: colors.text }}
                                label="phone"
                                maxLength={11}
                                selectionColor='#2196F3'
                                keyboardType="phone-pad"
                                labelStyle={[styles.labelStyle, { color: colors.text }]}
                                inputContainerStyle={[styles.inputContainerStyle,
                                { borderColor: colors.border, }]}
                                placeholder="eg: +234"
                                leftIconContainerStyle={styles.leftIconContainerStyle}
                                placeholderTextColor={placeholderColor}
                                leftIcon={{
                                    type: 'feather',
                                    name: 'phone',
                                    color: colors.text,
                                    size: 28
                                }} />*/}



                            </View>
                        </View>

                    </Animatable.View>
                </ScrollView>}
        </SafeAreaView>
    );
};

EditProfileScreen.options = {
    statusBar: {
        backgroundColor: colors.statusbar,
        style: colors.statusbartext
    },
    topBar: {
        visible: false,
    }
};
const mapStateToProps = (state) => ({
    user: state.user,
    editprofileinfo: state.appinfo.editprofileinformed,
    posts: state.posts,
    profile: state.profile,
    profileform: state.profileform,
});



const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: 'white',
    },
    formContainerStyle: {
        flex: 1,
    },
    formHeadContainerStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
    },
    bottomFormContainerStyle: {
        alignItems: 'center',
        padding: 5,
    },
    inputStyle: {
        //borderWidth: 1,
        //borderColor: 'red',
    },
    inputContainerStyle: {
        marginVertical: 8,
        width: inputwidth,
        borderBottomWidth: 1,
    },
    containerInputStyle: {
        width: containerinputwidth,
        alignItems: "center",

    },
    imageContainerStyle: {
        backgroundColor: colors.border
    },
    leftIconContainerStyle: {
        margin: 5,
        marginRight: 12,
        borderWidth: 0,
    },
    labelStyle: {
        alignSelf: "flex-start",
    },
    saveBtnContainerStyle: {
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 20,
        //borderWidth: 1,
    },
    saveBtnStyle: {
        color: '#2196F3',
        fontSize: 18,
        fontFamily: ""
    },
    overlayChildViewStyle: {
        justifyContent: "center",
        height: 80,
        width: 250,
        flexDirection: "row",
        alignItems: "center"
    },
    overlayImageChildViewStyle: {
        height: 100,
        width: 250,
    },
    overlayTextStyle: {
        fontSize: 17
    },
    imageModalListStyle: {
        //borderBottomWidth: 1,
        flex: 1,
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: "center",
    },
    errorStyle: {
        marginTop: 0,
        fontWeight: "bold",
        alignSelf: "flex-start"
    },
});

export default connect(mapStateToProps, actions)(EditProfileScreen);