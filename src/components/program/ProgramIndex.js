import React from 'react';
import { Text, View } from 'react-native';
import firebase from 'firebase';
import { Card, CardSection } from '../common';

export default class ProgramIndex extends React.Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Card>
          <CardSection>
            <Text> Jim Wendler's 5-3-1</Text>
          </CardSection>
        </Card>

        <Card>
          <CardSection>
            <Text> Starting Strength </Text>
          </CardSection>
        </Card>

        <Card>
          <CardSection>
            <Text> IceCream Fitness </Text>
          </CardSection>
        </Card>
      </View>
    );
  }
}
