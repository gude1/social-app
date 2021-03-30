import React, { Component } from 'react';
import { FlatList, StyleSheet, View, ActivityIndicator } from 'react-native';
import { ListItem, ConfirmModal, BottomListModal, PanelMsg, ActivityOverlay, AvatarNavModal } from './ResuableWidgets';
import { responsiveFontSize, responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import { useTheme } from '../../assets/themes';
import { checkData, handleTime } from '../../utilities';
import { Icon, Overlay, Text, Button } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import TouchableScale from 'react-native-touchable-scale/src/TouchableScale';
const { colors } = useTheme();


const ShowPostReplyComments = ({ data, updateReply, onLongPress, onAvatarPress, likePress, numLikesPress }) => {
    if (!Array.isArray(data) || data.length < 1) {
        return null;
    }
    return data.map((item, index) => {
        if (item.profile.profilemuted == true && item.muted != false) {
            return (
                <PanelMsg
                    message={'This reply is from someone you have muted '}
                    buttonTitle={'View'}
                    buttonPress={() => {
                        checkData(updateReply) &&
                            updateReply({
                                replyid: item.replyid,
                                muted: false
                            });
                    }}
                />
            );
        } else if (item.profile.ublockedprofile == true) {
            return (
                <PanelMsg
                    message={'This reply is from someone you blocked '}
                    buttonTitle={'View'}
                    buttonPress={() => {
                        checkData(updateReply) &&
                            updateReply({
                                replyid: item.replyid,
                                muted: false
                            });
                    }}
                />
            );
        } else if (item.profile.profileblockedu == true) {
            return (
                <PanelMsg
                    message={'This reply is from someone you blocked '}
                    buttonTitle={'Learn More'}
                />
            )
        } else if (item.profile.user.approved != true || item.profile.user.deleted == true) {
            return null;
        }
        return (
            <ListItem
                key={index}
                time={checkData(item.sendingmsg) ? item.sendingmsg : handleTime(Math.floor(item.created_at * 1000))}
                onRetryPress={item.onRetry}
                onLongPress={() => {
                    checkData(onLongPress) && onLongPress(item);
                }}
                //replyPress={}
                leftAvatar={{ uri: item.profile.avatar[1] }}
                title={item.profile.profile_name}
                onAvatarPress={() => {
                    checkData(onAvatarPress) && onAvatarPress(item);
                }}
                subtitle={item.reply_text}
                deleted={item.deleted}
                profilemuted={item.profile.profilemuted}
                likes={item.num_likes}
                hide={item.hidden}
                numLikesPress={() => {
                    checkData(numLikesPress) && numLikesPress(item);
                }}
                likebtn
                likePress={() => {
                    checkData(likePress) && likePress(item);
                }}
                liked={item.replyliked}
            />
        );
    });
};


export default class PostCommentReplyList extends Component {
    constructor(props) {
        super(props);
        this.reswidth = responsiveWidth(100);
        this.resheight = responsiveHeight(100);
        this.state = {
            confirmdeletevisible: false,
            confirmhidevisible: false,
            replyhidden: false,
            profilemuted: false,
            confirmmutevisible: false,
            userreplymodal: false,
            othersreplymodal: false,
            avatarnavmodal: {
                visible: false,
                avatar: null,
                profile: null,
                headername: '',
            }
        };
        this.currentreplyid = null;
        this.currentreplyownerprofile = null;
        this.currentreplyownerid = null;
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

        this.bottomodallistowneroptions = [
            {
                listtext: 'Delete Reply',
                onPress: () => {
                    this.setState({ userreplymodal: false });
                    this.setState({ confirmdeletevisible: true });
                },
                icon: {
                    name: 'trash',
                    type: 'entypo'
                }
            },
        ];
        this.bottomodallistothersoptions = [
            {
                listtext: 'Mute profile',
                id: "muteprofile",
                icon: {
                    name: 'volume-x',
                    type: 'feather'
                },
                onPress: () => {
                    this.setState({ othersreplymodal: false });
                    this.setState({ confirmmutevisible: true });
                },
            },
        ];
        if (this.props.userprofile.profile_id == this.props.origin.profile.profile_id) {
            this.bottomodallistothersoptions = [...this.bottomodallistothersoptions, {
                listtext: 'Hide Reply',
                id: 'hidec',
                icon: {
                    name: 'eye-off',
                    type: 'feather'
                },
                onPress: () => {
                    this.setState({ othersreplymodal: false });
                    this.setState({ confirmhidevisible: true });
                }
            }]
        }

    }

    componentDidMount() {
        this.setState({
            othersbottommodallist: this.bottomodallistothersoptions,
            userbottommodallist: this.bottomodallistowneroptions
        });
        /*if (checkData(this.props.origin)) {
            this.props.onFetch(this.props.origin.commentid || this.props.origin.replyid);
        }*/
    }

    _setSelected = (replyid, ownerid, item) => {
        if (checkData(replyid) && checkData(ownerid) && checkData(item.profile)) {
            this.currentreplyid = replyid;
            this.currentreplyownerid = ownerid;
            this.currentreplyownerprofile = item.profile;
        }
        if (ownerid == this.props.userprofile.profile_id) {
            this._openUserBottomModal();
        } else {
            this._setOthersModalList(item);
            this._openOthersBottomModal();
        }
    };

    _setOthersModalList = (item) => {
        if (!checkData(item) || !checkData(item.profile)) {
            return;
        }
        let adjustedlist = null;
        let profilechangemuted = this.props.profileschanges.find(
            item => item.profileid == this.currentreplyownerid
        );
        profilechangemuted = checkData(profilechangemuted) ? profilechangemuted.profilemuted : null;
        profilechangemuted = checkData(profilechangemuted) ? profilechangemuted : item.profile.profilemuted;
        /*** for  profile muted */
        if (profilechangemuted) {
            adjustedlist = this.state.othersbottommodallist.map(item => {
                return item.id == "muteprofile" ? {
                    ...item,
                    listtext: 'Unmute profile',
                    icon: {
                        name: 'volume',
                        type: 'feather'
                    },
                } : item
            });
            this.setState({
                othersbottommodallist: adjustedlist,
                profilemuted: profilechangemuted
            });
        } else {
            adjustedlist = this.state.othersbottommodallist.map(item => {
                return item.id == "muteprofile" ? {
                    ...item,
                    listtext: 'Mute profile',
                    icon: {
                        name: 'volume-x',
                        type: 'feather'
                    },
                } : item
            });
            this.setState({
                othersbottommodallist: adjustedlist,
                profilemuted: profilechangemuted
            });
        }
        /**for hide reply */
        if (this.props.userprofile.profile_id != this.props.origin.profile.profile_id) {
            return;
        }
        if (item.hidden == true) {
            adjustedlist = this.state.othersbottommodallist.map(item => {
                return item.id == "hidec" ? {
                    ...item,
                    listtext: 'Unhide Reply',
                    icon: {
                        name: 'eye',
                        type: 'feather'
                    }
                } : item
            });
            this.setState({
                othersbottommodallist: adjustedlist,
                replyhidden: item.hidden
            });
        } else {
            adjustedlist = this.state.othersbottommodallist.map(item => {
                return item.id == "hidec" ? {
                    ...item,
                    listtext: 'Hide Reply',
                    icon: {
                        name: 'eye-off',
                        type: 'feather'
                    }
                } : item
            });
            this.setState({
                othersbottommodallist: adjustedlist,
                replyhidden: item.hidden
            });
        }
    };

    _muteProfile = () => {
        let initaction = () => this.props.setProcessing(true, 'postcommentreplyformmuting');
        let failedaction = () => this.props.setProcessing(false, 'postcommentreplyformmuting');
        let okaction = () => {
            this.props.updateReply({
                replyid: this.currentreplyid,
                muted: !this.state.profilemuted,
                profile: { ...this.currentreplyownerprofile, profilemuted: !this.state.profilemuted }
            });
            this.props.updatePostCommentReplyProfile({
                profileid: this.currentreplyownerid,
                profilemuted: !this.state.profilemuted
            });
            this.props.setProcessing(false, 'postcommentreplyformmuting');
        };
        this.props.onMute(
            this.currentreplyownerid,
            initaction,
            okaction,
            failedaction
        );
    };

    _onDeletePress = () => {
        this.setState({ confirmdeletevisible: false });
        this.props.onDelete(this.currentreplyid, this.currentreplyownerid);
    };

    _onItemLiked = (replyid, likestatus, numlikes) => {
        if (checkData(replyid) != true ||
            checkData(likestatus) != true ||
            checkData(numlikes) != true) {
            return;
        }
        numlikes = Number(numlikes);
        likestatus = (likestatus == true) ? false : true;
        if (likestatus) {
            numlikes = (numlikes + 1) < 1 ? 1 : numlikes + 1;
        } else {
            numlikes = (numlikes - 1) < 0 ? 0 : numlikes - 1;
        }
        this.props.onItemLike(replyid, likestatus, numlikes);
    };

    _openOthersBottomModal = () => {
        this.setState({ othersreplymodal: true })
    };

    _openUserBottomModal = () => {
        this.setState({ userreplymodal: true })
    };

    _navShowLikes = (replyid) => {
        if (checkData(replyid) != true) {
            return;
        }
        Navigation.showModal({
            component: {
                name: 'LikesList',
                passProps: {
                    navparent: true,
                    requrl: 'postcommentreplylikes',
                    reqdata: { replyid }
                },
            }
        });
    };

    _navShowReplies = (reply) => {
        if (checkData(reply) != true) {
            return;
        }
        Navigation.showModal({
            component: {
                name: "PostCommentReply",
                passProps: {
                    navparent: true,
                    ownerreplyid: reply.replyid
                },
            }
        });
    };

    _getItemLayout = (data, index) => {
        if (index == -1) return { index, length: 0, height: 0 };
        return { length: 100, offset: 100 * index, index }
    };

    _keyExtractor = (item, index) => item.replyid;

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
                    onPress={() => this.props.onFetch(this.props.origin.commentid || this.props.origin.replyid)}
                    color={colors.text}
                    size={responsiveFontSize(4)}
                    name="sync"
                    type="antdesign"
                />
                <Text style={{ color: colors.text }}>Tap to retry </Text>
            </View>);
        }
        return null;
    };

    _setHeaderComponent = () => {
        return checkData(this.props.origin) == true ?
            <View style={styles.postTextContainer}>
                {<ListItem
                    time={handleTime(Math.floor(this.props.origin.created_at * 1000))}
                    likes={this.props.origin.num_likes}
                    numLikesPress={() => Navigation.showModal({
                        component: {
                            name: 'LikesList',
                            passProps: {
                                navparent: true,
                                requrl: checkData(this.props.origin.replyid) ?
                                    'postcommentreplylikes' : 'postcommentlikes',
                                reqdata: checkData(this.props.origin.replyid) ?
                                    { replyid: this.props.origin.replyid } : { commentid: this.props.origin.commentid }
                            },
                        }
                    })}
                    title={this.props.origin.profile.profile_name}
                    leftAvatar={{ uri: this.props.origin.profile.avatar[1] }}
                    onAvatarPress={() => {
                        this.setState({
                            avatarnavmodal: {
                                ...this.state.avatarnavmodal,
                                headername: this.props.origin.profile.user.username,
                                profile: this.props.origin.profile,
                                avatar: this.props.origin.profile.avatar[1],
                                visible: true
                            }
                        });
                    }}
                    subtitle={this.props.origin.reply_text || this.props.origin.comment_text}
                    timeTextStyle={{ fontSize: responsiveFontSize(1.6) }}
                    BottomContainerItem={
                        <View style={{
                            flexDirection: 'row', alignItems: "center",
                        }}>
                            <Text style={{
                                fontSize: responsiveFontSize(1.5),
                                color: "silver",
                                margin: 2
                            }}>{this.props.origin.num_replies} replies</Text>
                        </View>
                    }
                />
                }
            </View> : null;
    };

    _setFooterComponent = () => {
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
                    onPress={() => this.props.onLoadMore(this.props.origin.commentid || this.props.origin.replyid)}
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
                    onPress={() => this.props.onLoadMore(this.props.origin.commentid || this.props.origin.replyid)}
                    name="plus"
                    type="evilicon"
                />
            </View>);
        } else {
            return null;
        }
    };

    _renderItem = ({ item }) => {
        /*return (
            <ShowPostReplyComments
                data={this.props.data}
                onLongPress={(item) => this._setSelected(
                    item.replyid,
                    item.profile.profile_id,
                    item
                )}
                onAvatarPress={(item) => {
                    this.setState({
                        avatarnavmodal: {
                            ...this.state.avatarnavmodal,
                            headername: item.profile.user.username,
                            profile: item.profile,
                            avatar: item.profile.avatar[1],
                            visible: true
                        }
                    });
                }}
                numLikesPress={(item) => this._navShowLikes(item.replyid)}
                likePress={(item) => this._onItemLiked(item.replyid, item.replyliked, item.num_likes)}
            />
        );*/
        if (item.profile.profilemuted == true && item.muted != false) {
            return (
                <PanelMsg
                    message={'This reply is from someone you have muted '}
                    buttonTitle={'View'}
                    buttonPress={() => this.props.updateReply({
                        replyid: item.replyid,
                        muted: false
                    })}
                />
            );
        } else if (item.profile.ublockedprofile == true) {
            return (
                <PanelMsg
                    message={'This reply is from someone you blocked '}
                    buttonTitle={'View'}
                    buttonPress={() => this.props.updateReply({
                        replyid: item.replyid,
                        allowblockpass: true
                    })}
                />
            );
        } else if (item.profile.profileblockedu == true) {
            return (
                <PanelMsg
                    message={'This reply is from someone you blocked '}
                    buttonTitle={'Learn More'}
                />
            )
        } else if (item.profile.user.approved != true || item.profile.user.deleted == true) {
            return null;
        }

        return (
            <ListItem
                time={checkData(item.sendingmsg) ? item.sendingmsg : handleTime(Math.floor(item.created_at * 1000))}
                onRetryPress={item.onRetry}
                onLongPress={() => this._setSelected(
                    item.replyid,
                    item.profile.profile_id,
                    item
                )}
                //replyPress={}
                leftAvatar={{ uri: item.profile.avatar[1] }}
                title={item.profile.profile_name}
                onAvatarPress={() => {
                    this.setState({
                        avatarnavmodal: {
                            ...this.state.avatarnavmodal,
                            headername: item.profile.user.username,
                            profile: item.profile,
                            avatar: item.profile.avatar[1],
                            visible: true
                        }
                    });
                }}
                deleted={item.deleted}
                subtitle={item.reply_text}
                profilemuted={item.profile.profilemuted}
                likes={item.num_likes}
                hide={item.hidden}
                numLikesPress={() => this._navShowLikes(item.replyid)}
                likebtn
                likePress={() => this._onItemLiked(item.replyid, item.replyliked, item.num_likes)}
                liked={item.replyliked}
            />
        )
    }

    render() {
        let onRefresh = this.props.data < 1 ? null : () => {
            this.props.onRefresh(this.props.origin.replyid || this.props.origin.commentid);
        }
        return (
            <>
            <FlatList
                ref={ref => {
                    this.props.setFlatlistRef(ref)
                }}
                //data={this.props.data.length > 0 ? [1] : []}
                data={this.props.data}
                getItemLayout={this._getItemLayout}
                refreshing={this.props.refreshing}
                maxToRenderPerBatch={1}
                updateCellsBatchingPeriod={1}
                //windowSize={50}
                onRefresh={onRefresh}
                keyboardShouldPersistTaps='always'
                initialNumRender={5}
                keyboardDismissMode={'on-drag'}
                keyExtractor={this._keyExtractor}
                ListHeaderComponent={this._setHeaderComponent()}
                ListEmptyComponent={this._setEmptyPlaceholder()}
                ListFooterComponent={this.props.data.length > 0 && this._setFooterComponent()}
                renderItem={this._renderItem}
            />
            <ConfirmModal
                isVisible={this.state.confirmhidevisible}
                confirmMsg={this.state.replyhidden == true ? "Unhide reply?" : "Hide reply?"}
                acceptText="Yeah"
                acceptAction={() => {
                    this.setState({ confirmhidevisible: false });
                    this.props.onHide(this.currentreplyid, this.props.userprofile.profile_id);
                }}
                rejectAction={() => this.setState({ confirmhidevisible: false })}
                rejectText="Nah"
            />
            <ActivityOverlay
                text={this.state.replyhidden == true ? 'unhiding' : 'hiding'}
                isVisible={this.props.hiding}
            />

            <ConfirmModal
                isVisible={this.state.confirmmutevisible}
                confirmMsg={this.state.profilemuted == true ? "Unmute profile?" : "Mute profile?"}
                acceptText="Yeah"
                acceptAction={() => {
                    this.setState({ confirmmutevisible: false });
                    this._muteProfile();
                }}
                rejectAction={() => this.setState({ confirmmutevisible: false })}
                rejectText="Nah"
            />
            <ActivityOverlay
                text={'processing'}
                isVisible={this.props.muting}
            />

            <ConfirmModal
                isVisible={this.state.confirmdeletevisible}
                confirmMsg="Delete Reply?"
                acceptText="Yeah"
                acceptAction={this._onDeletePress}
                rejectAction={() => this.setState({ confirmdeletevisible: false })}
                rejectText="Nah"
            />
            <ActivityOverlay
                text="deleting"
                isVisible={this.props.deleting}
            />
            <BottomListModal
                listData={this.state.userbottommodallist}
                visible={this.state.userreplymodal}
                onRequestClose={() => {
                    this.setState({ userreplymodal: false });
                }}
            />
            <BottomListModal
                listData={this.state.othersbottommodallist}
                visible={this.state.othersreplymodal}
                onRequestClose={() => {
                    this.setState({ othersreplymodal: false });
                }}
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
    postTextContainer: {
        borderBottomWidth: 0.3,
        borderColor: colors.border
    },
});