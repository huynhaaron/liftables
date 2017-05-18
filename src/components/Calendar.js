import React, {Component} from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

export default class MyCalendar extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Calendar style={styles.calendar} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  calendar: {
    borderTopWidth: 1,
    paddingTop: 100,
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: 350
  },
  text: {
    textAlign: 'center',
    borderColor: '#bbb',
    padding: 10,
    backgroundColor: '#eee'
  },
  container: {
    flex: 1,
  }
});
