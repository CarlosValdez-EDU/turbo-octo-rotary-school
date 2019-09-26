/* eslint-disable eqeqeq */
import React, {Component} from 'react';
import {StyleSheet, View, Animated, Easing} from 'react-native';
import {Background} from '@components/common';
import LottieView from 'lottie-react-native';
import splashBackground from '@assets/img/splash.png';
import splashAnimation from '@assets/animations/logo.json';

class SplashComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
      animationFinished: false,
    };

    debugger;
    this.navigateToAuth = this.navigateToAuth.bind(this);
    this.initTimerToShowLoginScreen = this.initTimerToShowLoginScreen.bind(
      this,
    );
  }

  componentDidMount() {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 4000,
      easing: Easing.linear,
    }).start();

    this.initTimerToShowLoginScreen();
  }

  initTimerToShowLoginScreen() {
    setTimeout(() => {
      this.setState({
        animationFinished: true,
      });
    }, 4000);
  }

  navigateToAuth() {
    this.props.navigation.navigate('Auth');
  }

  render() {
    if (this.state.animationFinished == true) {
      this.navigateToAuth();
    }
    console.log(this.state.progress);
    return (
      <Background imgBackground={splashBackground}>
        <View style={styles.container}>
          <LottieView
            style={styles.animationContainer}
            progress={this.state.progress}
            source={splashAnimation}
          />
        </View>
      </Background>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animationContainer: {
    height: 400,
    width: 400,
  },
});

export default SplashComponent;
