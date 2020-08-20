import React, { useEffect, useState } from 'react';
import { Navigation } from 'react-native-navigation';
import { View, Text, StyleSheet, SafeAreaView, } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { LoaderScreen, Header, InputBox, } from '../../components/reusable/ResuableWidgets';
import { Icon, Avatar, Input } from 'react-native-elements';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import { useTheme } from '../../assets/themes/index';
import TouchableScale from 'react-native-touchable-scale';
import { checkData } from '../../utilities/index';

const LikesListScreen = ({ resultSchema, requrl, reqdata, getLikes }) => {
    return null;
};

LikesListScreen.options = {
    topBar: {
        visible: false
    },
};

const mapStateToProps = (state) => ({

});
const styles = StyleSheet.create({

});

export default connect(mapStateToProps, actions)(PostCommentScreen);
