import React, { } from 'react';
import { View, Picker, StyleSheet } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import { batch } from 'react-redux';


const CustomPicker = ({
    containerPickerStyle,
    labelPickerCtnContainerStyle,
    pickerContainerStyle,
    icon,
    labelText,
    errorMessage,
    placeholderColor,
    labelStyle,
    enabled,
    backgroundColor,
    selectedValue,
    onValueChange,
    mode,
    options,
    borderColor,
}) => {

    const createOptions = () => {
        let items = [];
        options.forEach(element => {
            items.push(<Picker.Item key={element.key} label={element.key} value={element.value} />);
        });
        return (items);
    };




    const showPicker = () => {
        if (icon == undefined) {
            return (
                <View style={[styles.pickerContainerStyle, {
                    ...pickerContainerStyle,
                    borderColor: borderColor,
                }]}>

                    <Picker
                        selectedValue={selectedValue}
                        style={{
                            width: '100%',
                            color: placeholderColor,
                            backgroundColor: backgroundColor
                        }}
                        enabled={enabled}
                        mode={mode}
                        prompt={labelText}
                        onValueChange={onValueChange}>
                        {createOptions()}
                    </Picker>

                </View >
            );
        } else {
            return (
                <View style={[styles.pickerContainerStyle, {
                    ...pickerContainerStyle,
                    borderColor: borderColor,
                }]}>
                    <View style={{ width: '20%' }}>
                        <Icon
                            {...icon}
                        />
                    </View>
                    <View style={{ width: '80%' }}>
                        <Picker
                            selectedValue={selectedValue}
                            style={{
                                width: '100%',
                                color: placeholderColor,
                                backgroundColor: backgroundColor
                            }}
                            mode={mode}
                            enabled={enabled}
                            prompt={labelText}
                            onValueChange={onValueChange}>
                            {createOptions()}
                        </Picker>
                    </View>
                </View>
            );
        }
    };


    return (
        <View style={[styles.containerPickerStyle, {
            ...containerPickerStyle,
        }]}>
            <View style={[styles.labelPickerCtnContainerStyle, {
                ...labelPickerCtnContainerStyle
            }]}>
                <Text style={[styles.labelStyle, {
                    ...labelStyle
                }]}>{labelText}</Text>
                {showPicker()}
            </View>
            <View style={{ width: '80%' }}>
                <Text style={[styles.errorMsgStyle]}>
                    {errorMessage}
                </Text>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    containerPickerStyle: {
        alignItems: "center",
        width: '100%',
    },
    labelPickerCtnContainerStyle: {
        width: '95%',
        alignItems: "center",
    },
    labelStyle: {
        alignSelf: 'flex-start',
        fontWeight: "bold",
        fontSize: 16
    },
    pickerContainerStyle: {
        marginVertical: 8,
        borderBottomWidth: 1,
        alignItems: "center",
        flexDirection: 'row',
        //borderWidth: 1,
        borderColor: "black",
        width: "100%",
    },
    errorMsgStyle: {
        alignSelf: 'flex-start',
        color: "red",
        fontWeight: "bold",
    }
});

export default CustomPicker;
