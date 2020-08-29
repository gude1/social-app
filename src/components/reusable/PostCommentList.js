import React, { } from 'react';
import { FlatList, StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { ListItem, ConfirmModal, BottomListModal, ActivityOverlay } from './ResuableWidgets';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import { useTheme } from '../../assets/themes';
import { checkData } from '../../utilities';
import { Icon, Overlay } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';

const { colors } = useTheme();
export default class PostCommentList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.reswidth = responsiveWidth(100);
        this.state = {
            confirmdeletevisible: false,
            confirmhidevisible: false,
            usercommentmodal: false,
            otherscommentmodal: false,
        };
        this.currentcommentid = null;
        this.currentcommentownerid = null;
        this.bottomodallistowneroptions = [
            {
                listtext: 'Delete Comment',
                onPress: () => {
                    this.setState({ usercommentmodal: false });
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
                icon: {
                    name: 'volume-x',
                    type: 'feather'
                },
                onPress: () => {
                    this.setState({ otherscommentmodal: false });
                },
            },
        ];
        if (this.props.userprofile.profile_id == this.props.parentpost.profile.profile_id) {
            this.bottomodallistothersoptions = [...this.bottomodallistothersoptions, {
                listtext: 'Hide comment',
                icon: {
                    name: 'eye-off',
                    type: 'feather'
                },
                onPress: () => {
                    this.setState({ otherscommentmodal: false });
                    this.setState({ confirmhidevisible: true });
                }
            }]
        }

    }
    componentDidMount() {
        if (checkData(this.props.parentpost)) {
            this.props.onFetch(this.props.parentpost.postid);
        }
    }
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
    _setSelected = (commentid, ownerid) => {
        if (checkData(commentid) && checkData(ownerid)) {
            this.currentcommentid = commentid;
            this.currentcommentownerid = ownerid;
        }
        if (ownerid == this.props.userprofile.profile_id) {
            this._openUserBottomModal();
        } else {
            this._openOthersBottomModal();
        }
    };
    _openOthersBottomModal = () => {
        this.setState({ otherscommentmodal: true })
    };
    _openUserBottomModal = () => {
        this.setState({ usercommentmodal: true })
    };
    _onDeletePress = () => {
        this.setState({ confirmdeletevisible: false });
        this.props.onDelete(this.currentcommentid, this.currentcommentownerid);
    };
    _onItemLiked = (commentid, likestatus, numlikes) => {
        if (checkData(commentid) != true ||
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
        this.props.onItemLike(commentid, likestatus, numlikes);
    };
    _navShowLikes = (commentid) => {
        if (checkData(commentid) != true) {
            return;
        }
        Navigation.showModal({
            component: {
                name: 'LikesList',
                passProps: {
                    navparent: true,
                    requrl: 'postcommentlikes',
                    reqdata: { commentid }
                },
            }
        });
    };
    _getItemLayout = (data, index) => (
        { length: this.reswidth, offset: this.reswidth * index, index }
    );
    _keyExtractor = (item, index) => item.commentid;
    _renderItem = ({ item }) => {
        return (
            <ListItem
                time={item.created_at}
                onRetryPress={item.onRetry}
                onLongPress={() => this._setSelected(item.commentid, item.profile.profile_id)}
                //replyPress={}
                leftAvatar={{ uri: item.profile.avatar[1] }}
                title={item.profile.user.username}
                subtitle={item.comment_text}
                likes={item.num_likes}
                numLikesPress={() => this._navShowLikes(item.commentid)}
                likebtn
                likePress={() => this._onItemLiked(item.commentid, item.commentliked, item.num_likes)}
                liked={item.commentliked}
                replies={item.num_replies}
            />)
    }
    render() {
        let emptyplaceholder = this._setEmptyPlaceholder();
        //to hide pull to refresh functionality  when data is empty
        let onRefresh = this.props.data < 1 ? null : () => this.props.onRefresh(this.props.parentpost.postid);
        let headerComponent = checkData(this.props.parentpost) == true ?
            <View style={styles.postTextContainer}>
                {<ListItem
                    time={this.props.parentpost.created_at}
                    likes={this.props.parentpost.num_post_likes}
                    numLikesPress={() => Navigation.showModal({
                        component: {
                            name: 'LikesList',
                            passProps: {
                                navparent: true,
                                requrl: 'postlikes',
                                reqdata: { postid: this.props.parentpost.postid }
                            },
                        }
                    })}
                    title={this.props.parentpost.profile.user.username}
                    leftAvatar={{ uri: this.props.parentpost.profile.avatar[1] }}
                    subtitle={this.props.parentpost.post_text}
                    timeTextStyle={{ fontSize: responsiveFontSize(1.6) }}
                    BottomContainerItem={
                        <View style={{
                            flexDirection: 'row', alignItems: "center",
                        }}>
                            <Text style={{
                                fontSize: responsiveFontSize(1.5),
                                color: "silver",
                                margin: 2
                            }}>{this.props.parentpost.num_post_comments} comments</Text>
                        </View>
                    }
                />
                }
            </View> : null;
        let flatlistfooter = null;
        if (this.props.loadingmore == true) {
            flatlistfooter = <View style={{
                flex: 1,
                justifyContent: "center",
                margin: 6,
                alignItems: "center"
            }}>
                <ActivityIndicator
                    size={30}
                    color={colors.border} />
            </View>;
        } else if (this.props.loadingmore == 'retry') {
            flatlistfooter = <View style={{
                flex: 1,
                justifyContent: "center",
                margin: 6,
                alignItems: "center"
            }}>
                <Icon
                    color={colors.text}
                    size={responsiveFontSize(4)}
                    onPress={() => this.props.onLoadMore(this.props.parentpost.postid)}
                    name="sync"
                    type="antdesign"
                />
                <Text style={{ color: colors.border, fontSize: responsiveFontSize(1.5) }}>Tap to retry</Text>
            </View>;
        } else if (this.props.loadingmore == false) {
            flatlistfooter = <View style={{
                flex: 1,
                justifyContent: "center",
                margin: 10,
                alignItems: "center"
            }}>
                <Icon
                    color={colors.text}
                    size={responsiveFontSize(5)}
                    onPress={() => this.props.onLoadMore(this.props.parentpost.postid)}
                    name="plus"
                    type="evilicon"
                />
            </View>;
        }

        return (
            <>
            <FlatList
                ref={ref => {
                    this.props.setFlatlistRef(ref)
                }}
                data={this.props.data}
                getItemLayout={this._getItemLayout}
                refreshing={this.props.refreshing}
                maxToRenderPerBatch={1}
                updateCellsBatchingPeriod={1}
                windowSize={2}
                onRefresh={onRefresh}
                keyboardShouldPersistTaps='always'
                initialNumRender={5}
                keyboardDismissMode={'on-drag'}
                keyExtractor={this._keyExtractor}
                ListHeaderComponent={headerComponent}
                ListEmptyComponent={emptyplaceholder}
                ListFooterComponent={this.props.data.length > 0 && flatlistfooter}
                renderItem={this._renderItem}
            />
            <ConfirmModal
                isVisible={this.state.confirmdeletevisible}
                confirmMsg="Delete comment?"
                acceptText="Yeah"
                acceptAction={this._onDeletePress}
                rejectAction={() => this.setState({ confirmdeletevisible: false })}
                rejectText="Nah"
            />
            <ActivityOverlay
                text="deleting"
                isVisible={this.props.deleting}
            />
            <ConfirmModal
                isVisible={this.state.confirmhidevisible}
                confirmMsg="Hide comment?"
                acceptText="Yeah"
                acceptAction={() => {
                    this.setState({ confirmhidevisible: false });
                    this.props.onHide(this.currentcommentid, this.props.userprofile.profile_id);
                }}
                rejectAction={() => this.setState({ confirmhidevisible: false })}
                rejectText="Nah"
            />
            <ActivityOverlay
                text="hiding"
                isVisible={this.props.hiding}
            />

            <BottomListModal
                listData={this.bottomodallistowneroptions}
                visible={this.state.usercommentmodal}
                onRequestClose={() => {
                    this.setState({ usercommentmodal: false });
                }}
            />
            <BottomListModal
                listData={this.bottomodallistothersoptions}
                visible={this.state.otherscommentmodal}
                onRequestClose={() => {
                    this.setState({ otherscommentmodal: false });
                }}
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