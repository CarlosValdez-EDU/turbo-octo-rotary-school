import React, { Component } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native';


function NewFeaturesListItem(props){
    return(
       <View style={styles.container}>
           <Image 
                style={styles.bulletImage}
                source={require('@assets/img/check.png')}
            />
           <Text style={styles.textItem}>{props.title}</Text>
       </View>
    );
}

const styles = StyleSheet.create({

    container:{
        flexDirection: 'row',
        backgroundColor:'transparent',
        flex: 1,
        alignItems: 'center'
    },

    bulletImage:{
        height: 25,
        width: 25,
        paddingRight: 15,
        paddingTop: 10,
    },

    textItem:{
        fontSize: 20,
        color: 'white',
        paddingLeft: 40,
        fontFamily: 'Roboto-Regular'
    }
});



export default NewFeaturesListItem;