import React from 'react';
import BlankSpace from '@components/common/BlankSpace';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

export default function GenericBlock(props){
    return(
        <View style={styles.rootContainer}>
            <View style={styles.container}>
                <Text style={styles.textInsideTitle}>{props.title}</Text>
                <View style={styles.contentContainer}>
                    {props.content}
                </View>
            </View>

            <BlankSpace height='5%'/>

            <TouchableOpacity
                onPress={props.pressAction}
                style={styles.startSkipButton}>
                <Text style={styles.startSkipButtonText}>{props.titleButtonText}</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({

    rootContainer:{
        backgroundColor: 'transparent',
        height: '100%',
        width: '100%',
    },

    contentContainer:{
        marginBottom: '10%'
    },

    container: {
        justifyContent: 'center',
        backgroundColor: 'rgb(72,72,72)',
        height: '40%',
    },

    textInsideTitle:{
        color: 'white',
        fontFamily: 'Roboto-Bold',
        fontSize: 25,
        paddingLeft: '14%',
    },

    startSkipButton:{
        backgroundColor: 'rgb(100,185,169)',
        borderRadius: 30,
        width: '20%',
        justifyContent: 'center',
        alignSelf: 'center',
    },

    startSkipButtonText:{
        fontFamily: 'Roboto-Bold',
        color: 'white',
        justifyContent: 'center',
        alignSelf: 'center',
        marginLeft: 10,
        marginRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 20,
    },

});