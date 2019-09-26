/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
/* eslint-disable handle-callback-err */
import React, {Component} from 'react';
import {withNavigation} from 'react-navigation';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  StatusBar,
  BackHandler,
} from 'react-native';
import Loc from '@components/common/Loc/Loc';
import slide_lines from '@assets/img/Slide_5_lines.png';
import slide_curves from '@assets/img/Slide_5_curves.png';
import slide_up_arrow from '@assets/img/Slide_5_up_arrow.png';
import Slide_down_arrow from '@assets/img/Slide_5_down_arrow.png';
import slide_circle from '@assets/img/Slide_5_circle.png';
import slide_tick from '@assets/img/Slide_5_tick.png';

import star_red from '@assets/img/Slide_5_Star.png';
import star_orange from '@assets/img/Slide_5_Star_2.png';

import Orientation from 'react-native-orientation';
import stylesPortrait from './stylesheetPortrait';
import stylesLandscape from './stylesheetLandscape';
import {connect} from 'react-redux';
import {registerSubscription, resetSubscription} from '@actions/';
import {getCurrentUser} from '@data/local/UserRepository';

class FiveSlideComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSubscription: true,
    };

    const initial = Orientation.getInitialOrientation();

    if (initial === 'PORTRAIT') {
      this.styles = stylesPortrait;
    } else {
      this.styles = stylesLandscape;
    }

    this.showTerms = this.showTerms.bind(this);
    this.buySubscription = this.buySubscription.bind(this);

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  componentDidMount() {
    if (this.props.logedin) {
      this.props.navigation.navigate('Home');
    } else {
      Orientation.addOrientationListener(this._orientationDidChange);
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

      let deviceOrientation;

      Orientation.getOrientation((err, orientation) => {
        console.log(`Current Device Orientation: ${orientation}`);
        deviceOrientation = orientation;
        if (deviceOrientation == 'PORTRAIT') {
          this.styles = stylesPortrait;
          this.forceUpdate();
        } else {
          this.styles = stylesLandscape;
          this.forceUpdate();
        }
      });
    }

    this.backNavigation = this.props.navigation.getParam('BACK_NAVIGATION');
  }

  _orientationDidChange = orientation => {
    if (orientation === 'LANDSCAPE') {
      this.styles = stylesLandscape;
      this.forceUpdate();
    } else {
      this.styles = stylesPortrait;
      this.forceUpdate();
    }
  };

  componentWillUnmount() {
    Orientation.getOrientation((err, orientation) => {
      console.log(`Current Device Orientation: ${orientation}`);
    });

    // Remember to remove listener
    Orientation.removeOrientationListener(this._orientationDidChange);
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    this.props.resetSubscription();
  }

  handleBackButton() {
    if (this.props.isLoading) {
      return true;
    }
    return false;
  }

  buySubscription(purchaceType) {
    this.props.registerSubscription(this.props.user._id, purchaceType);
  }

  showTerms() {
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

    if (this.state.showSubscription == false) {
      this.setState({
        showSubscription: !this.state.showSubscription,
      });
    } else {
      this.setState({
        showSubscription: !this.state.showSubscription,
      });
    }
  }

  _trialPressed = () => {
    if (this.backNavigation) {
      this.props.navigation.goBack();
    }
    this.props.navigation.navigate('Home');
    // this.props.navigation.goBack();
  };

  _onTermsAndConditionsPressed() {
    this.props.navigation.navigate('TermsAndConditions');
  }

  _onPolicyPressed() {
    this.props.navigation.navigate('PolicyComponent');
  }

  renderHeaderSlide() {
    return (
      <View style={{flex: 1}}>
        <View style={this.styles.waterMarkCurvesContainer}>
          <Image source={slide_curves} style={this.styles.waterMarkCurves} />
        </View>
        <View style={this.styles.tittleSideContainer}>
          <View style={this.styles.tittleContainer}>
            <Text style={this.styles.becomeText}>
              {Loc.getInstance().TextFor('subscription.superhero')}
            </Text>
            <Text style={this.styles.unlimitedText}>
              {Loc.getInstance().TextFor('subscription.access')}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  renderBottomSlide() {
    let storeText =
      Platform.OS === 'android'
        ? 'subscription.terms1Android'
        : 'subscription.terms1';
    return (
      <View style={this.styles.container}>
        <TouchableOpacity
          style={this.styles.termsContainerUp}
          onPress={this.showTerms}>
          <View>
            <Text style={this.styles.termsText}>
              {Loc.getInstance().TextFor('subscription.terms')}
            </Text>
          </View>
          <View style={this.styles.allowContainer}>
            <Image source={Slide_down_arrow} style={this.styles.allowImage} />
          </View>
        </TouchableOpacity>

        <View style={this.styles.textTermsContainer}>
          <ScrollView>
            <Text style={this.styles.textRow}>
              {Loc.getInstance().TextFor(storeText)}
            </Text>
            <Text style={this.styles.textRow}>
              {Loc.getInstance().TextFor('subscription.terms5')}
            </Text>
            <Text style={this.styles.textRow}>
              {Loc.getInstance().TextFor('subscription.terms2')}
            </Text>
            <Text style={this.styles.textRow}>
              {Loc.getInstance().TextFor('subscription.terms3')}
            </Text>
            <View style={this.styles.linksContainer}>
              <Text style={this.styles.textRowBotton}>
                {Loc.getInstance().TextFor('subscription.terms4')}
              </Text>
              <TouchableOpacity
                disabled={this.props.isLoading}
                onPress={() => this._onTermsAndConditionsPressed()}>
                <Text style={this.styles.linkUnderline}>
                  {' '}
                  {Loc.getInstance().TextFor('subscription.termsAndConditions')}
                </Text>
              </TouchableOpacity>
              <Text style={this.styles.textRowBotton}>
                {' '}
                {Loc.getInstance().TextFor('subscription.and')}
              </Text>
              <TouchableOpacity
                disabled={this.props.isLoading}
                onPress={() => this._onPolicyPressed()}>
                <Text style={this.styles.linkUnderline}>
                  {' '}
                  {Loc.getInstance().TextFor('subscription.privacyPolicy')}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }

  renderBottom() {
    return (
      <TouchableOpacity
        style={this.styles.termsContainer}
        onPress={this.showTerms}>
        <View>
          <Text style={this.styles.termsText}>
            {Loc.getInstance().TextFor('subscription.terms')}
          </Text>
        </View>
        <View style={this.styles.allowContainer}>
          <Image source={slide_up_arrow} style={this.styles.allowImage} />
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    let currentUser = getCurrentUser();
    let firstTicketText;
    let tickTextOrange;
    let firstUpgradeText;
    let upgradeText;
    if (currentUser.locale === 'fr-CA') {
      firstTicketText = this.styles.firstTicketTextFrench;
      tickTextOrange = this.styles.tickTextOrangeFrench;
      firstUpgradeText = this.styles.firstUpgradeTextFrench;
      upgradeText = this.styles.upgradeTextFrench;
    } else {
      firstTicketText = this.styles.firstTicketText;
      tickTextOrange = this.styles.tickTextOrange;
      firstUpgradeText = this.styles.firstUpgradeText;
      upgradeText = this.styles.upgradeText;
    }

    if (this.props.subscriptionStatus) {
      if (this.backNavigation) {
        this.props.navigation.goBack();
      }
      this.props.navigation.navigate('Home');
    }

    if (Platform.OS === 'ios') {
      return (
        <View style={this.styles.mainContainer}>
          <StatusBar barStyle="light-content" />
          <View style={this.styles.headerContainer}>
            <TouchableOpacity
              onPress={() => this._trialPressed()}
              disabled={this.props.isLoading}>
              <Image
                source={require('@assets/icons/backX2.png')}
                style={this.styles.backArrowButton}
              />
            </TouchableOpacity>

            <View style={this.styles.restoreText} />

            <TouchableOpacity
              onPress={() => this._trialPressed()}
              disabled={this.props.isLoading}>
              <Text style={this.styles.useText}>
                {Loc.getInstance().TextFor('subscription.limitedVersion')}
              </Text>
            </TouchableOpacity>
          </View>
          {this.state.showSubscription == false
            ? this.renderHeaderSlide()
            : null}
          <View style={this.styles.secondContainer}>
            <View style={this.styles.firstPriceBoxContainer}>
              <TouchableOpacity
                style={this.styles.firstPriceBox}
                disabled={this.props.isLoading}
                onPress={() => this.buySubscription(3)}>
                <View style={this.styles.headerPriceContainer}>
                  <Text style={this.styles.headerPriceTittle}>
                    {Loc.getInstance().TextFor('subscription.yearly')}
                  </Text>
                </View>
                <View style={this.styles.bodyPriceBoxContainer}>
                  <Text style={this.styles.priceText}>$99.99</Text>
                  <Text style={this.styles.currencyText}>USD</Text>
                  <View style={this.styles.upgradeContainer}>
                    <View style={this.styles.circleImage}>
                      <Image
                        source={slide_circle}
                        style={this.styles.circleImageBack}
                      />
                      <Image
                        source={slide_tick}
                        style={this.styles.tickImage}
                      />
                    </View>
                    <Text style={firstUpgradeText}>
                      {Loc.getInstance().TextFor('subscription.upgrade')}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <View style={this.styles.firstTickContainer}>
                <Image source={star_red} style={this.styles.firtstickImage} />
                <Text style={firstTicketText}>
                  {Loc.getInstance().TextFor('subscription.saveYearly')}
                </Text>
              </View>
            </View>
            <View style={this.styles.secondsPriceBoxContainer}>
              <View style={this.styles.monthContainer}>
                <TouchableOpacity
                  style={this.styles.secondPriceBox}
                  disabled={this.props.isLoading}
                  onPress={() => this.buySubscription(2)}>
                  <View style={this.styles.headerPriceMonthContainer}>
                    <Text style={this.styles.headerPriceTittleMonth}>
                      {Loc.getInstance().TextFor('subscription.six')}
                    </Text>
                  </View>
                  <View style={this.styles.bodyPriceBoxContainerMonth}>
                    <Text style={this.styles.priceTextMonth}>$54.99</Text>
                    <Text style={this.styles.currencyTextMonth}>USD</Text>
                    <View style={this.styles.upgradeButtonContainer}>
                      <View style={this.styles.tickImageContainerMonth}>
                        <Image
                          source={slide_circle}
                          style={this.styles.circleImageMonth}
                        />
                        <Image
                          source={slide_tick}
                          style={this.styles.tickImageMonth}
                        />
                      </View>
                      <Text style={upgradeText}>
                        {Loc.getInstance().TextFor('subscription.upgrade')}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <View style={this.styles.tickImageOrangeContainer}>
                  <Image
                    source={star_orange}
                    style={this.styles.tickImageOrange}
                  />
                  <Text style={tickTextOrange}>
                    {Loc.getInstance().TextFor('subscription.saveSix')}
                  </Text>
                </View>
              </View>
              <View style={this.styles.monthContainer}>
                <TouchableOpacity
                  style={this.styles.secondPriceBox}
                  disabled={this.props.isLoading}
                  onPress={() => this.buySubscription(1)}>
                  <View style={this.styles.headerPriceMonthContainer}>
                    <Text style={this.styles.headerPriceTittleMonth}>
                      {Loc.getInstance().TextFor('subscription.monthly')}
                    </Text>
                  </View>
                  <View style={this.styles.bodyPriceBoxContainerMonth}>
                    <Text style={this.styles.priceTextMonth}>$9.99</Text>
                    <Text style={this.styles.currencyTextMonth}>USD</Text>
                    <View style={this.styles.upgradeButtonContainer}>
                      <View style={this.styles.tickImageContainerMonth}>
                        <Image
                          source={slide_circle}
                          style={this.styles.circleImageMonth}
                        />
                        <Image
                          source={slide_tick}
                          style={this.styles.tickImageMonth}
                        />
                      </View>
                      <Text style={upgradeText}>
                        {Loc.getInstance().TextFor('subscription.upgrade')}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {this.state.showSubscription == false
            ? this.renderBottom()
            : this.renderBottomSlide()}
          <View style={this.styles.waterMarkLinesContainer}>
            <Image source={slide_lines} style={this.styles.waterMarkLines} />
          </View>
        </View>
      );
    } else {
      if (Platform.OS === 'android') {
        return (
          <View style={this.styles.mainContainer}>
            <StatusBar barStyle="light-content" />
            <View style={this.styles.headerContainer}>
              <TouchableOpacity
                onPress={() => this._trialPressed()}
                disabled={this.props.isLoading}>
                <Image
                  source={require('@assets/icons/backX2.png')}
                  style={
                    (this.styles.backArrowButton,
                    {
                      width: 30,
                      height: 56.25,
                      paddingLeft: '10%',
                      marginLeft: 35,
                      backgroundColor: 'transparent',
                    })
                  }
                />
              </TouchableOpacity>

              <View style={this.styles.restoreText} />

              <TouchableOpacity
                onPress={() => this._trialPressed()}
                disabled={this.props.isLoading}>
                <Text style={this.styles.useText}>
                  {Loc.getInstance().TextFor('subscription.limitedVersion')}
                </Text>
              </TouchableOpacity>
            </View>
            {this.state.showSubscription == false
              ? this.renderHeaderSlide()
              : null}
            <View style={this.styles.secondContainer}>
              <View style={this.styles.firstPriceBoxContainer}>
                <TouchableOpacity
                  style={this.styles.firstPriceBox}
                  disabled={this.props.isLoading}
                  onPress={() => this.buySubscription(3)}>
                  <View style={this.styles.headerPriceContainer}>
                    <Text style={this.styles.headerPriceTittle}>
                      {Loc.getInstance().TextFor('subscription.yearly')}
                    </Text>
                  </View>
                  <View style={this.styles.bodyPriceBoxContainer}>
                    <Text style={this.styles.priceText}>$99.99</Text>
                    <Text style={this.styles.currencyText}>USD</Text>
                    <View style={this.styles.upgradeContainer}>
                      <View style={this.styles.circleImage}>
                        <Image
                          source={slide_circle}
                          style={this.styles.circleImageBack}
                        />
                        <Image
                          source={slide_tick}
                          style={this.styles.tickImage}
                        />
                      </View>
                      <Text style={firstUpgradeText}>
                        {Loc.getInstance().TextFor('subscription.upgrade')}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <View style={this.styles.firstTickContainer}>
                  <Image source={star_red} style={this.styles.firtstickImage} />
                  <Text style={firstTicketText}>
                    {Loc.getInstance().TextFor('subscription.saveYearly')}
                  </Text>
                </View>
              </View>
              <View style={this.styles.secondsPriceBoxContainer}>
                <View style={this.styles.monthContainer}>
                  <TouchableOpacity
                    style={this.styles.secondPriceBox}
                    disabled={this.props.isLoading}
                    onPress={() => this.buySubscription(2)}>
                    <View style={this.styles.headerPriceMonthContainer}>
                      <Text style={this.styles.headerPriceTittleMonth}>
                        {Loc.getInstance().TextFor('subscription.six')}
                      </Text>
                    </View>
                    <View style={this.styles.bodyPriceBoxContainerMonth}>
                      <Text style={this.styles.priceTextMonth}>$54.99</Text>
                      <Text style={this.styles.currencyTextMonth}>USD</Text>
                      <View style={this.styles.upgradeButtonContainer}>
                        <View style={this.styles.tickImageContainerMonth}>
                          <Image
                            source={slide_circle}
                            style={this.styles.circleImageMonth}
                          />
                          <Image
                            source={slide_tick}
                            style={this.styles.tickImageMonth}
                          />
                        </View>
                        <Text style={upgradeText}>
                          {Loc.getInstance().TextFor('subscription.upgrade')}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <View style={this.styles.tickImageOrangeContainer}>
                    <Image
                      source={star_orange}
                      style={this.styles.tickImageOrange}
                    />
                    <Text style={tickTextOrange}>
                      {Loc.getInstance().TextFor('subscription.saveSix')}
                    </Text>
                  </View>
                </View>
                <View style={this.styles.monthContainer}>
                  <TouchableOpacity
                    style={this.styles.secondPriceBox}
                    disabled={this.props.isLoading}
                    onPress={() => this.buySubscription(1)}>
                    <View style={this.styles.headerPriceMonthContainer}>
                      <Text style={this.styles.headerPriceTittleMonth}>
                        {Loc.getInstance().TextFor('subscription.monthly')}
                      </Text>
                    </View>
                    <View style={this.styles.bodyPriceBoxContainerMonth}>
                      <Text style={this.styles.priceTextMonth}>$9.99</Text>
                      <Text style={this.styles.currencyTextMonth}>USD</Text>
                      <View style={this.styles.upgradeButtonContainer}>
                        <View style={this.styles.tickImageContainerMonth}>
                          <Image
                            source={slide_circle}
                            style={this.styles.circleImageMonth}
                          />
                          <Image
                            source={slide_tick}
                            style={this.styles.tickImageMonth}
                          />
                        </View>
                        <Text style={upgradeText}>
                          {Loc.getInstance().TextFor('subscription.upgrade')}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {this.state.showSubscription == false
              ? this.renderBottom()
              : this.renderBottomSlide()}
            <View style={this.styles.waterMarkLinesContainer}>
              <Image source={slide_lines} style={this.styles.waterMarkLines} />
            </View>
          </View>
        );
      }
    }
  }
}

const mapStateToProps = ({app, subscription}) => {
  const {user} = app;
  const {isLoading, subscriptionStatus} = subscription;

  return {user, isLoading, subscriptionStatus};
};

export default withNavigation(
  connect(
    mapStateToProps,
    {
      registerSubscription,
      resetSubscription,
    },
  )(FiveSlideComponent),
);
