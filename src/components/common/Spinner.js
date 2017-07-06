import React from 'react';
import {
  View,
  ActivityIndicator
} from 'react-native';

const Spinner = ({ size }) => {
  return (
    <View style={styles.spinnerStyle}>
      <ActivityIndicator size={size || 'small'}/>
    </View>
  );
};

const styles = {
  spinnerStyle: {
    paddingTop: 15,
    paddingBottom: 15,
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export { Spinner };
