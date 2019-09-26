import React, { Component } from 'react';
import { Image } from 'react-native';
import { View } from 'native-base';

class AchievementIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getIcon() {
    switch (this.props.id) {
      case 'runcode-25':
        return <Image source={require('@assets/icons/runcode-25.png')} style={{ width: 73, height: 73, left: 7.5, position: 'absolute' }} />
      case 'runcode-50':
        return <Image source={require('@assets/icons/runcode-50.png')} style={{ width: 73, height: 73, left: 7.5, position: 'absolute' }} />
      case 'runcode-75':
        return <Image source={require('@assets/icons/runcode-75.png')} style={{ width: 73, height: 73, left: 7.5, position: 'absolute' }} />
      case 'runcode-100':
        return <Image source={require('@assets/icons/runcode-100.png')} style={{ width: 73, height: 73, left: 7.5, position: 'absolute' }} />
      case 'runcode-150':
        return <Image source={require('@assets/icons/runcode-150.png')} style={{ width: 73, height: 73, left: 7.5, position: 'absolute' }} />
      case 'runcode-200':
        return <Image source={require('@assets/icons/runcode-200.png')} style={{ width: 73, height: 73, left: 7.5, position: 'absolute' }} />
      case 'runcode-300':
        return <Image source={require('@assets/icons/runcode-300.png')} style={{ width: 73, height: 73, left: 7.5, position: 'absolute' }} />
      case 'runcode-400':
        return <Image source={require('@assets/icons/runcode-400.png')} style={{ width: 73, height: 73, left: 7.5, position: 'absolute' }} />
      case 'runcode-500':
        return <Image source={require('@assets/icons/runcode-500.png')} style={{ width: 73, height: 73, left: 7.5, position: 'absolute' }} />
      case 'hours-2':
        return <Image source={require('@assets/icons/hours-2.png')} style={{ width: 73, height: 73, left: 7.5, position: 'absolute' }} />
      case 'hours-4':
        return <Image source={require('@assets/icons/hours-4.png')} style={{ width: 73, height: 73, left: 7.5, position: 'absolute' }} />
      case 'hours-6':
        return <Image source={require('@assets/icons/hours-6.png')} style={{ width: 73, height: 73, left: 7.5, position: 'absolute' }} />
      case 'hours-8':
        return <Image source={require('@assets/icons/hours-8.png')} style={{ width: 73, height: 73, left: 7.5, position: 'absolute' }} />
      case 'hours-10':
        return <Image source={require('@assets/icons/hours-10.png')} style={{ width: 73, height: 73, left: 7.5, position: 'absolute' }} />
      case 'exercises-10':
        return <Image source={require('@assets/icons/exercises-10.png')} style={{ width: 73, height: 73, left: 7.5, position: 'absolute' }} />
      case 'exercises-25':
        return <Image source={require('@assets/icons/exercises-25.png')} style={{ width: 73, height: 73, left: 7.5, position: 'absolute' }} />
      case 'exercises-50':
        return <Image source={require('@assets/icons/exercises-50.png')} style={{ width: 73, height: 73, left: 7.5, position: 'absolute' }} />
      case 'exercises-75':
        return <Image source={require('@assets/icons/exercises-75.png')} style={{ width: 73, height: 73, left: 7.5, position: 'absolute' }} />
      case 'exercises-100':
        return <Image source={require('@assets/icons/exercises-100.png')} style={{ width: 73, height: 73, left: 7.5, position: 'absolute' }} />
      case 'exercises-150':
        return <Image source={require('@assets/icons/exercises-150.png')} style={{ width: 73, height: 73, left: 7.5, position: 'absolute' }} />
      case 'exercises-200':
        return <Image source={require('@assets/icons/exercises-200.png')} style={{ width: 73, height: 73, left: 7.5, position: 'absolute' }} />
      case 'exercises-255':
        return <Image source={require('@assets/icons/exercises-255.png')} style={{ width: 73, height: 73, left: 7.5, position: 'absolute' }} />
      case 'challenges-5':
        return <Image source={require('@assets/icons/challenges-5.png')} style={{ width: 73, height: 73, left: 7.5, position: 'absolute' }} />
      case 'challenges-10':
        return <Image source={require('@assets/icons/challenges-10.png')} style={{ width: 73, height: 73, left: 7.5, position: 'absolute' }} />
      case 'challenges-20':
        return <Image source={require('@assets/icons/challenges-20.png')} style={{ width: 73, height: 73, left: 7.5, position: 'absolute' }} />
      case 'challenges-30':
        return <Image source={require('@assets/icons/challenges-30.png')} style={{ width: 73, height: 73, left: 7.5, position: 'absolute' }} />
      case 'challenges-40':
        return <Image source={require('@assets/icons/challenges-40.png')} style={{ width: 73, height: 73, left: 7.5, position: 'absolute' }} />
      case 'challenges-50':
        return <Image source={require('@assets/icons/challenges-50.png')} style={{ width: 73, height: 73, left: 7.5, position: 'absolute' }} />
      case 'projects-5':
        return <Image source={require('@assets/icons/projects-5.png')} style={{ width: 73, height: 73, left: 7.5, position: 'absolute' }} />
      case 'projects-10':
        return <Image source={require('@assets/icons/projects-10.png')} style={{ width: 73, height: 73, left: 7.5, position: 'absolute' }} />
      case 'projects-15':
        return <Image source={require('@assets/icons/projects-15.png')} style={{ width: 73, height: 73, left: 7.5, position: 'absolute' }} />
      case 'projects-20':
        return <Image source={require('@assets/icons/projects-20.png')} style={{ width: 73, height: 73, left: 7.5, position: 'absolute' }} />
      case 'projects-25':
        return <Image source={require('@assets/icons/projects-25.png')} style={{ width: 73, height: 73, left: 7.5, position: 'absolute' }} />
      case 'quizzes-5':
        return <Image source={require('@assets/icons/quizzes-5.png')} style={{ width: 73, height: 73, left: 7.5, position: 'absolute' }} />
      case 'quizzes-10':
        return <Image source={require('@assets/icons/quizzes-10.png')} style={{ width: 73, height: 73, left: 7.5, position: 'absolute' }} />
      case 'quizzes-15':
        return <Image source={require('@assets/icons/quizzes-15.png')} style={{ width: 73, height: 73, left: 7.5, position: 'absolute' }} />
      case 'quizzes-20':
        return <Image source={require('@assets/icons/quizzes-20.png')} style={{ width: 73, height: 73, left: 7.5, position: 'absolute' }} />
      case 'courses-1':
        return <Image source={require('@assets/icons/courses-1.png')} style={{ width: 73, height: 73, left: 7.5, position: 'absolute' }} />
      case 'daysrow-7':
        return <Image source={require('@assets/icons/daysrow-7.png')} style={{ width: 73, height: 73, left: 7.5, position: 'absolute' }} />
      case 'daysrow-30':
        return <Image source={require('@assets/icons/daysrow-30.png')} style={{ width: 73, height: 73, left: 7.5, position: 'absolute' }} />
      case 'unlock-achieve-5':
        return <Image source={require('@assets/icons/unlock-achieve-5.png')} style={{ width: 73, height: 73, left: 7.5, position: 'absolute' }} />
      case 'unlock-achieve-10':
        return <Image source={require('@assets/icons/unlock-achieve-10.png')} style={{ width: 73, height: 73, left: 7.5, position: 'absolute' }} />
      case 'unlock-achieve-15':
        return <Image source={require('@assets/icons/unlock-achieve-15.png')} style={{ width: 73, height: 73, left: 7.5, position: 'absolute' }} />
      case 'unlock-achieve-20':
        return <Image source={require('@assets/icons/unlock-achieve-20.png')} style={{ width: 73, height: 73, left: 7.5, position: 'absolute' }} />
      case 'unlock-achieve-25':
        return <Image source={require('@assets/icons/unlock-achieve-25.png')} style={{ width: 73, height: 73, left: 7.5, position: 'absolute' }} />
      case 'unlock-achieve-30':
        return <Image source={require('@assets/icons/unlock-achieve-30.png')} style={{ width: 73, height: 73, left: 7.5, position: 'absolute' }} />
      case 'unlock-achieve-35':
        return <Image source={require('@assets/icons/unlock-achieve-35.png')} style={{ width: 73, height: 73, left: 7.5, position: 'absolute' }} />
      case 'unlock-achieve-40':
        return <Image source={require('@assets/icons/unlock-achieve-40.png')} style={{ width: 73, height: 73, left: 7.5, position: 'absolute' }} />

    }
  }

  render() {
    return (
        this.getIcon()
    );
  }
}

export default AchievementIcon;
