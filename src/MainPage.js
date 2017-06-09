/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import moment from 'moment';

import {Navigator,StyleSheet,Text,
	View,Image,PermissionsAndroid} from 'react-native';


import Interactable from 'react-native-interactable';
import CarState from './CarState';
import Car from './Car';
import Forecast from './Forecast';

let cloud = require('./img/cloud.png');
let cloud_2=require('./img/cloud_2.png');
let cloud_3=require('./img/cloud_3.png');
let cloud_4=require('./img/cloud_4.png');

const SUN_DAYS= 3;
exports.title = 'Geolocation';

 class MainPage extends Component {
constructor(props) {
  super(props);
 	this.state = 	{
 		carState:0,
		message:'Well... Let\'s wait for a better\n day for your car wash',
 		washDate:"",
		};
}

render() {
    return (
    	<View style={styles.container}>	
    		<View style={{left :50,position:'absolute'}}>
						<Image style={{height:100,width:50,resizeMode:'contain'}}source={cloud}/>
	       </View>
		
			<View style={{right: 50, top:175,position:'absolute'}}>
				         	<Image style={{height:100,width:50,resizeMode:'contain'}}source={cloud_2}/>
	       </View>
			
			<View style={{right :50,position:'absolute'}}>
						<Image style={{height:100,width:50,resizeMode:'contain'}}source={cloud_3}/>
	       </View>
		
			<View style={{right: 250, top:125,position:'absolute'}}>
				         	<Image style={{height:100,width:50,resizeMode:'contain'}}source={cloud_4}/>
	       	</View>
		
			<View style={{marginLeft:16}}>
				<Text style={{fontSize:14,color:'#ffffff',opacity:0.5}}>{this.state.country}</Text>				
				<Text style={{fontSize:25,color:'white'}}>{ this.state.city}</Text>
			</View>
		
			<View style={{top:50,alignItems:'center',justifyContent:'center'}}>
				<Text style={{textAlign:'center',fontSize:25,color:'#ffffff'}}>{this.state.message}</Text> 
				<Text style={{textAlign:'center',fontSize:25,color:'#ffffff', textDecorationLine: 'underline' }} >{this.state.washDate}</Text>
			</View>

			<Forecast 
				carState = {this.state.carState}
				callbackWashdate={this.handleWashdate.bind(this)}
				callbackCity={this.handleChanges.bind(this)}
				callbackLocationError= {this.handleLocationError.bind(this)}
				callbackServerError= {this.handleServerError.bind(this)}
			/>
				
	        <Car style={styles}/>  
	
			<CarState callbackState ={this.handleState.bind(this)}/>
	   	</View>
    );
  }

  handleLocationError(result){
    console.log('location',result);
    var navigator = this.props.navigator;
    navigator.replace({
        id: 'ErrorGpsPage',
      });
    }

  handleServerError(result){
    console.log('server',result);
    var navigator = this.props.navigator;
      navigator.replace({
          id: 'ErrorInternetPage',
        });
    }
  

	handleWashdate(result){
		console.log('result',result);
		if (result.length>=this.state.carState){
			this.setState({
				message:this.state.message='We recommend you to\n wash your car on:',
				washDate:this.state.washDate=moment(result[0].dt*1000).format("dddd, D"),
			}); 
		}
	}
	handleChanges(result) {
    	this.setState({
    		city:this.state.city = result.name,
    		country:this.state.country = result.country
    	});
    }	

	handleState(result) {
		console.log('state',result);
		this.setState({
			carState:this.state.carState = result,
		});
	}	
}

var styles = StyleSheet.create({
	container:{
		backgroundColor:'#046B9E',
		flex:1
	},
	carStyle:{
		position:'absolute',
		right:0,
		left:0,
		justifyContent: 'center',
		alignItems: 'center',
		bottom:190,
	}
});

module.exports = MainPage;