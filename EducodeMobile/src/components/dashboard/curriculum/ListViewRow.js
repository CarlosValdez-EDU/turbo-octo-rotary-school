import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

class ListViewRow extends Component {
  constructor(props) {
    super(props);

    if (this.props.completed) {
      this.textStyle = styles.textDone;
    }
    else {
      this.textStyle = styles.text;
    }
  }

  render() {
    return (
      <View style={[styles.container, this.props.overrideStyle]}>
        <Text style={this.textStyle}>
          {this.props.children}
        </Text>
      </View>
    );
  }
}

const styles = {
  container: {
    height: 30,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 50,
    marginBottom: 5,
  },
  text: {
    fontSize: 20,
    color: 'black'
  },
  textDone: {
    fontSize: 20,
    color: '#3EBCA9'
  },
};

export default ListViewRow;