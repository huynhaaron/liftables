
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const About = ({}) => (
  <View style={styles.container}>
    <Text style={styles.headerStyle}>Liftables</Text>
    <Text style={styles.textStyle}>
      Liftables is a app to easily generate a workout plan for you. Start with the user stats page with your max lifts.
      Once you insert your stats, choose a workout plan and just click the "Create Workout Button". It's as easy as that.
      All the workout seperated by day will be in the Calendar tab where you can tick off each task.
    </Text>
    <Text >Made with ❤️ using React Native and Firebase</Text>
    <Text >huynhaaron bpsimusic hyunckim</Text>

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
    paddingRight: 20
  },
  headerStyle: {
    fontSize: 28
  }
});

export default About;
