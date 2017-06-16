import React, {Component} from 'react';
import {View, Text, ListView, TouchableHighlight} from 'react-native';
import {Button, CardSection} from '../common';
import CheckBox from 'react-native-checkbox';
import ToDoListItem from './ToDoListItem';



class WorkoutType extends Component {
  constructor(props){
    super(props);
    this.checked = [];
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      data: [],
      dataSource: ds,
    };
  }

  componentWillMount(){
    let newData = this.props.exercises; //if undefined, skip.
    if(!newData) return;

    this.setState({dataSource: this.state.dataSource.cloneWithRows(newData)});
  }

  componentWillReceiveProps(nextProps){
    let newData = nextProps.exercises;
    this.setState({data: newData, dataSource: this.state.dataSource.cloneWithRows(newData)});
  }

  checkItems(rowData){
    if (this.checked.includes(rowData)){
      this.checked.splice(this.checked.indexOf(rowData), 1);
    } else {
      this.checked.push(rowData);
    }
  }

  clearCheckedItems(){
    let newData = this.state.data.slice();

    this.checked.forEach(checkedItem=>{
      if(newData.includes(checkedItem)){
        newData.splice(newData.indexOf(checkedItem), 1);
      }
    });
    this.checked = [];
    this.setState({
      data: newData,
      dataSource: this.state.dataSource.cloneWithRows(newData)
    });
  }

  renderListItem(rowData){
    return (
      <ToDoListItem
        label={rowData}
        checkItemsTest={this.checkItems.bind(this)}
        checked={false}/>
    );
  }

  render(){
    return (
      <View>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderListItem.bind(this)}
            />
          <Button style={styles.buttonStyle}
            onPress={this.clearCheckedItems.bind(this)}>
            Clear Completed
          </Button>
      </View>);
  }
}

const styles = {
  buttonStyle: {
    height: 20,
  }

};

export default WorkoutType;
