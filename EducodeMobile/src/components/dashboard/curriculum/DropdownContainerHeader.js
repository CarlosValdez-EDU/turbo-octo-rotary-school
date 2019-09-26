import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import dropdownBlack from '@assets/icons/arrow-dropdown-black.png';
import retractGreen from '@assets/icons/arrow-retract-green.png';
import retractOrange from '@assets/icons/arrow-retract-orange.png';
import completeMark from '@assets/icons/complete-mark.png';
import completeMarkWhite from '@assets/icons/complete-mark-white.png';
import incompleteMark from '@assets/icons/incomplete-mark.png';
import ElevatedView from 'react-native-elevated-view'

class DropdownContainerHeader extends Component {
  constructor(props) {
    super(props);

    if (this.props.elevation >= 0 && this.props.elevation) {
      this.elevation = this.props.elevation;
    } else {
      this.elevation = 2;
    }

    if (this.props.completed && this.props.level == 1) {
      this.style = styles.containerDone;
      this.textStyle = styles.textDone;
    }
    else {
      this.style = styles.container;
      this.textStyle = styles.text;
    }
  }

  renderStatusIcon() {
    if (this.props.completed) {
      if (this.props.level == 1) return <Image source={completeMarkWhite} style={styles.statusIconStyle}></Image>
      else return <Image source={completeMark} style={styles.statusIconStyle}></Image>
    } else {
      return <Image source={incompleteMark} style={styles.statusIconStyle}></Image>
    }
  }

  renderDropdownIcon() {
    if (this.props.type) return;
    switch (this.props.level) {
      case 1:
        if (this.props.expanded) return <Image source={retractOrange} style={styles.dropdownStyle}></Image>
        else return <Image source={dropdownBlack} style={styles.dropdownStyle}></Image>
      case 2:
        if (this.props.expanded) return <Image source={retractGreen} style={styles.dropdownStyle}></Image>
        else return <Image source={dropdownBlack} style={styles.dropdownStyle}></Image>
      default:
        break;
    }
  }

  render() {
    switch (this.props.level) {
      case 1:
        this.overrideTextStyle = { fontSize: 24 };
        if (this.props.expanded && !this.props.completed) this.levelColorStyle = { backgroundColor: '#FBFBFB' }
        else if (!this.props.expanded && !this.props.completed) this.levelColorStyle = { backgroundColor: 'white' }
        break;
      case 2:
        this.overrideTextStyle = { fontSize: 22 };
        break;
    }
    return (
      <TouchableWithoutFeedback disabled={this.props.type ? false : true}>
        <ElevatedView elevation={this.elevation} style={[this.style, this.levelColorStyle, this.props.overrideStyle]}>
          {this.renderStatusIcon()}
          <Text style={[this.textStyle, this.overrideTextStyle]}>
            {this.props.children}
          </Text>
          {this.renderDropdownIcon()}
        </ElevatedView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    height: 50,
    borderRadius: 18,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
  containerDone: {
    flex: 1,
    height: 50,
    borderRadius: 18,
    backgroundColor: '#047A7A',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
  text: {
    fontSize: 24,
    color: 'black',
    flex: 1,
  },
  textDone: {
    fontSize: 24,
    color: 'white',
    flex: 1,
  },
  dropdownStyle: {
    height: 40,
    width: 40,
    marginLeft: 10,
    marginRight: 10,
  },
  statusIconStyle: {
    height: 28,
    width: 28,
    marginLeft: 10,
    marginRight: 10,
  }
};

export default DropdownContainerHeader;