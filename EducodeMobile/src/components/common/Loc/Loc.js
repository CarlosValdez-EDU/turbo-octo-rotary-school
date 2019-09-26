import React, { Component } from 'react'
import PropTypes from 'prop-types'
import I18n from 'react-native-i18n'
import { connect } from 'react-redux'
import { Text } from 'react-native'

class Loc extends Component {

  static Instance = null;

  static getInstance() {
    if (Loc.Instance == null) {
      Loc.Instance = new Loc();
    }

    return Loc.Instance;
  }

  constructor(props) {
    super(props);

    this.state = {
      styles: this.props ? this.props.styles : {},
      customizer: this.props ? this.props.customizer : {},
      locKey: this.props ? this.props.locKey : {},
      overload: this.props ? this.props : {}
    };
  }

  TextFor(textKey, props) {
    return I18n.t(textKey, props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      styles: nextProps.styles,
      customizer: nextProps.customizer,
      locKey: nextProps.locKey,
      overload: nextProps.overload
    });
  }

  render() {
    return (
      <Text style={this.state.styles}>{this.state.customizer(I18n.t(this.state.locKey, this.state.overload))}</Text>
    );
  }
}

Loc.defaultProps = {
  customizer: text => text
}

Loc.propTypes = {
  customizer: PropTypes.func,
  locKey: PropTypes.any.isRequired,
}

const mapStateToProps = ({ i18n }) => ({
  locale: i18n.locale,
  version: i18n.version,
  toggle: i18n.toggle,
})

export default connect(mapStateToProps)(Loc)
