import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    ScrollView
} from 'react-native'
import HTML from 'react-native-render-html';
import _ from "lodash";

class TaskComponent extends Component {
    constructor(props) {
        super(props);
        this.loadData = this.loadData.bind(this);
    }

    loadData() {
        var task = this.props.locale === 'en-CA' ? _.get(this.props.exerciseData.tasks, ['en-CA']) : _.get(this.props.exerciseData.tasks, ['fr-CA']);

        if (task) {
            var after = task.replace(/<[//]{0,1}(concept)[^><]*>/g, '');
            var after2 = after.replace(/<\/*string[^>]*>/g, '');

            let src = 'src\s*=\s*"([^"]+)"';
            var result = after.match(src);
            if (result && result.length > 0) {
                after2 = after.replace(/<img[^>]+src="([^">]+)/g, '<img height="250" width="350" background-size: cover src=' + '"https://dev.educode.ca' + result[1] + '');
            }

            this.exerciseTask = after2;

            this.classesStyles = {
                'section-subtitle': { fontSize: 18 },
            }
        }
    }

    render() {
        this.loadData();
        return (
            <ScrollView style={{ flex: 1, paddingLeft: 60, paddingRight: 60, paddingTop: 20 }}>
                <HTML html={this.exerciseTask} classesStyles={this.classesStyles} />
            </ScrollView>
        );
    }
}

const mapStateToProps = ({ course, i18n }) => {
    const { exerciseData } = course;
    const { locale } = i18n;

    return { exerciseData, locale };
};

export default connect(mapStateToProps, {})(TaskComponent);