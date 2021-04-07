import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Back from 'react-native-vector-icons/Ionicons';

export default class SignIn extends Component {
  render() {
    return (
      <View style={{backgroundColor: '#fff', height: '100%'}}>
        <View style={styles.backAlignment}>
          <Back
            onPress={() => this.props.navigation.goBack()}
            name="arrow-back"
            size={30}
            style={styles.backStyle}></Back>
          {/* <Text style={styles.backWordStyling}>Back</Text> */}
        </View>

        <Text
          style={{
            fontSize: 20,
            color: '#4A4B4D',
            alignSelf: 'center',
            marginBottom: '1%',
            fontWeight: 'bold',
          }}>
          Reset Password
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: '#7C7D7E',
            textAlign: 'center',
            marginBottom: '1%',
          }}>
          Please enter your email to receive a {'\n'} link to create a new
          password via email
        </Text>

        <View
          style={{
            backgroundColor: '#fff',
            marginLeft: '12%',
            marginRight: '12%',
            borderRadius: 25,
          }}>
          <View style={{alignItems: 'center', paddingVertical: 30}}>
            <View
              style={{
                flexDirection: 'row',
                paddingBottom: 10,
                fontSize: 20,
                backgroundColor: '#ECEFF4',
                marginTop: '15%',
                borderRadius: 25,
                padding: 15,
              }}>
              <TextInput
                style={{
                  height: 40,
                  width: '100%',
                  paddingHorizontal: 5,
                  fontSize: 14,
                }}
                placeholder="Email"
                placeholderTextColor="#B6B7B7"
              />
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: '#FEB409',
                borderRadius: 40,
                width: '100%',
                height: '26%',
                fontSize: 18,
                marginTop: '10%',
                alignSelf: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  textAlign: 'center',
                  color: '#fff',
                  fontWeight: 'bold',
                }}>
                Send
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  backAlignment: {
    flexDirection: 'row',
    marginTop: '6%',
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
});
