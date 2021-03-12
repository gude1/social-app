import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, ActivityIndicator, Image } from 'react-native';
import { Text } from 'react-native-elements';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { useTheme } from '../../assets/themes'
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { Avatar, Button, Input } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import { PagerDotIndicator, IndicatorViewPager } from '../../components/reusable/viewpager/index';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { checkData } from '../../utilities/index';

const { colors } = useTheme();

const MeetupScreen = ({
    componentId,
    meetupform,
    saveMeetupDetails,
    connected }) => {
    const [loaded, setLoaded] = useState(false);
    const [inputvalue, setInputValue] = useState('');
    let avatar = meetupform.avatar_name || meetupform.meetup_avatar;

    /**CONDITIONAL STATEMENTS  STARTS HERE */
    if (checkData(avatar)) {
        avatar = { uri: avatar };
    } else {
        avatar = null;
    }
    /**CONDITIONAL STATEMENTS  ENDS HERE*/

    /**compoent function goes here */
    useEffect(() => {
        EntypoIcon.getImageSource('network', 100).then(e =>
            Navigation.mergeOptions(componentId, {
                bottomTab: {
                    icon: e,
                }
            }));
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

    const renderView = () => {
        if (loaded == false) {
            return (
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    {
                        colors.theme == "white" ?
                            <Image source={require('../../assets/animations/loader1white.gif')} style={{ width: 300, height: 300 }} />
                            :
                            <Image source={require('../../assets/animations/loader1black.gif')} style={{ width: 300, height: 300 }} />
                    }

                </View>
            );
        } else if (meetupform.visited == false) {
            const renderDotIndicator = () =>
                <PagerDotIndicator
                    pageCount={3}
                    dotStyle={{ borderColor: 'silver', width: 18, borderWidth: 2, backgroundColor: colors.background, height: 18, borderRadius: 50, borderWidth: 1 }}
                    selectedDotStyle={{ borderColor: 'silver', borderWidth: 2, width: 18, backgroundColor: colors.text, height: 18, borderRadius: 50, borderWidth: 1 }}
                    hideSingle
                />;
            return (
                <IndicatorViewPager
                    style={{ flex: 0.9 }}
                    indicator={renderDotIndicator()}
                >
                    <View key={0} style={styles.pagerView}>
                        <Avatar
                            rounded
                            size={200}
                            containerStyle={{ backgroundColor: colors.border }}
                            placeholderStyle={{ backgroundColor: colors.border }}
                            icon={{ size: responsiveFontSize(4), name: 'image', type: 'evilicons', color: 'white' }}
                            source={require('../../assets/meetupscreen/icon2.png')}
                        />
                        <Text style={styles.pagerViewText}>
                            Find and Meet with new people across campuses
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
                            Connect with like minds and make memories
                        </Text>
                    </View>

                    <View key={2} style={styles.pagerView}>
                        <Avatar
                            size={160}
                            source={avatar}
                            rounded
                            containerStyle={{ backgroundColor: "#673ab7" }}
                            placeholderStyle={{ backgroundColor: "#673ab7" }}
                            icon={{ size: responsiveFontSize(6), name: 'camerao', type: 'antdesign', color: 'white' }}
                        />
                        <Text style={{ marginTop: 3, fontSize: responsiveFontSize(2), textAlign: "center", color: 'red' }}>
                            {meetupform.errors.meetup_avatar_err || meetupform.errors.meetup_avatar_name_err}
                        </Text>
                        <Input
                            placeholder="Set A Meet Name"
                            leftIcon={{
                                name: "pencil",
                                type: "evilicon",
                                color: colors.iconcolor,
                                size: responsiveFontSize(5)
                            }}
                            onChangeText={(txt) => {
                                setInputValue(txt);
                            }}
                            onSubmitEditing={() => {
                            }}
                            value={inputvalue}
                            returnKeyType={'go'}
                            errorMessage={meetupform.errors.meetup_name_err}
                            selectionColor='#2196F3'
                            maxLength={15}
                            errorStyle={{ color: 'red' }}
                            inputContainerStyle={{ borderWidth: 0, borderBottomWidth: 0 }}
                            placeholderTextColor={colors.placeholder}
                            containerStyle={{ maxWidth: 300, marginTop: 10, borderWidth: 0, }}
                            inputStyle={{ color: colors.text, borderWidth: 0, borderBottomWidth: 1, borderColor: colors.border }}
                        />
                        <Button
                            type="outline"
                            icon={{
                                name: 'arrow-right',
                                type: "evilicon",
                                size: responsiveFontSize(4),
                                color: colors.text
                            }}
                            iconRight
                            title={'Next'}
                            titleStyle={{ color: colors.iconcolor }}
                            buttonStyle={{
                                borderColor: colors.text,
                                alignItems: 'center',
                                borderRadius: 50,
                                padding: 10
                            }}
                            containerStyle={{ marginBottom: 50 }}
                        />

                    </View>
                </IndicatorViewPager>
            );
        } else {
            return <Text style={{ color: colors.text }}>Shit</Text>
        }
    };

    /**component function ends here */
    return (
        <SafeAreaView style={styles.containerStyle}>
            {renderView()}
        </SafeAreaView>

    );
};
MeetupScreen.options = {
    topBar: {
        title: {
            text: 'Gist'
        }
    },
    bottomTabs: {
        visible: true
    },
    bottomTab: {
        text: 'Meet',
    }

};

const mapStateToProps = state => ({
    connected: state.network.isConnected,
    meetupform: state.meetupform,
    offlineactions: state.offlineactions,
});

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: colors.background
    },
    pagerView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    pagerViewText: {
        margin: 20,
        fontSize: responsiveFontSize(2.8),
        textAlign: "center",
        color: 'silver'
    }
});

export default connect(mapStateToProps, actions)(MeetupScreen);