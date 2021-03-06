import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-elements';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { useTheme } from '../../assets/themes'
import Icon from 'react-native-vector-icons/Entypo';
import { Navigation } from 'react-native-navigation';
import asyncStorage from '@react-native-community/async-storage';
import { store } from '../../store/index';
import Echo from 'laravel-echo';
import socketio from 'socket.io-client';


const { colors } = useTheme();
const GistScreen = ({ componentId, fetchPrivateChatList, setTimelinePostRefresh, offlineactions, connected }) => {
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

       /* try {
            let { user } = store.getState();
            let echoinstance = new Echo({
                //host: "http://192.168.43.30:6001",
                host: "http://192.168.43.30:6001",
                broadcaster: 'socket.io',
                client: socketio,
            });
            alert(echoinstance.toString())
            echoinstance.channel('notifyMan')
                .listen('NotifyEvent', e => alert(e.toString()));

        } catch (e) {
            alert(e.toString() + ' outsisde')
        }*/

    }, []);
    /**component function ends here */
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

const mapStateToProps = state => ({
    connected: state.network.isConnected,
    offlineactions: state.offlineactions,
});

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.background
    }
});

export default connect(mapStateToProps, actions)(GistScreen);