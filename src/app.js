import React, { Component } from 'react';
import { ScrollView , Text, View } from 'react-native';
import {Scene, Router, Actions} from 'react-native-router-flux';

import firebase from 'firebase';
import { Header, Card, CardSection, Spinner, Button } from './components/common';

import Main from './components/Main';
import About from './components/About';
import UserStats from './components/user/UserStats';
import ProgramIndex from './components/program/ProgramIndex';
import LoginForm from './components/LoginForm';
import ProgramShow from './components/program/ProgramShow';
import MyCalendar from './components/calendar/MyCalendar';
import Progress from './components/progress/Progress';

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

  logout(){
    firebase.auth().signOut()
      .then(()=>{
        Actions.auth({type:'reset'})});
  }

  render() {
    return (
      <Router>
        <Scene key="auth">
          <Scene key="loginform" hideNavBar component={LoginForm} title="Liftables" initial={true} />
        </Scene>
        <Scene key="root" rightTitle="Logout" onRight={this.logout.bind(this)}>
          <Scene key="main" component={Main} title="Liftables" />
          <Scene key="about" component={About} title="About" />
          <Scene key="userstats" component={UserStats} title="Settings" />
          <Scene key="programs" component={ProgramIndex} title="Programs"/>
          <Scene key="programshow" component={ProgramShow} title="Program"/>
          <Scene key="calendar" component={MyCalendar} title="Calendar" />
          <Scene key="progress" component={Progress} title="Progress" />
        </Scene>
      </Router>
    )
  }
}

console.ignoredYellowBox = ['Remote debugger']; //for debugging purposes
export default App;
