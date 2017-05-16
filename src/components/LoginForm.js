import React from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';
import { Actions } from 'react-native-router-flux';


class LoginForm extends React.Component {
  state = { email: '', password: '', error: '', loading: false};

  onButtonPress() {
    const {email, password} = this.state;

    this.setState({ error: '', loading: true});

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then( this.onLoginSuccess.bind(this))
      .catch(()=> {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then( this.onLoginSuccess.bind(this))
          .catch( this.onLoginFail.bind(this));
      });
  }

  demoLogin() {
    firebase.auth().signInWithEmailAndPassword('Test123@test.com', 'password')
      .then( this.onLoginSuccess.bind(this));
  }

  onLoginFail() {
    this.setState({error: 'Authentication Failed', loading: false});
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small"/>;
    }
    return (
      <CardSection>
        <Button onPress={this.onButtonPress.bind(this)}>
          Log in
        </Button>
        {/* <Button onPress={this.demoLogin.bind(this).then(Actions.UserStats)}> */}
        <Button onPress={Actions.main}>
          Demo User
        </Button>
      </CardSection>
    )
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <CardSection>
          <Input
            label="Email"
            placeholder="example@gmail.com"
            value={this.state.email}
            onChangeText={email => this.setState({email})}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            value={this.state.password}
            onChangeText={password => this.setState({password})}
          />
        </CardSection>
        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>

        {this.renderButton()}

      </View>

    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
}

export default LoginForm;
