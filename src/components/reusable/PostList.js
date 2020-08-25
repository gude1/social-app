import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Header, ImageViewPager, BottomListModal, ConfirmModal } from './ResuableWidgets';
import { useTheme } from '../../assets/themes/index';
import { responsiveWidth, responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import { Icon, Avatar, Image, Overlay, Button } from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import ViewPager from '@react-native-community/viewpager';
import * as  Animatable from 'react-native-animatable';
import { checkData, toHumanReadableTime } from '../../utilities/index';
import { Navigation } from 'react-native-navigation';
import { store } from '../../store/index';
import { taggedTemplateExpression } from '@babel/types';
import TouchableScale from 'react-native-touchable-scale';


const { colors } = useTheme();
const postwidth = responsiveWidth(94) > 1024 ? 1024 : responsiveWidth(94);
const postheight = responsiveWidth(94) > 1024 ? 1024 : responsiveWidth(94);

class PostImageViewPager extends Component {
    constructor(prop) {
        super(prop)
        this.pagerItems = this._createPagers(this.props.images,
            <ActivityIndicator
                size="large"
                color={'#B0B0B0'} />
        );
    }
    shouldComponentUpdate() {
        return false;
    }
    _viewImage = (data) => {
        Navigation.showModal({
            component: {
                name: 'PhotoViewer',
                passProps: {
                    navparent: true,
                    photos: data
                },
            }
        });
    }

    _createPagers = (data, placeholder) => {
        if (checkData(data) != true || data.length < 1 || !Array.isArray(data)) {
            return null;
        }
        let total = data.length;
        let arr = [];
        data.map((image, index) => {
            arr.push(
                <View key={index + 1}>
                    <Image
                        source={{ uri: image }}
                        PlaceholderContent={placeholder}
                        resizeMode="cover"
                        style={styles.postImageStyle}
                        placeholderStyle={styles.postImagePlaceHolderStyle}
                        containerStyle={styles.postListItemContainerAvatar}
                    >
                        <View style={styles.postImageOptions}>
                            {total < 2 ? null
                                :
                                <Text style={[styles.imageIndexTextStyle]}>
                                    {`${index + 1}/${total}`}
                                </Text>
                            }
                            <TouchableHighlight
                                onPress={() => this._viewImage([image])}
                                style={styles.btnViewPostImage}
                            >
                                <Icon
                                    type="feather"
                                    name="image"
                                    color={'white'}
                                    size={responsiveFontSize(2.5)}
                                />
                            </TouchableHighlight>
                        </View>
                    </Image>
                </View>

            );
        });
        return arr;
    };

    render() {

        return (
            <ViewPager
                orientation='horizontal'
                style={{
                    width: postwidth + 1,
                    height: postheight,
                    backgroundColor: colors.background,
                }}
                showPageIndicator={true}
                initialPage={0}
                keyboardDismissMode='none'
            >
                {this.pagerItems}
            </ViewPager>
        );
    }
}



class PostItem extends Component {
    constructor(prop) {
        super(prop);
        this.store = store.getState();
        this.profileid = this.store.profile.profile_id;
        this.bottombariconsize = responsiveFontSize(3.5);
        this.topbariconsize = responsiveFontSize(2.5);
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.postliked != this.props.postliked ||
            nextProps.postshared != this.props.postshared ||
            nextProps.numlikes != this.props.numlikes ||
            nextProps.numshares != this.props.numshares ||
            nextProps.numcomments != this.props.numcomments ||
            nextProps.created_at != this.props.created_at
        ) {
            return true;
        }
        return false;
    }

    _setLikeIcon = () => {
        return this.props.postliked == "postliked" ? <Icon
            type="antdesign"
            name="heart"
            color={'red'}
            style={styles.postListItemBottomBarIcon}
            size={this.bottombariconsize}
        /> : <Icon
                type="antdesign"
                name="hearto"
                color={colors.text}
                style={styles.postListItemBottomBarIcon}
                size={this.bottombariconsize}
            />;
    };

    _setShareIcon = () => {
        return this.props.postshared == 'postshared' ? <Icon
            type="entypo"
            name="forward"
            color={'green'}
            style={styles.postListItemBottomBarIcon}
            size={this.bottombariconsize}
        /> : <Icon
                type="entypo"
                name="forward"
                color={colors.text}
                style={styles.postListItemBottomBarIcon}
                size={this.bottombariconsize}
            />;
    };

    render() {
        //console.warn('uo');
        return (
            <View style={styles.postListItemContainer}>

                <View style={styles.postListItemTopBar}>
                    <View style={styles.postListItemTopBarItem}>
                        <Avatar size={35} rounded
                            ImageComponent={FastImage}
                            source={{ uri: this.props.posteravatar }}
                            containerStyle={styles.postListItemTopBarItemAvatar} />
                        <View>
                            <Text style={styles.postListItemTopBarItemHeaderText}>
                                {this.props.posterusername}
                            </Text>
                            <Text style={styles.postTimeStyle}>
                                {toHumanReadableTime(this.props.created_at)}
                            </Text>
                        </View>
                    </View>
                    <TouchableScale
                        activeScale={0.7}
                        onPress={this.profileid == this.props.profileid ?
                            this.props.onUserPostOption : this.props.onOthersPostOption}
                    >
                        <Icon
                            type="antdesign"
                            name="ellipsis1"
                            color={colors.text}
                            size={30}
                        />
                    </TouchableScale>
                </View>

                <View style={styles.postImageViewPagerContainer}>
                    <PostImageViewPager
                        images={this.props.postimages}
                    />
                </View>

                <View style={styles.postListItemBottomBar}>
                    <View style={styles.postListItemBottomBarItem}>
                        <TouchableScale
                            activeScale={0.8}
                            onPress={() => this.props.onLikePress(
                                this.props.postid,
                                this.props.postliked,
                                this.props.numlikes,
                            )}
                            style={styles.postListItemBottomBarItem}
                        >
                            {this._setLikeIcon()}
                        </TouchableScale>
                        <Text style={styles.postListItemBottomBarText}>{this.props.numlikes}</Text>
                    </View>

                    <View style={styles.postListItemBottomBarItem}>
                        <TouchableScale
                            activeScale={0.7}
                            onPress={this.props.onCommentPress}
                        >
                            <Icon
                                type="antdesign"
                                name="message1"
                                color={colors.text}
                                style={styles.postListItemBottomBarIcon}
                                size={responsiveFontSize(3)}
                            />
                        </TouchableScale>
                        <Text style={styles.postListItemBottomBarText}>
                            {this.props.numcomments}
                        </Text>
                    </View>
                    <View style={styles.postListItemBottomBarItem}>
                        <TouchableScale
                            style={styles.postListItemBottomBarItem}
                            activeScale={0.8}
                            onPress={() => this.props.onSharePress(
                                this.props.postid,
                                this.props.postshared,
                                this.props.numshares,
                            )}
                        >
                            {this._setShareIcon()}
                        </TouchableScale>
                        <Text style={styles.postListItemBottomBarText}>
                            {this.props.numshares}
                        </Text>
                    </View>

                </View>
                {
                    checkData(this.props.posttext) ?
                        <View style={styles.postTextContainer}>
                            <Text style={styles.postText}>
                                <Text style={{ fontWeight: 'bold' }}>
                                    {this.props.posterusername}
                                </Text> {this.props.posttext}
                            </Text>
                        </View> : null
                }
            </View >
        );
    }
}


export default class PostList extends React.PureComponent {
    constructor(prop) {
        super(prop);
        this.state = {
            otherspostvisible: false,
            userpostvisible: false,
            confirmdeletevisible: false,
            confirmarchivevisible: false,
            confirmblacklistvisible: false,
            confirmmutevisible: false,
            processingdelete: false
        };
        this.onEndReachedCalledDuringMomentum = true;
        this.currentselectedpostid = '';
        this.currentselectedpostownerid = '';
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
        ]
        this.bottomodallistoptions = [
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
                listtext: 'Mute post from this profile',
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
        this.viewabilityConfig = {
            waitForInteraction: true,
            viewAreaCoveragePercentThreshold: 0
        }
        this.headertext = "Posts";
        this.reswidth = responsiveWidth(100);
        this.leftIcon = <Icon
            type="antdesign"
            name="plus"
            style={{ borderWidth: 2, padding: 2, borderRadius: 10, borderColor: colors.text }}
            color={colors.text}
            size={responsiveFontSize(3)}
        />;
        this.rightIcon = <Icon
            type="antdesign"
            name="setting"
            color={colors.text}
            size={responsiveFontSize(4)}
        />;
    }
    componentDidMount() {
        this.props.onRefresh();
    }
    _setSelected = (postid, postprofileid) => {
        if (checkData(postid) == true && checkData(postprofileid) == true) {
            this.currentselectedpostid = postid;
            this.currentselectedpostownerid = postprofileid;
        }
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
            this.currentselectedpostownerid
        );
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

    _arrangePostImage = (data) => {
        if (!Array.isArray(data) || data.length < 1) {
            return null;
        } else {
            let postimages = data.map(image => image.postimage);
            return postimages;
        }
    };

    _handleOthersPostOptions = () => {
        this.setState({ otherspostvisible: true });
    };

    _handleUserPostOptions = () => {
        this.setState({ userpostvisible: true })

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
                    ownerpostid: post.postid,
                },
            }
        });
    }

    _renderItem = ({ item }) => {
        return <PostItem
            posterusername={item.profile.user.username}
            posteravatar={item.profile.avatar[1]}
            postimages={this._arrangePostImage(item.post_image)}
            postliked={item.postliked}
            profileid={item.profile.profile_id}
            created_at={item.created_at}
            postid={item.postid}
            onOthersPostOption={() => {
                this._handleOthersPostOptions();
                this._setSelected(item.postid, item.profile.profile_id);
            }}
            onUserPostOption={() => {
                this._handleUserPostOptions();
                this._setSelected(item.postid, item.profile.profile_id);
            }}
            postshared={item.postshared}
            posttext={item.post_text}
            numlikes={item.num_post_likes}
            numcomments={item.num_post_comments}
            numshares={item.num_post_shares}
            onLikePress={this._likePostItem}
            onSharePress={this._sharePostItem}
            onCommentPress={() => {
                this._openComments(item);
            }}
        />
    };

    _keyExtractor = (item, index) => item.postid;

    _getItemLayout = (data, index) => (
        { length: this.reswidth, offset: this.reswidth * index, index }
    );

    _setEmptyPlaceholder = () => {
        if (this.props.refreshing == true) {
            return <View style={{
                alignItems: "center",
                height: 200,
                justifyContent: 'center'
            }}>
                <ActivityIndicator size="large" color={'silver'} />
            </View>;
        } else if (this.props.refreshing == 'failed' || this.props.data.length < 1) {
            return <View
                style={{ alignItems: "center", height: 200, justifyContent: 'center' }}>
                <Icon
                    onPress={this.props.onRefresh}
                    color={colors.text}
                    size={responsiveFontSize(4)}
                    name="sync"
                    type="antdesign"
                />
                <Text style={{ color: colors.text }}>Tap to retry </Text>
            </View>
        }
        return null;
    };
    render() {
        //console.warn('messi');
        let emptyplaceholder = this._setEmptyPlaceholder();
        let refreshing = this.props.refreshing == 'failed' ? false : this.props.refreshing;
        //to hide pull to refresh functionality  when data is empty
        let onRefresh = this.props.data < 1 ? null : this.props.onRefresh;
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
                    onPress={this.props.onLoadMorePress}
                    name="sync"
                    type="antdesign"
                />
                <Text style={{ color: colors.border }}>Tap to retry</Text>
            </View>;
        } else if (this.props.loadingmore == false) {
            flatlistfooter = <View style={{
                flex: 1,
                justifyContent: "center",
                margin: 6,
                alignItems: "center"
            }}>
                <Icon
                    color={colors.text}
                    size={responsiveFontSize(7)}
                    onPress={this.props.onLoadMorePress}
                    name="plus"
                    type="evilicon"
                />
            </View>;
        }

        return (
            <View style={styles.containerStyle} >
                <Header
                    headertext={this.headertext}
                    headerTextStyle={{ color: colors.text, }}
                    headerStyle={{ elevation: 0 }}
                    headertextsize={responsiveFontSize(2.5)}
                    lefticon={this.leftIcon}
                    leftIconPress={() => {
                        Navigation.mergeOptions('POST_HOME_SCREEN', {
                            bottomTabs: {
                                visible: false
                            }
                        });
                        Navigation.push('POST_HOME_SCREEN', {
                            component: {
                                name: 'CreatePost',
                                passProps: {
                                    navparent: true
                                }
                            }
                        });
                    }}
                    rightIconPress={null}
                    righticon={this.rightIcon}
                />

                <FlatList
                    viewabilityConfig={this.viewabilityConfig}
                    removeClippedSubviews={true}
                    maxToRenderPerBatch={5}
                    showsVerticalScrollIndicator={false}
                    updateCellsBatchingPeriod={0}
                    refreshing={refreshing}
                    initialNumRender={5}
                    windowSize={50}
                    onRefresh={onRefresh}
                    data={this.props.data}
                    //extraData={this.props.extraData}
                    getItemLayout={this._getItemLayout}
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                    ListEmptyComponent={emptyplaceholder}
                    ListFooterComponent={this.props.data.length > 0 && flatlistfooter}
                />
                <ConfirmModal
                    isVisible={this.state.confirmdeletevisible}
                    confirmMsg="Delete Post?"
                    acceptText="Yes"
                    acceptAction={this._onDeletePress}
                    rejectAction={() => this.setState({ confirmdeletevisible: false })}
                    rejectText="No"
                />
                <ConfirmModal
                    isVisible={this.state.confirmarchivevisible}
                    confirmMsg="Archive Post?"
                    acceptText="Yes"
                    acceptAction={this._onArchivePress}
                    rejectAction={() => this.setState({ confirmarchivevisible: false })}
                    rejectText="No"
                />
                <ConfirmModal
                    isVisible={this.state.confirmblacklistvisible}
                    confirmMsg="Blacklist post?"
                    acceptText="Yes"
                    acceptAction={this._onBlackListPress}
                    rejectAction={() => this.setState({ confirmblacklistvisible: false })}
                    rejectText="No"
                />
                <ConfirmModal
                    isVisible={this.state.confirmmutevisible}
                    confirmMsg="Mute posts from this profile?"
                    acceptText="Yes"
                    acceptAction={this._onMuteProfilePress}
                    rejectAction={() => this.setState({ confirmmutevisible: false })}
                    rejectText="No"
                />
                <BottomListModal
                    listData={this.bottomodallistoptions}
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
                <Overlay
                    isVisible={this.props.onitemdeleting}
                    animationType="fade"
                    overlayStyle={styles.progressOverlay}
                >
                    <View style={styles.progressOverlay}>
                        <Text style={{ color: colors.text }}>Deleting</Text>
                        <ActivityIndicator
                            size={'small'}
                            color={colors.border} />
                    </View>
                </Overlay>
                <Overlay
                    isVisible={this.props.onitemarchiving}
                    animationType="fade"
                    overlayStyle={styles.progressOverlay}
                >
                    <View style={styles.progressOverlay}>
                        <Text style={{ color: colors.text }}>Archiving</Text>
                        <ActivityIndicator
                            size={'small'}
                            color={colors.border} />
                    </View>
                </Overlay>

                <Overlay
                    isVisible={this.props.onitemblacklisting}
                    animationType="fade"
                    overlayStyle={styles.progressOverlay}
                >
                    <View style={styles.progressOverlay}>
                        <Text style={{ color: colors.text }}>Blacklisting</Text>
                        <ActivityIndicator
                            size={'small'}
                            color={colors.border} />
                    </View>
                </Overlay>
                <Overlay
                    isVisible={this.props.onitemmuting}
                    animationType="fade"
                    overlayStyle={styles.progressOverlay}
                >
                    <View style={styles.progressOverlay}>
                        <Text style={{ color: colors.text }}>Muting</Text>
                        <ActivityIndicator
                            size={'small'}
                            color={colors.border} />
                    </View>
                </Overlay>

            </View >
        );
    }
};


const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: colors.background
    },
    postImageViewPagerContainer: {
        marginTop: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    postListItemContainer: {
        backgroundColor: colors.background,
        borderBottomColor: colors.border,
        borderBottomWidth: 0.18,
        alignItems: "center",
        paddingBottom: 10,
        justifyContent: "center",
        width: '100%',
    },
    postImagePlaceHolderStyle: {
        backgroundColor: colors.background,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderWidth: 0.6,
        borderColor: colors.border
    },
    imageIndexTextStyle: {
        backgroundColor: "black",
        opacity: 0.9,
        //padding: 20,
        marginVertical: 10,
        borderRadius: 10,
        fontSize: responsiveFontSize(2),
        padding: 2,
        color: 'white',
        textAlign: "center",
    },
    btnViewPostImage: {
        backgroundColor: 'black',
        borderRadius: 10,
        padding: 5,
        opacity: 0.9,
    },
    postImageOptions: {
        alignSelf: 'flex-end',
        alignItems: "center",
        width: 80,
        marginVertical: 10,
        flex: 1,
    },
    postListItemBottomBarText: {
        color: colors.text,
        marginHorizontal: 1,
        fontSize: responsiveFontSize(1.8)
    },
    postText: {
        marginHorizontal: 7,
        flex: 1,
        color: colors.text
    },
    postTimeStyle: {
        marginLeft: 1,
        color: "dimgray"
    },
    postImageStyle: {
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        width: postwidth,
        height: postheight
    },
    postListItemContainerAvatar: {
    },
    postListItemBottomBarIcon: {
        marginHorizontal: 1,
        elevation: 3
    },
    postTextContainer: {
        padding: 5,
        width: postwidth,
        //borderWidth: 1,
        flexDirection: 'row'
    },
    postListItemTopBar: {
        width: postwidth,
        flexDirection: "row",
        //borderWidth: 1,
        justifyContent: "space-between",
        alignItems: 'center',
        padding: 15,
        paddingVertical: 10,
    },
    postListItemTopBarItem: {
        flexDirection: 'row',
        alignItems: 'center',
        //borderWidth: 1,
    },
    postListItemTopBarItemAvatar: {
        backgroundColor: colors.border,
        marginRight: 5
    },
    postListItemTopBarItemHeaderText: {
        color: colors.text,
        fontWeight: "bold",
        fontSize: responsiveFontSize(2)
    },
    postListItemBottomBar: {
        width: postwidth,
        flexDirection: "row",
        //borderWidth: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 5,
    },
    postListItemBottomBarItem: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 5,
        justifyContent: 'space-evenly',
        //borderWidth: 1,
    },
    modalChildContainer: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    optionListContainer: {
        width: '100%',
        maxWidth: 1080,
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: colors.background,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        minHeight: '5%',
        elevation: 7
    },
    bottomModalOptionListRow: {
        flexDirection: 'row',
        width: '100%',
        margin: 5,
        paddingHorizontal: 15
    },
    bottomModalListIconItem: {
        flex: 1,
        justifyContent: "center"
    },
    bottomModalListTextItem: {
        flex: 3,
        justifyContent: "center"
    },
    progressOverlay: {
        width: 100,
        backgroundColor: colors.background,
        flexDirection: 'row',
        height: 70,
        alignItems: "center",
        justifyContent: "space-around"
    }
});