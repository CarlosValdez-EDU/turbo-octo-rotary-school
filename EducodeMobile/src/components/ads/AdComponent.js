import React, { Component } from "react";
import { View, Dimensions } from "react-native";
import { AdMobBanner } from "react-native-admob";

class AdComponent extends Component {
  
  _bannerErrorHandler = error => {
    console.log(error);
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <AdMobBanner 
            adSize="fullBanner"
            adUnitID={this.props.adUnitID}
            onAdFailedToLoad={this._bannerErrorHandler}
            testDevices={[AdMobBanner.simulatorId]}
        />
      </View>
    );
  }
}

export default AdComponent;
