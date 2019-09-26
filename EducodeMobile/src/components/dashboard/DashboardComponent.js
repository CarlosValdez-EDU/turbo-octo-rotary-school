import React, { Component } from 'react';
import {
    StatusBar,
    KeyboardAvoidingView,
    View,
    Text,
    FlatList,
    Dimensions,
    ScrollView,
    Keyboard,
    LayoutAnimation,
    Platform,
    UIManager,
    Alert
} from 'react-native';
import {
    Container,
    Background,
    Button,
} from '@components/common';
import { connect } from 'react-redux';
import { SearchBar } from 'react-native-elements'
import Orientation from 'react-native-orientation';
import stylesPortrait from './stylessheetPortrait';
import stylesLandscape from './stylesheetLandscape';
import backgroundPortrait from '@assets/img/background-logo.png';
import ProgressCurriculum from './ProgressCurriculum';
import DHeader from '@components/common/DHeader';
import ProgressIndicator from '@components/common/ProgressIndicator';
import EventBanner from './event/BannerComponent';
import EventModal from './event/ModalComponent';
import Loc from '@components/common/Loc/Loc';
import { setLocale } from 'react-native-redux-i18n';
import {
    getUserClasses,
    verifyLoginLog,
    resetVerifyLogLogin,
    getAvailableCurriculums,
    countNewItems,
    searchContent,
    clearSearch,
    resetEnrollClass,
    updateEvent,
    getEventReward,
    getUserEventProgress,
    tabPressed,
    keyboardListener
} from '@actions/';
import AchievementProgress from './AchievementProgress';
import AvaliableCurriculum from './AvaliableCurriculum';
import CompletedCurriculum from './CompletedCurriculum';
import AdComponent from '@components/ads/AdComponent';
import { getCurrentPaymentInfo } from '@data/local/PaymentRepository';
import {
    shareOnFacebook,
    shareOnTwitter,
} from 'react-native-social-share';

import store from "@store/ConfigureStore";
import { updateAppMode } from '@actions/';
import { TRIAL_MODE, GOD_MODE } from '@constants/AppConstants';
import { AdMobRewarded, AdMobInterstitial } from "react-native-admob";

import fb from "@assets/img/fb.png";
import twitter from "@assets/img/twitter.png";

class DashboardComponent extends Component {

    TabContent = Object.freeze({
        InProgress: 1,
        Available: 2,
        Completed: 3
    });

    constructor(props) {
        super(props);

        this.state = {
            btnSelected: this.props.tabSelected,
            eventModalVisible: false,
        };

        const initial = Orientation.getInitialOrientation();
        if (initial === 'PORTRAIT') {
            this.styles = stylesPortrait;
        } else {
            this.styles = stylesLandscape;
        }

        this.navigateToViewContent = this.navigateToViewContent.bind(this);
        this.navigateToAchievements = this.navigateToAchievements.bind(this);
        this.navigateToCurriculumExercise = this.navigateToCurriculumExercise.bind(this);
        this.showPurchaseScreen = this.showPurchaseScreen.bind(this);
        this.searchContent = this.searchContent.bind(this);
        this.onClearSearch = this.onClearSearch.bind(this);
        this.updateDasboardContent = this.updateDasboardContent.bind(this);
        this.initData = this.initData.bind(this);
        // this.sharePressed = this.sharePressed.bind(this);
        // this.hideModal = this.hideModal.bind(this);
        this.renderAdComponent = this.renderAdComponent.bind(this);
        this._keyboardDidShow = this._keyboardDidShow.bind(this);
        this._keyboardDidHide = this._keyboardDidHide.bind(this);
    }

    componentDidMount() {
        Orientation.addOrientationListener(this._orientationDidChange);

        this.initData();

        // AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
        // AdMobInterstitial.setAdUnitID('ca-app-pub-8615904654063679/3383485709');
        // AdMobInterstitial.requestAd().then(() => {
        //     debugger;
        //     AdMobInterstitial.showAd().catch(error => console.warn(error));
        // }).catch(error => {
        //     debugger;
        //     console.warn(error)
        // });

        let deviceOrientation;

        Orientation.getOrientation((err, orientation) => {
            console.log(`Current Device Orientation: ${orientation}`);
            deviceOrientation = orientation
            if (deviceOrientation == 'PORTRAIT') {
                this.styles = stylesPortrait;
                this.forceUpdate();
            } else {
                this.styles = stylesLandscape;
                this.forceUpdate();
            }
        });
    }

    async initData() {
        if (this.props.appMode !== GOD_MODE) {
            await this.props.verifyLoginLog();
        }

        let clms = await this.props.getAvailableCurriculums();
        await this.props.getUserClasses(1, 15, clms);

        if (this.props.userClasses.length === 0) {
            this.props.tabPressed(this.TabContent.Available);
        } else if (this.props.userClasses.length > 0) {
            this.props.tabPressed(this.TabContent.InProgress);
        }

        this.props.getUserEventProgress();
    }

    _orientationDidChange = (orientation) => {
        if (orientation === 'LANDSCAPE') {
            this.styles = stylesLandscape;
            this.forceUpdate();
            Keyboard.dismiss();
        } else {
            this.styles = stylesPortrait;
            this.forceUpdate();
            Keyboard.dismiss();
        }
    }

    UNSAFE_componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    componentWillUnmount() {
        Orientation.removeOrientationListener(this._orientationDidChange);

        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow() {
        this.animationToKeyboard();
        this.props.keyboardListener(true);
    }

    _keyboardDidHide() {
        this.animationToKeyboard();
        this.props.keyboardListener(false);
    }

    animationToKeyboard() {
        var CustomLayoutLinear = {
            duration: 150,
            create: {
                type: LayoutAnimation.Types.linear,
                property: LayoutAnimation.Properties.opacity,
            },
            update: {
                type: LayoutAnimation.Types.linear,
            },
        };

        LayoutAnimation.configureNext(CustomLayoutLinear);
    }

    updateDasboardContent() {
        this.props.tabPressed(this.TabContent.InProgress);
        this.props.resetEnrollClass();
        this.props.getUserClasses();
    }

    onSupportPress() {
        this.props.navigation.push("DrawerSupport", {
            'SHOW_BACK_BUTTON': true
        });
    }

    onCodePressed = () => {
        this.props.navigation.navigate('Course', {
            CLASS_VIEW_CONTENT_ID: this.props.lastClass.id,
        });
        // let newAppMode = '';
        // if (this.props.appMode == TRIAL_MODE) {
        //     newAppMode = FULL_MODE;
        // } else {
        //     newAppMode = TRIAL_MODE;
        // }
        // store.dispatch(updateAppMode(newAppMode));
    }

    // onStartCoursePress() {
    //     this.props.lastClass
    //     debugger;
    //     this.props.navigation.navigate('Course', {
    //         CLASS_VIEW_CONTENT_ID: this.props.lastClass.id,
    //     });
    // }

    async showPurchaseScreen() {
        if (this.props.appMode !== GOD_MODE) {
            await this.props.verifyLoginLog();

            let paymentInfo = getCurrentPaymentInfo();

            if (paymentInfo) {
                if (this.props.userInLoginLog == false && !paymentInfo.isActive) {
                    this.props.resetVerifyLogLogin();
                    this.props.navigation.navigate('Intro');
                }
            } else {
                if (this.props.userInLoginLog == false) {
                    this.props.resetVerifyLogLogin();
                    this.props.navigation.navigate('Intro');
                }
            }
        }
    }

    navigateToViewContent(curriculumId) {
        this.props.navigation.navigate('CurriculumInformation', {
            CURRICULUM_VIEW_CONTENT_ID: curriculumId
        });
    }

    navigateToAchievements() {
        this.props.navigation.navigate('DeepAchievements', {
            BACK_NAVIGATION: true
        });
    }

    navigateToCurriculumExercise(curriculumId) {
        this.props.navigation.navigate('Course', {
            CURRICULUM_VIEW_CONTENT_ID: curriculumId
        });
    }

    searchContent(search) {
        if (search) {
            let normalizedSearch = search.toLowerCase();

            switch (this.state.btnSelected) {
                case this.TabContent.InProgress:
                    this.props.searchContent(normalizedSearch, this.props.userClasses, this.TabContent.InProgress, store.getState().app.locale);
                case this.TabContent.Available:
                    this.props.searchContent(normalizedSearch, this.props.curriculums, this.TabContent.Available, store.getState().app.locale);
                case this.TabContent.Completed:
                    this.props.searchContent(normalizedSearch, this.props.completedCurriculums, this.TabContent.Completed, store.getState().app.locale);
            }
        } else {
            this.props.clearSearch();
        }
    }

    onClearSearch() {
        debugger;
    }

    renderProgressIndicator() {
        return (
            <ProgressIndicator styles={this.styles.loaderIndicatorStyle} />
        );
    }

    renderNewItemsNotification() {
        if (this.props.newItemsCount > 0) {
            return (
                <View style={this.styles.viewContainer}>
                    <Text style={this.styles.popText} numberOfLines={1}>{this.props.newItemsCount}</Text>
                </View>
            );
        }
    }

    renderTabNavigation() {
        return (
            <View style={this.styles.tabContainer}>
                <View style={{ marginLeft: 0 }}>
                    <Button buttonStyles={(this.props.tabSelected == this.TabContent.InProgress) ? this.styles.tabSelected : this.styles.tabNotSeleted}
                        textStyle={(this.props.tabSelected == this.TabContent.InProgress) ? this.styles.textTabSelected : this.styles.textTabNotSelected}
                        onPress={() => this.props.tabPressed(this.TabContent.InProgress)} >
                        {Loc.getInstance().TextFor("dashboardScreen.tabInProgress", this.props)}
                    </Button>
                </View>
                <View>
                    <Button buttonStyles={(this.props.tabSelected == this.TabContent.Available) ? this.styles.tabSelected : this.styles.tabNotSeleted}
                        textStyle={(this.props.tabSelected == this.TabContent.Available) ? this.styles.textTabSelected : this.styles.textTabNotSelected}
                        onPress={() => this.props.tabPressed(this.TabContent.Available)} >
                        {Loc.getInstance().TextFor("dashboardScreen.tabAvailable", this.props)}
                    </Button>
                    {this.renderNewItemsNotification()}
                </View>
                <View style={{ marginRight: 0 }}>
                    <Button buttonStyles={(this.props.tabSelected == this.TabContent.Completed) ? this.styles.tabSelected : this.styles.tabNotSeleted}
                        textStyle={(this.props.tabSelected == this.TabContent.Completed) ? this.styles.textTabSelected : this.styles.textTabNotSelected}
                        onPress={() => this.props.tabPressed(this.TabContent.Completed)} >
                        {Loc.getInstance().TextFor("dashboardScreen.tabCompleted", this.props)}
                    </Button>
                </View>
            </View>
        )
    }

    renderContent() {
        if (this.props.tabSelected == 1) {
            if (this.props.userClasses.length == 0) {
                return (
                    <View style={this.styles.placeholderContainer}>
                        <Text style={this.styles.placeholderMessage}>{Loc.getInstance().TextFor('dashboardScreen.emptyPlaceholderOver', this.props)}<Text>{"\n"}</Text>{Loc.getInstance().TextFor('dashboardScreen.emptyPlaceholderUnder', this.props)}</Text>
                    </View>
                );
            } else {
                return (
                    <ProgressCurriculum isLoading={this.props.isLoading}/>
                );
            }
        } else if (this.props.tabSelected == 2) {
            if (this.props.curriculums.length == 0) {
                return (
                    <View style={this.styles.placeholderContainer}>
                        <Text style={this.styles.placeholderMessage}>{Loc.getInstance().TextFor('dashboardScreen.placeholderOverAvaliable', this.props)}</Text>
                    </View>
                );
            } else {
                return (
                    <AvaliableCurriculum onSuccessEnrolledAction={() => this.updateDasboardContent()} />
                );
            }
        } else {
            if (this.props.completedCurriculums.length == 0) {
                return (
                    <View style={this.styles.placeholderContainer}>
                        <Text style={this.styles.placeholderMessage}>{Loc.getInstance().TextFor('dashboardScreen.placeholderOverCompleted', this.props)}</Text>
                    </View>
                );
            } else {
                return (
                    <CompletedCurriculum />
                );
            }
        }
    }

    renderHeader() {
        if (this.props.lastClass && this.props.lastClass.id) {
            return (
                <DHeader textKey="dashboardScreen.dashboardHeader" showLetsCode onCodePressed={() => this.onCodePressed()} onPress={() => this.onSupportPress()} />
            );
        } else {
            return (
                <DHeader textKey="dashboardScreen.dashboardHeader" onPress={() => this.onSupportPress()} />
            );
        }
    }

    // Code for sharing event || Related to Events/Rewards
    // async sharePressed(social) {
    //     let context = this;


    //     let textToShare = '';
    //     let linkToShare = '';
    //     let imagelink = '';
    //     if (context.props.user.locale === 'fr-CA') {
    //         textToShare = "La meilleure façon d'apprendre à coder! Profitez de plusieurs heures de didacticiels vidéo, de jeux et de projets amusants pour devenir un super-héros du codage.";
    //         imagelink = 'https://app.staging.educode.ca/resources/promo/event_promo_fr.png';
    //         linkToShare = 'https://app.educode.ca/';
    //     } else {
    //         textToShare = 'The easiest way to learn how to code! Enjoy hours of fun video tutorials, games & projects as you become a coding superhero.';
    //         linkToShare = 'https://app.educode.ca/';
    //         imagelink = 'https://app.staging.educode.ca/resources/promo/event_promo_en.png';
    //     }


    //     setTimeout(async () => {


    //         switch (social) {
    //             case 'facebook':
    //                 shareOnFacebook({
    //                     'text': textToShare,
    //                     'link': linkToShare,
    //                     'imagelink': imagelink,
    //                 }, (results) => {
    //                     switch (results) {
    //                         case "success":
    //                             context.props.updateEvent('shareapp')
    //                                 .then(() => context.props.getEventReward());

    //                             Alert.alert(Loc.getInstance().TextFor('dashboardScreen.sharedSuccessTitle', this.props), Loc.getInstance().TextFor('dashboardScreen.sharedSuccessMessage', this.props));
    //                             break;
    //                         case "cancelled":
    //                             Alert.alert(Loc.getInstance().TextFor('dashboardScreen.sharedWaringCancelTitle', this.props), Loc.getInstance().TextFor('dashboardScreen.sharedWaringCancelMessage', this.props));
    //                             break;
    //                         case "not_available":
    //                             Alert.alert(Loc.getInstance().TextFor('dashboardScreen.sharedInfoNoAppInstalledTitle', this.props), Loc.getInstance().TextFor('dashboardScreen.sharedInfoNoAppInstalledMessage', this.props));
    //                             break;
    //                         case "missing_link_or_text":
    //                             Alert.alert(Loc.getInstance().TextFor('dashboardScreen.sharedWaringMissingDataTitle', this.props), Loc.getInstance().TextFor('dashboardScreen.sharedWaringMissingDataMessage', this.props));
    //                             break;
    //                     }
    //                 });

    //                 break;
    //             case 'twitter':
    //                 shareOnTwitter({
    //                     'text': textToShare,
    //                     'link': linkToShare,
    //                     'imagelink': imagelink,
    //                 }, (results) => {

    //                     switch (results) {
    //                         case "success":
    //                             context.props.updateEvent('shareapp')
    //                                 .then(() => context.props.getEventReward());

    //                             Alert.alert(Loc.getInstance().TextFor('dashboardScreen.sharedSuccessTitle', this.props), Loc.getInstance().TextFor('dashboardScreen.sharedSuccessMessage', this.props));
    //                             break;
    //                         case "cancelled":
    //                             Alert.alert(Loc.getInstance().TextFor('dashboardScreen.sharedWaringCancelTitle', this.props), Loc.getInstance().TextFor('dashboardScreen.sharedWaringCancelMessage', this.props));
    //                             break;
    //                         case "not_available":
    //                             Alert.alert(Loc.getInstance().TextFor('dashboardScreen.sharedInfoNoAppInstalledTitle', this.props), Loc.getInstance().TextFor('dashboardScreen.sharedInfoNoAppInstalledMessage', this.props));
    //                             break;
    //                         case "missing_link_or_text":
    //                             Alert.alert(Loc.getInstance().TextFor('dashboardScreen.sharedWaringMissingDataTitle', this.props), Loc.getInstance().TextFor('dashboardScreen.sharedWaringMissingDataMessage', this.props));
    //                             break;
    //                     }

    //                 });
    //                 break;
    //         }
    //     }, 3000);

    //     this.setState({ eventModalVisible: false })

    // }

    // hideModal() {
    //     this.setState({ eventModalVisible: false });
    //     this.props.getEventReward();
    // }

    renderAdComponent() {
        if (this.props.appMode === TRIAL_MODE) {
            let admobKey = '';
            if (Platform.OS === 'ios') {
                admobKey = 'ca-app-pub-8615904654063679/3867411872';
            } else {
                admobKey = 'ca-app-pub-8615904654063679/3225248192';
            }
            const deviceWidth = Dimensions.get('window').width;
            return (
                <View style={[this.styles.adsContainer, { width: deviceWidth }]}>
                    <AdComponent adUnitID={admobKey} />
                </View>
            );
        }
    }

    renderTopElements() {
        return (
            <View>
                {this.renderHeader()}
                <AchievementProgress onPress={() => this.navigateToAchievements()} />
                {this.renderTabNavigation()}
            </View>
        );
    }

    render() {
        this.showPurchaseScreen();

        if (this.props.curriculums.length > 0) {
            this.props.countNewItems(this.props.curriculums);
        }

        return (
            <Background imgBackground={backgroundPortrait}>
                <StatusBar barStyle='light-content' />
                {(this.props.keyboardOpen === true) ? null : this.renderTopElements()}
                <View style={[(this.props.keyboardOpen === true) ? this.styles.containerOpenKeyboard : this.styles.container]}>
                    <Container containerStyles={this.styles.dashboardContainer}>
                        {/* <View style={this.styles.searchContainer}>
                            <SearchBar
                                round
                                icon={{ type: 'font-awesome', name: 'search', size: 40 }}
                                placeholder={Loc.getInstance().TextFor('dashboardScreen.searchPlaceholder', this.props)}
                                lightTheme
                                cancelButtonTitle={Loc.getInstance().TextFor('dashboardScreen.SearchCancel', this.props)}
                                showLoading={true}
                                containerStyle={{
                                    backgroundColor: 'white',
                                    borderWidth: 1.0,
                                    borderColor: 'lightgray',
                                    borderRadius: 30
                                }}
                                inputStyle={{
                                    backgroundColor: 'white',
                                    fontSize: 18
                                }}
                                onChangeText={search => this.searchContent(search)}
                                onClearText={() => onClearSearch()}
                            />
                        </View> */}
                        {this.renderContent()}
                    </Container>
                </View>
                {/* <EventModal
                    visible={this.state.eventModalVisible}
                    onPress={() => this.hideModal()}
                    sharePressed={this.sharePressed}
                />
                <EventBanner
                    onPress={() => this.setState({ eventModalVisible: true })}
                    modalVisible={this.state.eventModalVisible}
                /> */}
                {this.renderAdComponent()}
            </Background>
        );
    }
}

const mapStateToProps = ({ i18n, dashboard, availableCurriculums, app }) => {
    const {
        locale
    } = i18n;
    const {
        isLoading,
        userImage,
        userName,
        userClasses,
        lastClass,
        userInLoginLog,
        curriculums,
        completedCurriculums,
        newItemsCount,
        tabSelected,
        keyboardOpen
    } = dashboard;
    const {
        enrolledClass
    } = availableCurriculums;
    const {
        appMode,
        user
    } = app;

    return {
        locale,
        isLoading,
        userImage,
        userName,
        userClasses,
        lastClass,
        userInLoginLog,
        curriculums,
        completedCurriculums,
        newItemsCount,
        enrolledClass,
        appMode,
        user,
        tabSelected,
        keyboardOpen
    }
};

export default connect(mapStateToProps, {
    setLocale,
    getUserClasses,
    verifyLoginLog,
    resetVerifyLogLogin,
    getAvailableCurriculums,
    countNewItems,
    searchContent,
    clearSearch,
    resetEnrollClass,
    updateEvent,
    getEventReward,
    getUserEventProgress,
    tabPressed,
    keyboardListener
})(DashboardComponent);
