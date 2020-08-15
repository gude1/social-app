import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-elements';
import { useTheme } from '../../assets/themes'
import Icon from 'react-native-vector-icons/Entypo';
import { Navigation } from 'react-native-navigation';

const { colors } = useTheme();

const ExploreScreen = ({ componentId }) => {
    const [loaded, setLoaded] = useState(false);
    /**compoent function goes here */
    useEffect(() => {
        Icon.getImageSource('magnifying-glass', 100).then(e =>
            Navigation.mergeOptions(componentId, {
                bottomTab: {
                    icon: e,
                }
            }));
        const listener = {
            componentDidAppear: () => {
                setLoaded(true);
            },
            componentDidDisappear: () => {
                //console.log('RNN', `componentDidDisappear`);
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
            {loaded == false ? <ActivityIndicator size="large" color="#2196F3" /> :
                <Text h5>Explore</Text>}
        </SafeAreaView>

    );
};
ExploreScreen.options = {
    topBar: {
        title: {
            text: 'Explore'
        }
    },
    bottomTab: {
        text: 'Explore',
    }

};


const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.background
    }
});

export default ExploreScreen;