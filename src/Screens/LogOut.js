import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class LogOut extends Component {
  logout = async () => {
    let token = AsyncStorage.getItem("authToken");
    console.log("token=====", token);

    var formdata = new FormData();
    formdata.append("token", token);
    console.log("fdata========>", formdata);
    AsyncStorage.removeItem("authToken");
    this.props.navigation.navigate("SignIn");
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.halfScreen}>
          <Image
            source={require("../assets/Picture1.png")}
            style={styles.imageStyle}
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.logoutviewsty}
            onPress={() => this.logout()}
          >
            <Text style={[styles.logouttextsty, { fontWeight: "bold" }]}>
              Log Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#FFFFFF",
  },
  halfScreen: {
    height: "30%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  imageStyle: {
    alignSelf: "center",
    bottom: "-14%",
    marginRight: 9,
    height: 176,
    width: 168,
  },
  logouttextsty: {
    fontSize: 20,

    color: "#fff",
    fontWeight: "300",
    padding: 10,
    alignSelf: "center",
  },
  logoutviewsty: {
    backgroundColor: "#FCB408",
    borderRadius: 40,
    width: 307,
    paddingTop: 10,
    height: "25%",
    fontSize: 20,
    marginTop: "20%",
    alignSelf: "center",
    paddingBottom: 20,
  },
});
