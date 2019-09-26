import React, { Component } from "react";
import {
  StatusBar,
  KeyboardAvoidingView,
  Image,
  View,
  TouchableOpacity,
  Text,
  FlatList,
  Clipboard,
  ScrollView,
  Platform
} from "react-native";
import Orientation from "react-native-orientation";
import {
  Container,
  Background,
  Button,
  Input,
  BasicText
} from "@components/common";
import stylesPortrait from "./stylesheet";
import stylesLandscape from "./stylesheetLandscape";
import imgBackground from "@assets/img/green_base_image.png";
import userImage from "@assets/img/user_image.png";
import editIcon from "@assets/icons/edit.png";
import { connect } from "react-redux";
import {
  updateUserPhoto,
  getUserInfo,
  profileisLoading,
  firstnameChanged,
  lastnameChanged,
  usernameChanged,
  profilePasswordChanged,
  profileConfirmPasswordChanged,
  // getUserRewards,
  changePassword,
  updateInfo,
  resetProfileErrorState
} from "@actions/";
import DHeader from "@components/common/DHeader";
import Loc from "@components/common/Loc/Loc";
import ImageResizer from "react-native-image-resizer";
import ProgressIndicator from "@components/common/ProgressIndicator";
import RedeemedCard from "./RedeemedCard";
import validate from "../common/Validate_wrapper";
import AnimateLoadingButton from "react-native-animate-loading-button";
import LottieView from "lottie-react-native";
import { SINGLE_USER_LICENSEE, SPU_STUDENT } from "@constants/AppConstants";
import KeyboardManager, {
  PreviousNextView
} from "react-native-keyboard-manager";

var RNFS = require("react-native-fs");

const ImagePicker = require("react-native-image-picker");

class ProfileComponent extends Component {
  TextType = Object.freeze({
    firstName: 1,
    lastName: 2,
    username: 3,
    email: 4,
    password: 5,
    confirmPassword: 6
  });

  static navigationOptions = {
    drawerLabel: (
      <Loc
        styles={{
          color: "gray",
          fontFamily: "Roboto-Bold",
          fontSize: 19,
          paddingLeft: 38,
          paddingTop: 10,
          paddingBottom: 10
        }}
        locKey="profileScreen.drawerTitle"
      />
    )
  };

  constructor(props) {
    super(props);

    let initial = Orientation.getInitialOrientation();

    if (initial == 'PORTRAIT') {
      this.styles = stylesPortrait;
    } else {
      this.styles = stylesLandscape;
    }

    this.state = {
      passwordError: "",
      confirmPasswordError: "",
      btnSelected: 1,
      copyPressed: false,
      passwordPressed: false,
      isFetching: false,
      usernameFormat: true,
      editableInput: true
    };

    this.onReturnPress = this.onReturnPress.bind(this);
    this.takePhotoPress = this.takePhotoPress.bind(this);
    this.onResetPasswordPress = this.onResetPasswordPress.bind(this);
    this.onSupportPress = this.onSupportPress.bind(this);

    if (Platform.OS === "ios") {
      KeyboardManager.setEnable(true);
      KeyboardManager.setEnableDebugging(false);
      KeyboardManager.setKeyboardDistanceFromTextField(5);
      KeyboardManager.setToolbarPreviousNextButtonEnable(true);
      KeyboardManager.setToolbarDoneBarButtonItemText(
        Loc.getInstance().TextFor("profileScreen.doneButton", this.props)
      );
    }
  }

  onChangeText(text, textType) {
    if (textType === this.TextType.firstName) {
      this.props.firstnameChanged(text);
      this.props.updateInfo(text, this.props.lastName, this.props.username);
    } else if (textType === this.TextType.lastName) {
      this.props.lastnameChanged(text);
      this.props.updateInfo(this.props.firstName, text, this.props.username);
    } else if (textType === this.TextType.username) {
      format = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (format.test(text)) {
        this.setState({ usernameFormat: true });
        this.props.usernameChanged(text);
        this.props.updateInfo(this.props.firstName, this.props.lastName, text);
      } else {
        this.setState({ usernameFormat: false });
      }
    } else if (textType === this.TextType.password) {
      this.props.profilePasswordChanged(text);
    } else if (textType === this.TextType.confirmPassword) {
      this.props.profileConfirmPasswordChanged(text);
    }
  }

  componentDidMount() {
    Orientation.addOrientationListener(this._orientationDidChange);

    let deviceOrientation;

    Orientation.getOrientation((err, orientation) => {
      console.log(`Current Device Orientation: ${orientation}`);
      deviceOrientation = orientation
      if (deviceOrientation == 'PORTRAIT') {
        this.styles = stylesPortrait;
        this.forceUpdate();
      } else {
        this.styles = stylesLandscape;
        this.forceUpdate();
      }
    });
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
    Orientation.removeOrientationListener(this._orientationDidChange);
  }

  componentWillMount() {
    // this.props.getUserPhoto(this.props.user._id);
    this.props.getUserInfo();
    // this.props.getUserRewards();
  }

  getRewards() {
    this.setState({ isFetching: false });
  }

  onRefresh() {
    this.setState({ isFetching: true }, function () {
      this.getRewards();
    });
  }

  onSupportPress() {
    this.props.navigation.push("DrawerSupport", {
      'SHOW_BACK_BUTTON': true
    });
  }

  takePhotoPress() {
    let compressFormat = "JPEG"; // or 'PNG'
    let quality = 5; // out of 100

    ImagePicker.showImagePicker(response => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        this.props.profileisLoading(true);

        ImageResizer.createResizedImage(
          `data:image/png;base64,${response.data}`,
          1000,
          1000,
          compressFormat,
          quality
        )
          .then(resizedImageUri => {
            RNFS.readFile(resizedImageUri.path, "base64").then(res => {
              this.props.updateUserPhoto(`data:image/png;base64,${res}`);

              this.props.profileisLoading(false);
            });
          })
          .catch(err => {
            console.log("ERROR UPDATE USER PHOTO", err);
            this.props.profileisLoading(false);
          });
      }
    });
  }

  onReturnPress() {
    this.props.navigation.navigate("Dashboard");
  }

  onResetPasswordPress() {
    const passwordError = validate("password", this.props.password);
    const confirmPasswordError = validate("confirmPassword", {
      confirmPassword: this.props.confirmPassword,
      password: this.props.password
    });

    this.setState({
      passwordError: passwordError,
      confirmPasswordError: confirmPasswordError
    });

    if (this.props.password && this.props.confirmPassword) {
      if (passwordError == null && confirmPasswordError == null) {
        this.props.changePassword(this.props.password);
        this.loadingButtonSignup.showLoading(true);
      } else {
        console.log("THE FORMAT IS INCORRECT");
      }
    } else {
      console.log("EMPY FIELDS");
    }
  }

  onPressCopyCode(giftCode) {
    console.log("COPIED CODE->", giftCode);
    Clipboard.setString(giftCode);

    setTimeout(() => {
      this.setState({
        copyPressed: !this.state.copyPressed
      });
    }, 900);
    this.setState({
      copyPressed: !this.state.copyPressed
    });
  }

  _keyExtractor = (item, index) => item.id;

  _renderItem = ({ item }) => (
    <RedeemedCard gift={item} onPressCopy={() => this.onPressCopyCode(item)} />
  );

  renderSuccessAnimation() {
    if (this.props.passwordStatus == null) {
      return (
        <View>
          <AnimateLoadingButton
            ref={a => (this.loadingButtonSignup = a)}
            width={300}
            height={50}
            title={Loc.getInstance().TextFor(
              "profileScreen.resetPassword",
              this.props
            )}
            titleFontSize={20}
            titleColor="rgb(255,255,255)"
            backgroundColor="#047A7A"
            borderRadius={30}
            onPress={() => this.onResetPasswordPress()}
          />
        </View>
      );
    } else if (this.props.passwordStatus == true) {
      setTimeout(() => {
        this.props.resetProfileErrorState();
      }, 7000);
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
            textKey="profileScreen.changePasswordSucsess"
          />
        </View>
      );
    } else if (this.props.passwordStatus === false) {
      setTimeout(() => {
        this.props.passwordStatus = null;
        this.props.resetProfileErrorState();
      }, 7000);
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
            textKey="profileScreen.changePasswordFail"
          />
        </View>
      );
    }
  }

  renderProfileImage(style) {
    if (this.props.isLoading == true) {
      return <ProgressIndicator styles={this.styles.loaderIndicatorStyle} />;
    } else {
      if (this.props.image) {
        return (
          <TouchableOpacity onPress={() => this.takePhotoPress()}>
            <Image
              source={{ uri: this.props.image }}
              style={this.styles.userImage}
            />
            <Image source={editIcon} style={this.styles.editIcon} />
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity onPress={() => this.takePhotoPress()}>
            <Image source={userImage} style={this.styles.userImage} />
            <Image source={editIcon} style={this.styles.editIcon} />
          </TouchableOpacity>
        );
      }
    }
  }

  renderTabNavigation() {
    if (
      this.props.licenseeId !== SINGLE_USER_LICENSEE &&
      this.props.rank === SPU_STUDENT
    ) {
      return (
        <View style={{ flexDirection: "row" }}>
          <View style={this.styles.tabSelectedInfoSPU}>
            <Text style={this.styles.textTabSelectedInfoSPU}>
             {Loc.getInstance().TextFor("profileScreen.infoTab", this.props)}
            </Text>
          </View>
          {/* <Button
            buttonStyles={
              this.state.btnSelected == 1
                ? this.styles.tabSelectedInfo
                : this.styles.tabNotSeletedInfo
            }
            textStyle={
              this.state.btnSelected == 1
                ? this.styles.textTabSelectedInfo
                : this.styles.textTabNotSelectedInfo
            }
            onPress={() => this.setState({ btnSelected: 1 })}
          >
            {Loc.getInstance().TextFor("profileScreen.infoTab", this.props)}
          </Button> */}
          {/* <Button
            buttonStyles={
              this.state.btnSelected == 2
                ? this.styles.tabSelectedCard
                : this.styles.tabNotSeletedCard
            }
            textStyle={
              this.state.btnSelected == 2
                ? this.styles.textTabSelectedCard
                : this.styles.textTabNotSelectedCard
            }
            onPress={() => this.setState({ btnSelected: 2 })}
          >
            {Loc.getInstance().TextFor("profileScreen.cardTab", this.props)}
          </Button> */}
        </View>
      );
    } else {
      return (
        <View style={{ flexDirection: "row" }}>
          <Button
            buttonStyles={
              this.state.btnSelected == 1
                ? this.styles.tabSelectedInfoStudent
                : this.styles.tabNotSeletedInfoStudent
            }
            textStyle={
              this.state.btnSelected == 1
                ? this.styles.textTabSelectedInfoStudent
                : this.styles.textTabNotSelectedInfoStudent
            }
            onPress={() => this.setState({ btnSelected: 1 })}
          >
            {Loc.getInstance().TextFor("profileScreen.infoTab", this.props)}
          </Button>
          {/* <Button
            buttonStyles={
              this.state.btnSelected == 2
                ? this.styles.tabSelectedCardStudent
                : this.styles.tabNotSeletedCardStudent
            }
            textStyle={
              this.state.btnSelected == 2
                ? this.styles.textTabSelectedCardStudent
                : this.styles.textTabNotSelectedCardStudent
            }
            onPress={() => this.setState({ btnSelected: 2 })}
          >
            {Loc.getInstance().TextFor("profileScreen.cardTab", this.props)}
          </Button> */}
          <Button
            buttonStyles={
              this.state.btnSelected == 3
                ? this.styles.tabSelectedPasswordStudent
                : this.styles.tabNotSeletedPasswordStudent
            }
            textStyle={
              this.state.btnSelected == 3
                ? this.styles.textTabSelectedPasswordStudent
                : this.styles.textTabNotSelectedPasswordStudent
            }
            onPress={() => this.setState({ btnSelected: 3 })}
          >
            {Loc.getInstance().TextFor("profileScreen.passwordTab", this.props)}
          </Button>
        </View>
      );
    }
  }

  renderContent() {
    if (
      this.props.licenseeId !== SINGLE_USER_LICENSEE &&
      this.props.rank == SPU_STUDENT) {
      this.state.editableInput = false
    }

    if (this.state.btnSelected == 1) {
      return (
        <View style={{ flex: 1, paddingTop: 40 }}>
          <View style={this.styles.inputContainer}>
            <View style={this.styles.textPrimaryContainer}>
              <View style={this.styles.invisibleView} />
              <View style={{ width: "70%" }}>
                <Input
                  editable={this.state.editableInput}
                  inputStyles={this.styles.inputStyles}
                  maxLength={150}
                  secureTextEntry={false}
                  placeholder={Loc.getInstance().TextFor(
                    "profileScreen.firstName",
                    this.props
                  )}
                  label={Loc.getInstance().TextFor(
                    "profileScreen.firstName",
                    this.props
                  )}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  placeholderTextColor="#D8D8D8"
                  keyboardType="default"
                  backgroundColor="white"
                  onChangeText={firstname =>
                    this.onChangeText(firstname, this.TextType.firstName)
                  }
                  value={this.props.firstName}
                />
              </View>
              <View style={this.styles.invisibleView} />
            </View>
            <View style={this.styles.textSecondaryContainer}>
              <View style={this.styles.invisibleView} />
              <Text style={this.styles.secondaryText}>
                {Loc.getInstance().TextFor(
                  "profileScreen.firstName",
                  this.props
                )}
              </Text>
              <View style={this.styles.invisibleView} />
            </View>
          </View>
          <View style={this.styles.inputContainer}>
            <View style={this.styles.textPrimaryContainer}>
              <View style={this.styles.invisibleView} />
              <View style={{ width: "70%" }}>
                <Input
                  editable={this.state.editableInput}
                  inputStyles={this.styles.inputStyles}
                  maxLength={150}
                  secureTextEntry={false}
                  placeholder={Loc.getInstance().TextFor(
                    "profileScreen.lastName",
                    this.props
                  )}
                  label={Loc.getInstance().TextFor(
                    "profileScreen.lastName",
                    this.props
                  )}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  placeholderTextColor="#D8D8D8"
                  keyboardType="default"
                  backgroundColor="white"
                  onChangeText={lastname =>
                    this.onChangeText(lastname, this.TextType.lastName)
                  }
                  value={this.props.lastName}
                />
              </View>
              <View style={this.styles.invisibleView} />
            </View>
            <View style={this.styles.textSecondaryContainer}>
              <View style={this.styles.invisibleView} />
              <Text style={this.styles.secondaryText}>
                {Loc.getInstance().TextFor(
                  "profileScreen.lastName",
                  this.props
                )}
              </Text>
              <View style={this.styles.invisibleView} />
            </View>
          </View>
          <View style={this.styles.inputContainer}>
            <View style={this.styles.textPrimaryContainer}>
              <View style={this.styles.invisibleView} />
              <View style={{ width: "70%" }}>
                <Input
                  editable={this.state.editableInput}
                  inputStyles={[
                    this.styles.inputStyles,
                    !this.state.usernameFormat
                      ? this.styles.inputStylesError
                      : null
                  ]}
                  maxLength={150}
                  secureTextEntry={false}
                  placeholder={Loc.getInstance().TextFor(
                    "profileScreen.userName",
                    this.props
                  )}
                  label={Loc.getInstance().TextFor(
                    "profileScreen.userName",
                    this.props
                  )}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  placeholderTextColor="#D8D8D8"
                  keyboardType="default"
                  backgroundColor="white"
                  onChangeText={username =>
                    this.onChangeText(username, this.TextType.username)
                  }
                  value={this.props.username}
                />
              </View>
              <View style={this.styles.invisibleView} />
            </View>
            <View style={this.styles.textSecondaryContainer}>
              <View style={this.styles.invisibleView} />
              {this.state.usernameFormat ? (
                <Text style={this.styles.secondaryText}>
                  {Loc.getInstance().TextFor(
                    "profileScreen.userName",
                    this.props
                  )}
                </Text>
              ) : (
                  <Text style={this.styles.secondaryTextError}>
                    {Loc.getInstance().TextFor(
                      "profileScreen.invalidUsername",
                      this.props
                    )}
                  </Text>
                )}

              <View style={this.styles.invisibleView} />
            </View>
          </View>
        </View>
      );
    } else if (this.state.btnSelected == 2) {
      if (this.props.gift.length > 0) {
        return (
          <View style={{ flex: 1 }}>
            <FlatList
              data={this.props.gift}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
              onRefresh={() => this.onRefresh()}
              refreshing={this.state.isFetching}
            />
            {this.state.copyPressed == true ? (
              <View style={this.styles.copyContainer}>
                <Text style={this.styles.textCopyCode}>
                  {Loc.getInstance().TextFor(
                    "profileScreen.copiedCode",
                    this.props
                  )}
                </Text>
              </View>
            ) : null}
          </View>
        );
      } else {
        return (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ color: "gray", fontSize: 24, alignSelf: "center" }}>
              {Loc.getInstance().TextFor(
                "profileScreen.placeholderOverCompleted",
                this.props
              )}
            </Text>
          </View>
        );
      }
    } else {
      return (
        <View style={{ flex: 1, padding: 30, justifyContent: "center" }}>
          <Text
            style={{
              color: "gray",
              fontFamily: "Roboto-Medium",
              fontSize: 22,
              alignSelf: "center"
            }}
          >
            {Loc.getInstance().TextFor("profileScreen.tittleTab", this.props)}
          </Text>
          <View style={{ margin: 40, paddingLeft: 50, paddingRight: 50 }}>
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
                      passwordError: validate("password", this.props.password)
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
          {this.renderSuccessAnimation()}
        </View>
      );
    }
  }

  renderMainContent() {
    if (this.props.isLoading == true) {
      return (
        <Container containerStyles={this.styles.infoContainer}>
          <ProgressIndicator styles={this.styles.loaderIndicatorStyle} />
        </Container>
      );
    } else {
      return (
        <Container containerStyles={this.styles.infoContainer}>
          {this.renderTabNavigation()}
          {this.renderContent()}
        </Container>
      );
    }
  }

  render() {
    return (
      <Background imgBackground={imgBackground}>
        <StatusBar barStyle="light-content" />
        <DHeader textKey="profileScreen.drawerTitle" onPress={() => this.onSupportPress()} />
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={this.styles.container}>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <View style={this.styles.userImageContainer}>
              {this.renderProfileImage()}
            </View>
            <View style={{ height: 10 }} />
            <View style={this.styles.contentContainer}>
              {this.renderMainContent()}
            </View>
          </View>
        </KeyboardAvoidingView>
      </Background>
    );
  }
}

// const mapStateToProps = ({ state, i18n }) => {
const mapStateToProps = ({ profile, app, i18n }) => {
  const {
    image,
    firstName,
    lastName,
    username,
    isLoading,
    gift,
    rank,
    licenseeId,
    password,
    confirmPassword,
    changePassword,
    passwordStatus
  } = profile;
  const { user } = app;
  const { locale } = i18n;

  return {
    image,
    user,
    firstName,
    lastName,
    username,
    locale,
    isLoading,
    gift,
    rank,
    licenseeId,
    password,
    confirmPassword,
    changePassword,
    passwordStatus
  };
};

export default connect(
  mapStateToProps,
  {
    updateUserPhoto,
    getUserInfo,
    profileisLoading,
    firstnameChanged,
    lastnameChanged,
    usernameChanged,
    profilePasswordChanged,
    profileConfirmPasswordChanged,
    // getUserRewards,
    changePassword,
    updateInfo,
    resetProfileErrorState
  }
)(ProfileComponent);
