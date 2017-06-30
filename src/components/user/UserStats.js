import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { Header, Input, CardSection, Card, Button, Spinner } from '../common';
import { Actions } from 'react-native-router-flux';
import Tabs from 'react-native-tabs';


class UserStats extends Component {
  state = {userId: '',
           mBench: '100',
           mDeadlift: '100',
           mSquat: '100',
           mOHP: '100',
           mRow: '100',
           mPress: '100',
           mPowerclean: '100',
           mChinup: '10',
           loading: true,
         page: 'stats'};

  componentDidMount() {
    let that = this;
    let database = firebase.database();

    let userId = firebase.auth().currentUser.uid;
    that.setState({userId});

    let info = firebase.database().ref('users/' + userId);
    info.once('value', function(snapshot) {
      if (snapshot.val() === null) {
        return true;
      } else {
        that.setState({mBench: snapshot.val().Stats.mBench,
        mDeadlift: snapshot.val().Stats.mDeadlift,
        mSquat: snapshot.val().Stats.mSquat,
        mOHP: snapshot.val().Stats.mOHP,
        mPowerclean: snapshot.val().Stats.mPowerclean,
        mPress: snapshot.val().Stats.mPress,
        mChinup: snapshot.val().Stats.mChinup,
        mRow: snapshot.val().Stats.mRow});
      }
    })
  }

  componentWillUpdate(prevProps, prevState) {
    if (prevState.loading === true) {
      setTimeout(() => {this.setState({loading: false})}, 500)
    }
  }

  handleSubmit() {
    const {userId, mBench, mDeadlift, mSquat, mOHP, mRow, mPowerclean, mPress, mChinup } = this.state;
    firebase.database().ref('users/' + userId).set({
      Stats: {
      mBench: mBench,
      mDeadlift: mDeadlift,
      mSquat: mSquat,
      mOHP: mOHP,
      mRow: mRow,
      mPress: mPress,
      mPowerclean: mPowerclean,
      mChinup: mChinup}
    })
  }

  handleDelete() {
    const { userId } = this.state;
    firebase.database().ref('users/' + userId + '/calendars').remove();
    Actions.main();

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
              onChangeText={mRow => this.setState({mRow})}
            />
          </CardSection>

          <CardSection>
            <Input
              label="Max Press"
              placeholder="Max Press in lb."
              value={this.state.mPress}
              onChangeText={mPress => this.setState({mPress})}
            />
          </CardSection>

          <CardSection>
            <Input
              label="Max Chinup"
              placeholder="Max Chinup in reps"
              value={this.state.mChinup}
              onChangeText={mChinup => this.setState({mChinup})}
            />
          </CardSection>

          <CardSection>
            <Input
              label="Max Powerclean"
              placeholder="Max Powerclean in lb."
              value={this.state.mPowerclean}
              onChangeText={mPowerclean => this.setState({mPowerclean})}
            />
          </CardSection>

          <CardSection>
            <Button onPress={this.handleSubmit.bind(this)}>
              Save Lifts
            </Button>

            <Button onPress={this.handleDelete.bind(this)}>
              Delete Workout
            </Button>
          </CardSection>
        </Card>
        <Tabs selected={this.state.page}
          style={{backgroundColor:'white', position: 'absolute', bottom: 0}}
          selectedStyle={{color:'red'}}
          selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}}
          onSelect={el=>this.setState({page:el.props.name})}>
          <Text name="first" onPress={Actions.main} >Main</Text>
          <Text name="stats" onPress={Actions.userstats} >Stats</Text>
          <Text name="programs" onPress={Actions.programs} > Programs</Text>
          <Text name="calendar" onPress={Actions.calendar} >Calendar</Text>
          <Text name="fifth">Settings</Text>
        </Tabs>
      </View>

    );
  }
}

export default UserStats;
