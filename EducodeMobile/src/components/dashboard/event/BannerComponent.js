import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, Animated, Image } from 'react-native';
import { connect } from 'react-redux';
import {
  getEventReward,
} from '@actions/';
import Loc from '@components/common/Loc/Loc';
import { View } from 'native-base';
import _ from 'lodash';
import Shimmer from 'react-native-shimmer';
import coinIcon from "@assets/icons/coins_white.png";

class BannerComponent extends Component {
  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0);
    this.renderShimmer = this.renderShimmer.bind(this);
  }

  componentDidMount() {
    this.props.getEventReward();
  }

  loopAnimation() {
    this.animatedValue.setValue(0);
    Animated.timing(this.animatedValue, {
      toValue: 2,
      duration: 1500
    }).start(() => {
      Animated.timing(this.animatedValue, {
        toValue: 0,
        duration: 1500
      }).start(() => this.loopAnimation());
    });
  }

  renderShimmer(shimmer) {
    return (
      <View style={styles.bannerContainer}>
        <Shimmer animating={shimmer}>
          <Text style={styles.bannerText}>{Loc.getInstance().TextFor(this.props.eventReward.length > 0 ? 'dashboardScreen.bannerTextRedeem' : 'dashboardScreen.bannerText', this.props)}</Text>
        </Shimmer>
        <Image source={coinIcon} style={styles.bannerIcon} />
      </View>
    );
  }

  render() {
    const interpolateColor = this.animatedValue.interpolate({
      inputRange: [0, 2],
      outputRange: ['rgba(0,90,89,1)', 'rgba(9,167,167,1)']
    })
    const animatedStyle = {
      backgroundColor: interpolateColor,
      transform: [
        { translateY: this.animatedValue }
      ]
    }

    let shimmer = false;

    if (this.props.eventReward != undefined && this.props.eventReward.length > 0) shimmer = true;
    if (this.props.eventReward != undefined) {
      if (this.props.eventReward.length > 0 && _.head(this.props.eventReward).redeemed == true) {
        return (<View />)
      } else {
        return (
          <View>
            <TouchableWithoutFeedback onPress={this.props.onPress}>
              <View style={[styles.eventBanner, { bottom: this.props.modalVisible ? -60 : 0 }]}>
                {this.renderShimmer(shimmer)}
              </View>
            </TouchableWithoutFeedback>
          </View>
        );
      }
    } else {
      return (<View />)
    }
  }
}


const styles = {
  eventBanner: {
    width: '88%',
    height: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'rgb(0,90,89)',
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 20
  },
  eventBannerCompleted: {
    width: '88%',
    height: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  bannerContainer: {
    flexDirection: 'row',
    justifyContent: "space-between",
    width: '100%'
  },
  bannerText: {
    fontSize: 25,
    color: 'white',
    fontFamily: 'Roboto-Medium',
    marginLeft: 30,
  },
  bannerIcon: {
    resizeMode: 'stretch',
    width: 35,
    height: 35,
    alignSelf: 'center',
    marginRight: 30
  }
}

const mapStateToProps = ({ event }) => {
  const { eventReward } = event;
  return { eventReward };
};

export default connect(mapStateToProps, {
  getEventReward,
})(BannerComponent);