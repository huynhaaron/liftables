import React from 'react';
import { Text, ScrollView, View } from 'react-native';
import firebase from 'firebase';
import { Card, CardSection, ProgramCard, Button, Spinner } from '../common';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';

class ProgramShow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
                   info: {},
                   userId: '',
                   mBench: '',
                   mDeadlift: '',
                   mSquat: '',
                   mOHP: '',
                   mRow: '',
                   date: moment().format('YYYY-MM-DD')
    };
  }

  componentWillMount() {
    let that = this;
    let database = firebase.database();

    let info = firebase.database().ref('programs/' + that.props.name);
    info.once('value', function(snapshot) {
      if (snapshot.val() === null) {
        return true;
      } else {
        //info has all the description and ratios
        that.setState({info: snapshot.val()});
        //get workout program percentage/sets
        //snapshot.val().workout[0].squat.sets[0]
        // that.setState({workout: snapshot.val().workout});
      }
    });


    //get user stats
    var userId = firebase.auth().currentUser.uid;
    that.setState({userId});
    var stats = firebase.database().ref('users/' + userId);
    stats.once('value', function(snapshot) {
      if (snapshot.val() === null) {
        return true;
      } else {
        that.setState({mBench: snapshot.val().stats.mBench});
        that.setState({mDeadlift: snapshot.val().stats.mDeadlift});
        that.setState({mSquat: snapshot.val().stats.mSquat});
        that.setState({mOHP: snapshot.val().stats.mOHP});
        that.setState({mRow: snapshot.val().stats.mRow});
        // that.state.info.workout[0].squat.percent[0] * that.state.mSquat * .01
        // that.state.info.workout[0].squat.percent.map( (x) => x * that.state.mSquat * .01)
        // debugger;
      }
    })
  };

  handleSubmit() {
    //get state
    let that = this;
    const {userId, info, mBench, mDeadlift, mSquat, mOHP, mRow, date } = this.state;
    //write data
    let schedule = {};
    let days = Object.keys(info.workout);
    // let typeOfWorkout = Object.keys(info.workout)[0]
    let singleDate;
    days.forEach(day=>{
      singleDate = moment().add(day, 'days').format().slice(0,10);
      let typeOfWorkout = Object.keys(info.workout[day])[0]
      let setsDescription = [];
      schedule[singleDate]= {}
      schedule[singleDate][typeOfWorkout] = setsDescription;
      const {percent, sets} = info.workout[day][typeOfWorkout];

      let personalRecords = ["mBench", "mDeadlift", "mSquat", "mOHP", "mRow"]


      let specificWorkoutKey = personalRecords.filter(element=>{
          let temp = element.slice(1).toLowerCase();
          return typeOfWorkout === temp;
        })[0]
      let multiplier = Number(that.state[specificWorkoutKey]);
      // setsDescription.push
      for (var i = 0; i < sets.length; i++) {
        setsDescription.push(`${sets[i]} reps x ${multiplier * .01 * percent[i]} lbs`)
      }
    })
    window.moment = moment;
    // moment().add(1, 'days').format;
    firebase.database().ref('users/' + userId + '/calendars').set({
      schedule
    });
    Actions.calendar();
  }

  // handleSubmit() {
  //   const {userId, mBench, mDeadlift, mSquat, mOHP, mRow } = this.state;
  //   firebase.database().ref('users/' + userId).set({
  //     mBench: mBench,
  //     mDeadlift: mDeadlift,
  //     mSquat: mSquat,
  //     mOHP: mOHP,
  //     mRow: mRow,
  //   })
  // }

  render() {
    // debugger;
    return (
      <ScrollView style={{flex: 1, paddingVertical: 65, flexDirection: 'column' }}>
        <Text>
          {moment().format('MMMM Do YYYY, h:mm:ss a')}
        </Text>
          <Text style={styles.titleStyle}>{this.props.name}</Text>
          <Text style={styles.descriptionStyle}> {this.state.info.p1}</Text>
          <Text style={styles.descriptionStyle}> {this.state.info.p2}</Text>
          <Text style={styles.descriptionStyle}> {this.state.info.p3}</Text>
          <Text style={styles.descriptionStyle}> {this.state.info.p4}</Text>
          <Button onPress={ this.handleSubmit.bind(this) }>
            Create workout plan
          </Button>
      </ScrollView>
    );
  }
}
//
const styles = {
  titleStyle: {
    fontSize: 50,
    textAlign: 'right',
    fontWeight: 'bold'
  },
  descriptionStyle: {
    fontSize: 12,
    textAlignVertical: 'center',
    margin: 10
  }
}
//
export default ProgramShow;
