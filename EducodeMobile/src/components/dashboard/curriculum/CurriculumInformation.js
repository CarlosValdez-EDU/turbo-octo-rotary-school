import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    getClassInterfaceData,
} from '@actions/';
import {
    StatusBar,
    KeyboardAvoidingView,
    View,
    ScrollView,
    Platform,
    LayoutAnimation
} from 'react-native';
import {
    Container,
    Background,
    Button,
} from '@components/common';
import DHeader from '@components/common/DHeader';
import { SearchBar } from 'react-native-elements'
import Orientation from 'react-native-orientation';
import stylesPortrait from './stylesPortrait';
import stylesLandscape from './stylesheetLandscape';
import imgBackground from '@assets/img/background_green_clean.png';
import ExpandableList from 'react-native-expandable-section-flatlist';
import DropdownContainerHeader from './DropdownContainerHeader';
import DropdownContainerFooter from './DropdownContainerFooter';
import DropdownContainerBody from './DropdownContainerBody';
import ProgressIndicator from '@components/common/ProgressIndicator';
import ListViewRow from './ListViewRow';
import { UIManager } from 'react-native';
import Loc from '@components/common/Loc/Loc';

class CurriculumInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moduleOpen: -1,
            chapterOpen: -1,
        };

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }

        const initial = Orientation.getInitialOrientation();
        if (initial === 'PORTRAIT') {
            this.styles = stylesPortrait;
        } else {
            this.styles = stylesLandscape;
        }

        this.openHeaderModule = this.openHeaderModule.bind(this);
        this.openHeaderChapter = this.openHeaderProject.bind(this);
        this.continuePressed = this.continuePressed.bind(this);
    }

    componentDidMount() {
        Orientation.addOrientationListener(this._orientationDidChange);
        console.log(this.props.user);
        let curriculumId = this.props.navigation.getParam('CURRICULUM_VIEW_CONTENT_ID', 'default');
        this.props.getClassInterfaceData(false, this.props.user._id, curriculumId);
    }

    _orientationDidChange = (orientation) => {
        if (orientation === 'LANDSCAPE') {
            this.forceUpdate();
            this.styles = stylesLandscape;
        } else {
            this.forceUpdate();
            this.styles = stylesPortrait;
        }
    }

    componentWillUnmount() {
        Orientation.getOrientation((err, orientation) => {
            console.log(`Current Device Orientation: ${orientation}`);
        });

        // Remember to remove listener
        Orientation.removeOrientationListener(this._orientationDidChange);
    }

    continuePressed() {
        this.props.navigation.navigate('Course');
    }

    onReturnPress() {
        this.props.navigation.navigate('Login')
    }

    _renderRow = (rowItem, rowId, sectionId) => {
        this.completedModuleBody = this.props.curriculumData[sectionId].completed;
        return (
            <DropdownContainerBody level={1} elevation={2} overrideStyle={{ flex: 1 }} completed={this.completedModuleBody}>
                <ExpandableList
                    ref={instance => this.ExpandableListChapter = instance}
                    dataSource={this.props.curriculumData[sectionId].projectData}
                    headerKey="name"
                    memberKey="exerciseData"
                    renderRow={this._renderRowProject}
                    renderSectionHeaderX={this._renderSectionProject}
                    headerOnPress={(i, state) => this.openHeaderProject(i, state)}
                    renderSectionFooterX={this._renderSectionProjectFooter}
                />
            </DropdownContainerBody>
        );
    };

    _renderSectionModule = (section, sectionId) => {
        this.completedModule = this.props.curriculumData[sectionId].completed;
        if (sectionId == this.state.moduleOpen) {
            this.moduleExpanded = true;
            this.elevation = 0;
            this.bodyStyle = {
                marginLeft: 0,
                marginRight: 0,
                paddingBottom: 0,
            };
            this.headerStyle = {
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
            };
        } else {
            this.moduleExpanded = false;
            this.elevation = 0;
            this.bodyStyle = {
                marginLeft: 0,
                marginRight: 0,
                paddingBottom: 10,
            };
            this.headerStyle = {
                borderBottomLeftRadius: 18,
                borderBottomRightRadius: 18,
            };
        }
        return (
            <DropdownContainerBody elevation={this.elevation} overrideStyle={this.bodyStyle}>
                <DropdownContainerHeader expanded={this.moduleExpanded} overrideStyle={this.headerStyle} level={1} completed={this.completedModule} type={false}>
                    {section}
                </DropdownContainerHeader>
            </DropdownContainerBody>
        );
    };


    _renderSectionModuleFooter = (section, sectionId) => {
        this.completedModuleFooter = this.props.curriculumData[sectionId].completed;
        if (sectionId == this.state.moduleOpen) {
            this.footerStyle = {
                marginBottom: 10,
            };
        } else {
            this.footerStyle = {
                marginBottom: 0,
            };
        }
        return (
            <DropdownContainerFooter level={1} completed={false} overrideStyle={this.footerStyle} completed={this.completedModuleFooter} />
        );
    };

    openHeaderModule(headerId, state) {
        if (this.moduleOpen <= -1 && state) {
            this.setState({ moduleOpen: headerId });
            return;
        }
        if (state) {
            this.ExpandableListModule.setSectionState(this.state.moduleOpen, false);
            this.setState({ moduleOpen: headerId, chapterOpen: -1 });
            return;
        }
        if (!state) {
            this.setState({ moduleOpen: -1, chapterOpen: -1 });
            return;
        }
    };

    _renderRowProject = (rowItem, rowId, sectionId) => {
        return (
            <DropdownContainerBody>
                <ListViewRow completed={rowItem.completed}>{rowItem.name}</ListViewRow>
            </DropdownContainerBody>
        );
    };

    _renderSectionProject = (section, sectionId) => {
        let i = 0;
        while (section != this.props.curriculumData[i].projectData[sectionId].name) {
            i++;
        }
        this.quiz = this.props.curriculumData[i].projectData[sectionId].quiz;
        this.completedProject = this.props.curriculumData[i].projectData[sectionId].completed;
        this.completedProjectBody = this.props.curriculumData[i].completed;
        if (sectionId == this.state.chapterOpen) {
            this.chapterExpanded = true;
            this.elevationChapter = 0;
            this.bodyStyleChapter = {
                marginLeft: 0,
                marginRight: 0,
                paddingBottom: 0,
            };
            this.headerStyleChapter = {
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
            };
        } else {
            this.chapterExpanded = false;
            this.elevationChapter = 0;
            this.bodyStyleChapter = {
                marginLeft: 0,
                marginRight: 0,
                paddingBottom: 10,
            };
            this.headerStyleChapter = {
                borderBottomLeftRadius: 18,
                borderBottomRightRadius: 18,
            };
        }
        return (
            <DropdownContainerBody level={1} elevation={this.elevationChapter} overrideStyle={this.bodyStyleChapter} completed={this.completedProjectBody}>
                <DropdownContainerHeader expanded={this.chapterExpanded} overrideStyle={this.headerStyleChapter} completed={this.completedProject} level={2} type={this.quiz}>
                    {section}
                </DropdownContainerHeader>
            </DropdownContainerBody>
        );
    };


    _renderSectionProjectFooter = (section, sectionId) => {
        if (sectionId == this.state.chapterOpen) {
            this.footerStyleChapter = {
                marginBottom: 10,
            };
        } else {
            this.footerStyleChapter = {
                marginBottom: 0,
            };
        }
        return (
            <DropdownContainerFooter completed={false} overrideStyle={this.footerStyleChapter} />
        );
    };

    openHeaderProject(headerId, state) {
        if (this.chapterOpen <= -1 && state) {
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

    renderMainContent() {
        if (this.props.isLoading == true) {
            return (
                <Container containerStyles={this.styles.laoderContainer}>
                    <ProgressIndicator styles={this.styles.loaderIndicatorStyle} />
                </Container>
            );
        } else {
            return (
                <Container containerStyles={this.styles.dashboardContainer}>
                    <View style={this.styles.searchContainer}>
                        <SearchBar
                            round
                            icon={{ type: 'font-awesome', name: 'search', size: 100 }}
                            placeholder={Loc.getInstance().TextFor('common.search', this.props)}
                            lightTheme
                            cancelButtonTitle='Cancel'
                            showLoading={true}
                            containerStyle={{
                                backgroundColor: 'white',
                                borderWidth: 2.0,
                                borderColor: 'lightgray',
                                borderRadius: 30
                            }}
                            inputStyle={{
                                backgroundColor: 'white',
                                fontSize: 20
                            }}
                        />
                    </View>
                    <ScrollView>
                        <ExpandableList
                            ref={instance => this.ExpandableListModule = instance}
                            dataSource={this.props.curriculumData}
                            headerKey="name"
                            memberKey="dummy"
                            renderRow={this._renderRow}
                            renderSectionHeaderX={this._renderSectionModule}
                            headerOnPress={(i, state) => this.openHeaderModule(i, state)}
                            renderSectionFooterX={this._renderSectionModuleFooter}
                        />
                    </ScrollView>
                </Container>
            );
        }
    }

    render() {
        return (
            <Background imgBackground={imgBackground} backgroudStyle={this.styles.backgroudStyle}>
                <StatusBar barStyle='light-content' />
                <DHeader textKey='detailCurriculum.title' showBack onPress={() => this.props.navigation.goBack()} />
                <KeyboardAvoidingView behavior={'padding'} style={{ flex: 1 }}>
                    <View style={this.styles.statusButtonContainer}>
                        <Button buttonStyleOverride={this.styles.statusButton} textStyleOverride={this.styles.textStatusButton} onPress={this.continuePressed}>{Loc.getInstance().TextFor('common.continue', this.props)}</Button>
                    </View>
                    <View style={this.styles.container}>
                        {this.renderMainContent()}
                    </View>
                </KeyboardAvoidingView>
            </Background>
        );
    }
}

const mapStateToProps = ({ app, curriculumInfo }) => {
    const { user, jwt, locale } = app;

    const { curriculumData, isLoading } = curriculumInfo;

    return { user, jwt, locale, curriculumData, isLoading };
};

export default connect(mapStateToProps, {
    getClassInterfaceData,
})(CurriculumInformation);