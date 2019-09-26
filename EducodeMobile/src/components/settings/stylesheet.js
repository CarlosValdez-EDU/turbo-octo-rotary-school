import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    infoContainer: {
        borderRadius: 30,
        backgroundColor: 'white',
        width: '90%',
        flex: 1,
        marginTop: 60,
        marginBottom: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 50,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.5,
                shadowRadius: 1,
            },
            android: {
                elevation: 1,
            },
          }),
    },
    cardContainer: {
        borderRadius: 30,
        backgroundColor: 'white',
        width: 450,
        height: 330,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: 30,
        paddingRight: 30,
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
    },
    textPrimaryContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    textSecondaryContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    invisibleView: {
        flex: 1,
    },
    primaryText: {
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'Roboto-Thin',
    },
    backContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        marginLeft: 20,
        marginRight: 20
    },
    titleText: {
        flex: 1,
        color: 'white',
        fontSize: 30,
        marginLeft: 20,
        fontFamily: 'Roboto-Bold',
        textAlign: 'center',
    },
    backButton: {
        height: 40,
        width: 40
    },
    titleLogo: {
        height: 80,
        width: 80,
        resizeMode: 'stretch'
    },
    containerLogo: {
        height: 150,
        width: 150,
        resizeMode: 'stretch'
    },
    versionContainer: {
        flex: 1,
    },
    centerContainer: {
        flex: 1,
    },
    copyrightContent: {
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',
    },
    textCopyright: {
        backgroundColor: 'transparent',
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'Roboto-Bold',
    },
    copyrightContainer: {
        flex: 1,
        marginBottom: 10,
        justifyContent: 'flex-end',
    },
    modalContainer: {
        borderRadius: 30,
        backgroundColor: 'white',
        padding: 30,
        width: 600,
        height: 700,
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
    settingsItemStyle: {
        flex: 1,
        flexDirection: 'row',
    },
    settingsItemTextStyle: {
        fontSize: 20,
    },
    backContainer:{
        position: 'absolute',
        marginTop: 500,
        backgroundColor: 'white',
        width: 20000,
        height: 800,
    },
});

export default styles;