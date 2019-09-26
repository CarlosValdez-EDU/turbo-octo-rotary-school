import React, { Component } from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity, StatusBar } from 'react-native';
import Loc from '@components/common/Loc/Loc';
import slide_curves from '@assets/img/Slide_1_curves.png';
import slide_chara from '@assets/img/Slide_1_Chara.png';
import slide_lines from '@assets/img/Slide_1_lines.png';
import Orientation from 'react-native-orientation';
import stylesPortrait from './stylesheetPortrait';
import stylesLandscape from './stylesheetLandscape';

export default class FirstSlideComponent extends Component {
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
      <View>
        <StatusBar barStyle='light-content' />
        <View style={this.styles.mainContainer}>
          <View style={this.styles.headerContainer}>
            <View style={this.styles.skipView}>
              <TouchableOpacity onPress={() => this.props.onSkipPressed()} >
                <Text style={this.styles.touchSkip}>{Loc.getInstance().TextFor('subscription.skip')}</Text>
              </TouchableOpacity>
            </View>
            <View style={this.styles.imageWaterMarkContainer}>
              <Image source={slide_curves} style={this.styles.waterMarkCurves} />
            </View>
          </View>
          <View style={this.styles.middleContainer}>
            <View style={this.styles.tittleSliderContainer}>
              <Text style={this.styles.tittleSlider}>{Loc.getInstance().TextFor('subscription.step1')}</Text>
            </View>
            <View style={this.styles.bodySliderContainer}>
              <Text style={this.styles.bodySlider}>{Loc.getInstance().TextFor('subscription.step1Text')}</Text>
            </View>
          </View>
          <View style={this.styles.bottomContainer}>
            <Image source={slide_chara} style={this.styles.image} />
            <View style={this.styles.swipeContainer}> 
              <Text style={this.styles.swipeText}>{Loc.getInstance().TextFor('subscription.swipe')}</Text>
            </View>
          </View>
          <View style={this.styles.waterMarkLinesContainer}>
            <Image source={slide_lines} style={this.styles.waterMarkLines} />
          </View>
        </View>
      </View>

    );
  }
}
