import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor: '#047a7a', 
        height: '100%', 
        width: '100%', 
        flex: 1
    },
    skipContainer:{
        marginLeft: 30, 
        marginTop: 50, 
        width: '50%'
    },
    touchSkip:{
        color: 'white', 
        fontFamily: 'Roboto-Medium', 
        fontSize: 20
    },
    waterMarkLinesContaienr:{
        position: 'absolute', 
        right: 0, 
        top: 0, 
        width: '40%',
    },
    waterMarkLines:{
        width: '100%', 
        height: 400, 
        resizeMode: 'contain'
    },
    textContainer:{
        flex: 1, 
        flexDirection: 'row', 
    },
    secondTextContainer:{
        width: '60%', 
        height:'50%', 
        alignContent: 'center', 
        justifyContent: 'center',
    },
    tittleStep:{
        color: 'white', 
        fontSize: 130, 
        fontFamily: 'Roboto-Bold', 
        alignSelf: 'center'
    },
    tittleStepFrench: {
        color: 'white',
        fontSize: 100,
        fontFamily: 'Roboto-Bold',
        alignSelf: 'center'
    },
    bodyContainer:{
        flexDirection: 'row', 
        padding: 20, 
        width: '90%',
    },
    bodyText:{
        color: 'white', 
        fontSize: 26, 
        fontFamily: 'Roboto-Medium', 
        width: '100%',
    },
    logoImage:{
        width: 50, 
        height: 60, 
        resizeMode: 'contain',
    },
    charaContainer:{
        position:'absolute', 
        left:0, 
        bottom:0
    },
    charaImage:{
        width: 400, 
        height: 300, 
        resizeMode: 'contain', 
    },
    swipeContainer:{
        position: 'absolute', 
        bottom: 50, 
        width: '100%', 
        alignItems: 'center'
    },
    swipeText:{
        color: 'white', 
        fontFamily: 'Roboto-Medium', 
        fontSize: 20
    },
    waterMarkLinesContainer:{
        position: 'absolute', 
        right: 0, 
        bottom: 0 
    },
    waterMarkLines:{
        width: 340, 
        height: 340, 
        resizeMode: 'contain'
    }
});

export default styles;
