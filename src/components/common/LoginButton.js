import React from 'react';
import { Text , TouchableOpacity} from 'react-native';


const LoginButton = ( {onPress, children} ) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonStyle}>
      <Text style={styles.textStyle}>{children}</Text>
    </TouchableOpacity>
  )
};

const styles = {
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#631b15',
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: '#fff'
  },
  textStyle: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#84261E',
    paddingTop: 10,
    paddingBottom: 10
  }
}

export { LoginButton };
