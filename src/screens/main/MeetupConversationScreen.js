import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, KeyboardAvoidingView, Keyboard } from 'react-native';
import { Avatar, Button, Input, Icon, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { useTheme } from '../../assets/themes/index';
import { HeaderWithImage, InputBox, LoaderScreen } from '../../components/reusable/ResuableWidgets';
import { Navigation } from 'react-native-navigation';
import { isEmpty } from '../../utilities/index';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import MeetConversation from '../../components/reusable/MeetConversation';
import * as Animatable from 'react-native-animatable';
import { Platform } from 'react-native';


const { colors } = useTheme();

const MeetupConversationScreen = ({
    navparent,
    meetconvobj,
    chatitem,
    authprofile,
    screentype,
    componentId,
    setMeetupConversation,
    sendMeetConversation,
    setReset,
}) => {
    /**COMPONENT FUNCTIONS */
    const [loaded, setLoaded] = useState(false);
    const [flatlistref, setFlatListRef] = useState(null);
    const [inputtxt, setInputTxt] = useState('');
    chatitem = !isEmpty(meetconvobj.conversation_id) ?
        { ...chatitem, ...meetconvobj } : chatitem;

    useEffect(() => {
        setReset('meetupconversation');
        setMeetupConversation(chatitem);
        const listener = {
            componentDidAppear: () => {
                setLoaded(true);
            },
            componentDidDisappear: () => {
            }
        };

        // Register the listener to all events related to our component
        const unsubscribe = Navigation.events().bindComponent(listener, componentId);
        return () => {
            setReset('meetupconversation')
            // Make sure to unregister the listener during cleanup
            unsubscribe.remove();
        };
    }, []);


    const renderConvInfo = () => {
        return (
            <Animatable.View
                style={{
                    flexDirection: 'row',
                    width: 300,
                    alignSelf: "center",
                    marginTop: 20,
                    padding: 15,
                    borderRadius: 20,
                    backgroundColor: colors.theme == "white" ? 'rgb(237,237,237)' : colors.card
                }}
                animation={'slideInRight'}
                useNativeDriver={true}
            >
                <Text
                    style={{
                        textAlign: "justify",
                        fontSize: responsiveFontSize(1.2),
                        color: colors.placeholder
                    }}
                >
                    Meet Conversations disappear as soon as the  meet expires. Avoid sharing personal information and only meet with strangers at public places
                </Text>
            </Animatable.View>
        );
    }


    function renderView() {
        if (isEmpty(chatitem) ||
            isEmpty(chatitem.conversation_id) ||
            isEmpty(chatitem.partnermeetprofile) ||
            //isEmpty(chatitem.partnerprofile) ||
            //isEmpty(chatitem.partnerprofile.user) ||
            !Array.isArray(chatitem.conv_list)
        ) {
            return (
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

                    <Text style={{ textAlign: "center", color: colors.text }}>
                        Something went wrong
                    </Text>
                    <Button
                        type="outline"
                        onPress={setDismissNav}
                        icon={{
                            name: 'arrow-left',
                            type: "evilicon",
                            size: responsiveFontSize(4),
                            color: colors.iconcolor
                        }}
                        title="Go Back"
                        titleStyle={{
                            color: colors.iconcolor,
                            textAlign: "center",
                            fontSize: responsiveFontSize(1.4)
                        }}
                        containerStyle={{ marginTop: 20 }}
                        buttonStyle={{
                            borderColor: colors.iconcolor,
                            borderRadius: 15,
                            width: 100,
                        }}
                    />
                </View>
            );
        } else {
            if (!loaded) {
                return (
                    <LoaderScreen
                        loaderIcon={
                            <View style={{ alignItems: "center" }}>
                                <Text style={{
                                    color: colors.text,
                                    marginVertical: 5,
                                    fontSize: responsiveFontSize(3)
                                }}>
                                    {chatitem.partnermeetprofile.meetup_name}
                                </Text>
                                <Icon
                                    type={'evilicon'}
                                    name={'comment'}
                                    color={colors.text}
                                    size={responsiveFontSize(8)}
                                />
                            </View>
                        }
                    />
                );
            }
            return (
                <>
                <HeaderWithImage
                    title={chatitem.partnermeetprofile.meetup_name}
                    avatarUri={{ uri: chatitem.partnermeetprofile.meetup_avatar }}
                    onAvatarPress={() => {
                        Navigation.showModal({
                            component: {
                                name: 'PhotoViewer',
                                passProps: {
                                    navparent: true,
                                    headerText: chatitem.partnermeetprofile.meetup_name,
                                    photos: [chatitem.partnermeetprofile.meetup_avatar],
                                    screentype: 'modal'
                                },
                            }
                        })
                    }}
                    Icon1={
                        <Icon
                            type="evilicon"
                            name="arrow-left"
                            color={colors.text}
                            onPress={setDismissNav}
                            containerStyle={{ marginRight: 15 }}
                            size={responsiveFontSize(6)}
                        />
                    }
                    Icon2={
                        <Icon
                            type="antdesign"
                            name="infocirlceo"
                            color={colors.text}
                            onPress={() => {
                                setLoaded(true)
                            }}
                            containerStyle={{ marginTop: 3, marginHorizontal: 10 }}
                            size={responsiveFontSize(3)}
                        />
                    }
                />

                {renderConvInfo()}

                <MeetConversation
                    conv_list={chatitem.conv_list}
                    setFlatListRef={setFlatListRef}
                    authprofile={authprofile}
                    partnermeetprofile={chatitem.partnermeetprofile}
                />

                <InputBox
                    showAvatar={false}
                    placeholder={'Type a message'}
                    onChangeText={setInputTxt}
                    inputvalue={inputtxt}
                    multiline={true}
                    onSubmit={() => {
                        sendMeetConversation([
                            chatitem.conversation_id,
                            inputtxt
                        ]);
                        flatlistref && flatlistref.scrollToOffset({ offset: 0 });
                        setInputTxt('');
                    }}
                    leftIcon={{
                        onPress: () => { },
                        type: "entypo",
                        name: "images",
                        color: colors.text,
                        size: responsiveFontSize(4)
                    }}
                    rightIcon={{
                        size: responsiveFontSize(5.5)
                    }}
                    //maxLength={300}
                    autoFocus={false}
                    avatar={null}
                />
                </>
            );
        }
    }

    function setDismissNav() {
        Keyboard.dismiss();
        if (screentype == "screen")
            return Navigation.pop(componentId);
        else
            return Navigation.dismissModal(componentId)
    }

    /**COMPONENT FUNCTIONS */

    return (
        <SafeAreaView style={styles.containerStyle}>
            <View
                style={styles.containerStyle}>
                {renderView()}
            </View>
        </SafeAreaView>
    );
};

MeetupConversationScreen.options = {
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
    authprofile: state.profile,
    meetconvobj: state.meetupconvs
});

export default connect(mapStateToProps, actions)(MeetupConversationScreen);