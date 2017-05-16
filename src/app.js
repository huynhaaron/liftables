import React, { Component } from 'react';
import { ScrollView , Text, View } from 'react-native';
import {Scene, Router, Actions} from 'react-native-router-flux';

import firebase from 'firebase';
import { Header, Card, CardSection, Spinner, Button } from './components/common';

import Main from './components/Main';
import UserStats from './components/user/UserStats';
import ProgramIndex from './components/program/ProgramIndex';
import LoginForm from './components/LoginForm';
import ProgramDetail from './components/program/ProgramDetail';
import ProgramShow from './components/program/ProgramShow';

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
      // <View style={{flex: 1,  justifyContent: 'center'}}>
      //   {/* <Header headerText="Liftables"/> */}
      //   {this.renderContent()}
      // </View>
      <Router>
        <Scene key="root">
          <Scene key="loginform" component={LoginForm} title="Liftables" initial={true} />
          <Scene key="main" component={Main} title="Liftables" />
          <Scene key="userstats" component={UserStats} title="Settings" />
          <Scene key="programs" component={ProgramIndex} title="Programs" />
          <Scene key="programdetail" component={ProgramDetail} title="Program Detail" />
          <Scene key="programshow" component={ProgramShow} title="Program Show" />
        </Scene>
      </Router>
    )
  }
}


export default App;
