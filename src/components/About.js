
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const About = ({}) => (
  <View style={styles.container}>
    <Text style={styles.headerStyle}>Liftables</Text>
    <Text style={styles.textStyle}>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </Text>
    <Text>Made with ❤️ with React Native and Firebase</Text>
    <Text>huynhaaron bpsimusic hyunckim</Text>

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
