import React, { Component } from 'react';
import { StyleSheet, FlatList, View, ActivityIndicator, Text } from 'react-native';
import { ListItem, Button, Icon } from 'react-native-elements';
import { useTheme } from '../../assets/themes/index';
import { responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { checkData } from '../../utilities/index';
import { AvatarNavModal, PanelMsg } from './ResuableWidgets';
import { Navigation } from 'react-native-navigation';

const { colors } = useTheme();

class ProfileListItem extends Component {
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
        const { avatar, username, bio, containerStyle, leftAvatarPress } = this.props;
        //console.warn(this.props.processfollow)
        return (
            <ListItem
                leftAvatar={{ source: { uri: avatar }, onPress: leftAvatarPress }}
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

export default class ProfileList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.reswidth = responsiveWidth(100);
        this.state = {
            avatarnavmodal: {
                visible: false,
                avatar: null,
                profile: null,
                headername: '',
            }
        };
        this.navmodallistitem = [{
            icon: {
                name: "user",
                type: "evilicon"
            },
            onPress: () => {
                this.setState({
                    avatarnavmodal: {
                        ...this.state.avatarnavmodal,
                        visible: false,
                    }
                });
                Navigation.showModal({
                    component: {
                        name: 'ViewProfile',
                        passProps: {
                            navparent: true,
                            reqprofile: this.state.avatarnavmodal.profile,
                            screentype: 'modal'
                        },
                    }
                });
            }
        }, {
            icon: {
                name: "comment",
                type: "evilicon"
            },
            onPress: () => {
                this.setState({
                    avatarnavmodal: {
                        ...this.state.avatarnavmodal,
                        visible: false,
                    }
                });

                Navigation.showModal({
                    component: {
                        name: 'PrivateChat',
                        passProps: {
                            navparent: true,
                            propfindpartnerchat: true,
                            privatechatobj: {
                                partnerprofile: this.state.avatarnavmodal.profile
                            },
                            screentype: 'modal'
                        },
                    }
                });
            }
        }];
    }
    componentDidMount() {
        this.props.onFetch && this.props.onFetch();
    }

    _keyExtractor = (item, index) => index.toString();

    _getItemLayout = (data, index) => {
        if (index == -1) return { index, length: 0, height: 0 };
        return { length: 70, offset: 70 * index, index }
    };
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

    _setAvatarNavModal = (item) => {
        if (!checkData(item)) {
            return;
        }
        this.setState({
            avatarnavmodal: {
                ...this.state.avatarnavmodal,
                headername: item.profile.user.username,
                profile: item.profile,
                avatar: item.profile.avatar[1],
                visible: true
            }
        });
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
        if (item.profile.ublockedprofile == true && item.allowblockpass != true) {
            return (
                <PanelMsg
                    message={'This profile is blocked by you '}
                    buttonTitle={'View'}
                    buttonPress={() => this.props.updateItem({
                        allowblockpass: true,
                        profile: {
                            ...item.profile
                        }
                    })}
                />
            );
        } else if (item.profile.profileblockedu == true) {
            return (
                <PanelMsg
                    message={'This profile is unavailable to view '}
                    buttonTitle={'Learn More'}
                />
            )
        } else if (item.profile.user.approved != true || item.profile.user.deleted == true) {
            return null;
        }

        return (
            <ProfileListItem
                avatar={item.profile.avatar[1]}
                username={item.profile.profile_name}
                processfollow={item.profile.followprogress || false}
                leftAvatarPress={() => this._setAvatarNavModal(item)}
                onPress={() => this._followProfileAction(item)}
                //bio={item.profile.bio && item.profile.bio.length > 22 ? item.profile.bio.substring(0, 22) + "..." : item.profile.bio}
                bio={item.profile.user.username}
                textStyle={{ color: colors.text }}
                containerStyle={{ backgroundColor: colors.background }}
                loading={false}
                following={item.profile.following}
            />
        );
    }
    render() {
        // console.warn(this.props.updateItem);
        return (
            <>
            <FlatList
                data={this.props.data}
                initialNumRender={5}
                windowSize={2}
                keyboardShouldPersistTaps='always'
                keyboardDismissMode={'on-drag'}
                maxToRenderPerBatch={1}
                updateCellsBatchingPeriod={1}
                getItemLayout={this._getItemLayout}
                keyExtractor={this._keyExtractor}
                ListEmptyComponent={this._setEmptyPlaceholder()}
                ListFooterComponent={this.props.data.length > 0 && this._setFlatlistFooter()}
                renderItem={this._renderItem}
            />

            <AvatarNavModal
                avatar={this.state.avatarnavmodal.avatar}
                isVisible={this.state.avatarnavmodal.visible}
                onBackdropPress={() => this.setState({
                    avatarnavmodal: {
                        ...this.state.avatarnavmodal,
                        visible: false,
                    }
                })}
                onAvatarPress={() => {
                    this.setState({
                        avatarnavmodal: {
                            ...this.state.avatarnavmodal,
                            visible: false,
                        }
                    });
                    Navigation.showModal({
                        component: {
                            name: 'PhotoViewer',
                            passProps: {
                                navparent: true,
                                photos: [this.state.avatarnavmodal.avatar]
                            },
                        }
                    })
                }}
                headername={this.state.avatarnavmodal.headername}
                navBarItemArr={this.navmodallistitem}
            />
            </>
        );
    }
};

const styles = StyleSheet.create({

});