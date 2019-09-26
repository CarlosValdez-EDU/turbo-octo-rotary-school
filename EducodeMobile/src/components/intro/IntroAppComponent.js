import React, { Component } from 'react';
import { View } from 'react-native';
import FirstSlideComponent from './FirstSlide/FirstSlideComponent';
import SecondSlideComponent from './SecondSlide/SecondSlideComponent';
import ThirdSlideComponent from './ThirdSlide/ThirdSlideComponent';
import FourSlideComponent from './FourSlide/FourSlideComponent';
import FiveSlideComponent from './FiveSlide/FiveSlideComponent';
import Swiper from 'react-native-swiper';

export default class IntroAppComponent extends Component {

    state = {
        index: 0,
    };

    constructor(props) {
        super(props);

        this.swiper = undefined;

    }

    _actualTab = (indexTo, actualIndex) => {
        if (this.swiper) {
            this.swiper.scrollBy((indexTo - actualIndex) === 0 ? actualIndex : (indexTo - actualIndex));
        }
    }

    render() {
        return (
            <Swiper ref={(swiper) => this.swiper = swiper} index={this.state.mainTab} showsButtons={false} loop={false}>
                <View style={{ flex: 1 }}>
                    <FirstSlideComponent onSkipPressed={() => this._actualTab(4, 0)} />
                </View>
                <View style={{ flex: 1 }}>
                    <SecondSlideComponent onSkipPressed={() => this._actualTab(4, 1)} />
                </View>
                <View style={{ flex: 1 }}>
                    <ThirdSlideComponent onSkipPressed={() => this._actualTab(4, 2)} />
                </View>
                <View style={{ flex: 1 }}>
                    <FourSlideComponent onSkipPressed={() => this._actualTab(4, 3)} />
                </View>
                <View style={{ flex: 1 }}>
                    <FiveSlideComponent  />
                </View>
            </Swiper>
        );
    }
}

