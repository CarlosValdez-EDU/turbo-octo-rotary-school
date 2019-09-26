import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function BlankSpace(props){
    return(
        <View style={[styles.container, {height: props.height}]}/>
    );
}


const styles = StyleSheet.create({

    container: {
        width: '100%',
        backgroundColor: 'transparent',
    },

});