import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Header, Input, CardSection, Card, Button } from '../common';

class UserStats extends Component {
  state = {userId: '', mBench: '', mDeadlift:'', mSquat:''};

  componentDidMount() {
    let that = this;
    var database = firebase.database();

    var userId = firebase.auth().currentUser.uid;
    that.setState({userId});

    var info = firebase.database().ref('users/' + userId);
    info.on('value', function(snapshot) {
      that.setState({mBench: snapshot.val().mBench});
      that.setState({mDeadlift: snapshot.val().mDeadlift});
      that.setState({mSquat: snapshot.val().mSquat});
    });
  }

  handleSubmit() {
    // debugger;
    const {userId, mBench, mDeadlift, mSquat } = this.state;
    firebase.database().ref('users/' + userId).set({
      mBench: mBench,
      mDeadlift: mDeadlift,
      mSquat: mSquat
    })
  }

  render() {
    return (
      <Card>
        <Header headerText="Your Max Lifts"/>
        <CardSection>
          <Input
            label="Max Bench"
            placeholder="Max Bench in lb."
            value={`${this.state.mBench} lb`}
            onChangeText={mBench => this.setState({mBench})}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Max Deadlift"
            placeholder="Max Deadlift in lb."
            value={`${this.state.mDeadlift} lb`}
            onChangeText={mDeadlift => this.setState({mDeadlift})}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Max Squat"
            placeholder="Max Squat in lb."
            value={`${this.state.mSquat} lb`}
            onChangeText={mSquat => this.setState({mSquat})}
          />
        </CardSection>
        <CardSection>
          <Button onPress={this.handleSubmit.bind(this)}>
            Save Lifts
          </Button>
        </CardSection>
      </Card>
    );
  }
}

export default UserStats;
