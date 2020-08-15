import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, View, ToastAndroid } from 'react-native';
import { Text, Image, Icon } from 'react-native-elements';
import ViewPager from '@react-native-community/viewpager';
import { checkData } from '../../../utilities';
import { Header } from '../../reusable/ResuableWidgets';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";

class ViewerImage extends Component {
    shouldComponentUpdate(nextProps) {
        if (nextProps.total != this.props.total) {
            return true;
        }
        return false;
    }

    _onError = () => {
        ToastAndroid.showWithGravity('Image not found it may have being deleted',
            ToastAndroid.LONG,
            ToastAndroid.CENTER);
    }

    render() {
        const { imageuri, imageindex, total, headerIcons, headerIconsActions, photolist } = this.props;
        const { lefticon, righticon, righticon2 } = headerIcons;
        const { righticonpress, lefticonpress, righticon2press } = headerIconsActions;
        _righticon2press = () => righticon2press(imageuri);
        _righticonpress = () => righticonpress(photolist);
        return (
            <View key={imageindex}>
                <Image
                    style={{ width: responsiveWidth(100), height: responsiveHeight(100) }}
                    placeholderStyle={{ backgroundColor: "black" }}
                    PlaceholderContent={<Icon
                        type="feather"
                        name="image"
                        color={'white'}
                        size={responsiveFontSize(6)}
                    />}
                    // onError={this._onError}
                    //containerStyle={{}}
                    resizeMode='contain'
                    source={{ uri: imageuri }}
                >
                    <Header
                        headerStyle={{ opacity: 0.7, marginTop: 35 }}
                        headertextsize={responsiveFontSize(3.6)}
                        lefticon={lefticon}
                        leftIconPress={lefticonpress}
                        righticon={righticon}
                        rightIconPress={_righticonpress}
                        righticon2={righticon2}
                        rightIcon2Press={_righticon2press}
                    />
                    {total < 2 ? null : <Text style={[styles.imageIndexTextStyle]}>{`${imageindex}/${total}`}</Text>}
                </Image>
            </View>

        );
    }
};


export default class PhotoViewer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            photos: this.props.photos
        }
        this.headerIconsActions = {
            ...this.props.headerIconsActions,
            righticon2press: this._removePage
        };
    }

    _renderItem = (arr) => {
        if (checkData(arr) != true) {
            return [];
        }
        let items = [];
        arr.map((val, index) => {
            items.push(
                <ViewerImage
                    key={index + 1}
                    imageuri={val}
                    photolist={this.state.photos}
                    imageindex={index + 1}
                    total={this.state.photos.length}
                    headerIcons={this.props.headerIcons}
                    headerIconsActions={this.headerIconsActions}
                />
            );
        });
        return items;
    };

    _removePage = (toremoveitem) => {
        if (checkData(toremoveitem) != true) {
            return;
        }
        let newpages = this.state.photos.filter(item => item != toremoveitem);
        newpages.length > 0 ? this.setState({ photos: newpages })
            : this.props.headerIconsActions.lefticonpress();
    };

    render() {
        return (
            <SafeAreaView style={[styles.containerStyle, {}]}>
                <ViewPager
                    orientation='horizontal'
                    transitionStyle='scroll'
                    keyboardDismissMode='none'
                    style={{ flex: 1, backgroundColor: "black", }} initialPage={0}>
                    {this._renderItem(this.state.photos)}
                </ViewPager>
            </SafeAreaView>
        );
    }

}






const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: "#000",
        flex: 1,
    },
    imageIndexTextStyle: {
        backgroundColor: "black",
        alignSelf: 'flex-end',
        width: 50,
        opacity: 0.7,
        marginHorizontal: 25,
        marginVertical: 10,
        borderRadius: 3,
        fontSize: responsiveFontSize(3),
        padding: 2,
        color: 'white',
        textAlign: "center",
    }
});