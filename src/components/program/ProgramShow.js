import React from 'react';
import { Text, ScrollView, View } from 'react-native';
import firebase from 'firebase';
import { Card, CardSection, ProgramCard, Button, Spinner } from '../common';

class ProgramShow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {loading: true,
                  info: {},
                  name: '',
                  p1: '',
                  p2: '',
                  p3: '',
                  p4: ''};
    // this.onEnter();
  }

  // onEnter() {
  //   let database = firebase.database();
  //   let info = firebase.database().ref('programs/' + this.props.name);
  //   // debugger;
  //   this.setState({loading: false});
  // };
  //
  componentDidMount() {
    let that = this;
    let database = firebase.database();
    let info = firebase.database().ref('programs/' + that.props.name);
    info.once('value', function(snapshot) {
        that.setState({info: snapshot.val()});
        that.setState({name: that.props.name});
        that.setState({p1: snapshot.val().p1});
        that.setState({p2: snapshot.val().p2});
        that.setState({p3: snapshot.val().p3});
        that.setState({p4: snapshot.val().p4});
    });
    // debugger;
    // that.onEnter();
  };

  render() {
    // if (this.state.loading) {
    //   return <Spinner size="large"/>;
    // };

    return (
      <ScrollView style={{flex: 1, paddingVertical: 65, flexDirection: 'column' }}>
        <Card>
          <Text style={styles.titleStyle}>{this.props.name}</Text>
          {/* <Text style={styles.descriptionStyle}> {this.state.p1}</Text>
          <Text style={styles.descriptionStyle}> {this.state.p2}</Text>
          <Text style={styles.descriptionStyle}> {this.state.p3}</Text>
          <Text style={styles.descriptionStyle}> {this.state.p4}</Text> */}
        </Card>

        <Card>
          <Button>
            Create workout plan
          </Button>
        </Card>
      </ScrollView>
    );
  }
}

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

export default ProgramShow;
