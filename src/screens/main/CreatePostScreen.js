import React, { useState, useEffect, } from 'react';
import {
    Text,
    Button,
    Avatar,
    Image,
    Input,
    Icon,
    Tooltip,
    Overlay,
} from 'react-native-elements';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { useTheme } from '../../assets/themes';
import { checkData, getAppInfo } from '../../utilities';
import { Header, OverlayWithImage, ImageViewPager, LoaderScreen } from '../../components/reusable/ResuableWidgets';
import {
    StyleSheet, SafeAreaView, View, StatusBar, TouchableOpacity,
    ScrollView, ActivityIndicator, ToastAndroid,
    KeyboardAvoidingView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import ViewPager from '@react-native-community/viewpager';
import ToolTip from 'react-native-tooltip';
import { Navigation } from 'react-native-navigation';

const { colors } = useTheme();
let inputwidth = responsiveWidth(85);
let containerinputwidth = responsiveWidth(90);
inputwidth = inputwidth > 450 ? 450 : inputwidth;
containerinputwidth = containerinputwidth > 550 ? 550 : containerinputwidth;

const CreatePostScreen = ({ navparent, componentId, username, setAppInfo, posts, postform, makePost, postinfo, setUpdatedPostFormText, setUpdatedPostFormImage, profileimage }) => {
    const placeholderColor = '#606060';
    const [anonymous, setAnonymous] = useState(true);
    const [modalstate, setModalState] = useState({
        screeninfomodal: false,
    });
    const [loaded, setLoaded] = useState(false);
    const ref = React.createRef('toast');
    const anonymousicon = anonymous == true ? 'eye' : 'eye-off';
    let resheight = responsiveHeight(80) >= 450 ? 450 : responsiveHeight(80);
    let reswidth = responsiveWidth(80) >= 450 ? 450 : responsiveWidth(80);
    let fontsize = responsiveFontSize(2);
    let { toposttext, topostimages, isprocessing } = postform;
    let toposttextlength = toposttext.length.toString();
    let lefticon = navparent == true ? <Icon
        type="evilicon"
        name="arrow-left"
        color={colors.text}
        size={responsiveFontSize(6)}
    /> : null;
    let lefticonpress = navparent == true ? () => Navigation.pop(componentId) : null;
    let righticon = '';
    let righticonpress = '';
    let postimagecontainer = '';
    let avatarprofile = (profileimage == "" || profileimage == null) ? null : { uri: profileimage };
    /**
     * functions
     */
    useEffect(() => {
        const listener = {
            componentDidAppear: () => {
                //to show toast modal if profile is not here completed and pageinfo modal has already being shown
                if (postinfo == true && getAppInfo(posts, 'post') == 'postfalse') {
                    ToastAndroid.show('You need to have a post to continue into the app',
                        ToastAndroid.LONG);
                }
                if (!loaded) {
                    setLoaded(true);
                    return;
                }
            },
            componentDidDisappear: () => {
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
    })

    const checkAnonymous = () => {
        anonymous == true ? setAnonymous(false) : setAnonymous(true);
    };
    const createPost = () => {

    };

    const setPostImages = (imagearr) => {
        if (checkData(imagearr) == false || imagearr.length < 1) {
            return;
        }
        setUpdatedPostFormImage(imagearr);
        Navigation.dismissAllModals();
    }
    /**
     * functions
     */


    /**
     * CONDITIONAL STATEMENTS STARTS HERE
     */

    //conditional statement to assign values to righticon and righticonpress
    if (topostimages.length < 1) {
        righticon = <Text
            style={{
                fontSize: responsiveFontSize(2.8),
                opacity: 0.1,
                color: "#2196F3"
            }}
        >Post</Text>;
        righticonpress = () => { ToastAndroid.show('Post must have an image :)', ToastAndroid.SHORT) };
    } else {
        righticon = <Text
            style={{
                fontSize: responsiveFontSize(2.8),
                color: "#2196F3"
            }}
        >Post</Text>;
        righticonpress = () => {
            makePost(topostimages, toposttext);
        }
    }


    if (checkData(postinfo) == false || postinfo == false) {
        setTimeout(() => {
            setModalState({ ...modalstate, screeninfomodal: true });
            setAppInfo({ postinformed: true });
        }, 1000);
    }

    //conditional function to determine whether to display postimages or pick image iconbutton starts
    if (checkData(topostimages) == false || topostimages.length < 1) {
        postimagecontainer =
            <Avatar
                size={reswidth}
                icon={{ name: 'camera', type: 'evilicon', size: 80, color: placeholderColor }}
                overlayContainerStyle={[{
                    borderWidth: 1,
                    borderColor: placeholderColor,
                    borderRadius: 10,
                }, { backgroundColor: colors.background }]}
                placeholderStyle={{ borderRadius: 10, backgroundColor: colors.background }}
                onPress={() => Navigation.showModal({
                    component: {
                        name: 'PhotoList',
                        passProps: {
                            navparent: true,
                            onSubmit: setPostImages
                        }
                    }
                })}
                imageProps={{ borderRadius: 10 }}
            />
    } else {
        postimagecontainer = <View style={{ width: reswidth }}>
            <ImageViewPager
                colors={colors}
                images={topostimages}
                reswidth={reswidth}
            />
            <TouchableOpacity
                style={{ alignSelf: "center", margin: 3 }}
                onPressIn={() => setUpdatedPostFormImage([])}
            >
                <Icon
                    type="feather"
                    name="trash-2"
                    iconStyle={{ color: colors.text, fontWeight: "bold" }}
                    size={responsiveFontSize(4.5)}
                />
            </TouchableOpacity>
        </View>
            ;
    }
    //conditional function to determine whether to display postimages or pick image iconbutton ends
    /**
     * CONDITIONAL STATEMENTS ENDS HERE
     */
    return (
        <SafeAreaView style={[styles.containerStyle, { backgroundColor: colors.background }]}>
            <Header
                headercolor={colors.card}
                headertext="CreatePost"
                headertextcolor={colors.text}
                headertextsize={responsiveFontSize(2.9)}
                lefticon={lefticon}
                righticon={righticon}
                leftIconPress={lefticonpress}
                rightIconPress={righticonpress}
            />
            <OverlayWithImage
                isVisible={modalstate.screeninfomodal}
                theme={colors}
                onAccept={() => setModalState({ ...modalstate, screeninfomodal: false })}
                overlaystyle={{ opacity: 0.9 }}
                imagesize={130}
                imagesource={require('../../assets/emojiimages/clap.jpeg')}
                overlaytext={`Almost there ${username}!, post something nice about yourself `}

            />
            <Overlay
                isVisible={isprocessing}
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
                            Uploading Post
                    </Text>
                    </View>
                </Animatable.View>
            </Overlay>

            {loaded == false ? <LoaderScreen
                loaderIcon={null}
                animationType={'zoomIn'}
            /> :
                <ScrollView showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps='always'
                    keyboardDismissMode={'on-drag'}
                >
                    <Animatable.View
                        animation="fadeIn"
                        useNativeDriver={true}
                        style={[styles.containerStyle, { backgroundColor: colors.backgroundColor }]}>
                        <View style={[styles.topContainerStyle, {}]}>
                            <Avatar
                                rounded
                                source={avatarprofile}
                                onPress={() => Navigation.push(componentId, {
                                    component: {
                                        name: "EditProfile",
                                        passProps: {
                                            navparent: true
                                        },
                                        options: {
                                            animations: {
                                                push: {
                                                    waitForRender: true,
                                                }
                                            }
                                        }
                                    }
                                })}
                                resizeMode='contain'
                                placeholderStyle={styles.imageContainerStyle}
                                containerStyle={styles.imageContainerStyle}
                                overlayContainerStyle={styles.imageContainerStyle}
                                icon={{ name: 'user', type: 'antdesign', color: 'white' }}
                                size="medium"
                            />
                            <Input
                                selectionColor='#2196F3'
                                containerStyle={styles.containerInputStyle}
                                placeholderTextColor={placeholderColor}
                                placeholder="Add a Caption"
                                inputStyle={{ color: colors.text }}
                                maxLength={100}
                                disableFullscreenUI={true}
                                onChangeText={(text) => setUpdatedPostFormText(text)}
                                value={toposttext}
                                label={`${toposttextlength}/100`}
                                labelStyle={[styles.labelStyle, { color: placeholderColor }]}
                                inputContainerStyle={{ borderBottomWidth: 0 }}
                                multiline={true}
                                rightIcon={{
                                    name: 'closecircleo',
                                    type: "antdesign",
                                    size: 30,
                                    color: colors.text,
                                    onPress: () => setUpdatedPostFormText('')
                                }}
                            />
                        </View>
                        <View style={[styles.middleContainerStyle]} >
                            {postimagecontainer}
                        </View>
                    </Animatable.View>
                </ScrollView>}

        </SafeAreaView >
    );
};

CreatePostScreen.options = {
    statusBar: {
        backgroundColor: colors.statusbar,
        style: colors.statusbartext
    },
    topBar: {
        visible: false,
    },
};

const mapStateToProps = (state) => ({
    posts: state.posts,
    username: state.user.username,
    postinfo: state.appinfo.postinformed,
    profileimage: state.profile.avatarlocal || state.profile.avatarremote,
    //profileimage: checkData(state.profile.avatarlocal) != true ? state.profile.avatarremote : state.profile.avatarlocal,
    postform: state.postform
});


const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: 'white'
    },
    overlayContainerStyle: {

    },
    topContainerStyle: {
        flexDirection: "row",
        //borderWidth: 3,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 20,
    },
    bottomContainerStyle: {
        //borderWidth: 1,
        flexDirection: "row",
    },
    middleContainerStyle: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 40,
        //borderWidth: 1,
    },
    imageContainerStyle: {
        backgroundColor: colors.border,
        //borderColor: colors.border
    },
    labelStyle: {
        marginTop: 5,
        alignSelf: "flex-end",
        fontWeight: "normal",
        color: "black"
    },
    overlayTextStyle: {
        fontSize: 18
    },
    containerInputStyle: {
        flex: 1,
        maxWidth: containerinputwidth,
        //borderWidth: 1,
        alignItems: "center"
    },
    overlayChildViewStyle: {
        justifyContent: "center",
        height: 80,
        width: 250,
        flexDirection: "row",
        alignItems: "center"
    },
});


export default connect(mapStateToProps, actions)(CreatePostScreen);
