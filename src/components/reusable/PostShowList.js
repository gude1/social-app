import React, { Component } from 'react';
import { FlatList, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import { PostItem } from './PostList';
import { useTheme } from '../../assets/themes/index';
import { ConfirmModal, ActivityOverlay, BottomListModal, PanelMsg, AvatarNavModal } from './ResuableWidgets';
import {
    responsiveFontSize, responsiveHeight, responsiveWidth
} from 'react-native-responsive-dimensions';
import { checkData } from '../../utilities/index';
import { Navigation } from 'react-native-navigation';

const { colors } = useTheme();
export default class PostShowList extends Component {
    constructor(props) {
        super(props);
        this.resheight = responsiveWidth(94) > 1024 ? 1024 : responsiveWidth(94);
        this.state = {
            otherspostvisible: false,
            userpostvisible: false,
            confirmdeletevisible: false,
            confirmarchivevisible: false,
            confirmblacklistvisible: false,
            confirmmutevisible: false,
            bottomodallistothersoptions: null,
            profilemuted: false,
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
        console
        this.bottomodallistowneroptions = [
            {
                listtext: 'Archive Post',
                onPress: () => {
                    this.setState({ userpostvisible: false });
                    this.setState({ confirmarchivevisible: true });
                },
                icon: {
                    name: 'archive',
                    type: 'entypo'
                }
            },
            {
                listtext: 'Delete Post',
                onPress: () => {
                    this.setState({ userpostvisible: false });
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
                listtext: 'Not interested in this post',
                onPress: () => {
                    this.setState({ otherspostvisible: false });
                    this.setState({ confirmblacklistvisible: true });
                },
                icon: {
                    name: 'emoji-sad',
                    type: 'entypo'
                }
            },
            {
                listtext: 'Report Post',
                icon: {
                    name: 'flag-o',
                    type: 'font-awesome'
                }
            },
            {
                listtext: 'Mute profile',
                id: 'muteprofile',
                onPress: () => {
                    this.setState({ otherspostvisible: false });
                    this.setState({ confirmmutevisible: true });
                },
                icon: {
                    name: 'volume-x',
                    type: 'feather'
                }
            }
        ];
    }

    componentDidMount() {
        this.setState({
            bottomodallistothersoptions: this.bottomodallistothersoptions
        });
    }

    _setSelected = (postid, postprofileid, postitem) => {
        if (checkData(postid) == true && checkData(postprofileid) == true) {
            this.currentselectedpostid = postid;
            this.currentselectedpostownerid = postprofileid;
        }
        if (this.props.userprofile.profile_id == this.currentselectedpostownerid) {
            this._handleUserPostOptions();
        } else {
            this._setOthersModalList(postitem);
            this._handleOthersPostOptions();
        }
    };
    _setOthersModalList = (postitem) => {
        if (!checkData(postitem)) {
            return;
        }
        let adjustedlist = null;
        //console.warn(this.props.profileschanges);
        let profilechanges = this.props.profileschanges.find(
            item => item.profileid == this.currentselectedpostownerid
        );
        //console.warn(postitem);
        let profilechangesmuted = checkData(profilechanges) ? profilechanges.profilemuted : postitem.profile.profilemuted;
        /*** for  profile muted */
        if (profilechangesmuted == true) {
            adjustedlist = this.state.bottomodallistothersoptions.map(item => {
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
                bottomodallistothersoptions: adjustedlist,
                profilemuted: profilechangesmuted
            });
        } else {
            adjustedlist = this.state.bottomodallistothersoptions.map(item => {
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
                bottomodallistothersoptions: adjustedlist,
                profilemuted: profilechangesmuted
            });
        }

    };
    _handleOthersPostOptions = () => {
        this.setState({ otherspostvisible: true });
    };
    _handleUserPostOptions = () => {
        this.setState({ userpostvisible: true })
    };
    _onDeletePress = () => {
        this.setState({ confirmdeletevisible: false });
        this.props.onDeletePress(
            this.currentselectedpostid,
            this.currentselectedpostownerid
        );
    };
    _onArchivePress = () => {
        this.setState({ confirmarchivevisible: false });
        this.props.onArchivePress(
            this.currentselectedpostid,
            this.currentselectedpostownerid
        );
    };
    _onBlackListPress = () => {
        this.setState({ confirmblacklistvisible: false });
        this.props.onBlackListPress(
            this.currentselectedpostid,
            this.currentselectedpostownerid
        );
    };
    _onMuteProfilePress = () => {
        this.setState({ confirmmutevisible: false });
        this.props.onMuteProfilePress(
            this.currentselectedpostownerid,
            null,
            () => {
                this.props.updateProfileChanges({
                    profileid: this.currentselectedpostownerid,
                    profilemuted: !this.state.profilemuted
                });
                if (!this.state.profilemuted) {
                    this.props.removeProfilePosts(this.currentselectedpostownerid);
                }
            }
        );
    };
    _arrangePostImage = (data) => {
        if (!Array.isArray(data) || data.length < 1) {
            return null;
        } else {
            let postimages = data.map(image => image.postimage);
            return postimages;
        }
    };
    _keyExtractor = (item, index) => item.postid;
    _getItemLayout = (data, index) => {
        if (index == -1) return { index, length: 0, height: 0 };
        return { length: this.resheight, offset: this.resheight * index, index }
    };
    _likePostItem = (postid, likestatus, numpostlikes) => {
        if (checkData(postid) != true) {
            return false;
        }
        numpostlikes = Number(numpostlikes);
        if (likestatus == "postliked") {
            likestatus = 'notliked';
            numpostlikes = (numpostlikes - 1) < 0 ? 0 : numpostlikes - 1;
        } else {
            likestatus = 'postliked';
            numpostlikes = (numpostlikes + 1) < 0 ? 0 : numpostlikes + 1;
        }
        this.props.onPostItemLiked(postid, likestatus, numpostlikes);
    };
    _openComments = (post) => {
        if (checkData(post) != true) {
            return;
        }
        Navigation.showModal({
            component: {
                name: 'PostComment',
                passProps: {
                    navparent: true,
                    screentype: "modal",
                    ownerpost: post,
                },
            }
        });
    }
    _sharePostItem = (postid, sharestatus, numpostshares) => {
        if (checkData(postid) != true) {
            return false;
        }
        numpostshares = Number(numpostshares);
        if (sharestatus == "postshared") {
            sharestatus = 'notshared';
            numpostshares = (numpostshares - 1) < 0 ? 0 : numpostshares - 1;
        } else {
            sharestatus = 'postshared';
            numpostshares = (numpostshares + 1) < 0 ? 1 : numpostshares + 1;
        }
        this.props.onPostItemShared(postid, sharestatus, numpostshares);
    };
    _navShowLikes = (postid) => {
        if (checkData(postid) != true) {
            return;
        }
        Navigation.showModal({
            component: {
                name: 'LikesList',
                passProps: {
                    navparent: true,
                    requrl: 'postlikes',
                    reqdata: { postid }
                },
            }
        });
    };

    _navShowShares = (postid) => {
        if (checkData(postid) != true) {
            return;
        }
        Navigation.showModal({
            component: {
                name: 'SharesList',
                passProps: {
                    navparent: true,
                    requrl: 'postshares',
                    reqdata: { postid }
                },
            }
        });
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
                    onPress={() => this.props.onFetch(this.props.parentpost.postid)}
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

    renderItem = ({ item }) => {
        if (!checkData(item) || !checkData(item.profile)) {
            return (
                <PanelMsg
                    message={'Post is unavailable'}
                />
            );
        }
        let sharemsg = null;
        if (item.profile.profilemuted == true && checkData(item.showpost) == false) {
            return (
                <PanelMsg
                    message={'This post is from someone you have muted'}
                    buttonTitle={'View'}
                    buttonPress={() => this.props.updatePostItem({
                        postid: item.postid,
                        showpost: true
                    })}
                />
            );
        } else if (item.profile.ublockedprofile == true && checkData(item.showpost) == false) {
            return (
                <PanelMsg
                    message={'postowner is blocked by you'}
                    buttonTitle={'View'}
                    buttonPress={() => this.props.updatePostItem({
                        postid: item.postid,
                        showpost: true
                    })}
                />
            )
        } else if (item.profile.profileblockedu == true && checkData(item.showpost) == false) {
            return (
                <PanelMsg
                    message={'You are blocked by postowner'}
                />
            )
        } else if (item.profile.user.approved != true || item.profile.user.deleted == true) {
            return null;
        }

        if (checkData(item.known_sharers_profile) && checkData(item.known_sharers_profile[0])) {
            sharemsg = item.known_sharers_profile.length > 1 ?
                `shared by ${item.known_sharers_profile[0].profile_name} and others`
                : `shared by ${item.known_sharers_profile[0].profile_name}`;
            sharemsg = <Text onPress={() => Navigation.showModal({
                component: {
                    name: 'ViewProfile',
                    passProps: {
                        navparent: true,
                        reqprofile: item.known_sharers_profile[0],
                        screentype: 'modal'
                    },
                }
            })
            }>
                {sharemsg}
            </Text >
        }

        return (<PostItem
            posterusername={item.profile.profile_name}
            posteravatar={item.profile.avatar[1]}
            sharemsg={sharemsg}
            postimages={this._arrangePostImage(item.post_image)}
            postliked={item.postliked}
            profileid={item.profile.profile_id}
            created_at={item.created_at}
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
            postid={item.postid}
            onOthersPostOption={() => {
                this._setSelected(item.postid, item.profile.profile_id, item);
            }}
            onUserPostOption={() => {
                this._setSelected(item.postid, item.profile.profile_id, item);
            }}
            postshared={item.postshared}
            posttext={item.post_text}
            numlikes={item.num_post_likes}
            numcomments={item.num_post_comments}
            numshares={item.num_post_shares}
            onLikePress={this._likePostItem}
            onViewLikesPress={() => this._navShowLikes(item.postid)}
            onSharePress={this._sharePostItem}
            onViewSharesPress={() => this._navShowShares(item.postid)}
            onCommentPress={() => {
                this._openComments(item);
            }}
        />)
    }
    render() {
        let refreshing = this.props.refreshing == 'failed' ? false : this.props.refreshing;
        //to hide pull to refresh functionality  when data is empty
        let onRefresh = this.props.data < 1 ? null : this.props.onRefresh;
        return (
            <>
            <FlatList
                data={this.props.data}
                keyExtractor={this.keyExtractor}
                getItemLayout={this._getItemLayout}
                onRefresh={onRefresh}
                refreshing={refreshing}
                showsVerticalScrollIndicator={false}
                renderItem={this.renderItem}
                ListEmptyComponent={this._setEmptyPlaceholder()}
            />
            <ConfirmModal
                isVisible={this.state.confirmdeletevisible}
                confirmMsg="Delete Post?"
                acceptText="Yeah"
                acceptAction={this._onDeletePress}
                rejectAction={() => this.setState({ confirmdeletevisible: false })}
                rejectText="Nah"
            />
            <ActivityOverlay
                text={'Deleting'}
                isVisible={this.props.onitemdeleting}
            />
            <ConfirmModal
                isVisible={this.state.confirmarchivevisible}
                confirmMsg="Archive Post?"
                acceptText="Yeah"
                acceptAction={this._onArchivePress}
                rejectAction={() => this.setState({ confirmarchivevisible: false })}
                rejectText="Nah"
            />
            <ActivityOverlay
                text={'Archiving'}
                isVisible={this.props.onitemarchiving}
            />
            <ConfirmModal
                isVisible={this.state.confirmblacklistvisible}
                confirmMsg="Blacklist post?"
                acceptText="Yeah"
                acceptAction={this._onBlackListPress}
                rejectAction={() => this.setState({ confirmblacklistvisible: false })}
                rejectText="Nah"
            />
            <ActivityOverlay
                text={'Blacklisting'}
                isVisible={this.props.onitemblacklisting}
            />
            <ConfirmModal
                isVisible={this.state.confirmmutevisible}
                confirmMsg={this.state.profilemuted == true ? "Unmute profile?" : "Mute Profile"}
                acceptText="Yeah"
                acceptAction={this._onMuteProfilePress}
                rejectAction={() => this.setState({ confirmmutevisible: false })}
                rejectText="Nah"
            />
            <ActivityOverlay
                text={this.state.profilemuted == true ? 'Unmuting' : 'Muting'}
                isVisible={this.props.onitemmuting}
            />

            <BottomListModal
                listData={this.state.bottomodallistothersoptions}
                visible={this.state.otherspostvisible}
                onRequestClose={() => {
                    this.setState({ otherspostvisible: false });
                }}
            />
            <BottomListModal
                listData={this.bottomodallistowneroptions}
                visible={this.state.userpostvisible}
                onRequestClose={() => {
                    this.setState({ userpostvisible: false });
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
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: colors.background
    },
});