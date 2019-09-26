import _ from "lodash";
import React, { Component } from "react";
import CodeVisualizer from "../CodeVisualizerComponent";
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  ScrollView
} from "react-native";
import HTML from "react-native-render-html";

function getBetweenText(fromString, ignoreStart, ignoreEnd) {
  var s = fromString.split(new RegExp(ignoreStart + "|" + ignoreEnd)),
    r = [];
  for (var i = 1, l = s.length; i < l; i += 2) {
    r.push(s[i]);
  }
  return r;
}

export default class AnswerRow extends Component {
  constructor(props) {
    super(props);

    this.loadStyles = this.loadStyles.bind(this);
    this.renderAnswerRow = this.renderAnswerRow.bind(this);
  }

  loadStyles() {
    let colorTagStyle;
    let backgroundColorAnswer;
    //debugger;
    if (this.props.showAnswer === true) {
      if (this.props.answer.value === 0) {
        if (this.props.isMultiple) {
          // colorTagStyle = "#ffffff";
          // backgroundColorAnswer = "#f43b3b";
          if (this.props.userAnswers) {
            let answered = undefined;
            if (this.props.userAnswers.length > 0) {
              answered = _.find(
                this.props.userAnswers,
                userAnswer => {
                  return userAnswer._id === this.props.answer._id;
                }
              );
            } else {
              answered = _.find(this.props.userAnswers, userAnswer => {
                return userAnswer._id === this.props.answer._id;
              });
            }

            if (answered) {
              colorTagStyle = "#ffffff";
              backgroundColorAnswer = "#f43b3b";
            } else {
              colorTagStyle = "#808080";
              backgroundColorAnswer = "#ffffff";
            }
          } else {
            colorTagStyle = "#808080";
            backgroundColorAnswer = "#ffffff";
          }
        } else {
          if (
            this.props.userAnswerSelected &&
            this.props.userAnswerSelected === this.props.answer._id
          ) {
            colorTagStyle = "#ffffff";
            backgroundColorAnswer = "#f43b3b";
          } else {
            colorTagStyle = "#808080";
            backgroundColorAnswer = "#ffffff";
          }
        }
      } else {
        colorTagStyle = "#ffffff";
        backgroundColorAnswer = "#0daa00";
      }
    } else {
      if (this.props.isMultiple) {
        if (this.props.userAnswers && this.props.userAnswers.length > 0) {
          const context = this;
          let answered = _.find(
            this.props.userAnswers,
            userAnswer => {
              return userAnswer._id === context.props.answer._id && userAnswer.questionId === context.props.actualQuestionId ;
            }
          );
          
          if (answered) {
            console.log(answered);
            colorTagStyle = "#ffffff";
            backgroundColorAnswer = "#ef7922";
          } else {
            colorTagStyle = "#808080";
            backgroundColorAnswer = "#ffffff";
          }
          // let quizId = _.head(this.props.userAnswers)._id;
          // if (quizId == this.props.actualQuestionId){
          //   let answered = _.find(
          //     _.head(this.props.userAnswers).answers,
          //     userAnswer => {
          //       return userAnswer._id === context.props.answer._id;
          //     }
          //   );
          //   debugger;
          //   if (answered) {
          //     console.log(answered);
          //     colorTagStyle = "#ffffff";
          //     backgroundColorAnswer = "#ef7922";
          //   } else {
          //     colorTagStyle = "#808080";
          //     backgroundColorAnswer = "#ffffff";
          //   }
          // }
          // else {
          //   colorTagStyle = "#808080";
          //   backgroundColorAnswer = "#ffffff";
          // }
        } else {
          colorTagStyle = "#808080";
          backgroundColorAnswer = "#ffffff";
        }
      } else {
        colorTagStyle = "#808080";
        backgroundColorAnswer = "#ffffff";
      }
    }

    this.tagsStyles = {
      div: {
        color: colorTagStyle
      }
    };

    this.answerStyle = {
      backgroundColor: backgroundColorAnswer
    };
  }

  renderAnswerContent() {
    let localizeContent = _.get(this.props.answer, ["answer"]);
    let content = this.props.locale === 'en-CA' ? _.get(localizeContent, ['en-CA']) : _.get(localizeContent, ['fr-CA']);
    if (content.includes("<code>")) {
      let codeText = content.replace(/\n/g, " ");
      let codesBlocks = codeText.match(/<code>(.*?)<\/code>/g);
      if (codesBlocks && content.includes("language-javascript")) {
        let code = content.replace(/<[^>]+>/g, "");
        code = code.replace(/\n/g, "ø");
        return (
          <ScrollView style={{ flex: 1, paddingLeft: 10, paddingRight: 10 }}>
            <CodeVisualizer data={code} />
          </ScrollView>
        );
      } else {
        return <HTML html={content} tagsStyles={this.tagsStyles} />;
      }
    } else {
      return <HTML html={content} tagsStyles={this.tagsStyles} />;
    }
  }

  renderAnswerRow() {
    if (this.props.showAnswer == true) {
      return (
        <View style={[styles.mainContainer, this.answerStyle]}>
          {this.renderAnswerContent()}
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() => {
            if (this.props.onAnswerPressed) {
              this.props.onAnswerPressed(this.props.answer);
            }
          }}
        >
          <View style={[styles.mainContainer, this.answerStyle]}>
            {this.renderAnswerContent()}
          </View>
        </TouchableOpacity>
      );
    }
  }

  render() {
    this.loadStyles();

    return <View>{this.renderAnswerRow()}</View>;
  }
}

const styles = {
  mainContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#ddd",
    borderBottomWidth: 2,
    elevation: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    padding: 15,
    ...Platform.select({
      ios: {
        shadowColor: "#808080",
        shadowOffset: { width: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 1
      },
      android: {
        elevation: 1
      }
    })
  },
  text: {
    fontSize: 14,
    fontFamily: "Roboto-Regular"
  }
};
