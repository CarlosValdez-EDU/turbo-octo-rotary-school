import { StyleSheet, Platform, Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

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
    groupContainter: {
        alignItems: 'flex-start',
    },
    titleContainter: {
        alignContent: 'center',
    },
    groupButton: {
        height: 40,
        width: 40
    },
    logoContainer: {
        alignItems: 'flex-end',
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
    userContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 30,
        marginLeft: 50,
        marginRight: 70
    },
    avatar: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    userImage: {
        height: 90,
        width: 90,
        borderRadius: 90 / 2
    },
    username: {
        fontSize: 26,
        color: 'white',
        marginLeft: 20,
        alignItems: 'center',
        marginTop: 30,
    },
    buttonStart: {
        backgroundColor: '#3EBCA9',
        borderRadius: 40,
        borderColor: '#3EBCA9',
        width: 250,
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
    textButtonStart: {
        textAlign: 'center',
        alignSelf: 'center',
        color: 'white',
        fontSize: 20,
        paddingTop: 15,
        paddingBottom: 15,
        fontFamily: 'Roboto',
    },
    textButton: {
        fontSize: 12,
        textAlign: 'center',
        alignSelf: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    containerOpenKeyboard: {
        flex: 1,
        alignItems: 'center',
        marginTop: 100
    },
    dashboardContainer: {
        flex: 1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.15)',
        width: '90%',
        bottom: 0,
        alignItems: 'center',
    },
    searchContainer: {
        width: '90%',
        marginLeft: 50,
        marginRight: 50,
        marginTop: 20,
        marginBottom: 10,
        height: 55,
    },
    placeholderContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginBottom: 30,
    },
    placeholderMessage: {
        color: 'white',
        fontSize: 30,
        fontFamily: 'Roboto-Medium',
        textAlign: 'center',
    },
    containerLoaderStyle: {
        height: 110,
        width: 110
    },
    loaderIndicatorStyle: {
        width: 100,
        height: 100,
        alignSelf: 'center'
    },
    tabContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.15)',
        height: 57,
        width: '65%',
        marginBottom: 30,
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
        height: 57,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textTabSelected: {
        textAlign: 'center',
        alignSelf: 'center',
        color: 'gray',
        fontSize: 18,
        paddingTop: 15,
        paddingBottom: 15,
        fontFamily: 'Roboto-Medium'
    },
    //Not selected
    tabNotSeleted: {
        alignSelf: 'stretch',
        justifyContent: 'center',
        width: 187,
        height: 57,
    },
    textTabNotSelected: {
        textAlign: 'center',
        alignSelf: 'center',
        color: 'white',
        fontSize: 18,
        fontFamily: 'Roboto-Medium'
    },
    //radious notification
    viewContainer: {
        backgroundColor: 'red',
        position: 'absolute',
        width: 20,
        height: 20,
        right: 30,
        top: 5,
        borderRadius: 20 / 2,
        justifyContent: 'center',
    },
    popText: {
        color: 'white',
        fontSize: 12,
        textAlign: 'center'
    },
    adsContainer: {
        backgroundColor: 'white',
        alignItems: 'center',
        height: 60
    }
});

export default styles;