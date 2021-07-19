import React, { Component } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Text, Button, Icon } from 'react-native-elements';
import { useTheme } from '../../assets/themes/index';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { isEmpty } from '../../utilities/index';
import ParsedText from 'react-native-parsed-text';

const { colors } = useTheme();

const PressableWrapper = Animatable.createAnimatableComponent(TouchableOpacity);

class MeetConversationItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
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
                        <Text style={styles.othersChatTime}>{item.created_at}</Text>
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
        fontSize: responsiveFontSize(1.5)
    },
});

export default MeetConversation;