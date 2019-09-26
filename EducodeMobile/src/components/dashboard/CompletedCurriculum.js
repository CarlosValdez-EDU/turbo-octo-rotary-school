import React, { Component } from "react";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  Platform
} from "react-native";
import { Button } from "@components/common";
import Curriculum from "./Curriculum";
import * as Progress from "react-native-progress";
import Loc from "@components/common/Loc/Loc";
import { setLocale } from "react-native-redux-i18n";
import _ from "lodash";
import { TRIAL_MODE } from "@constants/AppConstants";
import { getUserClasses } from "@actions/";
import { getCurrentUser } from '@data/local/UserRepository';

class CompletedCurriculum extends Component {
  state = {
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

    this._reviewPressedAction = this._reviewPressedAction.bind(this);
    this._certificatePressed = this._certificatePressed.bind(this);
  }

  _onRefresh = () => {
    let context = this;

    context.setState({
      isFetching: true
    });

    this.props
      .getUserClasses(1, 15, this.props.curriculums, false)
      .then(() => {
        context.setState({
          isFetching: false
        });
      })
      .catch(() => {
        context.setState({
          isFetching: false
        });
      });
  };

  _certificatePressed = classInfo => {
    this.props.navigation.navigate('PdfViewer', {
      'CERTIFICATE_CLASS_INFO': classInfo
    });
  }

  _reviewPressedAction = classInfo => {
    if (this.props.appMode === TRIAL_MODE) {
      let spu = isSpuClass(classInfo._id);
      if (spu) {
        if (classInfo.trialMode === false) {
          this.props.navigation.navigate("Subscription");
        } else {
          this.props.navigation.navigate("Course", {
            CLASS_VIEW_CONTENT_ID: _.get(classInfo, ["_id"]),
            IS_CLASS_FINISHED: true
          });
        }
      } else {
        this.props.navigation.navigate("Course", {
          CLASS_VIEW_CONTENT_ID: _.get(classInfo, ["_id"]),
          IS_CLASS_FINISHED: true
        });
      }
    } else {
      this.props.navigation.navigate("Course", {
        CLASS_VIEW_CONTENT_ID: _.get(classInfo, ["_id"]),
        IS_CLASS_FINISHED: true
      });
    }
  };

  _renderStatusButton(classInfo) {
    let progress = _.get(classInfo, ["progress"]);
    if (progress === 0) {
      return (
        <Button
          buttonStyles={styles.startButtonStyle}
          textStyle={styles.textButtons}
          onPress={() => this._actionButtonPressed()}
        >
          {Loc.getInstance().TextFor("curriculumCard.startButton", this.props)}
        </Button>
      );
    } else {
      return (
        <Button
          buttonStyles={styles.statusButton}
          textStyle={styles.textButtons}
          onPress={() => this._actionButtonPressed()}
        >
          {Loc.getInstance().TextFor(
            "curriculumCard.continueButton",
            this.props
          )}
        </Button>
      );
    }
  }

  _renderTopRight = classInfo => {
    if (this.props.appMode === TRIAL_MODE) {
      let spu = isSpuClass(classInfo._id);
      if (spu) {
        if (classInfo.trialMode === false) {
          return (
            <Image
              style={{ width: 30, height: 30, resizeMode: "contain" }}
              source={require("@assets/icons/lock.png")}
            />
          );
        }
      }
    }
  };

  _renderMainContent() {
    let curriculumsToLoad = [];
    if (this.props.completedCurriculums.length !== 0){
      curriculumsToLoad = this.props.completedCurriculums;
      curriculumsToLoad = _.sortBy(curriculumsToLoad, [
        function(curr) {
          return curr.curriculum._id;
        },
      ]);
    }

    let paddingBottom = 0;
    if (Platform.OS !== "ios") {
      paddingBottom = 170;
    }

    if (this.props.searchCompletedCurriculums) {
      if (this.props.searchCompletedCurriculums.length !== 0) {
        let searchCurriculumsToLoad = this.props.searchCompletedCurriculums;
        searchCurriculumsToLoad = _.sortBy(searchCurriculumsToLoad, [
          function(curr) {
            return curr.curriculum._id;
          },
        ]);
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

  _renderItem = (item, index) => {
    let currentLocale =  getCurrentUser();
    let classInfo = _.get(item, ["item"]);

    return (
      <View>
        <Curriculum>
          <View style={styles.container}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 5
              }}
            >
              <Text style={styles.titleCurriculum}>{currentLocale.locale=== 'en-CA' ? _.get(classInfo, ['name_en-CA']) : _.get(classInfo, ['name_fr-CA'])}</Text>
              {this._renderTopRight(classInfo)}
            </View>
            <View style={styles.textContainer} />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 15,
                marginRight: 10
              }}
            >
              <Text style={styles.textProgress}>
                {classInfo.completed}/{classInfo.total} Modules{" "}
                {classInfo.progress}%
              </Text>
              {/* <Text style={styles.textProgress}>Completed on 3-06-8</Text> */}
            </View>
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <Button
                buttonStyles={styles.reviewButton}
                textStyle={styles.reviewTextButton}
                onPress={() => this._reviewPressedAction(classInfo)}
              >
                {Loc.getInstance().TextFor(
                  "curriculumCard.reviewButton",
                  this.props
                )}
              </Button>
              <Button
                buttonStyles={styles.certificateButtonStyle}
                textStyle={styles.textButtons}
                onPress={() => this._certificatePressed(classInfo)}
              >
                {Loc.getInstance().TextFor(
                  "curriculumCard.certificateButton",
                  this.props
                )}
              </Button>
            </View>
          </View>
        </Curriculum>
      </View>
    );
  };

  render() {
    return (
      <View style={{ flex: 1, width: "100%" }}>
        {this._renderMainContent()}
      </View>
    );
  }
}

const styles = {
  container: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 25,
    width: "100%"
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
    fontFamily: "Roboto-Medium",
    color: "gray"
  },
  textProgress: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: "Roboto-light",
    color: "gray"
  },
  progressBarContaienr: {
    marginBottom: 15
  },
  titleCurriculum: {
    flex: 1,
    textAlign: "left",
    fontSize: 21,
    marginBottom: 15,
    paddingRight: 10,
    fontFamily: "Roboto-Bold",
    color: "gray"
  },
  reviewButton: {
    backgroundColor: "white",
    borderRadius: 30,
    borderColor: "#3EBCA9",
    width: 159,
    borderWidth: 1,
    height: 37,
    justifyContent: "center"
  },
  reviewTextButton: {
    alignSelf: "center",
    color: "#3EBCA9",
    fontSize: 16,
    paddingTop: 5,
    paddingBottom: 5,
    fontFamily: "Roboto-Regular"
  },
  statusButton: {
    backgroundColor: "#F37B20",
    borderRadius: 30,
    borderColor: "#F37B20",
    marginLeft: 10,
    marginRight: 10,
    width: 150,
    height: 40,
    justifyContent: "center"
  },
  certificateButtonStyle: {
    backgroundColor: "#3EBCA9",
    borderRadius: 30,
    marginLeft: 10,
    width: 159,
    height: 37,
    justifyContent: "center"
  },
  textButtons: {
    alignSelf: "center",
    color: "white",
    fontSize: 16,
    paddingTop: 5,
    paddingBottom: 5,
    fontFamily: "Roboto-Medium"
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

const mapStateToProps = ({ i18n, dashboard, app }) => {
  const { locale } = i18n;
  const {
    completedCurriculums,
    searchCompletedCurriculums,
    curriculums
  } = dashboard;
  const { appMode } = app;

  return {
    locale,
    completedCurriculums,
    searchCompletedCurriculums,
    curriculums,
    appMode
  };
};

export default withNavigation(
  connect(
    mapStateToProps,
    {
      setLocale,
      getUserClasses
    }
  )(CompletedCurriculum)
);
