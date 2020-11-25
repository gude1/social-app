import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, RefreshControl, ActivityIndicator, ScrollView, TouchableOpacity, View } from 'react-native';
import { Text, Avatar, Icon, Button, Image } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { LoaderScreen, Header, InputBox, PanelMsg, ModalList, ConfirmModal, ActivityOverlay, } from '../../components/reusable/ResuableWidgets';
import { responsiveFontSize, responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import { useTheme } from '../../assets/themes/index';
import TouchableScale from 'react-native-touchable-scale';
import { checkData, Toast } from '../../utilities/index';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { Navigation } from 'react-native-navigation';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { TouchablePreview } from 'react-native-navigation/lib/dist/adapters/TouchablePreview';
import { IndicatorViewPager, PagerTabIndicator, PagerTitleIndicator } from '@shankarmorwal/rn-viewpager';
import { ToastAndroid } from 'react-native';
import PostImageGallery from '../../components/reusable/PostImageGallery';
const { colors } = useTheme();

/**top section */
const TopSection = ({ profile, profileform, isprofileowner, profileActions }) => {
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
                    buttonStyle={[styles.buttonStyle, { borderColor: 'red' }]}
                />;
            else if (profile.profilemuted)
                btn = <Button
                    title="Muted"
                    //TouchableComponent={TouchableScale}
                    onPress={() => { }}
                    type="outline"
                    titleStyle={[styles.buttonTitleStyle, { color: 'red' }]}
                    buttonStyle={[styles.buttonStyle, { borderColor: 'red' }]}
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
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={profileform.refreshing}
                        onRefresh={() => {
                            profileActions.handleProfilePostsFetch(() => {
                                profileActions.setRefresh(true);
                            }, () => {
                                profileActions.setRefresh(false);
                            })
                        }}
                        colors={['#2196F3']}
                    />
                }
                //style={{ borderWidth: 2, borderColor: colors.text }}
                keyboardShouldPersistTaps='always'
                keyboardDismissMode={'on-drag'}
            >
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
                    {profile.followsu &&
                        <Button
                            title="Follows You"
                            TouchableComponent={TouchableScale}
                            disabled
                            type="outline"
                            titleStyle={styles.buttonTitleStyle}
                            buttonStyle={[styles.buttonStyle]}
                        />
                    }
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
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => Navigation.showModal({
                            component: {
                                name: 'FollowInfo',
                                passProps: {
                                    navparent: true,
                                    screenname: "Followers",
                                    runAction: () => profileActions.fetchProfileFollowers(profile.profile_id),
                                    loadMore: () => profileActions.fetchMoreProfileFollowers(profile.profile_id),
                                    screentype: 'modal'
                                },
                            }
                        })}
                    >
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
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => Navigation.showModal({
                            component: {
                                name: 'FollowInfo',
                                passProps: {
                                    navparent: true,
                                    screenname: "Following",
                                    runAction: () => profileActions.fetchProfilesFollowing(profile.profile_id),
                                    loadMore: () => profileActions.fetchMoreProfilesFollowing(profile.profile_id),
                                    screentype: 'modal'
                                },
                            }
                        })}
                    >
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
                    </TouchableOpacity>

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

                    {/*<View style={{ alignItems: "center" }}>
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
                </View>*/}
                </View>
                {
                    checkData(profile.known_followers_info) &&
                    <Text style={{ color: colors.iconcolor, textAlign: "center" }}
                        onPress={() => Navigation.showModal({
                            component: {
                                name: 'FollowInfo',
                                passProps: {
                                    navparent: true,
                                    screenname: "Followers you know",
                                    runAction: () => profileActions.fetchKnownProfileFollowers(profile.profile_id),
                                    loadMore: () => profileActions.fetchMoreKnownProfileFollowers(profile.profile_id),
                                    screentype: 'modal'
                                },
                            }
                        })}
                    >
                        {profile.known_followers_info}
                    </Text>
                }
            </ScrollView>
        </View>
    );
};

/**bottom  section */
const BottomSection = ({ viewprofileform, fetchPost, fetchMorePost, tabVerticalScroll }) => {
    const TABS = [
        {
            iconSource: 'pencil-square-o',
            iconType: 'font-awesome'
        },
        /*{
            iconSource: 'maximize',
            iconType: 'feather'
        }*/
    ];
    let data = [];
    for (var i = 0; i <= 10; i++) {
        data.push(String(i));
    }
    /**
     * component functions 
     */
    const renderTabIndicator = () => {
        if (!Array.isArray(TABS)) {
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
                tabs={TABS}
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
                        loadingmore={viewprofileform.viewpostloadingmore}
                        fetchPost={fetchPost}
                        fetchMorePost={fetchMorePost}
                    />
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
    fetchMoreProfilePosts,
    setUserViewProfileForm,
    addUserViewProfileFormPost,
    setUserViewProfileFormPost,
    setOthersViewProfileFormPost,
    prependUserViewProfileFormPost,
    updateUserViewProfileFormPost,
    setOthersViewProfileForm,
    addOthersViewProfileFormPost,
    prependOthersViewProfileFormPost,
    updateOthersViewProfileFormPost,
    setUserViewProfileFormLink,
    setOthersViewProfileFormLink,
    muteProfileAction,
    blockProfileAction,
    followProfileAction,
    fetchProfileFollowers,
    fetchProfilesFollowing,
    fetchMoreProfileFollowers,
    fetchMoreProfilesFollowing,
    fetchKnownProfileFollowers,
    fetchMoreKnownProfileFollowers,
    fetchAProfile,
}) => {
    const [loaded, setLoaded] = useState(false);
    const [hideparallax, setHideParallax] = useState(false);
    const [youblockedpass, setYouBlockedPass] = useState(false);
    const [listModalVisible, setListModalVisible] = useState(false);
    const [confrimModal, setConfirmModalProps] = useState({
        visible: false,
        msg: null,
        acceptAction: null,
    });
    const [activityModal, setActivityModal] = useState({
        visible: false,
        msg: null
    });
    let listModalOptions = [{
        title: 'Copy Profile Link'
    }, {
        title: 'Share Profile Link'
    }];
    let screenshown = false;
    let useowner = !checkData(reqprofile) ? true : reqprofile.profile_id == authprofile.profile_id;
    let viewprofileform = useowner ? userviewprofileform : othersviewprofileform;
    let toshowprofile = returnViewProfile();
    listModalOptions = [...listModalOptions, ...setListModalOptions()];
    let lefticon = navparent == true ? <Icon
        type="evilicon"
        name="arrow-left"
        color={colors.text}
        size={responsiveFontSize(6)}
    /> : null;
    let lefticonpress = navparent == true ?
        () => setDimissNav()
        : null;
    let righticonpress = hideparallax == true ? () => setHideParallax(false) : () => setListModalVisible(true);
    let righticon = hideparallax == true ?
        <Text
            style={{ color: colors.blue }}
        >Restore</Text> : <Icon
            type="entypo"
            name="dots-three-vertical"
            color={colors.text}
            size={responsiveFontSize(2.5)}
        />;

    /**
     * component function starts here
     */

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
        const listener = {
            componentDidAppear: () => {
                if (!screenshown) {
                    screenshown = true;
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
            if (!useowner) {
                setReset('othersviewprofileform');
            }
        };
    }, []);

    //handles fetching of profiles data 
    function handleFecthViewProfile() {
        if (!checkData(toshowprofile)) {
            setLoaded('failed');
            ToastAndroid.show('profile not found', ToastAndroid.LONG);
            return;
        }
        if (toshowprofile.profileblockedu == false) {
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
    function setViewProfile(profile) {
        if (!checkData(profile)) {
            return;
        }
        if (useowner)
            setProfileData({ ...profile, avatarremote: profile.avatar[1] });
        else
            setOthersViewProfileForm(profile);
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

    //function to add profile posts starts here
    function setProfilePost(data) {
        if (!checkData(data)) {
            return;
        }
        useowner ? setUserViewProfileFormPost(data) : setOthersViewProfileFormPost(data);
    }

    //function to setRefresh

    function setRefresh(data) {
        if (!checkData(data)) {
            return;
        }
        useowner ? setProcessing(data, 'userviewprofileformrefreshing') :
            setProcessing(data, 'othersviewprofileformrefreshing');
    }

    //function to followprofile starts here
    function followProfile() {
        let following = !viewprofileform.viewprofile.following;
        let actiontxt = 'processing';
        let num_followers = viewprofileform.viewprofile.num_followers;
        if (following)
            num_followers = num_followers + 1 < 1 ? 1 : num_followers + 1;
        else
            num_followers = num_followers - 1 < 0 ? 0 : num_followers - 1;
        followProfileAction(toshowprofile.profile_id,
            () => {
                //setProcessing(true, 'othersviewprofileformfollowing');
                setActivityModal({
                    ...activityModal,
                    visible: true,
                    msg: actiontxt
                });
            }, () => {
                setViewProfile({
                    ...viewprofileform.viewprofile,
                    following,
                    num_followers,
                });
                setActivityModal({
                    ...activityModal,
                    visible: false,
                    msg: null,
                });
                //setProcessing(false, 'othersviewprofileformfollowing');
            }, () => {
                setActivityModal({
                    ...activityModal,
                    visible: false,
                    msg: null,
                });
                //setProcessing(false, 'othersviewprofileformfollowingS');
            });
    }

    //function muteProfile
    function muteProfile() {
        let mutestatus = !viewprofileform.viewprofile.profilemuted;
        let mutemsg = 'processing';
        muteProfileAction(toshowprofile.profile_id,
            () => {
                setActivityModal({
                    ...activityModal,
                    visible: true,
                    msg: mutemsg
                });
                //setProcessing(true, 'othersviewprofileformmuting');
            }, () => {
                setViewProfile({
                    ...viewprofileform.viewprofile,
                    profilemuted: mutestatus,
                });
                setActivityModal({
                    ...activityModal,
                    visible: false,
                    msg: null
                });
                //setProcessing(false, 'othersviewprofileformmuting');
            }, () => {
                setActivityModal({
                    ...activityModal,
                    visible: false,
                    msg: null
                });
                //setProcessing(false, 'othersviewprofileformmuting');
            });
    }

    //function to handle profileblocking
    function blockProfile() {
        let blockstatus = !viewprofileform.viewprofile.ublockedprofile;
        let blockmsg = 'processing';
        blockProfileAction(toshowprofile.profile_id,
            () => {
                setActivityModal({
                    ...activityModal,
                    visible: true,
                    msg: blockmsg
                });
                //setProcessing(true, 'othersviewprofileformblocking');
            }, () => {
                setViewProfile({
                    ...viewprofileform.viewprofile,
                    ublockedprofile: blockstatus,
                });
                setActivityModal({
                    ...activityModal,
                    visible: false,
                    msg: null
                });
                //setProcessing(false, 'othersviewprofileformblocking');
            }, () => {
                setActivityModal({
                    ...activityModal,
                    visible: false,
                    msg: null
                });
                //setProcessing(false, 'othersviewprofileformblocking');
            })
    }

    //handles fetching of profiles post
    function handleProfilePostsFetch(start, end) {
        if (checkData(toshowprofile) && toshowprofile.profileblockedu == false) {
            checkData(start) && start();
            fetchProfilePosts(toshowprofile.profile_id, () => {
                useowner ? setProcessing(true, 'userviewprofileformpostloading')
                    : setProcessing(true, 'othersviewprofileformpostloading');
            }, (posts, profile, nexturl) => {
                //addProfilePost(posts);
                setProfilePost(posts);
                setViewProfile(profile);
                useowner ? setUserViewProfileFormLink(nexturl) : setOthersViewProfileFormLink(nexturl);
                useowner ? setProcessing(false, 'userviewprofileformpostloading')
                    : setProcessing(false, 'othersviewprofileformpostloading');
                checkData(end) && end();
            }, (action) => {
                if (action == "cancel") {
                    useowner ? setProcessing('failed', 'userviewprofileformpostloading') :
                        setProcessing('failed', 'othersviewprofileformpostloading');

                } else {
                    useowner ? setProcessing('retry', 'userviewprofileformpostloading') :
                        setProcessing('retry', 'othersviewprofileformpostloading');
                }
                checkData(end) && end();
            });
        }
    }

    //handles fetching of more profiles post
    function handleMoreProfilePostsFetch() {
        if (!checkData(viewprofileform.viewprofilepostsnexturl)) {
            useowner ? setProcessing('done', 'userviewprofileformpostloadingmore') :
                setProcessing('done', 'othersviewprofileformpostloadingmore');
            return;
        }
        fetchMoreProfilePosts(viewprofileform.viewprofilepostsnexturl, toshowprofile.profile_id, () => {
            useowner ? setProcessing(true, 'userviewprofileformpostloadingmore')
                : setProcessing(true, 'othersviewprofileformpostloadingmore');
        }, (posts, profile, nexturl) => {
            addProfilePost(post);
            setViewProfile(profile);
            useowner ? setUserViewProfileFormLink(nexturl) : setOthersViewProfileFormLink(nexturl);
            useowner ? setProcessing(false, 'userviewprofileformpostloadingmore') :
                setProcessing(false, 'othersviewprofileformpostloadingmore');
        }, (action) => {
            if (action == "cancel") {
                useowner ? setProcessing('failed', 'userviewprofileformpostloadingmore') :
                    setProcessing('failed', 'othersviewprofileformpostloadingmore');

            } else {
                useowner ? setProcessing('retry', 'userviewprofileformpostloadingmore') :
                    setProcessing('retry', 'othersviewprofileformpostloadingmore');
            }
        });

    }

    //function to determine dismiss of navigation based on screentype
    function setDimissNav() {
        if (screentype == "modal")
            return Navigation.dismissModal(componentId)
        else
            return Navigation.pop(componentId);
    }

    //function to setListModalOptions
    function setListModalOptions() {
        let list = [];
        //console.warn(toshowprofile);
        if (!checkData(toshowprofile) || useowner == true) {
            return list;
        }
        //check follow status 
        if (toshowprofile.following == true) {
            list.push({
                title: "Unfollow ",
                onPress: () => {
                    setConfirmModalProps({
                        ...confrimModal,
                        visible: true,
                        acceptAction: followProfile,
                        msg: "Unfollow Profile?"
                    });
                    setListModalVisible(false);
                }
            });
        } else {
            list.push({
                title: "Follow",
                onPress: () => {
                    setConfirmModalProps({
                        ...confrimModal,
                        visible: true,
                        acceptAction: followProfile,
                        msg: "Follow Profile?"
                    });
                    setListModalVisible(false);
                }
            });
        }

        //check mute status
        if (toshowprofile.profilemuted == true) {
            list.push({
                title: "Unmute",
                onPress: () => {
                    setConfirmModalProps({
                        ...confrimModal,
                        visible: true,
                        acceptAction: muteProfile,
                        msg: "Unmute Profile?"
                    });
                    setListModalVisible(false);
                }
            });
        } else {
            list.push({
                title: "Mute",
                onPress: () => {
                    setConfirmModalProps({
                        ...confrimModal,
                        visible: true,
                        acceptAction: muteProfile,
                        msg: "Mute Profile?"
                    });
                    setListModalVisible(false);
                }
            });
        }

        //check block status
        if (toshowprofile.ublockedprofile == true) {
            list.push({
                title: "Unblock",
                onPress: () => {
                    setConfirmModalProps({
                        ...confrimModal,
                        visible: true,
                        acceptAction: blockProfile,
                        msg: "Unblock Profile?"
                    });
                    setListModalVisible(false);
                }
            });
        } else {
            list.push({
                title: "Block",
                onPress: () => {
                    setConfirmModalProps({
                        ...confrimModal,
                        visible: true,
                        acceptAction: blockProfile,
                        msg: "Block Profile?"
                    });
                    setListModalVisible(false);
                }
            });
        }
        return list;
    }

    //handle hiding of topsection onces tabs flatlist scroll starts
    function onTabsVerticalScroll() {
        //if (!hideparallax) {
        setHideParallax(true);
        //}
    };

    //renders viewprofile view
    const renderView = () => {
        let torenderview = null;
        /**also check to confirm block status */
        if (checkData(toshowprofile)) {
            if (toshowprofile.profileblockedu == true) {
                torenderview = <View style={{ flex: 1, alignItems: 'center' }}>
                    <PanelMsg
                        message="Can't view profile, profile owner has blocked you "
                    />
                </View>;
                return torenderview;
            } else if (toshowprofile.ublockedprofile == true && youblockedpass == false) {
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
                return torenderview;
            }
        }
        /**check if loaded is true to determine return */
        if (loaded == true) {
            torenderview =
                <View style={[styles.contentContainerStyle, tabcalled && { marginBottom: 55 }]}>
                    {hideparallax ? null : <TopSection
                        profile={toshowprofile}
                        profileform={viewprofileform}
                        isprofileowner={useowner}
                        profileActions={{
                            followProfile,
                            muteProfile,
                            blockProfile,
                            handleProfilePostsFetch,
                            fetchProfileFollowers,
                            fetchProfilesFollowing,
                            fetchMoreProfileFollowers,
                            setRefresh,
                            fetchMoreProfilesFollowing,
                            fetchKnownProfileFollowers,
                            fetchMoreKnownProfileFollowers
                        }}
                    />}
                    <BottomSection
                        viewprofileform={viewprofileform}
                        fetchPost={handleProfilePostsFetch}
                        fetchMorePost={handleMoreProfilePostsFetch}
                        tabVerticalScroll={onTabsVerticalScroll}
                    />
                    <ModalList
                        isVisible={listModalVisible}
                        onBackdropPress={() => setListModalVisible(false)}
                        optionsArr={listModalOptions}
                    />
                    <ConfirmModal
                        isVisible={confrimModal.visible}
                        confirmMsg={confrimModal.msg}
                        acceptText="Yeah"
                        acceptAction={() => {
                            setConfirmModalProps({
                                ...confrimModal,
                                visible: false
                            });
                            confrimModal.acceptAction();
                        }}
                        rejectAction={() => setConfirmModalProps({
                            ...confrimModal,
                            visible: false
                        })}
                        rejectText="Nah"
                    />
                    <ActivityOverlay
                        text={activityModal.msg}
                        isVisible={activityModal.visible}
                    />
                </View>;
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
                </View>;
        }

        return torenderview;
    };
    /**compoent function ends here */

    return (
        <SafeAreaView style={styles.containerStyle}>
            <>
            <Header
                headercolor={colors.card}
                headertext={toshowprofile && toshowprofile.profile_name}
                headertextcolor={colors.text}
                headertextsize={responsiveFontSize(2.5)}
                headerStyle={{
                    elevation: 1.7,

                }}
                lefticon={lefticon}
                leftIconPress={lefticonpress}
                righticon={righticon}
                rightIconPress={righticonpress}
            />
            {toshowprofile && renderView()}
            </>
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
        margin: 0,
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