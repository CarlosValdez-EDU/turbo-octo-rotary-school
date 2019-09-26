import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  Platform
} from "react-native";
import Loc from "./Loc/Loc";
import Shimmer from "react-native-shimmer";
import backScreen from "@assets/icons/backImg.png";
import supportIcon from "@assets/icons/support.png";
import logoImg from "@assets/img/logoX2.png";
import groupImg from "@assets/icons/group.png";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { Button } from "@components/common";
import { TRIAL_MODE } from "@constants/AppConstants";

class DHeader extends Component {
  ClassType = Object.freeze({
    summary: 1,
    quiz: 2,
    project: 3,
    practical: 4,
    lesson: 5,
    challenge: 6
  });

  constructor(props) {
    super(props);

    this.renderIcon = this.renderIcon.bind(this);
    this.renderRightIcon = this.renderRightIcon.bind(this);
    this.onUpgradePress = this.onUpgradePress.bind(this);
  }

  onUpgradePress() {
    // this.props.navigation.navigate('Subscription');
    this.props.navigation.push("DrawerSubscription", {
      BACK_NAVIGATION: true
    });
  }

  onActionPress() {
    if (this.props.showBack) {
      // this.props.updateUnit();
      if (this.props.forceBack) {
        this.props.navigation.navigate("Home");
      } else {
        this.props.navigation.goBack();
      }
    } else {
      this.props.navigation.openDrawer();
    }
  }

  renderIcon() {
    if (this.props.showBack) {
      return <Image source={backScreen} style={styles.backButton} />;
    } else {
      return <Image source={groupImg} style={styles.backButton} />;
    }
  }

  renderClassTypeIcon() {
    if (this.props.classType) {
      switch (this.props.classType) {
        case this.ClassType.summary:
          return (
            <Image
              style={styles.classTypeImage}
              source={require("@assets/icons/summary_w.png")}
            />
          );
        case this.ClassType.quiz:
          return (
            <Image
              style={styles.classTypeImage}
              source={require("@assets/icons/quiz_w.png")}
            />
          );
        case this.ClassType.project:
          return (
            <Image
              style={styles.classTypeImage}
              source={require("@assets/icons/project_w.png")}
            />
          );
        case this.ClassType.practical:
          return (
            <Image
              style={styles.classTypeImage}
              source={require("@assets/icons/exercise_practical_w.png")}
            />
          );
        case this.ClassType.lesson:
          return (
            <Image
              style={styles.classTypeImage}
              source={require("@assets/icons/exercise_lesson_w.png")}
            />
          );
        case this.ClassType.challenge:
          return (
            <Image
              style={styles.classTypeImage}
              source={require("@assets/icons/exercise_challenge_w.png")}
            />
          );
        default:
          return (
            <Image
              style={styles.classTypeImage}
              source={require("@assets/icons/summary_w.png")}
            />
          );
      }
    }
  }

  renderNewMessageNotification() {
    if (this.props.techMessageCounter !== 0) {
      return (
        <View style={styles.supportNotificationContainer}>
          <Text style={styles.popText} numberOfLines={1}>
            {this.props.techMessageCounter}
          </Text>
        </View>
      );
    }
  }

  renderRightIcon() {
    if (this.props.showLetsCode) {
      if (
        this.props.userInChatScreen == false &&
        this.props.userInSupportSession == true
      ) {
        return (
          <View style={{ flexDirection: "row" }}>
            <Button
              buttonStyles={styles.buttonStart}
              textStyle={styles.textButtonStart}
              onPress={this.props.onCodePressed}
            >
              {Loc.getInstance().TextFor(
                "dashboardScreen.codeButton",
                this.props
              )}
            </Button>
            <TouchableOpacity onPress={() => this.props.onPress()}>
              <View style={styles.supportButtonContainer}>
                <Shimmer autoRun={true} opacity={0.8}>
                  <Image source={supportIcon} style={styles.supportButton} />
                </Shimmer>
                <Shimmer autoRun={true} opacity={0.8}>
                  <Text style={styles.textSupportButton}>
                    {Loc.getInstance().TextFor("support.title", this.props)}
                  </Text>
                </Shimmer>
                {this.renderNewMessageNotification()}
              </View>
            </TouchableOpacity>
          </View>
        );
      } else {
        return (
          <Button
            buttonStyles={styles.buttonStart}
            textStyle={styles.textButtonStart}
            onPress={this.props.onCodePressed}
          >
            {Loc.getInstance().TextFor(
              "dashboardScreen.codeButton",
              this.props
            )}
          </Button>
        );
      }
    } else if (this.props.showSupportButton) {
      if (
        this.props.userInChatScreen == false &&
        this.props.userInSupportSession == true
      ) {
        return (
          <TouchableOpacity onPress={() => this.props.onPress()}>
            <View style={styles.supportButtonContainer}>
              <Shimmer autoRun={true} opacity={0.8}>
                <Image source={supportIcon} style={styles.supportButton} />
              </Shimmer>
              <Shimmer autoRun={true} opacity={0.8}>
                <Text style={styles.textSupportButton}>
                  {Loc.getInstance().TextFor("support.title", this.props)}
                </Text>
              </Shimmer>
              {this.renderNewMessageNotification()}
            </View>
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity onPress={() => this.props.onPress()}>
            <View style={styles.supportButtonContainer}>
              <Image source={supportIcon} style={styles.supportButton} />
              <Text style={styles.textSupportButton}>
                {Loc.getInstance().TextFor("support.title", this.props)}
              </Text>
            </View>
          </TouchableOpacity>
        );
      }
    } else if (
      this.props.userInChatScreen == false &&
      this.props.userInSupportSession == true
    ) {
      return (
        <TouchableOpacity onPress={() => this.props.onPress()}>
          <View style={styles.supportButtonContainer}>
            <Shimmer autoRun={true} opacity={0.8}>
              <Image source={supportIcon} style={styles.supportButton} />
            </Shimmer>
            <Shimmer autoRun={true} opacity={0.8}>
              <Text style={styles.textSupportButton}>
                {Loc.getInstance().TextFor("support.title", this.props)}
              </Text>
            </Shimmer>
            {this.renderNewMessageNotification()}
          </View>
        </TouchableOpacity>
      );
    } else {
      if (this.props.appMode === TRIAL_MODE) {
        if (!this.props.hideUpgradeButton) {
          return;
        }
      } else {
        return (
          <View style={styles.supportButtonContainer}>
          </View>
        );
      }
    }
  }

  renderUpgradeButton() {
    if (this.props.appMode === TRIAL_MODE) {
      if (!this.props.hideUpgradeButton) {
        return (
          <Button
            buttonStyles={styles.buttonStart}
            textStyle={styles.textButtonStart}
            onPress={() => this.onUpgradePress()}
          >
            {Loc.getInstance().TextFor("common.upgrade", this.props)}
          </Button>
        );
      }
    }
  }

  render() {
    return (
      <View style={styles.backContainer}>
        <TouchableOpacity onPress={() => this.onActionPress()}>
          {this.renderIcon()}
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          {this.renderClassTypeIcon()}
          {this.props.textKey === "profileScreen.drawerTitle" &&
            this.props.appMode === TRIAL_MODE &&
            !this.props.hideUpgradeButton ? (
              <Text style={styles.tittleToMyAccount}>
                {this.props.unitTitle
                  ? this.props.unitTitle
                  : Loc.getInstance().TextFor(this.props.textKey, this.props)}
              </Text>
            ) : (
              <Text style={styles.titleText}>
                {this.props.unitTitle
                  ? this.props.unitTitle
                  : Loc.getInstance().TextFor(this.props.textKey, this.props)}
              </Text>
            )}
        </View>
        {this.renderUpgradeButton()}
        {this.renderRightIcon()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonStart: {
    backgroundColor: "#3EBCA9",
    borderRadius: 40,
    borderColor: "#3EBCA9",
    width: 150,
    height: 55,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    ...Platform.select({
      ios: {
        shadowColor: "#808080",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 1
      },
      android: {
        elevation: 1
      }
    })
  },
  textButtonStart: {
    textAlign: "center",
    alignSelf: "center",
    color: "white",
    fontSize: 16,
    paddingTop: 15,
    paddingBottom: 15,
    fontFamily: "Roboto-Bold"
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    marginRight: 10
  },
  textButton: {
    fontSize: 16,
    textAlign: "center",
    alignSelf: "center"
  },
  backContainer: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    marginTop: 40,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10
  },
  backButton: {
    height: 40,
    width: 40,
    marginRight: 20
  },
  supportButtonContainer: {
    width: 50,
    marginLeft: 15
  },
  supportButton: {
    height: 40,
    width: 40,
    resizeMode: "contain"
  },
  textSupportButton: {
    fontSize: 12,
    textAlign: "center",
    alignSelf: "center",
    color: "white"
  },
  classTypeImage: {
    width: 30,
    height: 30,
    resizeMode: "stretch"
  },
  titleText: {
    color: "white",
    fontSize: 30,
    marginLeft: 10,
    textAlign: "center",
    fontFamily: "Roboto-Black"
  },
  tittleToMyAccount: {
    color: "white",
    fontSize: 30,
    marginLeft: 10,
    textAlign: "center",
    fontFamily: "Roboto-Black",
    marginLeft: 130
  },
  titleLogo: {
    height: 80,
    width: 80,
    resizeMode: "stretch"
  },
  supportNotificationContainer: {
    backgroundColor: "red",
    position: "absolute",
    width: 20,
    height: 20,
    right: 35,
    top: 5,
    borderRadius: 20 / 2,
    justifyContent: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#808080",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 1
      },
      android: {
        elevation: 1
      }
    })
  },
  popText: {
    color: "white",
    fontSize: 12,
    textAlign: "center"
  }
});

const mapStateToProps = ({ i18n, app, support }) => {
  const { locale } = i18n;
  const { appMode } = app;
  const {
    userInChatScreen,
    userInSupportSession,
    techMessageCounter
  } = support;

  return {
    locale,
    appMode,
    userInChatScreen,
    userInSupportSession,
    techMessageCounter
  };
};

export default withNavigation(
  connect(
    mapStateToProps,
    {}
  )(DHeader)
);
