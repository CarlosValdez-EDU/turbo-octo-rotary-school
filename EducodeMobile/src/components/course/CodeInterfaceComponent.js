import _ from 'lodash';
import React, { Component } from 'react';
import { View, Dimensions, Platform, Keyboard } from 'react-native';
import { WebView } from 'react-native-webview'
import { connect } from 'react-redux';
import Orientation from "react-native-orientation";
import {
  connectToRoom,
  sendKeyboardClose,
  setSideMenuState
} from '@actions/';
import store from '@store/ConfigureStore';
import {
  BACKEND_URL,
  ON_PROMPT_FOR_RESET_CODE,
  ON_VALIDATION_COMPLETE
} from '@constants/AppConstants';
import Alert from '@components/common/Alert';

export class CodeInterfaceComponent extends Component {

  token = undefined;
  state = {
    showResetDialog: false,
    showValidateModal: false
  }

  constructor(props) {
    super(props);

    token = store.getState().app.jwt;

    this.state = {
      height: Dimensions.get('window').height,
      platformSpecialMargin: Platform.OS === 'ios' ? 235 : 260,
      refresh: true
    }

    this.initEventListeners = this.initEventListeners.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props.refresh !== this.state.refresh) {
      this.setState({ refresh: props.refresh });
      this.webview.reload();
    }
  }

  componentDidMount() {
    Orientation.addOrientationListener(this._orientationDidChange);
    this.props.connectToRoom();
    this.initEventListeners();
  }

  componentWillUnmount() {
    Orientation.removeOrientationListener(this._orientationDidChange);
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  initEventListeners = () => {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow.bind(this));
    this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide.bind(this));
  }

  _orientationDidChange = orientation => {
    setTimeout(() => {
      this.setState({
        height: Dimensions.get('window').height,
        platformSpecialMargin: Platform.OS === 'ios' ? 235 : 260
      });
    }, 200);
  };

  keyboardWillShow(e) {
    let newSize = Dimensions.get('window').height - e.endCoordinates.height + 50
    this.setState({ height: newSize })
    this.props.setSideMenuState(false);
  }

  keyboardWillHide(e) {
    this.setState({ height: Dimensions.get('window').height })
    if (Platform.OS !== 'ios') this.props.sendKeyboardClose(this.props.roomId);
  }

  onMessage = (event) => {
    try {
      let payload;
      try { payload = JSON.parse(event.nativeEvent.data); } catch (err) { return; }
      let prefix = _.get(payload, ["prefix"]);
      if (prefix !== "EduCodeRSI") return;
      let command = _.get(payload, ["command"]);
      let data = _.get(payload, ["data"]);

      if (command === ON_PROMPT_FOR_RESET_CODE) {
        this.setState({
          showResetDialog: true
        });
      } else if (command === ON_VALIDATION_COMPLETE) {
        this.setState({
          showValidateModal: true
        })
      }
    } catch (error) {
      debugger;
    }

  }

  initRSI = () => {
    let params = {
      source: 'https://odin.prod.educode.ca',
      userId: this.props.user._id,
      curriculum: this.props.curriculumId,
      exercise: this.props.exerciseData._id,
      backend: BACKEND_URL,
      jwt: this.props.jwt,
      locale: this.props.locale,
    };

    this.sendMessage("onInitialize", params);
  }

  sendMessage = (command, data) => {
    this.webview.postMessage(JSON.stringify({ prefix: "EduCodeRSI", command, data }));
    console.log('AFTER POST MESSAGE_______');
  }

  resetCodeConfirmed = () => {
    this.sendMessage("onResetCodeConfirmed");

    this.setState({
      showResetDialog: false
    });
  }

  onCancelPressed = () => {
    this.setState({
      showResetDialog: false
    });
  }

  onNextPressed = () => {
    this.setState({
      showValidateModal: false
    });

    this.props.onContinue();
  }

  onClosePressed = () => {
    this.setState({
      showValidateModal: false
    });

    this.props.onClose();
  }

  renderValidateModal = () => {
    if (this.state.showValidateModal) {
      return (
        <Alert
          titleKey="common.passed"
          messageKey="common.passedText"
          onActionPressed={this.onNextPressed}
          onCancelPressed={this.onClosePressed}
          showCancelButton
          buttonTextOk="codeScreen.nextUnit"
          buttonTextCancel="common.ok"
        />
      )
    }
  }

  renderResetDialogAlert = () => {
    if (this.state.showResetDialog) {
      return (
        <Alert
          titleKey="codeScreen.resetTitle"
          messageKey="codeScreen.resetContent"
          onActionPressed={this.resetCodeConfirmed}
          onCancelPressed={this.onCancelPressed}
          showCancelButton
          buttonTextOk="common.yes"
          buttonTextCancel="common.no"
        />
      )
    }
  }

  render() {
    let odinServer = '';

    odinServer = "https://odin.prod.educode.ca";

    // if (__DEV__) {
    //   odinServer = "https://odin.dev.educode.ca";
    // } else {
    //   odinServer = "https://odin.prod.educode.ca";
    // }

    if (this.props.roomId === undefined) {
      return (
        <View>
        </View>
      );
    } else {
      return (
        <View style={{ height: this.state.height - this.state.platformSpecialMargin, marginLeft: 20 }}>
          <WebView
            refresh={this.state.refresh}
            ref={webview => this.webview = webview}
            source={{ uri: odinServer }}
            style={{ flex: 1 }}
            bounces={false}
            scrollEnabled={false}
            originWhitelist={['*']}
            onLoad={this.initRSI}
            onMessage={this.onMessage}
            javaScriptEnabled={true}
            useWebKit={true}
          />
          {this.renderResetDialogAlert()}
          {this.renderValidateModal()}
        </View>
      );
    }
  }
}

const mapStateToProps = ({ app, dashboard, course }) => {
  const { exerciseData, roomId, curriculumId } = course;
  const { user, locale, jwt } = app;
  const { userClasses } = dashboard;

  return { locale, exerciseData, user, userClasses, roomId, curriculumId, jwt };
};

export default connect(mapStateToProps, { connectToRoom, sendKeyboardClose, setSideMenuState })(CodeInterfaceComponent);