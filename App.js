import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { createStackNavigator,createDrawerNavigator,DrawerNavigator, StackNavigator } from 'react-navigation';
import Login from "./app/Login"
import { Container, Header, Body,Icon, Image } from 'native-base';
import logo from "./app/images/slidelogo.png"
import SideMenu from "./app/Menu"
import DetailsUpdate from "./app/DetailsUpdate"
import MainScreen from './app/MainScreen';
import ModalScreen from './app/ModalScreen';
const MyDrawer=DrawerNavigator({
  Main:{screen:MainScreen}
},{
  contentComponent:SideMenu,
  drawerWidth:300
})

const ModalStack = createStackNavigator(
  {
    MyModal: {screen: ModalScreen,},
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);
const RootStack = StackNavigator(
  {
    Home:{screen: Login},
    Details:{screen:DetailsUpdate},
    DrawerScreen:{screen:MyDrawer},
    ModalScreen:{screen:ModalStack}
  },
  
);


// const RootStack=StackNavigator(
//   {
//     Home:{ screen: Login},
//   }
// )
export default class App extends Component {
  render() {
    return (
      <RootStack />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
