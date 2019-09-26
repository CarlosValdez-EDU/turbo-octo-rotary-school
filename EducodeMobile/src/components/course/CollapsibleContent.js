import React, { Component } from 'react';
import { withNavigation } from 'react-navigation'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, LayoutAnimation, Platform, UIManager, Image, TouchableHighlight, Alert } from 'react-native';
import right from '@assets/icons/right.png';
import left from '@assets/icons/left.png';
import { connect } from 'react-redux';
import ExpandableList from 'react-native-expandable-section-flatlist';
import { setCurrentExercise, getExerciseData, resetResponse, setSideMenuState, resetQuizStatus } from '@actions/'
import _ from 'lodash';
import {
    TRIAL_MODE, GOD_MODE
} from '@constants/AppConstants';
import isSpuClass from '@utils/SpuClassValidator';
//import Alert from "../common/Alert";
import Loc from '@components/common/Loc/Loc';
const lockIcon = require('@assets/icons/lock.png');

class CollapsibleContent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chapterOpen: -1
        };

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }

        this.openHeaderChapter = this.openHeaderProject.bind(this);
        this.renderIconHeader = this.renderIconHeader.bind(this);
        this.renderIconRow = this.renderIconRow.bind(this);
        this.renderIconLocked = this.renderIconLocked.bind(this);
        this.goToExercise = this.goToExercise.bind(this);
    }

    componentDidUpdate() {
        if (this.props.curriculumData.length > 0 && this.ExpandableListChapter && this.props.exerciseData) {
            loopCurriculumData: for (let i = 0; i < this.props.curriculumData.length; i++) {
                if (this.props.curriculumData[i].exerciseData.length > 0) {
                    for (let j = 0; j < this.props.curriculumData[i].exerciseData.length; j++) {
                        if (this.props.curriculumData[i].exerciseData[j].id == this.props.exerciseData._id) {
                            if (this.state.chapterOpen <= -1) {
                                this.ExpandableListChapter.setSectionState(i, true);
                                this.setState({ chapterOpen: i });
                                break loopCurriculumData;
                            }
                        }
                    }
                } else {
                    continue;
                }
            }
        }
    }

    expand_collapse_Function = () => {

        var CustomLayoutLinear = {
            duration: 150,
            create: {
                type: LayoutAnimation.Types.linear,
                property: LayoutAnimation.Properties.opacity,
            },
            update: {
                type: LayoutAnimation.Types.linear,
            },
        };

        LayoutAnimation.configureNext(CustomLayoutLinear);

        if (this.props.sideMenuState == false) {
            this.props.setSideMenuState(true);
        }
        else {
            this.props.setSideMenuState(false);
            this.setState({
                chapterOpen: -1
            });
        }
    }

    renderBar() {
        return (
            <View style={styles.container}>
                <View style={styles.childrenContainer}>
                    <View>
                        <TouchableOpacity style={styles.button} onPress={this.expand_collapse_Function} >
                            <Image source={right} style={styles.rightImg} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    renderIconHeader(type, completed, partial, locked) {
        switch (type) {
            case 's':
                if (completed) {
                    return <Image source={require('@assets/icons/summary-complete.png')} style={styles.headerIcon} />;
                } else if (locked) {
                    return <Image source={require('@assets/icons/summary-locked.png')} style={styles.headerIcon} />;
                }
                return <Image source={require('@assets/icons/summary.png')} style={styles.headerIcon} />;
            case 'q':
                if (completed) {
                    return <Image source={require('@assets/icons/quiz-complete.png')} style={styles.headerIcon} />;
                } else if (locked) {
                    return <Image source={require('@assets/icons/quiz-locked.png')} style={styles.headerIcon} />;
                }
                return <Image source={require('@assets/icons/quiz.png')} style={styles.headerIcon} />;
            case 'p':
                if (completed) {
                    return <Image source={require('@assets/icons/project-complete.png')} style={styles.headerIcon} />;
                } else if (partial) {
                    return <Image source={require('@assets/icons/project-partial-complete.png')} style={styles.headerIcon} />;
                } else if (locked) {
                    return <Image source={require('@assets/icons/project-locked.png')} style={styles.headerIcon} />;
                }
                return <Image source={require('@assets/icons/project.png')} style={styles.headerIcon} />;
        }
    }

    renderIconRow(category, completed, locked) {
        switch (category) {
            case 'c':
                if (completed) {
                    return <Image source={require('@assets/icons/exercise-challenge-complete.png')} style={styles.rowIcon} />;
                } else if (locked) {
                    return <Image source={require('@assets/icons/exercise-challenge-locked.png')} style={styles.rowIcon} />;
                }
                return <Image source={require('@assets/icons/exercise-challenge.png')} style={styles.rowIcon} />;
            case 'l':
                if (completed) {
                    return <Image source={require('@assets/icons/exercise-lesson-complete.png')} style={styles.rowIcon} />;
                } else if (locked) {
                    return <Image source={require('@assets/icons/exercise-lesson-locked.png')} style={styles.rowIcon} />;
                }
                return <Image source={require('@assets/icons/exercise-lesson.png')} style={styles.rowIcon} />;
            case 'p':
                if (completed) {
                    return <Image source={require('@assets/icons/exercise-practical-complete.png')} style={styles.rowIcon} />;
                } else if (locked) {
                    return <Image source={require('@assets/icons/exercise-practical-locked.png')} style={styles.rowIcon} />;
                }
                return <Image source={require('@assets/icons/exercise-practical.png')} style={styles.rowIcon} />;
        }
    }

    renderIconLocked(trialMode) {
        if (!trialMode) {
            return (
                <View style={{ opacity: 100 }} >
                    <Image source={lockIcon} style={styles.lockIcon} />
                </View>
            );
        } else {
            return (
                <View style={{ opacity: 100 }} />
            );
        }
    }

    renderAlertToGoToPurchaseSection() {
        Alert.alert(Loc.getInstance().TextFor('courses.lessonLockedTitle'), Loc.getInstance().TextFor('courses.lessonLockedText'));
    }

    _renderRowProject = (rowItem, rowId, sectionId) => {
        return (
            <TouchableOpacity onPress={() => this.goToExercise(rowItem.classId, rowItem.id, rowItem.locked, rowItem.trialMode)}>
                <View style={[{ marginLeft: 30, marginTop: 5, flexDirection: 'row', alignItems: 'center' }, rowItem.id === this.props.exerciseData._id ? { borderWidth: 2, borderColor: '#47A8A7', marginLeft: 2, marginRight: 2, paddingLeft: 26 } : null]}>
                    {this.renderIconLocked(rowItem.trialMode)}
                    {this.renderIconRow(rowItem.category, rowItem.completed, rowItem.locked)}
                    <Text style={rowItem.completed ? styles.rowTextStyleCompleted : (!rowItem.trialMode ? styles.rowTextStyleTrial : styles.rowTextStyle)}>
                        {this.props.locale === 'en-CA' ? _.get(rowItem.name, ['en-CA']) : _.get(rowItem.name, ['fr-CA'])}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    _renderSectionProject = (section, sectionId) => {
        const type = this.props.curriculumData[sectionId].type;
        const locked = this.props.curriculumData[sectionId].locked;
        const completedProject = this.props.curriculumData[sectionId].completed;
        const partialProject = this.props.curriculumData[sectionId].partial;
        const classId = this.props.curriculumData[sectionId].classId;
        const id = this.props.curriculumData[sectionId].id;
        const trialMode = this.props.curriculumData[sectionId].trialMode;

        //const trialMode = 
        const unitTrialMode = this.props.curriculumData[sectionId].trialMode;

        console.log('_renderSectionProject method ', this.props.curriculumData[sectionId]);

        if (type != 'p') {
            return (
                <TouchableOpacity onPress={() => this.goToExercise(classId, id, locked, trialMode)}>
                    <View style={styles.chapterHeaderStyle}>
                        {this.renderIconLocked(trialMode)}
                        {this.renderIconHeader(type, completedProject, partialProject, locked)}
                        <Text style={!trialMode ? styles.headerTextStyleTrial : styles.headerTextStyle}>
                            {section}
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        } else {
            return (
                <View style={styles.chapterHeaderStyle}>
                    {this.renderIconLocked(trialMode)}
                    {this.renderIconHeader(type, completedProject, partialProject, locked)}
                    <Text style={!trialMode ? styles.headerTextStyleTrial : styles.headerTextStyle}>
                        {section}
                    </Text>
                </View>
            );
        }
    };

    openHeaderProject(headerId, state) {
        if (this.state.chapterOpen <= -1 && state) {
            this.setState({ chapterOpen: headerId });
            return;
        }
        if (state) {
            this.ExpandableListChapter.setSectionState(this.state.chapterOpen, false);
            this.setState({ chapterOpen: headerId });
            return;
        }
        if (!state) {
            this.setState({ chapterOpen: -1 });
            return;
        }
    }

    async goToExercise(classId, unitId, locked, trialMode) {
        if (this.props.appMode == GOD_MODE) {
            this.setState({ chapterOpen: -1 });
            this.props.setSideMenuState(!this.props.sideMenuState);
            this.props.resetQuizStatus();
            await this.props.resetResponse();
            await this.props.setCurrentExercise(this.props.user._id, undefined, undefined, classId);
            await this.props.setCurrentExercise(this.props.user._id, this.props.curriculumId, unitId, classId);
            await this.props.getExerciseData(false, this.props.user._id, classId);

            return;
        }


        if (this.props.appMode === TRIAL_MODE) {
            let spu = isSpuClass(classId);
            if (spu) {
                if (trialMode === false) {
                    await this.props.setCurrentExercise(this.props.user._id, undefined, undefined, classId);
                    this.props.navigation.navigate('Subscription');
                } else {
                    this.setState({ chapterOpen: -1 });
                    this.props.setSideMenuState(!this.props.sideMenuState);
                    this.props.resetQuizStatus();
                    await this.props.resetResponse();
                    await this.props.setCurrentExercise(this.props.user._id, undefined, undefined, classId);
                    await this.props.setCurrentExercise(this.props.user._id, this.props.curriculumId, unitId, classId);
                    await this.props.getExerciseData(false, this.props.user._id, classId);
                }
            } else {
                this.setState({ chapterOpen: -1 });
                this.props.setSideMenuState(!this.props.sideMenuState);
                this.props.resetQuizStatus();
                await this.props.resetResponse();
                await this.props.setCurrentExercise(this.props.user._id, undefined, undefined, classId);
                await this.props.setCurrentExercise(this.props.user._id, this.props.curriculumId, unitId, classId);
                await this.props.getExerciseData(false, this.props.user._id, classId);
            }
        } else {
            debugger;
            this.setState({ chapterOpen: -1 });
            this.props.setSideMenuState(!this.props.sideMenuState);
            this.props.resetQuizStatus();
            await this.props.resetResponse();
            await this.props.setCurrentExercise(this.props.user._id, undefined, undefined, classId);
            await this.props.setCurrentExercise(this.props.user._id, this.props.curriculumId, unitId, classId);
            await this.props.getExerciseData(false, this.props.user._id, classId);
        }
    }

    renderExpanded() {
        return (
            <View style={styles.container}>
                <View style={styles.childrenContainer}>
                    <View>
                        <View style={styles.body}>
                            <ScrollView>
                                <ExpandableList
                                    ref={instance => this.ExpandableListChapter = instance}
                                    dataSource={this.props.curriculumData}
                                    headerKey="listName"
                                    memberKey="exerciseData"
                                    renderRow={this._renderRowProject}
                                    renderSectionHeaderX={this._renderSectionProject}
                                    headerOnPress={(i, state) => this.openHeaderProject(i, state)}
                                />
                            </ScrollView>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.button} onPress={this.expand_collapse_Function}>
                            <Image source={left} style={styles.rightImg} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    render() {
        var CustomLayoutLinear = {
            duration: 150,
            create: {
                type: LayoutAnimation.Types.linear,
                property: LayoutAnimation.Properties.opacity,
            },
            update: {
                type: LayoutAnimation.Types.linear,
            },
        };

        LayoutAnimation.configureNext(CustomLayoutLinear);

        if (this.props.keyboardOpen == true) {
            return (this.renderBar());
        } else {
            return (this.props.sideMenuState == false ? this.renderBar() : this.renderExpanded());
        }
    }
}

var styles = StyleSheet.create({
    container: {
        backgroundColor: '#3EBCA9',
        position: 'absolute',
        height: '100%',
        zIndex: 1
    },
    childrenContainer: {
        flexDirection: 'row',
    },
    button: {
        alignItems: 'center',
        height: '100%',
        width: 20,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    body: {
        height: '100%',
        width: 400,
        backgroundColor: 'white'
    },
    rightImg: {
        height: 35,
        width: 25,
        marginLeft: 5,
        resizeMode: 'stretch',
    },
    chapterHeaderStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    headerTextStyle: {
        fontFamily: 'Roboto-Bold',
        fontSize: 18,
    },
    headerTextStyleTrial: {
        fontFamily: 'Roboto-Bold',
        fontSize: 18,
        color: '#939393'
    },
    rowTextStyle: {
        fontSize: 16,
    },
    rowTextStyleTrial: {
        fontSize: 16,
        color: '#939393'
    },
    rowTextStyleCompleted: {
        fontSize: 16,
        color: '#3EBCA9',
    },
    headerIcon: {
        height: 28,
        width: 28,
        marginRight: 8,
        marginLeft: 8
    },
    rowIcon: {
        height: 25,
        width: 25,
        marginRight: 8,
        marginLeft: 8
    },
    lockIcon: {
        height: 20,
        width: 20,
        marginLeft: 8,
        resizeMode: "contain"
    },
    currentIcon: {
        height: 25,
        width: 25,
        marginLeft: 5
    }
});

const mapStateToProps = ({ app, dashboard, course, i18n, }) => {
    const { curriculumData, curriculumId, exerciseData, sideMenuState } = course;
    const { appMode, user } = app;
    const { userClasses, keyboardOpen } = dashboard;
    const { locale } = i18n;

    return { curriculumData, appMode, user, userClasses, curriculumId, exerciseData, sideMenuState, locale, keyboardOpen };
};

export default withNavigation(connect(mapStateToProps, {
    setCurrentExercise,
    getExerciseData,
    resetResponse,
    setSideMenuState,
    resetQuizStatus
})(CollapsibleContent));