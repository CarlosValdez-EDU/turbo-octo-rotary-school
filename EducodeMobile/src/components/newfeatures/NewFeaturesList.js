import React, { Component } from 'react';
import {
  FlatList,
  View,
  StyleSheet
} from 'react-native';
import Item from './NewFeaturesListItem';
import Orientation from 'react-native-orientation';
import stylesPortrait from './stylessheetPortrait';
import stylesLandscape from './stylesheetLandscape';
import Loc from '@components/common/Loc/Loc';
import { setLocale } from 'react-native-redux-i18n';
import { connect } from 'react-redux';
import I18n from '@assets/i18n';

class NewFeaturesList extends Component {

  constructor(props) {
    super(props);

    const initial = Orientation.getInitialOrientation();
    if (initial === 'PORTRAIT') {
      this.styles = stylesPortrait;
    } else {
      this.styles = stylesLandscape;
    }
  }

  componentDidMount() {
    Orientation.addOrientationListener(this._orientationDidChange);
  }

  _orientationDidChange = (orientation) => {
    if (orientation === 'LANDSCAPE') {
      this.styles = stylesLandscape;
      this.forceUpdate();
    } else {
      this.styles = stylesPortrait;
      this.forceUpdate();
    }
  }

  componentWillUnmount() {
    Orientation.getOrientation((err, orientation) => {
      console.log(`Current Device Orientation: ${orientation}`);
    });

    // Remember to remove listener
    Orientation.removeOrientationListener(this._orientationDidChange);
  }
  baseList = [
    { key: '1', title: Loc.getInstance().TextFor("newFeatures.bullet1Message", this.props) },
    { key: '2', title: Loc.getInstance().TextFor("newFeatures.bullet2Message", this.props) },
    { key: '3', title: Loc.getInstance().TextFor("newFeatures.bullet3Message", this.props) },
    { key: '4', title: Loc.getInstance().TextFor("newFeatures.bullet4Message", this.props) },
  ];

  renderItem = ({ item }) => {
    return (
      <Item {...item} />
    );
  };

  renderSeparator = () => {
    return (
      <View style={this.styles.separator} />
    )
  };

  render() {
    return (
      <View style={this.styles.mainContainer}>
        <FlatList
          data={this.baseList}
          renderItem={this.renderItem}
          style={this.styles.listContainer}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    )
  }
}


const mapStateToProps = ({ i18n }) => {
  const { locale } = i18n;

  return { locale }
};

export default connect(mapStateToProps, {
  setLocale
})(NewFeaturesList);
