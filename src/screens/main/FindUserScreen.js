import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ActivityIndicator, View } from 'react-native';
import { Icon, Input, Text, Button } from 'react-native-elements';
import { Header, LoaderScreen, InputBox } from '../../components/reusable/ResuableWidgets';
import { useTheme } from '../../assets/themes';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Navigation } from 'react-native-navigation';
import { responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import { ViewPager } from '../../components/reusable/viewpager';
import ProfileList2 from '../../components/reusable/ProfileList2';
import { checkData } from '../../utilities/index';


const { colors } = useTheme();
const FindUserScreen = ({
    componentId,
    navparent,
    screentype,
    timelineposts,
    fetchProfiles,
    fetchMoreProfiles,
    fetchSearchList,
    fetchMoreSearchList,
    updateSearchList,
    updateProfilesList,
    userslist,
    setProcessing,
}) => {

    const [loaded, setLoaded] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [viewpager, setViewPager] = useState(null);
    let lefticon = navparent == true ? <Icon
        type="evilicon"
        name="arrow-left"
        color={colors.text}
        size={responsiveFontSize(6)}
    /> : null;
    let lefticonpress = navparent == true ? setDimissNav() : null;
    let righticon = <Icon
        type="antdesign"
        name="search1"
        style={{ borderColor: colors.text }}
        color={colors.text}
        size={responsiveFontSize(3.5)}
    />;
    let righticonpress = null;

    /**
     * component function
     */
    //console.warn(userslist.profileslistnexturl);
    useEffect(() => {
        const listener = {
            componentDidAppear: () => {
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

    function setPlaceholder() {
        switch (userslist.searchlistfetching) {
            case true:
                return (
                    <View style={{
                        flexDirection: "row",
                        height: 200,
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <ActivityIndicator size={20} color={'silver'} />
                        <Text style={{
                            marginHorizontal: 5,
                            fontSize: responsiveFontSize(2.1),
                            color: colors.border
                        }}>
                            Searching
                        </Text>
                    </View>
                );
                break;
            case 'retry':
                return (
                    <View style={{ alignItems: "center", height: 200, justifyContent: "center" }}>
                        <Text style={{
                            color: colors.border,
                            textAlign: "center",
                            fontWeight: "bold", fontSize: responsiveFontSize(2.5)
                        }}>
                            Oops!, something went wrong
                </Text>
                        <Button
                            type="outline"
                            onPress={() => {
                                fetchSearchList(searchText);
                            }}
                            icon={{
                                name: 'sync',
                                type: "antdesign",
                                size: responsiveFontSize(2.7),
                                color: colors.text
                            }}
                            title="Try again"
                            titleStyle={{ color: colors.text, fontSize: responsiveFontSize(1.5) }}
                            buttonStyle={{
                                marginTop: 10,
                                borderColor: colors.text,
                                borderRadius: 15,
                                width: 100,
                                padding: 10
                            }}
                        />
                    </View>
                );
                break;
            case 'noresult':
                return (
                    <View style={{
                        flexDirection: "row",
                        height: 200,
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <Text style={{
                            marginHorizontal: 5,
                            fontSize: responsiveFontSize(2.6),
                            color: colors.border
                        }}>
                            No search result for "{searchText}"
                    </Text>
                    </View>
                );
                break;
            default:
                return (
                    <View style={{
                        flexDirection: "row",
                        height: 200,
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                        <Icon
                            type="entypo"
                            name="users"
                            style={{ borderColor: colors.text, marginHorizontal: 3 }}
                            color={colors.border}
                            size={responsiveFontSize(4.5)}
                        />
                        <Icon
                            type="antdesign"
                            name="search1"
                            style={{ borderColor: colors.text, marginHorizontal: 3 }}
                            color={colors.border}
                            size={responsiveFontSize(4.5)}
                        />
                    </View>
                );
                break;
        }
    };
    //console.warn(userslist.searchlistnexturl);
    const renderView = () => {
        if (loaded == false) {
            return <LoaderScreen
                loaderIcon={null}
                animationType={'zoomIn'}
            />;
        }
        return (
            <View style={styles.contentContainerStyle}>
                <InputBox
                    showAvatar={false}
                    onChangeText={(text) => {
                        setSearchText(text);
                        setProcessing(false, 'searchlistfetching');
                        /* if (text.length > 0) {
                            checkData(view) viewpager.setPage(1)
                         } else {
                             viewpager.setPage(0)
                         }*/
                    }}
                    inputvalue={searchText}
                    placeholder="Search for people"
                    leftIcon={{
                        name: "users",
                        margin: 8,
                        color: colors.text,
                        type: 'entypo'
                    }}
                    onSubmit={() => {
                        if (!checkData(searchText)) {
                            return;
                        }
                        fetchSearchList(searchText);
                        viewpager.setPage(1);
                    }}
                />
                <ViewPager
                    initialPage={0}
                    ref={viewpager => setViewPager(viewpager)}
                    style={{ flex: 1 }}
                    keyboardDismissMode='none'
                >
                    <View key={0} style={{ flex: 1 }}>
                        <ProfileList2
                            data={userslist.profileslist}
                            onFetch={fetchProfiles}
                            fetching={userslist.profileslistfetching}
                            updateItem={updateProfilesList}
                            onLoadMore={fetchMoreProfiles}
                            loadingmore={userslist.profileslistloadingmore}
                        />
                    </View>
                    <View key={1} style={{ flex: 1 }}>
                        <ProfileList2
                            data={userslist.searchlist}
                            fetching={userslist.searchlistfetching}
                            updateItem={updateSearchList}
                            onLoadMore={fetchMoreSearchList}
                            loadingmore={userslist.searchlistloadingmore}
                            placeholder={setPlaceholder()}
                        />
                    </View>
                </ViewPager>
            </View>
        );
    };


    //function to determine dismiss of navigation based on screentype
    function setDimissNav() {
        if (screentype == "modal")
            return () => Navigation.dismissModal(componentId)
        else
            return () => Navigation.pop(componentId);
    }


    /**component function */

    return (
        <SafeAreaView style={styles.containerStyle}>
            <Header
                headertext="Find People"
                headercolor={colors.card}
                headerTextStyle={{ color: colors.text }}
                headerStyle={{ elevation: 1 }}
                headertextsize={responsiveFontSize(2.9)}
                lefticon={lefticon}
                leftIconPress={lefticonpress}
            />
            {renderView()}
        </SafeAreaView>
    );
};

FindUserScreen.options = {
    topBar: {
        visible: false
    }
};

const mapStateToProps = (state) => ({
    timelineposts: state.timelineposts.timelineposts,
    userslist: state.userslist,
});

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        margin: 0,
        backgroundColor: colors.background
    },
    contentContainerStyle: {
        flex: 1,
        margin: 0,
        backgroundColor: colors.background
    }
});

export default connect(mapStateToProps, actions)(FindUserScreen);