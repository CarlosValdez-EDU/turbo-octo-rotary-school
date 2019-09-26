import React, { Component } from "react";
import { connect } from "react-redux";
import { withNavigation } from "react-navigation";
import {
  View,
  Text,
  Image,
  FlatList,
  RefreshControl,
  Platform,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { BasicText, Button } from "@components/common";
import ProgressIndicator from "@components/common/ProgressIndicator";
import Curriculum from "./Curriculum";
import * as Progress from "react-native-progress";
import Loc from "@components/common/Loc/Loc";
import { setLocale } from "react-native-redux-i18n";
import _ from "lodash";
import { TRIAL_MODE } from "@constants/AppConstants";
import { getUserClasses } from "@actions/";
import { getCurrentUser } from '@data/local/UserRepository';
//import console = require("console");
const videoImage1 = require('../../assets/youtube/video1_thumbnail.png');
const videoImage2 = require('../../assets/youtube/video2_thumbnail.png');
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Youtube } from 'react-native-openanything';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

class ProgressCurriculum extends Component {
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

  _moreInfoPressed = classInfo => {
    this.props.navigation.navigate("MoreInfo", {
      CLASS_INFO: classInfo
    });
  };

  _actionButtonPressed = classInfo => {
    if (this.props.appMode === TRIAL_MODE) {
      let spu = isSpuClass(classInfo._id);
      if (spu) {
        if (classInfo.trialMode === false) {
          this.props.navigation.navigate("Subscription");
        } else {
          this.props.navigation.navigate("Course", {
            CLASS_VIEW_CONTENT_ID: _.get(classInfo, ["_id"])
          });
        }
      } else {
        this.props.navigation.navigate("Course", {
          CLASS_VIEW_CONTENT_ID: _.get(classInfo, ["_id"])
        });
      }
    } else {
      console.log('lastUnitID from ProgressCurriculum -> ', this.props.lastUnitId);
      this.props.navigation.navigate("Course", {
        CLASS_VIEW_CONTENT_ID: _.get(classInfo, ["_id"])
      });
    }
  };

  _renderMainContent() {
    let curriculumsToLoad = [];
    if (this.props.userClasses.length !== 0) {
      curriculumsToLoad = this.props.userClasses;
      curriculumsToLoad = _.sortBy(curriculumsToLoad, [
        function (curr) {
          return curr.curriculum._id;
        },
      ]);
    }

    let paddingBottom = 0;
    if (Platform.OS !== "ios") {
      paddingBottom = 170;
    }

    if (this.props.searchUserClasses) {
      if (this.props.searchUserClasses.length !== 0) {
        let searchCurriculumsToLoad = this.props.searchUserClasses;
        searchCurriculumsToLoad = _.sortBy(searchCurriculumsToLoad, [
          function (curr) {
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
            ListFooterComponent={this._renderFooterComponent}
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
      return this._renderLoaderList(paddingBottom, curriculumsToLoad);
    }
  }

  _renderFooterComponent = () => {
    return (
      <View style={styles.extraElementsToTheListContainer} >
        <View style={styles.extraElementsTextBannerContainer}>
          <Text style={styles.extraElementsTextBannerContent}>
            {Loc.getInstance().TextFor("dashboardScreen.extraElementsBannerText", this.props)}
          </Text>
        </View>
        <View style={styles.extraElementsVideosContainer}>
          <TouchableOpacity style={styles.extraElementsButtonContainer1} onPress={() => { Youtube('T8CEewGcQc4') }} >
            <Image source={videoImage1} style={styles.extraElementsVideoImageThumbnail} />
          </TouchableOpacity>
          <View style={styles.extraElementsHorizontalSeparator} />
          <TouchableOpacity style={styles.extraElementsButtonContainer2} onPress={() => { Youtube('hL3V9djZxbM') }} >
            <Image source={videoImage2} style={styles.extraElementsVideoImageThumbnail} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  _renderLoaderList(paddingBottom, curriculumsToLoad) {
    if (this.props.isLoading) {
      return (
        <ProgressIndicator styles={{ width: 150, height: 150, alignSelf: 'center', marginTop: 50 }} />
      );
    } else {
      return (
        <View style={{ flex: 1, width: "100%", backgroundColor: 'transparent' }}>
          <FlatList
            style={{ flex: 0.4, width: "100%", height: '90%' }}
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
            ListFooterComponent={this._renderFooterComponent()}
          />


        </View >
      );
    }
  }

  _renderStatusButton(classInfo) {
    let progress = _.get(classInfo, ["progress"]);
    let enabled = _.get(classInfo, ["enabled"]);
    if (progress === 0) {
      return (
        <Button
          buttonStyles={styles.startButtonStyle}
          textStyle={styles.textButtons}
          onPress={() => this._actionButtonPressed(classInfo)}
        >
          {Loc.getInstance().TextFor("curriculumCard.startButton", this.props)}
        </Button>
      );
    } else {
      if (enabled === false) {
        return (
          <Button
            buttonStyles={styles.startButtonDisabled}
            textStyle={styles.textButtons}
            disabled={enabled}
          >
            {Loc.getInstance().TextFor(
              "curriculumCard.continueButton",
              this.props
            )}
          </Button>
        );
      } else {
        return (
          <Button
            buttonStyles={styles.statusButton}
            textStyle={styles.textButtons}
            onPress={() => this._actionButtonPressed(classInfo)}
          >
            {Loc.getInstance().TextFor(
              "curriculumCard.continueButton",
              this.props
            )}
          </Button>
        );
      }
    }
  }

  _renderProgressBar = classInfo => {
    let progress = _.get(classInfo, ["progress"]);

    if (progress !== 0) {
      return (
        <View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.textProgress}>
              {classInfo.completed}/{classInfo.total}
            </Text>
            <BasicText textStyles={styles.textProgress} textKey="curriculumCard.exercises" />
            <Text style={styles.textProgress}>{classInfo.progress}%</Text>
          </View>
          <View style={styles.progressBarContaienr}>
            <Progress.Bar
              width={null}
              height={15}
              progress={classInfo.progress / 100}
              color="#3EBCA9"
              borderRadius={20}
            />
          </View>
        </View>
      );
    }
  };

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

  _keyExtractor = (item, index) => item._id;

  _renderItem = (item, index) => {
    let currentLocale = getCurrentUser();
    let classInfo = _.get(item, ["item"]);

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
            <Text style={styles.titleCurriculum}>{currentLocale.locale === 'en-CA' ? _.get(classInfo, ['name_en-CA']) : _.get(classInfo, ['name_fr-CA'])}</Text>
            {this._renderTopRight(classInfo)}
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              {_.get(classInfo, ["curriculum", "shortDescription", currentLocale.locale === 'en-CA' ? 'en-CA' : 'fr-CA'])}
            </Text>
          </View>
          {this._renderProgressBar(classInfo)}
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <Button
              buttonStyles={styles.infoButton}
              textStyle={styles.infoTextButton}
              onPress={() => this._moreInfoPressed(classInfo)}
            >
              {Loc.getInstance().TextFor("curriculumCard.moreInfo", this.props)}
            </Button>
            {this._renderStatusButton(classInfo)}
          </View>
        </View>
      </Curriculum>
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

  extraElementsButtonContainer1: {
    alignContent: 'flex-start'
  },

  extraElementsButtonContainer2: {
    alignContent: 'flex-end'
  },

  extraElementsHorizontalSeparator: {
    width: wp('15%'),
    height: 150
  },

  extraElementsToTheListContainer: {
    paddingTop: 35,
    flex: 0.9,
    paddingBottom: 20
  },
  extraElementsToTheListMasterContainerScrollView: {
    height: hp('5%'),
    paddingTop: 20,
    paddingBottom: 10,
    flex: 0.2,
    paddingBottom: 15
  },

  extraElementsTextBannerContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center'
  },

  extraElementsTextBannerContent: {
    flex: 1,
    fontWeight: 'bold',
    flexDirection: "row",
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: "center",
    fontSize: RFValue(15),
    color: 'white',
    paddingBottom: 10,
  },
  extraElementsVideosContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 25
  },

  extraElementsVideoImageThumbnail: {
    height: 150,
    width: 200,
    paddingHorizontal: 45
  },

  textContainer: {
    padding: 5,
    marginBottom: 10
  },

  text: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: "Roboto-Medium",
    color: "#a5a5a5"
  },
  textProgress: {
    fontSize: 14,
    marginBottom: 5,
    marginLeft: 5,
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
    paddingRight: 10,
    marginBottom: 5,
    fontFamily: "Roboto-Bold",
    color: "gray"
  },
  infoButton: {
    backgroundColor: "white",
    borderRadius: 30,
    borderColor: "#3EBCA9",
    width: 159,
    borderWidth: 1,
    height: 37,
    justifyContent: "center"
  },
  infoTextButton: {
    alignSelf: "center",
    color: "#3EBCA9",
    fontSize: 16,
    paddingTop: 5,
    paddingBottom: 5,
    fontFamily: "Roboto-Medium"
  },
  statusButton: {
    backgroundColor: "#F37B20",
    borderRadius: 30,
    marginLeft: 10,
    width: 159,
    height: 37,
    justifyContent: "center"
  },
  startButtonStyle: {
    backgroundColor: "#f5b936",
    borderRadius: 30,
    marginLeft: 10,
    marginRight: 10,
    width: 159,
    height: 37,
    justifyContent: "center"
  },
  startButtonDisabled: {
    backgroundColor: "lightgray",
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
  const { userClasses, searchUserClasses, curriculums } = dashboard;
  const { appMode } = app;

  return { locale, userClasses, searchUserClasses, curriculums, appMode };
};

export default withNavigation(
  connect(
    mapStateToProps,
    {
      setLocale,
      getUserClasses
    }
  )(ProgressCurriculum)
);
