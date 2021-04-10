import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { Text, Icon, Image, Avatar, ListItem } from 'react-native-elements';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { LoaderScreen, InputBox, Header } from '../../components/reusable/ResuableWidgets';
import { useTheme } from '../../assets/themes/index';
import { responsiveHeight, responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import { Navigation } from 'react-native-navigation';
import { IndicatorViewPager, PagerTabIndicator } from '../../components/reusable/viewpager/index';
import TouchableScale from 'react-native-touchable-scale/src/TouchableScale';
import EmojiData from '../../assets/static/EmojiList.json'
import { checkData } from '../../utilities/index';

const { colors } = useTheme();
let backgroundgif = colors.theme == "white" ? require('../../assets/meetupscreen/meetupmain/bluehi.gif') : require('../../assets/meetupscreen/meetupmain/blackhi.gif');
let backgroundgifcolor = colors.theme == "white" ? colors.blue : colors.background;
let statusbarstyle = colors.theme == "white" ? 'light' : colors.statusbartext;

const MeetupMainScreen = ({ componentId, catName }) => {
    const [loaded, setLoaded] = useState(false);
    catName = checkData(catName) ? catName : 'Music';
    /**COMPONENT FUNCTION STARTS HERE */

    useEffect(() => {
        const listener = {
            componentDidAppear: () => {
                if (!loaded) {
                    setLoaded(true);
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

    const renderTabIndicator = () => {
        const TABS = [
            {
                text: "Requests"
            },
            {
                text: "Conversations"
            }, {
                text: "Setting"
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
                    // borderBottomWidth: 0.25
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
                                <ListItem
                                    Component={TouchableScale}
                                    containerStyle={{ margin: 10, width: responsiveWidth(90), maxWidth: 500, padding: 15, backgroundColor: colors.card, elevation: 3, borderRadius: 20 }}
                                    leftAvatar={{ source: require('../../assets/meetupscreen/requestcat/sport.jpeg') }}
                                    title={'Debola'}
                                    titleStyle={{ color: colors.text }}
                                    rightTitle={EmojiData[0].value}
                                    rightTitleStyle={{ color: colors.text, fontSize: responsiveFontSize(3) }}
                                    subtitle={'Need help with ecn 403 please i dont have any idea'}
                                    subtitleStyle={{ color: colors.placeholder }}
                                />
                                <ListItem
                                    Component={TouchableScale}
                                    containerStyle={{ margin: 10, width: responsiveWidth(90), maxWidth: 500, padding: 15, backgroundColor: colors.card, elevation: 3, borderRadius: 20 }}
                                    leftAvatar={{ source: require('../../assets/meetupscreen/requestcat/gaming.jpeg') }}
                                    title={'Dekunle'}
                                    titleStyle={{ color: colors.text }}
                                    rightTitle={EmojiData[8].value}
                                    rightTitleStyle={{ color: colors.text, fontSize: responsiveFontSize(3) }}
                                    subtitle={'Anyone wanna play cod?'}
                                    subtitleStyle={{ color: colors.placeholder }}
                                />
                            </View>

                            <View key={1} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ color: colors.text }}>Conversations</Text>
                            </View>

                            <View key={2} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ color: colors.text }}>Setting</Text>
                            </View>
                        </IndicatorViewPager>
                    </View>
                </View>
            );
        }
    }
    /**COMPONENT FUNCTION ENDS HERE */
    return (
        <SafeAreaView
            style={styles.containerStyle}
        >
            {renderView()}
        </SafeAreaView>
    );
};

MeetupMainScreen.options = {

};

const mapStateToProps = state => ({
    connected: state.network.isConnected,
});

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: colors.background
    },
});

export default connect(mapStateToProps, actions)(MeetupMainScreen);