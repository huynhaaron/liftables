import React, {Component} from 'react';
import {View, Text, ListView, TouchableHighlight, ScrollView} from 'react-native';
import WorkoutType from './WorkoutType';

class ToDoList extends Component {
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      workoutData: [],
      dataSource: ds,
      date: ''
    };
  }

  componentWillMount(){
    this.setState({dataSource: this.state.dataSource.cloneWithRows(this.state.workoutData)});
  }

  componentWillReceiveProps(nextProps){
    if (!nextProps.plan || nextProps.plan.length ===0 ) {
      if(nextProps.date.length > 0) {
        this.setState({workoutData: [],
                       dataSource: this.state.dataSource.cloneWithRows([]),
                       date: nextProps.date});
      }
      return;
    }
    let entireWorkoutInfo = nextProps.plan;

    let workoutTypes = Object.keys(entireWorkoutInfo);
    let refactoredWorkoutData = [];
    for (let i = 0; i < workoutTypes.length; i++) {
       let type = workoutTypes[i];
       let setWeightData = entireWorkoutInfo[type];
       refactoredWorkoutData.push({[type]: setWeightData});
    }
    this.setState({workoutData: refactoredWorkoutData,
                   dataSource: this.state.dataSource.cloneWithRows(refactoredWorkoutData),
                   date: nextProps.date});

  }

  renderListItem(rowData){
    if (this.state.workoutData.length==0) {
      return <View>

      </View>;
    }
    let type = Object.keys(rowData)[0];
    if(type === 'complete'){
      return <View>

      </View>;
    }
    let exercises = rowData[type];

    return (
      <View>
        <WorkoutType type={type} exercises={exercises} date={this.state.date}/>
      </View>
    );
  }

  render(){
    return (
      <View style={styles.agendaStyle}>
        <ScrollView style={{flex:1}}>
          <Text style={styles.title}>To Do List {this.state.date}</Text>
          <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderListItem.bind(this)}
          enableEmptySections
          />
        <View style={{height: 120}} />
        </ScrollView>
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
