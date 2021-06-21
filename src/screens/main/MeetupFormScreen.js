import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { Avatar, Button, Input, Icon, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { useTheme } from '../../assets/themes/index';
import { Header, ActivityOverlay } from '../../components/reusable/ResuableWidgets';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Navigation } from 'react-native-navigation';
import { isEmpty, checkData } from '../../utilities/index';

const { colors } = useTheme();

const MeetupFormScreen = ({ componentId, screentype, meetupform, navparent, saveMeetupDetails }) => {
    const [inputvalue, setInputValue] = useState(meetupform.meetup_name);
    let formcompleted = !isEmpty(meetupform.meetup_avatar) && !isEmpty(meetupform.meetup_name) ?
        true : false;
    let lefticon = navparent == true ?
        <Icon
            type="evilicon"
            name="arrow-left"
            color={colors.text}
            size={responsiveFontSize(6)}
        /> : null;
    let lefticonpress = navparent == true ? () => setDismissNav() : null;

    //COMPONENT FUNCTION STARTS HERE
    useEffect(() => {
        const listener = {
            componentDidAppear: () => {
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

    function setDismissNav() {
        if (screentype == "screen")
            return Navigation.pop(componentId);
        else
            return Navigation.dismissModal(componentId)
    }
    //COMPONENT FUNCTION ENDS HERE


    return (
        <SafeAreaView style={styles.containerStyle}>
            <Header
                lefticon={lefticon}
                leftIconPress={lefticonpress}
                headerStyle={{ elevation: 0, marginVertical: 20 }}
            />
            <View style={styles.contentContainerStyle}>
                <Avatar
                    size={160}
                    source={isEmpty(meetupform.meetup_avatar) ? null : { uri: meetupform.meetup_avatar }}
                    onPress={() => {
                        Navigation.showModal({
                            component: {
                                name: "GiphyGallery",
                                id: 'GIPHY_GALLERY',
                                passProps: {
                                    screentype: 'modal',
                                    onSubmitAction: (smallavatar, avatar) => {
                                        Navigation.dismissModal('GIPHY_VIEWER');
                                        Navigation.dismissModal('GIPHY_GALLERY');
                                        saveMeetupDetails([null, avatar]);
                                    }
                                }
                            }
                        });
                    }}
                    rounded
                    containerStyle={{ marginTop: 20, backgroundColor: "#673ab7" }}
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
                        saveMeetupDetails([inputvalue]);
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
                    onPress={() => {
                        saveMeetupDetails([inputvalue]);
                    }}
                    value={inputvalue}
                    iconRight
                    title={formcompleted ? "Update" : "Save"}
                    titleStyle={{ color: colors.iconcolor }}
                    buttonStyle={{
                        borderColor: colors.text,
                        alignItems: 'center',
                        borderRadius: 50,
                        padding: 10
                    }}
                />
                <ActivityOverlay
                    text={'Processing'}
                    isVisible={meetupform.processing}
                />
            </View>
        </SafeAreaView>
    );
};

MeetupFormScreen.options = {
    topBar: {
        visible: false
    },
};

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: colors.background,
    },
    contentContainerStyle: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.background
    }
});

const mapStateToProps = (state) => ({
    meetupform: state.meetupform
});

export default connect(mapStateToProps, actions)(MeetupFormScreen);
