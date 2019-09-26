import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import Loc from './Loc/Loc';

class BasicText extends Component {
  render() {
    return (
      <View>
        <Loc styles={this.props.textStyles} locKey={this.props.textKey} customizer={text => text} />
      </View>
    );
  }
}

export {BasicText};