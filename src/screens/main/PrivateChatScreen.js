import React, { useEffect, useState } from 'react';
import { Navigation, } from 'react-native-navigation';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { responsiveWidth, useResponsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { useTheme } from '../../assets/themes/index';
import { Icon, Avatar, Text } from 'react-native-elements';
import { HeaderWithImage, InputBox } from '../../components/reusable/ResuableWidgets';
import PrivateChats from '../../components/reusable/PrivateChats';
import { checkData, Toast } from '../../utilities/index';

const { colors } = useTheme();
const PrivateChatScreen = ({
    componentId,
    setPrivateChatForm,
    privatechatform,
    setReset,
    authprofile,
    privatechatobj
    }) => {
    const [loaded, setLoaded] = useState(false);
    privatechatform = !checkData(privatechatform.partnerprofile) ? privatechatobj : privatechatform;
    /**component function starts here */
    Navigation.mergeOptions(componentId, {
        animations: {
            showModal: {
                waitForRender: true,
                alpha: {
                    from: 0,
                    to: 1,
                    duration: 10000
                }
            }
        }
    });
    useEffect(() => {
        if (!checkData(privatechatobj) ||
            !checkData(privatechatobj.chats) ||
            !checkData(privatechatobj.partnerprofile)
        ) {
            Toast('chat not found');
            Navigation.dismissModal(componentId);
        } else {
            setPrivateChatForm(privatechatobj);
        }
        const listener = {
            componentDidAppear: () => {
                if (!loaded) {
                    setTimeout(() => {
                        setLoaded(true);
                    }, 500);
                }
            },
            componentDidDisappear: () => {
            }

        };
        // Register the listener to all events related to our component
        const unsubscribe = Navigation.events().bindComponent(listener, componentId);
        return () => {
            // Make sure to unregister the listener during cleanup
            setReset('privatechatform');
            unsubscribe.remove();
        };
    }, []);

    function renderView() {
        if (!checkData(privatechatobj) ||
            !checkData(privatechatobj.chats) ||
            !checkData(privatechatobj.partnerprofile)
        ) {
            Toast('chat not found');
            Navigation.dismissModal(componentId);
            return;
        }
        return (
            <>
            <HeaderWithImage
                avatarUri={{ uri: privatechatform.partnerprofile.avatar[1] }}
                Icon1={
                    <Icon
                        type="evilicon"
                        name="arrow-left"
                        color={colors.text}
                        onPress={() => Navigation.dismissModal(componentId)}
                        containerStyle={{ marginRight: 15 }}
                        size={responsiveFontSize(5)}
                    />}
                Icon2={<Icon
                    type="antdesign"
                    name="downcircleo"
                    color={colors.text}
                    onPress={() => alert('You tears are delicious :)')}
                    containerStyle={{ marginTop: 3, marginHorizontal: 10 }}
                    size={responsiveFontSize(3)}
                />}
                Icon3={<Icon
                    type="antdesign"
                    name="infocirlceo"
                    color={colors.text}
                    onPress={() => alert('You tears are delicious :)')}
                    containerStyle={{ marginTop: 3, marginHorizontal: 10 }}
                    size={responsiveFontSize(3)}
                />}
                title={privatechatform.partnerprofile.profile_name}
                subTitle={'Last seen yesterday @ 2:13pm'}
            />
            <PrivateChats
                loaded={loaded}
                data={privatechatform.chats}
                userprofile={authprofile}
                loadingmore={privatechatform.loadingmore}
            />
            <InputBox
                //style={{}}
                placeholder={'Type a message'}
                onChangeText={() => { }}
                //inputvalue={}
                onSubmit={() => {
                }}
                maxLength={300}
                autoFocus={false}
                avatar={null}
            />
            </>
        );
    }
    /**component function ends here*/
    return (
        <SafeAreaView style={styles.containerStyle}>
            {renderView()}
        </SafeAreaView>
    );
};

const mapStateToProps = (state) => ({
    connected: state.network.isConnected,
    privatechatform: state.privatechatform,
    authprofile: state.profile,
});

PrivateChatScreen.options = {
    animations: {
        showModal: {
            waitForRender: true,
            translationX: {
                from: responsiveWidth(100),
                to: 0,
                duration: 100
            }
        },
        dismissModal: {
            translationX: {
                from: 0,
                to: responsiveWidth(100),
                duration: 100
            }
        }
    }
};


const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: colors.background,
    }
});

export default connect(mapStateToProps, actions)(PrivateChatScreen);