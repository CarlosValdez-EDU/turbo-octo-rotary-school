import React from 'react';
import {
    TouchableOpacity
} from 'react-native';
import { View, CheckBox, Text } from 'native-base';

const Checkbox = ({ children, colorCheck, checked, onPress, containerStyle, checkboxStyle, textStyle }) => {

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={containerStyle || styles.containerStyle}>
                <CheckBox style={checkboxStyle || styles.checkBoxStyle} checked={checked} color={colorCheck}  />
                <Text style={textStyle || styles.textStyle}>{children}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = {
    containerStyle: {
        flexDirection: 'row',
    },
    checkBoxStyle: {
        alignContent: 'flex-start',
        alignItems: 'flex-start',
        borderRadius: 0,
        width: 20,
        height: 20,
    },
    textStyle: {
        paddingLeft: 20,
        fontSize: 18,
        color: 'gray'
    }
};

export { Checkbox }