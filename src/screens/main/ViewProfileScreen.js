import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { Text, Avatar, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { LoaderScreen, Header, InputBox, } from '../../components/reusable/ResuableWidgets';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import { useTheme } from '../../assets/themes/index';
import TouchableScale from 'react-native-touchable-scale';
import { checkData } from '../../utilities/index';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { Navigation } from 'react-native-navigation';

const { colors } = useTheme();

const ViewProfileScreen = ({
    componentId,
    state,
    authuser,
    authprofile,
    navparent,
    reqprofileid,
    screentype
}) => {
    const [loaded, setLoaded] = useState(false);
    let lefticon = navparent == true ? <Icon
        type="evilicon"
        name="arrow-left"
        color={colors.text}
        size={responsiveFontSize(6)}
    /> : null;
    let lefticonpress = navparent == true ?
        () => Navigation.dismissModal(componentId)
        : null;
    let righticon = <Icon
        type="entypo"
        onPress={() => { }}
        name="dots-three-vertical"
        color={colors.text}
        size={responsiveFontSize(2.5)}
    />;
    let righticonpress = '';
    /**compoent function goes here */
    useEffect(() => {
        EntypoIcon.getImageSource('user', 100).then(e =>
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
            <Header
                headercolor={colors.card}
                headertext={authuser.username}
                headerStyle={{
                    elevation: 0.8
                }}
                headertextcolor={colors.text}
                headertextsize={responsiveFontSize(2.5)}
                lefticon={lefticon}
                righticon={righticon}
            />
            {loaded == false ?
                <ActivityIndicator size="large" color="#2196F3" /> :
                <></>}
        </SafeAreaView >

    );
};

const mapStateToProps = (state) => ({
    authprofile: state.profile,
    authuser: state.user
});

ViewProfileScreen.options = {
    topBar: {
        visible: false
    },
    bottomTabs: {
        visible: true
    },
    bottomTab: {
        text: 'Profile',
    }

};


const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: colors.background
    }
});

export default connect(mapStateToProps, actions)(ViewProfileScreen);