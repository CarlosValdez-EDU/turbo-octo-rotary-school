import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#f6c13D',
        resizeMode: 'cover',
        height: '100%',
        width: '100%'
    },
    headerContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginTop: 50,
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
        width: '60%'
    },
    waterMarkCurves: {
        width: '100%',
        height: 230,
        resizeMode: 'contain'
    },
    middleContainer: {
        flexDirection: 'row',
        flex: 1,
    },
    tittleSliderContainer: {
        width: '50%',
    },
    tittleSlider: {
        color: 'white',
        fontFamily: 'Roboto-Bold',
        fontSize: 100
    },
    bodySliderContainer: {
        width: '50%',
        justifyContent: 'flex-start',
    },
    bodySlider: {
        color: 'white',
        fontSize: 28,
        fontFamily: 'Roboto-Medium'
    },
    bottomContainer: {
        flex: 2,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column'
    },
    image: {
        width: 250,
        height: 370,
        resizeMode: 'contain'
    },
    swipeContainer:{
        position: 'absolute', 
        bottom:50, 
        alignItems:'center'
    },
    swipeText: {
        color: 'white',
        fontFamily: 'Roboto-Medium',
        fontSize: 20,
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
