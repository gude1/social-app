import React, { Component } from 'react';
import { FlatList, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Text, Icon, ListItem, Button } from 'react-native-elements';
import { useTheme } from '../../assets/themes/index';
import { ConfirmModal, ActivityOverlay, BottomListModal, PanelMsg, AvatarNavModal } from './ResuableWidgets';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { checkData, handleTime } from '../../utilities';
import EmojiData from '../../assets/static/EmojiList.json';
import TouchableScale from 'react-native-touchable-scale/src/TouchableScale';


const { colors } = useTheme();

class MeetRequestList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return true;
    }

    _setEmptyPlaceholder = () => {
        if (this.props.meetupreqobj.fetching == true) {
            return (
                <View style={{ height: 300, width: '100%', justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size="large" color={'silver'} />
                </View>
            );
        } else if (this.props.meetupreqobj.fetching == 'retry') {
            return (
                <View style={{
                    alignItems: "center",
                    justifyContent: "center",
                    //borderColor: "red",
                    //borderWidth: 3,
                    height: 300,
                    width: 300,
                }}>
                    <Text style={{
                        color: colors.iconcolor,
                        textAlign: "center",
                    }}>
                        Meet Request not fetched ,something went wrong
                    </Text>
                    <Button
                        type="outline"
                        onPress={() => this.props.fetchReqs()}
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
        } else {
            return (
                <View style={{
                    height: 300,
                    width: 300,
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
                    <Text style={{ color: colors.iconcolor, textAlign: "center" }}>
                        No request yet,you can adjust your request setting for a wider range
                    </Text>
                </View>
            );
        }

    };

    _setFooterComponent = () => {
        if (this.props.meetupreqobj.requests.length < 1) {
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
        } else if (this.props.meetupreqobj.loadingmore == 'retry') {
            return (
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    margin: 6,
                    alignItems: "center"
                }}>
                    <Icon
                        color={colors.text}
                        size={responsiveFontSize(4)}
                        onPress={() => this.props.fetchMoreReqs()}
                        name="sync"
                        type="antdesign"
                    />
                    <Text style={{ color: colors.border, fontSize: responsiveFontSize(1.5) }}>Tap to retry</Text>
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

    _getItemLayout = (data, index) => {
        if (index == -1) return { index, length: 0, height: 0 };
        return { length: this.resheight, offset: this.resheight * index, index }
    };

    renderItem = ({ item, index }) => {
        return (
            <ListItem
                containerStyle={styles.requestItemCtn}
                leftAvatar={{
                    source: { uri: item.requester_meet_profile.meetup_avatar }
                }}
                title={item.requester_meet_profile.meetup_name}
                titleStyle={{ color: colors.text }}
                rightTitle={
                    <Icon
                        type="antdesign"
                        Component={TouchableScale}
                        containerStyle={{ marginBottom: 10 }}
                        size={responsiveFontSize(4)}
                        name="ellipsis1"
                        color={colors.text}
                    />
                }
                rightSubtitle={item.request_mood}
                rightSubtitleStyle={styles.requestItemRightSubtitle}
                subtitle={item.request_msg}
                subtitleProps={{
                    ellipsizeMode: 'tail',
                    numberOfLines: 4
                }}
                subtitleStyle={styles.requestItemLeftSubtitle}
            />
        );
    };


    render() {
        return (
            <FlatList
                data={this.props.meetupreqobj.requests}
                keyExtractor={this._keyExtractor}
                //getItemLayout={this._getItemLayout}
                //onRefresh={onRefresh}
                //refreshing={refreshing}
                showsVerticalScrollIndicator={false}
                renderItem={this.renderItem}
                ListEmptyComponent={this._setEmptyPlaceholder()}
                ListFooterComponent={this._setFooterComponent()}
            />
        );
    }
}

const styles = StyleSheet.create({
    requestItemCtn: {
        margin: 10,
        width: responsiveWidth(90),
        maxWidth: 400,
        padding: 15,
        backgroundColor: colors.card,
        elevation: 3,
        borderRadius: 20
    },
    requestItemTitle: {

    },
    requestItemLeftSubtitle: {
        color: colors.placeholder
    },
    requestItemRightSubtitle: {
        color: colors.text,
        fontSize: responsiveFontSize(3)
    }
});

export default MeetRequestList; 