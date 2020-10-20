import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ActivityIndicator, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Header } from '../../components/reusable/ResuableWidgets';
import { useTheme } from '../../assets/themes';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { Navigation } from 'react-native-navigation';
import { responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import PrivateChatList from '../../components/reusable/PrivateChatList';

const { colors } = useTheme();

const PrivateChatScreen = ({
    componentId,
    privatechatlist,
    fetchPrivateChatList,
    addPrivateChatList,
    profile,
}) => {
    const [loaded, setLoaded] = useState(false);
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
    /*Navigation.mergeOptions(componentId, {
        bottomTabs: {
            visible: true,
        }
    });*/
    /**compoent function goes here */
    useEffect(() => {
        EntypoIcon.getImageSource('chat', 100).then(e =>
            Navigation.mergeOptions(componentId, {
                bottomTab: {
                    icon: e,
                }
            }));
        if (privatechatlist.chatlist.length < 1 && privatechatlist.persistedchatlist.length > 0) {
            addPrivateChatList(privatechatlist.persistedchatlist);
        }
        fetchPrivateChatList();
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
    //function to determine dismiss of navigation based on screentype
    function setDismissNav() {
        if (screentype == "modal")
            return Navigation.dismissModal(componentId)
        else
            return Navigation.pop(componentId);
    }

    const renderView = () => {
        if (loaded == false) {
            return (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size="large" color="silver" />
                </View>
            );
        } else if (loaded == true) {
            return (
                <View style={styles.contentContainerStyle}>
                    <PrivateChatList
                        chatlistform={privatechatlist}
                        fetchList={fetchPrivateChatList}
                        userprofile={profile}
                    />
                </View>
            );
        }
    }

    /**compoent function ends here */
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
            {renderView()}
        </SafeAreaView>

    );
};
PrivateChatScreen.options = {
    topBar: {
        visible: false
    },
    bottomTabs: {
        visible: true
    },
    bottomTab: {
        text: 'Chat',
    }

};

const mapStateToProps = (state) => ({
    profile: state.profile,
    privatechatlist: state.privatechatlist,
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

export default connect(mapStateToProps, actions)(PrivateChatScreen);