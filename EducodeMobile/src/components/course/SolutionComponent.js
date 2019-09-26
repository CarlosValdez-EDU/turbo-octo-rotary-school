import React, { Component } from 'react';
import {
    ScrollView
} from 'react-native';
import CodeVisualizer from './CodeVisualizerComponent';
import HTML from 'react-native-render-html';
import store from '@store/ConfigureStore';
import _ from 'lodash';

class TipsComponent extends Component {
    constructor(props) {
        super(props);
        this.solution = store.getState().course.exerciseData.solution;
        this.solution = this.props.locale === 'en-CA' ? _.get(this.solution, ['en-CA']) : _.get(this.solution, ['fr-CA'])
        this.solution = this.solution.replace(/\n/g, "ø");
    }

    render() {
        return (
            <ScrollView style={{ flex: 1, paddingLeft: 60, paddingRight: 60, paddingTop: 20}}>
                <CodeVisualizer data={this.solution} />
            </ScrollView>
        );
    }
}

export default TipsComponent;