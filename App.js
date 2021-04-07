import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {Component} from 'react';
import mainScreen from './src/Screens/mainScreen';
import login from './src/Screens/login';
import SignUp from './src/Screens/SignUp';
import reset from './src/Screens/reset';
import BusStation from './src/Screens/BusStation';
import ChooseSuggestion from './src/Screens/SuggestionBuses';
import TopUpScreen from './src/Screens/TopUpScreen';
import LogOut from './src/Screens/LogOut';
import QRCodeScreen from './src/Screens/QRCodeScreen';
const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="mainScreen">
          <Stack.Screen
            name="mainScreen"
            component={mainScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="login"
            component={login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="reset"
            component={reset}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="BusStation"
            component={BusStation}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ChooseSuggestion"
            component={ChooseSuggestion}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="TopUpScreen"
            component={TopUpScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="QRCodeScreen"
            component={QRCodeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="LogOut"
            component={LogOut}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
