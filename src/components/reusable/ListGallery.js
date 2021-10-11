import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StatusBar,
  View,
  StyleSheet,
} from 'react-native';
import {Image, Icon, Text} from 'react-native-elements';

function Item({
  item,
  selected,
  onSelect,
  placeholdercolor,
  colors,
  height,
  width,
}) {
  return (
    <TouchableOpacity onPress={() => onSelect(item.caption)}>
      <Image
        source={{uri: item.photo}}
        containerStyle={{
          backgroundColor: colors.background,
          margin: 1,
          borderColor: colors.border,
          borderWidth: 1,
        }}
        placeholderStyle={{
          backgroundColor: colors.background,
        }}
        PlaceholderContent={
          <Icon
            name={'image'}
            type="evilicon"
            color={placeholdercolor}
            size={30}
          />
        }
        style={{height: width, width}}
      >
        {selected ? (
          <View
            style={{
              flex: 1,
              backgroundColor: 'black',
              opacity: 0.6,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon type="ionicon" name="md-checkmark" color="white" size={50} />
          </View>
        ) : null}
      </Image>
    </TouchableOpacity>
  );
}

function ListGallery({
  colors,
  dimensions,
  navigator,
  selected,
  photoList,
  placeholdercolor,
  selectAction,
}) {
  const {fontsize, reswidth, resheight} = dimensions;

  const onSelect = React.useCallback(
    (id) => {
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));

      selectAction(newSelected);
    },
    [selected],
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        backgroundColor={colors.statusbar}
        barStyle={colors.statusbartext}
      />
      <View style={[styles.headerStyle, {backgroundColor: colors.card}]}>
        <TouchableOpacity
          style={{marginLeft: 20}}
          onPress={() => {
            navigator != undefined ? navigator.pop() : '';
          }}
        >
          <Icon
            type="feather"
            name="arrow-left"
            color={colors.text}
            size={fontsize}
          />
        </TouchableOpacity>

        <TouchableOpacity style={{marginRight: 20}}>
          <Icon
            type="ionicon"
            name="md-checkbox-outline"
            color={colors.text}
            size={fontsize}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        numColumns={3}
        data={photoList}
        ListEmptyComponent={<ActivityIndicator size="large" color="#2196F3" />}
        renderItem={({item}) => (
          <Item
            item={item}
            colors={colors}
            width={reswidth}
            height={resheight}
            placeholdercolor={placeholdercolor}
            selected={!!selected.get(item.caption)}
            onSelect={onSelect}
          />
        )}
        keyExtractor={(item) => item.caption}
        extraData={selected}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    alignItems: 'center',
  },
  headerStyle: {
    height: 50,
    flexDirection: 'row',
    elevation: 0.5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  otherSectionStyle: {
    flex: 1,
    alignItems: 'center',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
  },
  title: {
    fontSize: 32,
  },
});

export default ListGallery;
