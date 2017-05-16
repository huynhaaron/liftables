import React, { Component } from 'react';
import { ScrollView , Text, View } from 'react-native';
import firebase from 'firebase';
import { Header, Card, CardSection, Spinner, Button } from './components/common';

import UserStats from './components/user/UserStats';
import ProgramIndex from './components/program/ProgramIndex';
import LoginForm from './components/LoginForm';


class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyDjP5ckW9bmUhwI_h7Pes0QZdFhngrm51o",
      authDomain: "liftables.firebaseapp.com",
      databaseURL: "https://liftables.firebaseio.com",
      projectId: "liftables",
      storageBucket: "liftables.appspot.com",
      messagingSenderId: "592860975619"
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true});
      } else {
        this.setState({ loggedIn: false});
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <View>
            <ProgramIndex/>
            <UserStats/>
            <CardSection>
              <Button onPress={() => {
                firebase.auth().signOut()
              }}>
                Log Out
              </Button>
            </CardSection>
          </View>
        )
      case false:
        return <LoginForm />;
      default:
      return <Spinner size="large" />
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Liftables"/>
        {this.renderContent()}
      </View>
    )
  };
}

const styles = {
  appStyle: {
    backgroundColor: 'white',
    flex: 1
  }
};

export default App;
