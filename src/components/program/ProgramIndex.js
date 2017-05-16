import React from 'react';
import { Text, ScrollView } from 'react-native';
import firebase from 'firebase';
import { Card, ProgramCard } from '../common';

export default class ProgramIndex extends React.Component {
  render() {
    return (
      <ScrollView style={{flex: 1, paddingVertical: 60 }}>
        <Card>
          <ProgramCard>
            <Text style={styles.titleStyle}> Jim Wendler's 5-3-1</Text>
            <Text style={styles.descriptionStyle} numberOfLines={5}> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
          </ProgramCard>
        </Card>

        <Card>
          <ProgramCard>
            <Text style={styles.titleStyle}> Starting Strength </Text>
            <Text style={styles.descriptionStyle} numberOfLines={5}> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
          </ProgramCard>
        </Card>

        <Card>
          <ProgramCard>
            <Text style={styles.titleStyle}> IceCream Fitness </Text>
            <Text style={styles.descriptionStyle} numberOfLines={5}> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
          </ProgramCard>
        </Card>

        <Card>
          <ProgramCard>
            <Text style={styles.titleStyle}> Lorem Ipsum </Text>
            <Text style={styles.descriptionStyle} numberOfLines={5}> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
          </ProgramCard>
        </Card>

        <Card>
          <ProgramCard>
            <Text style={styles.titleStyle}> Lorem Ipsum </Text>
            <Text style={styles.descriptionStyle} numberOfLines={5}> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
          </ProgramCard>
        </Card>

        <Card>
          <ProgramCard>
            <Text style={styles.titleStyle}> Lorem Ipsum </Text>
            <Text style={styles.descriptionStyle} numberOfLines={5}> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
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
