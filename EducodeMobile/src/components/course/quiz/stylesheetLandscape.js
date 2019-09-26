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
        height: '30%',
        marginTop: 10
    },
    viewQuestion: {
        width: '50%',
        justifyContent: 'center',
    },
    viewAnswer: {
        height: '45%'
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
    mainContainer: {
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        padding: 40
    },
    owlImageContainer: {
        width: '50%',
        alignItems: 'center',
        alignContent: 'center'
    },
    owlImage: {
        // height: 130, 
        // width: 170, 
        // height: hp('17%'),
        // width: wp('10%'),
        //11.5/19.5 = 57.89% iOS
        //
        height: Platform.OS === 'ios' ? hp('19.5%') : hp('14.7%'),
        width: Platform.OS === 'ios' ? wp('11.5%') : wp('16.5%'),
        resizeMode: 'stretch',
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
        flexDirection: 'row',
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
        resizeMode: 'contain',
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