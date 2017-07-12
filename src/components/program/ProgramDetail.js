import React from 'react';
import { Text, View } from 'react-native';
import firebase from 'firebase';
import { Card, ProgramCard } from '../common';

export default class ProgramDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '', description: ''};
  }

  componentDidMount() {
    let that = this;
    let database = firebase.database();
    let info = firebase.database().ref('programs/' + that.props.name);
    info.on('value', function(snapshot) {
      if (snapshot.val() === null) {
        return true;
      } else {
        that.setState({name: snapshot.val().name});
        that.setState({description: snapshot.val().description});
      }
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Text style={styles.titleStyle} >{this.state.name}</Text>
        <Text style={styles.descriptionStyle} numberOfLines={5}> {this.state.description}</Text>
      </View>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 8,
    textAlignVertical: 'center',
    fontWeight: 'bold',
    backgroundColor: 'green'
  },
  descriptionStyle: {
    fontSize: 12,
    textAlignVertical: 'center',
  }
};
