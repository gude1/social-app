import React, { Component } from 'react';
import { StyleSheet, FlatList, View, ActivityIndicator, Text } from 'react-native';
import { ListItem, Button, Icon } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale/src/TouchableScale';
import { useTheme } from '../../assets/themes/index';
import { responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { checkData } from '../../utilities/index';
const { colors } = useTheme();

class LikesListItem extends Component {
    constructor(props) {
        super(props);
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextProps.following != this.props.following ||
            nextProps.processfollow != this.props.processfollow) {
            return true;
        }
        return false;
    }
    _setRightIcon = () => {
        switch (this.props.following) {
            case true:
                return (<Button
                    title="Unfollow"
                    type="outline"
                    loading={this.props.processfollow}
                    disabled={this.props.processfollow}
                    onPress={this.props.onPress}
                    buttonStyle={{ borderRadius: 15, borderColor: '#f44336', width: 100, padding: 5 }}
                    titleStyle={{ fontSize: 13, color: "#f44336" }}
                />
                );
                break;
            case false:
                return (<Button
                    title="Follow"
                    type="outline"
                    loading={this.props.processfollow}
                    disabled={this.props.processfollow}
                    onPress={this.props.onPress}
                    buttonStyle={{ borderRadius: 15, borderColor: '#2196F3', width: 100, padding: 5 }}
                    titleStyle={{ fontSize: 13, color: "#2196F3" }}
                />
                );
                break;
            default:
                return (<Button
                    title="Follow"
                    type="outline"
                    loading={this.props.processfollow}
                    disabled={this.props.processfollow}
                    onPress={this.props.onPress}
                    buttonStyle={{ borderRadius: 10, borderColor: '#2196F3', width: 90, padding: 5 }}
                    titleStyle={{ fontSize: 13, color: "#2196F3" }}
                />
                );
                break;
        }
    };
    render() {
        const { avatar, username, bio, containerStyle } = this.props;
        return (
            <ListItem
                leftAvatar={{ source: { uri: avatar } }}
                title={username}
                containerStyle={containerStyle}
                titleStyle={{ color: colors.text }}
                subtitleStyle={{ color: colors.iconcolor }}
                subtitle={bio}
                rightIcon={this._setRightIcon()}
            />
        );
    }
};

export default class LikesList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.reswidth = responsiveWidth(100);
    }
    componentDidMount() {
        this.props.onFetch();
    }

    _keyExtractor = (item, index) => item.profile.profile_id;
    _getItemLayout = (data, index) => (
        { length: this.reswidth, offset: this.reswidth * index, index }
    );
    _followProfileAction = (item) => {
        let init = () => this.props.updateItem({
            profile: {
                ...item.profile,
                followprogress: true,
            }
        });
        let success = () => this.props.updateItem({
            profile: {
                ...item.profile,
                followprogress: false,
                following: !item.profile.following
            }
        });
        let failed = () => this.props.updateItem({
            profile: {
                ...item.profile,
                followprogress: false,
            }
        });
        if (checkData(item.profile) != true || checkData(item.profile.profile_id) != true) {
            return;
        }
        this.props.followProfileAction(
            item.profile.profile_id,
            init,
            success,
            failed,
        );
    };
    _setFlatlistFooter = () => {
        if (this.props.loadingmore == true) {
            return (<View style={{
                flex: 1,
                justifyContent: "center",
                margin: 6,
                alignItems: "center"
            }}>
                <ActivityIndicator
                    size={30}
                    color={colors.border} />
            </View>);
        } else if (this.props.loadingmore == 'retry') {
            return (<View style={{
                flex: 1,
                justifyContent: "center",
                margin: 6,
                alignItems: "center"
            }}>
                <Icon
                    color={colors.text}
                    size={responsiveFontSize(4)}
                    onPress={() => this.props.onLoadMore()}
                    name="sync"
                    type="antdesign"
                />
                <Text style={{ color: colors.border, fontSize: responsiveFontSize(1.5) }}>Tap to retry</Text>
            </View>);
        } else if (this.props.loadingmore == false) {
            return (<View style={{
                flex: 1,
                justifyContent: "center",
                margin: 10,
                alignItems: "center"
            }}>
                <Icon
                    color={colors.text}
                    size={responsiveFontSize(5)}
                    onPress={() => this.props.onLoadMore()}
                    name="plus"
                    type="evilicon"
                />
            </View>);
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
            <LikesListItem
                avatar={item.profile.avatar[1]}
                username={item.profile.user.username}
                processfollow={item.profile.followprogress || false}
                onPress={() => this._followProfileAction(item)}
                bio={item.profile.bio && item.profile.bio.length > 22 ? item.profile.bio.substring(0, 22) + "..." : bio}
                textStyle={{ color: colors.text }}
                containerStyle={{ backgroundColor: colors.background }}
                loading={false}
                following={item.profile.following}
            />
        );
    }
    render() {
        return (
            <FlatList
                data={this.props.data}
                initialNumRender={5}
                getItemLayout={this._getItemLayout}
                keyExtractor={this._keyExtractor}
                ListEmptyComponent={this._setEmptyPlaceholder()}
                ListFooterComponent={this.props.data.length > 0 && this._setFlatlistFooter()}
                renderItem={this._renderItem}
            />
        );
    }
};

const styles = StyleSheet.create({

});