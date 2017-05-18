import React from 'react';
import { Image, Text, ScrollView, View, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import { Card, CardSection } from '../common';
import { Actions } from 'react-native-router-flux';

export default class ProgramIndex extends React.Component {

  render() {
    return (
      <ScrollView style={{flex: 1, paddingVertical: 60 }}>
          <TouchableOpacity style={styles.cardStyle} onPress={Actions.programshow({name: "Jim Wendler's 5-3-1"})} >
            <Image style={styles.imageStyle}  source={{uri: 'https://res.cloudinary.com/booklog/image/upload/v1494958059/Liftables/barbell-bench-press.png'}}/>
            <View style={styles.textStyle}>
              <Text style={styles.titleStyle} >Jim Wendler's 5-3-1</Text>
              <Text style={styles.descriptionStyle} numberOfLines={6}>Essentially, Jim Wendler’s 5/3/1 Method is a simple, effective and flexible routine for getting stronger which you can employ indefinitely and tailor to individual goals. It is build around the central tenets of strength training: Compound lifts, constant progress, and smashing PRs. The 5/3/1 routine itself is built around a monthly mesocycle which comprises four distinct microcycles.</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cardStyle} onPress={Actions.programshow}>
            <Image style={styles.imageStyle} source={{uri: 'https://res.cloudinary.com/booklog/image/upload/v1494959835/Liftables/dumbbell.png'}}/>
            <View style={styles.textStyle}>
              <Text style={styles.titleStyle}>Starting Strength</Text>
              <Text style={styles.descriptionStyle} numberOfLines={6}>The goal of this program is to add weight each and every time you lift, taking advantage of The Novice Effect that allows you to do so. Perform the program on a 3 day per week schedule, on non-consecutive days, i.e. Mon/Wed/Fri, Tues/Thurs/Sat or similar.</Text>
            </View>
          </TouchableOpacity>

        <TouchableOpacity style={styles.cardStyle} onPress={Actions.programshow}>
          <Image style={styles.imageStyle} source={{uri: 'https://res.cloudinary.com/booklog/image/upload/v1494958059/Liftables/ice-cream.png'}}/>
          <View style={styles.textStyle}>
            <Text style={styles.titleStyle}>IceCream Fitness</Text>
            <Text style={styles.descriptionStyle} numberOfLines={6}> The program is called Ice Cream Fitness created by Jason Blaha and is commonly known as ICF5x5. It has a reputation for being a very tough and very high volume but very high reward workout</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cardStyle} onPress={Actions.programshow}>
          <Image style={styles.imageStyle} source={{uri: 'https://res.cloudinary.com/booklog/image/upload/v1494962261/Liftables/skull.png'}}/>
          <View style={styles.textStyle}>
            <Text style={styles.titleStyle}>Greyskull LP </Text>
            <Text style={styles.descriptionStyle} numberOfLines={6}>A simple beginner's linear progression program. Phrak's variant is a commonly used implementation. A 3 day or A/B routine.</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cardStyle} onPress={Actions.programshow}>
          <Image style={styles.imageStyle} source={{uri: 'https://res.cloudinary.com/booklog/image/upload/v1494958059/Liftables/ice-cream.png'}}/>
          <View style={styles.textStyle}>
            <Text style={styles.titleStyle}>IceCream Fitness</Text>
            <Text style={styles.descriptionStyle} numberOfLines={6}> The program is called Ice Cream Fitness created by Jason Blaha and is commonly known as ICF5x5. It has a reputation for being a very tough and very high volume but very high reward workout</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cardStyle} onPress={Actions.programshow}>
          <Image style={styles.imageStyle} source={{uri: 'https://res.cloudinary.com/booklog/image/upload/v1494958059/Liftables/ice-cream.png'}}/>
          <View style={styles.textStyle}>
            <Text style={styles.titleStyle}>IceCream Fitness</Text>
            <Text style={styles.descriptionStyle} numberOfLines={6}> The program is called Ice Cream Fitness created by Jason Blaha and is commonly known as ICF5x5. It has a reputation for being a very tough and very high volume but very high reward workout</Text>
          </View>
        </TouchableOpacity>

        {/* Needed to allow screen to scroll all the way down */}
        <View style={styles.blankStyle} />

      </ScrollView>
    );
  }
}

const styles = {
  cardStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 15
  },
  titleStyle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  descriptionStyle: {
    fontSize: 12,
    width: 250,
    marginTop: 5
  },
  imageStyle: {
    width: 80,
    height: 80,
    marginLeft: 20,
    marginRight: 20
  },
  textStyle: {
    flexDirection: 'column',
    marginRight: 10
  },
  blankStyle: {
    height: 120
  }
}
