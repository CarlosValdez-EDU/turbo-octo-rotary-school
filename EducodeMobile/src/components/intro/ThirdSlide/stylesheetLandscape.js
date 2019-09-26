import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#3ebca9',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        flex: 1
    },
    skipContainer: {
        marginLeft: 30,
        marginTop: 50,
        width: '100%'
    },
    skip: {
        color: 'white',
        fontFamily: 'Roboto-Medium',
        fontSize: 20
    },
    bodyContainer: {
        marginTop: 0,
        flexDirection: 'row'
    },
    textContainer: {
        marginLeft: '50%'
    },
    tittleStep: {
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
    waterMarkCurvesContainer: {
    },
    curvesImage: {
        width: '100%',
        height: 250,
        resizeMode: 'contain'
    },
    bodyCointainer: {
        color: 'white',
        fontSize: 26,
        fontFamily: 'Roboto-Medium',
        width:'60%',
        textAlign:'right',
    },
    charaImageContainer: {
        alignItems: 'center',
        position: 'absolute',
        bottom:0,
        right: '55%'
    },
    charaImage: {
        width: 400,
        height: 200,
        resizeMode: 'contain'
    },
    swipeContainer: {
        position: 'absolute',
        bottom: 50,
        width: '100%',
        alignItems: 'center'
    },
    textSwipe: {
        color: 'white',
        fontFamily: 'Roboto-Medium',
        fontSize: 20
    },
    waterMarkLinesContainer: {
        position: 'absolute',
        right: 0,
        bottom: 0,
    },
    waterMarkLines: {
        width: 340,
        height: 340,
        resizeMode: 'contain',
    }

});

export default styles;
