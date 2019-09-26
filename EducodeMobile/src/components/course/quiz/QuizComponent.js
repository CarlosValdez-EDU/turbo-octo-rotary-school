import _ from "lodash";
import React, { Component } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { connect } from "react-redux";
import * as Progress from "react-native-progress";
import { Button } from "@components/common";
import AnswerRow from "./AnswerRow";
import ExplanationRow from "./ExplanationRow";
import HTML from "react-native-render-html";
import QuizResultComponent from "./QuizResultComponent";
import owl from "@assets/img/professor.png";
import sassy from "@assets/img/sassy.png";
import happy from "@assets/img/happy.png";

import Orientation from "react-native-orientation";
import stylesPortrait from "./stylesheetPortrait";
import stylesLandscape from "./stylesheetLandscape";

import { setUnitProperty } from "@actions/";
import { resumeDownload } from "react-native-fs";

import Loc from "@components/common/Loc/Loc";

class QuizComponent extends Component {
  totalPoints = 0;
  answerData = undefined;

  constructor(props) {
    super(props);

    this.state = {
      showAnswerExplanation: false,
      actualQuestion: 0,
      questions: [],
      actualQuestionInfo: {},
      userAnswers: [],
      showAnswers: false,
      userAnswerSelected: undefined,
      showBottomButton: false,
      owlImage: owl,
      userPoints: 0,
      showResults: false,
      showUserAnswers: this.props.showUserAnswers,
      showValidateButton: false,
      showShowAnswersButton: false
    };

    const initial = Orientation.getInitialOrientation();
    if (initial === "PORTRAIT") {
      this.styles = stylesPortrait;
    } else {
      this.styles = stylesLandscape;
    }

    this.initData = this.initData.bind(this);
    this.loadQuestionData = this.loadQuestionData.bind(this);
    this.prevPressed = this.prevPressed.bind(this);
    this.nextPressed = this.nextPressed.bind(this);
    this.onAnswerPressed = this.onAnswerPressed.bind(this);
    this.renderExplanation = this.renderExplanation.bind(this);
    this.renderAnswers = this.renderAnswers.bind(this);
    this.renderMainContent = this.renderMainContent.bind(this);
    this.viewAnswersPressed = this.viewAnswersPressed.bind(this);
    this.resultsPressed = this.resultsPressed.bind(this);
    this.onValidatePressed = this.onValidatePressed.bind(this);
  }

  initData() {

    let questions = this.props.exerciseData.questions
      ? this.props.exerciseData.questions
      : [];

    //console.log('initData quizComponent ->>>', questions);


    //console.log('initData from QuizComponent -> ', questions);
    this.setState({
      questions: questions
    });
  }

  loadQuestionData() {
    let questionData = this.state.questions[this.state.actualQuestion];
    if (questionData) {
      if (questionData._id !== this.state.actualQuestionInfo._id) {
        this.setState({
          actualQuestionInfo: questionData
        });
      }
    }
  }

  componentDidMount() {
    Orientation.addOrientationListener(this._orientationDidChange);

    this.initData();
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
      console.log(`Current Device Orientation: ${orientation}`);
    });

    Orientation.removeOrientationListener(this._orientationDidChange);
  }

  resultsPressed() {
    this.setState({
      showResults: true
    });
  }

  viewAnswersPressed() {
    this.props.onViewAnswersPressed();
    this.setState({
      // showUserAnswers: true,
      // showResults: false,
      actualQuestion: 0
    });
  }

  prevPressed() {
    this.setState({
      actualQuestion: this.state.actualQuestion - 1,
      showAnswers: false,
      userAnswerSelected: undefined,
      showAnswerExplanation: false,
      owlImage: owl
    });
  }

  nextPressed() {

    console.log('BEFORE - The main State in the QUIZCOMPONENT: ----->>>>', this.state);
    this.setState({
      actualQuestion: this.state.actualQuestion + 1,
      showAnswers: false,
      userAnswerSelected: undefined,
      showBottomButton: false,
      showAnswerExplanation: false,
      owlImage: owl
    });
    console.log('AFTER - The main State in the QUIZCOMPONENT: ----->>>>', this.state);

  }

  onAnswerPressed(answer) {
    this.answerData = answer;

    let context = this;
    let showBottomButton = false;
    let showAnswers = false;
    let showAnswerExplanation = false;
    let owlImage;
    let userAnswers = _.cloneDeep(this.state.userAnswers);
    let updateUnitProperty = false;
    let showValidateButton = false;
    let showShowAnswersButton = false;

    if (this.state.actualQuestionInfo.type === "radio") {
      showBottomButton = true;
      showAnswers = true;
      showAnswerExplanation = true;
      owlImage = answer.value !== 0 ? happy : sassy;
      updateUnitProperty = true;
      userAnswers = _.concat(userAnswers, {
        ...answer,
        questionId: context.state.actualQuestionInfo._id
      });

      if (this.state.actualQuestion === this.state.questions.length - 1) {
        showShowAnswersButton = true;
      }

      this.props.setUnitProperty({
        curriculumId: this.props.curriculumId,
        property: "answers",
        questionId: this.state.actualQuestionInfo._id,
        unitId: this.props.exerciseData._id,
        value: [
          {
            value: answer.value,
            _id: answer._id
          }
        ]
      });
    } else if (this.state.actualQuestionInfo.type === "check") {
      showBottomButton = false;
      showAnswers = false;
      showAnswerExplanation = false;
      owlImage = owl;
      showValidateButton = true;
      updateUnitProperty = true;

      let currentQuestion = _.find(userAnswers, userAnswer => {
        return userAnswer._id === answer._id && userAnswer.questionId === context.state.actualQuestionInfo._id;
      });
      currentQuestion = _.cloneDeep(currentQuestion);

      if (currentQuestion) {
        let didUserAnswerThisBefore = _.find(
          userAnswers,
          userAnswer => {

            return userAnswer._id === answer._id;
          }
        );

        if (!didUserAnswerThisBefore) {
          userAnswers = _.concat(currentQuestion.answers, {
            ...answer,
            questionId: context.state.actualQuestionInfo._id
          });
        } else {
          userAnswers = _.filter(userAnswers, userAnswer => {
            return userAnswer._id !== answer._id;
          });
        }

        if (userAnswers.length === 0) {
          showValidateButton = false;
        }

      } else {
        userAnswers = _.concat(this.state.userAnswers, {
          ...answer,
          questionId: context.state.actualQuestionInfo._id
        });
      }

      let answersData = _.map(userAnswers, userAnswer => {
        if (userAnswer.questionId === context.state.actualQuestionInfo._id) {
          return {
            value: userAnswer.value,
            _id: userAnswer._id
          };
        }
      });
      answersData = _.filter(answersData, answer => { return !_.isUndefined(answer) });

      this.props.setUnitProperty({
        curriculumId: this.props.curriculumId,
        property: "answers",
        questionId: this.state.actualQuestionInfo._id,
        unitId: this.props.exerciseData._id,
        value: answersData
      });
    }

    this.setState({
      showAnswers: showAnswers,
      userAnswerSelected: answer._id,
      userAnswers: userAnswers,
      showBottomButton: showBottomButton,
      showAnswerExplanation: showAnswerExplanation,
      owlImage: owlImage,
      userPoints: answer.value,
      showValidateButton: showValidateButton,
      showShowAnswersButton: showShowAnswersButton
    });
  }

  renderPrevButton() {
    if (
      this.state.actualQuestion !== 0 &&
      this.props.exerciseData.userData &&
      this.props.exerciseData.userData.complete == true &&
      this.props.exerciseData.userData.questions
      //this.props.lastUnitData.questions
    ) {
      return (
        <Button
          buttonStyles={this.styles.previewButton}
          textStyle={this.styles.textPreviewButtons}
          onPress={() => this.prevPressed()}
        >
          {Loc.getInstance().TextFor(
            "quizScreen.previewButton",
            this.props
          )}
        </Button>
      );
    }
  }

  onValidatePressed() {
    let answersData = _.map(
      this.state.userAnswers,
      userAnswer => {
        return {
          value: userAnswer.value,
          _id: userAnswer._id
        };
      }
    );

    let owlImage = undefined;
    let userAnswerBadly = _.find(answersData, data => {
      return data.value === 0;
    });

    if (userAnswerBadly) {
      owlImage = sassy;
    } else {
      owlImage = happy;
    }

    let showAnswerExplanation = false;
    if (this.state.actualQuestion === this.state.questions.length - 1) {
      showAnswerExplanation = true;
    }

    // this.props.setUnitProperty({
    //   curriculumId: this.props.curriculumId,
    //   property: "answers",
    //   questionId: this.answerData._id,
    //   unitId: this.props.exerciseData._id,
    //   value: answersData
    // });

    this.setState({
      showBottomButton: true,
      showAnswers: true,
      showAnswerExplanation: true,
      showValidateButton: false,
      owlImage: owlImage,
      showShowAnswersButton: showAnswerExplanation
    });
  }

  renderValidateButton() {
    if (this.state.showValidateButton == true) {
      return (
        <Button
          buttonStyles={this.styles.nextButton}
          textStyle={this.styles.textNextButtons}
          onPress={() => this.onValidatePressed()}
        >
          {Loc.getInstance().TextFor(
            "quizScreen.validateButton",
            this.props
          )}
        </Button>
      );
    }
  }

  renderNextButton() {
    //debugger;
    if (
      this.state.actualQuestion !== this.state.questions.length - 1 &&
      this.state.showBottomButton === true
    ) {
      return (
        <Button
          buttonStyles={this.styles.nextButton}
          textStyle={this.styles.textNextButtons}
          onPress={() => this.nextPressed()}
        >
          {Loc.getInstance().TextFor(
            "quizScreen.nextButton",
            this.props
          )}
        </Button>
      );
    }
    else if (
      this.props.exerciseData.userData &&
      this.props.exerciseData.userData.questions &&
      //this.props.lastUnitData.questions &&
      this.state.actualQuestion <= this.props.exerciseData.userData.questions.length - 1 &&
      //this.state.actualQuestion <= this.props.lastUnitData.questions.length - 1 &&
      this.state.actualQuestion !== this.state.questions.length - 1
    ) {
      return (
        <Button
          buttonStyles={this.styles.nextButton}
          textStyle={this.styles.textNextButtons}
          onPress={() => this.nextPressed()}
        >
          {Loc.getInstance().TextFor(
            "quizScreen.nextButton",
            this.props
          )}
        </Button>
      );
    } else if (
      this.state.showShowAnswersButton == true &&
      this.state.showValidateButton == false
    ) {
      return (
        <Button
          buttonStyles={this.styles.nextButton}
          textStyle={this.styles.textNextButtons}
          onPress={() => this.resultsPressed()}
        >
          {Loc.getInstance().TextFor(
            "quizScreen.viewResultsButton",
            this.props
          )}
        </Button>
      );
    } else if (this.props.exerciseData.userData && this.state.showBottomButton === true) {
      if (this.state.actualQuestion === this.state.questions.length - 1) {
        return (
          <Button
            buttonStyles={this.styles.nextButton}
            textStyle={this.styles.textNextButtons}
            onPress={() => this.resultsPressed()}
          >
            {Loc.getInstance().TextFor(
              "quizScreen.viewResultsButton",
              this.props
            )}
          </Button>
        );
      }
    } else if (
      this.props.exerciseData.userData &&
      this.props.exerciseData.userData.questions &&
      this.props.exerciseData.userData.questions.length === this.state.questions.length
      //this.props.lastUnitData.questions.length === this.state.questions.length
    ) {
      if (this.state.actualQuestion === this.state.questions.length - 1) {
        return (
          <Button
            buttonStyles={this.styles.nextButton}
            textStyle={this.styles.textNextButtons}
            onPress={() => this.resultsPressed()}
          >
            {Loc.getInstance().TextFor(
              "quizScreen.viewResultsButton",
              this.props
            )}
          </Button>
        );
      }
    }
  }

  renderExplanation() {
    if (this.state.showAnswerExplanation == true) {
      let explanationInfo = _.find(
        this.state.actualQuestionInfo.answers,
        answer => {
          return answer.explanation;
        }
      );

      this.totalPoints += this.totalPoints + explanationInfo.value;

      return <ExplanationRow locale={this.props.locale} explanation={explanationInfo.explanation} />;
    }
  }

  renderQuestion() {
    // if (this.state.actualQuestionInfo) {
    var question = this.props.locale === 'en-CA' ? _.get(this.state.actualQuestionInfo.question, 'en-CA') : _.get(this.state.actualQuestionInfo.question, 'fr-CA');
    if (question) {
      let src = 'src\s*=\s*"([^"]+)"';
      var result = question.match(src);
      if (result && result.length > 0) {
        question = question.replace(/<img[^>]+src="([^">]+)/g, '<img src=' + '"https://dev.educode.ca' + result[1] + '');
      }

      return (
        <View style={this.styles.questionContainer}>
          <View style={this.styles.owlImageContainer}>
            <Image source={this.state.owlImage} style={this.styles.owlImage} />
          </View>
          <View style={this.styles.viewQuestion}>
            <HTML html={question} />
          </View>
        </View>
      );
    }
    // }
  }

  renderQuizProgress() {
    let progress =
      ((this.state.actualQuestion + 1) * 100) /
      this.state.questions.length /
      100;

    return (
      <View style={this.styles.progressContainer}>
        <Progress.Bar
          progress={1.0}
          width={700}
          height={20}
          progress={progress}
          color="#3EBCA9"
          borderRadius={20}
        />
      </View>
    );
  }

  renderAnswers() {
    let context = this;
    if (
      this.props.exerciseData.userData &&
      this.props.exerciseData.userData.questions &&
      //this.props.lastUnitData.questions &&
      this.state.actualQuestionInfo.answers
    ) {
      if (this.state.actualQuestionInfo.answers) {
        if (this.state.actualQuestionInfo.type === "check") {
          // TODO: Verify this info
          let context = this;

          let answersCount = _.filter(
            this.state.actualQuestionInfo.answers,
            answer => {
              if (answer.value === 1) {
                return answer;
              }
            }
          );

          let answered = undefined;
          _.forEach(
            //this.props.exerciseData.userData.questions,
            this.props.lastUnitData.questions,
            userQuestion => {
              if (userQuestion._id === context.state.actualQuestionInfo._id) {
                answered = userQuestion;
              }
              // _.forEach(
              //   context.state.actualQuestionInfo.answers,
              //   actualQuestionAnswer => {
              //     debugger;
              //     if (userQuestion._id === actualQuestionAnswer._id) {
              //       answered = userQuestion;
              //     }
              //   }
              // );
            }
          );

          if (answered) {
            // Quiz completed
            let userQuestionAnswered = this.props.exerciseData.userData
              //let userQuestionAnswered = this.props.lastUnitData
              .questions[this.state.actualQuestion];
            if (userQuestionAnswered) {
              let answersRows = _.map(
                this.state.actualQuestionInfo.answers,
                answerInfo => {
                  let userAnswer = _.find(
                    userQuestionAnswered.answers,
                    userAnswerInfo => {
                      if (userAnswerInfo) {
                        return userAnswerInfo._id === answerInfo._id;
                      }
                    }
                  );

                  if (userAnswer) {
                    return (
                      <AnswerRow
                        locale={this.props.locale}
                        isMultiple
                        userAnswers={answered.answers}
                        userAnswerSelected={userAnswer._id}
                        showAnswer={true}
                        answer={answerInfo}
                        actualQuestionId={this.state.actualQuestionInfo._id}
                      />
                    );
                  } else {
                    return (
                      <AnswerRow
                        locale={this.props.locale}
                        isMultiple
                        showAnswer={true}
                        answer={answerInfo}
                        actualQuestionId={this.state.actualQuestionInfo._id}
                      />
                    );
                  }
                }
              );
              return answersRows;
            } else {
              let answersRows = _.map(
                this.state.actualQuestionInfo.answers,
                answerInfo => {
                  return (
                    <AnswerRow
                      locale={this.props.locale}
                      isMultiple
                      onAnswerPressed={answer => this.onAnswerPressed(answer)}
                      userAnswerSelected={this.state.userAnswerSelected}
                      showAnswer={this.state.showAnswers}
                      answer={answerInfo}
                      actualQuestionId={this.state.actualQuestionInfo._id}
                    />
                  );
                }
              );

              return answersRows;
            }
          } else {
            let answersRows = _.map(
              this.state.actualQuestionInfo.answers,
              answerInfo => {
                return (
                  <AnswerRow
                    locale={this.props.locale}
                    isMultiple
                    userAnswers={this.state.userAnswers}
                    onAnswerPressed={answer => this.onAnswerPressed(answer)}
                    userAnswerSelected={this.state.userAnswerSelected}
                    showAnswer={this.state.showAnswers}
                    answer={answerInfo}
                    actualQuestionId={this.state.actualQuestionInfo._id}
                  />
                );
              }
            );
            return answersRows;
          }
        } else {
          let userQuestionAnswered = this.props.exerciseData.userData.questions[
            //let userQuestionAnswered = this.props.lastUnitData.questions[
            this.state.actualQuestion
          ];
          if (userQuestionAnswered) {
            let answersRows = _.map(
              this.state.actualQuestionInfo.answers,
              answerInfo => {
                let userAnswer = _.find(
                  userQuestionAnswered.answers,
                  userAnswerInfo => {
                    if (userAnswerInfo) {
                      return userAnswerInfo._id === answerInfo._id;
                    }
                  }
                );
                if (userAnswer) {
                  return (
                    <AnswerRow
                      locale={this.props.locale}
                      userAnswerSelected={userAnswer._id}
                      showAnswer={true}
                      answer={answerInfo}
                      actualQuestionId={this.state.actualQuestionInfo._id}
                    />
                  );
                } else {
                  return <AnswerRow locale={this.props.locale} showAnswer={true} answer={answerInfo}
                    actualQuestionId={this.state.actualQuestionInfo._id} />;
                }
              }
            );
            return answersRows;
          } else {
            // Quiz not completed
            let answersRows = _.map(
              this.state.actualQuestionInfo.answers,
              answerInfo => {
                return (
                  <AnswerRow
                    locale={this.props.locale}
                    userAnswers={this.state.userAnswers}
                    onAnswerPressed={answer => this.onAnswerPressed(answer)}
                    userAnswerSelected={this.state.userAnswerSelected}
                    showAnswer={this.state.showAnswers}
                    answer={answerInfo}
                    actualQuestionId={this.state.actualQuestionInfo._id}
                  />
                );
              }
            );
            return answersRows;
          }
        }
      } else {
        if (this.state.actualQuestionInfo.answers) {
          if (this.state.actualQuestionInfo.type === "check") {
            let answersRows = _.map(
              this.state.actualQuestionInfo.answers,
              answerInfo => {
                return (
                  <AnswerRow
                    locale={this.props.locale}
                    isMultiple
                    userAnswers={this.state.userAnswers}
                    onAnswerPressed={answer => this.onAnswerPressed(answer)}
                    userAnswerSelected={this.state.userAnswerSelected}
                    showAnswer={this.state.showAnswers}
                    answer={answerInfo}
                    actualQuestionId={this.state.actualQuestionInfo._id}
                  />
                );
              }
            );
            return answersRows;
          } else {
            let answersRows = _.map(
              this.state.actualQuestionInfo.answers,
              answerInfo => {
                return (
                  <AnswerRow
                    locale={this.props.locale}
                    onAnswerPressed={answer => this.onAnswerPressed(answer)}
                    userAnswerSelected={this.state.userAnswerSelected}
                    showAnswer={this.state.showAnswers}
                    answer={answerInfo}
                    actualQuestionId={this.state.actualQuestionInfo._id}
                  />
                );
              }
            );

            return answersRows;
          }
        }
      }
    } else {
      if (this.state.actualQuestionInfo.answers) {
        if (this.state.actualQuestionInfo.type === "check") {
          let answersRows = _.map(
            this.state.actualQuestionInfo.answers,
            answerInfo => {
              return (
                <AnswerRow
                  locale={this.props.locale}
                  isMultiple
                  userAnswers={this.state.userAnswers}
                  onAnswerPressed={answer => this.onAnswerPressed(answer)}
                  userAnswerSelected={this.state.userAnswerSelected}
                  showAnswer={this.state.showAnswers}
                  answer={answerInfo}
                  actualQuestionId={this.state.actualQuestionInfo._id}
                />
              );
            }
          );
          return answersRows;
        } else {
          let answersRows = _.map(
            this.state.actualQuestionInfo.answers,
            answerInfo => {
              return (
                <AnswerRow
                  locale={this.props.locale}
                  onAnswerPressed={answer => this.onAnswerPressed(answer)}
                  userAnswerSelected={this.state.userAnswerSelected}
                  showAnswer={this.state.showAnswers}
                  answer={answerInfo}
                  actualQuestionId={this.state.actualQuestionInfo._id}
                />
              );
            }
          );

          return answersRows;
        }
      }
    }
  }

  renderMainContent() {

    let join = [];
    // console.log('----------------- >>>  THE PROPS QUESTIONS ----------------- >>>');
    console.log('this.props.exerciseData', this.props.exerciseData);
    // console.log('----------------- <<<  THE PROPS QUESTIONS ----------------- <<<');

    _.forEach(this.props.exerciseData.questions, info => {
      //_.forEach(this.props.exerciseData.userData.questions, info => {
      //_.forEach(this.props.lastUnitData.questions, info => {
      _.forEach(info.answers, answer => {
        join = _.concat(join, answer)
      });
    });

    if (
      this.props.exerciseData.userData &&
      this.props.exerciseData.userData.complete === true &&
      this.state.showUserAnswers === false
    ) {
      return (
        <QuizResultComponent
          userQuestions={join}
          questions={this.props.exerciseData.questions}
          //questions={this.props.lastUnitData.questions}
          onViewAnswersPressed={() => this.viewAnswersPressed()}
        />
      );
    } else {
      if (this.state.showResults === true) {
        if (
          this.props.exerciseData.userData &&
          this.state.userAnswers
        ) {
          //join = join.concat(this.props.exerciseData.userData.questions, this.state.userAnswers);

          return (
            <QuizResultComponent
              updateQuizToComplete
              userQuestions={join}
              questions={this.props.exerciseData.questions}
              //questions={this.props.lastUnitData.questions}
              onViewAnswersPressed={() => this.viewAnswersPressed()}
            />
          );
        } else {
          return (
            <QuizResultComponent
              updateQuizToComplete
              userQuestions={
                this.props.exerciseData.userData
                  ? this.props.exerciseData.userData.questions
                  //? this.props.lastUnitData.questions
                  : this.state.userAnswers
              }
              questions={this.props.exerciseData.questions}
              //questions={this.props.lastUnitData.questions}
              onViewAnswersPressed={() => this.viewAnswersPressed()}
            />
          );
        }
      } else {
        return (
          <View style={this.styles.mainContainer}>
            {this.renderQuizProgress()}
            {this.renderQuestion()}
            {this.renderExplanation()}
            <View style={this.styles.viewAnswer}>
              <ScrollView>{this.renderAnswers()}</ScrollView>
            </View>
            <View style={this.styles.buttonContainer}>
              {this.renderValidateButton()}
              {this.renderPrevButton()}
              {this.renderNextButton()}
            </View>
          </View>
        );
      }
    }
  }

  render() {
    this.loadQuestionData();
    return <View>{this.renderMainContent()}</View>;
  }
}

const mapStateToProps = ({ course, app }) => {
  const { locale } = app;
  const { curriculumData, exerciseData, curriculumId, classId } = course;

  return { curriculumData, exerciseData, curriculumId, classId, locale };
};

export default connect(
  mapStateToProps,
  {
    setUnitProperty
  }
)(QuizComponent);
