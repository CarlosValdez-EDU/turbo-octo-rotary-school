'use strict';
import React, { Component } from 'react';
import {
    AppRegistry,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {
    Background,
    Button
} from '@components/common/';
import styles from './stylesheet';
import { connect } from 'react-redux';
import { updateUserPhoto } from '@actions/';
import imgBackground from '@assets/img/green_base_image.png';

class CameraComponent extends Component {

    constructor(props) {
        super(props);

        this.takePicturePress = this.takePicturePress.bind(this);
        this.cancelPress = this.cancelPress.bind(this);
    }

    takePicturePress = async function () {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options)
            this.props.updateUserPhoto(data.base64);
            this.props.navigation.navigate('Profile');
        }
    };

    cancelPress() {
        this.props.navigation.navigate('Profile');
    }

    render() {
        return (
            <Background imgBackground={imgBackground}>
                <View style={styles.containerCamera}>
                    <RNCamera
                        ref={ref => {
                            this.camera = ref;
                        }}
                        style={styles.previewCamera}
                        type={RNCamera.Constants.Type.back}
                        flashMode={RNCamera.Constants.FlashMode.on}
                        permissionDialogTitle={'Permission to use camera'}
                        permissionDialogMessage={'We need your permission to use your camera phone'}
                    />
                </View>
                <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center', backgroundColor: 'transparent' }}>
                    <View style={styles.buttonsContainer}>
                        <Button onPress={() => this.cancelPress()} buttonStyles={styles.buttonCancel} textStyle={styles.textButtonCalcel}>Cancel</Button>
                        <Button buttonStyles={styles.buttonAccept} onPress={() => this.takePicturePress()}>Take Picture!</Button>
                    </View>
                </View>
            </Background>
        );
    }
}

export default connect(null, {
    updateUserPhoto
})(CameraComponent);