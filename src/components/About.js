
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import Tabs from 'react-native-tabs';

const About = () => (
  <View style={styles.container}>

    <Text style={styles.headerStyle}>Liftables</Text>
    <Text style={styles.textStyle}>
      Liftables is an app that easily generates a workout plan for you. Start with the user stats page with your max lifts.
      Once you insert your stats, choose a workout plan and just click "Create Workout". It's as easy as that.
      Each day's workout will be in the Calendar tab where you can check off each task.
    </Text>
    <Text>Made with ❤️ using React Native and Firebase</Text>

  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    padding: 15,
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: 'justify'
  },
  headerStyle: {
    fontSize: 28
  }
});

export default About;
