import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ElevatedView from 'react-native-elevated-view'

class DropwdownContainerFooter extends Component {
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
      <ElevatedView elevation={this.elevation} style={[this.style, this.levelColorStyle, this.props.overrideStyle]}/>
    );
  }
}

const styles = {
  container: {
    height: 12,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 30,
    marginRight: 30,
  },
  containerDone: {
    height: 12,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    backgroundColor: '#047A7A',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 30,
    marginRight: 30,
  },
};

export default DropwdownContainerFooter;
