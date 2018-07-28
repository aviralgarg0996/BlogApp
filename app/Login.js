import React, { Component } from 'react';
import { View, Button, Text, TextInput, Image, ImageBackground,TouchableOpacity } from 'react-native';

import firebase from 'react-native-firebase';
import background from "./images/back.png";
import logo from "./images/slidelogo.png"
const successImageUri = 'https://cdn.pixabay.com/photo/2015/06/09/16/12/icon-803718_1280.png';
import {DrawerActions}  from 'react-navigation'
import { Header, Left, Icon } from 'native-base';
import MainScreen from "./MainScreen"
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      user: null,
      message: '',
      codeInput: '',
      phoneNumber: '',
      confirmResult: null,
    };
  }

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user.toJSON() });
      } else {
        // User has been signed out, navigate the state
        this.setState({
          user: null,
          message: '',
          codeInput: '',
          phoneNumber: '',
          confirmResult: null,
        });
      }
    });
  }

  componentWillUnmount() {
     if (this.unsubscribe) this.unsubscribe();
  }

  signIn = () => {
    const { phoneNumber } = this.state;    
    if(phoneNumber=="")
    this.setState({ message: 'Enter Phone Number ...' });
    else if(phoneNumber.length!=10)
    this.setState({ message: 'Enter Valid Phone Number ...' });
    
    else
    {
    this.setState({ message: 'Sending code ...' });

    firebase.auth().signInWithPhoneNumber(`+91${phoneNumber}`)
      .then(confirmResult => {
        this.setState({ confirmResult })
        console.log("confirmResult",confirmResult)
      })
      .catch(error => this.setState({ message: `Sign In With Phone Number Error: ${error.message}` }));
 
   }   };

  confirmCode = () => {
    const { codeInput, confirmResult } = this.state;
    this.setState({ message:'' });
    
    if (confirmResult && codeInput.length) {
      confirmResult.confirm(codeInput)
        .then((user) => {
          // alert()
          // this.props.navigation.navigate('DrawerScreen');
          this.setState({ message: JSON.stringify(this.props.navigation) });
        
          
        })
        .catch(error => this.setState({ message: `Code Confirm Error: ${error.message}` }));
      }
  };



  renderPhoneNumberInput() {
   const { phoneNumber } = this.state;

    return (
      <View style={{ padding: 25 }}>
        <Text style={{color:'white',fontSize:20}}>Enter Your Contact Number:</Text>
        <TextInput
         keyboardType='numeric'
          style={{ height: 40, marginTop: 15, marginBottom: 15 ,color:'white',borderColor:'#1a1a1a',borderWidth:1,borderRadius:6}}
          onChangeText={value => this.setState({ phoneNumber: value })}
          placeholder={'Contact number ... '}
          placeholderTextColor="white" 
          value={phoneNumber}
          maxLength={10}
        />
        <Button title="Sign In" color="green" onPress={this.signIn} />
        
      </View>
    );
  }

  renderMessage() {
    const { message } = this.state;

    if (!message.length) return null;
    return (
      <Text style={{ padding: 5, color: '#fff' }}>{message}</Text>
    );
  }

  renderVerificationCodeInput() {
    const { codeInput } = this.state;

    return (
      <View style={{ marginTop: 25, padding: 25 }}>
        <Text style={{color:'white',fontSize:20}}>Enter verification code below:</Text>
        <TextInput
         keyboardType='numeric'
          style={{ height: 40, marginTop: 15, marginBottom: 15 ,color:'white',borderColor:'#1a1a1a',borderWidth:1,borderRadius:6}}
          onChangeText={value => this.setState({ codeInput: value })}
          placeholder={'Verify Code ... '}
          placeholderTextColor="white" 
          value={codeInput}
         
        />
        {()=>this.setState({ message: `CodeResult: ${this.state.confirmResult}` })}
        {/* {this.state.confirmResult} */}
        <Button title="Confirm Code" color="#841584" onPress={this.confirmCode} />
      </View>
    );
  }

  render() {
    const { user, confirmResult } = this.state;
    return (
        <ImageBackground source={background} style={{width:"100%",height:"100%",justifyContent:'center',alignItems:'center'}}>
        <Image
          style={{width: 300, height: 170}}
          source={logo}
        />
        {!user && !confirmResult && this.renderPhoneNumberInput()}

        {this.renderMessage()}

        {!user && confirmResult && this.renderVerificationCodeInput()}

        {user && (
          this.props.navigation.replace('DrawerScreen')  
        )}
         </ImageBackground>
    );
  }
}