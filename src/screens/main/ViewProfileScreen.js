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
    // navparent = true;
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
                lefticon={lefticon}
                righticon={righticon}
            />
            {loaded == false ?
                <ActivityIndicator size="large" color="#2196F3" /> :

                <ScrollView showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps='always'
                    keyboardDismissMode={'on-drag'}
                >
                    <View style={styles.containerStyle}>
                        <View style={styles.topSection}>
                            <View style={styles.avatarIconCtn}>
                                <Icon
                                    type="antdesign"
                                    name="arrowleft"
                                    iconStyle={{}}
                                    color={colors.text}
                                    size={responsiveFontSize(4)}
                                />

                                <Avatar
                                    source={require('../../assets/images/Penguins.jpg')}
                                    resizeMode='contain'
                                    //renderPlaceholderContent={loadingplaceholder}
                                    size={100} rounded
                                    icon={{ name: 'user', type: 'antdesign', size: 50, color: 'white' }}
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
                                    containerStyle={{ backgroundColor: colors.border, borderWidth: 5, elevation: 3, borderColor: colors.card, }}
                                    overlayContainerStyle={styles.avatarContainerStyle}
                                    titleStyle={{ fontSize: 20 }}
                                />
                                <Icon
                                    type="antdesign"
                                    name="book"
                                    iconStyle={{}}
                                    color={colors.text}
                                    size={responsiveFontSize(4)}
                                />
                            </View>
                            <View style={styles.modalCard}>
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
    topSection: {
        //borderBottomWidth: 0.5,
        paddingBottom: 4,
        borderColor: colors.border
    },
    avatarIconCtn: {
        padding: 10,
        paddingTop: 20,
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: 'center'
    },
    avatarContainerStyle: {
        backgroundColor: colors.border
    },
    modalCard: {
        backgroundColor: colors.card,
        //borderWidth: 1,
        padding: 0,
        justifyContent: "space-around",
        flexDirection: "row",
        alignItems: "center",
    }
});

export default connect(mapStateToProps, actions)(ViewProfileScreen);