import React, { Component } from 'react';
import { FlatList, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Text, Icon, Button } from 'react-native-elements';
import { useTheme } from '../../assets/themes/index';
import { ConfirmModal, ModalList, ActivityOverlay, BottomListModal, PanelMsg, AvatarNavModal, ListItem } from './ResuableWidgets';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { checkData, handleTime, hasProperty, isEmpty, customAlert } from '../../utilities';
import * as Animatable from 'react-native-animatable';
import EmojiData from '../../assets/static/EmojiList.json';
import TouchableScale from 'react-native-touchable-scale/src/TouchableScale';

const { colors } = useTheme();

class BottomContainerItem extends Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.props.request_mood != nextProps.request_mood ||
            this.props.campus != nextProps.campus ||
            this.props.request_category || nextProps.request_category ||
            this.props.created_at || nextProps.created_at) {
            return true;
        }
        return false;
    }
    render() {
        const { request_mood, campus, request_category, created_at } = this.props;
        return (
            <View style={{
                paddingVertical: 5,
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-between"
            }}>
                <Animatable.Text
                    animation={'slideInUp'}
                    style={{ color: colors.iconcolor, textAlign: "center" }}
                    useNativeDriver={true}>
                    {created_at}
                </Animatable.Text>

                <Animatable.Text
                    animation={'slideInUp'}
                    style={{ color: colors.text, textAlign: "center" }}
                    useNativeDriver={true}>
                    {request_mood}
                </Animatable.Text>

                <Animatable.Text
                    animation={'slideInUp'}
                    style={{ color: colors.text, textAlign: "center" }}
                    useNativeDriver={true}>
                    {campus}
                </Animatable.Text>

                <Animatable.Text
                    animation={'slideInUp'}
                    style={{ color: colors.iconcolor }}
                    useNativeDriver={true}>
                    {request_category} request
                </Animatable.Text>
            </View>
        );
    }

}


class MeetRequestList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showmeetoptions: false,
        };
        this.currentselectmeet = null;
        this.play = !isEmpty(this.currentselectmeet) ? "exist" : "lowman";
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return true;
    }

    _setEmptyPlaceholder = () => {
        let fetching = this.props.myrequests ? this.props.meetupreqobj.myreqfetching : this.props.meetupreqobj.fetching;
        if (fetching == true) {
            return (
                <View style={{ height: responsiveHeight(70), width: '100%', justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size="large" color={'silver'} />
                </View>
            );
        } else {
            return (
                <View style={{
                    alignItems: "center",
                    justifyContent: "center",
                    height: responsiveHeight(70),
                    width: '100%',
                }}>
                    <Text style={{
                        color: colors.iconcolor,
                        width: '70%',
                        textAlign: "center",
                    }}>
                        {this.props.myrequests ?
                            'Your meets not fetched'
                            : 'Meets not fetched'}
                    </Text>
                    <Button
                        type="outline"
                        onPress={this.props.fetchReqs}
                        icon={{
                            name: 'sync',
                            type: "antdesign",
                            size: responsiveFontSize(2),
                            color: colors.iconcolor
                        }}
                        title="Tap to retry"
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
        } /*else {
            return (
                <View style={{
                    height: responsiveHeight(70),
                    width: '100%',
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Icon
                        name="meh"
                        type={"antdesign"}
                        color={colors.iconcolor}
                        iconStyle={{ marginVertical: 5 }}
                        size={responsiveFontSize(5)}
                    />
                    <Text style={{
                        width: '70%',
                        color: colors.iconcolor,
                        textAlign: "center"
                    }}>
                        {this.props.myrequests ?
                            'You have no recent meets'
                            : 'No meets yet, try adjusting your meet setting for a wider range'
                        }
                    </Text>
                </View>
            );
        }*/

    };

    _setFooterComponent = () => {
        if (this.props.meetupreqobj.requests.length < 1 || !checkData(this.props.fetchMoreReqs)) {
            return null;
        }
        if (this.props.meetupreqobj.loadingmore == true) {
            return (
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    margin: 6,
                    alignItems: "center"
                }}>
                    <ActivityIndicator
                        size={30}
                        color={colors.border} />
                </View>
            );
        } else if (this.props.meetupreqobj.loadingmore == false) {
            return (
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    margin: 10,
                    alignItems: "center"
                }}>
                    <Icon
                        color={colors.text}
                        size={responsiveFontSize(5)}
                        onPress={() => this.props.fetchMoreReqs()}
                        name="plus"
                        type="evilicon"
                    />
                </View>
            );
        } else {
            return null;
        }
    };

    _keyExtractor = (item, index) => index.toString();

    _returnMeetOptions = () => {
        if (!isEmpty(this.currentselectmeet) && !isEmpty(this.currentselectmeet.requester_profile)) {
            return this.currentselectmeet.requester_profile.profile_id == this.props.authprofile.profile_id ?
                [
                    {
                        title: "Delete Meet",
                        onPress: () => {
                            this.setState({ showmeetoptions: false });
                            customAlert('Delete Meet?', null, () => {
                                checkData(this.props.deleteMeetReq) &&
                                    this.props.deleteMeetReq(this.currentselectmeet.request_id);
                            });
                        }
                    },
                ] : [
                    {
                        title: "Remove Meet",
                        onPress: () => {
                            this.setState({ showmeetoptions: false });
                            customAlert('Remove Meet?', null, () => {
                                checkData(this.props.deleteMeetReq) &&
                                    this.props.deleteMeetReq(this.currentselectmeet.request_id)
                            });
                        }
                    },
                    {
                        title: "Mute Meets from this profile",
                        onPress: () => {
                            this.setState({ showmeetoptions: false });
                            //alert(JSON.stringify(this.currentselectmeet));
                            checkData(this.props.blackList) &&
                                this.props.blackList(this.currentselectmeet.requester_id)
                        }
                    },
                ];
        }
        return [];
    }
    _onItemOptionSelected = () => {
        this.setState({ showmeetoptions: true });
    }


    renderItem = ({ item, index }) => {
        if (!hasProperty(item, ['requester_meet_profile']) ||
            !hasProperty(item, ['requester_profile']) ||
            !hasProperty(item.requester_profile, ['user'])
        ) {
            return (
                <PanelMsg
                    message={'This meet request is unavailable'}
                />
            );
        } else if (checkData(this.props.meetupreqobj.blacklist) && this.props.meetupreqobj.blacklist.includes(item.request_id)) {
            return null;
        }
        let leftavatar = isEmpty(item.requester_meet_profile.meetup_avatar) ? null : { uri: item.requester_meet_profile.meetup_avatar };
        let created_at = item.creating == true ? "creating" :
            item.creating == "retry" ? "Tap to retry" : item.created_at;
        return (
            <View
                style={{ flex: 1 }}>
                <ListItem
                    onPress={item.creating == "retry" ? item.retry : null}
                    containerStyle={styles.requestItemCtn}
                    leftAvatar={leftavatar}
                    title={item.requester_meet_profile.meetup_name}
                    titleStyle={{ color: colors.iconcolor }}
                    likeButtonComponent={
                        <Animatable.View
                            animation={'slideInRight'}
                            style={{ alignItems: "center", justifyContent: "center" }}
                            useNativeDriver={true}>
                            <Icon
                                type="antdesign"
                                Component={TouchableScale}
                                containerStyle={{ marginBottom: 10 }}
                                onPress={() => {
                                    this.currentselectmeet = item;
                                    this._onItemOptionSelected();
                                }}
                                size={responsiveFontSize(4)}
                                name="ellipsis1"
                                color={colors.text}
                            />
                        </Animatable.View>
                    }
                    likebtn={true}
                    subtitle={`   ${item.request_msg}`}
                    subtitleStyle={{ fontWeight: 'bold' }}
                    BottomContainerItem={
                        <BottomContainerItem
                            request_category={item.request_category}
                            request_mood={item.request_mood}
                            campus={item.requester_profile.campus}
                            created_at={created_at}
                        />
                    }
                />
            </View>
        );
    };


    render() {
        let { meetupreqobj, myrequests } = this.props;
        let refreshing = meetupreqobj.fetching ?
            (meetupreqobj.fetching == "retry" ? false : meetupreqobj.fetching)
            : (false);
        return (
            <>
            <FlatList
                data={myrequests ? meetupreqobj.myrequests : meetupreqobj.requests}
                keyExtractor={this._keyExtractor}
                initialNumRender={5}
                //windowSize={50}
                refreshing={meetupreqobj.requests.length > 0 ? refreshing : false}
                onRefresh={meetupreqobj.requests.length > 0 ? this.props.fetchReqs : null}
                getItemLayout={this._getItemLayout}
                showsVerticalScrollIndicator={false}
                renderItem={this.renderItem}
                ListEmptyComponent={this._setEmptyPlaceholder()}
                ListFooterComponent={this._setFooterComponent()}
            />
            <ModalList
                optionsArr={this._returnMeetOptions()}
                isVisible={this.state.showmeetoptions}
                onBackdropPress={() => this.setState({ showmeetoptions: false })}
            />
            <ActivityOverlay
                isVisible={meetupreqobj.blacklisting}
                text={'processing'}
            />

            <ActivityOverlay
                isVisible={meetupreqobj.deleting}
                text={'deleting'}
            />
            </>
        );
    }
}

const styles = StyleSheet.create({
    requestItemCtn: {
        margin: 10,
        width: responsiveWidth(90),
        // borderWidth: 3,
        //borderColor: "green",
        maxWidth: 400,
        padding: 15,
        backgroundColor: colors.card,
        elevation: 1.8,
        borderRadius: 20
    },
    requestItemTitle: {
        color: colors.text,
        fontSize: responsiveFontSize(1.8),
    },
    requestItemSubtitle: {
        color: colors.placeholder,
        fontSize: responsiveFontSize(1.5)
    },
    requestItemRightSubtitle: {
        color: colors.text,
        textAlign: "center",
        fontSize: responsiveFontSize(2)
    }

});

export default MeetRequestList; 