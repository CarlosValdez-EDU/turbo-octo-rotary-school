import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class ExplanationRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const answer = this.props.locale === 'en-CA' ? _.get(this.props.explanation, 'en-CA') : _.get(this.props.explanation, 'fr-CA');
        
        return (
            <View style={styles.mainContainer}>
                <Text style={styles.text}>{answer}</Text>
            </View>
        );
    }
}

const styles = {
    mainContainer: {
        backgroundColor: 'lightgray',
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        width: '100%'
    },
    text:{
        color: 'black', 
        fontFamily: 'Roboto-Regular', 
        fontSize: 14
    },
};
