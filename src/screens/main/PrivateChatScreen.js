import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ActivityIndicator, View } from 'react-native';
import { Text, ListItem, Button } from 'react-native-elements';
import { Header } from '../../components/reusable/ResuableWidgets';
import { useTheme } from '../../assets/themes'
import Icon from 'react-native-vector-icons/Entypo';
import { Navigation } from 'react-native-navigation';
import { responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import TouchableScale from 'react-native-touchable-scale/src/TouchableScale';

const { colors } = useTheme();

const PrivateChatScreen = ({ componentId }) => {
    const [loaded, setLoaded] = useState(false);
    let righticon = <Icon
        type="antdesign"
        name="plus"
        color={colors.text}
        size={responsiveFontSize(4)}
    />;
    let righticonpress = null;

    /**compoent function goes here */
    useEffect(() => {
        Icon.getImageSource('chat', 100).then(e =>
            Navigation.mergeOptions(componentId, {
                bottomTab: {
                    icon: e,
                }
            }));
        setLoaded(true);
    }, []);

    //function to determine dismiss of navigation based on screentype
    function setDismissNav() {
        if (screentype == "modal")
            return Navigation.dismissModal(componentId)
        else
            return Navigation.pop(componentId);
    }

    const renderView = () => {
        if (loaded == false) {
            return <ActivityIndicator size="large" color="#2196F3" />;
        } else if (loaded == true) {
            return (
                <>
                <Header
                    headertext="PrivateChat"
                    headercolor={colors.card}
                    headerTextStyle={{ color: colors.text }}
                    headerStyle={{ elevation: 0.5 }}
                    headertextsize={responsiveFontSize(2.9)}
                    righticon={righticon}
                />
                <View style={styles.contentContainerStyle}>
                    <ListItem
                        Component={TouchableScale}
                        onPress={() => { }}
                        activeScale={0.8}
                        friction={100}
                        tension={100}
                        containerStyle={{
                            backgroundColor: colors.background,
                            borderBottomWidth: 0.4,
                            borderColor: colors.border,
                            marginLeft: 30,
                            height: 75,
                            paddingVertical: 0,
                            paddingLeft: 0,
                        }}
                        leftAvatar={{
                            source: require('../../assets/images/Penguins.jpg'),
                            size: 55,
                            resizeMode: "contain"
                        }}
                        contentContainerStyle={{
                            justifyContent: "center",
                            marginLeft: 5,
                            marginTop: 5,
                        }}
                        title={'Programmer'}
                        subtitle={'growth'}
                        subtitleStyle={{ color: colors.iconcolor }}
                        titleStyle={{ fontWeight: "100", color: colors.text }}
                    />
                    <ListItem
                        Component={TouchableScale}
                        activeScale={0.8}
                        friction={100}
                        tension={100}
                        badge={{
                            value: 127,
                            badgeStyle: { backgroundColor: "#4CAF50", height: 28, borderRadius: 12 },
                        }}
                        containerStyle={{
                            backgroundColor: colors.background,
                            borderBottomWidth: 0.4,
                            borderColor: colors.border,
                            marginLeft: 30,
                            height: 75,
                            paddingVertical: 0,
                            paddingLeft: 0,
                        }}
                        leftAvatar={{
                            source: require('../../assets/images/placeholder.png'),
                            size: 55,
                            resizeMode: "contain"
                        }}
                        contentContainerStyle={{
                            justifyContent: "center",
                            marginLeft: 5,
                            marginTop: 5,
                        }}
                        title={'WuraGold:)'}
                        subtitle={'growth'}
                        subtitleStyle={{ color: colors.iconcolor }}
                        titleStyle={{ fontWeight: "100", color: colors.text }}
                    />
                </View>
                </>
            );
        }
    }

    /**compoent function ends here */
    return (
        <SafeAreaView style={styles.containerStyle}>
            {renderView()}
        </SafeAreaView>

    );
};
PrivateChatScreen.options = {
    topBar: {
        visible: false
    },
    bottomTabs: {
        visible: true
    },
    bottomTab: {
        text: 'Chat',
    }

};


const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: colors.background
    },
    contentContainerStyle: {
        flex: 1,
        marginTop: 5,
        marginBottom: 55,
        backgroundColor: colors.background,
    },
});

export default PrivateChatScreen;