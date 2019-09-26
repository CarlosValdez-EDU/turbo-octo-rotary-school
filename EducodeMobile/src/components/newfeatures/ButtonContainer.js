import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Platform
} from 'react-native';
import { withNavigation } from 'react-navigation';
import Orientation from 'react-native-orientation';
import stylesPortrait from './stylessheetPortrait';
import stylesLandscape from './stylesheetLandscape';
import Loc from '@components/common/Loc/Loc';
import { setLocale } from 'react-native-redux-i18n';
import { connect } from 'react-redux';
import I18n from '@assets/i18n';

class ButtonContainer extends Component {

    constructor(props) {
        super(props);

        const initial = Orientation.getInitialOrientation();
        if (initial === 'PORTRAIT') {
            this.styles = stylesPortrait;
        } else {
            this.styles = stylesLandscape;
        }
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
    }

    baseList = [
        { title: Loc.getInstance().TextFor("newFeatures.button15DaysFreeText", this.props) },
        { title: Loc.getInstance().TextFor("newFeatures.extraButtonText", this.props) },
        { title: Loc.getInstance().TextFor("newFeatures.buttonSkipText", this.props) }
    ];

    render() {
        return (
            <View style={this.styles.container}>
                <TouchableOpacity
                    onPress={() => this.props.onPressDashboard()}
                    style={this.styles.buttonTryNDaysForFree}>
                    <Text style={this.styles.buttonTextStyle2}>
                        {this.baseList[0].title}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.props.onPressDashboard()}
                    style={this.styles.buttonNotnow}
                >
                    <Text style={this.styles.buttonTextStyle}>
                        {this.baseList[2].title}
                    </Text>

                </TouchableOpacity>
            </View>
        );
    }
}
const mapStateToProps = ({ i18n }) => {
    const { locale } = i18n;

    return { locale }
};

export default connect(mapStateToProps, {
    setLocale
})(ButtonContainer);
