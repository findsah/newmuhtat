import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import Back from 'react-native-vector-icons/Ionicons';
import {Loading} from '../Components/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
var validator = require('email-validator');

export default class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stsEmail: '',
      stsPassword: '',
      stsIsLoading: false,
      isLoading: false,
      stsUser_id: '',
    };
  }
  componentDidMount = () => {
    this.getData();
  };

  getData = () => {
    AsyncStorage.getItem('user_id', token => {
      console.log(token);
    });
  };
  handleEmail = text => {
    this.setState({stsEmail: text});
  };
  handlePassword = text => {
    this.setState({stsPassword: text});
  };
  manageLoading = value => {
    setState({isLoading: value});
  };

  login = () => {
    this.setState({stsIsLoading: true, isLoading: true});
    const valid = validator.validate(this.state.stsEmail); // true
    if (this.state.stsEmail === '' || this.state.stsPassword === '') {
      this.setState({stsIsLoading: false, isLoading: false});
      alert('Please Enter Email and Password');
    } else if (valid === false) {
      this.setState({stsIsLoading: false, isLoading: false});
      alert('Please Enter Valid Email');
    } else {
      console.log('request send');
      let formdata = new FormData();
      formdata.append('email', this.state.stsEmail);
      formdata.append('password', this.state.stsPassword);

      fetch('https://muhtat-app.herokuapp.com/user/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          // Accept: "application/json, text/plain",
        },
        body: formdata,
      })
        .then(response => response.json())

        .then(responsejosn => {
          console.log('sdegfeg', responsejosn);
          const User_id = responsejosn.user_id;
          const token = responsejosn.authToken;
          if (responsejosn) {
            this.setState({
              stsIsLoading: false,
              stsUser_id: User_id,
              authToken: token,
            });
            AsyncStorage.setItem('stsUser_id', JSON.stringify(User_id));
            AsyncStorage.setItem('authToken', JSON.stringify(token));
            this.props.navigation.navigate('BusStation');

            console.log(responsejosn.user_id);

            console.log('response send');
          } else {
            alert(responsejosn.message);

            this.setState({stsIsLoading: false, isLoading: true});
          }
        });
    }
  };

  render() {
    return (
      <View style={styles.SignInContainer}>
        <View style={styles.backAlignment}>
          <Back
            onPress={() => this.props.navigation.goBack()}
            name="arrow-back"
            size={30}
            style={styles.backStyle}></Back>
          {/* <Text style={styles.backWordStyling}>Back</Text> */}
        </View>

        <Text style={styles.loginWordStyling}>Login</Text>
        <Text style={styles.addDetailWordStyling}>
          Add your details to login
        </Text>

        <View style={styles.credentialStyle}>
          <View style={styles.credentialContainerStyling}>
            <View style={styles.textInputField1Styling}>
              <TextInput
                style={{height: 40, width: '100%', paddingHorizontal: 5}}
                placeholder="Your Email"
                placeholderTextColor="#B6B7B7"
                onChangeText={text => this.handleEmail(text)}
              />
            </View>
            <View style={styles.textInputField2Styling}>
              <TextInput
                style={{height: 40, width: '100%', paddingHorizontal: 5}}
                placeholder="Password"
                placeholderTextColor="#B6B7B7"
                secureTextEntry={true}
                onChangeText={text => this.handlePassword(text)}
              />
            </View>
            <TouchableOpacity
              style={styles.touchableOpacityLoginWordStyling}
              onPress={() => this.login()}>
              {this.state.stsIsLoading === false ? (
                <Text style={styles.loginTextStyling}>Login</Text>
              ) : (
                <Loading ShowLoading={this.state.isLoading} clr={'white'} />
              )}
            </TouchableOpacity>
            <Text
              onPress={() => this.props.navigation.navigate('reset')}
              style={styles.forgetPasswordStyling}>
              Forget Your password?
            </Text>
          </View>
        </View>
        <View style={styles.bottomContainerStyling}>
          <Text style={styles.dontHaveAnAccountStyling}>
            Don't Have an Account?
          </Text>
          <Text
            onPress={() => this.props.navigation.navigate('SignUp')}
            style={styles.signUpStyling}>
            SignUp
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  SignInContainer: {
    backgroundColor: '#fff',
    height: '100%',
  },
  backAlignment: {
    flexDirection: 'row',
    marginTop: '8%',
  },
  backStyle: {
    marginLeft: '1%',
    color: 'grey',
  },
  backWordStyling: {
    fontSize: 25,
    color: 'grey',
    marginLeft: '1%',
  },
  loginWordStyling: {
    fontSize: 20,
    color: '#4A4B4D',
    alignSelf: 'center',
    marginBottom: '1%',
    fontWeight: 'bold',
  },
  addDetailWordStyling: {
    fontSize: 18,
    color: '#7C7D7E',
    alignSelf: 'center',
    marginBottom: '1%',
  },
  credentialStyle: {
    backgroundColor: '#fff',
    marginTop: '7%',
    marginLeft: '12%',
    marginRight: '12%',
    borderRadius: 25,
  },
  credentialContainerStyling: {
    alignItems: 'center',
  },
  textInputField1Styling: {
    flexDirection: 'row',
    paddingBottom: 10,
    fontSize: 20,
    backgroundColor: '#ECEFF4',
    marginTop: '10%',
    borderRadius: 40,
    padding: 15,
  },
  textInputField2Styling: {
    flexDirection: 'row',
    paddingBottom: 10,
    fontSize: 20,
    backgroundColor: '#ECEFF4',
    marginTop: '4%',
    borderRadius: 40,
    padding: 15,
  },
  touchableOpacityLoginWordStyling: {
    backgroundColor: '#FCB408',
    borderRadius: 40,
    width: '100%',
    height: 50,
    marginTop: '7%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginTextStyling: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
    alignSelf: 'center',
  },
  forgetPasswordStyling: {
    fontSize: 15,
    marginTop: '2%',
    marginLeft: '5%',
    color: '#7C7D7E',
  },
  bottomContainerStyling: {
    flexDirection: 'row',
    alignSelf: 'center',
    top: '40%',
  },
  dontHaveAnAccountStyling: {
    fontSize: 15,
    color: '#7C7D7E',
  },
  signUpStyling: {
    color: '#FCB409',
    marginLeft: 5,
    fontSize: 15,
  },
});
