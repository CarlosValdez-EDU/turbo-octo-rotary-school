import { StyleSheet, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        padding: 40
    },
    progressContainer: {
        alignContent: 'center',
        alignItems: 'center',
        height: '10%'
    },
    textProgress: {
        marginTop: 5,
        color: 'gray',
        fontFamily: 'Roboto-Regular',
        fontSize: 16
    },
    questionContainer: {
        flexDirection: 'row',
        height: '30%'
    },
    viewQuestion: {
        width: '50%',
        justifyContent: 'center',
    },
    viewAnswer: {
        height: '55%'
    },
    question: {
        color: 'black',
        fontFamily: 'Roboto-Regular',
        fontSize: 18,
        textAlign: 'center',
    },
    buttonContainer: {
        alignSelf: 'center',
        alignContent: 'center',
        position: 'absolute',
        bottom: 20,
        flexDirection: 'row',
    },
    owlImageContainer: {
        width: '50%',
        alignItems: 'center',
        alignContent: 'center'
    },
    owlImage: {

        height: 200,
        width: 250,
        // height: hp('17%'),
        // width: wp('18%'),
        resizeMode: 'contain',
    },
    nextButton: {
        backgroundColor: '#3EBCA9',
        borderRadius: 30,
        marginLeft: 10,
        width: 159,
        height: 37,
        justifyContent: 'center',
        alignContent: 'center',
    },
    textNextButtons: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 16,
        paddingTop: 5,
        paddingBottom: 5,
        fontFamily: 'Roboto-Medium',
    },
    previewButton: {
        backgroundColor: 'lightgray',
        borderRadius: 30,
        marginLeft: 10,
        width: 159,
        height: 37,
        justifyContent: 'center',
        alignContent: 'center',
    },
    textPreviewButtons: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 16,
        paddingTop: 5,
        paddingBottom: 5,
        fontFamily: 'Roboto-Medium',
    },
    //QUIZ RESULTS
    mainContainerResult: {
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        padding: 40,
    },
    container: {
        alignSelf: 'center',
        padding: 50
    },
    progressContainer: {
        alignContent: 'center',
        alignItems: 'center',
        height: '10%'
    },
    textProgress: {
        marginTop: 5,
        color: 'gray',
        fontFamily: 'Roboto-Regular',
        fontSize: 16
    },
    imageContainerResult: {
        alignSelf: 'center',
        alignContent: 'center',
    },
    owlImageResult: {
        height: 250,
        width: 300,
        resizeMode: 'stretch',
    },
    textContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 30
    },
    textCongratulations: {
        color: 'black',
        fontFamily: 'Roboto-Bold',
        fontSize: 44,
    },
    textScored: {
        fontFamily: 'Roboto-Regular',
        fontSize: 28,
        marginTop: 10,
    },
    textPoints: {
        fontFamily: 'Roboto-Regular',
        fontSize: 28,
        marginTop: 10,
    },
    buttonContainerResult: {
        alignSelf: 'center',
        alignContent: 'center',
        position: 'absolute',
        bottom: 20,
    },
    viewButton: {
        backgroundColor: '#005A59',
        borderRadius: 30,
        marginLeft: 10,
        width: 215,
        height: 37,
        justifyContent: 'center',
        alignContent: 'center',
    },
    textViewButtons: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 16,
        paddingTop: 5,
        paddingBottom: 5,
        fontFamily: 'Roboto-Medium',
    },
});

export default styles;