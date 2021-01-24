import React, { useEffect, useState } from 'react';
import { Navigation, } from 'react-native-navigation';
import { StyleSheet, View, ActivityIndicator, SafeAreaView } from 'react-native';
import { responsiveWidth, useResponsiveWidth, responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { useTheme } from '../../assets/themes/index';
import { Icon, Avatar, Text, Button } from 'react-native-elements';
import { HeaderWithImage, InputBox, ScrollableListOverLay } from '../../components/reusable/ResuableWidgets';
import PrivateChats from '../../components/reusable/PrivateChats';
import { checkData, Toast, formatDate } from '../../utilities/index';

const { colors } = useTheme();
const PrivateChatScreen = ({
    componentId,
    addPrivateChat,
    sendPrivateChat,
    deleteAPrivateChat,
    addPrivateChatListReadArr,
    deleteOfflineActions,
    setPrivateChatFetchArr,
    getPrivateChatInfo,
    //removePrivateChatFetchArr,
    setPrivateChatForm,
    updatePrivateChatListChats,
    setPrivateChatLastFetchToRead,
    offlineactionslist,
    privatechatform,
    fetchPrivateChats,
    setReset,
    authprofile,
    privatechatobj
    }) => {
    const [loaded, setLoaded] = useState(false);
    const [chatinfovisible, setChatInfoVisible] = useState(false);
    const [flatlistref, setFlatListRef] = useState(null);
    const [initialscroll, setInitialScroll] = useState(false);
    const [inputtxt, setInputTxt] = useState('');
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
        setReset('privatechatform');
        if (!checkData(privatechatobj) ||
            !checkData(privatechatobj.chats) ||
            !Array.isArray(privatechatobj.last_fetch_arr) ||
            !checkData(privatechatobj.partnerprofile)
        ) {
            Toast('chat not found');
            Navigation.dismissModal(componentId);
        } else {
            updatePrivateChatListChats({
                create_chatid: privatechatobj.create_chatid,
                chats: [{ id: privatechatobj.chats[0].id, num_new_msg: null }]
            });
            setPrivateChatForm(privatechatobj, privatechatobj.create_chatid);
            fetchPrivateChats([privatechatobj.create_chatid, privatechatobj.last_fetch_arr]);
        }
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
            deleteOfflineActions([
                `fetchprivatechat${privatechatform.create_chatid}`,
                `setprivatechatarrread${privatechatform.create_chatid}`
            ]);
        };
    }, []);

    useEffect(() => {
        //console.warn('inside the effect', [privatechatform.fetchstatus, privatechatform.last_fetch_arr])
        if (privatechatform.last_fetch_arr.length > 0 && privatechatform.fetchstatus == '200') {
            // console.warn('in here', privatechatform.last_fetch_arr)
            addPrivateChatListReadArr(privatechatform.last_fetch_arr);
            setPrivateChatLastFetchToRead([
                privatechatform.create_chatid,
                privatechatform.last_fetch_arr
            ]);
        }
    }, [privatechatform.last_fetch_arr.toString()]);


    function renderView() {
        //console.warn(offlineactionslist);
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
            {/*<Button title="Press" onPress={() => {
                alert(formatDate(new Date().getTime(), 'd'));
            }} />*/}
            <HeaderWithImage
                avatarUri={{ uri: privatechatform.partnerprofile.avatar[1] || null }}
                onAvatarPress={() => {
                    Navigation.showModal({
                        component: {
                            name: 'ViewProfile',
                            passProps: {
                                navparent: true,
                                reqprofile: privatechatform.partnerprofile,
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
                    onPress={() => {
                        setChatInfoVisible(true);
                        getPrivateChatInfo(privatechatform.create_chatid)
                    }}
                    containerStyle={{ marginTop: 3, marginHorizontal: 10 }}
                    size={responsiveFontSize(3)}
                />}
                title={privatechatform.partnerprofile.profile_name}
                subTitle={'Last seen yesterday @ 2:13pm'}
            />
            <PrivateChats
                loaded={loaded}
                setFlatListRef={setFlatListRef}
                sendPrivateChat={sendPrivateChat}
                deletePrivateChat={deleteAPrivateChat}
                deleting={privatechatform.deleting}
                partnerprofile={privatechatform.partnerprofile}
                data={privatechatform.chats}
                userprofile={authprofile}
                loadingmore={privatechatform.loadingmore}
            />
            <InputBox
                showAvatar={false}
                placeholder={'Type a message'}
                onChangeText={setInputTxt}
                inputvalue={inputtxt}
                onSubmit={() => {
                    if (!checkData(inputtxt)) {
                        return;
                    }
                    flatlistref.scrollToOffset({ offset: responsiveHeight(100) });
                    sendPrivateChat({
                        create_chatid: privatechatform.create_chatid,
                        chatSchema: {
                            id: Math.round(new Date().getTime()),
                            partnerprofile: privatechatform.partnerprofile,
                            create_chatid: privatechatform.create_chatid,
                            sender_id: authprofile.profile_id,
                            read: "sending",
                            receiver_id: privatechatform.partnerprofile.profile_id,
                            created_at: `${Math.round(new Date().getTime())}`,
                            chat_msg: inputtxt
                        },
                        reqobj: {
                            chat_msg: inputtxt,
                            setread: 'ok',
                            receiver_id: privatechatform.partnerprofile.profile_id,
                        }
                    });
                    setInputTxt('');
                }}
                leftIcon={{
                    onPress: () => {
                    },
                    type: "entypo",
                    name: "images",
                    color: colors.text,
                    size: responsiveFontSize(4)
                }}
                maxLength={300}
                autoFocus={false}
                avatar={null}
            />
            <ScrollableListOverLay
                ListTitle={'Chat History'}
                onBackdropPress={() => setChatInfoVisible(false)}
                reLoad={() => getPrivateChatInfo(privatechatform.create_chatid)}
                visible={chatinfovisible}
                loading={privatechatform.fetchingchatinfo}
            >
                {showPrivateInfo()}
            </ScrollableListOverLay>
            </>
        );
    }

    function showPrivateInfo() {
        let info = privatechatform.privatechatinfo;
        if (checkData(info)) {
            return (
                <>
                <Text style={{ marginVertical: 5, color: colors.iconcolor, fontSize: responsiveFontSize(2) }}>
                    Chat started on : {info['init_date']}
                </Text>
                <Text style={{ marginVertical: 5, color: colors.iconcolor, fontSize: responsiveFontSize(2) }}>
                    Total Chats : {info['totalchats']}
                </Text>
                <Text style={{ marginVertical: 5, color: colors.iconcolor, fontSize: responsiveFontSize(2) }}>
                    Your Chat Contribution : {info['yoursentchats'] + ' out of ' + info['totalchats']}
                </Text>
                <Text style={{ marginVertical: 5, color: colors.iconcolor, fontSize: responsiveFontSize(2) }}>
                    Partner Chat Contribution : {info['partnersentchats'] + ' out of ' + info['totalchats']}
                </Text>
                <Text style={{ marginVertical: 5, color: colors.iconcolor, fontSize: responsiveFontSize(2) }}>
                    Your % Chat Contribution : {info['peryoursentchat'] + "%"}
                </Text>

                <Text style={{ marginVertical: 5, color: colors.iconcolor, fontSize: responsiveFontSize(2) }}>
                    Partner % Chat Contribution : {info['perothersentchats'] + "%"}
                </Text>
                </>
            )
        }
        return null;
    }

    /**component function ends here*/

    /**CONDITIONAL STATEMENTS */
    if (loaded != true && initialscroll == true) {
        setLoaded(true);
    }

    if (checkData(flatlistref) && initialscroll != true) {
        let height = responsiveHeight(100);
        setTimeout(() => {
            flatlistref.scrollToOffset({ offset: height, animated: false });
            setInitialScroll(true);
        }, 2000);



    }

    /**CONDITIONAL STATEMENTS */

    return (
        <SafeAreaView style={styles.containerStyle}>
            {renderView()}
        </SafeAreaView>
    );
};

const mapStateToProps = (state) => ({
    connected: state.network.isConnected,
    privatechatform: state.privatechatform,
    offlineactionslist: state.offlineactionslist,
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