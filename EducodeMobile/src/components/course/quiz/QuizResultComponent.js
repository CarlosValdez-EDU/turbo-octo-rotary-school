import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { Button } from '@components/common';
import * as Progress from 'react-native-progress';
import owl from '@assets/img/happyOwl.png';
import Orientation from 'react-native-orientation';
import stylesPortrait from './stylesheetPortrait';
import stylesLandscape from './stylesheetLandscape';
import { setUnitProperty } from '@actions/';

import Loc from "@components/common/Loc/Loc";

class QuizResultComponent extends Component {

    state = {
        userResults: 0,
        totalPoints: 0
    };
    constructor(props) {
        super(props);

        const initial = Orientation.getInitialOrientation();
        if (initial === 'PORTRAIT') {
            this.styles = stylesPortrait;
        } else {
            this.styles = stylesLandscape;
        }

        this.initData = this.initData.bind(this);
        this.markQuizAsComplete = this.markQuizAsComplete.bind(this);
    }

    componentDidMount() {
        Orientation.addOrientationListener(this._orientationDidChange);

        this.initData();
        if (this.props.updateQuizToComplete) {
            this.markQuizAsComplete();
        }
    }

    initData() {
        let userResults = 0;
        _.forEach(this.props.userQuestions, question => {
            userResults += question.value;
        });

        let totalPoints = 0;
        _.forEach(this.props.questions, question => {
            //_.forEach(this.props.lastUnitData.questions, question => {
            let validAnswer = _.find(question.answers, answer => {
                return answer.value > 0
            });

            totalPoints += validAnswer.value
        });

        this.setState({
            userResults: userResults,
            totalPoints: totalPoints
        });
    }

    markQuizAsComplete() {
        this.props.setUnitProperty({
            curriculumId: this.props.curriculumId,
            property: 'complete',
            unitId: this.props.exerciseData._id,
            value: true,
            _id: this.props.user._id
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
        Orientation.getOrientation((err, orientation) => {
            console.log(`Current Device Orientation: ${orientation}`);
        });

        Orientation.removeOrientationListener(this._orientationDidChange);
    }

    render() {
        return (
            <View style={this.styles.mainContainerResult}>
                <View style={this.styles.progressContainer}>
                    <Progress.Bar
                        progress={1.0}
                        width={700}
                        height={20}
                        progress={10}
                        color='#3EBCA9'
                        borderRadius={20}
                    />
                    <Text style={this.styles.textProgress}>{Loc.getInstance().TextFor('quizScreen.quizCompleted')}</Text>
                </View>
                <View style={this.styles.container}>
                    <View style={this.styles.imageContainerResult}>
                        <Image source={owl} style={this.styles.owlImageResult} />
                    </View>
                    <View style={this.styles.textContainer}>
                        <Text style={this.styles.textCongratulations}>{Loc.getInstance().TextFor('quizScreen.congratulations')}</Text>
                        <Text style={this.styles.textScored}>{Loc.getInstance().TextFor('quizScreen.youScored')}</Text>
                        <Text style={this.styles.textPoints}>{`${this.state.userResults}/${this.state.totalPoints}`}</Text>
                        <Text style={this.styles.textPoints}>{Loc.getInstance().TextFor('quizScreen.points')}</Text>
                    </View>
                </View>
                <View style={this.styles.buttonContainerResult}>
                    <Button buttonStyles={this.styles.viewButton} textStyle={this.styles.textViewButtons} onPress={() => this.props.onViewAnswersPressed()}>
                        {Loc.getInstance().TextFor(
                            "quizScreen.viewAnswers",
                            this.props
                        )}
                    </Button>
                </View>
            </View>
        );
    }
}

const mapStateToProps = ({ course, app }) => {
    const { curriculumId, exerciseData } = course;
    const { user } = app;

    return { curriculumId, exerciseData, user }
}

export default connect(mapStateToProps, {
    setUnitProperty
})(QuizResultComponent);