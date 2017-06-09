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
    	const carStyle = this.props.style.carStyle ;
    	return <View style={carStyle}>
		 	<Image 
				style={styles.carImageStyle}
    			source={car_wheel}/>
    	</View>
    }    
}
var styles = StyleSheet.create({
	carImageStyle:{
		width:200,
		resizeMode: 'contain',
		height:70,
		marginLeft:5,
		marginRight:5,
	},	
});