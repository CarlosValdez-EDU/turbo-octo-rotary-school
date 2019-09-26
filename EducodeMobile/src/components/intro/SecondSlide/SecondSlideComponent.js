import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native';
import Loc from '@components/common/Loc/Loc';
import slide_curves from '@assets/img/Slide_2_curves.png';
import slide_lines from '@assets/img/Slide_2_lines.png';
import slide_chara2 from '@assets/img/Slide_2_Chara.png';
import Orientation from 'react-native-orientation';
import stylesPortrait from './stylesheetPortrait';
import stylesLandscape from './stylesheetLandscape';

export default class SecondSlideComponent extends Component {
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
        return (
            <View style={this.styles.mainContainer}>
                <StatusBar barStyle='light-content' />
                <View style={this.styles.firstContainer}>
                    <View style={this.styles.headerContainer}>
                        <View style={this.styles.skipContainer}>
                            <TouchableOpacity onPress={() => this.props.onSkipPressed()} >
                                <Text style={this.styles.skip}>{Loc.getInstance().TextFor('subscription.skip')}</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Image source={slide_curves} style={this.styles.waterMarkCurves} />
                        </View>
                    </View>
                    <View>
                        <Text style={this.styles.tittleSlider}>{Loc.getInstance().TextFor('subscription.step2')}</Text>
                    </View>
                </View>
                <View style={this.styles.bodyContainer}>
                    <View style={this.styles.bodySlideContainer}>
                        <Text style={this.styles.bodyText}>{Loc.getInstance().TextFor('subscription.step2Text')}</Text>
                    </View>
                    <Image source={slide_chara2} style={this.styles.image} />
                </View>
                <View style={this.styles.bottomContainer}>
                    <View>
                        <Text style={this.styles.swipeText}>{Loc.getInstance().TextFor('subscription.swipe')}</Text>
                    </View>
                </View>
                <View style={this.styles.waterMarkLinesContainer}>
                    <Image source={slide_lines} style={this.styles.waterMarkLines} />
                </View>
            </View>
        );
    }
}
