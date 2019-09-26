import React, { Component } from 'react';
import {
  StatusBar,
  KeyboardAvoidingView,
  Image,
  View,
  TouchableOpacity,
  Text,
  Platform
} from 'react-native';
import {WebView} from 'react-native-webview';
import Orientation from 'react-native-orientation';
import {
  Container,
  Background,
  BasicText,
  Button
} from '@components/common';
import Modal from "react-native-modal";
import imgBackground from '@assets/img/green_base_image.png';
import logoImg from '@assets/img/logoX2.png';
import DHeader from '@components/common/DHeader';
import I18n from '@assets/i18n';
import Loc from '@components/common/Loc/Loc';
import stylesPortrait from './stylesheetPortrait';
import stylesLandscape from './stylesheetLandscape';
import { APP_VERSION } from '@constants/AppConstants';
import {
  en_ca_TS,
  fr_ca_TS,
  en_ca_PP,
  fr_ca_PP
} from "@constants/HtmlTexts";

const en_TermsConditions = Platform.OS === 'ios' ? {html: en_ca_TS} : {uri: 'file:///android_asset/terms_en-ca.html'};
const fr_TermsConditions = Platform.OS === 'ios' ? {html: fr_ca_TS} : {uri: 'file:///android_asset/terms_fr-ca.html'};
const en_PrivacyPolicy = Platform.OS === 'ios' ? {html: en_ca_PP} : {uri: 'file:///android_asset/privacy_en-ca.html'};
const fr_PrivacyPolicy = Platform.OS === 'ios' ? {html: fr_ca_PP} : {uri: 'file:///android_asset/privacy_fr-ca.html'};

const versionManager = require("@utils/app_version.json");

class AboutComponent extends Component {

  static navigationOptions = {
    drawerLabel: <Loc styles={{
      color: 'gray',
      fontFamily: 'Roboto-Bold',
      fontSize: 19,
      paddingLeft: 38,
      paddingTop: 10,
      paddingBottom: 10,
    }} locKey="aboutScreen.drawerTitle" />
  };

  constructor(props) {
    super(props);

    const initial = Orientation.getInitialOrientation();
    if (initial === 'PORTRAIT') {
      this.styles = stylesPortrait;
    } else {
      this.styles = stylesLandscape;
    }
    
    this.state = {
      version: versionManager.majorNumber + "." + versionManager.minorNumber + "." + versionManager.buildNumber,
      isModal1Visible: false,
      isModal2Visible: false
    }

    this.onReturnPress = this.onReturnPress.bind(this);
    this.onSupportPress = this.onSupportPress.bind(this);
  }

  componentDidMount() {
    Orientation.addOrientationListener(this._orientationDidChange);
  }

  _orientationDidChange = (orientation) => {
    if (orientation === 'LANDSCAPE') {
      this.styles = stylesLandscape;
      this.forceUpdate();
    } else {
      this.styles = stylesPortrait;
      this.forceUpdate();
    }
  }

  componentWillUnmount() {
    Orientation.getOrientation((err, orientation) => {
      console.log(`Current Device Orientation: ${orientation}`);
    });

    // Remember to remove listener
    Orientation.removeOrientationListener(this._orientationDidChange);
  }

  onSupportPress() {
    this.props.navigation.push("DrawerSupport", {
      'SHOW_BACK_BUTTON': true
    });
  }

  onReturnPress() {
    this.props.navigation.goBack();
  }

  toggleModal1 = () => {
    this.setState({ isModal1Visible: !this.state.isModal1Visible });
  };

  toggleModal2 = () => {
    this.setState({ isModal2Visible: !this.state.isModal2Visible });
  };

  renderTermsModal() {
    return (
      <Modal isVisible={this.state.isModal1Visible} style={this.styles.container}>
        <KeyboardAvoidingView behavior="position">
          <Container containerStyles={this.styles.modalContainer}>
            <BasicText textStyles={this.styles.titleModal} textKey="common.terms" />
            <WebView
              source={(I18n.locale == "fr-CA".toLocaleLowerCase()) ? fr_TermsConditions : en_TermsConditions}
              style={{ flex: 1 }}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              scalesPageToFit={false}
            />
            <View style={this.styles.buttonsContainer}>
              <Button buttonStyles={this.styles.buttonAccept} onPress={this.toggleModal1}>{Loc.getInstance().TextFor("common.acceptText", this.props)}</Button>
            </View>

          </Container>
        </KeyboardAvoidingView>
      </Modal>
    );
  }

  renderProvacyModal() {
    return (
      <Modal isVisible={this.state.isModal2Visible} style={this.styles.container}>
        <KeyboardAvoidingView behavior="position">
          <Container containerStyles={this.styles.modalContainer}>
            <BasicText textStyles={this.styles.titleModal} textKey="common.privacy" />
            <WebView
              source={(I18n.locale == "fr-CA".toLocaleLowerCase()) ? fr_PrivacyPolicy : en_PrivacyPolicy}
              style={{ flex: 1 }}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              scalesPageToFit={false}
            />
            <View style={this.styles.buttonsContainer}>
              <Button buttonStyles={this.styles.buttonAccept} onPress={this.toggleModal2}>{Loc.getInstance().TextFor("common.acceptText", this.props)}</Button>
            </View>
          </Container>
        </KeyboardAvoidingView>
      </Modal>
    );
  }

  render() {
    return (
      <Background imgBackground={imgBackground}>
        <StatusBar barStyle='light-content' />
        <DHeader textKey="aboutScreen.title" onPress={() => this.onSupportPress()} />
        <View style={this.styles.container}>
          <Container containerStyles={this.styles.infoContainer}>
            <View style={this.styles.inputContainer}>
              <Image source={logoImg} style={this.styles.containerLogo} />
              <View style={this.styles.versionContainer}>
                <Text textStyles={this.styles.primaryText}>{this.state.version}</Text>
              </View>
              <View style={this.styles.centerContainer}>
                <TouchableOpacity onPress={this.toggleModal1}>
                  <BasicText textStyles={{ color: '#3EBCA9', fontSize: 18, marginLeft: 5, marginTop: 10 }} textKey="common.terms" />
                </TouchableOpacity>
                <TouchableOpacity onPress={this.toggleModal2}>
                  <BasicText textStyles={{ color: '#3EBCA9', fontSize: 18, marginLeft: 5, marginTop: 10 }} textKey="common.privacy" />
                </TouchableOpacity>
              </View>
              <View style={this.styles.copyrightContainer}>
                <BasicText textStyles={this.styles.textCopyright} textKey="legal.copyright" />
              </View>
            </View>
            <View>
              {this.renderTermsModal()}
            </View>
            <View>
              {this.renderProvacyModal()}
            </View>
          </Container>
        </View>
      </Background>
    );
  }

}

export default AboutComponent;