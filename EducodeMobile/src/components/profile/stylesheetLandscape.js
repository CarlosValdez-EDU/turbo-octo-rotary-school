import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between"
  },
  contentContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  userImageContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
    height: 80,
    marginBottom: 80
  },
  userImage: {
    width: 160,
    height: 160,
    borderRadius: 160 / 2
  },
  editIcon: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 40,
    height: 40,
    marginRight: 20
  },
  succesMessage: {
    fontSize: 16,
    alignSelf: "center",
    color: "green",
    textAlign: "center"
  },
  failedMessage: {
    fontSize: 16,
    alignSelf: "center",
    color: "red",
    textAlign: "center"
  },
  infoContainer: {
    borderRadius: 30,
    backgroundColor: "white",
    height: 450,
    width: 600,
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: 0,
    paddingRight: 0
  },
  inputContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    margin: 10
  },
  textPrimaryContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between"
  },
  textSecondaryContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between"
  },
  invisibleView: {
    flex: 1
  },
  primaryText: {
    fontSize: 26,
    textAlign: "center",
    fontFamily: "Roboto-Medium"
  },
  secondaryText: {
    textAlign: "center",
    fontFamily: "Roboto-Thin",
    fontSize: 14
  },
  secondaryTextError: {
    textAlign: 'center',
    fontFamily: 'Roboto-Thin',
    fontSize: 16,
    color:'red',
    fontWeight: '300',
  },
  backContainer: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20
  },
  titleText: {
    flex: 1,
    color: "white",
    fontSize: 30,
    marginLeft: 20,
    fontFamily: 'Roboto-Bold',
    textAlign: "center"
  },
  backButton: {
    height: 40,
    width: 40
  },
  toolbarLogo: {
    height: 30,
    width: 30,
    resizeMode: "stretch"
  },
  //Tab selected info
  tabSelectedInfo: {
    width: "50%",
    borderRadius: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    justifyContent: "center",
    height: 60
  },
  textTabSelectedInfo: {
    color: "gray",
    fontSize: 18,
    fontFamily: 'Roboto',
    alignSelf: "center"
  },
  tabNotSeletedInfo: {
    width: "50%",
    borderRadius: 0,
    backgroundColor: "#047A7A",
    borderTopLeftRadius: 30,
    justifyContent: "center",
    height: 50
  },
  textTabNotSelectedInfo: {
    color: "white",
    fontSize: 18,
    fontFamily: 'Roboto',
    alignSelf: "center"
  },
  //Tab selected cards
  tabSelectedCard: {
    width: "50%",
    borderRadius: 0,
    backgroundColor: "white",
    borderTopRightRadius: 30,
    justifyContent: "center",
    height: 60
  },
  textTabSelectedCard: {
    color: "gray",
    fontSize: 18,
    fontFamily: 'Roboto',
    alignSelf: "center"
  },
  tabNotSeletedCard: {
    width: "50%",
    borderRadius: 0,
    backgroundColor: "#047A7A",
    borderTopRightRadius: 30,
    justifyContent: "center",
    height: 50
  },
  textTabNotSelectedCard: {
    color: "white",
    fontSize: 18,
    fontFamily: 'Roboto',
    alignSelf: "center"
  },
  //TAB STYLE TO ANOTHER USER
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
  tabSelectedInfoStudent: {
    width: "50%",
    borderRadius: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    justifyContent: "center",
    height: 60
  },
  textTabSelectedInfoStudent: {
    color: "gray",
    fontSize: 18,
    fontFamily: 'Roboto',
    alignSelf: "center"
  },
  tabNotSeletedInfoStudent: {
    width: "50%",
    borderRadius: 0,
    backgroundColor: "#047A7A",
    borderTopLeftRadius: 30,
    justifyContent: "center",
    height: 60
  },
  textTabNotSelectedInfoStudent: {
    color: "white",
    fontSize: 18,
    fontFamily: 'Roboto',
    alignSelf: "center"
  },
  //Tab selected cards
  tabSelectedCardStudent: {
    width: "33.33%",
    borderRadius: 0,
    backgroundColor: "white",
    // borderTopRightRadius: 30,
    justifyContent: "center",
    height: 60
  },
  textTabSelectedCardStudent: {
    color: "gray",
    fontSize: 18,
    fontFamily: 'Roboto',
    alignSelf: "center"
  },
  tabNotSeletedCardStudent: {
    width: "33.33%",
    borderRadius: 0,
    backgroundColor: "#047A7A",
    // borderTopRightRadius: 30,
    justifyContent: "center",
    height: 60
  },
  textTabNotSelectedCardStudent: {
    color: "white",
    fontSize: 18,
    fontFamily: 'Roboto',
    alignSelf: "center"
  },
  //Tab selected password
  tabSelectedPasswordStudent: {
    width: "50%",
    borderRadius: 0,
    backgroundColor: "white",
    borderTopRightRadius: 30,
    justifyContent: "center",
    height: 60
  },
  textTabSelectedPasswordStudent: {
    color: "gray",
    fontSize: 18,
    fontFamily: 'Roboto',
    alignSelf: "center"
  },
  tabNotSeletedPasswordStudent: {
    width: "50%",
    borderRadius: 0,
    backgroundColor: "#047A7A",
    borderTopRightRadius: 30,
    justifyContent: "center",
    height: 60
  },
  textTabNotSelectedPasswordStudent: {
    color: "white",
    fontSize: 18,
    fontFamily: 'Roboto',
    alignSelf: "center"
  },
  //Button to change password
  buttonStylesPassword: {
    backgroundColor: "#047A7A",
    borderRadius: 30,
    marginLeft: 10,
    marginRight: 10,
    width: 150,
    height: 50,
    justifyContent: "center"
  },
  textStylePassword: {
    alignSelf: "center",
    color: "white",
    fontSize: 18,
    paddingTop: 5,
    paddingBottom: 5,
    fontFamily: "Roboto-Medium"
  },
  errorTextStyle: {
    fontSize: 14,
    alignSelf: "center",
    color: "red"
  },
  //Inputs
  inputStyles: {
    height: 50,
    color: "gray",
    borderTopColor: "#ffffff",
    borderBottomColor: "black",
    borderLeftColor: "#ffffff",
    borderRightColor: "#ffffff",
    borderWidth: 0.8,
    textAlign: "center",
    marginBottom: 5,
    fontSize: 26,
    fontFamily: "Roboto-Medium"
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
    backgroundColor: "lightgray",
    width: "100%",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    padding: 5,
    alignSelf: "center"
  },
  textCopyCode: {
    color: "black",
    fontSize: 18,
    fontFamily: 'Roboto',
    textAlign: "center"
  },
  loaderIndicatorStyle: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 100 / 2
  },
});

export default styles;
