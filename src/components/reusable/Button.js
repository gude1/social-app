import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import w3Native from './w3Native';

const Button = (props) => {

    return (
        <TouchableOpacity style={[styles.button, props.style]} onPress={props.onPress}>
            <Text style={{ color: '#fff' }}>{props.buttonText}</Text>
        </TouchableOpacity >
    );
}

const styles = StyleSheet.create({
    button: {
        borderColor: '#2196F3',
        alignSelf: 'stretch',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#2196F3',
        borderWidth: 1,
        borderRadius: 5

    }
});

export default Button;
