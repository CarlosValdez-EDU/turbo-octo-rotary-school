import React, { Component } from 'react'
import { View, KeyboardAvoidingView, StyleSheet } from 'react-native';
import {
    Button,
    Container,
    BasicText,
} from '@components/common';
import Modal from "react-native-modal";
import Loc from './Loc/Loc';
import { connect } from "react-redux";
import { withNavigation } from 'react-navigation';
import { resetQuizStatus } from "@actions/";

class Alert extends Component {
    constructor() {
        super();

        this.state = {
            isModalVisible: true
        }
    }

    onOkPressed = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });

        if (this.props.onActionPressed) this.props.onActionPressed();

        if (this.props.quizIsFinished == true) {
            this.props.resetQuizStatus();
            this.props.navigation.navigate("Dashboard");
        }
    }

    onCancelPressed = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });

        if (this.props.onCancelPressed) this.props.onCancelPressed();
    }

    render() {
        return (
            <Modal isVisible={this.state.isModalVisible} style={styles.container}>
                <KeyboardAvoidingView behavior="position">
                    <Container containerStyles={styles.modalContainer}>
                        <BasicText textStyles={styles.titleModal} textKey={this.props.titleKey} />
                        <BasicText textStyles={styles.bodyModal} textKey={this.props.messageKey} />
                        <View style={styles.buttonContainer}>
                            <Button onPress={this.onOkPressed} buttonStyles={styles.buttonStyle}>{Loc.getInstance().TextFor(this.props.buttonTextOk || "common.ok", this.props)}</Button>
                            {
                                this.props.showCancelButton
                                &&
                                <Button onPress={this.onCancelPressed} buttonStyles={styles.buttonStyle}>{Loc.getInstance().TextFor(this.props.buttonTextCancel || "common.cancel", this.props)}</Button>
                            }
                        </View>
                    </Container>
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
    buttonContainer: {
        flexDirection: 'row',
        width: 300,
    },
    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#F37B20',
        borderRadius: 10,
        borderColor: 'gray',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10, 
    },
});

const mapStateToProps = state => {
    const { quizIsFinished } = state.course;
    return { quizIsFinished };
};

export default connect(mapStateToProps,{resetQuizStatus})(withNavigation(Alert));