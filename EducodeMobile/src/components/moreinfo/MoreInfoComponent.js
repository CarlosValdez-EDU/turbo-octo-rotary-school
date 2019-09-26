import _ from 'lodash';
import React, { Component } from 'react';
import { View, StatusBar, WebView, Text, Image } from 'react-native';
import Modal from "react-native-modal";
import ProgressIndicator from '@components/common/ProgressIndicator';
import Alert from '@components/common/Alert';
import { connect } from 'react-redux';
//import { WebView } from "react-native-webview";
import DHeader from '@components/common/DHeader';
import {
    Container,
    Background,
    Button,
} from '@components/common';
import Loc from '@components/common/Loc/Loc';
import styles from './stylesheet';
import imgBackground from '@assets/img/background-logo.png';
import {
    enrollMoreInfoClass,
    resetMoreInfoEnrollClass
} from '@actions/';
import slide_star from "@assets/img/Slide_5_Star.png";
import { TRIAL_MODE, FULL_MODE } from "@constants/AppConstants";

class MoreInfoComponent extends Component {

    constructor(props) {
        super(props);

        let classInfo = this.props.navigation.getParam('CLASS_INFO', {});

        this.state = {
            classInfo: classInfo
        }

    }

    _onSuccessEnrolledAction = () => {
        this.props.resetMoreInfoEnrollClass();
        // this.props.navigation.navigate('Home');
        this.props.navigation.state.params.onGoBack();
        this.props.navigation.goBack();
    }

    _onFailEnrolledAction = () => {
        this.props.resetMoreInfoEnrollClass();
    }

    _actionButtonPressed = () => {
        if (this.state.classInfo.progress) {
            this.props.navigation.navigate('Course', {
                CLASS_VIEW_CONTENT_ID: _.get(this.state.classInfo, ['_id'])
            });
        } else {
            if (this.state.classInfo.progress === 0) {
                this.props.navigation.navigate('Course', {
                    CLASS_VIEW_CONTENT_ID: _.get(this.state.classInfo, ['_id'])
                });
            } else {
                this.props.enrollMoreInfoClass(_.get(this.state.classInfo, ['_id']));
            }
        }
    }

    _renderInfoModal = () => {
        if (this.props.isLoading == true) {
            return (
                <Modal isVisible={true} style={styles.modalContainer}>
                    <Container containerStyles={styles.containerLoader}>
                        <ProgressIndicator styles={styles.loaderIndicatorContainer} />
                    </Container>
                </Modal>
            );
        } else if (this.props.enrolledClass == false) {
            if (this.props.errorEnrollClass) {
                switch (this.props.errorEnrollClass) {
                    case 'userAlreadyInClass':
                        return (
                            <Alert titleKey='dashboardScreen.errorEnrollingClassTitle' messageKey='dashboardScreen.ErrorEnrollingClassAlreadyInClass' onActionPressed={() => this._onFailEnrolledAction()} />
                        );
                    default:
                        return (
                            <Alert titleKey='dashboardScreen.errorEnrollingClassTitle' messageKey='dashboardScreen.errorEnrollingClassMessage' onActionPressed={() => this._onFailEnrolledAction()} />
                        );
                }

            }
        } else if (this.props.enrolledClass == true) {
            return (
                <Alert titleKey='dashboardScreen.successEnrollingClassTitle' messageKey='dashboardScreen.successEnrollingClassMessage' onActionPressed={() => this._onSuccessEnrolledAction()} />
            );
        }
    }

    _renderBottomButton = () => {
        if (this.state.classInfo.progress) {
            if (this.state.classInfo.enabled == true) {
                return (
                    <Button buttonStyles={styles.statusButton} textStyle={styles.textButtons} onPress={() => this._actionButtonPressed()}>{Loc.getInstance().TextFor("curriculumCard.continueButton", this.props)}</Button>
                );
            }
        } else {
            if (this.state.classInfo.progress === 0) {
                return (
                    <Button buttonStyles={styles.startButtonStyle} textStyle={styles.textButtons} onPress={() => this._actionButtonPressed()}>{Loc.getInstance().TextFor("curriculumCard.startButton", this.props)}</Button>
                );
            } else {
                if (this.props.appMode === TRIAL_MODE && this.state.classInfo.curriculum.trialMode === true && this.state.classInfo.curriculum.comingSoon == false){
                    return (
                        <Button buttonStyles={styles.enrollButtonStyle} textStyle={styles.textButtons} onPress={() => this._actionButtonPressed()}>{Loc.getInstance().TextFor("curriculumCard.enrollButton", this.props)}</Button>
                    );
                } else if (this.props.appMode !== TRIAL_MODE && this.state.classInfo.curriculum.comingSoon == false){
                    return (
                        <Button buttonStyles={styles.enrollButtonStyle} textStyle={styles.textButtons} onPress={() => this._actionButtonPressed()}>{Loc.getInstance().TextFor("curriculumCard.enrollButton", this.props)}</Button>
                    );
                }
            }
        }
    }

    render() {
        return (
            <Background imgBackground={imgBackground}>
                <StatusBar barStyle='light-content' />
                <DHeader textKey="moreInfo.title" showBack />
                <View style={styles.container}>
                    <Container containerStyles={styles.contentContainer}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={styles.titleText}>{this.props.locale === 'en-CA' ? _.get(this.state.classInfo, ['name_en-CA']) : _.get(this.state.classInfo, ['name_fr-CA'])}</Text>
                            {(this.state.classInfo.curriculum.comingSoon == true) ?
                                <View style={styles.comingSoonContainer}>
                                    <Image source={slide_star} style={styles.ticketImage} />
                                    <Text style={styles.comingSoonText}>{Loc.getInstance().TextFor('dashboardScreen.comingSoon')}</Text>
                                </View> : null}
                        </View>
                        <Text style={styles.descriptionText}>{_.get(this.state.classInfo, ["curriculum", "longDescription", this.props.locale === 'en-CA' ? 'en-CA' : 'fr-CA'])}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            {this._renderBottomButton()}
                        </View>
                    </Container>
                </View>
                {this._renderInfoModal()}
            </Background>
        );
    }
}

const mapStateToProps = ({ moreInfo, i18n, app }) => {
    const { locale } = i18n;
    const { isLoading, enrolledClass, errorEnrollClass } = moreInfo;
    const { appMode } = app;

    return { isLoading, enrolledClass, errorEnrollClass, locale, appMode }
}

export default connect(mapStateToProps, {
    enrollMoreInfoClass,
    resetMoreInfoEnrollClass
})(MoreInfoComponent);