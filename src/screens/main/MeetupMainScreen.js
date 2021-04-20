import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { Text, Icon, Image, Avatar } from 'react-native-elements';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { LoaderScreen, Header } from '../../components/reusable/ResuableWidgets';
import { useTheme } from '../../assets/themes/index';
import { responsiveHeight, responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import { Navigation } from 'react-native-navigation';
import { IndicatorViewPager, PagerTabIndicator } from '../../components/reusable/viewpager/index';
import TouchableScale from 'react-native-touchable-scale/src/TouchableScale';
import { checkData } from '../../utilities/index';
import MeetRequestList from '../../components/MeetRequestList';

const { colors } = useTheme();

const MeetupMainScreen = ({
    componentId,
    meetupmain,
    catName = "Music",
    fetchMeetRequests,
    setMeetupMain,
}) => {
    const [loaded, setLoaded] = useState(false);
    let backgroundgif = colors.theme == "white" ?
        require('../../assets/meetupscreen/meetupmain/bluehi.gif') : require('../../assets/meetupscreen/meetupmain/blackhi.gif');
    let backgroundgifcolor = colors.theme == "white" ? colors.blue : colors.background;
    let statusbarstyle = colors.theme == "white" ? 'light' : colors.statusbartext;

    /** COMPONENT FUNCTION STARTS HERE */
    useEffect(() => {
        const listener = {
            componentDidAppear: () => {
                if (!loaded) {
                    setLoaded(true);
                }
                setScreenInfo();
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

    const setScreenInfo = () => {
        let current = Math.round(new Date().getTime() / 1000);
        let requests = meetupmain.requests.filter(item => {
            if (item.deleted != true && item.expires_at > current) {
                return true;
            }
            return false;
        });
        let myrequests = meetupmain.myrequests.filter(item => {
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
                        righticon={
                            <Icon
                                type="antdesign"
                                name="plus"
                                style={{ borderWidth: 2, padding: 2, borderRadius: 10, borderColor: colors.text }}
                                color={colors.text}
                                size={responsiveFontSize(2.5)}
                            />
                        }
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
                                    data={[]}
                                />
                            </View>

                            <View key={1} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ color: colors.text }}>Conversations</Text>
                            </View>
                        </IndicatorViewPager>
                    </View>
                </View>
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

};

const mapStateToProps = state => ({
    connected: state.network.isConnected,
    meetupmain: state.meetupmain
});

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: colors.background
    },
    contentContainerStyle: {
        flex: 1,
        marginBottom: 50
    }
});

export default connect(mapStateToProps, actions)(MeetupMainScreen);