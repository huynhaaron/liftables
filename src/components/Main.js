import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Tabs from 'react-native-tabs';


import ProgramIndex from './program/ProgramIndex';
import UserStats from './user/UserStats';

class Main extends Component {

  state = {page:'third'};

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ProgramIndex />

        <Tabs selected={this.state.page} style={{backgroundColor:'white'}}
          selectedStyle={{color:'red'}}
          selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}}
          onSelect={el=>this.setState({page:el.props.name})}>
          <Text name="first" onPress={Actions.main} >Main</Text>
          <Text name="stats" onPress={Actions.userstats} >Stats</Text>
          <Text name="third" onPress={Actions.programs} > Programs</Text>
          <Text name="fourth">Calendar</Text>
          <Text name="fifth">Settings</Text>
        </Tabs>

      </View>

    );
  }
}


export default Main;
