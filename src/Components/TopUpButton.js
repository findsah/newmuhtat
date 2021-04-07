import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

export default class TopUpButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <TouchableOpacity
          style={{
            height: '30%',
            width: '80%',
            borderRadius: 35,
            backgroundColor: '#fff',
            borderWidth: 2,
            borderColor: '#FEB409',
            alignSelf: 'center',
            marginTop: '10%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#FEB409',
              fontSize: 22,
              fontWeight: 'bold',
            }}>
            {this.props.TopUp}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
