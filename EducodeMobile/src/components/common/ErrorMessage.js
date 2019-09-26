import React from 'react'
import { View, Text } from 'react-native'

const ErrorMessage = props => {
    return(
        <View>
            {props.error ? <Text style={styles.errorTextStyle}>{props.error}</Text> : null}
        </View>
    );
};

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
    marginTop: 12,
  },
}

export { ErrorMessage };
