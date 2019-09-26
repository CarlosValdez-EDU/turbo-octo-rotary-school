/* eslint-disable no-labels */
/* eslint-disable no-sparse-arrays */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-undef */
/* eslint-disable consistent-this */
/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  StatusBar,
  View,
  Platform,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import Modal from 'react-native-modal';
import {Background, Button, Container} from '@components/common';
import Validation from '../common/Validation';
import Orientation from 'react-native-orientation';
import stylesPortrait from './stylesheetPortrait';
import stylesLandscape from './stylesheetLandscape';
import DHeader from '@components/common/DHeader';
import imgBackground from '@assets/img/background-logo.png';
import placeholderVideo from '@assets/img/placeholderImage.png';
import CollapsibleContent from './CollapsibleContent';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import ProgressIndicator from '@components/common/ProgressIndicator';
import Loc from '@components/common/Loc/Loc';
import WebViewBridge from 'react-native-webview-bridge';
const iosHtml = require('@assets/editor/ios/index.html');
const isAndroid = Platform.OS === 'android';
import TasksComponent from './TasksComponent';
import TipsComponent from './TipsComponent';
import SolutionComponent from './SolutionComponent';
import CodeInterfaceComponent from './CodeInterfaceComponent';
import Shimmer from 'react-native-shimmer';
import {
  SINGLE_USER_LICENSEE,
  QUIZ,
  VIDEO,
  TRIAL_MODE,
  VIDEO_RESOURCES_URL,
  CC_RESOURCES_URL,
} from '@constants/AppConstants';
import {
  getExerciseData,
  getCurriculumId,
  setCurrentExercise,
  resetResponse,
  hideErrorModalValidation,
  showAdToUser,
  hideAd,
  setUnitProperty,
  clearClassInterfaceData,
  getUserEventProgress,
  showNextButton,
  trialModeCountView,
  saveCurrentVideoTime,
  videoProgressEnlapsed,
  setSideMenuState,
  quizFinished,
  quizFinishedStatus,
  resetQuizStatus,
  buttonIsAnimated,
} from '@actions/';
import QuizComponent from './quiz/QuizComponent';
import VideoPlayer from '@components/video-player/';
import EducodeIcon from '@assets/img/logoX3.png';
import {TextTrackType} from 'react-native-video';
import {AdMobRewarded} from 'react-native-admob';
import isSpuClass from '@utils/SpuClassValidator';
import Alert from '../common/Alert';

const VideoRoute = () => (
  <View style={{padding: 30}}>
    <ScrollView>
      <Text>VIDE</Text>
    </ScrollView>
  </View>
);

class CourseComponent extends Component {
  TabContent = Object.freeze({
    video: 1,
    code: 2,
    tasks: 3,
    tips: 4,
    solution: 5,
  });

  countVideo = 0;
  showQuizAnswers = false;

  constructor(props) {
    super(props);

    this.animatedValue = new Animated.Value(0);

    const initial = Orientation.getInitialOrientation();
    if (initial === 'PORTRAIT') {
      this.styles = stylesPortrait;
    } else {
      this.styles = stylesLandscape;
    }

    let forceGoBack = this.props.navigation.getParam('FORCE_BACK', false);
    this.state = {
      forceGoBack: forceGoBack,
      isModalVisible: false,
      index: 0,
      testText: 'hello',
      btnSelected: 1,
      fullscreenStatus: false,
      urlToVideo: '',
      urlToSubtitles: '',
      textTracks: [],
      routes: [
        {
          key: 'video',
          title: Loc.getInstance().TextFor('codeScreen.videoTab', this.props),
        },
        {
          key: 'tasks',
          title: Loc.getInstance().TextFor('codeScreen.tasksTab', this.props),
        },
        {
          key: 'tips',
          title: Loc.getInstance().TextFor('codeScreen.tipsTab', this.props),
        },
      ],
      showAnswers: false,
      refresh: false,
    };

    this.sendValue = this.sendValue.bind(this);
    this.onSupportPress = this.onSupportPress.bind(this);
    this.onTabPressed = this.onTabPressed.bind(this);
    this.viewAnswersPressed = this.viewAnswersPressed.bind(this);
    this.goToExercise = this.goToExercise.bind(this);
    this.onCloseValidation = this.onCloseValidation.bind(this);
    this.onCloseError = this.onCloseError.bind(this);
    this.onPressReload = this.onPressReload.bind(this);
    // this.completedVideo = this.completedVideo.bind(this);
  }

  animate() {
    this.animatedValue.setValue(0);
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
    }).start(() => this.animate());
  }

  componentDidMount() {
    this.animate();
    // this.props.quizFinishedStatus(false);
    // this.props.quizFinished(false);

    // console.log('<<<<------------------------------------->>>>')
    // console.log(this.props);

    if (this.props.sideMenuState == true) {
      this.props.setSideMenuState(false);
    }

    let context = this;

    Orientation.addOrientationListener(this._orientationDidChange);
    this.curriculumId = this.props.navigation.getParam(
      'CLASS_VIEW_CONTENT_ID',
      '',
    );
    this.isClassFinished = this.props.navigation.getParam(
      'IS_CLASS_FINISHED',
      false,
    );

    if (this.curriculumId !== 'default') {
      this.props.getExerciseData(false, this.props.user._id, this.curriculumId);

      if (this.isClassFinished) {
        this.props.getCurriculumId(
          this.props.completedCurriculums,
          this.curriculumId,
        );
      } else {
        this.props.getCurriculumId(this.props.userClasses, this.curriculumId);
      }
    }
    if (this.props.appMode === TRIAL_MODE) {
      this.props.trialModeCountView(this.props.videoCount);
      let admobKey = '';
      if (Platform.OS === 'ios') {
        admobKey = 'ca-app-pub-8615904654063679/3383485709';
      } else {
        admobKey = 'ca-app-pub-8615904654063679/2431041274';
      }

      AdMobRewarded.setTestDevices([AdMobRewarded.simulatorId]);
      AdMobRewarded.setAdUnitID(admobKey);
      AdMobRewarded.addEventListener('adClosed', () => {
        context.props.hideAd();
      });
    }
  }

  _orientationDidChange = orientation => {
    if (orientation === 'LANDSCAPE') {
      this.styles = stylesLandscape;
      this.setState({
        fullscreenStatus: !this.state.fullscreenStatus,
      });
      this.forceUpdate();
    } else {
      this.styles = stylesPortrait;
      this.setState({
        fullscreenStatus: !this.state.fullscreenStatus,
      });
      this.forceUpdate();
    }
  };

  async componentWillUnmount() {
    Orientation.getOrientation((_err, orientation) => {
      console.log(`Current Device Orientation: ${orientation}`);
    });

    Orientation.removeOrientationListener(this._orientationDidChange);

    await this.props.getUserEventProgress();

    await this.props.setCurrentExercise(
      this.props.user._id,
      undefined,
      undefined,
      this.classId,
    );

    this.props.clearClassInterfaceData();
    AdMobRewarded.removeAllListeners();
  }

  viewAnswersPressed() {
    this.showQuizAnswers = true;
    this.props.getExerciseData(false, this.props.user._id, this.curriculumId);
    this.props.getCurriculumId(this.props.userClasses, this.curriculumId);
  }

  toggleModal = indexTab => {
    this.setState({isModalVisible: !this.state.isModalVisible});
    this.state.index = indexTab;
  };

  translatePressed() {
    // this.props.setLocale('fr-CA');
    console.log('sending');
    this.iosWebview.sendToBridge(
      'value:deleting character- Aœafterødeleting new line- øœafter',
    );
  }

  renderModal() {
    return (
      <Modal
        isVisible={this.state.isModalVisible}
        style={this.styles.modalMainContainer}>
        <KeyboardAvoidingView behavior="position">
          <Container containerStyles={this.styles.modalContainer}>
            <TabView
              navigationState={this.state}
              renderScene={SceneMap({
                video: VideoRoute,
                tasks: TasksRoute,
                tips: TipsRoute,
              })}
              onIndexChange={index => this.setState({index})}
              initialLayout={{width: Dimensions.get('window').width}}
              renderTabBar={props => (
                <TabBar
                  {...props}
                  indicatorStyle={{backgroundColor: 'white'}}
                  style={{
                    backgroundColor: '#047A7A',
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                  }}
                  renderIcon={this.renderIcon}
                  indicatorStyle={{backgroundColor: 'white', height: 3}}
                />
              )}
            />
            <View
              style={{
                backgroundColor: 'lightgray',
                height: 1,
                marginLeft: 30,
                marginRight: 30,
              }}
            />
            <View style={this.styles.closeButton}>
              <TouchableOpacity onPress={this.toggleModal}>
                <Text style={this.styles.closeTextButton}>
                  {Loc.getInstance().TextFor(
                    'codeScreen.closeModal',
                    this.props,
                  )}
                </Text>
              </TouchableOpacity>
            </View>
          </Container>
        </KeyboardAvoidingView>
      </Modal>
    );
  }

  onBridgeMessage(message) {
    var test = {rawString: message};
    console.log(test.rawString);
    if (test.rawString.includes('œ')) {
      let value = test.rawString.replace(/\n/g, 'ø');
      this.iosWebview.sendToBridge(`value:${value}`);
    }
  }

  sendValue() {
    if (!this.props.exerciseData) {
      return;
    }
    if (this.props.exerciseData.hasOwnProperty('userData')) {
      var code = this.props.exerciseData.userData.code.replace(/\n/g, 'ø');
      this.iosWebview.sendToBridge('value:test');
    } else {
      var code = this.props.exerciseData.boilerplate.replace(/\n/g, 'ø');
      this.iosWebview.sendToBridge(`value:${code}`);
    }
  }

  renderHtml() {
    // console.log(viewHeight);
    console.log(this.injectScript);
    if (isAndroid) {
      // return <WebView
      //     style={{ flex: 1 }}
      //     ref={androidWebview => { this.androidWebview = androidWebview; }}
      //     source={androidHtml}
      //     onLoad={this.loadHeight.bind(this)}
      // />
      return (
        <WebViewBridge
          style={{flex: 1}}
          ref={webview => {
            this.iosWebview = webview;
          }}
          onBridgeMessage={this.onBridgeMessage.bind(this)}
          source={iosHtml}
          injectedJavaScript={this.injectScript}
          bounces={false}
          onLoad={this.sendValue}
        />
      );
    } else if (!isAndroid) {
      return (
        <WebViewBridge
          style={{flex: 1}}
          ref={webview => {
            this.iosWebview = webview;
          }}
          onBridgeMessage={this.onBridgeMessage.bind(this)}
          source={iosHtml}
          injectedJavaScript={this.injectScript}
          bounces={false}
          onLoad={this.sendValue}
        />
      );
    }
  }

  onSupportPress() {
    this.props.navigation.navigate('Support', {
      SHOW_BACK_BUTTON: true,
    });
  }

  onTabPressed(tabNumber) {
    this.setState({btnSelected: tabNumber});
  }

  renderVideo() {
    if (this.props.appMode === TRIAL_MODE) {
      if (this.props.showAd == true) {
        AdMobRewarded.requestAd()
          .then(() => {
            AdMobRewarded.showAd().catch(error => console.warn(error));
          })
          .catch(error => {
            console.warn(error);
          });
      } else {
        if (
          this.props.exerciseData.videoFile === undefined &&
          this.props.videoSubtitles === undefined //&&
          // this.props.curriculumId == undefined
        ) {
          this.props.buttonIsAnimated(true);
          return (
            <View style={this.styles.placeholderContainer}>
              <View style={{alignItems: 'center'}}>
                <Text style={this.styles.placeholderMessage}>
                  {Loc.getInstance().TextFor(
                    'codeScreen.videoPlaceholder',
                    this.props,
                  )}
                </Text>
                <Image
                  source={placeholderVideo}
                  style={this.styles.imgPlaceholderVideo}
                />
                <Text style={this.styles.placeholderMessageBottom}>
                  {Loc.getInstance().TextFor(
                    'codeScreen.videoPlaceholderBottom',
                    this.props,
                  )}
                </Text>
              </View>
            </View>
          );
        } else {
          this.props.buttonIsAnimated(false);
          this.state.urlToVideo =
            VIDEO_RESOURCES_URL +
            (this.props.locale === 'en-CA'
              ? _.get(this.props.exerciseData.videoFile, ['en-CA'])
              : _.get(this.props.exerciseData.videoFile, ['fr-CA']));
          this.state.urlToSubtitles =
            CC_RESOURCES_URL +
            (this.props.locale === 'en-CA'
              ? _.get(this.props.exerciseData.videoSubtitles, ['en-CA'])
              : _.get(this.props.exerciseData.videoSubtitles, ['fr-CA']));
          this.state.textTracks = [
            {
              title: 'Subtitles',
              language: 'subtitle',
              type: TextTrackType.VTT,
              uri: this.state.urlToSubtitles,
            },
          ];
          return (
            <View
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'black',
              }}>
              <View style={this.styles.tabContentContainerVideo}>
                <VideoPlayer
                  onEnd={this.completedVideo}
                  url={this.state.urlToVideo}
                  title={
                    this.props.locale === 'en-CA'
                      ? _.get(this.props.exerciseData.name, ['en-CA'])
                      : _.get(this.props.exerciseData.name, ['fr-CA'])
                  }
                  onMorePress={() =>
                    console.log('This could be a menu, or whatever')
                  }
                  logo={EducodeIcon}
                  autoPlay={true}
                  fullscreenStatus={this.state.fullscreenStatus}
                  resizeMode="cover"
                  playWhenInactive={true}
                  captions={this.state.textTracks}
                  inlineOnly={this.state.fullscreenStatus}
                />
              </View>
            </View>
          );
        }
      }
    } else {
      if (
        this.props.exerciseData.videoFile === undefined &&
        this.props.videoSubtitles === undefined
      ) {
        this.props.buttonIsAnimated(true);
        return (
          <View style={this.styles.placeholderContainer}>
            <View style={{alignItems: 'center'}}>
              <Text style={this.styles.placeholderMessage}>
                {Loc.getInstance().TextFor(
                  'codeScreen.videoPlaceholder',
                  this.props,
                )}
              </Text>
              <Image
                source={placeholderVideo}
                style={this.styles.imgPlaceholderVideo}
              />
              <Text style={this.styles.placeholderMessageBottom}>
                {Loc.getInstance().TextFor(
                  'codeScreen.videoPlaceholderBottom',
                  this.props,
                )}
              </Text>
            </View>
          </View>
        );
      } else {
        this.state.urlToVideo =
          VIDEO_RESOURCES_URL +
          (this.props.locale === 'en-CA'
            ? _.get(this.props.exerciseData.videoFile, ['en-CA'])
            : _.get(this.props.exerciseData.videoFile, ['fr-CA']));
        this.state.urlToSubtitles =
          CC_RESOURCES_URL +
          (this.props.locale === 'en-CA'
            ? _.get(this.props.exerciseData.videoSubtitles, ['en-CA'])
            : _.get(this.props.exerciseData.videoSubtitles, ['fr-CA']));
        this.state.textTracks = [
          {
            title: 'Subtitles',
            language: 'subtitle',
            type: TextTrackType.VTT,
            uri: this.state.urlToSubtitles,
          },
        ];
        return (
          <View
            style={{width: '100%', height: '100%', backgroundColor: 'black'}}>
            <View style={this.styles.tabContentContainerVideo}>
              <VideoPlayer
                onEnd={this.completedVideo}
                url={this.state.urlToVideo}
                title={
                  this.props.locale === 'en-CA'
                    ? _.get(this.props.exerciseData.name, ['en-CA'])
                    : _.get(this.props.exerciseData.name, ['fr-CA'])
                }
                onMorePress={() =>
                  console.log('This could be a menu, or whatever')
                }
                logo={EducodeIcon}
                autoPlay={true}
                fullscreenStatus={this.state.fullscreenStatus}
                resizeMode="cover"
                playWhenInactive={true}
                captions={this.state.textTracks}
                inlineOnly={this.state.fullscreenStatus}
              />
            </View>
          </View>
        );
      }
    }
  }

  renderTabContent() {
    if (this.styles.fullscreenStatus === true) {
      this.styles.videComponent = this.styles.videComponent;
    } else {
      this.styles.videComponent = null;
    }
    switch (this.state.btnSelected) {
      case this.TabContent.video:
        return this.renderVideo();
      case this.TabContent.code:
        return <View style={this.styles.tabContentContainer} />;
      case this.TabContent.tasks:
        return (
          <View style={this.styles.tabContentContainer}>
            <TasksComponent />
          </View>
        );
      case this.TabContent.tips:
        return (
          <View style={this.styles.tabContentContainer}>
            <TipsComponent />
          </View>
        );
      default:
        return <View style={this.styles.tabContentContainer} />;
    }
  }

  renderSolutionTab() {
    if (this.props.user.licenseeId == SINGLE_USER_LICENSEE) {
      return (
        <View style={{marginRight: 0}}>
          <Button
            buttonStyles={
              this.state.btnSelected == this.TabContent.solution
                ? this.styles.tabSelected
                : this.styles.tabNotSeleted
            }
            textStyle={
              this.state.btnSelected == this.TabContent.solution
                ? this.styles.textTabSelected
                : this.styles.textTabNotSelected
            }
            onPress={() => this.onTabPressed(this.TabContent.solution)}>
            {Loc.getInstance().TextFor('codeScreen.solutionTab', this.props)}
          </Button>
        </View>
      );
    } else {
      if (this.props.user.rank === 7) {
        let spu = isSpuClass(this.props.classId);
        if (spu) {
          return (
            <View style={{marginRight: 0}}>
              <Button
                buttonStyles={
                  this.state.btnSelected == this.TabContent.solution
                    ? this.styles.tabSelected
                    : this.styles.tabNotSeleted
                }
                textStyle={
                  this.state.btnSelected == this.TabContent.solution
                    ? this.styles.textTabSelected
                    : this.styles.textTabNotSelected
                }
                onPress={() => this.onTabPressed(this.TabContent.solution)}>
                {Loc.getInstance().TextFor(
                  'codeScreen.solutionTab',
                  this.props,
                )}
              </Button>
            </View>
          );
        }
      }
    }
  }

  renderVideoTab() {
    if (
      this.props.exerciseData.videoFile !== undefined &&
      this.props.exerciseData.type !== VIDEO
    ) {
      return (
        <View style={{marginLeft: 0}}>
          <Button
            buttonStyles={
              this.state.btnSelected == this.TabContent.video
                ? this.styles.tabSelected
                : this.styles.tabNotSeleted
            }
            textStyle={
              this.state.btnSelected == this.TabContent.video
                ? this.styles.textTabSelected
                : this.styles.textTabNotSelected
            }
            onPress={() => this.setState({btnSelected: this.TabContent.video})}>
            {Loc.getInstance().TextFor('codeScreen.videoTab', this.props)}
          </Button>
        </View>
      );
    }
  }

  renderButtonCode() {
    return (
      <Button
        buttonStyles={
          this.state.btnSelected == this.TabContent.code
            ? this.styles.tabSelected
            : this.styles.tabNotSeleted
        }
        textStyle={
          this.state.btnSelected == this.TabContent.code
            ? this.styles.textTabSelected
            : this.styles.textTabNotSelected
        }
        onPress={() => this.setState({btnSelected: this.TabContent.code})}>
        {Loc.getInstance().TextFor('codeScreen.codeTab', this.props)}
      </Button>
    );
  }

  renderCodeTab() {
    const opacity = this.animatedValue.interpolate({
      inputRange: [0, 0.2, 1],
      outputRange: [0, 1, 0],
    });

    if (
      this.props.exerciseData.tasks != undefined &&
      this.props.exerciseData.tips
    ) {
      return this.props.buttonAnimated == true &&
        this.state.btnSelected == 1 ? (
        <View>
          <Animated.View
            style={{opacity, backgroundColor: 'orange', borderRadius: 30}}>
            {this.renderButtonCode()}
          </Animated.View>
        </View>
      ) : (
        this.renderButtonCode()
      );
    }
  }

  renderTasksTab() {
    if (this.props.exerciseData.tasks != undefined) {
      return (
        <View style={{marginRight: 0}}>
          <Button
            buttonStyles={
              this.state.btnSelected == this.TabContent.tasks
                ? this.styles.tabSelected
                : this.styles.tabNotSeleted
            }
            textStyle={
              this.state.btnSelected == this.TabContent.tasks
                ? this.styles.textTabSelected
                : this.styles.textTabNotSelected
            }
            onPress={() => this.onTabPressed(this.TabContent.tasks)}>
            {Loc.getInstance().TextFor('codeScreen.tasksTab', this.props)}
          </Button>
        </View>
      );
    }
  }

  renderTipsTab() {
    if (this.props.exerciseData.tips != undefined) {
      return (
        <View style={{marginRight: 0}}>
          <Button
            buttonStyles={
              this.state.btnSelected == this.TabContent.tips
                ? this.styles.tabSelected
                : this.styles.tabNotSeleted
            }
            textStyle={
              this.state.btnSelected == this.TabContent.tips
                ? this.styles.textTabSelected
                : this.styles.textTabNotSelected
            }
            onPress={() => this.onTabPressed(this.TabContent.tips)}>
            {Loc.getInstance().TextFor('codeScreen.tipsTab', this.props)}
          </Button>
        </View>
      );
    }
  }

  renderTabNavigation() {
    if (
      this.props.exerciseData.type &&
      this.props.exerciseData.type !== QUIZ &&
      this.props.exerciseData.type !== VIDEO
    ) {
      return (
        <View style={this.styles.tabContainer}>
          {this.renderVideoTab()}
          {this.renderCodeTab()}
          {this.renderTasksTab()}
          {this.renderTipsTab()}
          {/* {this.renderSolutionTab()} */}
        </View>
      );
    } else {
      return <View />;
    }
  }

  onPressReload() {
    console.log('RELOADWORKS______' + this.state.refresh);
    this.setState({refresh: !this.state.refresh});
  }

  renderBottomControls() {
    let indexCurrent = _.findIndex(this.props.originalData, {
      _id: this.props.exerciseData._id,
    });
    let nextVisible = true;
    let previousVisible = true;
    let shimmerNext = false;
    if (
      indexCurrent + 1 >= this.props.originalData.length &&
      indexCurrent !== -1
    ) {
      nextVisible = true;
      var quizCompletedData = this.props.exerciseData.userData;
      let quizCompleted = _.get(quizCompletedData, 'complete');
      if (quizCompleted == true) {
        this.props.quizFinishedStatus(true);
      }
    } else if (indexCurrent - 1 < 0) {
      previousVisible = false;
      this.props.resetQuizStatus();
    } else {
      this.props.resetQuizStatus();
    }
    if (this.props.originalData.length > 0) {
      const nextUnit = this.props.originalData[indexCurrent + 1];
      if (nextUnit) {
        let locked;
        const nexUnitId = this.props.originalData[indexCurrent + 1]._id;
        curriculumLoop: for (
          let i = 0;
          i < this.props.curriculumData.length;
          i++
        ) {
          if (this.props.originalData[indexCurrent + 1].type === 'e') {
            for (
              let j = 0;
              j < this.props.curriculumData[i].exerciseData.length;
              j++
            ) {
              if (
                this.props.curriculumData[i].exerciseData[j].id === nexUnitId
              ) {
                locked = this.props.curriculumData[i].exerciseData[j].locked;
                break curriculumLoop;
              }
            }
          } else {
            if (this.props.curriculumData[i].id === nexUnitId) {
              locked = this.props.curriculumData[i].locked;
              break curriculumLoop;
            }
          }
        }
        if (
          this.props.exerciseData.type === VIDEO &&
          this.props.videoProgress === true
        ) {
          this.markAsCompletedVideo();
          locked = false;
          shimmerNext = true;
        }

        if (this.NextShimmer) {
          shimmerNext = true;
        }

        if (locked) {
          nextVisible = false;
        }
      }
    }

    return (
      <View style={this.styles.footerConteiner}>
        {this.renderPreviousButton(previousVisible)}
        {this.renderNextButton(nextVisible, shimmerNext)}
        {this.props.quizIsFinished == true ? this.renderFinishAlert() : null}
        {/* <TouchableOpacity onPress={this.onPressReload}>
          <View style={this.styles.bottomControlContainer}>
            <Text style={this.styles.previousExercise}>
              Reload
            </Text>
          </View>
        </TouchableOpacity> */}
      </View>
    );
  }

  renderPreviousButton(visible) {
    if (visible) {
      return (
        <TouchableOpacity onPress={() => this.goBackToExercise()}>
          <View style={this.styles.bottomControlContainer}>
            <Image
              style={this.styles.imageBottomControl}
              source={require('@assets/icons/prev.png')}
            />
            <Text style={this.styles.previousExercise}>
              {Loc.getInstance().TextFor(
                'codeScreen.previousExercise',
                this.props,
              )}
            </Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return <View style={this.styles.bottomControlContainer} />;
    }
  }

  renderNextButton(visible, shimmer) {
    if (visible) {
      return (
        <TouchableOpacity onPress={() => this.goToExercise()}>
          <View style={this.styles.bottomControlContainer}>
            <Shimmer animating={shimmer}>
              <Text style={this.styles.nextExercise}>
                {Loc.getInstance().TextFor(
                  'codeScreen.nextExercise',
                  this.props,
                )}
              </Text>
            </Shimmer>
            <Image
              style={this.styles.imageBottomControl}
              source={require('@assets/icons/nxt.png')}
            />
          </View>
        </TouchableOpacity>
      );
    } else {
      return <View style={this.styles.bottomControlContainer} />;
    }
  }

  onEndVideo() {
    this.props.setUnitProperty({
      curriculumId: this.props.curriculumId,
      property: 'complete',
      unitId: this.props.exerciseData._id,
      value: true,
      userId: this.props.user._id,
    });
  }

  markAsCompletedVideo() {
    this.onEndVideo();
    if (this.props.completedVideo == true) {
      this.props.videoProgress == true ? null : this.onEndVideo();
    }
  }

  renderFinishAlert() {
    return (
      <Alert
        titleKey="quizScreen.quizAlertTittle"
        messageKey="quizScreen.quizAlertBody"
      />
    );
  }

  async goToExercise() {
    if (this.props.quizStatus == true) {
      this.props.quizFinished(true);
    }
    this.showQuizAnswers = false;
    let indexCurrent = _.findIndex(this.props.originalData, {
      _id: this.props.exerciseData._id,
    });
    if (this.props.originalData[indexCurrent + 1].type === 'p') {
      indexCurrent++;
    }
    const classId = this.props.classId;
    const unitId = this.props.originalData[indexCurrent + 1]._id;
    const trialMode = this.props.originalData[indexCurrent + 1].trialMode;
    let curriculumId = this.props.curriculumId;
    if (this.props.appMode === TRIAL_MODE) {
      this.props.trialModeCountView(this.props.videoCount);
      let spu = isSpuClass(classId);
      if (spu) {
        if (trialMode === false) {
          this.props.navigation.navigate('Subscription');
          await this.props.setCurrentExercise(
            this.props.user._id,
            undefined,
            undefined,
            classId,
          );
        } else {
          this.NextShimmer = false;
          await this.props.resetResponse();
          await this.props.setCurrentExercise(
            this.props.user._id,
            undefined,
            undefined,
            classId,
          );
          await this.props.setCurrentExercise(
            this.props.user._id,
            curriculumId,
            unitId,
            classId,
          );
          await this.props.getExerciseData(false, this.props.user._id, classId);
          if (this.props.exerciseData && this.props.exerciseData.type) {
            if (this.props.exerciseData.userData.complete === true) {
              this.onTabPressed(this.TabContent.code);
            } else {
              this.onTabPressed(this.TabContent.video);
            }
          }
        }
      } else {
        this.NextShimmer = false;
        await this.props.resetResponse();
        await this.props.setCurrentExercise(
          this.props.user._id,
          undefined,
          undefined,
          classId,
        );
        await this.props.setCurrentExercise(
          this.props.user._id,
          curriculumId,
          unitId,
          classId,
        );
        await this.props.getExerciseData(false, this.props.user._id, classId);
        if (this.props.exerciseData && this.props.exerciseData.type) {
          if (this.props.exerciseData.userData.complete === true) {
            this.onTabPressed(this.TabContent.code);
          } else {
            this.onTabPressed(this.TabContent.video);
          }
        }
      }
    } else {
      this.NextShimmer = false;
      await this.props.resetResponse();
      await this.props.setCurrentExercise(
        this.props.user._id,
        undefined,
        undefined,
        classId,
      );
      await this.props.setCurrentExercise(
        this.props.user._id,
        curriculumId,
        unitId,
        classId,
      );
      await this.props.getExerciseData(false, this.props.user._id, classId);
      if (this.props.exerciseData && this.props.exerciseData.type) {
        if (this.props.exerciseData.userData.complete === true) {
          this.onTabPressed(this.TabContent.code);
        } else {
          this.onTabPressed(this.TabContent.video);
        }
      }
    }
  }

  async goBackToExercise() {
    this.showQuizAnswers = false;
    let indexCurrent = _.findIndex(this.props.originalData, {
      _id: this.props.exerciseData._id,
    });
    if (this.props.originalData[indexCurrent - 1].type === 'p') {
      indexCurrent--;
    }
    const classId = this.props.classId;
    const unitId = this.props.originalData[indexCurrent - 1]._id;
    const trialMode = this.props.originalData[indexCurrent - 1].trialMode;
    let curriculumId = this.props.curriculumId;
    if (this.props.appMode === TRIAL_MODE) {
      this.props.trialModeCountView(this.props.videoCount);
      let spu = isSpuClass(classId);
      if (spu) {
        if (trialMode === false) {
          this.props.navigation.navigate('Subscription');
          this.props.resetQuizStatus();
          await this.props.setCurrentExercise(
            this.props.user._id,
            undefined,
            undefined,
            classId,
          );
        } else {
          this.NextShimmer = false;
          this.props.resetQuizStatus();
          await this.props.resetResponse();
          await this.props.setCurrentExercise(
            this.props.user._id,
            undefined,
            undefined,
            classId,
          );
          await this.props.setCurrentExercise(
            this.props.user._id,
            curriculumId,
            unitId,
            classId,
          );
          await this.props.getExerciseData(false, this.props.user._id, classId);
          if (this.props.exerciseData && this.props.exerciseData.type) {
            if (this.props.exerciseData.userData.complete === true) {
              this.onTabPressed(this.TabContent.code);
            } else {
              this.onTabPressed(this.TabContent.video);
            }
          }
        }
      } else {
        this.NextShimmer = false;
        this.props.resetQuizStatus();
        await this.props.resetResponse();
        await this.props.setCurrentExercise(
          this.props.user._id,
          undefined,
          undefined,
          classId,
        );
        await this.props.setCurrentExercise(
          this.props.user._id,
          curriculumId,
          unitId,
          classId,
        );
        await this.props.getExerciseData(false, this.props.user._id, classId);
        if (this.props.exerciseData && this.props.exerciseData.type) {
          if (this.props.exerciseData.userData.complete === true) {
            this.onTabPressed(this.TabContent.code);
          } else {
            this.onTabPressed(this.TabContent.video);
          }
        }
      }
    } else {
      this.NextShimmer = false;
      this.props.resetQuizStatus();
      await this.props.resetResponse();
      await this.props.setCurrentExercise(
        this.props.user._id,
        undefined,
        undefined,
        classId,
      );
      await this.props.setCurrentExercise(
        this.props.user._id,
        curriculumId,
        unitId,
        classId,
      );
      await this.props.getExerciseData(false, this.props.user._id, classId);
      if (this.props.exerciseData && this.props.exerciseData.type) {
        if (this.props.exerciseData.userData.complete === true) {
          this.onTabPressed(this.TabContent.code);
        } else {
          this.onTabPressed(this.TabContent.video);
        }
      }
    }
  }

  onErrorModalPressed = () => {
    this.props.hideErrorModalValidation();
  };

  onCloseError() {
    this.props.resetResponse();
  }

  onCloseValidation() {
    this.NextShimmer = true;
    this.props.resetResponse();
    this.props.getExerciseData(
      false,
      this.props.user._id,
      this.props.classId,
      false,
    );
  }

  renderValidationModal() {
    let visibe = false;
    let error;
    let errorContent = '';
    if (
      this.props.onValidation !== undefined &&
      this.props.onValidation.passed == true
    ) {
      error = false;
      visibe = true;
    } else {
      if (this.props.onValidation !== undefined) {
        error = true;
        visibe = true;
        errorContent = _.get(this.props.onValidation, ['reason']);
      } else if (this.props.onRunscriptError !== undefined) {
        error = true;
        visibe = true;
        errorContent = _.get(this.props.onRunscriptError, ['reason']);
      }
    }

    if (visibe) {
      return (
        <Validation
          isModalVisible={visibe}
          onContinue={this.goToExercise}
          onClose={this.onCloseValidation}
          titleKey={error ? 'codeScreen.errorTitle' : 'common.passed'}
          messageKey={'common.passedText'}
          content={errorContent}
          onActionPressed={this.onCloseError}
          error={error}
        />
      );
    }

    // if (this.props.onValidation !== undefined && this.props.onValidation.passed == true) {
    //   return (
    //     <Validation
    //       onContinue={this.goToExercise}
    //       onClose={this.onCloseValidation}
    //       titleKey={"common.passed"}
    //       messageKey={"common.passedText"}
    //     />
    //   );
    // } else {
    //   let errorContent = '';
    //   if (this.props.onValidation !== undefined) {
    //     errorContent = _.get(this.props.onValidation, ['reason']);
    //   } else if (this.props.onRunscriptError !== undefined) {
    //     errorContent = _.get(this.props.onRunscriptError, ['reason']);
    //   }

    //   return (
    //     <AlertHtml
    //       showModal={this.props.showErrorModal}
    //       titleKey={"codeScreen.errorTitle"}
    //       content={errorContent}
    //       onActionPressed={() => this.onErrorModalPressed()}
    //     />
    //   );
    // }
  }

  renderMainContent() {
    // console.log('>>>>> ---------------------------------------------------------------------- <<<<<<');
    console.log('renderMainContent is loaded ');

    // console.log(this.props.lastUnitData);

    if (this.props.exerciseData && this.props.exerciseData.type) {
      if (this.props.exerciseData.type === QUIZ) {
        //if (this.props.exerciseData.userData) {
        console.log(
          'props.exerciseData is not TO BE EVALUATED',
          this.props.exerciseData.questions,
        );
        if (this.props.exerciseData) {
          console.log(
            'props.exerciseData is not NULL',
            this.props.exerciseData.questions,
          );
          return (
            <QuizComponent
              //userQuestions={this.props.lastUnitData.questions}
              userQuestions={this.props.exerciseData.questions}
              onViewAnswersPressed={() => this.viewAnswersPressed()}
              showUserAnswers={this.showQuizAnswers}
            />
          );
        } else {
          return (
            <QuizComponent
              onViewAnswersPressed={() => this.viewAnswersPressed()}
              showUserAnswers={this.showQuizAnswers}
            />
          );
        }
      } else if (this.props.exerciseData.type === VIDEO) {
        return this.renderVideo();
      } else {
        switch (this.state.btnSelected) {
          case this.TabContent.video:
            return (
              <View
                style={[
                  this.styles.tabContentContainer,
                  {
                    position: 'absolute',
                    zIndex: 1,
                    width: '100%',
                    height: '100%',
                  },
                ]}>
                {this.renderVideo()}
              </View>
            );
          case this.TabContent.code:
            this.props.buttonIsAnimated(false);
            return <View />;
          case this.TabContent.tasks:
            return (
              <View
                style={[
                  this.styles.tabContentContainer,
                  {
                    position: 'absolute',
                    zIndex: 1,
                    width: '100%',
                    height: '100%',
                  },
                ]}>
                <TasksComponent />
              </View>
            );
          case this.TabContent.tips:
            return (
              <View
                style={[
                  this.styles.tabContentContainer,
                  {
                    position: 'absolute',
                    zIndex: 1,
                    width: '100%',
                    height: '100%',
                  },
                  ,
                ]}>
                <TipsComponent />
              </View>
            );
          default:
            return (
              <View
                style={[
                  this.styles.tabContentContainer,
                  {
                    position: 'absolute',
                    zIndex: 1,
                    width: '100%',
                    height: '100%',
                  },
                  ,
                ]}>
                <SolutionComponent />
              </View>
            );
        }
      }
    }
  }

  renderLoading() {
    if (this.props.isLoading) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <ProgressIndicator styles={{height: 150, width: 150}} />
        </View>
      );
    } else {
      return (
        <View style={{flex: 1}}>
          {this.renderTabNavigation()}
          <View style={this.styles.tabContentContainer}>
            {this.renderMainContent()}
            <View style={this.styles.tabContentContainer}>
              <CodeInterfaceComponent
                refresh={this.state.refresh}
                onContinue={this.goToExercise}
                onClose={this.onCloseValidation}
              />
              {this.renderValidationModal()}
            </View>
            <CollapsibleContent curriculumId={this.classId} />
          </View>
          {this.renderBottomControls()}
        </View>
      );
    }
  }

  render() {
    let classType;
    if (this.props.exerciseData.type) {
      switch (this.props.exerciseData.type) {
        case 's':
          classType = 1;
          break;
        case 'q':
          classType = 2;
          break;
        case 'e':
          switch (this.props.exerciseData.category) {
            case 'p':
              classType = 4;
              break;
            case 'l':
              classType = 5;
              break;
            case 'c':
              classType = 6;
              break;
          }
          break;
      }
    }

    return (
      <Background imgBackground={imgBackground}>
        <StatusBar barStyle="light-content" />
        <DHeader
          forceBack={this.state.forceGoBack}
          updateUnit={() =>
            this.props.setCurrentExercise(
              this.props.user._id,
              undefined,
              undefined,
              this.classId,
            )
          }
          unitTitle={
            this.props.locale === 'en-CA'
              ? _.get(this.props.exerciseData.name, ['en-CA'])
              : _.get(this.props.exerciseData.name, ['fr-CA'])
          }
          textKey="codeScreen.codeHeader"
          showBack
          showSupportButton
          onPress={() => this.onSupportPress()}
          classType={classType}
        />
        {this.renderLoading()}
      </Background>
    );
  }
}

const mapStateToProps = state => {
  const {locale} = state.i18n;
  const {user, appMode} = state.app;
  const {
    curriculumData,
    exerciseData,
    classId,
    isLoading,
    onRunscriptError,
    onValidation,
    originalData,
    curriculumId,
    showErrorModal,
    videoCount,
    showAd,
    videoProgress,
    completedVideo,
    sideMenuState,
    quizIsFinished,
    quizStatus,
    buttonAnimated,
  } = state.course;
  const {userClasses, completedCurriculums} = state.dashboard;

  return {
    locale,
    user,
    curriculumData,
    exerciseData,
    classId,
    isLoading,
    userClasses,
    completedCurriculums,
    onRunscriptError,
    onValidation,
    originalData,
    curriculumId,
    showErrorModal,
    videoCount,
    showAd,
    appMode,
    videoProgress,
    completedVideo,
    videoProgressEnlapsed,
    sideMenuState,
    quizIsFinished,
    quizStatus,
    buttonAnimated,
  };
};

export default connect(
  mapStateToProps,
  {
    getExerciseData,
    getCurriculumId,
    setCurrentExercise,
    resetResponse,
    hideErrorModalValidation,
    showAdToUser,
    hideAd,
    setUnitProperty,
    clearClassInterfaceData,
    getUserEventProgress,
    showNextButton,
    trialModeCountView,
    saveCurrentVideoTime,
    setSideMenuState,
    quizFinished,
    quizFinishedStatus,
    resetQuizStatus,
    buttonIsAnimated,
  },
)(CourseComponent);
