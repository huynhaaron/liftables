import React, {Component} from 'react';
import {View, Text, ListView, TouchableHighlight} from 'react-native';
import WorkoutType from './WorkoutType';

class ToDoList extends Component {
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      data: ['bench incline', 'deadlifts'],
      dataSource: ds,
    };
  }

  componentWillMount(){
    this.setState({dataSource: this.state.dataSource.cloneWithRows(this.state.data)});
  }

  renderListItem(rowData){
    return (
      <View>
        <Text>Exercise: {rowData}</Text>
        <WorkoutType />
      </View>
    );
  }

  render(){
    console.log(this.props.workoutData);
    return (
      <View style={styles.agendaStyle}>
          <Text style={styles.title}>To Do List {this.props.workoutData}</Text>
          <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderListItem.bind(this)}
          />
      </View>
    );
  }
}

const styles = {
  agendaStyle: {
    flex: 1,
    backgroundColor: 'white'
  },
  title: {
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 10,
  },
};

export default ToDoList;
