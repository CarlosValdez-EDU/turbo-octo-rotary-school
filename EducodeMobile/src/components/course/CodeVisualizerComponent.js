import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/styles/hljs';
//import console = require('console');

class CodeVisualizerComponent extends Component {
    renderCode() {
        let columns = [];

        let text = this.props.data.replace(/< /g, "<");
        console.log('')
        text = text.split(/ø/);
        text.forEach((code, index) => {
            // console.log("----------------------------------------------------");
            // console.log("This is the CODE Sent to the CodeVisualizerComponent:");
            // console.log(code);
            // console.log("----------------------------------------------------");
            columns.push(
                <View style={styles.rowContainerStyle}>
                    <View style={styles.counterContainerStyle}>
                        <Text style={styles.textCounterStyle}>{index + 1}</Text>
                    </View>
                    <View style={styles.codeContainerStyle}>
                        <SyntaxHighlighter
                            language='javascript'
                            style={darcula}
                            highlighter={"hljs"}
                        >
                            {code}
                        </SyntaxHighlighter>
                    </View>
                </View>
            );
        });
        return columns;
    }

    render() {
        return (
            <View style={styles.rootContainerstyle}>
                {this.renderCode()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    rootContainerstyle: {
        flexDirection: 'column',
        backgroundColor: '#282923',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    },
    rowContainerStyle: {
        height: 30,
        flexDirection: 'row'
    },
    counterContainerStyle: {
        width: 35,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textCounterStyle: {
        color: '#8f908a',
        fontSize: 13,
        marginLeft: 10,
        marginRight: 10
    },
    codeContainerStyle: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        flex: 1
    },
    codeStyle: {
        color: '#8f908a',
        fontSize: 15,
    },
});

export default CodeVisualizerComponent;