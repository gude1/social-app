import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ActivityIndicator, Text, View } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { Header } from '../../components/reusable/ResuableWidgets';
import { LoaderScreen } from '../../components/reusable/ResuableWidgets';
import { useTheme } from '../../assets/themes';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { Navigation } from 'react-native-navigation';
import { responsiveHeight, responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import PrivateChatList from '../../components/reusable/PrivateChatList';

const { colors } = useTheme();

const PrivateChatListScreen = ({
    componentId,
    privatechatlistform,
    test1,
    addOfflineAction,
    setChatListArrayRead,
    offlineactions,
    //setProcessing,
    fetchPrivateChatList,
    fetchPreviousChatList,
    pinPrivateChatList,
    unPinPrivateChatList,
    delPrivateChatList,
    addPrivateChatList,
    profile,
}) => {
    const [loaded, setLoaded] = useState(false);
    let requestmade = false;
    let righticon = <Icon
        type="antdesign"
        name="plus"
        style={{ borderWidth: 2, padding: 2, borderRadius: 10, borderColor: colors.text }}
        color={colors.text}
        size={responsiveFontSize(2.5)}
    />;
    let righticonpress = null;
    let righticon2 = <Icon
        type="antdesign"
        name="search1"
        color={colors.text}
        size={responsiveFontSize(3.5)}
    />;
    let righticon2press = null;
    /**compoent function goes here */

    useEffect(() => {
        EntypoIcon.getImageSource('chat', 100).then(e =>
            Navigation.mergeOptions(componentId, {
                bottomTab: {
                    icon: e,
                }
            }));
        Navigation.mergeOptions(componentId, {
            bottomTabs: {
                visible: true,
            }
        });

        if (privatechatlistform.chatlist.length < 1 && privatechatlistform.persistedchatlist.length > 0) {
            addPrivateChatList(privatechatlistform.persistedchatlist);
        }
        if (privatechatlistform.tosetreadarr.length > 0) {
            setChatListArrayRead([() => fetchPrivateChatList(), null]);
        } else {
            fetchPrivateChatList();
        }

        const listener = {
            componentDidAppear: () => {
                setLoaded(true);
                Navigation.mergeOptions(componentId, {
                    bottomTabs: {
                        visible: true,
                    }
                });

                //console.warn(privatechatlistform);

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
    //function to determine dismiss of navigation based on screentype
    function setDismissNav() {
        if (screentype == "modal")
            return Navigation.dismissModal(componentId)
        else
            return Navigation.pop(componentId);
    }

    const renderView = () => {
        //console.warn(privatechatlistform.each_chat_arr);
        if (loaded == false) {
            return (
                <LoaderScreen
                    animationOff={true}
                    //showLoading={true}
                    loaderIcon={<Icon
                        type="entypo"
                        name="chat"
                        color={colors.text}
                        size={responsiveFontSize(8)}
                    />}
                    animationType={'zoomIn'}
                />
            );
        } else if (loaded == true) {
            return (
                <View style={styles.contentContainerStyle}>
                    <PrivateChatList
                        chatlistform={privatechatlistform}
                        fetchList={fetchPrivateChatList}
                        fetchMoreList={fetchPreviousChatList}
                        deletePrivateChatList={delPrivateChatList}
                        pinPrivateChatList={pinPrivateChatList}
                        unPinPrivateChatList={unPinPrivateChatList}
                        userprofile={profile}
                    />
                </View>
            );
        }
    }
    /**compoent function ends here */
    //console.warn(offlineactions);
    return (
        <SafeAreaView style={styles.containerStyle}>
            <Header
                headertext="PrivateChat"
                headercolor={colors.card}
                headerTextStyle={{ color: colors.text }}
                headerStyle={{ elevation: 1 }}
                headertextsize={responsiveFontSize(2.9)}
                righticon={righticon}
                rightIconPress={righticonpress}
                righticon2={righticon2}
            />
            {/*<Button
                title="Press"
                onPress={() => {
                    addOfflineAction({
                        id: 'setchatlistreadarr1344',
                        funcName: 'test1',
                        param: [],
                        override: true,
                        persist: true,
                    })
                }}
            />*/}
            {renderView()}
        </SafeAreaView>

    );
};
PrivateChatListScreen.options = {
    topBar: {
        visible: false
    },
    bottomTabs: {
        visible: true
    },
    bottomTab: {
        text: 'Chat',
    },
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    privatechatlistform: state.privatechatlistform,
    offlineactions: state.offlineactionslist
});
const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: colors.background
    },
    contentContainerStyle: {
        flex: 1,
        marginTop: 5,
        marginBottom: 55,
        backgroundColor: colors.background,
    },
});

export default connect(mapStateToProps, actions)(PrivateChatListScreen);