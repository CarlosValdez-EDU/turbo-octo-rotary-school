import React, { Component } from 'react'
import { View, KeyboardAvoidingView, StyleSheet, ScrollView } from 'react-native';
import {
    Button,
    Container,
    BasicText,
} from '@components/common';
import Modal from "react-native-modal";
import Loc from './Loc/Loc';
import HTML from 'react-native-render-html';

class Validation extends Component {
    constructor() {
        super();
    }

    toggleModal = () => {
        if (this.props.error === true){
            if (this.props.onActionPressed) this.props.onActionPressed();
        } else if (this.props.error === false){
            if (this.props.onClose) this.props.onClose();
        }
    }

    renderContent() {
        if (this.props.error === true) {
            return (
                <Container containerStyles={styles.modalContainer}>
                    <BasicText
                        textStyles={styles.titleModal}
                        textKey={this.props.titleKey}
                    />
                    <ScrollView
                        style={{
                            flex: 1,
                            paddingLeft: 10,
                            paddingRight: 10,
                            paddingTop: 20
                        }}
                    >
                        <HTML html={this.props.content} />
                    </ScrollView>
                    <Button
                        onPress={this.toggleModal}
                        buttonStyles={styles.buttonStyleError}
                    >
                        {Loc.getInstance().TextFor("common.ok", this.props)}
                    </Button>
                </Container>
            );
        } else if (this.props.error === false) {
            return (
                <Container containerStyles={styles.modalContainer}>
                    <BasicText textStyles={styles.titleModal} textKey={this.props.titleKey} />
                    <BasicText textStyles={styles.bodyModal} textKey={this.props.messageKey} />
                    <View style={{ flexDirection: 'row' }}>
                        <Button onPress={this.toggleModal} buttonStyles={styles.buttonStyle}>{Loc.getInstance().TextFor("common.close", this.props)}</Button>
                        <Button onPress={this.props.onContinue} buttonStyles={styles.buttonStyle}>{Loc.getInstance().TextFor("common.continue", this.props)}</Button>
                    </View>
                </Container>
            );
        }
    }

    render() {
        return (
            <Modal isVisible={this.props.isModalVisible} style={styles.container}>
                <KeyboardAvoidingView behavior="position">
                    {this.renderContent()}
                </KeyboardAvoidingView>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        borderRadius: 30,
        backgroundColor: 'white',
        padding: 30,
        width: 300,
        height: 300,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleModal: {
        textAlign: 'center',
        fontSize: 28,
        fontFamily: 'Roboto-Bold',
        padding: 10,
    },
    bodyModal: {
        color: 'black',
        backgroundColor: 'transparent',
        textAlign: 'center',
        fontSize: 20,
        padding: 10
    },
    buttonStyle: {
        alignSelf: 'stretch',
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: '#F37B20',
        borderRadius: 20,
        width: 100,
        borderColor: 'gray',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
    },
    buttonStyleError: {
      alignSelf: "stretch",
      backgroundColor: "#F37B20",
      borderRadius: 10,
      borderColor: "gray",
      marginLeft: 10,
      marginRight: 10,
      marginTop: 10
    }
});

export default Validation; 