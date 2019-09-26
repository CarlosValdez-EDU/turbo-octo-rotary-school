import React, { Component } from "react";
import {
  StatusBar,
  KeyboardAvoidingView,
  Image,
  View,
  TouchableOpacity,
  Text,
  Keyboard,
  ScrollView,
  Platform
} from "react-native";
import { WebView } from "react-native-webview";
import { connect } from "react-redux";
import {
  signup,
  showError,
  signupFirstNameChanged,
  signupLastNameChanged,
  signupUsernameChanged,
  signupEmailChanged,
  signupPasswordChanged,
  signupConfirmPasswordChanged,
  registered,
  resetSignup,
  resetErrorState,
  resetSignupErrors
} from "@actions/";
import {
  Button,
  Container,
  Background,
  BasicText,
  Checkbox,
  Input
} from "@components/common";
import ProgressIndicator from '@components/common/ProgressIndicator';
import Orientation from "react-native-orientation";
import stylesPortrait from "./stylesheetPortrait";
import stylesLandscape from "./stylesheetLandscape";
import Modal from "react-native-modal";
import logoImg from "@assets/img/logoX3.png";
import AnimateLoadingButton from "react-native-animate-loading-button";
import LottieView from "lottie-react-native";
import validate from "../common/Validate_wrapper";
import Alert from "../common/Alert";
import DHeader from "@components/common/DHeader";
import imgBackground from "@assets/img/background_orange.jpg";
import I18n from "@assets/i18n";
import Loc from "@components/common/Loc/Loc";
import { setLocale } from "react-native-redux-i18n";
import { Radio } from "native-base";
import {
  en_ca_TS,
  fr_ca_TS
} from "@constants/HtmlTexts";
import KeyboardManager, { PreviousNextView } from 'react-native-keyboard-manager';



const en_TermsConditions = Platform.OS === 'ios' ? {html: en_ca_TS} : {uri: 'file:///android_asset/terms_en-ca.html'};
const fr_TermsConditions = Platform.OS === 'ios' ? {html: fr_ca_TS} : {uri: 'file:///android_asset/terms_fr-ca.html'};

class SignupComponent extends Component {
  TextType = Object.freeze({
    firstName: 1,
    lastName: 2,
    username: 3,
    email: 4,
    password: 5,
    confirmPassword: 6
  });

  constructor(props) {
    super(props);
    this.state = {
      emailError: "",
      passwordError: "",
      confirmPasswordError: "",
      termsError: false,
      checkedSingleUser: false,
      checkedParent: false,
      checkedUserTypeError: false,
      isModalVisible: false,
      isModal2Visible: false,
      userType: "spu",
      checkedTerms: false
    };
    this.onSignupPressed = this.onSignupPressed.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleMoreInfoModal = this.toggleMoreInfoModal.bind(this);
    this.pressCheckTerms = this.pressCheckTerms.bind(this);
    // this.pressCheckNewsletter = this.pressCheckNewsletter.bind(this);
    // this.pressCheckedSingleUser = this.pressCheckedSingleUser.bind(this);
    // this.pressCheckedParent = this.pressCheckedParent.bind(this);
    this.renderErrorTerms = this.renderErrorTerms.bind(this);
    this.onAcceptTermsPress = this.onAcceptTermsPress.bind(this);

    const initial = Orientation.getInitialOrientation();
    if (initial === "PORTRAIT") {
      this.styles = stylesPortrait;
    } else {
      this.styles = stylesLandscape;
    }


    if(Platform.OS == 'ios'){
      KeyboardManager.setToolbarPreviousNextButtonEnable(true);
      KeyboardManager.setToolbarPreviousNextButtonEnable(true);
      KeyboardManager.setEnableDebugging(false);
      KeyboardManager.setKeyboardDistanceFromTextField(10);
      KeyboardManager.setPreventShowingBottomBlankSpace(true);
      KeyboardManager.setEnableAutoToolbar(true);
      KeyboardManager.setToolbarDoneBarButtonItemText("Done");
      KeyboardManager.setToolbarManageBehaviour(0);
      KeyboardManager.setShouldToolbarUsesTextFieldTintColor(false);
      KeyboardManager.setShouldShowToolbarPlaceholder(true);
      KeyboardManager.setOverrideKeyboardAppearance(false);
      KeyboardManager.setShouldResignOnTouchOutside(true);
      KeyboardManager.resignFirstResponder();

    }

  }

  componentDidMount() {
    Orientation.addOrientationListener(this._orientationDidChange);
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
    Orientation.getOrientation((err, orientation) => {
      // console.log(`Current Device Orientation: ${orientation}`);
    });

    // Remember to remove listener
    Orientation.removeOrientationListener(this._orientationDidChange);

    this.props.resetSignup();
  }

  componentDidUpdate() {
    // console.log("LOADING:", this.loadingButton);
    //this.props.loading ? this.loadingButton.showLoading(true) : this.loadingButton.showLoading(false);
  }

  onReturnPress() {
    this.props.navigation.navigate("Login");
    this.props.resetSignup();
  }

  goToDashboard() {
    this.props.navigation.navigate("Dashboard");
  }

  onSignupPressed() {
    // this.props.setLocale('fr-CA');
    // this.props.resetSignup();
    Keyboard.dismiss();

    const emailError = validate("email", this.props.email);
    const passwordError = validate("password", this.props.password);
    const confirmPasswordError = validate("confirmPassword", {
      confirmPassword: this.props.confirmPassword,
      password: this.props.password
    });

    this.setState({
      emailError: emailError,
      passwordError: passwordError,
      confirmPasswordError: confirmPasswordError,
      userType: "spu"
    });

    if (this.props.email && this.props.password) {
      if (!emailError && !passwordError && !confirmPasswordError) {
        if (this.state.checkedTerms == false) {
          this.setState({
            termsError: true
          });
        } else {
          this.props.signup(
            this.props.email,
            this.props.password,
            this.state.userType
          );
          //this.loadingButtonSignup.showLoading(true);
          // this.props.resetSignup();
        }
      } else {
        this.props.showError("The format is invalid");
        // this.props.resetSignup();
      }
    } else {
      this.props.showError("blankInfo");
      // this.props.resetSignup();
    }
  }

  renderError() {
    // console.log("error from signup: " + this.props.error);
    if (this.props.error) {
      switch (this.props.error) {
        case "usernameIsTaken":
          return (
            <Alert
              titleKey="loginScreen.userAlreadyExists"
              messageKey="loginScreen.userAlreadyExistsMessage"
            />
          );
        case "blankInfo":
          return (
            <Alert
              titleKey="loginScreen.userInfo"
              messageKey="loginScreen.userInfoErrorMessage"
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

  onAcceptTermsPress() {
    if (this.state.checkedTerms == false) {
      this.pressCheckTerms();
    }

    this.toggleModal();
  }

  onChangeText(text, textType) {
    if (textType === this.TextType.email) {
      this.props.signupEmailChanged(text);
    } else if (textType === this.TextType.password) {
      this.props.signupPasswordChanged(text);
    } else if (textType === this.TextType.confirmPassword) {
      this.props.signupConfirmPasswordChanged(text);
    } else if (textType === this.TextType.firstName) {
      this.props.signupFirstNameChanged(text);
    } else if (textType === this.TextType.lastName) {
      this.props.signupLastNameChanged(text);
    } else if (textType === this.TextType.username) {
      this.props.signupUsernameChanged(text);
    }
  }

  toggleModal() {
    this.setState({
      isModalVisible: !this.state.isModalVisible
    });
  }

  toggleMoreInfoModal() {
    this.setState({
      isModal2Visible: !this.state.isModal2Visible
    });
  }

  pressCheckTerms() {
    if (this.state.termsError == true) {
      this.setState({
        termsError: false
      });
    }

    this.setState({
      checkedTerms: !this.state.checkedTerms
    });
  }

  // pressCheckedSingleUser() {
  //     if (this.state.checkedParent == true) {
  //         this.setState({
  //             checkedParent: !this.state.checkedParent,
  //             checkedSingleUser: !this.state.checkedSingleUser,
  //         });
  //         this.state.type = "spu"
  //     } else {
  //         this.setState({
  //             checkedSingleUser: !this.state.checkedSingleUser,
  //         });
  //         this.state.type = "spu"
  //     }
  // }

  // pressCheckedParent() {
  //     if (this.state.checkedSingleUser == true) {
  //         this.setState({
  //             checkedSingleUser: !this.state.checkedSingleUser,
  //             checkedParent: !this.state.checkedParent,
  //         });
  //         this.state.type = "parent"
  //     } else {
  //         this.setState({
  //             checkedParent: !this.state.checkedParent,
  //         });
  //         this.state.type = "parent"
  //     }
  // }

  renderSuccessAnimation() {
    if (this.props.registerStatus == null) {
      if (this.props.loading === false) {
        return (
          <View>
            <Button
              // ref={a => (this.loadingButtonSignup = a)}
              // width={300}
              // height={50}
              buttonStyles={{
                backgroundColor: "#3EBCA9",
                width: 300,
                height: 50,
                borderRadius: 30,
                alignSelf: 'center'
              }}
              onPress={() => this.onSignupPressed()}
            >{Loc.getInstance().TextFor("signUpScreen.signUp", this.props)}</Button>
          </View>
        );
      } else {
        return <ProgressIndicator styles={{ height: 50, width: 50, alignSelf: 'center' }} />;
      }
    } else if (this.props.registerStatus == true) {
      setTimeout(() => {
        this.props.resetErrorState();
        {
          this.goToDashboard();
        }
      }, 1000);
      return (
        <View style={{ flexDirection: "column" }}>
          <LottieView
            style={{ width: 60, height: 60, alignSelf: "center" }}
            ref={animation => {
              this.animation = animation;
            }}
            source={require("@assets/animations/success.json")}
            autoPlay
            loop={false}
          />
          <BasicText
            textStyles={this.styles.succesMessage}
            textKey="signUpScreen.successSignup"
          />
        </View>
      );
    } else if (this.props.registerStatus === false) {
      setTimeout(() => {
        this.props.registerStatus = null;
        this.props.resetSignupErrors();
        this.props.resetErrorState();
      }, 5000);
      return (
        <View style={{ flexDirection: "column" }}>
          <LottieView
            style={{ width: 60, height: 60, alignSelf: "center" }}
            ref={animation => {
              this.animation = animation;
            }}
            source={require("@assets/animations/fail.json")}
            autoPlay
            loop={false}
          />
          <BasicText
            textStyles={this.styles.failedMessage}
            textKey="signUpScreen.signupError"
          />
        </View>
      );
    }
  }

  renderErrorTerms() {
    if (this.state.termsError == true) {
      return (
        <BasicText
          textStyles={{
            color: "#ff2a2b",
            fontSize: 15,
            textAlign: "center",
            marginBottom: 10
          }}
          textKey="common.termsError"
        />
      );
    }
  }

  renderErrorUserType() {
    if (this.state.checkedUserTypeError == true) {
      return (
        <BasicText
          textStyles={{
            color: "#ff2a2b",
            fontSize: 15,
            textAlign: "center",
            marginBottom: 10
          }}
          textKey="common.userTypeError"
        />
      );
    }
  }

  renderModalTerms() {
    return (
      <Modal
        isVisible={this.state.isModalVisible}
        style={this.styles.container}
      >
        <KeyboardAvoidingView behavior="position">
          <Container containerStyles={this.styles.modalContainer}>
            <BasicText
              textStyles={this.styles.titleModal}
              textKey="common.terms"
            />
            <WebView
              useWebKit={false}
              source={
                I18n.locale == "fr-CA".toLocaleLowerCase()
                  ? en_TermsConditions
                  : fr_TermsConditions
              }
              style={{ flex: 1 }}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              scalesPageToFit={true}
            />
            <View style={this.styles.buttonsContainer}>
              <Button
                onPress={this.toggleModal}
                buttonStyles={this.styles.buttonCancel}
                textStyle={this.styles.textButtonCalcel}
              >
                {Loc.getInstance().TextFor("common.cancelText", this.props)}
              </Button>
              <Button
                buttonStyles={this.styles.buttonAccept}
                onPress={this.onAcceptTermsPress}
              >
                {Loc.getInstance().TextFor("common.acceptText", this.props)}
              </Button>
            </View>
          </Container>
        </KeyboardAvoidingView>
      </Modal>
    );
  }

  render() {
    return (
      <Background imgBackground={imgBackground}>
        <StatusBar barStyle="light-content" />
        <DHeader textKey="signUpScreen.signUp" showBack hideUpgradeButton />

        <ScrollView contentContainerStyle={{ flexGrow: 1, height:'100%' }}>
          <KeyboardAvoidingView
            behavior={"padding"}
            style={this.styles.container}
          >
            <View style={this.styles.container}>
              <Container containerStyles={this.styles.singupContainer}>
                <View style={this.styles.logoContainer}>
                  <Image source={logoImg} style={this.styles.logoStyle} />
                </View>

                <PreviousNextView>
                <View style={this.styles.inputContainer}>
                  <View style={{ flexDirection: "column" }}>
                    <View style={this.styles.inputWrapper}>
                      <Input
                        maxLength={150}
                        secureTextEntry={false}
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
                        backgroundColor="white"
                        onChangeText={email =>
                          this.onChangeText(email, this.TextType.email)
                        }
                        value={this.state.email}
                        onBlur={() => {
                          this.setState({
                            emailError: validate("email", this.props.email)
                          });
                        }}
                        error={this.props.emailError}
                      />
                    </View>
                    <View style={{ height: 15 }}>
                      {this.state.emailError ? (
                        <Text style={this.styles.errorTextStyle}>
                          {this.state.emailError}
                        </Text>
                      ) : null}
                    </View>
                  </View>
                  <View style={{ flexDirection: "column" }}>
                    <View style={this.styles.inputWrapper}>
                      <Input
                        maxLength={100}
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
                        autoCapitalize="words"
                        placeholderTextColor="gray"
                        backgroundColor="white"
                        onChangeText={password =>
                          this.onChangeText(password, this.TextType.password)
                        }
                        value={this.state.password}
                        onBlur={() => {
                          this.setState({
                            passwordError: validate(
                              "password",
                              this.props.password
                            )
                          });
                        }}
                        error={this.props.passwordError}
                      />
                    </View>
                    <View style={{ height: 15 }}>
                      {this.state.passwordError ? (
                        <Text style={this.styles.errorTextStyle}>
                          {this.state.passwordError}
                        </Text>
                      ) : null}
                    </View>
                  </View>
                  <View style={{ flexDirection: "column" }}>
                    <View style={this.styles.inputWrapper}>
                      <Input
                        maxLength={100}
                        secureTextEntry={true}
                        placeholder={Loc.getInstance().TextFor(
                          "signUpScreen.comfirmPassword",
                          this.props
                        )}
                        label={Loc.getInstance().TextFor(
                          "signUpScreen.comfirmPassword",
                          this.props
                        )}
                        underlineColorAndroid="transparent"
                        autoCapitalize="words"
                        placeholderTextColor="gray"
                        backgroundColor="white"
                        onChangeText={confirmPassword =>
                          this.onChangeText(
                            confirmPassword,
                            this.TextType.confirmPassword
                          )
                        }
                        value={this.state.confirmPassword}
                        onBlur={() => {
                          this.setState({
                            confirmPasswordError: validate(
                              "confirmPassword",
                              this.props.confirmPassword
                            )
                          });
                        }}
                        error={this.props.confirmPasswordError}
                      />
                    </View>
                    <View>
                      {this.state.confirmPasswordError ? (
                        <Text style={this.styles.errorTextStyle}>
                          {this.state.confirmPasswordError}
                        </Text>
                      ) : null}
                    </View>
                  </View>
                </View>
                </PreviousNextView>
                
                {/* <View style={this.styles.checkRadiusContainer}>
                                <TouchableOpacity onPress={() => this.pressCheckedSingleUser()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Radio selected={this.state.checkedSingleUser} onPress={() => this.pressCheckedSingleUser()} color={'lightgray'} selectedColor={'#3EBCA9'} />
                                    <Text style={this.styles.radioTextStyle}><Loc locKey="signUpScreen.singleUser" /></Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.pressCheckedParent()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Radio selected={this.state.checkedParent} onPress={() => this.pressCheckedParent()} color={'lightgray'} selectedColor={'#3EBCA9'} />
                                    <Text style={this.styles.radioTextStyle}><Loc locKey="signUpScreen.parent" /></Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                {this.renderErrorUserType()}
                            </View> */}

                {/* <View style={this.styles.checkMoreInfoContainer}>
                                <View style={this.styles.checkBoxTerms}>
                                    <TouchableOpacity onPress={this.toggleMoreInfoModal}>
                                        <BasicText textStyles={this.styles.textTerms} textKey="signUpScreen.moreInfoButton" />
                                    </TouchableOpacity>
                                </View>
                            </View> */}

                <View style={this.styles.checkboxContainer}>
                  <View style={this.styles.checkBoxTerms}>
                    <Checkbox
                      onPress={() => this.pressCheckTerms()}
                      checked={this.state.checkedTerms}
                      colorCheck="#3EBCA9"
                    >
                      <Loc locKey="signUpScreen.acceptTerms" />
                    </Checkbox>
                    <TouchableOpacity onPress={this.toggleModal}>
                      <BasicText
                        textStyles={this.styles.textTerms}
                        textKey="common.terms"
                      />
                    </TouchableOpacity>
                  </View>
                  {this.renderErrorTerms()}
                </View>

                {this.renderSuccessAnimation()}
                {/* <View>
                                {this.props.registerStatus == true ? <BasicText textStyles={this.styles.succesMessage} textKey="signUpScreen.successSignup" /> : null}
                            </View> */}
              </Container>
            </View>

            {/* <View>
                        {this.renderModalMoreInfo()}
                    </View> */}
            <View>{this.renderModalTerms()}</View>
          </KeyboardAvoidingView>
        </ScrollView>

        <View style={this.styles.copyrightContainer}>
          <BasicText
            textStyles={this.styles.textCopyright}
            textKey="legal.copyright"
          />
        </View>
        <View>{this.renderError()}</View>
      </Background>
    );
  }
}

const mapStateToProps = ({ signup, i18n }) => {
  const {
    email,
    password,
    confirmPassword,
    userType,
    loading,
    registered,
    registerStatus,
    error
  } = signup;
  const { locale } = i18n;
  return {
    email,
    password,
    confirmPassword,
    userType,
    loading,
    registered,
    registerStatus,
    error,
    locale
  };
};

export default connect(
  mapStateToProps,
  {
    signup,
    showError,
    signupFirstNameChanged,
    signupLastNameChanged,
    signupUsernameChanged,
    signupEmailChanged,
    signupPasswordChanged,
    signupConfirmPasswordChanged,
    registered,
    resetSignup,
    resetErrorState,
    setLocale,
    resetSignupErrors
  }
)(SignupComponent);
