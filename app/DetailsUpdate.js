import React, { Component } from 'react'
import { Container, Content, Form, Item, Input, Button, Label, Text } from 'native-base';
import firebase from 'react-native-firebase';
import {navigation} from "react-navigation";
export default class DetailsUpdate extends Component {

    state={
            email:"",
            name:"",
        }
   
    render() {
        let user = firebase.auth().currentUser;
        return (
            <Container>
                <Content>
                    <Form>
                    <Item floatingLabel>
                    <Label>Full Name</Label>
                    <Input value={this.state.name} onChangeText={(e)=>{
                        this.setState({name:e})
                        }}/>
                  </Item>
                  <Item floatingLabel >
                    <Label>Email</Label>
                    <Input value={this.state.email}
                    onChangeText={(e)=>{
                        this.setState({email:e})}} />
                  </Item>
        
            <Button onPress={()=>{
            if(this.state.name=="")
            alert("Enter Name")
            else if(this.state.email=="")
            alert("Enter Email")
            else  
    firebase.database().ref('users/' + user.uid).set({
    username: this.state.name,
    email: this.state.email,
    profile_picture : "imageUrl"
  }).then((data) => {
  this.props.navigation.navigate('DrawerScreen')
   //success
  }).
  catch((err) => {        
  alert("Error",err)
   //error
  });

            }}>
            <Text>Update Data!</Text>
          </Button>
                    </Form>
                </Content>
            </Container>
        )
    }
}
