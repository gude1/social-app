import React, { useState, useEffect } from 'react';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { Animated, View, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import { Text, Icon, Avatar, CheckBox, Input, Button } from 'react-native-elements';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { useTheme } from '../../assets/themes/index';
import { Header } from '../../components/reusable/ResuableWidgets';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import { IndicatorViewPager, PagerTabIndicator, PagerDotIndicator } from '../../components/reusable/viewpager/index';
import { Navigation } from 'react-native-navigation';
import MeetRequestList from '../../components/reusable/MeetRequestList';

const { colors } = useTheme();

const FirstTimeView = ({ meetupform, updateMeetForm, meetupmain }) => {
    //COMPONENT STARTS HERE
    const renderDotIndicator = () => {
        return (
            <PagerDotIndicator
                pageCount={2}
                dotStyle={{ borderColor: 'silver', width: 13, borderWidth: 2, backgroundColor: colors.background, height: 13, borderRadius: 50, borderWidth: 1 }}
                selectedDotStyle={{ borderColor: 'silver', borderWidth: 2, width: 16, backgroundColor: colors.text, height: 16, borderRadius: 50, borderWidth: 1 }}
                hideSingle
            />
        );
    }

    return (
        <IndicatorViewPager
            style={{ flex: 1, marginBottom: 20 }}
            initialPage={0}
            indicator={renderDotIndicator()}
        >
            <View key={0} style={styles.pagerView}>
                <Avatar
                    rounded
                    size={200}
                    containerStyle={{ marginTop: 10, backgroundColor: colors.border }}
                    placeholderStyle={{ backgroundColor: colors.border }}
                    icon={{ size: responsiveFontSize(4), name: 'image', type: 'evilicons', color: 'white' }}
                    source={require('../../assets/meetupscreen/icon2.png')}
                />
                <Text style={styles.pagerViewText}>
                    Meet New people across campuses
            </Text>
            </View>

            <View key={1} style={styles.pagerView}>
                <Avatar
                    rounded
                    size={200}
                    containerStyle={{ backgroundColor: colors.border }}
                    placeholderStyle={{ backgroundColor: colors.border }}
                    icon={{ size: responsiveFontSize(4), name: 'image', type: 'evilicons', color: 'white' }}
                    source={require('../../assets/meetupscreen/icon3.png')}
                />
                <Text style={styles.pagerViewText}>
                    Create Meets and connect with others that share your interest
                </Text>
                <Button
                    title={'Get Started'}
                    onPress={() => updateMeetForm({ accepted: true })}
                    titleStyle={{ color: 'white' }}
                    containerStyle={{ marginVertical: 15 }}
                    buttonStyle={{ width: 250, borderRadius: 20, backgroundColor: colors.blue, padding: 13 }}
                />
            </View>
        </IndicatorViewPager>
    );
};

export const MeetupScreen = ({
    componentId,
    updateMeetForm,
    meetupmain,
    meetupform,
    fetchMeetRequests,
    fetchMoreMeetRequests
}) => {
    const [loaded, setLoaded] = useState(false);
    let meetupreqobj = meetupmain;
    let category = meetupreqobj.options.request_category;

    //COMPONENT FUNCTION STARTS HERE

    useEffect(() => {
        EntypoIcon.getImageSource('network', 100).then(e =>
            Navigation.mergeOptions(componentId, {
                bottomTab: {
                    icon: e,
                }
            })
        );
        const listener = {
            componentDidAppear: () => {
                if (!loaded) {
                    setLoaded(true);
                }
                fetchMeetRequests();
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

    const renderTabIndicator = () => {
        const TABS = [
            {
                text: "Meets"
            },
            {
                text: "Meet Msgs"
            },
            {
                text: "My Meets"
            }
        ];
        return (
            <PagerTabIndicator
                textStyle={{
                    fontWeight: "bold",
                    textAlign: "center",
                    color: colors.placeholder,
                    fontSize: responsiveFontSize(1.8)
                }}
                selectedTextStyle={{
                    fontWeight: "bold",
                    textAlign: "center",
                    color: colors.text,
                    fontSize: responsiveFontSize(1.8)
                }}
                style={{
                    borderColor: colors.border,
                    height: 50,
                    borderBottomWidth: 0.5,
                    backgroundColor: colors.background,
                }}
                itemStyle={{
                    height: '100%',
                }}
                selectedItemStyle={{
                    borderBottomWidth: 1.5,
                    height: '100%',
                    borderColor: colors.text,
                }}
                tabs={TABS}
            />
        );
    };

    const renderView = () => {
        if (loaded == false) {
            return (
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    {
                        colors.theme == "white" ?
                            <Image
                                source={require('../../assets/animations/loader1white.gif')}
                                style={{ width: 300, height: 300 }}
                            />
                            :
                            <Image source={require('../../assets/animations/loader1black.gif')}
                                style={{ width: 300, height: 300 }}
                            />
                    }

                </View>
            );
        } else if (!meetupform.accepted) {
            return (
                <FirstTimeView
                    meetupform={meetupform}
                    updateMeetForm={updateMeetForm}
                />
            );
        } else {
            return (
                <>
                <Header
                    headertext="Meet"
                    headertextcolor={colors.text}
                    headercolor={colors.card}
                    headerStyle={{ width: responsiveWidth(100), elevation: 1 }}
                    headertextsize={responsiveFontSize(4)}
                    headerTextStyle={{
                        marginHorizontal: 30,
                        textAlign: "center",
                        fontFamily: 'cursive',
                        fontWeight: 'bold'
                    }}
                    righticon={
                        <>
                        <Avatar
                            rounded
                            size={30}
                            containerStyle={{ backgroundColor: colors.border }}
                            placeholderStyle={{ backgroundColor: colors.border }}
                            source={require('../../assets/meetupscreen/meetupmain/blackhi.gif')}
                        />
                        </>
                    }
                    righticon2={
                        <Icon
                            type="antdesign"
                            name="plus"
                            style={{
                                borderWidth: 2,
                                padding: 2,
                                borderRadius: 10,
                                borderColor: colors.text
                            }}
                            color={colors.text}
                            size={responsiveFontSize(2.5)}
                        />
                    }
                />
                <IndicatorViewPager
                    initialPage={0}
                    style={{ flex: 1, marginTop: 2, borderBottomWidth: 0 }}
                    indicatorposition={'top'}
                    indicator={renderTabIndicator()}
                    keyboardDismissMode='none'
                >
                    <View key={0} style={{ flex: 1 }}>
                        <MeetRequestList
                            meetupreqobj={meetupreqobj}
                            fetchReqs={fetchMeetRequests}
                            fetchMoreReqs={fetchMoreMeetRequests}
                        />
                    </View>

                    <View key={1} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ color: colors.text }}>Conversations</Text>
                    </View>
                    <View key={2} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <MeetRequestList
                            meetupreqobj={meetupreqobj}
                            myrequests={true}
                            fetchReqs={() => fetchMyMeetRequests()}
                        />
                    </View>
                </IndicatorViewPager>
                </>
            );
        }
    };

    //COMPONENT FUNCTION ENDS HERE

    return (
        <SafeAreaView style={styles.containerStyle}>
            <View style={styles.contentContainerStyle}>
                {renderView()}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: colors.background,
        marginBottom: 55
    },
    pagerView: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    container: {
        flex: 1,
    },
    tabBar: {
        flexDirection: 'row',
        paddingTop: 20,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
    },
    pagerViewText: {
        margin: 20,
        fontSize: responsiveFontSize(2.8),
        textAlign: "center",
        color: 'silver'
    },
    contentContainerStyle: {
        flex: 1,
        backgroundColor: colors.background,
    },
    checkBoxCtn: {
        backgroundColor: colors.background,
        borderColor: colors.iconcolor,
        borderRadius: 10
    }
});

MeetupScreen.options = {
    bottomTabs: {
        visible: true
    },
    bottomTab: {
        text: "Meet"
    }
};

const mapStateToProps = (state) => ({
    meetupmain: state.meetupmain,
    meetupform: state.meetupform
});

export default connect(mapStateToProps, actions)(MeetupScreen);