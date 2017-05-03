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
	View,ListView,ScrollView,Image,PermissionsAndroid,
	PanResponder,
	Animated,} from 'react-native';

exports.title = 'Geolocation';

export default class Carwash extends Component {

constructor(props) {
  super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
 	this.state = {
 		city:'Earth',
 		country:'PLANET',
 		message:'Well... Let\'s wait for a better\n day for your car wash',
 		washDate:"",
	    dataSource:ds.cloneWithRows([]),
        colorSource:['transparent','transparent'],
		pan: new Animated.ValueXY(), // inits to zero
		pan2: new Animated.ValueXY(), // inits to zero
		panResponder: PanResponder.create({onStartShouldSetPanResponder: () => true})	
		};
}


async locationAction() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': '`Persmission title',
        'message': 'Permission msg'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Do location action")
    } else {
      console.log("Do non-location thing")
    }
  } catch (err) {
    console.warn(err)
  }
}
componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({position});
        this.getWeatherApi(position);
      },
      (error) =>{console.log(JSON.stringify(error))},
      {enableHighAccuracy: true, timeout: 10000, maximumAge: 5000}
    );

    this.watchID = navigator.geolocation.watchPosition((position) => {
      this.setState({position});
      this.getWeatherApi(position);
    });

}

componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
}

render() {
    return (
    	<View style={styles.container}>	
    		
			<Animated.View
				{...this.state.panResponder.panHandlers}
	         	style={this.state.pan.getLayout()}>
	         	<Image style={{position:'absolute', margin:10,height:100,width:50,resizeMode:'contain'}}source={cloud}/>
	         	<Image style={{position:'absolute', marginTop:150, right:10,height:100,width:50, right:100,resizeMode:'contain'}}source={cloud_2}/>
	    		
	       </Animated.View>
	       <Animated.View
				{...this.state.panResponder.panHandlers}
	         	style={this.state.pan2.getLayout()}>
				<Image style={{position:'absolute', marginTop:50, right:10,height:100,width:50,resizeMode:'contain'}}source={cloud_4}/>		    	
	    		<Image style={{position:'absolute', top:150, left:70,height:100,width:50,resizeMode:'contain'}}source={cloud_3}/>
	    		
	       </Animated.View>
    		
			<View style={{marginLeft:16}}>
				<Text style={{fontSize:14,color:'#ffffff',opacity:0.5}}>{this.state.country}</Text>				
				<Text style={{fontSize:25,color:'white'}}>{this.state.city}</Text>
			</View>
		
			<View style={{top:50,alignItems:'center',justifyContent:'center'}}>
				<Text style={{textAlign:'center',fontSize:25,color:'#ffffff'}}>{this.state.message}</Text> 
				<Text style={{textAlign:'center',fontSize:25,color:'#ffffff', textDecorationLine: 'underline' }} >{this.state.washDate}</Text>
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
 		this.state.pan2.x  = -0.015*event.nativeEvent.contentOffset.x; 

 		this.setState({
			pan:this.state.pan,	
			pan2:this.state.pan2	
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

// : {"mocked":false,"timestamp":1493822251678,"coords":{"speed":0,"heading":0,"accuracy":20.174999237060547,"longitude":33.4458422,"altitude":0,"latitude":44.5921648}}
	async getWeatherApi(position) {
		// position = JSON.parse(position);
		var lat = position.coords.latitude;
		var lon = position.coords.longitude;	
		console.log(lat, lon);
	    try {
	    let response = await fetch('http://api.openweathermap.org/data/2.5/forecast/daily?&appid=f98dbbd0a843d201a2a5b407d984b04e&cnt=15&lat='+lat+'&lon='+lon);
	    let responseJson = await response.json();
	    var weatherList  =responseJson.list;
	    
		var weatherColorArray=[];
		for (var i = 0; i < weatherList.length; i++) {
			var icon = weatherList[i].weather[0].icon;
				switch (icon) {
		            case '01d':
		            		weatherColorArray.push('#00F000','#00F000');
		                break;
					case '02d':
							weatherColorArray.push('#FFC300','#FFC300');
		                break;
					case '03d':
					case '04d':						
							weatherColorArray.push('#FBFF3D','#FBFF3D');
		                break;
		                default:
		                	weatherColorArray.push('#FF6183','#FF6183');
	  	        }
        }
	

	    this.setState({
	    	city:this.state.city=responseJson.city.name,
	    	country:this.state.city=responseJson.city.country,
	    	dataSource: this.state.dataSource.cloneWithRows(weatherList),
        	colorSource:this.state.colorSource=weatherColorArray	
			});
	    } catch(error) {
	      console.error(error);
	    }
	
	// 	this.analyseWeather();
	// }
	// analyseWeather(){
	// 	this.setState({
	// 		message:this.state.message='We recommend you to\n wash your car on:',
	// 		washDate:this.state.washDate='Tuesday, 22',
	// 	});
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
		width:50,
		height:50,
		bottom:10,
		resizeMode: 'center',
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
    	bottom:-10,
    	resizeMode:'cover',

 	 	justifyContent: 'center',
    	alignItems: 'center',
 	},
 	scrollableView:{
 		alignItems:'flex-end',
 		justifyContent:'flex-end'
 	},

});

AppRegistry.registerComponent('Carwash', () => Carwash);
