import React from 'react';
import {
  View,
  TextInput
} from 'react-native';

const Input = (
  { value,
    key,
    maxLength,
    onChangeText,
    placeholder,
    secureTextEntry,
    underlineColorAndroid,
    placeholderTextColor,
    keyboardType,
    autoCapitalize,
    editable,
    inputStyles = styles.input,
  }) => {

  return (
    <View>
      <TextInput
        key={key}
        maxLength={maxLength}
        style={[inputStyles, inputStyles]}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        value={value}
        onChangeText={onChangeText}
        underlineColorAndroid={underlineColorAndroid}
        placeholderTextColor={placeholderTextColor}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        editable={editable}
      />
    </View>
  );
}

const styles = {
  input: {
    height: 50,
    color: 'black',
    borderTopColor: '#ffffff',
    borderBottomColor: 'black',
    borderLeftColor: '#ffffff',
    borderRightColor: '#ffffff',
    borderWidth: 0.5,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 5,
    fontFamily: 'Roboto-Thin',
  },
};

export { Input };