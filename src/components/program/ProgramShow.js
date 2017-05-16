import React from 'react';
import { Text, View } from 'react-native';
import firebase from 'firebase';
import { Card, ProgramCard } from '../common';

export default class ProgramShow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Text>In Program Show</Text>
        <Text style={styles.titleStyle}>{this.state.name}</Text>
        <Text style={styles.descriptionStyle} numberOfLines={5}> {this.state.description}</Text>
      </View>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 24,
    textAlignVertical: 'center',
    fontWeight: 'bold'
  },
  descriptionStyle: {
    fontSize: 12,
    textAlignVertical: 'center',
  }
}
