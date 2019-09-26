import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native';
import Loc from '@components/common/Loc/Loc';
import slide_chara3 from '@assets/img/Slide_3_Chara.png';
import slide_curves from '@assets/img/Slide_3_curves.png';
import slide_lines from '@assets/img/Slide_3_lines.png';
import Orientation from 'react-native-orientation';
import stylesPortrait from './stylesheetPortrait';
import stylesLandscape from './stylesheetLandscape';
import { getCurrentUser } from '@data/local/UserRepository';

export default class ThirdSlideComponent extends Component {
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
    }

    componentDidMount() {
        if (this.props.logedin) {
            this.props.navigation.navigate('Home');
        } else {
            Orientation.addOrientationListener(this._orientationDidChange);
        }
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

    render() {

        let currentUser = getCurrentUser();
        let tittleStep;
        if (currentUser.locale === 'fr-CA') {
            tittleStep = this.styles.tittleStepFrench;
        } else {
            tittleStep = this.styles.tittleStep;
        }

        return (
            <View style={this.styles.mainContainer}>
                <StatusBar barStyle='light-content' />
                <TouchableOpacity style={this.styles.skipContainer} onPress={() => this.props.onSkipPressed()} >
                    <Text style={this.styles.skip}>{Loc.getInstance().TextFor('subscription.skip')}</Text>
                </TouchableOpacity>
                <View style={this.styles.bodyContainer}>
                    <View style={this.styles.textContainer}>
                        <Text style={tittleStep}>{Loc.getInstance().TextFor('subscription.step3')}</Text>
                        <View style={this.styles.waterMarkCurvesContainer}>
                            <Image source={slide_curves} style={this.styles.curvesImage} />
                        </View>
                        <Text style={this.styles.bodyCointainer}>{Loc.getInstance().TextFor('subscription.step3Text')}</Text>
                    </View>
                    <View style={this.styles.charaImageContainer}>
                        <Image source={slide_chara3} style={this.styles.charaImage} />
                    </View>
                </View>
                <View style={this.styles.swipeContainer}>
                    <View>
                        <Text style={this.styles.textSwipe}>{Loc.getInstance().TextFor('subscription.swipe')}</Text>
                    </View>
                </View>
                <View style={this.styles.waterMarkLinesContainer}>
                    <Image source={slide_lines} style={this.styles.waterMarkLines} />
                </View>
            </View>
        );
    }
}
