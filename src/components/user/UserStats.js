import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import firebase from 'firebase';
import { Header, Input, CardSection, Card, Button, Spinner } from '../common';
import { Actions } from 'react-native-router-flux';
import Tabs from 'react-native-tabs';


class UserStats extends Component {
  state = {userId: '',
           mWeight: '100',
           mBench: '100',
           mCurls: '100',
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

    let info = firebase.database().ref('users/' + userId + `/stats`);
    info.once('value', function(snapshot) {
      if (snapshot.val() === null) {
        return true;
      } else {
        that.setState({mWeight: snapshot.val().mWeight,
          mBench: snapshot.val().mBench,
        mCurls: snapshot.val().mCurls,
        mDeadlift: snapshot.val().mDeadlift,
        mSquat: snapshot.val().mSquat,
        mOHP: snapshot.val().mOHP,
        mPowerclean: snapshot.val().mPowerclean,
        mPress: snapshot.val().mPress,
        mChinup: snapshot.val().mChinup,
        mRow: snapshot.val().mRow});
      }
    })
  }

  componentWillUpdate(prevProps, prevState) {
    if (prevState.loading === true) {
      setTimeout(() => {this.setState({loading: false})}, 500)
    }
  }

  handleSubmit() {
    const {userId, mWeight, mBench, mCurls, mDeadlift, mSquat, mOHP, mRow, mPowerclean, mPress, mChinup } = this.state;
    firebase.database().ref('users/' + userId).update({
      stats: {
      mWeight,
      mBench,
      mCurls,
      mDeadlift,
      mSquat,
      mOHP,
      mRow,
      mPress,
      mPowerclean,
      mChinup}
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
       <ScrollView style={{flex: 1, paddingVertical: 60}}>
        <Card>
          <Header headerText="Your Max Lifts"/>
          <CardSection>
            <Input
              label="Weight"
              placeholder="Your Weight in lb."
              value={this.state.mWeight}
              onChangeText={mWeight => this.setState({mWeight})}
            />
          </CardSection>
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
              label="Max Curl"
              placeholder="Max Curl in lb."
              value={this.state.mCurls}
              onChangeText={mCurls => this.setState({mCurls})}
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
      <View style={styles.blankStyle} />

     </ScrollView>

        <Tabs selected={this.state.page}
          style={{backgroundColor:'white', position: 'absolute', bottom: 0}}
          selectedStyle={{color:'red'}}
          selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}}
          onSelect={el=>this.setState({page:el.props.name})}>
          <Text name="about" onPress={Actions.about} >About</Text>
          <Text name="stats" onPress={Actions.userstats} >Stats</Text>
          <Text name="programs" onPress={Actions.programs} >Programs</Text>
          <Text name="calendar" onPress={Actions.calendar} >Calendar</Text>
          <Text name="progress" onPress={Actions.progress} >Progress</Text>

        </Tabs>
      </View>

    );
  }
}

const styles = {
  blankStyle: {
    height: 120
  }
}

export default UserStats;
