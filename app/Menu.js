import React, { Component } from 'react'
import {NavigationActions} from 'react-navigation';
import {ScrollView, Text, View} from 'react-native';
import styles from "./SideMenuStyle"
import firebase from 'react-native-firebase';

class SideMenu extends Component {
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render () {
    let user = firebase.auth().currentUser;
    return (
      <View style={styles.container}>
        <ScrollView>
          {/* <View>
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Home')}>
              Home
              </Text>
            </View>
          </View> */}
          <View>
            <Text style={styles.sectionHeadingStyle}>
              Welcome 
              {/* {JSON.stringify(user)} */}
            </Text>
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Details')}>
                Update Details
              </Text>
              <Text style={styles.navItemStyle} onPress={()=>{
                firebase.auth().signOut().then((data) => {
                  this.props.navigation.replace('Home')
                   //success
                  }).
                  catch((err) => {        
                  alert("Error",err)
                   //error
                  });
                this.props.navigation.closeDrawer();
              }}>
                SignOut
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.footerContainer}>
          <Text>BlogApp Demo</Text>
        </View>
      </View>
    );
  }
}


export default SideMenu;