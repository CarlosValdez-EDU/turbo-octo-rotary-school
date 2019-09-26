/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Provider} from 'react-redux';
import SwitchNavigator from './SwitchNavigator';
import store from '@store/ConfigureStore';
import {
  LOAD_USER_DATA,
  UPDATE_APP_MODE,
  UPDATE_APP_TOKEN,
  LOGIN_USER_SUCCESS,
} from '@constants/Types';
import {renewToken} from './TokenManager';
import SplashScreen from 'react-native-splash-screen';
import I18n from '@assets/i18n';
import {setLocale} from 'react-native-redux-i18n';
import {getCurrentUser} from '@data/local/UserRepository';
import {getAppData, initAppData} from '@data/local/AppRepository';
import {
  verifySubscription,
  updateUserLanguage,
  verifyAPIVersion,
} from '@actions/';
import NavigationService from './NavigationService';

export default class App extends Component {
  constructor() {
    super();
    store.dispatch(verifyAPIVersion());
  }

  componentDidMount() {
    SplashScreen.hide();
    store.dispatch(setLocale(I18n.locale));
    loadAppData();
    checkPreservedLogin();
    store.dispatch(verifyAPIVersion());
    checkToken();
  }

  render() {
    console.disableYellowBox = true;
    return (
      <Provider store={store}>
        <SwitchNavigator
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </Provider>
    );
  }
}

async function loadAppData() {
  getAppData()
    .then(appData => {
      if (appData) {
        store.dispatch({
          type: UPDATE_APP_MODE,
          payload: appData.appMode,
        });

        store.dispatch({
          type: UPDATE_APP_TOKEN,
          payload: appData.token,
        });
      } else {
        initAppData();
      }
    })
    .catch(error => {
      console.log('Error loading app data', error);
    });
}

async function checkPreservedLogin() {
  let user = getCurrentUser();

  if (user != null) {
    store.dispatch({
      type: LOAD_USER_DATA,
      payload: user,
    });

    if (user.locale) {
      //store.dispatch(updateUserLanguage(user.locale))
      store.dispatch(updateUserLanguage('en-CA'));
    }

    store.dispatch({
      type: LOGIN_USER_SUCCESS,
    });

    store.dispatch(verifySubscription());
  }
}

async function checkToken() {
  let appData = await getAppData();
  if (!appData) {
    return;
  }

  let jwt = appData.token;
  console.log(jwt);
  await renewToken(jwt);
}
