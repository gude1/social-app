import React, { Component, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { useTheme } from '../../assets/themes'
import { Navigation, } from 'react-native-navigation';
import { LoaderScreen } from '../../components/reusable/ResuableWidgets';
import {
    responsiveFontSize, responsiveHeight, responsiveWidth
} from 'react-native-responsive-dimensions';
import { Icon, Text } from 'react-native-elements';
import { Header } from '../../components/reusable/ResuableWidgets';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { checkData } from '../../utilities/index';

const { colors } = useTheme();

const PostSettingScreen = ({
    componentId,
    navparent,
}) => {
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
    /**compoent function goes here */
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
    /**compoent function ends here */


    return (
        <SafeAreaView style={styles.containerStyle}>
            <Header
                headertext="PostSetting"
                headercolor={colors.card}
                lefticon={lefticon}
                leftIconPress={lefticonpress}
                headerTextStyle={{ color: colors.text }}
                headertextsize={responsiveFontSize(2.9)}
            />
            {
                loaded == false ? <LoaderScreen
                    animationOff={true}
                    showLoading={true}
                    loaderIcon={<Icon
                        type="antdesign"
                        name="setting"
                        color={colors.text}
                        size={responsiveFontSize(10)}
                    />}
                    animationType={'zoomIn'}
                /> : <></>
            }
        </SafeAreaView >);
};

const mapStateToProps = (state) => ({
});

PostSettingScreen.options = {
    topBar: {
        visible: false
    }
};


const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: colors.background
    },

});

export default connect(mapStateToProps, actions)(PostSettingScreen);

