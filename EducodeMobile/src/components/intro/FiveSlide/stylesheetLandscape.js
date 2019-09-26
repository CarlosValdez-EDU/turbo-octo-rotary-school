import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#f6c13D',
        height: '100%',
        width: '100%',
        flex: 1
    },
    waterMarkCurvesContainer: {
        position: 'absolute',
        left: 0,
        top: -130,
        width: '60%'
    },
    waterMarkCurves: {
        width: '100%',
        height: 300,
        resizeMode: 'contain'
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 40,
        marginRight: 50,
        marginBottom: 40,
    },
    restoreText: {
        color: 'white',
        fontFamily: 'Roboto-Regular',
        fontSize: 20
    },
    useText: {
        color: 'white',
        fontFamily: 'Roboto-Regular',
        fontSize: 20
    },
    tittleSideContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    tittleContainer: {
        width: '40%',
        padding: 10
    },
    becomeText: {
        fontFamily: 'Roboto-Bold',
        fontSize: 22,
        color: 'white'
    },
    unlimitedText: {
        fontFamily: 'Roboto-Medium',
        fontSize: 22,
        color: 'white',
        marginTop: 20
    },
    secondContainer: {
        flex: 2.5,
        alignItems: 'center',
        flexDirection: 'column',
    },
    firstPriceBoxContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        zIndex: 999,
        marginTop: 20,
        width: 300,
        height: 300,
        ...Platform.select({
            ios: {
                shadowColor: '#f37b20',
                shadowOffset: { width: 5, height: 5 },
                shadowOpacity: 0.3,
                shadowRadius: 9,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    backArrowButton: {
        left: 55,
        top: 20,
        width: 15,
        height: 20,
        resizeMode: 'stretch',
    },
    firstPriceBox: {
        width: 230,
        height: 240,
        borderRadius: 20,
        backgroundColor: 'white'
    },
    headerPriceContainer: {
        height: 50,
        backgroundColor: '#f37b20',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerPriceTittle: {
        fontFamily: 'Roboto-Bold',
        color: 'white',
        fontSize: 22
    },
    bodyPriceBoxContainer: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    priceText: {
        color: '#068783',
        fontFamily: 'Roboto-Bold',
        fontSize: 50
    },
    currencyText: {
        color: '#068783',
        fontFamily: 'Roboto-Regular',
        fontSize: 20
    },
    upgradeContainer: {
        backgroundColor: '#068783',
        height: 35,
        width: '95%',
        borderRadius: 50,
        flexDirection: 'row',
        marginTop: 15
    },
    circleImage: {
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    circleImageBack: {
        width: 35,
        height: 35,
        resizeMode: 'contain'
    },
    tickImage: {
        width: 20,
        height: 15,
        resizeMode: 'contain',
        position: 'absolute',
    },
    firstUpgradeText: {
        alignSelf: 'center',
        color: 'white',
        fontFamily: 'Roboto-Bold',
        fontSize: 18,
        marginLeft: 10
    },
    firstUpgradeTextFrench: {
        alignSelf: 'center',
        color: 'white',
        fontFamily: 'Roboto-Bold',
        fontSize: 14,
        marginLeft: 10,
        marginRight: 10,
    },
    firstTickContainer: {
        position: 'absolute',
        left: 0,
        top: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    firtstickImage: {
        width: 80,
        height: 80,
        resizeMode: 'stretch',
    },
    firstTicketText: {
        position: 'absolute',
        color: 'white',
        fontFamily: 'Roboto-Bold',
        textAlign: 'center'
    },
    firstTicketTextFrench: {
        position: 'absolute',
        color: 'white',
        fontFamily: 'Roboto-Bold',
        textAlign: 'center',
        fontSize: 11
    },
    secondsPriceBoxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 50,
        width: '80%',
    },
    secondPriceBox: {
        backgroundColor: 'white',
        width: 190,
        height: 200,
        borderRadius: 20
    },
    headerPriceMonthContainer: {
        height: 40,
        backgroundColor: '#3ebca9',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerPriceTittleMonth: {
        fontFamily: 'Roboto-Bold',
        color: 'white',
        fontSize: 20
    },
    bodyPriceBoxContainerMonth: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    priceTextMonth: {
        color: '#068783',
        fontFamily: 'Roboto-Bold',
        fontSize: 30
    },
    currencyTextMonth: {
        color: '#068783',
        fontFamily: 'Roboto-Regular',
        fontSize: 20
    },
    upgradeButtonContainer: {
        backgroundColor: '#068783',
        height: 35,
        width: '95%',
        borderRadius: 50,
        flexDirection: 'row',
        marginTop: 15
    },
    tickImageContainerMonth: {
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    circleImageMonth: {
        width: 35,
        height: 35,
        resizeMode: 'contain'
    },
    tickImageMonth: {
        width: 20,
        height: 15,
        resizeMode: 'contain',
        position: 'absolute',
    },
    upgradeText: {
        alignSelf: 'center',
        color: 'white',
        fontFamily: 'Roboto-Bold',
        fontSize: 14,
        marginLeft: 5
    },
    upgradeTextFrench: {
        alignSelf: 'center',
        color: 'white',
        fontFamily: 'Roboto-Bold',
        fontSize: 10,
        marginLeft: 5
    },
    tickImageOrangeContainer: {
        position: 'absolute',
        left: 0,
        top: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tickImageOrange: {
        width: 65,
        height: 65,
        resizeMode: 'stretch',
    },
    tickTextOrange: {
        position: 'absolute',
        color: 'white',
        fontFamily: 'Roboto-Bold',
        textAlign: 'center'
    },
    tickTextOrangeFrench: {
        position: 'absolute',
        color: 'white',
        fontFamily: 'Roboto-Bold',
        textAlign: 'center',
        fontSize: 10
    },
    termsContainer: {
        position: 'absolute',
        bottom: 60,
        width: '100%',
        alignItems: 'center'
    },
    termsText: {
        color: 'white',
        fontFamily: 'Roboto-Medium',
        fontSize: 18
    },
    allowContainer: {
        marginTop: 10
    },
    allowImage: {
        width: 50,
        height: 20,
        resizeMode: 'contain'
    },
    waterMarkLinesContainer: {
        position: 'absolute',
        right: 0,
        bottom: 0
    },
    waterMarkLines: {
        width: 250,
        height: 250,
        resizeMode: 'contain'
    },
    monthContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 250,
        height: 250,
        ...Platform.select({
            ios: {
                shadowColor: '#f37b20',
                shadowOffset: { width: 5, height: 5 },
                shadowOpacity: 0.3,
                shadowRadius: 9,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    container: {
        flex: 3,
        // marginTop: 10
    },
    termsContainerUp: {
        bottom: 5,
        width: '100%',
        alignItems: 'center',
    },
    textTermsContainer: {
        width: '95%',
        alignSelf: 'center',
        padding: 10,
    },
    textRow: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Roboto-Medium'
    },
    textRowBotton: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'Roboto-Medium',
        marginTop: 20
    },
    linkUnderline: {
        color: 'white',
        fontSize: 19,
        fontFamily: 'Roboto-Medium',
        marginTop: 20,
        textDecorationLine: 'underline'
    },
    mainContainerModal: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalContainer: {
        borderRadius: 30,
        backgroundColor: 'white',
        padding: 30,
        width: 800,
        height: '100%',
    },
    titleModal: {
        textAlign: 'left',
        fontSize: 30,
        padding: 10,
        fontFamily: 'Roboto-light',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
    },
    buttonAccept: {
        backgroundColor: '#F37B20',
        borderRadius: 30,
        borderColor: '#F37B20',
        marginLeft: 10,
        marginRight: 10,
        width: 250,
    },
    linksContainer: {
        flexDirection: 'row',
        width: '100%',
        flexWrap: 'wrap'
    },
    backArrowButton: {
        backgroundColor: 'transparent',
        left: 25,
        top: 1,
        width: 25,
        height: 50,
        resizeMode: 'stretch',
    },
});

export default styles;
