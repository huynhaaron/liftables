import React from 'react';
import { Text, ScrollView, View } from 'react-native';
import firebase from 'firebase';
import { Card, CardSection, ProgramCard, Button, Spinner } from '../common';

class ProgramShow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {info: {}};
  }

  componentWillMount() {
    let that = this;
    let database = firebase.database();
    let info = firebase.database().ref('programs/' + that.props.name);
    console.log(info);
    info.once('value', function(snapshot) {
      if (snapshot.val() === null) {
        return true;
      } else {
        that.setState({info: snapshot.val()});
      }
    });
  };
//
  render() {
    return (
      <ScrollView style={{flex: 1, paddingVertical: 65, flexDirection: 'column' }}>
          <Text style={styles.titleStyle}>{this.props.name}</Text>
          <Text style={styles.descriptionStyle}> {this.state.info.p1}</Text>
          <Text style={styles.descriptionStyle}> {this.state.info.p2}</Text>
          <Text style={styles.descriptionStyle}> {this.state.info.p3}</Text>
          <Text style={styles.descriptionStyle}> {this.state.info.p4}</Text>

        <Card>
          <Button>
            Create workout plan
          </Button>
        </Card>
      </ScrollView>
    );
  }
}
//
const styles = {
  titleStyle: {
    fontSize: 50,
    textAlign: 'right',
    fontWeight: 'bold'
  },
  descriptionStyle: {
    fontSize: 12,
    textAlignVertical: 'center',
    margin: 10
  }
}
//
export default ProgramShow;
