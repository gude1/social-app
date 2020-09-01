import React from 'react';
import {
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
    StatusBar,
    View,
    StyleSheet,
} from 'react-native';
//import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import {
    Image, Icon, Text
} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import { checkData } from '../../../utilities';
//import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

class MyListHeader extends React.PureComponent {
    _passSelectedData = (param) => {
        if (checkData(param) == true) {
            //console.warn([...param.keys()]);
            this.props.onDisplaySelect({
                navparent: true,
                photos: [...param.keys()],
                onSubmit: this.props.onDisplayedProps.onSubmit
            })
        }
    };
    _turnOnSelect = () => {
        return this.props.isnumselect ? this._passSelectedData(this.props.itemsselected) : this.props.turnOnSelect();
    };
    render() {
        const { colors, onNavigate, dimensions,
            maxnumselect, isnumselect, turnOffSelect, itemsselected
    } = this.props;
        const { fontsize } = dimensions;
        const numselect = itemsselected.size;
        const headerText = isnumselect ?
            numselect < 1 ? 'Tap photo to select' : `${numselect} / ${maxnumselect}`
            : null;
        const backBtn = isnumselect ? turnOffSelect : onNavigate;
        const displayBtn = isnumselect ?
            numselect > 0 ?
                <Text style={{ fontSize: 22, marginHorizontal: 5, color: "#2196F3" }}>OK</Text>
                : null
            : <Icon
                type="ionicon"
                name="md-checkbox-outline"
                color={colors.text}
                size={fontsize}
            />;

        return (
            <View style={[styles.headerStyle, { backgroundColor: colors.card }]}>
                <TouchableOpacity
                    style={{
                        marginHorizontal: 5,
                        justifyContent: "center",
                        alignItems: "center",
                        width: responsiveWidth(18),
                        height: responsiveHeight(8),
                    }}
                    onPressIn={backBtn}
                >
                    <Icon
                        type="evilicon"
                        name="arrow-left"
                        color={colors.text}
                        size={responsiveFontSize(6)}
                    />
                </TouchableOpacity>

                <Text style={{ fontSize: 22, fontWeight: 'bold', marginHorizontal: 5, color: colors.text }}>{headerText}</Text>
                <TouchableOpacity
                    style={{
                        marginHorizontal: 5,
                        justifyContent: "center",
                        alignItems: "center",
                        width: responsiveWidth(18),
                        height: responsiveHeight(8),
                    }}
                    onPressIn={this._turnOnSelect}
                >
                    {displayBtn}
                </TouchableOpacity>
            </View>
        );
    }
}


class MyListItem extends React.Component {
    shouldComponentUpdate(nextProp, newState) {
        if (nextProp.selected != this.props.selected) {
            return true;
        }
        return false;
    }
    _onPress = (photo) => {
        const { isnumselect, item, onPressItem, getParentState } = this.props;
        getParentState().isnumselect == false ?
            this.props.onClick({
                navparent: true,
                photos: [photo],
                onSubmit: this.props.onDisplayedProps.onSubmit
            })
            : onPressItem(item.photo);

    };
    render() {
        const { item, colors, dimensions } = this.props;
        const { reswidth } = dimensions;
        const placeholdercolor = 'dimgray';
        const child = this.props.selected ?
            <View style={{
                flex: 1, backgroundColor: "black", opacity: 0.6,
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Icon
                    type="ionicon"
                    name="md-checkmark"
                    color="white"
                    size={50}
                />
            </View> : null;
        return (
            <TouchableOpacity
                style={{ height: reswidth, width: reswidth }}
                onPress={() => this._onPress(item.photo)}
                onLongPress={() => this.props.onPressItem(item.photo)}>
                <Image
                    //source={require('../../../assets/images/Penguins.jpg')}
                    source={{
                        uri: item.photo,
                        priority: FastImage.priority.high
                    }}
                    ImageComponent={FastImage}
                    placeholderStyle={{ backgroundColor: colors.border }}
                    containerStyle={{
                        margin: 0.5,
                    }}
                    style={{ height: reswidth - 2, width: reswidth }}
                >
                    {child}
                </Image>
            </TouchableOpacity>
        );
    }
}



export default class PhotoGallery extends React.PureComponent {
    constructor(prop) {
        super(prop);
        this.viewabilityConfig = {
            waitForInteraction: true,
            minimumViewTime: 4000,
            viewAreaCoveragePercentThreshold: 0
        }
        this._renderItem = this._renderItem.bind(this);
        this.state = {
            selected: new Map(),
            isnumselect: false,
            loaded: false,
            photosnum: 0
        };
    }
    componentDidMount() {
        this.setState({ loaded: true });
    }

    _onPressItem = (id) => {
        // updater functions are preferred for transactional updates
        this.setState((state) => {
            // copy the map rather than modifying state.
            const selected = new Map(state.selected);
            let numselected = state.numselected;
            let isnumselect = state.isnumselect;
            if (selected.has(id)) {
                selected.delete(id);
                selected.size < 1 ? isnumselect = false : isnumselect = isnumselect;
            } else if (selected.has(id) == false && !(state.selected.size >= this.props.maxSelect)) {
                selected.set(id);
                isnumselect = true;
            }
            return { selected, isnumselect };
        });
    };

    _turnOnSelect = () => {
        this.setState({ isnumselect: true });
    };
    _turnOffSelect = () => {
        this.setState({ selected: new Map(), isnumselect: false });
    };
    _getState = () => {
        return this.state;
    };
    _renderItem({ item }) {
        return (
            <MyListItem
                item={item}
                onClick={this.props.onItemClick}
                onDisplayedProps={{
                    onSubmit: this.props.onSubmit
                }}
                colors={this.props.colors}
                getParentState={this._getState}
                dimensions={this.props.dimensions}
                onPressItem={this._onPressItem}
                selected={!!this.state.selected.has(item.photo)}
                title={item.caption}
            />
        );
    }
    _keyExtractor = (item, index) => item.photo;
    _getItemLayout = (data, index) => (
        { length: this.props.dimensions.reswidth, offset: this.props.dimensions.reswidth * index, index }
    )



    render() {
        const { colors, dimensions, photoList, onCancel, onDisplayImages } = this.props;
        const { fontsize, reswidth, resheight } = dimensions;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
                <MyListHeader
                    colors={colors}
                    // numselect={this.state.numselected}
                    maxnumselect={this.props.maxSelect}
                    onDisplayedProps={{
                        onSubmit: this.props.onSubmit
                    }}
                    isnumselect={this.state.isnumselect}
                    itemsselected={this.state.selected}
                    turnOnSelect={this._turnOnSelect}
                    turnOffSelect={this._turnOffSelect}
                    onNavigate={this.props.onCancel}
                    onDisplaySelect={onDisplayImages}
                    dimensions={dimensions}
                />
                {this.state.loaded == false ? <ActivityIndicator size="large" color="#2196F3" />
                    : <FlatList
                        viewabilityConfig={this.viewabilityConfig}
                        windowSize={50}
                        updateCellsBatchingPeriod={0}
                        numColumns={2}
                        initialNumRender={5}
                        getItemLayout={this._getItemLayout}
                        ListEmptyComponent={<ActivityIndicator size="large" color="#2196F3" />}
                        data={this.props.photoList}
                        extraData={this.state.selected}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                    />}
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        alignItems: "center"
    },
    headerStyle: {
        height: 60,
        flexDirection: 'row',
        elevation: 0.5,
        alignItems: 'center',
        justifyContent: "space-between",
    },
    otherSectionStyle: {
        flex: 1,
        alignItems: "center"
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
    },
    title: {
        fontSize: 32,
    },
});