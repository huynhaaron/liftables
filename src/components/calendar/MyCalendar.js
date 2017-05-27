import React, {Component} from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import ToDoList from './ToDoList';
import firebase from 'firebase';

export default class MyCalendar extends Component {
  constructor(props){
    super(props);
    this.state = { calendar: [], workout: [], date: ''};
    this.database = firebase.database();
    this.userId = firebase.auth().currentUser.uid;
  }

  componentWillMount() {
    let that = this;
    let info = firebase.database().ref('users/' + this.userId);

    let todaysDate = new Date();
    let year = todaysDate.getYear() + 1900;
    let month = todaysDate.getMonth() + 1;
    let day = todaysDate.getDate();

    this.renderWorkout({year, month, day});

    info.once('value', function(snapshot) {
      if (snapshot.val() === null) {
        return true;
      } else {
        that.setState({ calendar: Object.keys(snapshot.val().calendar)});
      }
    });
  }

  renderWorkout(date){

    const {year, month, day} = date;
    let dateKey = `${year}-${this.formatDate(month)}-${this.formatDate(day)}`;

    let that = this;
    let info = firebase.database().ref('users/' + this.userId);
    info.once('value', function(snapshot) {
      if (snapshot.val() === null) {
        return true;
      } else {
        that.setState({ workout: snapshot.val().calendar[`${dateKey}`],
                        date: dateKey});
      }
    });

  }

  formatDate(date) {
    if (date < 10) {
      date = `0${date}`;
    }
    return date;
  }

  render() {
    let markedDate = {};

    this.state.calendar.forEach(date => {
      markedDate[date] = [{startingDay: true, color: 'yellow'},
        {endingDay: true, color: 'yellow'}];
    });

    return (
      <View style={styles.containerStyle}>
        <Calendar style={styles.calendarStyle}
          markedDates = { markedDate }
          markingType = {'interactive'}
          selected = {['2017-05-23', Date()]}
          onDayPress={(day)=> this.renderWorkout(day)}
          />
        <ToDoList plan={this.state.workout} date={this.state.date}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  calendarStyle: {
    borderTopWidth: 1,
    paddingTop: 65,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  containerStyle: {
    flex: 1,

  }
});
