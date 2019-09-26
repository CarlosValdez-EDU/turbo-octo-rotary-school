import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 30,
    },
    logoStyle: {
        width: 150,
        height: 150
    },
    textLogo: {
        color: 'white',
        fontFamily: 'SairaCondensed-Medium',
        backgroundColor: 'transparent',
        marginTop: 10,
        fontSize: 50,
    },
    signupContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
    },
    signupButton: {
        alignSelf: 'center',
        backgroundColor: 'transparent',
        borderColor: 'transparent',
    },
    copyrightContent: {
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',
    },
    titleModal: {
        textAlign: 'center',
        fontSize: 28,
        padding: 10,
        fontFamily: 'Roboto-light',
    },
    bodyModal: {
        color: 'black',
        backgroundColor: 'transparent',
        textAlign: 'center',
        fontSize: 20,
        padding: 10,
        fontFamily: 'Roboto-light',
    },
    cancelButton: {
        alignSelf: 'stretch',
        backgroundColor: 'white',
        borderRadius: 30,
        borderColor: 'lightgray',
        marginTop: 10,
        borderWidth: 1,
        width: 300
    },
    textButtonCalcel: {
        alignSelf: 'center',
        color: 'lightgray',
        fontSize: 20,
        fontFamily: 'Roboto',
        paddingTop: 10,
        paddingBottom: 10,
    },
    inputContainer: {
        flexDirection: 'column',
        alignSelf: 'stretch',
        marginBottom: 30
    },
    inputWrapper: {
        flex: 1,
        paddingBottom: 60,
        flexDirection: 'column',
        // padding: 20
        marginLeft: 20,
        marginRight: 20
    },
    modalContainer: {
        borderRadius: 30,
        backgroundColor: 'white',
        padding: 30,
        width: 400,
        height: 500,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textCopyright: {
        color: 'white',
        backgroundColor: 'transparent',
        textAlign: 'center',
        fontSize: 13,
        fontFamily: 'Roboto',
    },
    copyrightContainer: {
        marginBottom: 10,
    },
    errorTextStyle: {
        fontSize: 16,
        alignSelf: 'center',
        color: 'red',
    },
    succesMessage: {
        fontSize: 18,
        alignSelf: 'center',
        color: 'green',
        textAlign: 'center',
    },
    failedMessage: {
        fontSize: 18,
        alignSelf: 'center',
        color: 'red',
        textAlign: 'center',
    },
    loginContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    scrollViewContainerStyle: {
        flexGrow: 1,
        height: '100%'
    },

    copyrightContainer: {
        marginBottom: 10,
    },

    textCopyright: {
        color: 'white',
        backgroundColor: 'transparent',
        textAlign: 'center',
        fontSize: 13,
        fontFamily: 'Roboto-Bold',
    },

});

export default styles;
