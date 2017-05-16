import React from 'react';
import { Text, ScrollView } from 'react-native';
import firebase from 'firebase';
import { Card, ProgramCard } from '../common';

export default class ProgramDetail extends React.Component {
  constructor(props) {
    super(props);
    state = {name: '', description: ''};
  }

  componentDidMount() {

  }

  render() {
    return (
      <ScrollView style={{flex: 1, paddingVertical: 60 }}>
        <Card>
          <ProgramCard>
            <Text style={styles.titleStyle}> {this.state.name}</Text>
            <Text style={styles.descriptionStyle} numberOfLines={5}> {this.state.description}</Text>
          </ProgramCard>
        </Card>
      </ScrollView>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    textAlignVertical: 'center',
    fontWeight: 'bold'
  },
  descriptionStyle: {
    fontSize: 12,
    textAlignVertical: 'center',
  }
}
