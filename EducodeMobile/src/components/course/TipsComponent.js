import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    ScrollView
} from 'react-native';
import CodeVisualizer from './CodeVisualizerComponent';
import HTML from 'react-native-render-html';
import _ from 'lodash';

class TipsComponent extends Component {
    constructor(props) {
        super(props);

        this.loadData = this.loadData.bind(this);

    }

    loadData() {
        var tips = this.props.locale === 'en-CA' ? _.get(this.props.exerciseData.tips, ['en-CA']) : _.get(this.props.exerciseData.tips, ['fr-CA']);
        if (tips) {
            tip = [];
            let codeBlocks = tips.match(/<pre class="codeBlock">[\W\w\s\S]*?<\/pre>/g);
            let nonCodeBlock = tips.split(/<pre class="codeBlock">[\W\w\s\S]*?<\/pre>/g);
            let dummy = [];
            if (codeBlocks == undefined) {
                this.classesStyles = {
                    'no-content': { color: 'black', fontFamily: 'Roboto', fontSize: 18 },
                }
                this.exerciseTips = nonCodeBlock
            } else {
                nonCodeBlock.forEach((block, index) => {
                    dummy.push(nonCodeBlock[index]);
                });
                nonCodeBlock.forEach((block, index) => {
                    console.log(codeBlocks.length);
                    if (index < codeBlocks.length) {
                        codeBlocks[index] = codeBlocks[index].replace(/\n/g, "ø");
                        codeBlocks[index] = codeBlocks[index].replace(/\n/g, "ø");
                        tip.push(codeBlocks[index]);
                    }
                });

                tip.forEach((block, index) => {
                    tip[index] = tip[index].replace(/<pre/g, "");
                    tip[index] = tip[index].replace(/<\/pre>/g, "");
                    tip[index] = tip[index].replace(/</g, "< ");
                    tip[index] = '<pre' + tip[index] + '</pre>';
                });

                for (let i = 1; i < (nonCodeBlock.length + codeBlocks.length); i += 2) {
                    dummy.splice(i, 0, _.head(tip));
                    tip.shift();
                }

                var after = dummy.join('');
                after = after.replace(/<[//]{0,1}(concept)[^><]*>/g, '');
                after = after.replace(/<pre*/g, '<example');
                after = after.replace(/<.pre?.>/g, '</example>');
                this.exerciseTips = after;

                this.classesStyles = {
                    'codeBlock': { color: 'white', fontFamily: 'Roboto', },
                    'code-sample-title': { marginTop: 10, fontFamily: 'Roboto', color: 'grey' },
                    'title': { color: '#00706f' }
                }
                this.renderTags = {
                    example: (htmlAttribs, children, convertedCSSStyles, passProps) => {
                        return (
                            <CodeVisualizer data={children[0][0].props.children[0].props.children} />
                        );
                    },
                }
            }
        }
    }

    render() {
        this.loadData();
        return (
            <ScrollView style={{ flex: 1, paddingLeft: 60, paddingRight: 60, paddingTop: 20 }}>
                <HTML html={this.exerciseTips} classesStyles={this.classesStyles} renderers={this.m} debug={true} />
            </ScrollView>
        );
    }
}

const mapStateToProps = ({ course, i18n }) => {
    const { exerciseData } = course;
    const { locale } = i18n;

    return { exerciseData, locale };
};

export default connect(mapStateToProps, {})(TipsComponent);