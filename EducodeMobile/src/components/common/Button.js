import React from 'react';
import { Text, TouchableOpacity} from 'react-native';

const Button = ({
  onPress, 
  children, 
  buttonStyles = styles.buttonStyle, 
  textStyle = styles.text,
  buttonStyleOverride,
  textStyleOverride
  }) => {

  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyles, buttonStyleOverride]}>
      <Text style={[textStyle, textStyleOverride]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  text: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 20,
    fontFamily: 'Roboto',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    alignSelf: 'stretch',
    backgroundColor: '#F37B20',
    borderColor: '#F37B20',
    borderRadius: 30,
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 1
  }
};

export { Button };
