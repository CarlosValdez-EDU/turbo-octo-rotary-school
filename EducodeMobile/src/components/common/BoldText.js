import React, {Component} from 'react';
import {Text, StyleSheet} from 'react-native';

export default BoldText = (props) => {

    return(
        <Text style={styles.element}>{props.children}</Text>
    );

}

const styles = StyleSheet.create({

    element:{
        fontFamily: 'Roboto-Bold',
    }

});