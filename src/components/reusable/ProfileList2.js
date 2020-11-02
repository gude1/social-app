import React, { Component } from 'react';
import { StyleSheet, FlatList, View, ActivityIndicator, Text } from 'react-native';
import { ListItem, Button, Icon } from 'react-native-elements';
import { useTheme } from '../../assets/themes/index';
import { responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { checkData } from '../../utilities/index';
import { AvatarNavModal } from './ResuableWidgets';
import { Navigation } from 'react-native-navigation';
import TouchableScale from 'react-native-touchable-scale/src/TouchableScale';

const { colors } = useTheme();

class ProfileList2Item extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return true;
        if (this.props.avatar != nextProps.avatar || this.props.username != nextProps.username) {
            return true;
        };
        return false;
    }

    render() {
        const { avatar, username, bio, gender, containerStyle, leftAvatarPress, onPress } = this.props;
        return (
            <ListItem
                leftAvatar={{
                    source: { uri: avatar },
                    onPress: () => { },
                    size: 35,
                }}
                Component={TouchableScale}
                contentContainerStyle={{}}
                activeScale={0.8}
                friction={100}
                tension={100}
                rightTitle={'you follow'}
                rightIcon={{
                    name: gender,
                    type: 'font-awesome',
                    size: responsiveFontSize(2),
                    marginRight: 15,
                    color: colors.text
                }}
                rightTitleStyle={{
                    color: colors.text,
                    fontSize: responsiveFontSize(1.2),
                    marginRight: 6
                }}
                title={username}
                onPress={onPress}
                containerStyle={{
                    borderBottomWidth: 0.4,
                    borderColor: colors.border,
                    padding: 5,
                    marginLeft: 20,
                    backgroundColor: colors.background
                }}
                titleStyle={{
                    color: colors.text,
                    fontSize: responsiveFontSize(2.1),
                    fontWeight: "bold"
                }}
                subtitleStyle={{ color: colors.iconcolor }}
                subtitle={bio}
            />
        );
    }
}


class ProfileList2 extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    _keyExtractor = (item, index) => index.toString();

    _getItemLayout = (data, index) => {
        if (index == -1) return { index, length: 0, height: 0 };
        return { length: 70, offset: 70 * index, index }
    };

    _setFlatlistFooter = () => {
        if (this.props.loadingmore == true) {
            return (
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    marginTop: 15,
                    alignItems: "center"
                }}>
                    <ActivityIndicator size={30} color={'silver'} />
                </View>
            );
        } else if (this.props.loadingmore == 'retry') {
            return (
                <Button
                    type="clear"
                    onPress={() => this.props.onLoadMore()}
                    icon={{
                        name: 'sync',
                        type: "antdesign",
                        size: responsiveFontSize(2.7),
                        color: colors.text
                    }}
                    title="Retry"
                    titleStyle={{ color: colors.text, fontSize: responsiveFontSize(2) }}
                    buttonStyle={{
                        alignSelf: 'center',
                        marginTop: 10,
                        borderColor: colors.iconcolor,
                        borderRadius: 15,
                        padding: 10
                    }}
                />
            );
        } else if (this.props.loadingmore == false) {
            return (
                <Button
                    onPress={() => this.props.onLoadMore()}
                    type="clear"
                    icon={{
                        name: 'plus',
                        type: "evilicon",
                        size: responsiveFontSize(6),
                        color: colors.text
                    }}
                    titleStyle={{ color: colors.text, fontSize: responsiveFontSize(2) }}
                    buttonStyle={{
                        alignSelf: 'center',
                        marginTop: 10,
                        borderColor: colors.iconcolor,
                        borderRadius: 15,
                        padding: 10
                    }}
                />
            );
        }
    };

    _setEmptyPlaceholder = () => {
        if (this.props.fetching == true) {
            return (<View style={{
                alignItems: "center",
                height: 200,
                justifyContent: 'center'
            }}>
                <ActivityIndicator size="large" color={'silver'} />
            </View>);
        } else if (this.props.fetching == 'retry') {
            return (<View
                style={{ alignItems: "center", height: 200, justifyContent: 'center' }}>
                <Icon
                    onPress={() => this.props.onFetch()}
                    color={colors.text}
                    size={responsiveFontSize(4)}
                    name="sync"
                    type="antdesign"
                />
                <Text style={{ color: colors.text }}>Tap to retry </Text>
            </View>)
        }
        return null;
    };

    _renderItem = ({ item }) => {
        return (
            <ProfileList2Item
                avatar={item.profile.avatar[1]}
                username={item.profile.user.username}
                gender={item.profile.user.gender}
                //leftAvatarPress={() => this._setAvatarNavModal(item)}
                // onPress={() => this._followProfileAction(item)}
                bio={item.profile.bio && item.profile.bio.length > 35 ? item.profile.bio.substring(0, 35) + "..." : item.profile.bio}
                textStyle={{ color: colors.text }}
                containerStyle={{ padding: 5, backgroundColor: colors.background }}
                loading={false}
            />
        );
    }

    render() {
        return (
            <FlatList
                data={this.props.data}
                contentContainerStyle={{ marginTop: 10 }}
                initialNumRender={5}
                windowSize={2}
                maxToRenderPerBatch={1}
                updateCellsBatchingPeriod={1}
                getItemLayout={this._getItemLayout}
                keyExtractor={this._keyExtractor}
                ListEmptyComponent={this._setEmptyPlaceholder()}
                ListFooterComponent={this.props.data.length > 0 && this._setFlatlistFooter()}
                renderItem={this._renderItem}
            />
        );
    }
}

const styles = StyleSheet.create({
    listItemContainerStyle: {
        backgroundColor: colors.background,
        borderBottomWidth: 0.4,
        borderRadius: 20,
        //elevation: 2,
        padding: 0,
        borderColor: colors.border,
    },
});

export default ProfileList2;