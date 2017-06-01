import React, { Component } from 'react';
import {
	View,StyleSheet,
    Image
} from 'react-native';

import Interactable from 'react-native-interactable';

let car_wheel = require('./img/car_wheel.png')

export default class Car extends Component {
	constructor(props) {
	 super(props);
	 this.state = {};
	}  

    render() {
    	return <View style={styles.carWheelContainerStyle}>
		 	<Image 
				style={styles.carWheelStyle}
    			source={car_wheel}/>
    	</View>
    }    
}
var styles = StyleSheet.create({
	carWheelStyle:{
		width:200,
		bottom:10,
		resizeMode: 'contain',
		height:70,
		marginLeft:5,
		marginRight:5

	},
	
	carWheelContainerStyle:{
		position: 'absolute',
		right:0,
		left:0,
		bottom:170,
		alignItems:'center'
	},
 });