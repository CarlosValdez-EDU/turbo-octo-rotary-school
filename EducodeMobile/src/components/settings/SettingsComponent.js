import React, { Component } from 'react';
import {
  StatusBar,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  Button
} from '@components/common';
import Orientation from 'react-native-orientation';
import {
  Container,
  Background,
  Checkbox,
  BasicText
} from '@components/common';
import styles from './stylesheet';
import imgBackground from '@assets/img/green_base_image.png';
import DHeader from '@components/common/DHeader';
import Loc from '@components/common/Loc/Loc';

class SettingsComponent extends Component {

  static navigationOptions = {
    drawerLabel: <Loc styles={{
      color: 'gray',
      fontFamily: 'Roboto-Thin',
      fontSize: 19,
      paddingLeft: 38,
      paddingTop: 10,
      paddingBottom: 10,
    }} locKey="settingsScreen.drawerTitle" />
  };

  constructor(props) {
    super(props);
    this.state = {
      pushNotifications: false
    };

    this.pressCheckPushNotifications = this.pressCheckPushNotifications.bind(this);
  }

  pressCheckPushNotifications() {
    this.setState({
      pushNotifications: !this.state.pushNotifications
    });
  }

  onValueChange() {
    console.log('This the change of the switch button');
  }

  showTermsModal = () => {
    return (<InfoModal />);
  }


  render() {
    return (
      <Background imgBackground={imgBackground}>
        <StatusBar barStyle='light-content' />
        <DHeader textKey="settingsScreen.settingsHeader" />
        <View style={styles.backContainer}/>
        <View style={styles.container}>
          <Container containerStyles={styles.infoContainer}>
            <View style={styles.settingsItemStyle}>
              <BasicText textStyles={styles.settingsItemTextStyle} textKey="settingsScreen.pushNotificatio"/>
              <View style={{flex: 1}}/>
              <Checkbox onPress={this.pressCheckPushNotifications} checked={this.state.pushNotifications} colorCheck='#3EBCA9'></Checkbox>
            </View>
          </Container>
        </View>
      </Background>
    );
  }
}

export default SettingsComponent;