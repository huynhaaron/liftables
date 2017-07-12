import React from 'react';
import { View } from 'react-native';

const LoginCardSection = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  )
}

const styles = {
  containerStyle: {
    padding: 5,
    paddingTop: 25,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative'
  }
}

export { LoginCardSection };
