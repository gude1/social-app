import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { Avatar, Button, Input, Icon, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { useTheme } from '../../assets/themes/index';
import { HeaderWithImage } from '../../components/reusable/ResuableWidgets';
import { Navigation } from 'react-native-navigation';
import { isEmpty } from '../../utilities/index';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const { colors } = useTheme();

const MeetupConversationScreen = ({
    navparent,
    chatitem,
    screentype,
    componentId
}) => {
    /**COMPONENT FUNCTIONS */
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
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
            // Make sure to unregister the listener during cleanup
            unsubscribe.remove();
        };
    }, []);

    function renderView() {
        if (isEmpty(chatitem) ||
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
                            name: 'arrow-right',
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
                            padding: 10
                        }}
                    />
                </View>
            );
        } else {
            return (
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
                            size={responsiveFontSize(4)}
                        />
                    }
                />
            );
        }
    }

    function setDismissNav() {
        if (screentype == "screen")
            return Navigation.pop(componentId);
        else
            return Navigation.dismissModal(componentId)
    }
    /**COMPONENT FUNCTIONS */
    return (
        <SafeAreaView style={styles.containerStyle}>
            {renderView()}
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
});

export default connect(mapStateToProps, actions)(MeetupConversationScreen);