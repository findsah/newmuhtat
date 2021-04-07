import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import Back from 'react-native-vector-icons/AntDesign';
const MAINCOLOR = '#FEB408';

export default class TopUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      checked1: false,
    };
  }
  render() {
    return (
      <View style={{height: '100%', backgroundColor: '#fff'}}>
        <View style={{flexDirection: 'row', marginTop: '6%'}}>
          <Back
            onPress={() => this.props.navigation.goBack()}
            name="left"
            size={30}
            color="black"
            style={{marginLeft: '1%', color: 'grey'}}
          />
        </View>

        <View style={{flex: 0.13, marginTop: '1%', backgroundColor: '#fff'}}>
          <Text
            style={{
              fontSize: 13,
              marginLeft: '5%',

              color: '#7C7D7E',
            }}>
            Account Information
          </Text>

          <Text
            style={{
              fontSize: 15,
              marginLeft: '5%',

              color: '#4A4B4D',
              fontWeight: 'bold',
            }}>
            Mohammad Al-alsalem
          </Text>
          <Text
            style={{
              fontSize: 15,
              marginLeft: '5%',

              color: '#4A4B4D',
              fontWeight: 'bold',
            }}>
            Phone number :9953372
          </Text>
          <Text
            style={{
              fontSize: 13,
              alignSelf: 'flex-end',
              marginTop: '-5%',
              marginRight: '5%',
              color: '#FCB408',
              fontWeight: 'bold',
            }}>
            Change
          </Text>
        </View>

      
        <View style={{flex: 0.3, backgroundColor: '#fff'}}>
          <Text
            style={{
              fontSize: 17,
              marginTop: 25,
              marginLeft: 15,
              color: '#4A4B4D',
              fontWeight: 'bold',
            }}>
            Choose your Top-up amount
          </Text>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{
                backgroundColor: '#fff',
                paddingHorizontal: 12,
                paddingVertical: 10,
                fontSize: 20,
                marginLeft: 35,
                borderRadius: 30,
                height: 56,
                width: 100,
                marginTop: 20,
                borderWidth: 1,
                borderColor: MAINCOLOR,
              }}>
              <Text
                style={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                  color: MAINCOLOR,
                  fontSize: 25,
                }}>
                1 KD
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: '#fff',
                paddingHorizontal: 12,
                paddingVertical: 10,
                fontSize: 20,
                marginLeft: 35,
                borderRadius: 30,
                height: 56,
                width: 100,
                marginTop: 20,
                borderWidth: 1,
                borderColor: MAINCOLOR,
              }}>
              <Text
                style={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                  color: MAINCOLOR,
                  fontSize: 25,
                }}>
                2 KD
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: '#fff',
                paddingHorizontal: 12,
                paddingVertical: 10,
                fontSize: 20,
                marginLeft: 35,
                borderRadius: 30,
                height: 56,
                width: 100,
                marginTop: 20,
                borderWidth: 1,
                borderColor: MAINCOLOR,
              }}>
              <Text
                style={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                  color: MAINCOLOR,
                  fontSize: 25,
                }}>
                3 KD
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              marginTop: 20,
            }}>
            <Text>_______________________</Text>
            <Text style={{marginRight: 10, marginTop: 5, marginLeft: 8}}>
              OR
            </Text>
            <Text>_____________________</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 12,
              marginTop: 15,
            }}>
            <Text style={{fontSize: 17, color: '#4A4B4D', fontWeight: 'bold'}}>
              Pick any other amount you wish
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: '#fff',
                paddingHorizontal: 12,
                paddingVertical: 10,
                fontSize: 20,
                marginLeft: 35,
                borderRadius: 40,
                marginTop: -17,
                height: 50,
                width: 100,
                borderWidth: 1,
                borderColor: MAINCOLOR,
              }}>
              <Text
                style={{
                  justifyContent: 'center',
                  color: MAINCOLOR,
                  fontSize: 25,
                }}>
                18 KD
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{height: '2%', width: '100%'}} />

        <View style={{flex: 0.2, top: '10%', backgroundColor: '#fff'}}>
          <TouchableOpacity
            style={{
              height: 56,
              width: '90%',
              borderRadius: 35,
              backgroundColor: '#FEB409',
              borderWidth: 1,
              borderColor: '#FEB409',
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => this.props.navigation.navigate('QRCodeScreen')}>
            <Text
              style={{
                color: '#fff',
                fontSize: 18,
              }}>
              Top-Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
