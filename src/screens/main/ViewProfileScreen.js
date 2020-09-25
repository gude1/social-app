import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ActivityIndicator, ScrollView, View, FlatList } from 'react-native';
import { Text, Avatar, Icon, Button, Image } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { LoaderScreen, Header, InputBox, PanelMsg, } from '../../components/reusable/ResuableWidgets';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { responsiveFontSize, responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import { useTheme } from '../../assets/themes/index';
import TouchableScale from 'react-native-touchable-scale';
import { checkData } from '../../utilities/index';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { Navigation } from 'react-native-navigation';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { TouchablePreview } from 'react-native-navigation/lib/dist/adapters/TouchablePreview';
import { IndicatorViewPager, PagerTabIndicator, PagerTitleIndicator } from '@shankarmorwal/rn-viewpager';
import { ToastAndroid } from 'react-native';
import PostImageGallery from '../../components/reusable/PostImageGallery';

const { colors } = useTheme();
/**top section */
const TopSection = ({ profile, isprofileowner, profileActions }) => {
    let avatar = isprofileowner ? { uri: profile.avatarlocal } : { uri: profile.avatar[1] }
    const showButton = () => {
        let btn = null;
        if (isprofileowner) {
            btn = <Button
                title="EditProfile"
                TouchableComponent={TouchableScale}
                onPress={() => Navigation.showModal({
                    component: {
                        name: "EditProfile",
                        passProps: {
                            navparent: true,
                            screentype: "modal"
                        }
                    }
                })}
                type="outline"
                titleStyle={styles.buttonTitleStyle}
                buttonStyle={styles.buttonStyle}
            />
        } else {
            if (profile.ublockedprofile)
                btn = <Button
                    title="Blocked"
                    //TouchableComponent={TouchableScale}
                    onPress={() => { }}
                    type="outline"
                    titleStyle={[styles.buttonTitleStyle, { color: 'red' }]}
                    buttonStyle={[styles.buttonStyle, { color: 'red' }]}
                />;
            else if (profile.profilemuted)
                btn = <Button
                    title="Muted"
                    //TouchableComponent={TouchableScale}
                    onPress={() => { }}
                    type="outline"
                    titleStyle={[styles.buttonTitleStyle, { color: 'red' }]}
                    buttonStyle={[styles.buttonStyle, { color: 'red' }]}
                />;
            else if (profile.following == true)
                btn = <Button
                    title="Following"
                    //TouchableComponent={TouchableScale}
                    type="outline"
                    titleStyle={styles.buttonTitleStyle}
                    buttonStyle={styles.buttonStyle}
                />
        }
        return btn;
    }
    return (
        <View style={styles.topSection}>
            <View style={styles.avatarIconCtn}>
                {isprofileowner != true ? <Icon
                    type="evilicon"
                    name="comment"
                    color={colors.text}
                    size={responsiveFontSize(4.5)}
                /> : <Icon
                        type="antdesign"
                        name="smileo"
                        color={colors.text}
                        size={responsiveFontSize(4)}
                    />}
                <Avatar
                    source={avatar}
                    resizeMode='contain'
                    size={80}
                    rounded
                    icon={{ name: 'user', type: 'antdesign', size: 40, color: 'white' }}
                    onAccessoryPress={() => {
                    }}
                    accessory={{
                        type: 'evilicon',
                        name: 'camera',
                        size: 50,
                        color: 'white',
                    }}
                    //showAccessory
                    placeholderStyle={{ backgroundColor: colors.border }}
                    containerStyle={{ backgroundColor: colors.border, elevation: 2, borderWidth: 1, borderColor: colors.card, }}
                    overlayContainerStyle={styles.avatarContainerStyle}
                    titleStyle={{ fontSize: 20 }}
                />
                {isprofileowner == true ? <Icon
                    type="antdesign"
                    onPress={() => Navigation.showModal({
                        component: {
                            name: "EditProfile",
                            passProps: {
                                navparent: true,
                                screentype: "modal"
                            }
                        }
                    })}
                    name="adduser"
                    color={colors.text}
                    size={responsiveFontSize(4)}
                /> : <Icon
                        type="antdesign"
                        name="smileo"
                        color={colors.text}
                        size={responsiveFontSize(4)}
                    />}
            </View>
            <View style={styles.profileInfoCtn}>
                <Text style={styles.profileInfoItemText}>{profile.user.username}</Text>
                <Text style={styles.profileInfoItemText}>{profile.bio}</Text>
                {showButton()}
            </View>

            <View style={styles.modalCard}>
                <View style={{ alignItems: "center" }}>
                    <Icon
                        type="antdesign"
                        name="book"
                        color={colors.text}
                        size={responsiveFontSize(4)}
                    />
                    <Text style={{
                        color: colors.iconcolor,
                        fontWeight: "bold",
                        fontSize: responsiveFontSize(1.2),
                    }}>{profile.campus}</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                    <Icon
                        type="font-awesome"
                        name={profile.user.gender}
                        color={colors.text}
                        size={responsiveFontSize(4)}
                    />
                    <Text style={{
                        color: colors.iconcolor,
                        fontWeight: "bold",
                        fontSize: responsiveFontSize(1.2),
                    }}>{profile.user.gender}</Text>
                </View>

            </View>
            <View style={styles.profileActivityCtn}>
                <View style={{ alignItems: "center" }}>
                    <Text style={{
                        color: colors.text,
                        fontWeight: "bold",
                        fontSize: responsiveFontSize(2.3),
                    }}>{profile.num_followers}</Text>
                    <Text style={{
                        color: colors.iconcolor,
                        fontWeight: "bold",
                        fontSize: responsiveFontSize(1),
                    }}>Followers</Text>
                </View>

                <View style={{ alignItems: "center" }}>
                    <Text style={{
                        color: colors.text,
                        fontWeight: "bold",
                        fontSize: responsiveFontSize(2.3),
                    }}>{profile.num_following}</Text>
                    <Text style={{
                        color: colors.iconcolor,
                        fontWeight: "bold",
                        fontSize: responsiveFontSize(1),
                    }}>Following</Text>
                </View>

                <View style={{ alignItems: "center" }}>
                    <Text style={{
                        color: colors.text,
                        fontWeight: "bold",
                        fontSize: responsiveFontSize(2.3),
                    }}>{profile.num_posts}</Text>
                    <Text style={{
                        color: colors.iconcolor,
                        fontWeight: "bold",
                        fontSize: responsiveFontSize(1),
                    }}>Posts</Text>
                </View>

                <View style={{ alignItems: "center" }}>
                    <Text style={{
                        color: colors.text,
                        fontWeight: "bold",
                        fontSize: responsiveFontSize(2.3),
                    }}>{profile.num_gists}</Text>
                    <Text style={{
                        color: colors.iconcolor,
                        fontWeight: "bold",
                        fontSize: responsiveFontSize(1),
                    }}>Gists</Text>
                </View>
            </View>
        </View>
    );
};

/**bottom  section */
const BottomSection = ({ viewprofileform, fetchPost, tabs, tabVerticalScroll }) => {
    let data = [];
    for (var i = 0; i <= 10; i++) {
        data.push(String(i));
    }
    /**
     * component functions 
     */
    const renderTabIndicator = () => {
        if (!Array.isArray(tabs)) {
            return null;
        }
        return (
            <PagerTabIndicator
                iconStyle={{ fontSize: 30, color: '#808080' }}
                selectedIconStyle={{ fontSize: 32, color: colors.text }}
                selectedTextStyle={{ color: colors.text }}
                style={{
                    borderColor: colors.border,
                    backgroundColor: colors.background,
                    borderBottomWidth: 0.25
                }}
                itemStyle={{
                    paddingVertical: 10
                }}
                selectedItemStyle={{
                    paddingVertical: 10,
                    //borderBottomWidth: 1,
                    borderColor: colors.text,
                }}
                tabs={tabs}
            />
        );
    };
    /*** component functions ends here*/
    return (
        <View style={styles.bottomSection}>
            <IndicatorViewPager
                indicatorposition={'top'}
                style={{ flex: 1 }}
                indicator={renderTabIndicator()}
            >
                <View key={1}>
                    <PostImageGallery
                        data={viewprofileform.viewprofileposts}
                        onScrollBeginDrag={() => tabVerticalScroll()}
                        loading={viewprofileform.viewpostloading}
                        fetchPost={fetchPost}
                    />
                </View>
                <View key={2}>
                    <Text style={{ color: colors.text, alignSelf: 'center' }}>Screen Two</Text>
                </View>
            </IndicatorViewPager>
        </View>
    );
};


const ViewProfileScreen = ({
    componentId,
    state,
    authprofile,
    navparent,
    reqprofile,
    screentype,
    setReset,
    setProcessing,
    setProfileData,
    userviewprofileform,
    othersviewprofileform,
    tabcalled,
    fetchProfilePosts,
    setUserViewProfileForm,
    addUserViewProfileFormPost,
    prependUserViewProfileFormPost,
    updateUserViewProfileFormPost,
    setOthersViewProfileForm,
    addOthersViewProfileFormPost,
    prependOthersViewProfileFormPost,
    updateOthersViewProfileFormPost,
    muteProfileAction,
    blockProfileAction,
    followProfileAction,
    fetchAProfile,
}) => {
    const [loaded, setLoaded] = useState(false);
    const [hideparallax, setHideParallax] = useState(false);
    const [youblockedpass, setYouBlockedPass] = useState(false);
    const TABS = [
        {
            iconSource: 'pencil-square-o',
            iconType: 'font-awesome'
        },
        {
            iconSource: 'maximize',
            iconType: 'feather'
        }
    ];
    let screenshown = false;
    let useowner = !checkData(reqprofile) ? true : reqprofile.profile_id == authprofile.profile_id;
    let viewprofileform = useowner ? userviewprofileform : othersviewprofileform;
    let toshowprofile = returnViewProfile();
    //toshowprofile.ublockedprofile = true;
    let lefticon = navparent == true ? <Icon
        type="evilicon"
        name="arrow-left"
        color={colors.text}
        size={responsiveFontSize(6)}
    /> : null;

    let lefticonpress = navparent == true ?
        setDimissNav()
        : null;
    let righticonpress = hideparallax == true ? () => setHideParallax(false) : () => { };
    let righticon = hideparallax == true ?
        <Text
            onPress={righticonpress}
            style={{ color: colors.blue }}
        >Restore</Text> : <Icon
            type="entypo"
            onPress={righticonpress}
            name="dots-three-vertical"
            color={colors.text}
            size={responsiveFontSize(2.5)}
        />;

    /**component function goes here */
    Navigation.mergeOptions('VIEW_PROFILE_SCREEN', {
        bottomTabs: {
            //visible: false
        },
    });

    useEffect(() => {
        EntypoIcon.getImageSource('user', 100).then(e =>
            Navigation.mergeOptions('VIEW_PROFILE_SCREEN', {
                bottomTab: {
                    icon: e,
                }
            }));
        if (useowner) {
            setReset('userviewprofileform');
        } else {
            setReset('othersviewprofileform');
        }

        const listener = {
            componentDidAppear: () => {
                if (!screenshown) {
                    screenshown = true;
                    setLoaded(true);
                    handleFecthViewProfile();
                }

            },
            componentDidDisappear: () => {
                //setHideParallax(false);
            }
        };
        // Register the listener to all events related to our component
        const unsubscribe = Navigation.events().bindComponent(listener, componentId);

        return () => {
            // Make sure to unregister the listener during cleanup
            unsubscribe.remove();
            if (useowner) {
                setReset('userviewprofileform');
            } else {
                setReset('othersviewprofileform');
            }
        };
    }, []);

    //handles fetching of profiles data 
    function handleFecthViewProfile() {
        if (!checkData(toshowprofile)) {
            setLoaded('failed');
            ToastAndroid.show('profile not found', ToastAndroid.LONG);
        }
        if (!toshowprofile.profileblockedu) {
            setLoaded('pending');
            fetchAProfile(toshowprofile.profile_id, null, (profile) => {
                if (useowner) {
                    setProfileData({ ...profile, avatarremote: profile.avatar[1] })
                } else {
                    setViewProfile(profile);
                }
                setLoaded(true);
            }, (action) => {
                action == "cancel" ? setLoaded('failed') : setLoaded(true);
            });
        }
    }

    //funnction to set view profile
    function setViewProfile(data) {
        if (!checkData(data)) {
            return;
        }
        //console.warn(useowner)
        useowner == false && setOthersViewProfileForm(data);
    }
    //returns the profile to show
    function returnViewProfile() {
        if (useowner) {
            return authprofile;
        } else if (!checkData(reqprofile) || !checkData(reqprofile.user)) {
            return null;
        } else {
            if (checkData(viewprofileform.viewprofile) && viewprofileform.viewprofile.profile_id == reqprofile.profile_id)
                return viewprofileform.viewprofile;
            else
                return reqprofile;
        }

    };

    //function to add profile posts starts here
    function addProfilePost(data) {
        if (!checkData(data)) {
            return;
        }
        useowner ? addUserViewProfileFormPost(data) : addOthersViewProfileFormPost(data);
    }


    //function to followprofile starts here
    function followProfile() {
        let following = !viewprofileform.viewprofile.following;
        let num_followers = viewprofileform.viewprofile.num_followers;
        if (following)
            num_followers = num_followers + 1 < 1 ? 1 : num_followers + 1;
        else
            num_followers = num_followers - 1 < 0 ? 0 : num_followers - 1;


        followProfileAction(toshowprofile.profile_id,
            () => {
                setProcessing(true, 'othersviewprofileformfollowing');
            }, () => {
                setViewProfile({
                    ...viewprofileform.viewprofile,
                    following,
                    num_followers,
                });
                setProcessing(false, 'othersviewprofileformfollowing');
            }, () => {
                setProcessing(false, 'othersviewprofileformfollowingS');
            });
    }

    //function muteProfile
    function muteProfile() {
        muteProfileAction(toshowprofile.profile_id,
            () => {
                setProcessing(true, 'othersviewprofileformmuting');
            }, () => {
                setViewProfile({
                    ...viewprofileform.viewprofile,
                    profilemuted: !viewprofileform.viewprofile.profilemuted,
                });
                setProcessing(false, 'othersviewprofileformmuting');
            }, () => {
                setProcessing(false, 'othersviewprofileformmuting');
            });
    }

    //function to handle profileblocking
    function blockProfile() {
        blockProfileAction(toshowprofile.profile_id,
            () => {
                setProcessing(true, 'othersviewprofileformblocking');
            }, (blockedprofile) => {
                setViewProfile({
                    ...viewprofileform.viewprofile,
                    ublockedprofile: !viewprofileform.viewprofile.ublockedprofile,
                });
                setProcessing(false, 'othersviewprofileformblocking');
            }, () => {
                setProcessing(false, 'othersviewprofileformblocking');
            })
    }


    //handles fetching of profiles post
    function handleProfilePostsFetch() {
        if (checkData(toshowprofile) && toshowprofile.profileblockedu == false) {
            fetchProfilePosts(toshowprofile.profile_id, () => {
                useowner ? setProcessing(true, 'userviewprofileformpostloading')
                    : setProcessing(true, 'othersviewprofileformpostloading');
            }, (post, profile, nexturl) => {
                addProfilePost(post);
                setViewProfile(profile);
                useowner ? setProcessing(nexturl, 'userviewprofileformpostnexturl') :
                    setProcessing(nexturl, 'othersviewprofileformpostnexturl');
                useowner ? setProcessing(false, 'userviewprofileformpostloading')
                    : setProcessing(false, 'othersviewprofileformpostloading');
            }, (action) => {
                if (action == "cancel") {
                    useowner ? setProcessing('failed', 'userviewprofileformpostloading') :
                        setProcessing('failed', 'othersviewprofileformpostloading');

                } else {
                    useowner ? setProcessing('retry', 'userviewprofileformpostloading') :
                        setProcessing('retry', 'othersviewprofileformpostloading');
                }
            });
        }
    }

    //function to determine dismiss of navigation based on screentype
    function setDimissNav() {
        if (screentype == "modal")
            return () => Navigation.dismissModal(componentId)
        else
            return () => Navigation.pop(componentId);
    }

    //handle hiding of topsection onces tabs flatlist scroll starts
    const onTabsVerticalScroll = () => {
        if (!hideparallax) {
            setHideParallax(true);
        }
    };

    //renders viewprofile view
    const renderView = () => {
        let torenderview = null;
        /**check if loaded is true to determine return */
        if (loaded == true) {
            torenderview =
                <>
                <View style={[styles.contentContainerStyle, tabcalled && { marginBottom: 55 }]}>
                    {hideparallax ? null : <TopSection
                        profile={toshowprofile}
                        isprofileowner={useowner}
                        profileActions={{ followProfile, muteProfile, blockedprofile }}
                    />}
                    <BottomSection
                        tabs={TABS}
                        viewprofileform={viewprofileform}
                        fetchPost={handleProfilePostsFetch}
                        tabVerticalScroll={onTabsVerticalScroll}
                    />
                </View>
                </>;
        } else if (loaded == 'retry') {
            torenderview = <View
                style={{ alignItems: "center", height: 200, justifyContent: 'center' }}>
                <Icon
                    onPress={handleFecthViewProfile}
                    color={colors.text}
                    size={responsiveFontSize(4)}
                    name="sync"
                    type="antdesign"
                />
                <Text style={{ color: colors.text }}>Tap to retry </Text>
            </View>;
        } else if (loaded == false || loaded == 'pending') {
            torenderview = <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color={'silver'} />
            </View>;
        } else {
            torenderview =
                <View style={{ flex: 1, alignItems: "center" }}>
                    <PanelMsg
                        message="Profile not found or cannot be shown"
                    />
                </View>
                ;
        }
        /**also check to confirm block status */
        if (checkData(toshowprofile)) {
            if (toshowprofile.profileblockedu == true)
                torenderview = <View style={{ flex: 1, alignItems: 'center' }}>
                    <PanelMsg
                        message="Can't view profile, profile owner has blocked you "
                    />
                </View>;
            else if (toshowprofile.ublockedprofile == true && youblockedpass == false)
                torenderview = <View style={{ flex: 1, alignItems: 'center' }}>
                    <PanelMsg
                        message="Profile is blocked by you "
                        buttonTitle={'View Profile'}
                        buttonPress={() => {
                            if (!youblockedpass)
                                setYouBlockedPass(true);
                        }}
                    />
                </View>;

        }


        return torenderview;
    };
    /**compoent function ends here */

    return (
        <SafeAreaView style={styles.containerStyle}>
            <Header
                headercolor={colors.card}
                headertext={toshowprofile.user.username}
                headertextcolor={colors.text}
                headertextsize={responsiveFontSize(2.5)}
                headerStyle={{
                    elevation: 1.7,

                }}
                lefticon={lefticon}
                leftIconPress={lefticonpress}
                righticon={righticon}
                righticonpress={righticonpress}
            />
            {renderView()}
        </SafeAreaView >
    );
};

const mapStateToProps = (state) => ({
    authprofile: { ...state.profile, user: state.user },
    userviewprofileform: state.userviewprofileform,
    othersviewprofileform: state.othersviewprofileform,
});

ViewProfileScreen.options = {
    topBar: {
        visible: false
    },
    bottomTabs: {
        visible: true
    },
    bottomTab: {
        text: 'Profile',
    }

};


const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: colors.background,
    },
    contentContainerStyle: {
        flex: 1,
        margin: 0,
        backgroundColor: colors.background,
    },
    topSection: {
        marginTop: 0,
        paddingBottom: 4,
        borderColor: colors.border
    },
    buttonStyle: {
        width: 80,
        padding: 3,
        borderColor: "dimgray",
        borderRadius: 20,
        marginVertical: 5,
        alignSelf: "center"
    },
    buttonTitleStyle: {
        fontSize: responsiveFontSize(1.8),
        color: "dimgray"
    },
    avatarIconCtn: {
        //borderWidth: 1,
        marginBottom: 2,
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: "space-evenly",
        alignItems: 'center'
    },
    avatarContainerStyle: {
        backgroundColor: colors.border
    },
    profileInfoCtn: {
        //borderWidth: 1,
        alignItems: "center",
        justifyContent: 'center'
    },
    profileInfoItem: {
        //borderWidth: 1,
        width: 100,
        alignItems: "center",
        flexDirection: "row",
        margin: 3,
        //justifyContent: "space-between"
    },
    profileInfoItemText: {
        textAlign: "center",
        width: 200,
        marginVertical: 2,
        marginHorizontal: 3,
        fontWeight: "bold",
        //borderWidth: 1,
        borderColor: colors.border,
        color: colors.text
    },
    modalCard: {
        borderRadius: 20,
        margin: 5,
        alignSelf: "center",
        width: 200,
        padding: 10,
        backgroundColor: colors.background,
        elevation: 2,
        justifyContent: "space-around",
        flexDirection: "row",
        alignItems: "center",
    },
    bottomSection: {
        flex: 1,
    },
    profileActivityCtn: {
        //borderRadius: 20,
        margin: 5,
        padding: 10,
        backgroundColor: colors.background,
        //elevation: 3,
        justifyContent: "space-around",
        flexDirection: "row",
        alignItems: "center",
    }
});

export default connect(mapStateToProps, actions)(ViewProfileScreen);