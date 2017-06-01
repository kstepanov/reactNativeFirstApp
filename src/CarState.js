import React, { Component } from 'react';
import {
	View,StyleSheet,
    TouchableHighlight,
    Text,Dimensions
} from 'react-native';

import Interactable from 'react-native-interactable';

export default class CarState extends Component {
	constructor(props) {
	 super(props);
	 this.state = {};
	}  

	componentDidMount() {
	 	var step = Dimensions.get('window').width/3;
	  	this.setState({
			snapPoints:this.state.snapPoints = [{x: -step} ,{x: 0},{x:step}]
	 	});	
	}

    render() {
        return (
        	 <View ref='carStateView'
 				style={styles.carViewStateStyle}>		
				<Interactable.View 
				  ref='roundInstance'
				  horizontalOnly={true}
				  snapPoints={this.state.snapPoints}
				  style={{position:'absolute',}}>
		       		<View style={[styles.roundButtonStyle]} />
	 			</Interactable.View>

				<TouchableHighlight
					underlayColor='transparent'
					style={[styles.buttonStyle]}
			 		onPress={this.handlePress.bind(this, 0)}>
					<Text style={styles.textButtonStyle}>CLEAN</Text>
				</TouchableHighlight>

				<TouchableHighlight 
					underlayColor='transparent'
					style={styles.buttonStyle}
			 		onPress={this.handlePress.bind(this, 1)}>
						<Text style={styles.textButtonStyle}>NORMAL</Text>
				</TouchableHighlight>

				<TouchableHighlight 
					underlayColor='transparent'
					style={styles.buttonStyle}
			 		onPress={this.handlePress.bind(this, 2)}>
	 					<Text style={styles.textButtonStyle}>DIRTY</Text>
	 			</TouchableHighlight>
			</View>
        )
    }    
	
	handlePress = (what) => {
		console.log(what);
 	    this.setState({
	      carState: this.state.carState=what 
	    });
	 	this.refs['roundInstance'].snapTo({index: this.state.carState});
	}
}
var styles = StyleSheet.create({
	buttonStyle:{
		height:30,
		flex:1,
		alignItems:'center',
		justifyContent:'center',
	},

 roundButtonStyle:{
		height:30,
		width:90,
		borderColor:'white',
		backgroundColor:'white',
		borderRadius:20,	
	 },	
	textButtonStyle:{
		fontSize:12,
		color:"#6D90A5",
	},

	carViewStateStyle:{
		height:75,
		alignItems:'center',
		justifyContent: 'center',
		flexDirection:'row'
	},
 });