import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ActivityIndicator, View } from 'react-native';
import { Icon, Input, Text } from 'react-native-elements';
import { Header, LoaderScreen, InputBox } from '../../components/reusable/ResuableWidgets';
import { useTheme } from '../../assets/themes';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Navigation } from 'react-native-navigation';
import { responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import { ViewPager } from '@shankarmorwal/rn-viewpager';
import ProfileList2 from '../../components/reusable/ProfileList2';


const { colors } = useTheme();
const FindUserScreen = ({
    componentId,
    navparent,
    screentype,
    timelineposts,
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
                        if (text.length > 0) {
                            viewpager.setPage(1)
                        } else {
                            viewpager.setPage(0)
                        }
                    }}
                    inputvalue={searchText}
                    placeholder="Search for people"
                    leftIcon={{
                        name: "user",
                        margin: 8,
                        color: colors.text,
                        type: 'entypo'
                    }}
                    onSubmit={() => {
                    }}
                />
                <ViewPager
                    initialPage={0}
                    ref={viewpager => setViewPager(viewpager)}
                    style={{ flex: 1 }}
                    keyboardDismissMode='none'
                >
                    <View key={0}>
                        <ProfileList2 data={timelineposts} />
                    </View>
                    <View key={1} style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: 'center'
                    }}>
                        <Text style={{ color: colors.text }}>{searchText}</Text>
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