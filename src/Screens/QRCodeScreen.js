import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import Back from 'react-native-vector-icons/Ionicons';
import Button from '../Components/Button';
import TopUpButton from '../Components/TopUpButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class QRCodeScreen extends Component {
  logout = async () => {
    let token = await AsyncStorage.getItem('authToken');
    console.log('token=====', token);

    var formdata = new FormData();
    formdata.append('token', token);
    console.log('fdata========>', formdata);
    AsyncStorage.removeItem('authToken');
    this.props.navigation.navigate('SignIn');
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', marginTop: '6%'}}>
          <Back
            onPress={() => this.props.navigation.goBack()}
            name="arrow-back"
            size={30}
            color="black"
            style={{marginLeft: '1%', color: 'grey'}}
          />
          {/* <Text style={{styles.backWordStyling}}>Back</Text> */}
        </View>
        <View
          style={{
            flex: 0.4,
            marginTop: '15%',
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          <Image
            source={require('../assets/QR.png')}
            style={{height: 200, width: 200}}
          />
        </View>

        <View style={{marginTop: '5%'}}>
          <Text
            style={{
              fontSize: 18,
              color: '#FCB408',
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
            QRCodeScreen
          </Text>
          <Text style={{textAlign: 'center', marginTop: '1%', fontSize: 20}}>
            0.300 KWD
          </Text>
        </View>

        <View style={{flex: 0.7}}>
          <Button
            BuyTicket={'Notify me When the Bus is Arrived'}

            // onPress={() => this.props.navigation.navigate("SignUp")}
          />
          <TopUpButton TopUp={'LogOut'} onPress={this.logout()} />
        </View>
      </View>
    );
  }
}
