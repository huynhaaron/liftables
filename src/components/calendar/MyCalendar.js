import React, {Component} from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import ToDoList from './ToDoList';

export default class MyCalendar extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <Calendar style={styles.calendarStyle} />
        <ToDoList />
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
