import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    contentContainer: {
        borderRadius: 20,
        backgroundColor: 'white',
        width: '90%',
        height: '90%',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: 30,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 30,
    },
    enrollButtonStyle: {
        backgroundColor: '#3EBCA9',
        borderRadius: 30,
        marginLeft: 10,
        marginRight: 10,
        width: 159,
        height: 37,
        justifyContent: 'center'
    },
    statusButton: {
        backgroundColor: '#F37B20',
        borderRadius: 30,
        marginLeft: 10,
        width: 159,
        height: 37,
        justifyContent: 'center'
    },
    startButtonStyle: {
        backgroundColor: '#f5b936',
        borderRadius: 30,
        marginLeft: 10,
        marginRight: 10,
        width: 159,
        height: 37,
        justifyContent: 'center',
    },
    textButtons: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 16,
        paddingTop: 5,
        paddingBottom: 5,
        fontFamily: 'Roboto-Medium'
    },
    modalContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerLoader: {
        height: 160,
        width: 160
    },
    loaderIndicatorContainer: {
        width: 150,
        height: 150,
        alignSelf: 'center'
    },
    titleText: {
        textAlign: 'left',
        fontSize: 25,
        marginLeft: 10,
        marginBottom: 10,
        paddingRight: 10,
        fontFamily: 'Roboto-Bold',
        color: 'gray'
    },
    descriptionText: {
        flex: 1,
        color: '#a5a5a5',
        fontSize: 21,
        marginLeft: 10,
        marginBottom: 10,
        paddingRight: 10,
        paddingTop: 5,
        fontFamily: 'Roboto-Medium'
    },
    comingSoonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        right: 0,
        top: 0
    },
    ticketImage: {
        width: 90,
        height: 90,
        resizeMode: 'stretch',
    },
    comingSoonText: {
        position: 'absolute',
        color: 'white',
        fontFamily: 'Roboto-Bold',
        textAlign: 'center',
        fontSize: 15,
        transform: [{ rotate: '-25deg' }]
    },
});

export default styles;