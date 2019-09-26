import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },

    titleModal:{
        textAlign: 'left',
        fontSize: 30,
        padding: 10,
        fontFamily: 'Roboto-light',
    },

    bodyModal:{
        color: 'black',
        backgroundColor: 'transparent',
        textAlign: 'justify',
        fontSize: 18,
        padding: 10,
        fontFamily: 'Roboto-light',
    },

    buttonsContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
    },

    buttonCancel:{
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

    buttonAccept:{
        backgroundColor: '#F37B20',
        borderRadius: 30,
        borderColor: '#F37B20',
        marginLeft: 10,
        marginRight: 10,
        width: 250,
    }

});