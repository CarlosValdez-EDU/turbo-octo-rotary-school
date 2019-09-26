import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    marginBottom: 60
  },
  userImageContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
    height: 180,
  },
  userImageTouchableContainer: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 100,
  },
  userImage: {
    width: 180,
    height: 180,
    borderRadius: 180 / 2
  },
  userImageLoaderContainer: {
    backgroundColor: 'white',
    width: 180,
    height: 180,
    borderRadius: 180 / 2,
  },
  editIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 40,
    height: 40,
    marginRight: 20,
  },
  succesMessage: {
    fontSize: 16,
    alignSelf: 'center',
    color: 'green',
    textAlign: 'center',
  },
  failedMessage: {
    fontSize: 16,
    alignSelf: 'center',
    color: 'red',
    textAlign: 'center',
  },
  infoContainer: {
    borderRadius: 30,
    backgroundColor: 'white',
    height: 550,
    width: 500,
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 5,
    paddingLeft: 0,
    paddingRight: 0
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    margin: 10,
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
    fontSize: 26,
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
  },
  secondaryText: {
    textAlign: 'center',
    fontFamily: 'Roboto-Thin',
    fontSize: 14
  },
  secondaryTextError: {
    textAlign: 'center',
    fontFamily: 'Roboto-Thin',
    fontSize: 16,
    color: 'red',
    fontWeight: '300',
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
  containerCamera: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  previewCamera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  captureCamera: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 15,
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
  loaderIndicatorStyle: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 100 / 2
  },
  //TAB STYLE TO STUDENT USER
  //Tab selected info SPU
  tabSelectedInfoSPU: {
    width: '100%',
    borderRadius: 0,
    backgroundColor: '#047A7A',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: 'center',
    height: 60
  },
  textTabSelectedInfoSPU: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Roboto',
    alignSelf: 'center'
  },
  //Tab selected info
  tabSelectedInfo: {
    width: '50%',
    borderRadius: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    justifyContent: 'center',
    height: 60
  },
  textTabSelectedInfo: {
    color: 'gray',
    fontSize: 18,
    fontFamily: 'Roboto',
    alignSelf: 'center'
  },
  tabNotSeletedInfo: {
    width: '50%',
    borderRadius: 0,
    backgroundColor: '#047A7A',
    borderTopLeftRadius: 30,
    justifyContent: 'center',
    height: 60
  },
  textTabNotSelectedInfo: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Roboto',
    alignSelf: 'center'
  },
  //Tab selected cards
  tabSelectedCard: {
    width: '50%',
    borderRadius: 0,
    backgroundColor: 'white',
    borderTopRightRadius: 30,
    justifyContent: 'center',
    height: 60
  },
  textTabSelectedCard: {
    color: 'gray',
    fontSize: 18,
    fontFamily: 'Roboto',
    alignSelf: 'center'
  },
  tabNotSeletedCard: {
    width: '50%',
    borderRadius: 0,
    backgroundColor: '#047A7A',
    borderTopRightRadius: 30,
    justifyContent: 'center',
    height: 60
  },
  textTabNotSelectedCard: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Roboto',
    alignSelf: 'center'
  },
  //TAB STYLE TO ANOTHER USER
  //Tab selected info
  tabSelectedInfoStudent: {
    width: '50%',
    borderRadius: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    justifyContent: 'center',
    height: 60
  },
  textTabSelectedInfoStudent: {
    color: 'gray',
    fontSize: 18,
    fontFamily: 'Roboto',
    alignSelf: 'center'
  },
  tabNotSeletedInfoStudent: {
    width: '50%',
    borderRadius: 0,
    backgroundColor: '#047A7A',
    borderTopLeftRadius: 30,
    justifyContent: 'center',
    height: 60
  },
  textTabNotSelectedInfoStudent: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Roboto',
    alignSelf: 'center'
  },
  //Tab selected cards
  tabSelectedCardStudent: {
    width: '33.33%',
    borderRadius: 0,
    backgroundColor: 'white',
    // borderTopRightRadius: 30,
    justifyContent: 'center',
    height: 60
  },
  textTabSelectedCardStudent: {
    color: 'gray',
    fontSize: 18,
    fontFamily: 'Roboto',
    alignSelf: 'center'
  },
  tabNotSeletedCardStudent: {
    width: '33.33%',
    borderRadius: 0,
    backgroundColor: '#047A7A',
    // borderTopRightRadius: 30,
    justifyContent: 'center',
    height: 60
  },
  textTabNotSelectedCardStudent: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Roboto',
    alignSelf: 'center'
  },
  //Tab selected password
  tabSelectedPasswordStudent: {
    width: '50%',
    borderRadius: 0,
    backgroundColor: 'white',
    borderTopRightRadius: 30,
    justifyContent: 'center',
    height: 60
  },
  textTabSelectedPasswordStudent: {
    color: 'gray',
    fontSize: 18,
    fontFamily: 'Roboto',
    alignSelf: 'center'
  },
  tabNotSeletedPasswordStudent: {
    width: '50%',
    borderRadius: 0,
    backgroundColor: '#047A7A',
    borderTopRightRadius: 30,
    justifyContent: 'center',
    height: 60
  },
  textTabNotSelectedPasswordStudent: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Roboto',
    alignSelf: 'center'
  },
  //Button to change password
  buttonStylesPassword: {
    backgroundColor: '#047A7A',
    borderRadius: 30,
    marginLeft: 10,
    marginRight: 10,
    width: 150,
    height: 50,
    justifyContent: 'center'
  },
  textStylePassword: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 18,
    paddingTop: 5,
    paddingBottom: 5,
    fontFamily: 'Roboto-Medium'
  },
  errorTextStyle: {
    fontSize: 14,
    alignSelf: 'center',
    color: 'red',
  },

  //Inputs
  inputStyles: {
    height: 50,
    color: 'gray',
    borderTopColor: '#ffffff',
    borderBottomColor: 'black',
    borderLeftColor: '#ffffff',
    borderRightColor: '#ffffff',
    borderWidth: 0.8,
    textAlign: 'center',
    marginBottom: 5,
    fontSize: 26,
    fontFamily: 'Roboto-Medium',
  },
  inputStylesError: {
    height: 50,
    color: 'gray',
    borderTopColor: '#ffffff',
    borderBottomColor: 'red',
    borderLeftColor: '#ffffff',
    borderRightColor: '#ffffff',
    borderWidth: 2,
    textAlign: 'center',
    marginBottom: 5,
    fontSize: 26,
    fontFamily: 'Roboto-Medium',
  },
  //COPY CODE TOAST
  copyContainer: {
    height: 30,
    backgroundColor: 'lightgray',
    width: '100%',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    padding: 5,
    alignSelf: 'center'
  },
  textCopyCode: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'Roboto',
    textAlign: 'center'
  }
});

export default styles;
