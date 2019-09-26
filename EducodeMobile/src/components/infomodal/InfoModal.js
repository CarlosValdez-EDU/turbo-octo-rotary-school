import { 
    View, 
    KeyboardAvoidingView, 
    ScrollView
} from 'react-native';
import Modal from "react-native-modal";
import { 
    Container, 
    BasicText, 
    Button 
} from '@components/common';
import styles from './stylesheet';

const InfoModal = (props) => {
    return (  
        <Modal isVisible={this.state.isModalVisible} style={styles.container}>
        <KeyboardAvoidingView behavior="position">
          <Container containerStyles={styles.modalContainer}>
            <BasicText textStyles={styles.titleModal}>Terms And Conditions</BasicText>
            <ScrollView>
              <BasicText textStyles={styles.bodyModal}>
              This is the textThis is the textThis is the textThis is the textThis is the textThis is the textThis is the textThis is the textThis is the textThis is the textThis is the textThis is the textThis is the textThis is the textThis is the textThis is the textThis is the textThis is the textThis is the textThis is the textThis is the textThis is the textThis is the textThis is the textThis is the textThis is the textThis is the textThis is the textThis is the textThis is the textThis is the textThis is the textThis is the textThis is the textThis is the textThis is the textThis is the textThis is the textThis is the textThis is the textThis is the textThis is the textThis is the textThis is the textThis is the textThis is the textThis is the textThis is the textThis is the textThis is the textThis is the textThis is the textThis is the textThis is the textThis is the textThis is the textThis is the textThis is the textThis is the textThis is the text
              </BasicText>
            </ScrollView>
            <View style={styles.buttonsContainer}>
              <Button onPress={this.toggleModal} buttonStyles={styles.buttonCancel} textStyle={styles.textButtonCalcel}>Cancel</Button>
              <Button buttonStyles={styles.buttonAccept}>Accept</Button>
            </View>
          </Container>
        </KeyboardAvoidingView>
      </Modal>
    );
}


 
export default InfoModal;