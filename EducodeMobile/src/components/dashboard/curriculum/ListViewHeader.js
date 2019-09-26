import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import completeMark from '@assets/icons/complete-mark.png';
import incompleteMark from '@assets/icons/incomplete-mark.png';

class ListViewHeader extends Component {
  constructor(props) {
    super(props);
  }

  renderStatusIcon() {
    if (this.props.completed) {
      return <Image source={completeMark} style={styles.statusIconStyle}></Image>
    } else {
      return <Image source={incompleteMark} style={styles.statusIconStyle}></Image>
    }
  }

  render() {
    return (
      <View style={[styles.container, this.props.overrideStyle]}>
          {this.renderStatusIcon()}
          <Text style={styles.text}>
            {this.props.children}
          </Text>
      </View>
    );
  }
}

const styles = {
  container: {
    height: 40,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: 'black'
  },
  statusIconStyle: {
    justifyContent: 'center',
    height: 28,
    width: 28,
    marginLeft: 10,
    marginRight: 10,
  }
};

export default ListViewHeader;