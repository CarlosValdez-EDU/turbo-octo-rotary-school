import React, { Component } from 'react';
import { 
  View, 
  Text
} from 'react-native';
import DHeader from '@components/common/DHeader';
import {
    Button
} from '@components/common';


export default class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <DHeader
          transparent
          onPress={() => this.props.navigation.openDrawer()}
        >
          HomeComponent
        </DHeader>
        <Text> textInComponent </Text>
        <Button
            onPress={() => this.props.navigation.navigate('Auth')} >
            Forgot your password?
        </Button>
      </View>
    );
  }
}
