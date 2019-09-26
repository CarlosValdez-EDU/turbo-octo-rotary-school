import React, { Component } from 'react';
import { View } from 'react-native';
import { Container } from './Container';
import LottieView from 'lottie-react-native';

class ProgressIndicator extends Component {
    render() {
        return (
            <View>
                <LottieView
                        style={this.props.styles}
                        source={require('@assets/animations/loading.json')}
                        autoPlay={true}
                    />
            </View>
        )
    }
}

export default ProgressIndicator;