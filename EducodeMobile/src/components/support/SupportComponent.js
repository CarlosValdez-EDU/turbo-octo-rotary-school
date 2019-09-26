import React, { Component, Platform, Dimensions } from "react";
import { connect } from "react-redux";
import {
  KeyboardAvoidingView,
  View,
  Text,
  Keyboard,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image
} from "react-native";
import Modal from "react-native-modal";
import DHeader from "@components/common/DHeader";
import {
  Background,
  Container,
  BasicText,
  Input,
  Button
} from "@components/common";
import Alert from "@components/common/Alert";
import ProgressIndicator from "@components/common/ProgressIndicator";
import AnimateLoadingButton from "react-native-animate-loading-button";
import Loc from "@components/common/Loc/Loc";
import LottieView from "lottie-react-native";
import Icon from "react-native-ionicons";
import imgBackground from "@assets/img/background_orange.jpg";
import styles from "./stylesheet";
import {
  checkAccess,
  joinRoom,
  sendMessage,
  userTyping,
  resetErrorCredentials,
  resetSupport,
  userInChatRoom,
  getUserImage,
  closeButtonPressed
} from "@actions/";
import _ from "lodash";
import { getCurrentUser } from "@data/local/UserRepository";
import { SINGLE_USER_LICENSEE } from "@constants/AppConstants";
import Orientation from "react-native-orientation";
import userImage from "@assets/img/user_image.png";

class SupportComponent extends Component {
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
        locKey="support.title"
      />
    )
  };

  state = {
    userId: "",
    userMessage: "",
    userName: "",
    password: "",
    userLicensee: "",
    showBack: false
  };

  constructor(props) {
    super(props);

    this.renderItem = this.renderItem.bind(this);
    this._orientationDidChange = this._orientationDidChange.bind(this);
    this.renderChatView = this.renderChatView.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.saveUserInput = this.saveUserInput.bind(this);
    this.onValidateCredentialsPress = this.onValidateCredentialsPress.bind(
      this
    );
    this.onUsernameChangeText = this.onUsernameChangeText.bind(this);
    this.onPasswordChangeText = this.onPasswordChangeText.bind(this);
    this.cancelPressed = this.cancelPressed.bind(this);
    this.props.loadUserLicense = this.loadUserLicense.bind(this);
    this.renderTechLeftChat = this.renderTechLeftChat.bind(this);
    this.onTechLeftPressed = this.onTechLeftPressed.bind(this);
    this.closePressed = this.closePressed.bind(this);
  }

  loadUserLicense() {
    let currentUser = getCurrentUser();
    this.props.getUserImage(currentUser._id);
    this.setState({
      userLicensee: currentUser.licenseeId,
      userId: currentUser._id
    });
  }

  componentDidMount() {
    this.loadUserLicense();

    Orientation.addOrientationListener(this._orientationDidChange);

    let showBack = this.props.navigation.getParam("SHOW_BACK_BUTTON");

    if (showBack == true) {
      this.setState({
        showBack: showBack
      });
    }

    this.props.userInChatRoom(true);

    this.loadUserLicense();

    let roomId = this.props.roomId;

    if (roomId) {
      this.props.joinRoom(roomId);
    } else {
      if (this.props.licenseeId === SINGLE_USER_LICENSEE) {
        this.props.joinRoom(roomId);
      }
    }
  }

  componentWillUnmount() {
    Orientation.removeOrientationListener(this._orientationDidChange);
    this.props.userInChatRoom(false);
    if (this.props.navigation.state.params) {
      this.props.navigation.state.params.SHOW_BACK_BUTTON = undefined;
    }
  }

  _orientationDidChange = orientation => {
    Keyboard.dismiss();
  };

  cancelPressed() {
    this.props.navigation.goBack();
  }

  onSend() {
    if (!_.isEmpty(this.state.userMessage)) {
      this.props.sendMessage(this.state.userMessage, this.props.roomId);
      this.props.userTyping(this.props.roomId, false);

      this.setState({
        userMessage: ""
      });
    }
  }

  onValidateCredentialsPress() {
    Keyboard.dismiss();

    this.loadingButtonOk.showLoading(true);

    try {
      this.props.checkAccess(this.state.userName, this.state.password);
    } catch (error) {
      console.log(error);
    }
  }

  onTechLeftPressed() {
    this.props.resetSupport();
    this.props.navigation.goBack();
  }

  closePressed() {
    this.props.closeButtonPressed();
    this.props.navigation.goBack();
  }

  saveUserInput(text) {
    try {
      this.setState({
        userMessage: text
      });

      if (text.length > 0) {
        this.props.userTyping(this.props.roomId, true);
      } else {
        this.props.userTyping(this.props.roomId, false);
      }
    } catch (error) {
      debugger;
      console.log(error);
    }
  }

  onUsernameChangeText(text) {
    this.setState({
      userName: text
    });
  }

  onPasswordChangeText(text) {
    this.setState({
      password: text
    });
  }

  renderFooter() {
    if (this.props.techSupportIsTyping) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            {Loc.getInstance().TextFor("support.isTyping", this.props)}
          </Text>
        </View>
      );
    } else {
      return <View style={{ height: 30 }} />;
    }
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <ProgressIndicator styles={styles.progressIndicatorStyle} />
        <Text style={styles.waitingMessageStyle}>
          {Loc.getInstance().TextFor("support.waitingText", this.props)}
        </Text>
      </View>
    );
  }

  renderItem({ item }) {
    if (item.user._id === this.state.userId) {
      let imageUser = userImage;
      if (!_.isEmpty(this.props.userImage)) {
        imageUser = { uri: this.props.userImage };
      }
      return (
        <View style={styles.row}>
          <View style={styles.rowText}>
            <Text style={styles.senderUser}>
              {item.user.name ? item.user.name : "You"}
            </Text>
            <Text style={styles.messageUser}>{item.text}</Text>
            <Text
              style={styles.timeUser}
            >{`${item.createdAt.getHours()}:${item.createdAt.getMinutes()}`}</Text>
          </View>
          <Image style={styles.avatar} source={imageUser} />
        </View>
      );
    } else {
      let techImage = userImage;
      if (!_.isEmpty(this.props.techImage)) {
        techImage = { uri: this.props.techImage };
      }
      return (
        <View style={styles.row}>
          <Image style={styles.avatar} source={techImage} />
          <View style={styles.rowText}>
            <Text style={styles.sender}>{item.user.name}</Text>
            <Text style={styles.message}>{item.text}</Text>
            <Text
              style={styles.time}
            >{`${item.createdAt.getHours()}:${item.createdAt.getMinutes()}`}</Text>
          </View>
        </View>
      );
    }
  }

  renderChatView() {
    if (
      _.isEmpty(this.props.techImage) &&
      !_.isEmpty(this.props.techId) &&
      this.props.supportIsBusy == false
    ) {
      this.props.getUserImage(this.props.techId);
    }

    let placeholder = Loc.getInstance().TextFor(
      "support.enterMessage",
      this.props
    );

    return (
      <View style={styles.containerChat}>
        <FlatList
          data={this.props.supportMessages}
          renderItem={this.renderItem}
          inverted
        />
        {this.renderFooter()}
        <KeyboardAvoidingView>
          <View style={styles.footer}>
            <TextInput
              autoFocus={true}
              value={this.state.userMessage}
              onChangeText={text => this.saveUserInput(text)}
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder={placeholder}
            />
            <TouchableOpacity onPress={this.onSend.bind(this)}>
              {/* <Text style={styles.send}>Send</Text> */}
              <View
                style={{
                  marginRight: 10,
                  alignSelf: "center",
                  alignItems: "center",
                  padding: 5
                }}
              >
                <Icon name="send" />
              </View>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }

  renderStateButton() {
    if (this.props.success === undefined) {
      return (
        <View>
          <AnimateLoadingButton
            ref={ref => (this.loadingButtonOk = ref)}
            width={300}
            height={50}
            title={Loc.getInstance().TextFor("common.ok", this.props)}
            titleFontSize={20}
            titleColor="rgb(255,255,255)"
            backgroundColor="#F37B20"
            borderRadius={30}
            onPress={() => this.onValidateCredentialsPress()}
          />
          <Button
            onPress={() => this.cancelPressed()}
            buttonStyles={styles.cancelButton}
            textStyle={styles.textButtonCalcel}
          >
            {Loc.getInstance().TextFor("common.cancel", this.props)}
          </Button>
        </View>
      );
    } else if (this.props.success == true) {
      setTimeout(() => {
        if (_.isEmpty(this.props.roomId)) {
          this.props.joinRoom(this.props.roomId);
        }
      }, 3000);

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
    } else if (this.props.success == false) {
      setTimeout(() => {
        this.props.resetErrorCredentials();
      }, 3000);

      return (
        <View>
          <LottieView
            style={{ width: 100, height: 100, alignSelf: "center" }}
            ref={animation => {
              this.animation = animation;
            }}
            source={require("@assets/animations/fail.json")}
            autoPlay
          />
          <BasicText
            textStyles={{
              color: "#ff2a2b",
              fontSize: 15,
              textAlign: "center",
              marginBottom: 10
            }}
            textKey="loginScreen.invalidCredentialsErrorMessage"
          />
        </View>
      );
    }
  }

  renderCredentialsModal() {
    return (
      <Modal isVisible={this.props.enterCredentials} style={styles.container}>
        <KeyboardAvoidingView behavior="position">
          <Container containerStyles={styles.modalContainer}>
            <Text style={styles.titleModal}>{Loc.getInstance().TextFor("common.teacherCredentialsModalTitle", this.props)}</Text>
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Input
                  placeholder={Loc.getInstance().TextFor(
                    "common.username",
                    this.props
                  )}
                  label={Loc.getInstance().TextFor(
                    "common.username",
                    this.props
                  )}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  placeholderTextColor="gray"
                  keyboardType="email-address"
                  onChangeText={text => this.onUsernameChangeText(text)}
                />
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                  <Input
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
                    keyboardType="email-address"
                    onChangeText={text => this.onPasswordChangeText(text)}
                  />
                </View>
                <View>
                  {this.props.credentialsError ? (
                    <BasicText style={styles.errorTextStyle}>
                      {this.props.error}
                    </BasicText>
                  ) : null}
                </View>
              </View>
              {this.renderStateButton()}
              <View />
            </View>
          </Container>
        </KeyboardAvoidingView>
      </Modal>
    );
  }

  renderMainContent() {
    return (
      <Container containerStyles={styles.dashboardContainer}>
        {this.props.waitingForTechSupport == true
          ? this.renderLoadingView()
          : this.renderChatView()}
      </Container>
    );
  }

  renderTechLeftChat() {
    if (this.props.techLeftChat == true) {
      return (
        <Alert
          titleKey="support.techLeftTitle"
          messageKey="support.techLeftMessage"
          onActionPressed={this.onTechLeftPressed}
        />
      );
    }
  }

  renderToolbarHeader() {
    if (this.state.showBack == true) {
      return <DHeader textKey="support.title" showBack />;
    } else {
      return <DHeader textKey="support.title" />;
    }
  }

  render() {
    return (
      <Background imgBackground={imgBackground}>
        {this.renderToolbarHeader()}
        <Button
          onPress={() => this.closePressed()}
          buttonStyles={styles.closeButton}
          textStyle={styles.textButtonClose}
        >
          {Loc.getInstance().TextFor("common.close", this.props)}
        </Button>
        <View style={styles.container}>
          {this.props.licenseeId === SINGLE_USER_LICENSEE ||
          this.props.waitingForTechSupport == true ||
          this.props.userInSupportSession == true
            ? this.renderMainContent()
            : this.renderCredentialsModal()}
        </View>
        {/* {this.renderTechLeftChat()} */}
      </Background>
    );
  }
}

const mapStateToProps = ({ support, app, i18n }) => {
  const {
    supportIsBusy,
    enterCredentials,
    success,
    waitingForTechSupport,
    roomId,
    techSupportIsTyping,
    messages,
    techLeftChat,
    userImage,
    userInSupportSession
  } = support;
  const { techId, techImage } = support.techUser;
  const { _id, licenseeId } = app.user;
  const { locale } = app;

  let supportMessages = _.orderBy(messages, ["createdAt"], ["desc"]);

  return {
    supportIsBusy,
    _id,
    enterCredentials,
    success,
    waitingForTechSupport,
    roomId,
    techSupportIsTyping,
    supportMessages,
    locale,
    licenseeId,
    techLeftChat,
    techId,
    techImage,
    userImage,
    userInSupportSession
  };
};

export default connect(
  mapStateToProps,
  {
    joinRoom,
    sendMessage,
    userTyping,
    checkAccess,
    resetErrorCredentials,
    resetSupport,
    userInChatRoom,
    getUserImage,
    closeButtonPressed
  }
)(SupportComponent);
