import React, {Component} from 'react';
import {View, Text, ListView} from 'react-native';
import CheckBox from 'react-native-checkbox';
import firebase from 'firebase';

class ToDoListItem extends Component {
  constructor(props){
    super(props);
    this.state = {checked: this.props.checked};
  }

  componentWillMount(){
    this.setState({checked: this.props.checked});
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.date !== this.props.date) {
      this.setState({checked: nextProps.checked});
    }
  }

  checkItems(index){
    let userId = firebase.auth().currentUser.uid;
    let date = this.props.date;
    let type = this.props.type;
    let boolean = !this.state.checked;
    let description = Object.keys(this.props.label)[0];
    let newValue = {[description]: boolean};
    let ref = firebase.database().ref('users/' + userId + `/calendars/schedule/${date}/${type}`);
      ref.child(index).set(newValue).then(()=>{
          this.setState({checked: boolean});
        });
}



  render(){
    let description = Object.keys(this.props.label)[0];
    return (
        <CheckBox
          label={description}
          onChange={()=>{this.checkItems(this.props.index);}}
          checked={this.state.checked}
        />
    );
  }

}

export default ToDoListItem;
