import React, { component, useState, useEffect } from 'react'
import { View, SafeAreaView, StyleSheet, ToastAndroid, } from 'react-native';
import { Icon } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import { Header, } from '../../components/reusable/ResuableWidgets';
import PhotoViewer from '../../components/reusable/photo-browsing/PhotoViewer';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { useTheme } from '../../assets/themes';
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions";
import { image_exists, checkData, Toast } from '../../utilities/index';

const { colors } = useTheme();


const PhotoViewerScreen = ({ componentId, navparent, photos, onSubmit, showinput }) => {
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
    let righticonpress = onSubmit;
    let righticon2 = checkData(onSubmit) == true ? <Icon
        type="feather"
        name="trash-2"
        iconStyle={{ color: "red", fontWeight: "bold" }}
        size={responsiveFontSize(4.5)}
    /> : null;

    /**
     * functions
     */
    useEffect(() => {
        const listener = {
            componentDidAppear: () => {
                checkImages();
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

    Navigation.mergeOptions(componentId, {
        statusBar: {
            visible: false,
        },
    });
    //to check if images exists
    const checkImages = async () => {
        if (!Array.isArray(photos) || photos.length < 1) {
            Toast('No photos to display', ToastAndroid.LONG);
            return;
        }
        await Promise.all(
            photos.map(async (img, index) => {
                console.warn('exists', img);
                let exists = await image_exists(img);
                if (!exists) {
                    Toast(
                        `Image ${index + 1}/${photos.length} could not be displayed,image might have being deleted`,
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                    );
                }
            })
        )

    }
    /**
     * functions
     */

    /***CONDITIONAL STATEMENTS STARTS HERE */
    /***CONDITIONAL STATEMENTS STARTS HERE */

    return (
        <SafeAreaView style={[styles.containerStyle, {}]}>
            <PhotoViewer
                photos={photos}
                showinput={showinput || false}
                headerIcons={{
                    lefticon,
                    righticon,
                    righticon2,

                }}
                headerIconsActions={{
                    lefticonpress,
                    righticonpress,
                }}

            />
        </SafeAreaView >
    );
};

PhotoViewerScreen.options = {
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
        backgroundColor: "black"
    }
});

export default PhotoViewerScreen; 