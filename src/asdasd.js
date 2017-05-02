/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import LinearGradient from 'react-native-linear-gradient';

import React, { Component } from 'react';
var moment= require('moment');
var minSecMs= require ('minutes-seconds-milliseconds');
var background_street = require('./img/background_street.png');
var icon_clear_sky=require('./img/icon_clear_sky.png');
var icon_clouds=require('./img/icon_clouds.png');
var icon_few_clouds=require('./img/icon_few_clouds.png');
var icon_thunderstorm=require('./img/icon_thunderstorm.png');
var icon_rain= require('./img/icon_rain.png');
var icon_snow=require('./img/icon_snow.png');
var icon_mist=require('./img/icon_mist.png');
var icon_mist=require('./img/icon_mist.png');
var car_wheel = require('./img/car_wheel.png')

var cloud= require('./img/cloud.png');
var cloud_2=require('./img/cloud_2.png');
var cloud_3=require('./img/cloud_3.png');
var cloud_4=require('./img/cloud_4.png');


import {	
	TouchableOpacity, 
	AppRegistry,
	StyleSheet,
	Text,Dimensions,
	View,ListView,ScrollView,Image,
	PanResponder,
	Animated,} from 'react-native';


export default class Carwash extends Component {

constructor(props) {
  super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
 	this.state = {
 		city:'Earth',
 		country:'PLANET',
	    dataSource:ds.cloneWithRows([]),
        colorSource:['transparent','transparent'],
		pan: new Animated.ValueXY(), // inits to zero
		panResponder: PanResponder.create({onStartShouldSetPanResponder: () => true})	
		};
	this.getWeatherApi();
}

render() {
    return (
    	<View style={styles.container}>	
    		
		<Animated.View
			{...this.state.panResponder.panHandlers}
         	style={this.state.pan.getLayout()}
         	>
         		         	<Image style={{position:'absolute', margin:10,height:100,width:50,resizeMode:'contain'}}source={cloud}/>
    		
    		
			<View style={{marginLeft:16}}>
				<Text style={{fontSize:14,color:'#ffffff',opacity:0.5}}>{this.state.country}</Text>				
				<Text style={{fontSize:25,color:'white'}}>{this.state.city}</Text>
			</View>
		
			<View style={{top:50,alignItems:'center',justifyContent:'center'}}>
				<Text style={{textAlign:'center',fontSize:25,color:'#ffffff'}}>We recommend you {'\n'} to wash your car on:</Text> 
				<Text style={{textAlign:'center',fontSize:25,color:'#ffffff', textDecorationLine: 'underline' }} >Thursday, 22</Text>
			</View>
			

			{this.showListViewWithBackground()}
			{this.showCarView()}
			{this.showCarStateButtonView()}

	   	</View>
    );
  }

 	showCarStateButtonView(){
 		return <View style={styles.carViewStateStyle}>
				{this.cleanButton()}
				{this.normalButton()}    	
				{this.dirtyButton()}
			</View>
 	}
	showCarView(){
		return <View style={styles.carWheelContainerStyle}>
		 	<Image 
				style={styles.carWheelStyle}
    			source={car_wheel}/>
    	</View>
	}

	

	cleanButton(){
		return <View style={styles.buttonStyle}><Text style={styles.textButtonStyle}>CLEAN</Text></View>
	}

	normalButton(){
		return <View style={styles.buttonStyle}><Text style={styles.textButtonStyle}>NORMAL</Text></View>
	}

	dirtyButton(){
		return <View style={styles.buttonStyle}><Text style={styles.textButtonStyle}>DIRTY</Text></View>
	}
	

	handleScroll=(event: Object)  => {		
		this.state.pan.x  = -0.005*event.nativeEvent.contentOffset.x; 
 		this.setState({
			pan:this.state.pan	
 		});
		console.log(this.state.offset_x);
	}


	
	showListViewWithBackground(){
		return <ScrollView
			onScroll={this.handleScroll} scrollEventThrottle={10} 
			showsHorizontalScrollIndicator={false}
	        horizontal={true}>

		 	<View style={styles.scrollableView}>
					<Image style={styles.backgroundStyle}							
							source={background_street}/>
			    	
			 		<View style={styles.horizontalListView}>
			 			<LinearGradient
				    		start={{x: 0.0, y: 0}} end={{x: 1, y: 0}}
			    			style={{height:10}}
							colors={this.state.colorSource}
							/>

						<ListView 
					  	    showsHorizontalScrollIndicator={false}
				  			horizontal={true}
							enableEmptySections={true}
					        dataSource={this.state.dataSource}
					        renderRow={(rowData,sectionID,rowID) => 
						    	this.getItemWeather(rowID,rowData)
							}	
						/>	 
					</View>
		 	</View>
		</ScrollView> 
 	}

	getItemWeather (position,rowData){
		var simpleDate ='NOW';
		var miliseconds = rowData.dt;
		var drawable = rowData.weather[0].icon;
		if(position!=0){
			simpleDate = moment(miliseconds*1000).format("ddd, D").toUpperCase();
		}
		 switch (drawable) {
            case '01d':
            		drawable=icon_clear_sky;
                break;
            case '02d':
            		drawable=icon_few_clouds;
                break;
            case '03d':
            case '04d':
            		drawable=icon_clouds;
                break;
			case '09d':
            case '10d':
            		drawable=icon_rain;
                break;

			case '11d':
            	drawable=icon_thunderstorm;
            	break;
			
			case '13d':
            	drawable=icon_snow;
            break;
            
            case '50d':
            	drawable=icon_mist;
            break;

        }

		return	<View style={styles.itemStyle}>
				<Image 
					style={styles.imageItemStyle}
					source={drawable}
					/>
				<Text style={{fontSize:10,color:'#ffffff'}}>
						{simpleDate}
				</Text>
			</View>
	}

	async getWeatherApi() {
	    try {
	    let response = await fetch('http://api.openweathermap.org/data/2.5/forecast/daily?&appid=f98dbbd0a843d201a2a5b407d984b04e&cnt=15&lat=44.6166&lon=33.5254');
	    let responseJson = await response.json();
	    var weatherList  =responseJson.list;
	    
		var weatherColorArray=[];
		for (var i = 0; i < weatherList.length; i++) {
			var icon = weatherList[i].weather[0].icon;
				switch (icon) {
		            case '01d':
		            		weatherColorArray.push('#00F000');
		                break;
					case '02d':
							weatherColorArray.push('#FFC300');
		                break;
					case '03d':
					case '04d':						
							weatherColorArray.push('#FBFF3D');
		                break;
		                default:
		                	weatherColorArray.push('#FF6183');
	  	        }
        }
	

	    this.setState({
			dataSource: this.state.dataSource.cloneWithRows(weatherList),
        	colorSource:this.state.colorSource=weatherColorArray	
			});
	    } catch(error) {
	      console.error(error);
	    }
	}
}

var styles = StyleSheet.create({
	container:{
		backgroundColor:'#1072A3',
		flex:1
	},
	itemStyle:{
		marginRight:1,
		width:72,
		height:95,
		backgroundColor:'#50321323',
		justifyContent:'center',
		alignItems:'center'
		},
	imageItemStyle:{
		marginBottom:10,
		width:40,
		resizeMode: 'contain',
		height:40
	},

	carWheelContainerStyle:{
		position: 'absolute',
		right:0,
		left:0,
		bottom:170,
		alignItems:'center'
	},
	carWheelStyle:{
		width:200,
		resizeMode: 'contain',
		height:70,
		marginLeft:5,
		marginRight:5
	},

	buttonStyle:{
		flex:1,
		alignItems:'center',
		justifyContent:'center'
	},
	
	textButtonStyle:{
		fontSize:16,
		color:"white",
	},

	horizontalListView:{
		height:95,
	},	
	carViewStateStyle:{
		height:75,
		flexDirection:'row'
	},
 	
 	backgroundStyle:{
		width:15*72+15*1,
 		flex:1,
 		height: undefined,
 		justifyContent: 'center',
    	alignItems: 'center',
    	bottom:-10,
    	resizeMode:'cover'
 	},
 	scrollableView:{
 		alignItems:'flex-end',
 		justifyContent:'flex-end'
 	},

});

AppRegistry.registerComponent('FirstApp', () => Carwash);
