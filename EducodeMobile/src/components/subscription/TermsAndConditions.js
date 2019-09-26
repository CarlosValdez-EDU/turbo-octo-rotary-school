/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Platform} from 'react-native';
import I18n from '@assets/i18n';
import imgBackground from '@assets/img/background_orange.jpg';
import Loc from '@components/common/Loc/Loc';
import {WebView} from 'react-native-webview';
import {Background, BasicText, Button} from '@components/common';

import {en_ca_TS, fr_ca_TS} from '@constants/HtmlTexts';

const en_TermsConditions =
  Platform.OS === 'ios'
    ? {html: en_ca_TS}
    : {uri: 'file:///android_asset/terms_en-ca.html'};
const fr_TermsConditions =
  Platform.OS === 'ios'
    ? {html: fr_ca_TS}
    : {uri: 'file:///android_asset/terms_fr-ca.html'};

export default class TermsAndConditions extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _GoBack() {
    this.props.navigation.navigate('FiveSlideComponent');
  }

  render() {
    return (
      <Background imgBackground={imgBackground}>
        <View style={styles.container}>
          <View style={styles.whiteContainer}>
            <BasicText textStyles={styles.titleModal} textKey="common.terms" />
            <WebView
              source={
                I18n.locale == 'fr-CA'.toLocaleLowerCase()
                  ? fr_TermsConditions
                  : en_TermsConditions
              }
              style={{flex: 1}}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              scalesPageToFit={false}
            />
            <View style={styles.buttonsContainer}>
              <Button
                buttonStyles={styles.buttonAccept}
                onPress={() => this._GoBack()}>
                {Loc.getInstance().TextFor('common.close', this.props)}
              </Button>
            </View>
          </View>
        </View>
      </Background>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteContainer: {
    borderRadius: 30,
    backgroundColor: 'white',
    padding: 30,
    width: '90%',
    height: '90%',
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
};
