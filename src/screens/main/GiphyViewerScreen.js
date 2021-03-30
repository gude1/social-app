import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, ActivityIndicator } from 'react-native';
import { Text, Icon, Button, Image } from 'react-native-elements';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { useTheme } from '../../assets/themes';
import { ImageGallery, InputBox, LoaderScreen, Header } from '../../components/reusable/ResuableWidgets';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Navigation } from 'react-native-navigation';
import axios from 'axios';
import { checkData } from '../../utilities/index';


const { colors } = useTheme();

const GiphyViewerScreen = ({ navparent, componentId, onSubmit, smallavatar, avatar }) => {
    //console.warn(smallavatar, avatar);
    let lefticon = navparent == true ? <Icon
        type="antdesign"
        name="arrowleft"
        iconStyle={{
            color: "rgb(255,255,255)",
            fontWeight: "bold",
            padding: 3,
            borderRadius: 6,
            backgroundColor: 'rgba(0,0,0,0.6)'
        }}
        size={responsiveFontSize(4.5)}
    /> : null;
    let lefticonpress = navparent == true ? () => Navigation.dismissModal(componentId) : null;
    let righticon = checkData(onSubmit) == true ? <Icon
        type="feather"
        name="send"
        iconStyle={{
            color: "white",
            fontWeight: "bold",
            padding: 3,
            borderRadius: 6,
            backgroundColor: 'rgba(0,0,0,0.6)'
        }}
        size={responsiveFontSize(4.5)}
    /> : null;
    let righticonpress = () => onSubmit(smallavatar, avatar);
    /**COMPONENT FUNCTIONS STARTS HERE */
    useEffect(() => {
        const listener = {
            componentDidAppear: () => {
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
    /**COMPONENT FUNCTIONS ENDS HERE */

    return (
        <View style={styles.containerStyle}>
            <Image
                style={{ width: responsiveWidth(100), height: responsiveHeight(100) }}
                placeholderStyle={{ backgroundColor: "black" }}
                PlaceholderContent={
                    <Icon
                        type="feather"
                        name="image"
                        color={'white'}
                        size={responsiveFontSize(6)}
                    />
                }
                resizeMode='contain'
                source={{ uri: smallavatar }}
            >
                <Header
                    headerStyle={{ opacity: 0.7, marginTop: 35 }}
                    headertext="GIPHY"
                    headertextsize={responsiveFontSize(3.6)}
                    headertextcolor={'white'}
                    lefticon={lefticon}
                    leftIconPress={lefticonpress}
                    righticon={righticon}
                    rightIconPress={righticonpress}
                />
                <Text style={{ textAlign: "center", color: colors.iconcolor }}>Gifs are gotten from giphy.api.com</Text>
                <Text style={{ textAlign: "center", color: colors.iconcolor }}>Gif is clearer once uploaded</Text>
            </Image>
        </View>
    );
};

GiphyViewerScreen.options = {
    topBar: {
        visible: false,
        backgroundColor: 'black',
        style: 'light'
    },
    statusBar: {
        visible: false,
        backgroundColor: 'black',
        style: 'light'
    },
};

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: 'black'
    },
});


export default GiphyViewerScreen;
