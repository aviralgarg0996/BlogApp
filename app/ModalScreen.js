import React, { Component } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import afterlike from "./images/images.jpg"
import like from "./images/like.png"
export default class ModalScreen extends Component {
    constructor(props){
        super(props);
        this.state={
            desc:"",
            title:"",
            like:false,
            likesCount:0
        }
    }
    componentDidMount() {
        const desc = this.props.navigation.getParam('Description');
            const title = this.props.navigation.getParam('Title');
            
        this.setState({
            desc:desc,
            title:title
        })
    }
    
    render() {
        return (
          <ScrollView style={{margin:15}}>
          <Text style={{fontSize:25,color:'black',marginBottom:30}}>{this.state.title}</Text>
              <Text>{this.state.desc}</Text>
              <Text>{this.state.desc}</Text>
<View style={{margin:10,height:90,borderColor:'gray'}}>
<TouchableOpacity onPress={()=>{
    this.setState({
like:!this.state.like,
    })
    // if(this.state.like)
    // this.setState({likesCount:likesCount-1})
    // else
    // this.setState({likesCount:likesCount+1})
    

}}>
<View style={{backgroundColor:this.state.like?"orange":'white',borderRadius:10,width:40,height:40,marginTop:20}}>
<Image source={like}
  style={{width:40,height:40}}
  /></View></TouchableOpacity>
  <Text style={{marginLeft:15}}>{this.state.likesCount}</Text>
  </View>

          </ScrollView>
        )
    }
}
