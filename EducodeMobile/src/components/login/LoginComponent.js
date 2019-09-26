import React, { Component } from "react";
import {
  StatusBar,
  View,
  KeyboardAvoidingView,
  Image,
  Text,
  Platform,
  Keyboard,
  Animated,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import AnimateLoadingButton from "react-native-animate-loading-button";
import LottieView from "lottie-react-native";
import Orientation from "react-native-orientation";
import Modal from "react-native-modal";
import validate from "../common/Validate_wrapper";
import stylesPortrait from "./stylesheetPortrait";
import stylesLandscape from "./stylesheetLandscape";
import {
  Button,
  Container,
  Background,
  BasicText,
  Checkbox,
  Input
} from "@components/common";
import ProgressIndicator from "@components/common/ProgressIndicator";
import logoImg from "@assets/img/educode_logo_round.png";
import {
  login,
  emailChanged,
  passwordChanged,
  resetPasswordChanged,
  sendEmail,
  sendError,
  resetEmail,
  checkPresservedSession,
  changeCheckedLogin,
  resetInitialState,
  resetInfo,
  resetForgotPasswordErrors,
  saveFailedEmail,
  clearUpdateNeededState,
  clearLoadingState
} from "@actions/";
import Alert from "../common/Alert";
import imgBackground from "@assets/img/background_green.jpg";
import I18n from "@assets/i18n";
import Loc from "@components/common/Loc/Loc";
import {
  FORGOT_PASSWORD_ERROR_INVALID_ACCESS,
  FORGOT_PASSWORD_ERROR_INVALID_EMAIL,
  FORGOT_PASSWORD_ERROR_ACCOUNT_NOT_FOUND,
  FORGOT_PASSWORD_ERROR_STUDENT_ACCOUNT,
  FORGOT_PASSWORD_ERROR_NO_EMAIL,
} from "@constants/AppConstants";

class FadeView extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0)
  };

  componentDidMount() {
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 250
    }).start();
  }

  render() {
    // const versionManager = require("@utils/api_version.json");

    let { fadeAnim } = this.state;

    return (
      <Animated.View
        style={{
          flex: 1,
          opacity: fadeAnim
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

class LoginComponent extends Component {
  TextType = Object.freeze({
    email: 1,
    password: 2,
    emailResetPassword: 3
  });

  state = {
    isModalVisible: false,
    emailLoading: false,
    emailError: "",
    passwordError: "",
    resetPasswordError: ""
  };

  constructor() {
    super();
    this.onChangeText = this.onChangeText.bind(this);

    const initial = Orientation.getInitialOrientation();
    if (initial === "PORTRAIT") {
      this.styles = stylesPortrait;
    } else {
      this.styles = stylesLandscape;
    }
  }

  componentDidMount() {
    if (this.props.logedin) {
      this.props.navigation.navigate("Home");
    } else {
      Orientation.addOrientationListener(this._orientationDidChange);
      //   this.props.loading
      //     ? this.loadingButton.showLoading(true)
      //     : this.loadingButton.showLoading(false);
    }
  }

  _orientationDidChange = orientation => {
    if (orientation === "LANDSCAPE") {
      this.styles = stylesLandscape;
      this.forceUpdate();
    } else {
      this.styles = stylesPortrait;
      this.forceUpdate();
    }
  };

  componentWillUnmount() {
    this.props.resetInitialState();
    Orientation.getOrientation((err, orientation) => {
      console.log(`Current Device Orientation: ${orientation}`);
    });

    // Remember to remove listener
    Orientation.removeOrientationListener(this._orientationDidChange);
  }

  componentDidUpdate() {
    if (this.props.logedin) {
      this.props.navigation.navigate("Home");
    } else {
      //   this.props.loading
      //     ? this.loadingButton.showLoading(true)
      //     : this.loadingButton.showLoading(false);
    }
  }

  onChangeText(text, textType) {
    if (textType === this.TextType.email) {
      this.props.emailChanged(text);
    } else if (textType === this.TextType.password) {
      this.props.passwordChanged(text);
    } else if (textType === this.TextType.emailResetPassword) {
      this.props.resetPasswordChanged(text);
    }
  }

  onLoginPress() {
    Keyboard.dismiss();
    const emailError = ""; //validate('email', this.props.email)
    const passwordError = validate("password", this.props.password);

    this.setState({
      emailError: emailError,
      passwordError: passwordError
    });

    if (this.props.email && this.props.password) {
      //if (!emailError && !passwordError) {

      this.props.login(this.props.email, this.props.password, Platform.OS);
      // } else {
      //this.props.sendError('The format is invalid');
      //}
    } else {
      this.props.sendError("blankInfo");
    }
  }

  renderError() {
    if (this.props.error) {
      switch (this.props.error) {
        case "userNotFound":
          return (
            <Alert
              titleKey="loginScreen.usernotFound"
              messageKey="loginScreen.usernotFoundErrorMessage"
            />
          );
        //return <ErrorMessage error='Invalid Credentials' />
        case "invalidAccess":
          // if (this.props.error === 'invalidAccess') {
          //   this.props.saveFailedEmail(this.props.email);
          // }
          return (
            <Alert
              titleKey="loginScreen.invalidCredentials"
              messageKey="loginScreen.invalidCredentialsErrorMessage"
            />
          );
        case "invalidCredentials":
          return (
            <Alert
              titleKey="loginScreen.invalidCredentials"
              messageKey="loginScreen.invalidCredentialsErrorMessage"
            />
          );
        //return <ErrorMessage error='Invalid Credentials' />
        case "userDisabled":
          return (
            <Alert
              titleKey="loginScreen.userDisabled"
              messageKey="loginScreen.userDisabledErrorMessage"
            />
          );
        //return <ErrorMessage error='Account Blocked' />
        case "blankInfo":
          return (
            <Alert
              titleKey="loginScreen.userInfo"
              messageKey="loginScreen.userInfoErrorMessage"
            />
          );
        case "blankEmail":
          return (
            <Alert
              titleKey="loginScreen.emptyEmail"
              messageKey="loginScreen.emptyEmailErrorMessage"
            />
          );
        default:
          return (
            <Alert
              titleKey="loginScreen.generalError"
              messageKey="loginScreen.generalErrorMessage"
            />
          );
      }
    }
  }

  onSignupPress() {
    this.props.navigation.navigate("Signup");
  }

  onSendEmailPress() {
    Keyboard.dismiss();

    const resetPasswordError = validate("email", this.props.emailResetPassword);

    this.setState({
      resetPasswordError: resetPasswordError
    });

    let emailToReset;
    if (this.props.emailResetPassword == '') {
      emailToReset = this.props.troubledEmail
    } else {
      emailToReset = this.props.emailResetPassword
    }

    if (emailToReset) {
      if (!resetPasswordError) {
        this.setState({ emailLoading: true });
        // this.loadingButtonEmail.showLoading(true);
        this.props.sendEmail(emailToReset);
      } else {
        this.props.sendError("The format is invalid");
      }
    } else {
      this.props.sendError("blankEmail");
    }
  }

  toggleModal = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible
    });
  };

  renderCancelButton() {
    if (this.state.emailLoading) {
      return <ProgressIndicator styles={{ height: 50, width: 50 }} />;
    } else {
      return (
        <View>
          <Button
            //ref={ref => (this.loadingButtonEmail = ref)}
            // width={300}
            // height={50}
            //title={Loc.getInstance().TextFor("common.send", this.props)}
            titleFontSize={20}
            titleColor="rgb(255,255,255)"
            backgroundColor="#F37B20"
            borderRadius={30}
            onPress={this.onSendEmailPress.bind(this)}
          >
            {Loc.getInstance().TextFor("common.send", this.props)}
          </Button>

          <Button
            onPress={this.toggleModal}
            buttonStyles={this.styles.cancelButton}
            textStyle={this.styles.textButtonCalcel}
          >
            {Loc.getInstance().TextFor("common.cancel", this.props)}
          </Button>
        </View>
      );
    }
  }

  renderErrorPassword() {
    if (this.props.emailStatus == true) {
      return (
        <Text style={this.styles.succesMessage}>
          {Loc.getInstance().TextFor(
            "forgotPassword.messageSucces",
            this.props
          )}
        </Text>
      );
    } else if (this.props.emailStatus == false) {
      switch (this.props.errorForgotPassword) {
        case FORGOT_PASSWORD_ERROR_INVALID_ACCESS:
          return (
            <Text style={this.styles.failedMessage}>
              {Loc.getInstance().TextFor(
                "forgotPassword.messageError",
                this.props
              )}
              <Text>{"\n"}</Text>
              {Loc.getInstance().TextFor(
                "forgotPassword.invalidAccessError",
                this.props
              )}
            </Text>
          );
        case FORGOT_PASSWORD_ERROR_INVALID_EMAIL:
          return (
            <Text style={this.styles.failedMessage}>
              {Loc.getInstance().TextFor(
                "forgotPassword.messageError",
                this.props
              )}
              <Text>{"\n"}</Text>
              {Loc.getInstance().TextFor(
                "forgotPassword.invalidAccessError",
                this.props
              )}
            </Text>
          );
        case FORGOT_PASSWORD_ERROR_ACCOUNT_NOT_FOUND:
          return (
            <Text style={this.styles.failedMessage}>
              <Text>{"\n"}</Text>
              {Loc.getInstance().TextFor(
                "forgotPassword.messageErrorAccountNotFound",
                this.props
              )}
            </Text>
          );
        case FORGOT_PASSWORD_ERROR_STUDENT_ACCOUNT:
          return (
            <Text style={this.styles.failedMessage}>
              <Text>{"\n"}</Text>
              {Loc.getInstance().TextFor(
                "forgotPassword.messageErrorStudentAccount",
                this.props
              )}
            </Text>
          );
        case FORGOT_PASSWORD_ERROR_NO_EMAIL:
          return (
            <Text style={this.styles.failedMessage}>
              <Text>{"\n"}</Text>
              {Loc.getInstance().TextFor(
                "forgotPassword.messageErrorNoEmail",
                this.props
              )}
            </Text>
          );
        default:
          return (
            <Text style={this.styles.failedMessage}>
              {Loc.getInstance().TextFor(
                "forgotPassword.messageError",
                this.props
              )}
              <Text>{"\n"}</Text>
              {Loc.getInstance().TextFor(
                "forgotPassword.invalidEmail",
                this.props
              )}
            </Text>
          );
      }
    }
  }

  renderSuccessAnimation() {
    if (this.props.emailStatus == null) {
      return <View>{this.renderCancelButton()}</View>;
    } else if (this.props.emailStatus == true) {
      setTimeout(() => {
        this.props.resetEmail();
        this.toggleModal();
        this.setState({ emailLoading: false });
        //this.props.resetInitialState();

      }, 5000);

      return (
        <LottieView
          style={{ width: 100, height: 100, alignSelf: "center" }}
          ref={animation => {
            this.animation = animation;
          }}
          source={require("@assets/animations/success.json")}
          autoPlay
          loop={false}
        />
      );
    } else if (this.props.emailStatus === false) {
      setTimeout(() => {
        //this.props.resetEmail();
        this.props.emailStatus = null;
        this.setState({ emailLoading: false });
        this.props.resetForgotPasswordErrors();
      }, 8000);
      return (
        <LottieView
          style={{ width: 100, height: 100, alignSelf: "center" }}
          ref={animation => {
            this.animation = animation;
          }}
          source={require("@assets/animations/fail.json")}
          autoPlay
          loop={false}
        />
      );
    }
  }

  renderModalToRecoveryPassword() {
    return (
      <Modal
        isVisible={this.state.isModalVisible}
        style={this.styles.container}
      >
        <KeyboardAvoidingView behavior="position">
          <Container containerStyles={this.styles.modalContainer}>
            <BasicText
              textStyles={this.styles.titleModal}
              textKey="forgotPassword.title"
            />
            <BasicText
              textStyles={this.styles.bodyModal}
              textKey="forgotPassword.body"
            />
            <View style={this.styles.inputContainer}>
              <View style={this.styles.inputWrapper}>
                <Input
                  key={Loc.getInstance().TextFor(
                    "forgotPassword.placeholder",
                    this.props
                  )}
                  placeholder={Loc.getInstance().TextFor(
                    "forgotPassword.placeholder",
                    this.props
                  )}
                  label={Loc.getInstance().TextFor(
                    "forgotPassword.placeholder",
                    this.props
                  )}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  placeholderTextColor="gray"
                  keyboardType="email-address"
                  onChangeText={emailReset =>
                    this.onChangeText(
                      emailReset,
                      this.TextType.emailResetPassword
                    )
                  }
                  value={this.props.emailResetPassword}
                  // onBlur={() => {
                  //   this.setState({
                  //     resetPasswordError: validate(
                  //       "email",
                  //       (this.props.troubledEmail) ? this.props.emailResetPassword : this.props.troubledEmail
                  //     )
                  //   });
                  // }}
                  error={this.props.resetPasswordError}
                />
              </View>
              <View>
                {this.state.resetPasswordError ? (
                  <Text style={this.styles.errorTextStyle}>
                    {this.state.resetPasswordError}
                  </Text>
                ) : null}
              </View>
            </View>
            {this.renderSuccessAnimation()}
            <View>{this.renderErrorPassword()}</View>
          </Container>
        </KeyboardAvoidingView>
      </Modal>
    );
  }

  renderLoginButton() {
    if (this.props.loading === true) {
      return <ProgressIndicator styles={{ height: 50, width: 50 }} />;
    } else {
      return (
        <Button
          //ref={c => (this.loadingButton = c)}
          width={250}
          height={50}
          // title={Loc.getInstance().TextFor(
          //   "loginScreen.login",
          //   this.props
          // )}
          titleFontSize={20}
          titleColor="rgb(255,255,255)"
          backgroundColor="#F37B20"
          borderRadius={50}
          onPress={this.onLoginPress.bind(this)}
        >
          {Loc.getInstance().TextFor("loginScreen.login", this.props)}
        </Button>
      );
    }
  }

  onUpdatePressed = () => {
    this.props.clearUpdateNeededState();
    this.props.clearLoadingState();
  }

  renderUpdateModal() {
    if (this.props.apiVersionstate == true) {
      return (
        <Alert
          titleKey="common.apiVersionErrorTitle"
          messageKey="common.apiVersionErrorBody"
          onActionPressed={this.onUpdatePressed}
        />
      )
    }
  }

  render() {
    return (
      <FadeView style={{ flex: 1 }}>
        <Background imgBackground={imgBackground}>
          <ScrollView contentContainerStyle={this.styles.scrollViewContainerStyle}>
            <StatusBar barStyle="light-content" />
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : null}
              style={this.styles.container}
            >

              <View style={this.styles.logoContainer}>
                <Image source={logoImg} style={this.styles.logoStyle} />
                <BasicText
                  textStyles={this.styles.textLogo}
                  textKey="common.educode"
                />
              </View>
              <Container containerStyles={this.styles.loginContainer}>
                <View style={this.styles.inputContainer}>
                  <View style={this.styles.inputWrapper}>
                    <Input
                      key={Loc.getInstance().TextFor(
                        "common.email",
                        this.props
                      )}
                      placeholder={Loc.getInstance().TextFor(
                        "common.email",
                        this.props
                      )}
                      label={Loc.getInstance().TextFor(
                        "common.email",
                        this.props
                      )}
                      underlineColorAndroid="transparent"
                      autoCapitalize="none"
                      placeholderTextColor="gray"
                      keyboardType="email-address"
                      onChangeText={email =>
                        this.onChangeText(email, this.TextType.email)
                      }
                      value={this.props.email}
                      onBlur={() => {
                        this.setState({
                          emailError: "" //validate('email', this.props.email)
                        });
                      }}
                      error={this.props.emailError}
                    />
                  </View>
                  <View>
                    {this.state.emailError ? (
                      <Text style={this.styles.errorTextStyle}>
                        {this.state.emailError}
                      </Text>
                    ) : null}
                  </View>
                  <View style={this.styles.inputWrapper}>
                    <Input
                      key={Loc.getInstance().TextFor(
                        "common.password",
                        this.props
                      )}
                      secureTextEntry={true}
                      placeholder={Loc.getInstance().TextFor(
                        "common.password",
                        this.props
                      )}
                      label={Loc.getInstance().TextFor(
                        "common.password",
                        this.props
                      )}
                      underlineColorAndroid="transparent"
                      autoCapitalize="none"
                      placeholderTextColor="gray"
                      onChangeText={password =>
                        this.onChangeText(password, this.TextType.password)
                      }
                      value={this.props.password}
                      onBlur={() => {
                        this.setState({
                          emailError: validate("password", this.props.password)
                        });
                      }}
                      error={this.props.passwordError}
                    />
                  </View>
                  <View>
                    {this.state.passwordError ? (
                      <Text style={this.styles.errorTextStyle}>
                        {this.state.passwordError}
                      </Text>
                    ) : null}
                  </View>
                </View>
                {this.renderLoginButton()}
              </Container>
              <View style={this.styles.signupContainer}>
                <Button
                  onPress={this.onSignupPress.bind(this)}
                  buttonStyles={this.styles.signupButton}
                >
                  {Loc.getInstance().TextFor(
                    "loginScreen.newAccount",
                    this.props
                  )}
                </Button>
                <Button
                  onPress={this.toggleModal}
                  buttonStyles={this.styles.signupButton}
                >
                  {Loc.getInstance().TextFor(
                    "loginScreen.forgotPassword",
                    this.props
                  )}
                </Button>
              </View>
            </KeyboardAvoidingView>

          </ScrollView>
          <View style={this.styles.copyrightContainer}>
            <BasicText
              textStyles={this.styles.textCopyright}
              textKey="legal.copyright"
            />
          </View>
          <View>{this.renderModalToRecoveryPassword()}</View>
          <View>{this.renderError()}</View>
          <View>{this.renderUpdateModal()}</View>
        </Background>
      </FadeView>
    );
  }
}

const mapStateToProps = state => {
  const { user, jwt, locale, apiVersionstate } = state.app;

  const {
    email,
    password,
    emailResetPassword,
    emailStatus,
    error,
    loading,
    logedin,
    errorForgotPassword,
    troubledEmail,
  } = state.login;

  return {
    user,
    jwt,
    locale,
    email,
    password,
    emailResetPassword,
    emailStatus,
    error,
    loading,
    logedin,
    errorForgotPassword,
    troubledEmail,
    apiVersionstate
  };
};

export default connect(
  mapStateToProps,
  {
    login,
    emailChanged,
    passwordChanged,
    resetPasswordChanged,
    sendEmail,
    sendError,
    resetEmail,
    checkPresservedSession,
    changeCheckedLogin,
    resetInitialState,
    resetForgotPasswordErrors,
    saveFailedEmail,
    clearUpdateNeededState,
    clearLoadingState
  }
)(LoginComponent);
