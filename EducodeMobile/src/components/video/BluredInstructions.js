import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import B from '@components/common/BoldText';


export default function BluredInstructions(props){
    return(
        <View>
            <Text style={styles.taskText}>{"\n"}1.- Use <B>robot.forward()</B> and <B>robot.left()</B> instructions to help the robot reach its goal</Text>
            <Text style={styles.taskText}>2.- The robot cannot leave the designated path</Text>
        </View>
    );
}

const styles = StyleSheet.create({

    instructionsContainer:{
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'gray',
    },

    taskText:{
        fontSize: 16,
        color: 'white',
        paddingLeft: '15%',
        width: '75%'
    },

});