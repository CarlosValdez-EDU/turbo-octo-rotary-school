import {StackNavigator} from 'react-navigation';
import LoginComponent from '@components/login/LoginComponent';
import SignupComponent from '@components/signup/SignupComponent';
import {Animated, Easing} from 'react-native';

//--------TRANSITION STYLE
const fadeIn = (duration = 300) => {
  return {
    transitionSpec: {
      duration,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: ({position, scene}) => {
      const {index} = scene;

      const opacity = position.interpolate({
        inputRange: [index - 1, index],
        outputRange: [0, 1],
      });

      return {opacity};
    },
  };
};

export default StackNavigator(
  {
    Auth: {screen: LoginComponent},
    Signup: {screen: SignupComponent},
  },
  {
    initialRouteName: 'Auth',
    transitionConfig: () => fadeIn(),
    headerMode: 'none',
  },
);
