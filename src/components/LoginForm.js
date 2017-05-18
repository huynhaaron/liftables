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
      .then( ()=>{
        Actions.root();
        this.onLoginSuccess();
      })
      .catch(()=> {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(()=>{
            Actions.root();
            this.onLoginSuccess();
          })
          .catch( this.onLoginFail.bind(this));
      });
  }

  demoLogin() {
    this.setState({ error: '', loading: true});
    firebase.auth().signInWithEmailAndPassword('Test123@test.com', 'password')
      .then( ()=>{
        Actions.root();
        this.onLoginSuccess();
      });
  }

  onLoginFail() {
    this.setState({error: 'Authentication Failed', loading: false});
  }

  onLoginSuccess(){
    this.setState({email: '', password: '', error: '', loading: false});
  }


  renderButton() {
    if (this.state.loading) {
      return <Spinner />;
    }
    return (
      <Text style={styles.errorTextStyle}>
        {this.state.error}
      </Text>
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


        {this.renderButton()}

        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Log in
          </Button>
          <Button onPress={this.demoLogin.bind(this)}>
            Demo User
          </Button>
        </CardSection>

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
