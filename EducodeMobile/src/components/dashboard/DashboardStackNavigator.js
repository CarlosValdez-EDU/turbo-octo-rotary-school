import React from 'react';
import { StackNavigator } from 'react-navigation';
import DashboardComponent from '@components/dashboard/DashboardComponent';
import CurriculumInformationComponent from '@components/dashboard/curriculum/CurriculumInformation';
import CourseCompoment from '@components/course/CourseComponent'
import AchievementsComponent from '@components/achievement/Achievements';
import MoreInfoComponent from '@components/moreinfo/MoreInfoComponent';
import { Animated, Easing } from 'react-native';
import Loc from '@components/common/Loc/Loc';
import store from "@store/ConfigureStore";

//--------TRANSITION STYLE
const fadeIn = (duration = 300) => {
  return {
    transitionSpec: {
      duration,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: ({ position, scene }) => {
      const { index } = scene;

      const opacity = position.interpolate({
        inputRange: [index - 1, index],
        outputRange: [0, 1],
      });

      return { opacity };
    },
  };
}

const dashboardStackNavigator = StackNavigator(
  {
    Dashboard: { screen: DashboardComponent },
    CurriculumInformation: { screen: CurriculumInformationComponent },
    Course: { screen: CourseCompoment },
    DeepAchievements: { screen: AchievementsComponent },
    MoreInfo: { screen: MoreInfoComponent }
  },
  {
    initialRouteName: 'Dashboard',
    transitionConfig: () => fadeIn(),
    headerMode: 'none',
  }
);

dashboardStackNavigator.navigationOptions = {
  drawerLabel: <Loc styles={{
    color: 'gray',
    fontFamily: 'Roboto-Bold',
    fontSize: 19,
    paddingLeft: 38,
    paddingTop: 10,
    paddingBottom: 10,
  }} locKey="dashboardScreen.drawerTitle" />
}

dashboardStackNavigator.navigationOptions = ({ navigation }) => {
  let drawerLockMode = 'unlocked';
  if (navigation.state.index > 0) {
    drawerLockMode = 'locked-closed';
  }

  return {
    drawerLockMode,
  };
};

export default dashboardStackNavigator;