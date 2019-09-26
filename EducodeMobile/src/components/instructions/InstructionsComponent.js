import React, { Component } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image } from 'react-native';
import Button from '@components/common/Button';
import {BlurView} from 'react-native-blur';
import imageUri from '@assets/img/background_orange.jpg';


export default class InstructionsComponent extends Component {

    constructor(props){
        super(props);

        this.state ={
            viewRef: null
        }
    }


    imageLoaded() {
        //this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
        console.log('HERE ');
      }


 

    render(){
        return(

            
                // <SafeAreaView 
                //     style={{backgroundColor: 'white'}}
                    
                //     >
                    
                //     <View>
                //         <Text>Giving an insttruction</Text>
                //         <Text>Introduction to computer Science</Text>
                //         <Text>Project 1 - Excersice 1</Text>
                //     </View>

                //     <View>
                //         <Text>TASKS</Text>
                //         <Text>1.- Use <Text style={styles.bold}>robot.forward()</Text>, <Text style={styles.bold}>robot.right()</Text> and <Text style={styles.bold}>robot.left()</Text></Text>
                //         <Text>2.- The robot cannot leave the designated path.</Text>
                //     </View>

                //     {/* <Button buttonStyles={styles.contentButton} textStyle={styles.contentTextButton}>Start</Button> */}


                // </SafeAreaView>


                <View style={styles.container}>
                <Image
                  ref={(img) => { this.backgroundImage = img; }}
                  source={{uri: imageUri}}
                  style={styles.absolute}
                />
                <BlurView
                  style={styles.absolute}
                  viewRef={this.state.viewRef}
                  blurType="dark"
                  blurAmount={10}
                />
                <Text>Hi, I am some unblurred text</Text>
              </View>
        )
        
    }
    

}

const styles = StyleSheet.create({
    
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    title: {

    },

    subtitle:{

    },

    classElement: {

    },

    bold: {
        fontFamily: 'Roboto-Bold',
    },

    absolute:{
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        position: 'absolute',
    },


    contentButton:{
        backgroundColor: '#3EBCA9',
        borderRadius: 30,
        borderColor: '#3EBCA9',
        width: 150, 
        borderWidth: 1
      },
    contentTextButton:{
        alignSelf: 'center',
        color: 'white',
        fontSize: 18,
        fontFamily: 'Roboto',
        paddingTop: 5,
        paddingBottom: 5
      },

});

