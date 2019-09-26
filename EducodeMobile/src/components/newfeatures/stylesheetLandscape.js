import { StyleSheet, Platform, Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
    //NewFeaturesLayout stykes
    backgroundContainer: {
        marginVertical: 0,
        marginHorizontal: 0,
    },
    container: {
        paddingVertical: 100,
    },
    bulletsContainer: {
        borderRadius: 5,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        textAlign: 'center',
    },
    imageTitle: {
        marginTop: 50,
        marginLeft: 75,
        height: 78,
        width: 250,
        resizeMode: 'stretch',
    },
    imgClose:{
        height: 20,
        width: 20,
        justifyContent: 'center'
    },
    textCopyright: {
        color: 'white',
        backgroundColor: 'transparent',
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'Roboto',
    },
    copyrightContainer: {
        marginBottom: 10,
        justifyContent: 'flex-end',
        flex: 1
    },
    buttonTextStyle: {
        color: 'white',
        fontSize: 18,
    },
    buttonSeparator: {
        height: 30,
        width: '100%',
        backgroundColor: 'transparent',
    },
    buttonTryNDaysForFree: {
        backgroundColor: '#F37B20',
        borderRadius: 1,
        borderRadius: 5,
        width: 230,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    //ButtonContainer styles
    container: {
        backgroundColor: 'transparent',
        paddingTop: 5,
        alignSelf: 'center',
        justifyContent: 'flex-end',
    },
    buttonTextStyle: {
        color: 'white',
        fontSize: 10,
    },
    buttonTextStyle2: {
        color: '#272727',
        fontSize: 15,
    },
    buttonSeparator: {
        height: 10,
        width: '100%',
        backgroundColor: 'transparent',
    },
    buttonTryNDaysForFree: {
        backgroundColor: '#ffffff',
        borderRadius: 40,
        borderColor: '#ffffff',
        width: 230,
        height: 40,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            ios: {
                shadowColor: '#808080',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.5,
                shadowRadius: 1,
            },
            android: {
                elevation: 1,
            },
        }),
    },
    buttonGetFullAccess: {
        borderRadius: 1,
        backgroundColor: '#F6C13D',
        borderRadius: 5,
        width: 230,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonNotnow: {
        borderRadius: 1,
        backgroundColor: 'transparent',
        borderRadius: 5,
        width: 230,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    //NewFeaturesList styles
    mainContainer: {
        height: 300,
        marginTop: 40,
    },
    listContainer: {
        paddingLeft: 250,
        paddingRight: 100,
        flex: 1,
    },
    separator: {
        height: 20,
    },
    secondContainer: {
        marginTop: 10,
    },
    buttonStyle: {
        backgroundColor: '#E06A29',
        borderRadius: 30,
        marginLeft: 10,
        marginRight: 10,
        width: 250,
        height: 40,
        justifyContent: 'center',
        marginBottom: 10
    },
    textButtonStyle: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 16,
        paddingTop: 5,
        paddingBottom: 5,
        fontFamily: 'Roboto-Medium'
    }
});

export default styles;