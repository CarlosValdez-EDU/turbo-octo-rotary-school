import { StyleSheet, Platform, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    headerContainter: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        marginLeft: 30,
        marginRight: 30,
    },
    groupButton: {
        height: 40,
        width: 40
    },
    titleContainter: {
        alignContent: 'center',
    },
    titleText: {
        flex: 1,
        color: 'white',
        fontSize: 30,
        marginLeft: 20,
        fontFamily: 'Roboto-Bold',
        textAlign: 'center',
        alignSelf: 'center',
        marginTop: 20
    },
    headerLogo: {
        height: 80,
        width: 80,
        marginTop: 10,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10
    },
    codeContaienr: {
        flex: 1,
        flexDirection: 'row',
    },
    codeView: {
        flex: 1
    },
    actionsBar: {
        flex: 0.1,
        backgroundColor: 'black',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
    },
    touchAction: {
        ...Platform.select({
            ios: {
                margin: 10
            },
            android: {
                margin: 10
            },
        }),
    },
    iconActionsBar: {
        width: 44,
        height: 40,
        marginBottom: 5,
        resizeMode: 'stretch',
    },
    textActions: {
        fontSize: 10,
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Roboto-Regular',
    },
    animationContainer: {
        flex: 1
    },
    animationView: {
        flex: 1,
        flexDirection: 'column',
    },
    touchCodeColors: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        padding: 8,
        backgroundColor: 'gray',
        ...Platform.select({
            ios: {
                right: 100,
            },
            android: {
                right: 120,
            },
        }),
    },
    textCodeColors: {
        color: 'white',
        fontSize: 12,
        padding: 5,
        fontFamily: 'Roboto-Regular',
    },
    imgCodeColors: {
        width: 30,
        height: 30,
        resizeMode: 'stretch'
    },
    touchValidateCode: {
        position: 'absolute',
        alignItems: 'flex-end',
        bottom: 70,
        right: 10,
    },
    imgValidateCode: {
        width: 130,
        height: 42,
        resizeMode: 'stretch'
    },
    touchRunCode: {
        position: 'absolute',
        alignItems: 'flex-end',
        bottom: 10,
        right: 10,
    },
    imgRunCode: {
        width: 130,
        height: 55,
        resizeMode: 'stretch'
    },
    footerConteiner: {
        backgroundColor: '#C8C8C8',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    previousExercise: {
        color: '#000000',
        fontFamily: 'Roboto-Regular',
        fontSize: 20,
        marginLeft: 5,
        textAlign: 'left'
    },
    textFooter: {
        color: 'gray',
        fontSize: 20,
        marginLeft: 10,
        textAlign: 'left'
    },
    textFooterCourse: {
        flex: 0.8,
        fontSize: 14,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    nextExercise: {
        color: '#000000',
        fontFamily: 'Roboto-Regular',
        fontSize: 20,
        marginRight: 10,
        textAlign: 'right'
    },
    placeholderContainer: {
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        flex: 1,
    },
    placeholderMessage: {
        color: 'black',
        fontSize: 34,
        fontFamily: 'Roboto-Bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    placeholderMessageBottom: {
        color: 'black',
        fontSize: 26,
        fontFamily: 'Roboto-Thin',
        textAlign: 'center',
        marginLeft: 60,
        marginRight: 60
    },
    imgPlaceholderVideo: {
        height: 150,
        width: 150,
        marginBottom: 10
    },
    //---Moda styles
    modalMainContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContainer: {
        borderRadius: 30,
        backgroundColor: 'white',
        width: 600,
        height: 700,
    },
    closeButton: {
        padding: 20
    },
    closeTextButton: {
        fontSize: 18,
        fontFamily: 'Roboto-Regular',
        color: 'gray',
        alignItems: 'flex-end',
        textAlign: 'right',
        marginRight: 10,
    },
    tabContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.15)',
        height: 40,
        width: '95%',
        // marginTop: 20,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        borderRadius: 30,
        alignItems: 'center',
    },
    //Selected
    tabSelected: {
        backgroundColor: 'white',
        borderRadius: 30,
        width: 187,
        height: 40,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textTabSelected: {
        textAlign: 'center',
        alignSelf: 'center',
        color: 'gray',
        fontSize: 18,
        fontFamily: 'Roboto-Medium'
    },
    //Not selected
    tabNotSeleted: {
        alignSelf: 'stretch',
        justifyContent: 'center',
        width: 187,
        height: 40,
    },
    textTabNotSelected: {
        textAlign: 'center',
        alignSelf: 'center',
        color: 'white',
        fontSize: 18,
        fontFamily: 'Roboto-Medium'
    },
    tabContentContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    tabContentContainerVideo: {
        backgroundColor: 'black',
        justifyContent: 'center',
        marginLeft: 20,
        width: '98%',
        height: '100%'
    },
    videComponent: {
        flex: 1,
        // position:'absolute',
        // width: Dimensions.get('window').height,
        // height: Dimensions.get('window').width,
        // minWidth: Dimensions.get('window').height,
        // minHeight: Dimensions.get('window').width,
        width: 300,
        height: 300,
        zIndex: 1000,
        // bottom:5,
    },
    bottomControlContainer: {
        flexDirection: "row",
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    imageBottomControl: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    }
});

export default styles;