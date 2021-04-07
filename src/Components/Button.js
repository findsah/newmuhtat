import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";

export default class Button extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <TouchableOpacity
          style={{
            height: 56,
            width: "90%",
            borderRadius: 35,
            backgroundColor: "#FEB409",
            alignSelf: "center",
            marginTop: "10%",
            justifyContent: "center",
            alignItems: "center",
          }}
          // onPress={() => this.props.navigation.navigate(this.props.move)}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
            }}
          >
            {this.props.BuyTicket}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
