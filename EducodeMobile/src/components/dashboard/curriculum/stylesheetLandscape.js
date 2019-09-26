import { StyleSheet, Platform, Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        flex: 5
    },
    dashboardContainer: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginLeft: 50,
        marginRight: 50,
        marginBottom: 1,
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    backContainer: {
        position: 'absolute',
        marginTop: 500,
        backgroundColor: 'white',
        width: 20000,
        height: 800,
    },
    searchContainer: {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        marginBottom: 20,
        height: 50,
    },
    statusButtonContainer: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        marginTop: 30,
        marginLeft: 50,
        marginRight: 50,
        marginBottom: 30,
        flex: .5
    },
    statusButton: {
        backgroundColor: '#F37B20',
        borderRadius: 40,
        borderColor: '#F37B20',
        width: 230,
        borderWidth: 1,
        justifyContent: 'center',
        alignSelf: 'flex-end',
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
    textStatusButton: {
        fontSize: 24,
        fontFamily: 'Roboto',
        paddingTop: 15,
        paddingBottom: 15
    },
    loaderIndicatorStyle: {
        width: 100,
        height: 100,
        alignSelf: 'center'
    }
});

export default styles;