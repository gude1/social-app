import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ActivityIndicator, ScrollView, View, FlatList } from 'react-native';
import { Text, Avatar, Icon, Button, Image } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { LoaderScreen, Header, InputBox, } from '../../components/reusable/ResuableWidgets';
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


const { colors } = useTheme();

const TopSection = ({ profile }) => {
    return (
        <View style={styles.topSection}>
            <View style={styles.avatarIconCtn}>
                <Icon
                    type="evilicon"
                    name="comment"
                    color={colors.text}
                    disabledStyle={{
                        backgroundColor: colors.background
                    }}
                    size={responsiveFontSize(4.5)}
                />
                <Avatar
                    source={{ uri: profile.avatarlocal }}
                    //source={null}
                    resizeMode='contain'
                    size={80} rounded
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
                <Icon
                    type="antdesign"
                    name="adduser"
                    color={colors.text}
                    size={responsiveFontSize(4)}
                />
            </View>
            <View style={styles.profileInfoCtn}>
                <Text style={styles.profileInfoItemText}>{profile.user.username}</Text>
                <Text style={styles.profileInfoItemText}>{profile.bio}</Text>
                <Button
                    title="Follow"
                    TouchableComponent={TouchableScale}
                    onPress={() => console.warn('dd')}
                    type="outline"
                    titleStyle={{ fontSize: responsiveFontSize(1.8) }}
                    buttonStyle={{
                        width: 80,
                        padding: 3,
                        borderRadius: 20,
                        marginVertical: 5,
                        alignSelf: "center"
                    }}
                />
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
                    }}>1</Text>
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
                    }}>10</Text>
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
                    }}>7.k8</Text>
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
                    }}>100</Text>
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

const BottomSection = ({ profileposts, profilegists, tabs, tabVerticalScroll }) => {
    let data = [];
    for (var i = 0; i < 100; i++) {
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
                    <FlatList
                        data={data}
                        overScrollMode={'always'}
                        onScrollBeginDrag={() => {
                            tabVerticalScroll();
                        }}
                        keyExtractor={(item, index) => item}
                        renderItem={({ item }) => <Text style={{ color: colors.text }}>{item}</Text>}
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
    fetchProfilePosts,
    navparent,
    reqprofileid,
    screentype
}) => {
    const [loaded, setLoaded] = useState(false);
    const [hideparallax, setHideParallax] = useState(false);
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
    let lefticon = navparent == true ? <Icon
        type="evilicon"
        name="arrow-left"
        color={colors.text}
        size={responsiveFontSize(6)}
    /> : null;

    let lefticonpress = navparent == true ?
        () => Navigation.dismissModal(componentId)
        : null;

    let righticon = <Icon
        type="entypo"
        onPress={() => { }}
        name="dots-three-vertical"
        color={colors.text}
        size={responsiveFontSize(2.5)}
    />;

    let righticonpress = null;

    /**compoent function goes here */
    Navigation.mergeOptions(componentId, {
        bottomTabs: {
            //visible: false
        },
    });

    const onTabsVerticalScroll = () => {
        if (!hideparallax) {
            setHideParallax(true);
        }
    };

    useEffect(() => {
        EntypoIcon.getImageSource('user', 100).then(e =>
            Navigation.mergeOptions(componentId, {
                bottomTab: {
                    icon: e,
                }
            }));

        const listener = {
            componentDidAppear: () => {
                Navigation.mergeOptions(componentId, {
                    bottomTabs: {
                        visible: true
                    }
                });
                if (!loaded) {
                    setLoaded(true);
                }
            },
            componentDidDisappear: () => {
                setHideParallax(false);
            }

        };
        // Register the listener to all events related to our component
        const unsubscribe = Navigation.events().bindComponent(listener, componentId);
        return () => {
            // Make sure to unregister the listener during cleanup
            unsubscribe.remove();
        };
    }, []);

    /**compoent function ends here */

    return (

        <SafeAreaView style={styles.containerStyle}>
            <Header
                headercolor={colors.card}
                headertext={authprofile.user.username}
                headertextcolor={colors.text}
                headertextsize={responsiveFontSize(2.5)}
                headerStyle={{
                    elevation: 0,
                }}
                lefticon={lefticon}
                righticon={righticon}
            />
            {loaded == false ?
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size="large" color={'silver'} />
                </View> :

                <View style={styles.contentContainerStyle}>
                    {hideparallax ? null : <TopSection
                        profile={authprofile}
                    />}
                    <BottomSection
                        tabs={TABS}
                        tabVerticalScroll={onTabsVerticalScroll}
                    />
                </View>
            }


        </SafeAreaView >

    );
};

const mapStateToProps = (state) => ({
    authprofile: { ...state.profile, user: state.user },
    viewprofileposts: state.viewprofileform.viewprofileposts,
    viewprofile: state.viewprofileform.viewprofile,
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
        marginBottom: 55,
        backgroundColor: colors.background,
    },
    topSection: {
        marginTop: 0,
        paddingBottom: 4,
        borderColor: colors.border
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