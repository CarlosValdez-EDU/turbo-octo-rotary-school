import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
    },
    logoStyle: {
        width: 100,
        height: 100,
        marginBottom: 5
    },
    singupContainer: {
        borderRadius: 30,
        backgroundColor: 'white',
        width: 650,
        height: 580,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: 30,
        paddingRight: 30,
    },
    signupButtonStyle: {
        alignSelf: 'stretch',
        backgroundColor: 'green',
        borderRadius: 5,
        borderColor: 'green',
        marginLeft: 10,
        marginRight: 10,
        fontSize: 16,
        color: 'red'
    },
    textCopyright: {
        color: 'white',
        backgroundColor: 'transparent',
        textAlign: 'center',
        fontSize: 13,
        fontFamily: 'Roboto-Bold',
    },
    copyrightContainer: {
        marginBottom: 10,
    },
    backContainer: {
        flexDirection: 'row',
        alignContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 40,
        marginLeft: 30,
    },
    inputWrapper: {
        width: 250,
    },
    inputContainer: {
        flexDirection: 'column',
        alignSelf: 'stretch',
        marginBottom: 30,
        alignItems: 'center'
    },
    checkboxContainer: {
        flexDirection: 'column',
        marginBottom: 10,
        marginLeft: 100,
        marginRight: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkRadiusContainer: {
        flexDirection: 'row',
        marginLeft: 160,
        marginRight: 160,
        justifyContent: 'space-between'
    },
    checkMoreInfoContainer: {
        flexDirection: 'row',
        marginTop: 10,
        marginLeft: 160,
        marginRight: 160,
        justifyContent: 'center'
    },
    checkboxStyle: {
        alignContent: 'flex-start',
        alignItems: 'flex-start',
        borderRadius: 20 / 2,
        width: 20,
        height: 20,
    },
    radioTextStyle: {
        paddingLeft: 5,
        fontSize: 16,
        fontFamily: 'Roboto',
        color: 'gray',
    },
    textTerms: {
        color: '#3EBCA9',
        fontSize: 18,
        textAlign: 'center',
        marginLeft: 5,
    },
    checkBoxTerms: {
        flexDirection: 'row',
        marginBottom: 15
    },
    modalContainer: {
        borderRadius: 30,
        backgroundColor: 'white',
        padding: 30,
        width: 600,
        height: 600,
    },
    titleModal: {
        textAlign: 'left',
        fontSize: 30,
        padding: 10,
        fontFamily: 'Roboto-light',
    },
    bodyModal: {
        color: 'black',
        backgroundColor: 'transparent',
        textAlign: 'justify',
        fontSize: 18,
        padding: 10,
        fontFamily: 'Roboto-light',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
    },
    buttonCancel: {
        backgroundColor: 'white',
        borderRadius: 30,
        borderColor: 'lightgray',
        width: 250,
        borderWidth: 1
    },
    textButtonCalcel: {
        alignSelf: 'center',
        color: 'lightgray',
        fontSize: 20,
        fontFamily: 'Roboto',
        paddingTop: 10,
        paddingBottom: 10
    },
    buttonAccept: {
        backgroundColor: '#F37B20',
        borderRadius: 30,
        borderColor: '#F37B20',
        marginLeft: 10,
        marginRight: 10,
        width: 250,
    },
    errorTextStyle: {
        fontSize: 14,
        alignSelf: 'center',
        color: 'red',
    },
    succesMessage: {
        fontSize: 16,
        alignSelf: 'center',
        color: 'green',
        textAlign: 'center',
    },
    failedMessage: {
        fontSize: 16,
        alignSelf: 'center',
        color: 'red',
        textAlign: 'center',
    },
    //More info modal styles
    modalContainerInfo: {
        borderRadius: 30,
        backgroundColor: 'white',
        padding: 30,
        width: 400,
        height: 280,
    },
    buttonOk: {
        backgroundColor: '#047A7A',
        borderRadius: 30,
        borderColor: 'lightgray',
        width: 170,
        borderWidth: 1
    },
    textButtonOk: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 20,
        fontFamily: 'Roboto',
        paddingTop: 10,
        paddingBottom: 10
    },
    tittleInfo: {
        alignSelf: 'flex-start',
        fontSize: 22,
        fontFamily: 'Roboto-Bold',
        marginBottom: 10
    },
    bodyInfo: {
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'Roboto-Medium',
        color: 'gray'
    },
});

export default styles;

