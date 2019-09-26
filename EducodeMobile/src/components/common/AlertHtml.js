import React, { Component } from "react";
import { View, KeyboardAvoidingView, StyleSheet, ScrollView } from "react-native";
import { Button, Container, BasicText } from "@components/common";
import Modal from "react-native-modal";
import Loc from "./Loc/Loc";
import HTML from 'react-native-render-html';

class AlertHtml extends Component {

  toggleModal = () => {
    if (this.props.onActionPressed) this.props.onActionPressed();
  };

  render() {
    return (
      <Modal isVisible={this.props.showModal} style={styles.container}>
        <KeyboardAvoidingView behavior="position">
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
              buttonStyles={styles.buttonStyle}
            >
              {Loc.getInstance().TextFor("common.ok", this.props)}
            </Button>
          </Container>
        </KeyboardAvoidingView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  modalContainer: {
    borderRadius: 30,
    backgroundColor: "white",
    padding: 30,
    width: 300,
    height: 300,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  titleModal: {
    textAlign: "center",
    fontSize: 28,
    fontFamily: 'Roboto-Bold',
    padding: 10
  },
  bodyModal: {
    color: "black",
    backgroundColor: "transparent",
    textAlign: "center",
    fontSize: 20,
    padding: 10
  },
  buttonStyle: {
    alignSelf: "stretch",
    backgroundColor: "#F37B20",
    borderRadius: 10,
    borderColor: "gray",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10
  }
});

export default AlertHtml;
