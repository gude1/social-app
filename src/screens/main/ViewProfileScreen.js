import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ActivityIndicator, ScrollView, View } from 'react-native';
import { Text, Avatar, Icon, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { LoaderScreen, Header, InputBox, } from '../../components/reusable/ResuableWidgets';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import { useTheme } from '../../assets/themes/index';
import TouchableScale from 'react-native-touchable-scale';
import { checkData } from '../../utilities/index';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { Navigation } from 'react-native-navigation';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { TouchablePreview } from 'react-native-navigation/lib/dist/adapters/TouchablePreview';

const { colors } = useTheme();

const ViewProfileScreen = ({
    componentId,
    state,
    authuser,
    authprofile,
    navparent,
    reqprofileid,
    screentype
}) => {
    //navparent = true;
    const [loaded, setLoaded] = useState(false);
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
    let righticonpress = '';
    /**
     * <Button
                                title="Follow"
                                type="outline"
                                titleStyle={{ fontSize: 10 }}
                                buttonStyle={{
                                    width: 70,
                                    padding: 3,
                                    borderRadius: 20,
                                    marginVertical: 5,
                                    alignSelf: "center"
                                }}
                            />
     */
    /**compoent function goes here */
    useEffect(() => {
        EntypoIcon.getImageSource('user', 100).then(e =>
            Navigation.mergeOptions(componentId, {
                bottomTab: {
                    icon: e,
                }
            }));
        setLoaded(true);
    }, []);
    /**compoent function ends here */
    return (
        <SafeAreaView style={styles.containerStyle}>
            <Header
                headercolor={colors.card}
                headertext={authuser.username}
                headertextcolor={colors.text}
                headertextsize={responsiveFontSize(2.5)}
                headerStyle={{
                    elevation: 0,
                    //ssbackgroundColor: colors.background
                }}
                lefticon={lefticon}
                righticon={righticon}
            />
            {loaded == false ?
                <ActivityIndicator size="large" color="#2196F3" /> :

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps='always'
                    keyboardDismissMode={'on-drag'}
                >
                    <View style={styles.contentContainerStyle}>
                        <View style={styles.topSection}>
                            <View style={styles.avatarIconCtn}>
                                <Icon
                                    type="antdesign"
                                    name="message1"
                                    color={colors.text}
                                    disabledStyle={{
                                        backgroundColor: colors.background
                                    }}
                                    size={responsiveFontSize(3.5)}
                                />
                                <Avatar
                                    source={{ uri: authprofile.avatarlocal }}
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
                                    size={responsiveFontSize(3.5)}
                                />
                            </View>
                            <View style={styles.profileInfoCtn}>
                                <Text style={styles.profileInfoItemText}>{authuser.username}</Text>
                                <Text style={styles.profileInfoItemText}>{authprofile.bio}</Text>
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
                                    }}>{authprofile.campus}</Text>
                                </View>
                                <View style={{ alignItems: "center" }}>
                                    <Icon
                                        type="font-awesome"
                                        name={authuser.gender}
                                        color={colors.text}
                                        size={responsiveFontSize(4)}
                                    />
                                    <Text style={{
                                        color: colors.iconcolor,
                                        fontWeight: "bold",
                                        fontSize: responsiveFontSize(1.2),
                                    }}>{authuser.gender}</Text>
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
                                    }}>7.8k</Text>
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

                    </View>
                </ScrollView>

            }
        </SafeAreaView >

    );
};

const mapStateToProps = (state) => ({
    authprofile: state.profile,
    authuser: state.user
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
        backgroundColor: colors.background
    },
    contentContainerStyle: {
        flex: 1,
        backgroundColor: colors.background,
        marginBottom: 50
    },
    topSection: {
        borderBottomWidth: 0.5,
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
    profileActivityCtn: {
        //borderRadius: 20,
        margin: 5,
        padding: 10,
        backgroundColor: colors.background,
        // elevation: 3,
        justifyContent: "space-around",
        flexDirection: "row",
        alignItems: "center",
    }
});

export default connect(mapStateToProps, actions)(ViewProfileScreen);