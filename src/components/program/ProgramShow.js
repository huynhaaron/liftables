import React from 'react';
import { Text, ScrollView, View, Alert } from 'react-native';
import firebase from 'firebase';
import { Card, CardSection, ProgramCard, Button, Spinner } from '../common';
import moment from 'moment';
import {Scene, Router, Actions} from 'react-native-router-flux';


class ProgramShow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
                   info: {},
                   userId: '',
                   mBench: '',
                   mCurls: '',
                   mDeadlift: '',
                   mSquat: '',
                   mOHP: '',
                   mRow: '',
                   mPress: '',
                   mChinup: '',
                   mPowerclean: '',
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
      }
    });


    //get user stats
    let userId = firebase.auth().currentUser.uid;
    that.setState({userId});
    let stats = firebase.database().ref('users/' + userId + '/stats');
    stats.once('value', function(snapshot) {
      if (snapshot.val() === null) {
        return true;
      } else {
        that.setState({mBench: snapshot.val().mBench,
          mCurls: snapshot.val().mCurls,
        mDeadlift: snapshot.val().mDeadlift,
        mSquat: snapshot.val().mSquat,
        mOHP: snapshot.val().mOHP,
        mRow: snapshot.val().mRow,
        mPowerclean: snapshot.val().mPowerclean,
        mPress: snapshot.val().mPress,
        mChinup: snapshot.val().mChinup});
      }
    });
  }

  //handleSubmit takes user data and populates workout
  handleSubmit() {
    let that = this;
    const {userId, info, mBench, mCurls, mDeadlift, mSquat, mOHP, mRow, mPress, mChinup, mPowerclean, date } = this.state;
    let schedule = {};

    let days = Object.keys(info.workout);
    let singleDate;
    days.forEach(day=>{
      singleDate = moment().add(day, 'days').format().slice(0,10);

      let typeOfWorkout = Object.keys(info.workout[day]);
      let setsDescription;
      schedule[singleDate]= {};
      //nested loop required for workout types and sets
      typeOfWorkout.forEach(workoutType => {
        setsDescription = [];
        schedule[singleDate][workoutType] = setsDescription;
        const {percent, sets} = info.workout[day][workoutType];

        let personalRecords = ["mBench", "mCurls", "mDeadlift", "mSquat", "mOHP", "mRow", "mPress", "mChinup", "mPowerclean"];
        let specificWorkoutKey = personalRecords.filter(element=>{
            let temp = element.slice(1).toLowerCase();
            return workoutType === temp;
          })[0];
        let multiplier = Number(that.state[specificWorkoutKey]);
        for (var i = 0; i < sets.length; i++) {
          let workoutDescription;

          if (specificWorkoutKey === 'mChinup') {

            let numReps = Math.ceil(multiplier * .01 * percent[i]);
            workoutDescription = {[`${numReps} reps`]: false};
          }
          else if (sets[i] === "AMRAP"){
            workoutDescription = {[`As many reps as possible x ${multiplier * .01 * percent[i]} lbs`]: false};

          }
          // makes it just the reps if the workout is not in the user stats ie "barbell shrug"
          else if (isNaN(multiplier)) {
            workoutDescription = {[`${sets[i]} reps`]: false}
          }
          else {
            let weight = Math.floor(multiplier * .01 * percent[i]);
            workoutDescription  = {[`${sets[i]} reps x ${weight} lbs`]: false};
          }
          setsDescription.push(workoutDescription);
        }
      });
    });

    let calendar = firebase.database().ref('users/' + userId + '/calendars');
    calendar.once('value', function(snapshot) {
      if (snapshot.val() === null) {
        let stats = firebase.database().ref('users/' + userId + '/stats')
        stats.once('value', function(statsSnapshot){
          if(statsSnapshot.val() === null){
            Alert.alert(
                  'ERROR',
                  'You must fill in your personal stats!',
                  [
                    {text: 'OK, take me to stats page', onPress: () => {
                      Actions.userstats();
                    }}
                  ],
                  { cancelable: true }
            );
          } else {
            firebase.database().ref('users/' + userId + '/calendars').set({
              schedule,
              complete: false
            });
            Actions.calendar();
          }
        });
      } else {
        Alert.alert(
              'ERROR',
              'You already have a workout in progress',
              [
                {text: 'OK, take me back', onPress: () => console.log('OK Pressed')},
                {text: 'I understand, start new workout', onPress: () => {
                                              firebase.database().ref('users/' + userId + '/calendars').remove();
                                              firebase.database().ref('users/' + userId + '/calendars').set({
                                                schedule,
                                                complete: false

                                              });
                                              Actions.calendar();
                                            }}
              ],
              { cancelable: true }
        );
      }
    });
  }

  grabInfo(){


    if (!this.state.info.workout){
      return (<View>

      </View>);
    } else {
      return (<Button onPress={this.handleSubmit.bind(this)}>
        Create workout plan
      </Button>);
    }
  }

  render() {
    return (
      <ScrollView style={{flex: 1, paddingVertical: 65, flexDirection: 'column'}}>

          <Text style={styles.titleStyle} numberOfLines={1}>{this.props.name}</Text>
          <Text style={styles.descriptionStyle}>{this.state.info.p1}</Text>
          <Text style={styles.descriptionStyle}>{this.state.info.p2}</Text>
          <Text style={styles.descriptionStyle}>{this.state.info.p3}</Text>
          <View style={styles.buttonStyle}>
            {this.grabInfo()}
          </View>
          <View style={styles.blankStyle} />
      </ScrollView>
    );
  }
}

const styles = {
  blankStyle: {
    height: 120
  },
  buttonStyle: {
    flex: 1,
    margin: 20
  },
  descriptionStyle: {
    fontSize: 14,
    textAlign: 'justify',
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 20,
  },
  titleStyle: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 20
  }
};
//
export default ProgramShow;
