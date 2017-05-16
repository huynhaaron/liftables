import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import Header from './header';


let WorkoutMenu = ()=>{
  const {viewStyle} = styles;
  return (
    <View style={{flex: 1}}>
      <Header headerText={"Select your Workout"} />
      <View style={viewStyle}><Text>Workout A</Text></View>
      <View style={viewStyle}><Text>Workout B</Text></View>
      <View style={viewStyle}><Text>Workout C</Text></View>
      <View style={viewStyle}><Text>Workout D</Text></View>
      <View style={viewStyle}><Text>Workout E</Text></View>
    </View>
  );
};


const styles = {
  viewStyle: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  }
};


export default WorkoutMenu;
