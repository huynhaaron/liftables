import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { Header, Input, CardSection, Card, Button, Spinner } from '../common';
import { Actions } from 'react-native-router-flux';
import Tabs from 'react-native-tabs';


class Progress extends Component {
  state = {
         page: 'progress',
       loading: true,
     info: {},
     weight: ''
   };

  componentWillMount(){
    let that = this;
    let currentUser = firebase.auth().currentUser.uid;
    let info = firebase.database().ref('users/' + currentUser + '/data')
    info.once('value', function(snapshot){
      that.setState({ info: snapshot.val(), loading: false});
    });
    let weight = firebase.database().ref('users/' + currentUser + '/stats')
    weight.once('value', function(snapshot){
      if (snapshot.val() === null){
        that.setState({weight: '', loading: false});
        return true;
      }
      that.setState({ weight: snapshot.val().mWeight, loading: false});
    });
  }

  loading(){
    if (this.state.loading) {
      return <Spinner size="small"/>;
    } else {
      return <Card>
        <Header headerText="Your Progress"/>
        <CardSection>
          <Text>Workouts Completed: {this.state.info.completed}</Text>
        </CardSection>
        <CardSection>
          <Text>Current Weight: {this.state.weight}</Text>
        </CardSection>
        <CardSection>
          <Text>Days left in current workout: {this.state.info.daysLeft}</Text>
        </CardSection>
        <CardSection>
          <Text>Days completed in current workout: {this.state.info.daysDone}</Text>
        </CardSection>
        <CardSection>
          <Text>User Since: {this.state.info.userSince}</Text>
        </CardSection>
      </Card>
    }
  }

  render() {


    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
          {this.loading()}

        <Tabs selected={this.state.page}
          style={{backgroundColor:'white', position: 'absolute', bottom: 0}}
          selectedStyle={{color:'red'}}
          selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}}
          onSelect={el=>this.setState({page:el.props.name})}>
          <Text name="first" onPress={Actions.about}>About</Text>
          <Text name="stats" onPress={Actions.userstats}>Stats</Text>
          <Text name="third" onPress={Actions.programs}>Programs</Text>
          <Text name="fourth" onPress={Actions.calendar}>Calendar</Text>
          <Text name="fifth" onPress={Actions.progress}>Progress</Text>
        </Tabs>
      </View>

    );
  }
}

export default Progress;
