import {createSwitchNavigator} from 'react-navigation';
import DrawerNavigator from './DrawerNavigator';
import AuthStackNavigator from './AuthStackNavigator';
import CameraComponent from '@components/profile/CameraComponent';
import CourseComponent from '@components/course/CourseComponent';
import NewFeaturesComponent from '@components/newfeatures/NewFeaturesLayout';
import InstructionsComponent from '@components/instructions/InstructionsComponent';
import SplashComponent from '@components/splash/SplashComponent';
import SupportComponent from '@components/support/SupportComponent';
import IntroComponent from '@components/intro/IntroAppComponent';
import SubscriptionComponent from '@components/intro/FiveSlide/FiveSlideComponent';
import TermsAndConditions from '@components/subscription/TermsAndConditions';
import PolicyComponent from '@components/subscription/Policy';
import FiveSlideComponent from '@components/intro/FiveSlide/FiveSlideComponent';

export default createSwitchNavigator(
  {
    Splash: {screen: SplashComponent},
    Intro: {screen: IntroComponent},
    Subscription: {screen: SubscriptionComponent},
    Home: {screen: DrawerNavigator},
    Auth: {screen: AuthStackNavigator},
    Camera: {screen: CameraComponent},
    Course: {screen: CourseComponent},
    Features: {screen: NewFeaturesComponent},
    Instructions: {screen: InstructionsComponent},
    Support: {screen: SupportComponent},
    TermsAndConditions: {screen: TermsAndConditions},
    PolicyComponent: {screen: PolicyComponent},
    FiveSlideComponent: {screen: FiveSlideComponent},
  },
  {
    initialRouteName: 'Splash',
    headerMode: 'none',
  },
);
