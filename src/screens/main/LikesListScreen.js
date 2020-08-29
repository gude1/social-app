import React, { useEffect, useState } from 'react';
import { Navigation } from 'react-native-navigation';
import { View, Text, StyleSheet, SafeAreaView, } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { LoaderScreen, Header } from '../../components/reusable/ResuableWidgets';
import { Icon, Avatar, Input } from 'react-native-elements';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import { useTheme } from '../../assets/themes/index';
import TouchableScale from 'react-native-touchable-scale';
import { checkData } from '../../utilities/index';
import LikesList from '../../components/reusable/LikesList';
const { colors } = useTheme();
const LikesListScreen = ({
    screenname,
    componentId,
    setReset,
    navparent,
    requrl,
    reqdata,
    updateLikesListForm,
    fetchLikes,
    followProfileAction,
    fetchMoreLikes,
    likeslistform,
    profileactionform
}) => {
    //console.warn(likeslistform)
    const [loaded, setLoaded] = useState(false);
    let lefticon = navparent == true ? <Icon
        type="evilicon"
        name="arrow-left"
        color={colors.text}
        size={responsiveFontSize(6)}
    /> : null;
    let lefticonpress = navparent == true ? () => Navigation.dismissModal(componentId) : null;
    let righticon = '';
    let righticonpress = '';
    useEffect(() => {
        const listener = {
            componentDidAppear: () => {
                setReset('likeslistform');
                if (!loaded) {
                    setLoaded(true);
                }
            },
            componentDidDisappear: () => {
            }

        };
        // Register the listener to all events related to our component
        const unsubscribe = Navigation.events().bindComponent(listener, componentId);
        return () => {
            // Make sure to unregister the listener during cleanup
            unsubscribe.remove();
        };
    }, []);

    return (
        <SafeAreaView style={styles.containerStyle}>
            <Header
                headertext={screenname || 'Likes'}
                headercolor={colors.card}
                lefticon={lefticon}
                leftIconPress={lefticonpress}
                headerTextStyle={{ color: colors.text }}
                headertextsize={responsiveFontSize(2.9)}
            />
            {loaded == false ? <LoaderScreen
                loaderIcon={<Icon
                    type="antdesign"
                    name="heart"
                    color={colors.text}
                    size={responsiveFontSize(10)}
                />}
                animationType={'zoomIn'}
            /> :
                <View style={styles.parentStyle}>
                    <LikesList
                        data={likeslistform.likeslist}
                        onFetch={() => fetchLikes(requrl, reqdata)}
                        fetching={likeslistform.fetching}
                        followProfileAction={followProfileAction}
                        processfollowing={profileactionform.followingprofile}
                        updateItem={updateLikesListForm}
                        onLoadMore={() => fetchMoreLikes(reqdata)}
                        loadingmore={likeslistform.loadingmore}
                    />
                </View>
            }
        </SafeAreaView>
    );
};
LikesListScreen.options = {
    topBar: {
        visible: false
    },
};

const mapStateToProps = (state) => ({
    likeslistform: state.likeslistform,
    profileactionform: state.profileactionform,
});
const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: colors.background
    },
    parentStyle: {
        flex: 1,
        backgroundColor: colors.background,
    },
});

export default connect(mapStateToProps, actions)(LikesListScreen);
