import { StyleSheet, Platform, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
    },
    laoderContainer: {
        height: 150,
        width: 150,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomStartRadius: 30,
        borderBottomEndRadius: 30,
        marginLeft: 50,
        marginRight: 50,
        marginBottom: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    loaderIndicatorStyle: {
        width: 100,
        height: 100,
        alignSelf: 'center'
    }
});

export default styles;