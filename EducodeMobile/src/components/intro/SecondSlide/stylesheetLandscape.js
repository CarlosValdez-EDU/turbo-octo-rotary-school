import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        backgroundColor: '#f37b20',
        height: '100%',
        width: '100%'
    },
    firstContainer: {
        flex: 1.5
    },
    headerContainer: {
        flexDirection: 'column',
        width: '100%',
        marginTop: 50,
    },
    skipContainer: {
        marginLeft: 30
    },
    skip: {
        color: 'white',
        fontFamily: 'Roboto-Medium',
        fontSize: 20
    },
    waterMarkCurves: {
        width: '50%',
        height: 300,
        resizeMode: 'contain'
    },
    tittleSlider: {
        color: 'white',
        fontSize: 150,
        fontFamily: 'Roboto-Bold',
        marginLeft: 50
    },
    bodyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bodySlideContainer: {
        alignContent: 'center'
    },
    bodyText: {
        color: 'white',
        fontSize: 26,
        fontFamily: 'Roboto-Medium',
        justifyContent: 'flex-end',
        margin: 30
    },
    image: {
        width: 250,
        height: 180,
        resizeMode: 'contain'
    },
    bottomContainer: {
        flexDirection: 'column',
        position: 'absolute',
        bottom: 50,
        width: '100%',
        alignItems: 'center'
    },
    swipeText: {
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
        width: '100%',
        height: 380,
        resizeMode: 'contain'
    }
});

export default styles;
