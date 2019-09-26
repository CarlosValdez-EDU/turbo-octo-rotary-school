import React from 'react';
import { View } from 'react-native';


const Container = ({ children, containerStyles }) => {
  
    return (
        <View style={{...styles.container, ...containerStyles}}>
            {children}
        </View>
    );
  };
  
const styles = {
    container: {
        borderRadius: 20,
        backgroundColor: 'white',
        width: 350,
        height: 330,
        flexDirection: 'column',
        paddingLeft: 10,
        paddingRight: 10
    }
};

export { Container };
