import React, { useEffect, useState } from "react";
import {
    SafeAreaView,
    View,
    StatusBar,
    StyleSheet,
    ActivityIndicator,
    Platform,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import {
    Image, Icon, Text
} from 'react-native-elements';


function GalleryImage({ d, colors, reswidth, placeholdercolor, selected, onSelect }) {
    return (<TouchableOpacity
        onPress={() => onSelect(d.caption)}
    >
        <Image
            source={{ uri: d.photo }}
            containerStyle={{
                backgroundColor: colors.background,
                margin: 1,
                borderColor: colors.border,
                borderWidth: 1,
            }}
            placeholderStyle={{
                backgroundColor: colors.background
            }}
            PlaceholderContent={<Icon
                name={'image'}
                type='evilicon'
                color={placeholdercolor}
                size={30}
            />}
            style={{ height: reswidth, width: reswidth }}
        >
            {!!selected.get(d.caption) ? <View style={{
                flex: 1, backgroundColor: "black", opacity: 0.5,
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Icon
                    type="ionicon"
                    name="md-checkmark"
                    color="white"
                    size={50}
                />
            </View>
                : null
            }
        </Image>
    </TouchableOpacity >);
}

const GalleryList = ({ colors, navigator, photoList, numPhoto, dimensions, error, selected, selectAction }) => {
    const { reswidth, resheight, fontsize } = dimensions;
    const placeholdercolor = 'dimgray';
    const showContent = () => {
        if (error != '') {
            return null;
        }
        return photoList.length == 0 ? <View style={{
            flex: 1,
            justifyContent: "center", backgroundColor: colors.background,
            alignItems: "center"
        }}>
            <ActivityIndicator size="large" color="#2196F3" />
        </View>
            :
            <ScrollView
                refreshing={true}
                showsVerticalScrollIndicator={false}
            >
                <View style={[{
                    flex: 1,
                    flexDirection: "row",
                    flexWrap: 'wrap',
                    backgroundColor: colors.background,
                    alignItems: "center"
                }]}>
                    {showPhotos(photoList)}
                </View>
            </ScrollView>

    };

    const showPhotos = (data) => {
        let photo = [];
        data.forEach((d) => {
            photo.push(
                <GalleryImage
                    d={d}
                    colors={colors}
                    key={d.caption}
                    onSelect={onSelect}
                    reswidth={reswidth}
                    placeholdercolor={placeholdercolor}
                    selected={selected}
                    selectAction={selectAction}
                />
            );
        });
        return photo;
    };

    const onSelect = React.useCallback(
        id => {
            const newSelected = new Map(selected);
            newSelected.set(id, !selected.get(id));

            selectAction(newSelected);
        },
        [selected],
    );
    /**
     * functions
     */

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={colors.statusbar} barStyle={colors.statusbartext} />
            <View style={[styles.headerStyle, { backgroundColor: colors.card }]}>
                <TouchableOpacity
                    style={{ marginLeft: 20 }}
                    onPress={() => navigator.pop()}
                >
                    <Icon
                        type="feather"
                        name="arrow-left"
                        color={colors.text}
                        size={fontsize}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ marginRight: 20 }}
                >
                    <Icon
                        type="ionicon"
                        name="md-checkbox-outline"
                        color={colors.text}
                        size={fontsize}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.otherSectionStyle}>
                {showContent()}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        alignItems: "center"
    },
    headerStyle: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
    },
    otherSectionStyle: {
        flex: 1,
        alignItems: "center"
    },
});

export default GalleryList;

