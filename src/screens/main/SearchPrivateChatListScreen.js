import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ActivityIndicator, Text, View } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { Header, InputBox } from '../../components/reusable/ResuableWidgets';
import { LoaderScreen } from '../../components/reusable/ResuableWidgets';
import { useTheme } from '../../assets/themes';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Navigation } from 'react-native-navigation';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import ProfileList2 from '../../components/reusable/ProfileList2';

const { colors } = useTheme();

const SearchPrivateChatListScreen = ({
    componentId,
    authprofile,
    offlineactionslist,
    searchprivatechatlist,
    searchPrivateChatList,
    searchMorePrivateChatList,
    updateSearchPrivateChatList,
    setReset,
 }) => {
    const [inputtxt, setInputTxt] = useState('');
    /**COMPONENT FUNCTION STARTS HERE */
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
            setReset('searchprivatechatlist');
            // Make sure to unregister the listener during cleanup
            unsubscribe.remove();
        };
    }, []);

    const setEmptyPlaceholder = () => {
        switch (searchprivatechatlist.searching) {
            case true:
                return (
                    <View style={{
                        flexDirection: "row",
                        height: responsiveHeight(60),
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <ActivityIndicator size={20} color={'silver'} />
                        <Text style={{
                            marginHorizontal: 5,
                            fontSize: responsiveFontSize(2.1),
                            color: colors.border
                        }}>
                            Searching
                    </Text>
                    </View>
                );
                break;
            case 'none c':
                return (
                    <View style={{ alignItems: "center", justifyContent: "center", height: responsiveHeight(60) }}>
                        <View style={{ flexDirection: "row", }}>
                            <Icon
                                color={colors.border}
                                name={"exclamation"}
                                size={responsiveFontSize(8)}
                                type={"evilicon"}
                            />
                        </View>
                        <Text style={{ color: colors.border, textAlign: 'center' }}>
                            No results found on local search, please check your internet connectivity
                    </Text>
                    </View>
                );
                break;
            case 'failed':
                return (
                    <View style={{ alignItems: "center", justifyContent: "center", height: responsiveHeight(60) }}>
                        <View style={{ flexDirection: "row", }}>
                            <Icon
                                color={colors.border}
                                name={"exclamation"}
                                size={responsiveFontSize(8)}
                                type={"evilicon"}
                            />
                        </View>
                        <Text style={{ color: colors.border, textAlign: 'center' }}>
                            Something went wrong, please try again
                    </Text>
                    </View>
                );
                break;
            case 'none':
                return (
                    <View style={{ alignItems: "center", justifyContent: "center", height: responsiveHeight(60) }}>
                        <View style={{ flexDirection: "row", }}>
                            <Icon
                                color={colors.border}
                                name={"exclamation"}
                                size={responsiveFontSize(8)}
                                type={"evilicon"}
                            />
                        </View>
                        <Text style={{ color: colors.border, textAlign: 'center' }}>
                            No results found
                </Text>
                    </View>
                );
                break;
            case 'none':
                return (
                    <View style={{ alignItems: "center", justifyContent: "center", height: responsiveHeight(60) }}>
                        <View style={{ flexDirection: "row", }}>
                            <Icon
                                color={colors.border}
                                name={"exclamation"}
                                size={responsiveFontSize(8)}
                                type={"evilicon"}
                            />
                        </View>
                        <Text style={{ color: colors.border, textAlign: 'center' }}>
                            No results found
                </Text>
                    </View>
                );
                break;
            default:
                return (
                    <View style={{ alignItems: "center", justifyContent: "center", height: responsiveHeight(60) }}>
                        <View style={{ flexDirection: "row", }}>
                            <Icon
                                color={colors.border}
                                name={"search"}
                                size={responsiveFontSize(8)}
                                type={"evilicon"}
                            />
                            <Icon
                                color={colors.border}
                                name={"comment"}
                                size={responsiveFontSize(8)}
                                type={"evilicon"}
                            />
                        </View>
                        <Text style={{ color: colors.border, textAlign: 'center' }}>
                            Search for people you have a chat history with
                        </Text>
                    </View>
                );
                break;
        }
    };

    /**COMPONENT FUNCTION ENDS HERE */

    return (
        <View style={styles.containerStyle}>
            <InputBox
                style={{ borderTopWidth: 0 }}
                showAvatar={false}
                inputvalue={inputtxt}
                autoFocus={true}
                onChangeText={setInputTxt}
                leftIcon={{
                    type: "antdesign",
                    onPress: () => Navigation.dismissModal(componentId),
                    name: "arrowleft",
                    size: responsiveFontSize(4),
                    color: colors.text
                }}
                rightIcon={{
                    size: responsiveFontSize(6),
                }}
                onSubmit={() => {
                    setReset('searchprivatechatlist');
                    searchPrivateChatList(inputtxt);
                }}
                placeholder={'Search here...'}
            />
            <View style={{ flex: 1 }}>
                <ProfileList2
                    data={searchprivatechatlist.searchresults}
                    fetching={searchprivatechatlist.searching}
                    updateItem={updateSearchPrivateChatList}
                    onPress={(item) => {
                        Navigation.showModal({
                            component: {
                                name: 'PrivateChat',
                                passProps: {
                                    navparent: true,
                                    privatechatobj: { partnerprofile: item.profile },
                                    screentype: 'modal'
                                },
                            }
                        })
                    }}
                    onLoadMore={() => { () => searchMorePrivateChatList() }}
                    loadingmore={searchprivatechatlist.loadingmore}
                    placeholder={setEmptyPlaceholder()}
                />
            </View>
        </View>
    );
};

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

const mapStateToProps = (state) => ({
    authprofile: state.profile,
    searchprivatechatlist: state.searchprivatechatlist,
    offlineactions: state.offlineactionslist
});

export default connect(mapStateToProps, actions)(SearchPrivateChatListScreen);

