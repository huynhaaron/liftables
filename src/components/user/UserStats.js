import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { Header, Input, CardSection, Card, Button, Spinner } from '../common';
import { Actions } from 'react-native-router-flux';

class UserStats extends Component {
  state = {userId: '',
           mBench: '',
           mDeadlift: '',
           mSquat: '',
           mOHP: '',
           mRow: '',
           loading: true};

  componentDidMount() {
    let that = this;
    var database = firebase.database();

    var userId = firebase.auth().currentUser.uid;
    that.setState({userId});

    var info = firebase.database().ref('users/' + userId);
    info.on('value', function(snapshot) {
      if (snapshot.val() === null) {
        return true;
      } else {
        that.setState({mBench: snapshot.val().mBench});
        that.setState({mDeadlift: snapshot.val().mDeadlift});
        that.setState({mSquat: snapshot.val().mSquat});
        that.setState({mOHP: snapshot.val().mOHP});
        that.setState({mRow: snapshot.val().mRow});
      }
    });
  }

  componentWillUpdate(prevProps, prevState) {
    if (prevState.loading === true) {
      setTimeout(() => {this.setState({loading: false})}, 500)
    }
  }

  handleSubmit() {
    const {userId, mBench, mDeadlift, mSquat, mOHP, mRow } = this.state;
    firebase.database().ref('users/' + userId).set({
      mBench: mBench,
      mDeadlift: mDeadlift,
      mSquat: mSquat,
      mOHP: mOHP,
      mRow: mRow,
    })
  }

  render() {
    if (this.state.loading) {
      return <Spinner size="small"/>;
    }

    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Card>
          <Header headerText="Your Max Lifts"/>
          <CardSection>
            <Input
              label="Max Bench"
              placeholder="Max Bench in lb."
              value={this.state.mBench}
              onChangeText={mBench => this.setState({mBench})}
            />
          </CardSection>

          <CardSection>
            <Input
              label="Max Deadlift"
              placeholder="Max Deadlift in lb."
              value={this.state.mDeadlift}
              onChangeText={mDeadlift => this.setState({mDeadlift})}
            />
          </CardSection>

          <CardSection>
            <Input
              label="Max Squat"
              placeholder="Max Squat in lb."
              value={this.state.mSquat}
              onChangeText={mSquat => this.setState({mSquat})}
            />
          </CardSection>

          <CardSection>
            <Input
              label="Max OHP"
              placeholder="Max Overhead Press in lb."
              value={this.state.mOHP}
              onChangeText={mOHP => this.setState({mOHP})}
            />
          </CardSection>

          <CardSection>
            <Input
              label="Max Row"
              placeholder="Max Row in lb."
              value={this.state.mRow}
              onChangeText={mRow => this.setState({mSquat})}
            />
          </CardSection>

          <CardSection>
            <Button onPress={this.handleSubmit.bind(this)}>
              Save Lifts
            </Button>
          </CardSection>
        </Card>
      </View>
    );
  }
}

export default UserStats;
