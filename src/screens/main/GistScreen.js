import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-elements';
import { useTheme } from '../../assets/themes'
import Icon from 'react-native-vector-icons/Entypo';
import { Navigation } from 'react-native-navigation';

const { colors } = useTheme();

const GistScreen = ({ componentId }) => {
    const [loaded, setLoaded] = useState(false);
    /**compoent function goes here */
    useEffect(() => {
        Icon.getImageSource('emoji-flirt', 100).then(e =>
            Navigation.mergeOptions(componentId, {
                bottomTab: {
                    icon: e,
                }
            }));
        setLoaded(true);
    }, []);
    /**compoent function ends here */
    return (
        <SafeAreaView style={styles.containerStyle}>
            {loaded == false ? <ActivityIndicator size="large" color="#2196F3" /> :
                <Text h5>Gist</Text>}
        </SafeAreaView>

    );
};
GistScreen.options = {
    topBar: {
        title: {
            text: 'Gist'
        }
    },
    bottomTabs: {
        visible: true
    },
    bottomTab: {
        text: 'Gist',
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

export default GistScreen;