import React, {Component} from 'react';
import {View, Text, ListView} from 'react-native';
import CheckBox from 'react-native-checkbox';


class ToDoListItem extends Component {
  constructor(props){
    super(props);
    this.state = {checked: this.props.checked};
  }

  componentWillReceiveProps(){
    this.setState({checked: this.props.checked});
  }

  onClick(){
    this.props.checkItemsTest(this.props.label);
    this.setState({checked: !this.state.checked});
  }

  render(){
    return (
        <CheckBox
          label={this.props.label}
          onChange={this.onClick.bind(this)}
          checked={this.state.checked}
        />
    );
  }

}

export default ToDoListItem;
