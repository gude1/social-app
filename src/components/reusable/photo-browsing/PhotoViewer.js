import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, View, ToastAndroid } from 'react-native';
import { Text, Image, Icon, Input } from 'react-native-elements';
import { checkData } from '../../../utilities';
import { Header, InputBox } from '../../reusable/ResuableWidgets';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import { ViewPager } from '../viewpager/index';
import { TextInput } from 'react-native';
import { ScrollView } from 'react-native';

class ViewerImage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

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

    _renderInput = (index) => {
        if (this.props.showinput != true || !checkData(index)) {
            return null;
        }
        return (
            <Input
                //autoFocus={true}
                placeholder={'Add a caption'}
                placeholderTextColor={'gray'}
                leftIcon={{
                    type: "antdesign",
                    name: "edit",
                    color: "white",
                    fontWeight: "bold",
                    padding: 3,
                    borderRadius: 6,
                    //backgroundColor: 'rgba(0,0,0,0.2)'
                }}
                onChangeText={(txt) => {
                    this.props.updatePhotos({ id: index, inputtxt: txt });
                }}
                multiline={true}
                inputContainerStyle={{
                    borderBottomWidth: 0,
                    width: responsiveWidth(100),
                    borderLeftWidth: 0.6,
                    // borderWidth: 1,
                    borderColor: "gray",
                    width: '100%',
                    // backgroundColor: 'rgba(0,0,0,0.3)'
                }}
                containerStyle={{
                    //borderWidth: 1,
                    flexDirection: 'row',
                    maxHeight: 100,
                    margin: 0,
                    padding: 0,
                    //borderColor: "green"
                    backgroundColor: 'rgba(0,0,0,0.3)'
                }}
                inputStyle={{
                    color: 'white',
                    //borderWidth: 1,
                    //borderColor: "red",
                    //backgroundColor: 'rgba(0,0,0,0.3)'
                }}
            />
        );
    }

    render() {
        const { imageuri, imageindex, total, headerIcons, headerIconsActions, updatePhotos, photolist } = this.props;
        const { lefticon, righticon, righticon2 } = headerIcons;
        const { righticonpress, lefticonpress, righticon2press } = headerIconsActions;
        _righticon2press = () => righticon2press(imageindex);
        _righticonpress = () => righticonpress();
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
                    {this._renderInput(imageindex)}
                    {total < 2 ? null : <Text style={[styles.imageIndexTextStyle]}>{`${imageindex}/${total}`}</Text>}

                </Image>
            </View >

        );
    }
};


export default class PhotoViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photos: this.props.photos.map((item, index) => {
                return {
                    id: index + 1,
                    imageuri: item,
                    inputtxt: null,
                }
            }),
        };

        this.headerIconsActions = {
            ...this.props.headerIconsActions,
            righticonpress: () => {
                this.props.headerIconsActions.righticonpress(this.state.photos, 'yo');
            },
            righticon2press: this._removePage
        };
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.props.photos.length != nextProps.photos.length ||
            this.state.photos.length != nextState.photos.length) {
            return true;
        }
        return false;
    }
    _updatePhotos = (obj) => {
        if (!checkData(obj)) {
            return;
        }
        let photos = this.state.photos.map(item => {
            return item.id == obj.id ? { ...item, ...obj } : item;
        })
        this.setState({ photos: photos });
    }

    _renderItem = (arr) => {
        if (checkData(arr) != true) {
            return [];
        }
        let items = [];
        arr.map((item, index) => {
            items.push(
                <ViewerImage
                    key={item.id}
                    updatePhotos={this._updatePhotos}
                    imageuri={item.imageuri}
                    photolist={this.state.photos}
                    showinput={this.props.showinput}
                    imageindex={item.id}
                    total={this.state.photos.length}
                    headerIcons={this.props.headerIcons}
                    headerIconsActions={this.headerIconsActions}
                />
            );
        });
        return items;
    };
    _removePage = (id) => {
        if (checkData(id) != true) {
            return;
        }
        let newpages = this.state.photos.filter(item => item.id != id);
        newpages = newpages.map((item, index) => {
            return { ...item, id: index + 1 };
        });
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
        fontSize: responsiveFontSize(2.4),
        padding: 2,
        color: 'white',
        textAlign: "center",
    }
});