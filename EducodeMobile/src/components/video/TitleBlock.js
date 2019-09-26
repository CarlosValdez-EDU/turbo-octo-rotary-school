import React from 'react';
import {View, Text, SafeAreaView, StyleSheet } from 'react-native';
import B from '@components/common/BoldText';
import BlankSpace from '@components/common/BlankSpace';


export default function TitleBlock(props){
    return (
        <SafeAreaView>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}><B>Giving an Instruction</B></Text>
                <Text style={styles.subtitleText}>Introduction to computer science</Text>
                <BlankSpace height={10} />
                <Text style={styles.projectnameText}>Project 1 - Exercise 1</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    titleContainer:{
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },

    titleText:{
        fontSize: 24,
        fontFamily: 'Roboto-Bold',
        color: 'white',
    },

    subtitleText:{
        fontSize: 20,
        color: 'white',
    },

    projectnameText:{
        color: 'white',
        fontSize: 18,
    },

});