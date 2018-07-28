import React, { Component } from 'react'
import { Text, View } from 'native-base';
import { ImageBackground, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import { List, ListItem, SearchBar } from "react-native-elements"
import background from "./images/back.png";
import firebase from 'react-native-firebase';
import {DrawerActions}  from 'react-navigation'

export default class MainScreen extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          loading: false,
          data: [],
          data1:{},
          page: 1,
          seed: 1,
          error: null,
          refreshing: false,
        };
      }
    componentDidMount() {
        // this.makeRemoteRequest();
    }
    renderHeader = () => {
      return <SearchBar placeholder="Type Here..." lightTheme round />;
    };
    makeRemoteRequest = () => {
     
      const { page, seed } = this.state;
        const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
        this.setState({ loading: true ,refreshing:true});
        fetch(url)
          .then(res => res.json())
          .then(res => {
            this.setState({
              data: page === 1 ? res.results : [...this.state.data, ...res.results],
              error: res.error || null,
              loading: false,
              refreshing: false
            });
          })
          .catch(error => {
            this.setState({ error, loading: false });
          });
      };
      makeDataRequest=()=>{
        this.setState({
          loading:true
        })
        var userId = firebase.auth().currentUser.uid;
        firebase.database().ref('/Blogs/').once('value').then((snapshot)=> {
          this.state.data1 = snapshot.val()
          this.setState({
             data1:snapshot.val(),
             loading: false,
             refreshing:false
           })
        // alert(JSON.stringify( this.state.data1))
         
         });
      }
      handleRefresh=()=>{
        this.setState({
          refreshing:true
        },
        ()=>{
          this.makeDataRequest();
        })
      }
      renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: "86%",
              backgroundColor: "#CED0CE",
              marginLeft: "14%"
            }}
          />
        );
      };
      
      componentDidMount() {
        this.makeDataRequest();
      }
      
    render() {
      
      let flatdata=Object.keys( this.state.data1).map((val,key)=>this.state.data1[val]);
        if (!this.state.loading)
        return (
            // <ImageBackground source={background} style={{width:"100%",height:"100%",justifyContent:'center',alignItems:'center'}}>
            <ScrollView style={{width:"100%"}}>
            <List>
              
            <FlatList
              data={flatdata}
              keyExtractor={item => item.BlogTitle}
              ItemSeparatorComponent={this.renderSeparator}
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh}
              // ListHeaderComponent={this.renderHeader}
              renderItem={({ item }) => {
               return (
                <ListItem
                  roundAvatar
                  title={item.BlogTitle}
                  subtitle={item.BlogDesc}
                  // avatar={{ uri: item.picture.thumbnail }}
                  onPressRightIcon={()=>{
                    this.props.navigation.navigate("ModalScreen", { Description: item.Description,Title:item.BlogTitle });
                  }}
                />
              )}}
            />
          </List> 
          </ScrollView>
// </ImageBackground>
        )
        else
        return (
            <View
              style={{
                paddingVertical: 20,
                borderTopWidth: 1,
                borderColor: "#CED0CE"
              }}
            >
              <ActivityIndicator animating size="large" />
            </View>
          );
    }
}
