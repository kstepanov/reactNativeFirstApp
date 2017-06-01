/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import moment from 'moment';

import {	
	AppRegistry,StyleSheet,Text,
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

export default class AppCarwash extends Component {
constructor(props) {
  super(props);
 	this.state = 	{
		message:'Well... Let\'s wait for a better\n day for your car wash',
 		washDate:"",
 		offset_x:0,
		};

}


render() {
    return (
    	<View style={styles.container}>	
    		<Interactable.View style={{left :50,position:'absolute'}}
    				initialPosition={{x: -0.025*this.state.offset_x, y: 0}}>
						<Image style={{height:100,width:50,resizeMode:'contain'}}source={cloud}/>
	       </Interactable.View>
		
			<Interactable.View style={{right: 50, top:175,position:'absolute'}}	
	       		initialPosition={{x: -0.015*this.state.offset_x, y: 0}}>
				         	<Image style={{height:100,width:50,resizeMode:'contain'}}source={cloud_2}/>
	       </Interactable.View>
		
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
			callbackWashdate={this.handleWashdate.bind(this)}
			callbackCity={this.handleChanges.bind(this)}/>
			<Car/>	
			<CarState callback ={this.handleState.bind(this)}/>
	   	</View>
    );
  }
	
	handleWashdate(result){
	if (result.length>=0){
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
	this.setState({
		city:this.state.city = result.name,
		country:this.state.country = result.country
	});
}	
}

	

var styles = StyleSheet.create({
	container:{
		backgroundColor:'#046B9E',
		flex:1
	}

});

AppRegistry.registerComponent('AppCarwash', () => AppCarwash);
