import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import {
    Button
} from '@components/common';
import * as Progress from 'react-native-progress';
import { connect } from 'react-redux';
import Loc from '@components/common/Loc/Loc';
import { setLocale } from 'react-native-redux-i18n';
import I18n from '@assets/i18n';
import { getCurrentUser } from '@data/local/UserRepository';

class AchievementProgress extends Component {

    render() {
        let currentUser = getCurrentUser();
        if (currentUser) {
            let buttonStyles;
            let textStyle;
            if (currentUser.locale === 'fr-CA') {
                buttonStyles = styles.buttonStylesFrench;
                textStyle = styles.textStyleFrench;
            } else {
                buttonStyles = styles.buttonStylesEnglish;
                textStyle = styles.textStyleEnglish;
            }

            return (
                <View style={styles.container}>
                    <Text style={styles.tittle}>{Loc.getInstance().TextFor('dashboardScreen.achievementProgress', this.props)}</Text>
                    <View style={styles.centerContainer}>
                        <View style={styles.progressBarContaienr}>
                            <Progress.Bar
                                progress={1.0}
                                width={210}
                                height={15}
                                progress={this.props.achievementOveralProgress ? this.props.achievementOveralProgress / 100 : 0}
                                color='#3EBCA9'
                                borderRadius={20}
                            />
                        </View>
                        <Text style={styles.porcentage}>{`${this.props.achievementOveralProgress}%`}</Text>
                    </View>
                    <View>
                        <Button onPress={this.props.onPress} buttonStyles={buttonStyles} textStyle={textStyle}>{Loc.getInstance().TextFor("dashboardScreen.generalAchievements", this.props)}</Button>
                    </View>
                </View>
            )
        } else {
            return (
                <View />
            );
        }
    }
}

const mapStateToProps = ({ i18n, dashboard }) => {
    const { locale } = i18n;
    const { achievementOveralProgress } = dashboard;

    return { locale, achievementOveralProgress }
};

export default connect(mapStateToProps, {
    setLocale
})(AchievementProgress);

const styles = {
    container: {
        backgroundColor: '#F5F5F5',
        margin: 30,
        height: 65,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginLeft: 50,
        marginRight: 50,
        ...Platform.select({
            ios: {
                shadowColor: '#808080',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.2,
                shadowRadius: 1,
            },
            android: {
                elevation: 1,
            },
        }),
    },
    tittle: {
        fontSize: 16,
        color: 'gray',
        fontFamily: 'Roboto-Regular',
    },
    progressBarContaienr: {
        justifyContent: 'center',
        marginRight: 10,
    },
    centerContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    porcentage: {
        color: 'gray'
    },
    buttonStylesEnglish: {
        borderRadius: 30,
        width: 179,
        height: 35,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F37B20',
    },
    buttonStylesFrench: {
        borderRadius: 30,
        width: 140,
        height: 35,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F37B20',
    },
    textStyleEnglish: {
        fontSize: 14,
        color: 'white',
        textAlign: 'center'
    },
    textStyleFrench: {
        fontSize: 12,
        color: 'white',
        textAlign:'center'
    },
    popStyle: {
        color: 'white',
        fontFamily: 'Roboto',
        alignSelf: 'center',
        textAlign: 'center'
    },
    viewContainer: {
        backgroundColor: 'red',
        position: 'absolute',
        width: 20,
        height: 20,
        right: 0,
        borderRadius: 20 / 2,
        justifyContent: 'center',
    },
    popText: {
        color: 'white',
        fontSize: 12,
        textAlign: 'center'
    },
};
