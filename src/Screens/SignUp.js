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
var validator = require('email-validator');
export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stsName: '',
      stsEmail: '',
      stsphone: '',
      stsPassword: '',
      stsConfirmPassword: '',
      stsIsLoading: false,
      isLoading: false,
    };
  }

  handleName = text => {
    this.setState({stsName: text});
  };

  handlePhone = text => {
    this.setState({stsphone: text});
  };

  handleEmail = text => {
    this.setState({stsEmail: text});
  };

  handlePassword = text => {
    this.setState({stsPassword: text});
  };

  comparePassword = text => {
    this.setState({stsConfirmPassword: text});
  };

  manageLoading = value => {
    setState({isLoading: true});
  };

  userSignup = () => {
    if (
      this.state.stsName === '' ||
      this.state.stsEmail === '' ||
      this.state.stsphone === '' ||
      this.state.stsPassword === '' ||
      this.state.stsConfirmPassword === ''
    ) {
      alert('Please Enter required field');
    } else {
      let formdata = new FormData();
      formdata.append('name', this.state.stsName);
      formdata.append('email', this.state.stsEmail);
      formdata.append('phone', this.state.stsphone);
      formdata.append('password', this.state.stsPassword);
      formdata.append('confirm_password', this.state.stsConfirmPassword);

      console.log('formdata', formdata);
      this.setState({
        loader: true,
      });
      fetch('https://muhtat-app.herokuapp.com/user/registration/', {
        method: 'POST',

        headers: {
          Accept: 'application/json',
        },
        body: formdata,
      })
        .then(response => response.json())
        .then(data => {
          console.log('Data', data);

          this.setState({
            userdata: data,
            loader: false,
          });
          this.props.navigation.navigate('mainScreen');
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  render() {
    return (
      <View style={styles.signUpContainer}>
        <View style={styles.backAlignment}>
          <Back
            onPress={() => this.props.navigation.goBack()}
            name="arrow-back"
            size={30}
            style={styles.backStyle}></Back>
          {/* <Text style={styles.backWordStyling}>Back</Text> */}
        </View>

        <Text style={styles.signUpStyling}>Sign Up</Text>
        <Text style={styles.addYourDetailStyling}>
          Add your details to sign up
        </Text>

        <View style={styles.middleContainerStyling}>
          <View style={styles.itemStyling}>
            <View style={styles.textInput1}>
              <TextInput
                style={styles.nameTextInputStyling}
                placeholder="Name"
                placeholderTextColor="#B6B7B7"
                onChangeText={text => this.handleName(text)}
              />
            </View>
            <View style={styles.textInput2}>
              <TextInput
                style={styles.emailTextInputStyling}
                placeholder="Email"
                placeholderTextColor="#B6B7B7"
                onChangeText={text => this.handleEmail(text)}
              />
            </View>
            <View style={styles.textInput3}>
              <TextInput
                style={styles.mobileNoTextInputStyling}
                placeholder="Mobile No"
                placeholderTextColor="#B6B7B7"
                keyboardType="numeric"
                onChangeText={text => this.handlePhone(text)}
              />
            </View>
            <View style={styles.textInput4}>
              <TextInput
                style={styles.passwordTextInputStyling}
                placeholder="Password"
                placeholderTextColor="#B6B7B7"
                secureTextEntry={true}
                onChangeText={text => this.handlePassword(text)}
              />
            </View>
            <View style={styles.textInput5}>
              <TextInput
                style={styles.confirmTextInputStyling}
                placeholder="Confirm Password"
                placeholderTextColor="#B6B7B7"
                secureTextEntry={true}
                onChangeText={text => this.comparePassword(text)}
              />
            </View>
            <TouchableOpacity
              style={styles.buttonStyling}
              onPress={() => this.userSignup()}>
              {this.state.stsIsLoading === false ? (
                <Text style={styles.buttonTextStyling}>Sign Up</Text>
              ) : (
                <Loading ShowLoading={this.state.isLoading} clr={'white'} />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.innerContainer}>
            <Text style={styles.accountTextStyling}>
              Already Have an Account?
            </Text>
            <Text
              onPress={() => this.props.navigation.navigate('login')}
              style={styles.loginTextStyling}>
              Login
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  signUpContainer: {
    backgroundColor: '#fff',
    flex: 1,
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
  signUpStyling: {
    fontSize: 20,
    color: '#4A4B4D',
    alignSelf: 'center',
    marginBottom: '1%',
    fontWeight: 'bold',
  },
  addYourDetailStyling: {
    fontSize: 18,
    color: '#7C7D7E',
    alignSelf: 'center',
    marginBottom: '1%',
  },
  middleContainerStyling: {
    backgroundColor: '#fff',
    marginLeft: '12%',
    marginRight: '12%',
    borderRadius: 25,
  },
  itemStyling: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  textInput1: {
    flexDirection: 'row',
    // paddingBottom: 10,
    // fontSize: 20,
    backgroundColor: '#ECEFF4',
    marginTop: '5%',
    borderRadius: 30,
    padding: 15,
  },
  nameTextInputStyling: {
    height: 40,
    width: '100%',
    paddingHorizontal: 5,
  },
  textInput2: {
    flexDirection: 'row',
    paddingBottom: 10,
    fontSize: 20,
    backgroundColor: '#ECEFF4',
    marginTop: '5%',
    borderRadius: 30,
    padding: 15,
  },
  emailTextInputStyling: {
    height: 40,
    width: '100%',
    paddingHorizontal: 5,
  },
  textInput3: {
    flexDirection: 'row',
    paddingBottom: 10,
    fontSize: 20,
    backgroundColor: '#ECEFF4',
    marginTop: '5%',
    borderRadius: 30,
    padding: 15,
  },
  mobileNoTextInputStyling: {
    height: 40,
    width: '100%',
    paddingHorizontal: 5,
  },
  textInput4: {
    flexDirection: 'row',
    paddingBottom: 10,
    fontSize: 20,
    backgroundColor: '#ECEFF4',
    marginTop: '5%',
    borderRadius: 30,
    padding: 15,
  },
  passwordTextInputStyling: {
    height: 40,
    width: '100%',
    paddingHorizontal: 5,
  },
  textInput5: {
    flexDirection: 'row',
    paddingBottom: 10,
    fontSize: 20,
    backgroundColor: '#ECEFF4',
    marginTop: '5%',
    borderRadius: 30,
    padding: 15,
  },
  confirmTextInputStyling: {
    height: 40,
    width: '100%',
    paddingHorizontal: 5,
  },
  buttonStyling: {
    top: ' 5%',
    backgroundColor: '#FEB409',
    borderRadius: 30,
    width: '100%',
    paddingTop: 15,
    height: 60,
    fontSize: 20,
    // marginTop: 0,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  buttonTextStyling: {
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
    fontWeight: '500',
    // paddingBottom: 40,
    // // paddingTop: 5,
  },
  innerContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    // top: "-2%",
  },
  accountTextStyling: {
    fontSize: 15,
    color: '#7C7D7E',
    marginTop: '10%',
  },
  loginTextStyling: {
    color: '#FEB409',
    marginLeft: '1%',
    fontSize: 15,
    marginTop: '10%',
  },
});
