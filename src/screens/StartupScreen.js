import React from 'react';
import {
    useState,
    useEffect,
} from 'react';
import {
    ActivityIndicator,
    SafeAreaView,
    StatusBar,
    View,
    StyleSheet
} from 'react-native';

import {
    Avatar,
    Text,
    Button
} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { store } from '../store';
let animationRef = '';
export const handleRef = () => {
    animationRef.swing();
};
const StartupScreen = () => {
    //const { colors } = useTheme();
    return (
        <SafeAreaView style={[styles.containerView]}>
            <StatusBar backgroundColor="#f1f1f1" barStyle="dark-content" />
            <View style={styles.bodyContainerStyle}>
                <View style={styles.topSectionStyle}>
                    <Animatable.View
                        useNativeDriver={true}
                        animation="pulse"
                        iterationCount="infinite"
                        style={{ alignItems: 'center' }}
                        easing="ease-in-out-expo"
                    >
                        <Avatar rounded title="CM" size={80}
                            containerStyle={[styles.imageContainerStyle]}
                            overlayContainerStyle={styles.imageStyle}
                            titleStyle={styles.imageTitleStyle}
                        />
                    </Animatable.View>
                </View>
                <View style={[styles.bottomSectionStyle]}>
                    <ActivityIndicator size="large" color="#2196F3" />
                    <Animatable.View
                        useNativeDriver={true}
                        animation="pulse"
                        iterationCount="infinite"
                        style={{ alignItems: 'center' }}
                        easing="ease-in-out-expo"
                    >
                        <Text style={styles.appNameTextStyle}>Campus meetup</Text>
                    </Animatable.View>

                </View>
            </View>





            {/*<Animatable.View
                animation="fadeIn"
                animation="pulse"
                useNativeDriver={true}
                style={{ flex: 1 }}
            >
                <View style={styles.topSectionStyle}>
                    <Animatable.View
                        useNativeDriver={true}
                        iterationCount="infinite"
                        style={{ alignItems: 'center' }}
                        easing="ease-in-out-expo"
                    >
                        <Avatar rounded title="CM" size={80}
                            containerStyle={styles.imageContainerStyle}
                            overlayContainerStyle={styles.imageStyle}
                            titleStyle={styles.imageTitleStyle}
                        />
                        <Text style={[styles.textStyle, styles.appNameTextStyle]}>
                            AppName
                         </Text>
                        <Text style={[{ fontSize: 15, fontFamily: "cursive", margin: 20 }]}>
                            Social media for the young and free
                         </Text>

                    </Animatable.View>
                </View>
                <View style={styles.bottomSectionStyle}>
                    <ActivityIndicator size="large" color="#2196F3" />
                </View>
            </Animatable.View>*/}
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    containerView: {
        flex: 1,
        backgroundColor: "#fff"
    },
    bodyContainerStyle: {
        flex: 1,
        marginHorizontal: 40,
        marginVertical: 20,
    },
    topSectionStyle: {
        //borderWidth: 1,
        height: "75%",
        justifyContent: "center",
        alignItems: 'center',
    },
    bottomSectionStyle: {
        //borderWidth: 1,
        marginBottom: 20,
        height: "20%",
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    imageContainerStyle: {
        marginVertical: 2,
        borderWidth: 5,
        borderColor: 'white',
        elevation: 3
    },
    imageTitleStyle: {
        fontFamily: "cursive",
        fontSize: 28,
    },
    appNameTextStyle: {
        fontWeight: "bold",
        color: "#616161",
        fontFamily: "helvetica",
        fontSize: 18,
    },
    buttonStyle: {
        width: 320,
        alignSelf: 'center',
        marginVertical: 5,
        borderRadius: 10,
        padding: 15,
    },
    textStyle: {
        color: 'black',
        //fontFamily: 'FontAwesome',
        marginVertical: 1,

        //borderWidth: 3,
    },
});

export default StartupScreen;

