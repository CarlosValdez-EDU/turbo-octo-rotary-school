/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-undef */
import React, {Component} from 'react';
import {UPDATE_APP_LOCALE} from '@constants/Types';
import {
  createDrawerNavigator,
  createStackNavigator,
  DrawerItems,
} from 'react-navigation';
import {
  Image,
  View,
  TouchableOpacity,
  TouchableHighlight,
  ImageBackground,
  Alert,
} from 'react-native';
import {Container, Content, Header, Body, Text} from 'native-base';
import Loc from '@components/common/Loc/Loc';
import HomeComponent from '@components/home/HomeComponent';
import DashboardStackNavigator from '@components/dashboard/DashboardStackNavigator';
import AchievementsComponent from '@components/achievement/Achievements';
import AboutComponent from '@components/about/AboutComponent';
import ProfileComponent from '@components/profile/ProfileComponent';
import SettingsComponent from '@components/settings/SettingsComponent';
import SupportComponent from '@components/support/SupportComponent';
import SubscriptionComponent from '@components/intro/FiveSlide/FiveSlideComponent';
import PdfViewerComponent from '@components/pdfviewer/PdfViewerComponent';
import styles from './styles/stylesheet';
import Icon from 'react-native-ionicons';
import Dropdown from '@customcomponents/modal-dropdown';
import {AVAILABLE_LANGUAGES} from '@constants/AppConstants';
import store from '@store/ConfigureStore';
import {clearAppData} from '@data/local/AppRepository';
import {getCurrentUser, deleteUserSession} from '@data/local/UserRepository';
import {deleteInfo} from './TokenManager';
import {setLocale} from 'react-native-redux-i18n';
import {
  getAvailableCurriculums,
  updateUserLanguage,
  userLogout,
} from '@actions/';
import {deletePaymentInfo} from '@data/local/PaymentRepository';
import Socket from '@data/remote/socket_client/Socket';
import {CLEAR_STATE} from '@constants/Types';
import {BasicText} from '@components/common';

class DrawerContentComponent extends Component {
  constructor(props) {
    super(props);

    this.renderUserLanguage = this.renderUserLanguage.bind(this);
    this.launchLogout = this.launchLogout.bind(this);
    this.getClickedElement = this.getClickedElement.bind(this);
  }

  componentDidMount() {
    store.dispatch(setLocale(store.getState().app.locale));
  }

  prepareLogout() {
    this.injectActionToBackButton();
    Alert.alert(
      Loc.getInstance().TextFor('navDrawer.logoutAlertTitle', this.props),
      Loc.getInstance().TextFor('navDrawer.logoutAlertMessage', this.props),
      [
        {
          text: Loc.getInstance().TextFor(
            'navDrawer.logoutAlertNegativeButton',
            this.props,
          ),
          onPress: () => console.log('Cancel Logout Pressed'),
          style: 'cancel',
        },
        {
          text: Loc.getInstance().TextFor(
            'navDrawer.logoutAlertPositiveButton',
            this.props,
          ),
          onPress: () => this.launchLogout(),
        },
      ],
      {cancelable: false},
    );
  }

  async launchLogout() {
    // deleteUserSession();
    // clearAppData();
    // deleteInfo();
    // deletePaymentInfo();
    store.dispatch(userLogout());
    Socket.disconnect();
    // store.dispatch({
    //     type: CLEAR_STATE
    // });
    this.props.navigation.navigate('Auth');
  }

  injectActionToBackButton() {
    this.props.navigation.closeDrawer();
  }

  renderDropdownRows(rowData, rowId, highligted) {
    var icon =
      rowId == 0
        ? require('@assets/img/english_flag.png')
        : require('@assets/img/french_flag.png');
    return (
      <TouchableHighlight
        underlayColor="cornflowerblue"
        style={{paddingVertical: 9}}>
        <View style={styles.dropdownRow}>
          <Image style={styles.dropdownImage} mode="stretch" source={icon} />
          <Text style={styles.dropdownRowText}>{rowData.languageName}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  renderDropdownText(rowData) {
    const {id, languageName} = rowData;
    return `${languageName}`;
  }

  renderUserLanguage() {
    var locale = '';

    let currentUser = getCurrentUser();
    if (currentUser.locale === 'en-CA') {
      locale = 'English';
    }

    if (currentUser.locale === 'fr-CA') {
      locale = 'Français';
    }

    return locale;
  }

  getClickedElement(item) {
    var locale = '';

    if (item == 0) {
      locale = 'en-CA';
    }

    if (item == 1) {
      locale = 'fr-CA';
    }

    if (locale !== store.getState().app.locale) {
      store.dispatch(updateUserLanguage(locale));
      store.dispatch({
        type: UPDATE_APP_LOCALE,
        payload: locale,
      });
      store.dispatch(setLocale(locale));
      store.dispatch(getAvailableCurriculums());
    }
  }

  adjustOptionsFrameSize(style) {
    const numberOfItems = AVAILABLE_LANGUAGES.length;
    style.height = numberOfItems > 4 ? style.height : -1;
    return style;
  }

  render() {
    return (
      <Container>
        {/* Image green of the background */}
        <ImageBackground
          style={styles.headerBackground}
          source={require('@assets/img/background_green.jpg')}>
          <Header style={styles.navHeaderBackgroundStyle}>
            <Body>
              <View style={styles.componentHeader}>
                {/* Button to hide the navdrawer  */}
                <TouchableOpacity
                  onPress={() => {
                    this.injectActionToBackButton();
                  }}>
                  <Icon
                    name="ios-arrow-back"
                    style={styles.arrowHideNavdrawer}
                  />
                </TouchableOpacity>
                <View style={styles.restOfContainer} />
                {/* Educode logo */}
                <Image
                  style={styles.logoCenteredImage}
                  source={require('@assets/img/logo.png')}
                />
              </View>
            </Body>
          </Header>
        </ImageBackground>
        <Content style={{backgroundColor: '#ffffff'}} bounces={false}>
          <DrawerItems {...this.props} />
          <TouchableOpacity
            onPress={() => {
              this.prepareLogout();
            }}>
            <Loc styles={styles.logoutButton} locKey="common.logout" />
          </TouchableOpacity>
          <View style={styles.paddingView} />
        </Content>
        <View>
          <View style={styles.footerSeparator} />
          <View style={styles.footer}>
            <BasicText
              textKey={'navDrawer.languageLabel'}
              textStyles={[styles.textDecoration, {fontSize: 20}]}
            />
            {/* <Text style={styles.textDecoration}>
                            {
                                Loc.getInstance().TextFor("navDrawer.languageLabel", this.props)
                            }
                        </Text> */}
            <Content bounces={false}>
              <Dropdown
                hitSlop={{top: 20, bottom: 20, left: 60, right: 90}}
                defaultValue="Select"
                animated={true}
                style={styles.dropdownContainer}
                textStyle={styles.dropdownText}
                options={AVAILABLE_LANGUAGES}
                renderButtonText={rowData => this.renderDropdownText(rowData)}
                renderRow={this.renderDropdownRows.bind(this)}
                onSelect={item => this.getClickedElement(item)}
                adjustFrame={style => this.adjustOptionsFrameSize(style)}
                buttonTextColor={this.renderUserLanguage()}
                defaultValue={this.renderUserLanguage()}
              />
            </Content>
          </View>
        </View>
      </Container>
    );
  }
}

const RootStack = createDrawerNavigator(
  {
    Dashboard: {
      screen: DashboardStackNavigator,
    },
    Profile: {
      screen: ProfileComponent,
    },
    Achievements: {
      screen: AchievementsComponent,
    },
    Support: {
      screen: SupportComponent,
    },
    About: {
      screen: AboutComponent,
    },
    // Settings: {
    //     screen: SettingsComponent
    // },
  },
  {
    initialRouteName: 'Dashboard',
    contentComponent: DrawerContentComponent,
    drawerOpentRouter: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    contentOptions: {
      labelStyle: styles.contentOptions,
    },
  },
);

export default (MainStack = createStackNavigator(
  {
    NestedNavigator: {
      screen: RootStack,
      title: 'Home',
    },
    DrawerSubscription: {screen: SubscriptionComponent},
    DrawerSupport: {screen: SupportComponent},
    PdfViewer: {screen: PdfViewerComponent},
  },
  {
    headerMode: 'none',
  },
));
