import {StyleSheet, Dimensions} from 'react-native';

var {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  navHeaderStyle: {
    height: height / 10,
    width: 150,
  },
  //to know the full container
  navHeaderBackgroundStyle: {
    height: height / 6,
    width: '100%',
    backgroundColor: 'transparent',
  },
  logoCenteredImage: {
    resizeMode: 'contain',
    width: 210,
    height: 65,
    backgroundColor: 'transparent',
  },
  //This is for align both elements in the view
  componentHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  //TODO: here is the one that edits the main position
  arrowHideNavdrawer: {
    color: 'white',
    fontSize: 50,
    paddingTop: 10,
  },
  //only for background image property
  headerBackground: {
    height: 170,
    width: '100%',
    resizeMode: 'stretch',
  },
  restOfContainer: {
    backgroundColor: 'transparent',
    width: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  footerSeparator: {
    borderWidth: 0.5,
    borderColor: 'gray',
    marginLeft: 10,
    marginRight: 10,
  },
  dropdownContainer: {
    alignSelf: 'flex-end',
    width: 150,
    right: 8,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: 'gray',
    backgroundColor: 'transparent',
    paddingRight: 10,
    marginBottom: 10,
  },
  dropdownText: {
    marginVertical: 10,
    marginHorizontal: 6,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  dropdownStyle: {
    width: 150,
    height: 300,
    borderColor: 'cornflowerblue',
    borderWidth: 2,
    borderRadius: 3,
  },
  dropdownRow: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 15,
  },
  dropdownImage: {
    marginLeft: 4,
    width: 30,
    height: 30,
  },
  dropdownRowText: {
    marginHorizontal: 4,
    fontSize: 16,
    color: 'navy',
    textAlignVertical: 'center',
  },
  dropdownSeparator: {
    height: 1,
    backgroundColor: 'cornflowerblue',
  },
  textDecoration: {
    fontFamily: 'Roboto-Bold',
    color: 'gray',
    fontSize: 16,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  paddingView: {
    height: 150,
    paddingBottom: 450,
  },
  contentOptions: {
    color: 'gray',
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    paddingLeft: 20,
  },
  logoutButton: {
    color: 'gray',
    fontFamily: 'Roboto-Bold',
    fontSize: 19,
    paddingLeft: 38,
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default styles;
