import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    getAchievementsList,
} from '@actions/';
import {
    StatusBar,
    View,
    Platform,
    Text,
    Image,
    RefreshControl
} from 'react-native';
import {
    Container,
    Background,
    BasicText
} from '@components/common';
import DHeader from '@components/common/DHeader';
import Orientation from 'react-native-orientation';
import Loc from '@components/common/Loc/Loc';
import stylesPortrait from './stylesPortrait';
import stylesLandscape from './stylesheetLandscape';
import imgBackground from '@assets/img/background_orange.jpg';
import * as Progress from 'react-native-progress';
import ProgressIndicator from '@components/common/ProgressIndicator';
import { UIManager } from 'react-native';
import GridView from 'react-native-gridview';
import AchievementIcon from './AchievementIcon';

var itemsPerRow = 2;

class Achievements extends Component {

    state = {
        isRefreshing: false
    }

    static navigationOptions = {
        drawerLabel: <Loc styles={{
            color: 'gray',
            fontFamily: 'Roboto-Bold',
            fontSize: 19,
            paddingLeft: 38,
            paddingTop: 10,
            paddingBottom: 10,
        }} locKey="Achievements.title" />
    };

    constructor(props) {
        super(props);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }

        const initial = Orientation.getInitialOrientation();
        if (initial === 'PORTRAIT') {
            this.styles = stylesPortrait;
        } else {
            this.styles = stylesLandscape;
        }

        this.onRefresh = this.onRefresh.bind(this);
        this.onSupportPress = this.onSupportPress.bind(this);
    }

    componentDidMount() {
        Orientation.addOrientationListener(this._orientationDidChange);
        if (this.props.user._id !== undefined) this.props.getAchievementsList(this.props.user._id);
        this.backNavigation = this.props.navigation.getParam(
            "BACK_NAVIGATION",
        );
    }

    onSupportPress() {
        this.props.navigation.push("DrawerSupport", {
            'SHOW_BACK_BUTTON': true
        });
    }

    _orientationDidChange = (orientation) => {
        if (orientation === 'LANDSCAPE') {
            this.forceUpdate();
            this.styles = stylesLandscape;
        } else {
            this.forceUpdate();
            this.styles = stylesPortrait;
        }
    }

    componentWillUnmount() {
        Orientation.getOrientation((err, orientation) => {
            console.log(`Current Device Orientation: ${orientation}`);
        });

        // Remember to remove listener
        Orientation.removeOrientationListener(this._orientationDidChange);
    }

    onRefresh() {
        let context = this;

        context.setState({
            isRefreshing: true
        });

        if (this.props.user._id !== undefined) {
            this.props.getAchievementsList(this.props.user._id, false).
                then(() => {
                    context.setState({
                        isRefreshing: false
                    });
                }).
                catch(error => {
                    console.log(error);
                    context.setState({
                        isRefreshing: false
                    });
                });
        }
    }

    renderProgress(item) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <View style={{ flex: 1, opacity: (item.progress == 0) ? 0 : 1 }}>
                    <Progress.Circle
                        progress={eval(item.progress / item.goal)}
                        size={100}
                        thickness={10}
                        color='#FF5F00'
                        borderColor='#b8b8b8'
                        borderWidth={.5}
                    />
                </View>
                <AchievementIcon id={item._id} />
                {/* <Image source={one} style={{ width: 85, height: 85, left: 7.5, position: 'absolute' }} /> */}
                
                {/* SUBCIRCLE */}
                <View style={{ width: 73, height: 73, left: 7.5, position: 'absolute', backgroundColor: 'rgba(0,0,0,.5)', borderRadius: 50 }} />

                <Text style={{ opacity: (item.progress == 0) ? 0 : 1, width: 60, fontSize: 16, color: 'white', textShadowColor: 'black', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5, fontFamily: 'Roboto-Bold', marginLeft: 20, marginTop: 10, textAlign: 'center', position: 'absolute' }}>{`${item.progress}/${item.goal}`}</Text>
            </View>
        );
    }

    renderCompleted(item) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <AchievementIcon id={item._id} />
                {/* <Image source={two} style={{ width: 85, height: 85, left: 7.5, position: 'absolute' }} /> */}
            </View>
        );
    }

    renderMainContent() {
        if (this.props.loading) {
            return (
                <Container containerStyles={this.styles.laoderContainer}>
                    <ProgressIndicator styles={this.styles.loaderIndicatorStyle} />
                </Container>
            );
        } else {
            return (
                <View style={this.styles.container}>
                    <GridView
                        refreshControl={
                            <RefreshControl
                                tintColor="#fff"
                                titleColor="#fff"
                                refreshing={this.state.isRefreshing}
                                onRefresh={this.onRefresh}
                            />}
                        data={this.props.achievementsList}
                        dataSource={null}
                        itemsPerRow={itemsPerRow}
                        renderItem={(item, sectionID, rowID, itemIndex, itemID) => {
                            return (
                                <View style={{ flex: 1, flexDirection: "row", margin: 15, borderRadius: 20, backgroundColor: 'white', padding: 10, height: 120, paddingBottom: 10, paddingTop: 10 }}>
                                    {(item.progress == item.goal) ? this.renderCompleted(item) : this.renderProgress(item)}
                                    <View style={{ flex: 2, justifyContent: 'center', padding: 5 }}>
                                        <BasicText textStyles={{ fontSize: 20, textAlign: 'center', color: 'grey', fontFamily: 'Roboto-Bold', }} textKey={`achievements.${item._id}`} />
                                    </View>
                                </View>
                            );
                        }}
                    />
                </View>
            );
        }
    }

    render() {
        return (
            <Background imgBackground={imgBackground} >
                <StatusBar barStyle='light-content' />
                <DHeader textKey='Achievements.title' showBack={this.backNavigation ? true : false} onPress={() => this.onSupportPress()} />
                {this.renderMainContent()}
            </Background>
        );
    }
}

const mapStateToProps = ({ app, achievements }) => {
    const { user, jwt, locale } = app;

    const { achievementsList, loading } = achievements;

    return { user, jwt, locale, achievementsList, loading };
};

export default connect(mapStateToProps, {
    getAchievementsList,
})(Achievements);