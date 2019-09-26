import React, { Component } from 'react'
import {
    View,
    Image,
    SafeAreaView,
    StatusBar,
    Text,
    TouchableOpacity,
    Platform
} from 'react-native';
import NewFeaturesList from './NewFeaturesList';
import ButtonContainer from './ButtonContainer';
import { BasicText, Background, Button } from '@components/common';
import imgBackground from '@assets/img/background_green.jpg';
import Orientation from 'react-native-orientation';
import stylesPortrait from './stylessheetPortrait';
import stylesLandscape from './stylesheetLandscape';
import Loc from '@components/common/Loc/Loc';
import { setLocale } from 'react-native-redux-i18n';
import { connect } from 'react-redux';
import { getAppData, updateAppData } from '@data/local/AppRepository';
import {
    TRIAL_MODE,
    FULL_MODE
} from '@constants/AppConstants';
import {
    updateAppMode,
    registerSubscription
} from '@actions/'
import * as RNIap from 'react-native-iap';

class NewFeaturesLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };

        const initial = Orientation.getInitialOrientation();
        if (initial === 'PORTRAIT') {
            this.styles = stylesPortrait;
        } else {
            this.styles = stylesLandscape;
        }

        this.navigateToDashboard = this.navigateToDashboard.bind(this);
        this.buySubscription = this.buySubscription.bind(this);
    }

    componentDidMount() {
        Orientation.addOrientationListener(this._orientationDidChange);
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

        // Remember to remove listener
        Orientation.removeOrientationListener(this._orientationDidChange);
        RNIap.endConnection();
    }

    buySubscription(purchaceType) {
        //hardcoded userId
        this.props.registerSubscription('9e96d6fa-cb6b-4b27-8df9-4ff61a9a55e4', purchaceType);
    }

    navigateToDashboard() {
        let context = this;
        context.props.navigation.navigate('Dashboard');
        //     getAppData().then(appData => {
        //         if (appData && !appData.appMode) {
        //             appData.appMode = TRIAL_MODE;

        //             updateAppData(appData);
        //             context.props.updateAppMode(appData.appMode);
        //             context.props.navigation.navigate('Dashboard');
        //         } else {
        //             context.props.navigation.navigate('Dashboard');
        //         }
        //     }).catch(error => {
        //         debugger;
        //         context.props.navigation.navigate('Dashboard');
        //     });
    }

    render() {
        return (
            <Background imgBackground={imgBackground}>
                <StatusBar barStyle='light-content' />
                <View style={this.styles.secondContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: 70, marginRight: 70 }}>
                        <Image
                            source={require('@assets/img/logo.png')}
                            style={this.styles.imageTitle}
                        />
                        <TouchableOpacity onPress={() => this.navigateToDashboard(this)}>
                            <Image
                                source={require('@assets/icons/close.png')}
                                style={this.styles.imgClose}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={this.styles.bulletsContainer}>
                        <NewFeaturesList />
                    </View>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Button onPress={() => this.buySubscription(1)} buttonStyles={this.styles.buttonStyle} textStyle={this.styles.textButtonStyle}>{Loc.getInstance().TextFor("newFeatures.perMonth", this.props)}</Button>
                    <Button onPress={() => this.buySubscription(2)} buttonStyles={this.styles.buttonStyle} textStyle={this.styles.textButtonStyle}>{Loc.getInstance().TextFor("newFeatures.months", this.props)}</Button>
                    <Button onPress={() => this.buySubscription(3)} buttonStyles={this.styles.buttonStyle} textStyle={this.styles.textButtonStyle}>{Loc.getInstance().TextFor("newFeatures.year", this.props)}</Button>
                </View>
                <Text style={{ color: 'white', fontFamily: 'Roboto-Light', alignSelf: 'center', marginTop: 10 }}>{Loc.getInstance().TextFor("newFeatures.messageSubscription", this.props)}</Text>
                <View style={this.styles.copyrightContainer}>
                    <BasicText textStyles={this.styles.textCopyright} textKey="legal.copyright" />
                </View>
            </Background>
        );
    }
}

const mapStateToProps = ({ i18n, app }) => {
    const { locale } = i18n;
    const { appMode, user } = app;

    return { locale, appMode, user }
};

export default connect(mapStateToProps, {
    setLocale,
    updateAppMode,
    registerSubscription
})(NewFeaturesLayout);

