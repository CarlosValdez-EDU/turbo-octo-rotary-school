import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#f6c13D',
        resizeMode: 'contain',
        height: '100%',
        width: '100%'
    },
    headerContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginTop: 40,
        flex: 1,
    },
    skipView: {
        width: '40%',
        marginLeft: 30
    },
    touchSkip: {
        color: 'white',
        fontFamily: 'Roboto-Medium',
        fontSize: 20
    },
    imageWaterMarkContainer: {
        width: '40%'
    },
    waterMarkCurves: {
        width: '100%',
        height: 180,
        resizeMode: 'contain'
    },
    middleContainer: {
        flexDirection: 'row',
        flex: 1,
    },
    tittleSliderContainer: {
        width: '65%',
        padding: 20,
    },
    tittleSlider: {
        color: 'white',
        fontFamily: 'Roboto-Bold',
        fontSize: 100,
        textAlign: 'center'
    },
    bodySliderContainer: {
        width: '35%',
        justifyContent: 'flex-start',
        padding: 30,
    },
    bodySlider: {
        color: 'white',
        fontSize: 28,
        fontFamily: 'Roboto-Medium'
    },
    bottomContainer: {
        flex: 2.5,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
    },
    image: {
        width: 200,
        height: 320,
        resizeMode: 'contain',
        alignSelf: 'flex-end',
        right: 100
    },
    swipeContainer:{
        position: 'absolute', 
        bottom:50, 
        alignItems:'center'
    },
    swipeText: {
        color: 'white',
        fontFamily: 'Roboto-Medium',
        fontSize: 20
    },
    waterMarkLinesContainer: {
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
