import React, {Component} from 'react';
import {View, Text, ListView, TouchableHighlight} from 'react-native';
import {Button, CardSection} from '../common';
import CheckBox from 'react-native-checkbox';
import ToDoListItem from './ToDoListItem';
import firebase from 'firebase';


class WorkoutType extends Component {
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds,
      data: [],
    };
  }

  componentWillMount(){
    let newData = this.props.exercises; //if undefined, skip.
    if(!newData) return;
    this.setState({data: newData, dataSource: this.state.dataSource.cloneWithRows(newData)});
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.exercises !== this.props.exercises) {
      this.setState({data: nextProps.exercises, dataSource: this.state.dataSource.cloneWithRows(nextProps.exercises)});
    }
  }

  renderListItem(rowData, index){
    let exerciseDescription = Object.keys(rowData)[0];
    let checked = rowData[exerciseDescription];

    return (
        <ToDoListItem
          label={rowData}
          checked={checked}
          date={this.props.date}
          index={index}
          type={this.props.type}/>
    );
  }

  render(){
    return (
      <View style={{marginTop:15}}>
        <Text style={styles.titleStyle}>Exercise: {this.props.type}</Text>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData, sectionID, rowIndex)=>this.renderListItem(rowData, rowIndex)}
            />
      </View>);
  }
}

const styles = {
  buttonStyle: {
    height: 20,
  },
  titleStyle: {
    marginBottom: 8,
    fontWeight: '500',
    fontSize: 16
  }

};

export default WorkoutType;
