import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  Platform
} from "react-native";
import { Container, Button, BasicText } from "@components/common";
import Alert from "@components/common/Alert";
import ProgressInidicator from "@components/common/ProgressIndicator";
import Curriculum from "./Curriculum";
import Modal from "react-native-modal";
import HTML from "react-native-render-html";
import Loc from "@components/common/Loc/Loc";
import { setLocale } from "react-native-redux-i18n";
import { getAppData } from "@data/local/AppRepository";
import { TRIAL_MODE, FULL_MODE } from "@constants/AppConstants";
import { withNavigation } from "react-navigation";
import {
  enrollClass,
  resetEnrollClass,
  getUserClasses,
  getAvailableCurriculums,
  tabPressed
} from "@actions/";
import slide_star from "@assets/img/Slide_5_Star.png";
import { getCurrentUser } from '@data/local/UserRepository';
//import console = require("console");

class AvaliableCurriculum extends Component {
  state = {
    appState: undefined,
    newCount: 0,
    isFetching: false
  };

  constructor(props) {
    super(props);

    this.classesStyles = {
      "section-title": {
        fontSize: 15,
        fontFamily: "Roboto-Medium",
        color: "gray",
        margin: 0,
        padding: 0
      },
      "section-content": {
        fontSize: 15,
        fontFamily: "Roboto-Medium",
        color: "gray"
      },
      "section-image": {
        height: 50,
        width: 50
      }
    };
  }

  _onRefresh = () => {
    let context = this;
    context.setState({
      isFetching: true
    });
    this.props
      .getAvailableCurriculums()
      .then(() => {
        context.setState({
          isFetching: false
        });
      })
      .catch(error => {
        context.setState({
          isFetching: false
        });
      });
  };

  _onSuccessEnrolledAction = () => {
    if (this.props.onSuccessEnrolledAction)
      this.props.onSuccessEnrolledAction();
  };

  _onFailEnrolledAction = () => {
    this.props.resetEnrollClass();
  };

  _moreInfoPressed = classInfo => {
    this.props.navigation.navigate("MoreInfo", {
      onGoBack: () => this.refresh(),
      CLASS_INFO: classInfo
    });
  };

  refresh = async () => {
    let clms = await this.props.getAvailableCurriculums();
    await this.props.getUserClasses(1, 15, clms);
    this.props.tabPressed(1);
  }

  _enrollPressed = item => {
    if (this.props.appMode === FULL_MODE) {
      this.props.enrollClass(item._id);
    } else {
      if (item.trialMode == false) {
        this.props.navigation.navigate("Features");
      } else {
        this.props.enrollClass(item._id);
      }
    }
  };

  _renderInfoModal = () => {
    if (this.props.isLoading == true) {
      return (
        <Modal isVisible={true} style={styles.modalContainer}>
          <Container containerStyles={styles.containerLoader}>
            <ProgressInidicator styles={styles.loaderIndicatorContainer} />
          </Container>
        </Modal>
      );
    } else if (this.props.enrolledClass == false) {
      if (this.props.errorEnrollClass) {
        switch (this.props.errorEnrollClass) {
          case "userAlreadyInClass":
            return (
              <Alert
                titleKey="dashboardScreen.errorEnrollingClassTitle"
                messageKey="dashboardScreen.ErrorEnrollingClassAlreadyInClass"
                onActionPressed={() => this._onFailEnrolledAction()}
              />
            );
          default:
            return (
              <Alert
                titleKey="dashboardScreen.errorEnrollingClassTitle"
                messageKey="dashboardScreen.errorEnrollingClassMessage"
                onActionPressed={() => this._onFailEnrolledAction()}
              />
            );
        }
      }
    } else if (this.props.enrolledClass == true) {
      return (
        <Alert
          titleKey="dashboardScreen.successEnrollingClassTitle"
          messageKey="dashboardScreen.successEnrollingClassMessage"
          onActionPressed={() => this._onSuccessEnrolledAction()}
        />
      );
    }
  };

  _renderTopRight = item => {
    // debugger;
    if (item.curriculum.trialMode == true) {
      if (item.curriculum.isNew == true) {
        return (
          <Text style={styles.newCurriculumText}>
            {Loc.getInstance().TextFor("dashboardScreen.newCurriculum")}
          </Text>
        );
      }
    } else if (item.curriculum.comingSoon === true) {
      return (
        <View style={styles.comingSoonContainer}>
          <Image source={slide_star} style={styles.ticketImage} />
          <Text style={styles.comingSoonText}>
            {Loc.getInstance().TextFor("dashboardScreen.comingSoon")}
          </Text>
        </View>
      );
    } else {
      if (this.props.appMode === TRIAL_MODE) {
        return (
          <Image
            style={{ width: 30, height: 30, resizeMode: "contain" }}
            source={require("@assets/icons/lock.png")}
          />
        );
      }
    }
  };

  _renderButtons = item => {
    if (item.curriculum.comingSoon === true) {
      return (
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <Button
            buttonStyles={styles.infoButton}
            textStyle={styles.infoTextButton}
            onPress={() => this._moreInfoPressed(item)}
          >
            {Loc.getInstance().TextFor("curriculumCard.moreInfo", this.props)}
          </Button>
        </View>
      );
    } else if (this.props.appMode === TRIAL_MODE && item.curriculum.trialMode === false) {
      return (
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <Button
            buttonStyles={styles.infoButton}
            textStyle={styles.infoTextButton}
            onPress={() => this._moreInfoPressed(item)}
          >
            {Loc.getInstance().TextFor("curriculumCard.moreInfo", this.props)}
          </Button>
        </View>
      );
    } else {
      return (
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <Button
            buttonStyles={styles.infoButton}
            textStyle={styles.infoTextButton}
            onPress={() => this._moreInfoPressed(item)}
          >
            {Loc.getInstance().TextFor("curriculumCard.moreInfo", this.props)}
          </Button>
          <Button
            buttonStyles={styles.enrollButtonStyle}
            textStyle={styles.textButtons}
            onPress={() => this._enrollPressed(item)}
          >
            {Loc.getInstance().TextFor(
              "curriculumCard.enrollButton",
              this.props
            )}
          </Button>
        </View>
      );
    }
  };

  _renderMainContent() {
    let cloneCurriculums = [];
    let cloneSearchCurriculums = [];
    if (
      this.props.curriculums.length !== 0 &&
      this.props.userClasses.length !== 0
    ) {
      cloneCurriculums = _.clone(this.props.curriculums);
      for (let i = 0; i < this.props.userClasses.length; i++) {
        let current = this.props.userClasses[i]._id;
        k = _.remove(cloneCurriculums, function (curriculum) {
          return curriculum._id === current;
        });
      }
    }
    if (
      this.props.searchCurriculums &&
      this.props.searchCurriculums.length !== 0 &&
      this.props.userClasses.length !== 0
    ) {
      cloneSearchCurriculums = _.clone(this.props.searchCurriculums);
      for (let i = 0; i < this.props.userClasses.length; i++) {
        let current = this.props.userClasses[i]._id;
        k = _.remove(cloneSearchCurriculums, function (curriculum) {
          return curriculum._id === current;
        });
      }
    }
    let curriculumsToLoad = [];
    let searchCurriculumsToLoad = [];

    if (cloneCurriculums.length !== 0 || cloneSearchCurriculums.length !== 0) {
      curriculumsToLoad = cloneCurriculums;
      searchCurriculumsToLoad = cloneSearchCurriculums;
    } else {
      curriculumsToLoad = this.props.curriculums;
      searchCurriculumsToLoad = this.props.searchCurriculums;
    }

    curriculumsToLoad = _.sortBy(curriculumsToLoad, [

      function (curr) {
        //----Unlocked Curriculums----
        return !curr.curriculum.trialMode;
      },
      function (curr) {
        //----Locked Curriculums----
        return curr.curriculum.trialMode;
      },
      function (curr) {
        //----Coming Soon Curriculums----
        return curr.curriculum.comingSoon;
      },
      function (curr) {
        //----OrderedByID Curriculums----
        return curr.curriculum._id;
      },

    ]);
    searchCurriculumsToLoad = _.sortBy(searchCurriculumsToLoad, [
      function (curr) {
        return curr.curriculum.comingSoon;
      },
      function (curr) {
        return curr.curriculum._id;
      },
    ]);

    let paddingBottom = 0;
    if (Platform.OS !== "ios") {
      paddingBottom = 170;
    }

    if (this.props.searchCurriculums) {
      if (this.props.searchCurriculums.length !== 0) {
        return (
          <FlatList
            style={{ flex: 1, width: "100%" }}
            contentContainerStyle={{ paddingBottom: paddingBottom }}
            contentInset={{ bottom: 170 }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                tintColor="#fff"
                titleColor="#fff"
                refreshing={this.state.isFetching}
                onRefresh={() => this._onRefresh()}
              />
            }
            data={searchCurriculumsToLoad}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        );
      } else {
        return (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderMessage}>
              {Loc.getInstance().TextFor(
                "dashboardScreen.emptySearch",
                this.props
              )}
            </Text>
          </View>
        );
      }
    } else {
      return (
        <FlatList
          style={{ flex: 1, width: "100%" }}
          contentContainerStyle={{ paddingBottom: paddingBottom }}
          contentInset={{ bottom: 170 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              tintColor="#fff"
              titleColor="#fff"
              refreshing={this.state.isFetching}
              onRefresh={() => this._onRefresh()}
            />
          }
          data={curriculumsToLoad}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      );
    }
  }

  _keyExtractor = (item, index) => item._id;

  _renderItem = ({ item, index }) => {
    let currentLocale = getCurrentUser();
    return (
      <Curriculum>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 5
            }}
          >
            <Text style={styles.titleCurriculum}>{currentLocale.locale === 'en-CA' ? _.get(item, ['name_en-CA']) : _.get(item, ['name_fr-CA'])}</Text>
            {this._renderTopRight(item)}
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              {_.get(item, ["curriculum", "shortDescription", currentLocale.locale === 'en-CA' ? 'en-CA' : 'fr-CA'])}
            </Text>
          </View>
          {this._renderButtons(item)}
        </View>
      </Curriculum>
    );
  };

  render() {
    return (
      <View style={{ flex: 1, width: "100%" }}>
        {this._renderInfoModal()}
        {this._renderMainContent()}
      </View>
    );
  }
}

const styles = {
  container: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 25,
    width: '100%',
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerLoader: {
    height: 160,
    width: 160
  },
  loaderIndicatorContainer: {
    width: 150,
    height: 150,
    alignSelf: 'center'
  },
  textContainer: {
    padding: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'Roboto-Medium',
    color: '#a5a5a5'
  },
  textProgress: {
    fontSize: 14,
    marginBottom: 5,
    fontFamily: 'Roboto-light',
    color: 'lightgray'
  },
  progressBarContaienr: {
    marginBottom: 15
  },
  titleCurriculum: {
    flex: 1,
    textAlign: 'left',
    fontSize: 21,
    paddingRight: 10,
    marginBottom: 5,
    fontFamily: 'Roboto-Bold',
    color: 'gray'
  },
  infoButton: {
    backgroundColor: 'white',
    borderRadius: 30,
    borderColor: '#3EBCA9',
    width: 159,
    borderWidth: 1,
    height: 37,
    justifyContent: 'center'
  },
  infoTextButton: {
    alignSelf: 'center',
    color: '#3EBCA9',
    fontSize: 16,
    paddingTop: 5,
    paddingBottom: 5,
    fontFamily: 'Roboto-Medium'
  },
  statusButton: {
    backgroundColor: '#F37B20',
    borderRadius: 30,
    marginLeft: 10,
    marginRight: 10,
    width: 159,
    height: 37,
    justifyContent: 'center'
  },
  enrollButtonStyle: {
    backgroundColor: '#3EBCA9',
    borderRadius: 30,
    marginLeft: 10,
    marginRight: 10,
    width: 159,
    height: 37,
    justifyContent: 'center'
  },
  textButtons: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 16,
    paddingTop: 5,
    paddingBottom: 5,
    fontFamily: 'Roboto-Medium'
  },
  comingSoonContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    right: -5,
    top: -15,
  },
  ticketImage: {
    width: 60,
    height: 60,
    resizeMode: 'stretch',
  },
  newCurriculumText: {
    color: "#3EBCA9",
    fontSize: 15,
    fontFamily: "Roboto-Medium"
  },
  comingSoonText: {
    position: 'absolute',
    color: 'white',
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
    fontSize: 10,
    transform: [{ rotate: '-25deg' }]
  },
  placeholderContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1,
    marginBottom: 30
  },
  placeholderMessage: {
    color: "white",
    fontSize: 30,
    fontFamily: "Roboto-Medium",
    textAlign: "center"
  }
};

const mapStateToProps = ({ i18n, dashboard, availableCurriculums, app }) => {
  const { locale } = i18n;
  const { curriculums, searchCurriculums, userClasses } = dashboard;
  const { isLoading, enrolledClass, errorEnrollClass } = availableCurriculums;
  const { appMode } = app;

  return {
    locale,
    curriculums,
    searchCurriculums,
    isLoading,
    enrolledClass,
    errorEnrollClass,
    appMode,
    userClasses
  };
};

export default withNavigation(
  connect(
    mapStateToProps,
    {
      setLocale,
      enrollClass,
      resetEnrollClass,
      getUserClasses,
      getAvailableCurriculums,
      tabPressed
    }
  )(AvaliableCurriculum)
);
