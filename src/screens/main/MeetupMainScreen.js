import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { Text, Icon, Image, Avatar, CheckBox, Input } from 'react-native-elements';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { LoaderScreen, Header, ScrollableListOverLay, InputBox, ActivityOverlay } from '../../components/reusable/ResuableWidgets';
import { useTheme } from '../../assets/themes/index';
import { responsiveHeight, responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import { Navigation } from 'react-native-navigation';
import { checkData } from '../../utilities/index';
import { IndicatorViewPager, PagerTabIndicator } from '../../components/reusable/viewpager/index';
import TouchableScale from 'react-native-touchable-scale/src/TouchableScale';
import MeetRequestList from '../../components/reusable/MeetRequestList';
import CustomPicker from '../../components/reusable/Picker';
import EmojiList from '../../assets/static/EmojiList.json';
import HoursList from '../../assets/static/HoursList.json';
import CampusList from '../../assets/static/CampusList.json';


const { colors } = useTheme();

const MeetupMainScreen = ({
    componentId,
    meetupreqobj,
    catName = "Music",
    fetchMeetRequests,
    setReset,
    fetchMoreMeetRequests,
    createMeetRequest,
    setMeetupMain,
}) => {

    const REQUEST_SCHEMA = {
        expires_at: 24,
        request_msg: '',
        request_mood: '😀',
    };
    const [loaded, setLoaded] = useState(false);
    const [showsetting, setShowSetting] = useState(false);
    const [createReq, setCreateReq] = useState(REQUEST_SCHEMA);
    const [reqoptions, setReqOptions] = useState(meetupreqobj.options);
    const [showmakereqmodal, setShowMakeReqModal] = useState(false);

    let backgroundgif = colors.theme == "white" ?
        require('../../assets/meetupscreen/meetupmain/bluehi.gif') :
        require('../../assets/meetupscreen/meetupmain/blackhi.gif');
    let backgroundgifcolor = colors.theme == "white" ? colors.blue : colors.background;
    let statusbarstyle = colors.theme == "white" ? 'light' : colors.statusbartext;

    /** COMPONENT FUNCTION STARTS HERE */
    useEffect(() => {
        const listener = {
            componentDidAppear: () => {
                if (!loaded) {
                    setLoaded(true);
                }
                fetchMeetRequests();
                setScreenInfo();
            },
            componentDidDisappear: () => {
                // setReset('meetupmain');
            }
        };
        // Register the listener to all events related to our component
        const unsubscribe = Navigation.events().bindComponent(listener, componentId);
        return () => {
            // Make sure to unregister the listener during cleanup
            unsubscribe.remove();
        };
    }, []);

    const setScreenInfo = () => {
        let current = Math.round(new Date().getTime() / 1000);
        let requests = meetupreqobj.requests.filter(item => {
            if (item.deleted != true && item.expires_at > current) {
                return true;
            }
            return false;
        });

        let myrequests = meetupreqobj.myrequests.filter(item => {
            if (item.deleted != true && item.expires_at > current) {
                return true;
            }
            return false;
        });
        setMeetupMain({ requests, myrequests });
    };

    const renderTabIndicator = () => {
        const TABS = [
            {
                text: "Requests"
            },
            {
                text: "Conversations"
            }
        ];
        return (
            <PagerTabIndicator
                iconStyle={{ fontSize: 30, color: '#808080' }}
                selectedIconStyle={{ fontSize: 32, color: colors.text }}
                selectedTextStyle={{ color: colors.text }}
                style={{
                    borderColor: colors.border,
                    backgroundColor: colors.background,
                }}
                itemStyle={{
                    paddingVertical: 10
                }}
                selectedItemStyle={{
                    paddingVertical: 10,
                    borderColor: colors.text,
                }}
                tabs={TABS}
            />
        );
    };

    const renderView = () => {
        if (loaded == false) {
            return (
                <LoaderScreen
                    loaderIcon={
                        <Icon
                            type="entypo"
                            name="network"
                            color={colors.text}
                            size={responsiveFontSize(10)}
                        />
                    }
                    animationType={'zoomIn'}
                />
            );
        } else {
            Navigation.mergeOptions(componentId, {
                statusBar: {
                    backgroundColor: backgroundgifcolor,
                    style: statusbarstyle,
                },
            });
            return (
                <View style={styles.containerStyle}>
                    <Image
                        source={backgroundgif}
                        style={{
                            height: responsiveHeight(40),
                            width: responsiveWidth(100)
                        }}
                        placeholderStyle={{ backgroundColor: backgroundgifcolor, }}
                        containerStyle={{ alignSelf: "center", backgroundColor: backgroundgifcolor, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}
                    >
                        <View style={{ alignItems: "flex-start", flex: 1 }}>
                            <Icon
                                type="evilicon"
                                name="arrow-left"
                                color={'white'}
                                onPress={() => Navigation.dismissModal(componentId)}
                                containerStyle={{ margin: 20 }}
                                size={responsiveFontSize(7)}
                            />
                        </View>
                    </Image>

                    <Header
                        headertext={`${catName} Requests`}
                        headerTextStyle={{
                            fontFamily: "cursive",
                            marginVertical: 10,
                            textAlign: "center",
                            color: colors.placeholder,
                            fontSize: responsiveFontSize(3)
                        }}
                        headerStyle={{
                            alignSelf: 'center',
                            width: '95%',
                            maxWidth: 500
                        }}
                        lefticon={
                            <Icon
                                type="antdesign"
                                name="setting"
                                color={colors.text}
                                size={responsiveFontSize(4)}
                            />
                        }
                        leftIconPress={() => setShowSetting(true)}
                        righticon={
                            <Icon
                                type="antdesign"
                                name="plus"
                                style={{ borderWidth: 2, padding: 2, borderRadius: 10, borderColor: colors.text }}
                                color={colors.text}
                                size={responsiveFontSize(2.5)}
                            />
                        }
                        rightIconPress={() => setShowMakeReqModal(true)}
                    />

                    <View style={{ flex: 1 }}>
                        <IndicatorViewPager
                            initialPage={0}
                            style={{ flex: 1, borderBottomWidth: 0 }}
                            indicatorposition={'bottom'}
                            indicator={renderTabIndicator()}
                            keyboardDismissMode='none'
                        >
                            <View key={0} style={{ flex: 1, alignItems: "center" }}>
                                <MeetRequestList
                                    meetupreqobj={meetupreqobj}
                                    fetchReqs={fetchMeetRequests}
                                    fetchMoreReqs={fetchMoreMeetRequests}
                                />
                            </View>

                            <View key={1} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ color: colors.text }}>Conversations</Text>
                            </View>
                        </IndicatorViewPager>
                    </View>

                    <ScrollableListOverLay
                        submitAction={() => {
                            setMeetupMain({
                                options: {
                                    ...meetupreqobj.options,
                                    ...reqoptions
                                }
                            });
                            setShowSetting(false);
                        }}
                        submitactiontxt={'Save'}
                        onBackdropPress={() => {
                            setShowSetting(false);
                            setReqOptions(meetupreqobj.options);
                        }}
                        visible={showsetting}
                        ListTitle={'Request Filter'}
                        loading={false}
                        contentContainerStyle={{
                            marginLeft: 0,
                            flex: 1,
                        }}
                    >
                        <View style={{
                            marginLeft: 10,
                            marginTop: 5,
                            marginRight: 5,
                            flex: 1,
                        }}>
                            <CustomPicker
                                containerPickerStyle={{ width: "100%" }}
                                pickerContainerStyle={{ width: "100%" }}
                                onValueChange={(itemValue, itemIndex) => {
                                    setReqOptions({
                                        ...reqoptions,
                                        request_mood: itemValue
                                    });
                                }}
                                mode="dialog"
                                options={EmojiList}
                                selectedValue={reqoptions.request_mood}
                                labelText="Filter by mood"
                                borderColor={colors.border}
                                labelStyle={{ color: colors.text }}
                                placeholderColor={colors.placeholder}
                                backgroundColor={colors.card}
                                icon={{
                                    type: 'antdesign',
                                    name: 'smileo',
                                    color: colors.iconcolor,
                                    size: 28
                                }}
                            />
                            <CustomPicker
                                containerPickerStyle={{ width: "100%" }}
                                pickerContainerStyle={{ width: "100%" }}
                                onValueChange={(itemValue, itemIndex) => {
                                    setReqOptions({
                                        ...reqoptions,
                                        campus: itemValue
                                    });
                                }}
                                mode="dialog"
                                selectedValue={reqoptions.campus}
                                options={CampusList}
                                labelText="Filter by campus"
                                borderColor={colors.border}
                                labelStyle={{ color: colors.text }}
                                placeholderColor={colors.placeholder}
                                backgroundColor={colors.card}
                                icon={{
                                    type: 'antdesign',
                                    name: 'book',
                                    color: colors.iconcolor,
                                    size: 28
                                }}
                            />

                        </View>
                    </ScrollableListOverLay>

                    <ScrollableListOverLay
                        submitAction={() => {
                            createMeetRequest([
                                createReq.request_msg,
                                catName,
                                createReq.request_mood,
                                createReq.expires_at
                            ]);
                            setShowMakeReqModal(false);
                            setCreateReq(REQUEST_SCHEMA);
                        }}
                        height={400}
                        submitactiontxt={'Create'}
                        onBackdropPress={() => {
                            setShowMakeReqModal(false);
                            setCreateReq(REQUEST_SCHEMA);
                        }}
                        visible={showmakereqmodal}
                        ListTitle={'Create Meet'}
                        loading={false}
                        contentContainerStyle={{ marginLeft: 0 }}
                    >
                        <View style={{
                            marginLeft: 10,
                            marginTop: 5,
                            marginRight: 5,
                            flex: 1,
                        }}>

                            <CustomPicker
                                containerPickerStyle={{ width: "100%" }}
                                pickerContainerStyle={{ width: "100%" }}
                                onValueChange={(itemValue, itemIndex) => {
                                    setCreateReq({
                                        ...createReq,
                                        request_mood: itemValue
                                    });
                                }}
                                mode="dialog"
                                options={EmojiList}
                                selectedValue={createReq.request_mood}
                                labelText="Meet mood"
                                borderColor={colors.border}
                                labelStyle={{ color: colors.text }}
                                placeholderColor={colors.placeholder}
                                backgroundColor={colors.card}
                                icon={{
                                    type: 'antdesign',
                                    name: 'smileo',
                                    color: colors.iconcolor,
                                    size: 25
                                }}
                            />
                            <Input
                                containerStyle={{
                                    marginVertical: 0,
                                    marginHorizontal: 0,
                                    paddingVertical: 0,
                                    paddingHorizontal: 0,
                                }}
                                onChangeText={(text) => {
                                    setCreateReq({
                                        ...createReq,
                                        request_msg: text
                                    });
                                }}
                                multiline={true}
                                label="Meet Req text (<=200)"
                                placeholderTextColor={colors.placeholder}
                                placeholder={'Meet M'}
                                labelStyle={{ color: colors.text }}
                                inputStyle={{
                                    borderBottomWidth: 1,
                                    color: colors.text,
                                    borderColor: colors.border,
                                }}
                                inputContainerStyle={{
                                    borderBottomWidth: 0,
                                    width: '100%',
                                }}
                            />

                            <CustomPicker
                                containerPickerStyle={{ width: "100%" }}
                                pickerContainerStyle={{ width: "100%" }}
                                onValueChange={(itemValue, itemIndex) => {
                                    setCreateReq({
                                        ...createReq,
                                        expires_at: itemValue
                                    });
                                }}
                                mode="dialog"
                                selectedValue={createReq.expires_at}
                                options={HoursList}
                                labelText="Expries after"
                                borderColor={colors.border}
                                labelStyle={{ color: colors.text }}
                                placeholderColor={colors.placeholder}
                                backgroundColor={colors.card}
                                icon={{
                                    type: 'antdesign',
                                    name: 'clockcircleo',
                                    color: colors.iconcolor,
                                    size: 25
                                }}
                            />
                        </View>
                    </ScrollableListOverLay>

                    <ActivityOverlay
                        text="Creating"
                        isVisible={meetupreqobj.creating}
                    />
                </View >
            );
        }
    }

    /** COMPONENT FUNCTION ENDS HERE */

    return (
        <SafeAreaView
            style={styles.containerStyle}
        >
            <View style={styles.contentContainerStyle}>
                {renderView()}
            </View>
        </SafeAreaView>
    );
};

MeetupMainScreen.options = {
    navigationBar: {
        visible: true,
        backgroundColor: colors.background,
    },
};

const mapStateToProps = state => ({
    connected: state.network.isConnected,
    meetupreqobj: state.meetupmain
});

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: colors.background
    },
    contentContainerStyle: {
        flex: 1,
    },
    checkBoxCtn: {
        backgroundColor: colors.background,
        borderColor: colors.iconcolor,
        borderRadius: 10
    }
});

export default connect(mapStateToProps, actions)(MeetupMainScreen);