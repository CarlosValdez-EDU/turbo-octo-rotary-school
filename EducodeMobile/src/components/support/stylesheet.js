import { StyleSheet, Platform } from "react-native";

const COMPOSER_HEIGHT = 50;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  containerChat: {
    flex: 1,
    backgroundColor: '#fff',
  },
  avatar: {
    borderRadius: 20,
    width: 40,
    height: 40,
    marginRight: 10
  },
  row: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    flex: 1,
    borderBottomColor: 'transparent'
  },
  rowText: {
    flex: 1
  },
  message: {
    fontSize: 14,
    fontFamily:'Roboto',
  },
  sender: {
    fontWeight: 'bold',
    paddingRight: 10,
  },
  messageUser: {
    fontSize: 14,
    marginLeft: 10,
    marginRight: 10,
    fontFamily:'Roboto',
    textAlign: 'right'
  },
  senderUser: {
    fontWeight: 'bold',
    paddingRight: 10,
    textAlign: 'right'
  },
  time: {
    fontSize: 10,
    fontFamily:'Roboto',
    color: '#8f8f8f'
  },
  timeUser: {
    fontSize: 10,
    marginLeft: 10,
    marginRight: 10,
    fontFamily:'Roboto',
    color: '#8f8f8f',
    textAlign: 'right'
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    borderColor: 'gray', 
    borderWidth: 1, 
    borderRadius: 20
  },
  input: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 18,
    flex: 1
  },
  send: {
    alignSelf: 'center',
    color: 'lightseagreen',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 20,
  },
  inputToolBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: COMPOSER_HEIGHT,
    minHeight: COMPOSER_HEIGHT,
    justifyContent: "center",
    borderTopWidth: 0,
    shadowOpacity: 0.1,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: -2
    },
    elevation: 2,
    shadowRadius: 2
  },
  composerText: {
    maxHeight: COMPOSER_HEIGHT,
    fontFamily: "Roboto",
    color: "#333333",
    fontSize: 13
  },
  dashboardContainer: {
    padding: 15,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    backgroundColor: "white",
    width: "80%",
    height: "95%",
    alignSelf: 'center'
  },
  progressIndicatorStyle: {
    width: 100,
    height: 100,
    alignSelf: "center"
  },
  waitingMessageStyle: {
    color: "darkgray",
    fontSize: 20,
    fontFamily: "Roboto-Thin",
    textAlign: "center",
    marginTop: 10
  },
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
  },
  footerText: {
    fontSize: 14,
    color: "darkgray"
  },
  titleModal: {
    textAlign: "center",
    fontSize: 28,
    padding: 10,
    fontFamily: "Roboto-light"
  },
  bodyModal: {
    color: "black",
    backgroundColor: "transparent",
    textAlign: "center",
    fontSize: 20,
    padding: 10,
    fontFamily: "Roboto-light"
  },
  cancelButton: {
    alignSelf: "stretch",
    backgroundColor: "white",
    borderRadius: 30,
    borderColor: "lightgray",
    marginTop: 10,
    marginRight: 40,
    marginLeft: 40,
    borderWidth: 1
  },
  textButtonCalcel: {
    alignSelf: "center",
    color: "lightgray",
    fontSize: 20,
    fontFamily: "Roboto",
    paddingTop: 10,
    paddingBottom: 10
  },
  inputContainer: {
    flexDirection: "column",
    alignSelf: "stretch"
  },
  inputWrapper: {
    flex: 1,
    paddingBottom: 60,
    flexDirection: "column",
    padding: 20
  },
  modalContainer: {
    borderRadius: 30,
    backgroundColor: "white",
    padding: 30,
    width: 400,
    height: 400,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  textCopyright: {
    color: "white",
    backgroundColor: "transparent",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Roboto-Bold"
  },
  copyrightContainer: {
    marginBottom: 10
  },
  checkboxContainer: {
    flexDirection: "column",
    padding: 20
  },
  errorTextStyle: {
    fontSize: 16,
    alignSelf: "center",
    color: "red",
    marginBottom: 10
  },
  succesMessage: {
    fontSize: 18,
    alignSelf: "center",
    color: "green",
    textAlign: "center"
  },
  failedMessage: {
    fontSize: 18,
    alignSelf: "center",
    color: "red",
    textAlign: "center"
  },
  closeButton: {
    width: 150,
    height: 50,
    alignSelf: "flex-end",
    backgroundColor: "red",
    borderRadius: 30,
    borderColor: "red",
    marginTop: 10,
    marginRight: 25,
    marginLeft: 40,
    borderWidth: 1
  },
  textButtonClose: {
    alignSelf: "center",
    color: "white",
    fontSize: 20,
    fontFamily: "Roboto",
    paddingTop: 10,
    paddingBottom: 10
  },
});

export default styles;
