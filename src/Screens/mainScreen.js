import React, {Component} from 'react';
import {StyleSheet, Image, View, TouchableOpacity, Text} from 'react-native';

export default class mainScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.halfScreen}>
          <Image
            style={styles.yellowBox}
            source={require('../assets/bb.png')}
          />

          <Image
            source={require('../assets/Picture1.png')}
            style={styles.imageStyle}
          />
        </View>
        <View style={styles.bottomHalfScreen}>
          <Text style={styles.textStyling}>MAHATTNA</Text>

          <TouchableOpacity
            style={styles.touchableOpacityStyling}
            onPress={() => this.props.navigation.navigate('login')}>
            <Text style={styles.loginWordStyling}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.touchableOpacity2Styling}
            onPress={() => this.props.navigation.navigate('SignUp')}>
            <Text style={styles.createAccountWordStyling}>
              Create an Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  halfScreen: {
    height: '50%',
    backgroundColor: '#FFFFFF',
  },
  yellowBox: {
    height: '80%',
    width: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  imageStyle: {
    alignSelf: 'center',
    bottom: '27%',
    marginRight: '2%',
    height: '40%',
    width: '40%',
  },

  bottomHalfScreen: {
    height: '50%',
    width: '100%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
  },

  textStyling: {
    alignSelf: 'center',
    letterSpacing: 7,
    fontSize: 15,
    color: '#4A4B4D',
    bottom: '-2%',
  },

  touchableOpacityStyling: {
    width: '80%',
    backgroundColor: '#FCB408',
    borderRadius: 40,
    bottom: '-20%',
    height: 50,
    fontSize: 20,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  loginWordStyling: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  touchableOpacity2Styling: {
    bottom: '-25%',
    borderWidth: 1,
    borderColor: '#FEB408',
    backgroundColor: '#fff',
    borderRadius: 40,
    width: '80%',
    justifyContent: 'center',
    height: 50,
    alignSelf: 'center',
  },
  createAccountWordStyling: {
    fontSize: 20,
    textAlign: 'center',
    color: '#FEB408',
    fontWeight: 'bold',
  },
});
