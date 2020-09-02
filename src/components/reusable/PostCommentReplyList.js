import React, { Component } from 'react';
import { FlatList, StyleSheet, View, ActivityIndicator } from 'react-native';
import { ListItem, ConfirmModal, BottomListModal, PanelMsg, ActivityOverlay } from './ResuableWidgets';
import { responsiveFontSize, responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import { useTheme } from '../../assets/themes';
import { checkData } from '../../utilities';
import { Icon, Overlay, Text, Button } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import TouchableScale from 'react-native-touchable-scale/src/TouchableScale';


export default class PostCommentReplyList extends Component {
    constructor(props) {
        super(props);
        this.reswidth = responsiveWidth(100);
        this.resheight = responsiveHeight(100);
        this.state = {
            confirmdeletevisible: false,
            confirmhidevisible: false,
            replyhidden: false,
            profilemuted: false,
            confirmmutevisible: false,
            userreplymodal: false,
            othersreplymodal: false,
        };
        this.currentreplyid = null;
        this.currentreplyownerprofile = null;
        this.currentreplyownerid = null;
    }
    componentDidMount() {
        if (checkData(this.props.origin)) {
            this.props.onFetch(this.props.origin.commentid || this.props.origin.replyid);
        }
    }
    _getItemLayout = (data, index) => {
        if (index == -1) return { index, length: 0, height: 0 };
        return { length: 100, offset: 100 * index, index }
    };

    _keyExtractor = (item, index) => item.replyid;

    render() {
        return (
            <>
            </>
        );
    }
}