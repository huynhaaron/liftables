import React, {Component} from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import ToDoList from './ToDoList';
import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import Tabs from 'react-native-tabs';


export default class MyCalendar extends Component {
  constructor(props){
    super(props);
    this.month = '';
    this.day = '';
    this.year = '';
    this.todaysDate();
    let dateKey = `${this.year}-${this.formatDate(this.month)}-${this.formatDate(this.day)}`;
    this.state = { calendar: [], workout: [], date: `${dateKey}`, page: 'calendar'};
    this.database = firebase.database();
    this.userId = firebase.auth().currentUser.uid;
  }

  componentWillMount() {
    let that = this;
    let info = firebase.database().ref('users/' + this.userId + '/calendars/schedule');
    info.once('value', function(snapshot) {
      if (snapshot.val() === null) {
        return true;
      } else {
        that.setState({ calendar: Object.keys(snapshot.val())});
      }
    });
  }

  componentDidMount(){
    let dateParam = {year: this.year, month: this.month, day: this.day};
    this.renderWorkout(dateParam);
  }

  renderWorkout(date){

    const {year, month, day} = date;
    let dateKey = `${year}-${this.formatDate(month)}-${this.formatDate(day)}`;

    let that = this;
     let info = firebase.database().ref('users/' + this.userId + '/calendars/schedule');
     info.once('value', function(snapshot) {
        if (snapshot.val() === null) {
          return true;
        } else {
 +        that.setState({ workout: snapshot.val()[dateKey], date: dateKey});
        }
      });


  }

  formatDate(date) {
    if (date < 10) {
      date = `0${date}`;
    }
    return date;
  }

  todaysDate(){
    let today = new Date();
    this.month = today.getMonth()+1;
    this.day = today.getDate();
    this.year = today.getYear() + 1900;
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
          selected = {[this.state.date, Date()]}
          onDayPress={(day)=> this.renderWorkout(day)}
          />
        <ToDoList plan={this.state.workout} date={this.state.date}/>
        <Tabs selected={this.state.page}
          style={{backgroundColor:'white', position: 'absolute', bottom: 0}}
          selectedStyle={{color:'red'}}
          selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}}
          onSelect={el=>this.setState({page:el.props.name})}>
          <Text name="first" onPress={Actions.main} >Main</Text>
          <Text name="stats" onPress={Actions.userstats} >Stats</Text>
          <Text name="programs" onPress={Actions.programs} > Programs</Text>
          <Text name="calendar" onPress={Actions.calendar} >Calendar</Text>
          <Text name="progress" onPress={Actions.progress} >Progress</Text>
        </Tabs>
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
