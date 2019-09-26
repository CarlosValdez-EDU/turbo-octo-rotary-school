import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import ElevatedView from 'react-native-elevated-view'

class DropdownContainer extends Component {
  constructor(props) {
    super(props);

    if(this.props.elevation >= 0){
      this.elevation = this.props.elevation;
    } else {
      this.elevation = 2;
    }

    if (this.props.completed) {
      this.style = styles.containerDone;
    }
    else {
      this.style = styles.container;
    }
  }

  render() {
    switch (this.props.level) {
      case 1:
        if(!this.props.completed) this.levelColorStyle = {backgroundColor: '#FBFBFB'}
        break;
    }
    return (
      <ElevatedView elevation={this.elevation} style={[this.style, this.levelColorStyle, this.props.overrideStyle]}>
        {this.props.children}
      </ElevatedView>
    );
  }
}

const styles = {
  container: {
    backgroundColor: 'white',
    marginLeft: 30,
    marginRight: 30,
  },
  containerDone: {
    backgroundColor: '#047A7A',
    marginLeft: 30,
    marginRight: 30,
  },
};

export default DropdownContainer;