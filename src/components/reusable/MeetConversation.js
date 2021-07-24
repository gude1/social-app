import React, { Component } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Text, Button, Icon } from 'react-native-elements';
import { useTheme } from '../../assets/themes/index';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { isEmpty } from '../../utilities/index';
import moment from 'moment';
import ParsedText from 'react-native-parsed-text';

const { colors } = useTheme();

const PressableWrapper = Animatable.createAnimatableComponent(TouchableOpacity);

class MeetConversationItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.ownerchattextcolor = "#181818";
        this.ownerchatbgcolor = "rgb(237,237,237)";

        if (colors.theme == "black") {
            this.ownerchatbgcolor = colors.border;
            this.ownerchattextcolor = colors.text;
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.props.item.id != nextProps.item.id ||
            (
                this.props.item.id == nextProps.item.id &&
                this.props.item.status != nextProps.item.status
            )
        ) {
            return true;
        }

        return false;
    }

    renderOwnerChat = () => {
        let { item } = this.props;
        if (checkData(item.chat_msg) &&
            (!Array.isArray(item.chat_pic) || item.chat_pic.length < 1)
        ) {
            return (
                <Animatable.View
                    animation={'slideInRight'}
                    useNativeDriver={true}
                >
                    <View style={{ marginVertical: 5, alignItems: "flex-end" }}>
                        <ParsedText style={[styles.ownerChatText, {
                            color: this.ownerchattextcolor,
                            backgroundColor: this.ownerchatbgcolor
                        }]}>
                            {item.chat_msg}
                        </ParsedText>
                        {this.renderCheck(item)}
                    </View >
                </Animatable.Viewy>
            );
        }
    }

    renderCheck = (item) => {
        if (!checkData(item) || item.sender_id != this.props.authprofile.profile_id) {
            return null;
        }

        if (item.status == "read") {
            return (
                <Text style={{
                    color: "#a0a0a0",
                    marginHorizontal: 25,
                    textAlign: "justify",
                    fontSize: responsiveFontSize(1.2),
                }}>
                    {item.created_at}  <Text style={{ letterSpacing: -1, color: colors.blue }}>√√</Text>
                </Text>
            );
        } else if (item.status == "delievered") {
            return (
                <Text style={{
                    color: "#a0a0a0",
                    marginHorizontal: 25,
                    textAlign: "justify",
                    fontSize: responsiveFontSize(1.2),
                }}>
                    {item.created_at}  <Text style={{ letterSpacing: -1, }}>√√</Text>
                </Text>
            );
        } else if (item.status == "sending") {
            return (
                <Text style={{
                    color: "#a0a0a0",
                    marginHorizontal: 25,
                    textAlign: "justify",
                    fontSize: responsiveFontSize(1.2),
                }}><Text style={{ letterSpacing: -1, }}>sending...</Text>
                </Text>
            );
        } else if (item.status == "failed") {
            return (
                <Icon
                    type="antdesign"
                    name="clockcircleo"
                    iconStyle={{
                        color: "#a0a0a0", fontWeight: "bold", textAlign: "justify"
                    }}
                    size={responsiveFontSize(2)}
                    containerStyle={{
                        marginTop: 2, marginHorizontal: 25
                    }}
                />
            );
        } else {
            return (
                <Text style={{
                    color: "#a0a0a0",
                    marginHorizontal: 25,
                    textAlign: "justify",
                    fontSize: responsiveFontSize(1.2),
                }}>{item.created_at}  <Text style={{ letterSpacing: -1, }}>√</Text>
                </Text>
            );
        }
    };

    formatConvTime = (time) => {
        if (isEmpty(time)) {
            return time;
        }
        return moment(time).format('MMM DD YYYY @ h:mm a');
    }

    renderPartnerChat = () => {
        let { item } = this.props;
        if (
            !isEmpty(item.chat_msg) &&
            (!Array.isArray(item.chat_pic) || isEmpty(item.chat_pic))
        ) {
            return (
                <Animatable.View
                    animation={'slideInLeft'}
                    useNativeDriver={true}
                >
                    <View style={{ marginVertical: 5, alignItems: "flex-start" }}>
                        <ParsedText
                            style={styles.othersChatText}
                        >
                            {item.chat_msg}
                        </ParsedText>
                        <Text style={styles.othersChatTime}>
                            {this.formatConvTime(item.created_at * 1000)}
                        </Text>
                    </View>
                </Animatable.View>
            );
        }
    }

    render() {
        let content = this.renderPartnerChat();
        return (
            content
        );
    }
}






class MeetConversation extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getItemLayout = (data, index) => {
        if (index == -1) return { index, length: 0, height: 0 };
        return { length: 150, offset: 150 * index, index }
    };

    keyExtractor = (item, index) => String(item.id);

    returnHeaderComponent = () => {
        if (
            this.props.loading == false ||
            !Array.isArray(this.props.conv_list) ||
            this.props.conv_list.length < 1
        ) {
            return null;
        }

        if (this.props.loadingmore == true) {
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        marginTop: 15,
                        alignItems: "center"
                    }}>
                    <ActivityIndicator size={30} color={'silver'} />
                </View>
            );
        } else {
            return (
                <Button
                    onPress={() => { }}
                    type="clear"
                    icon={{
                        name: 'plus',
                        type: "evilicon",
                        size: responsiveFontSize(4),
                        color: colors.text
                    }}
                    titleStyle={{
                        color: colors.text,
                        fontSize: responsiveFontSize(2)
                    }}
                    buttonStyle={{
                        alignSelf: 'center',
                        borderColor: colors.iconcolor,
                        borderRadius: 15,
                        padding: 10
                    }}
                />
            );
        }
    };

    renderItem = ({ item }) => {
        return (
            <MeetConversationItem
                item={item}
                authprofile={this.props.authprofile}
            />
        );
    };


    render() {
        let { conv_list } = this.props;
        let data = conv_list.sort((item1, item2) => item2.id - item1.id);

        return (
            <FlatList
                data={data}
                contentContainerStyle={{ marginTop: 10 }}
                renderItem={this.renderItem}
                inverted
                ListFooterComponent={this.returnHeaderComponent()}
                keyboardShouldPersistTaps='always'
                keyboardDismissMode={'on-drag'}
                keyExtractor={this.keyExtractor}
            />
        );
    }
}


const styles = StyleSheet.create({
    ownerChatText: {
        marginHorizontal: 20,
        fontSize: responsiveFontSize(2.1),
        textAlign: "justify",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 12,
        borderBottomLeftRadius: 30,
        minWidth: 50,
        maxWidth: responsiveWidth(70)
    },
    othersChatText: {
        borderWidth: 1,
        borderColor: colors.border,
        marginHorizontal: 20,
        fontSize: responsiveFontSize(2.1),
        color: colors.text,
        textAlign: "justify",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 30,
        padding: 12,
        minWidth: 50,
        maxWidth: responsiveWidth(70)
    },
    othersChatTime: {
        marginHorizontal: 25,
        textAlign: "justify",
        color: "#a0a0a0",
        fontSize: responsiveFontSize(1.2)
    },
});

export default MeetConversation;