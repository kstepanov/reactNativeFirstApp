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

const SUN_DAYS= 3;
import {	
	TouchableOpacity, 
	AppRegistry,
	StyleSheet,
	Text,Dimensions,TouchableHighlight,
	View,ListView,ScrollView,Image,PermissionsAndroid,
	PanResponder,
	Animated,
    Easing} from 'react-native';

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
 		carState:2,
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
				
				<View style={[styles.roundButtonStyle]} />
 			
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

handleLapPress = () => {

}	

	cleanButton(){
		return <View style={[styles.buttonStyle]}><Text style={styles.textButtonStyle}>CLEAN</Text></View>
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
									<View style={styles.itemStyle}>
										<Image 
											style={styles.imageItemStyle}
											source={this.getItemDrawable(rowData.weather[0])}
											/>
										<Text style={{fontSize:10,color:'#ffffff'}}>
												{(rowID!=0)?this.getItemText(rowData.dt*1000):'NOW'}
										</Text>
											
										<View style={{position:'absolute',backgroundColor:'#367DAA',
													bottom:0,
													width:72,
													height:1}}/>
										<View style={{position:'absolute',backgroundColor:'#367DAA',
													right:0,
													width:1,
													height:96}} />
									</View>
							}	
						/>	 
					</View>
		 	</View>
		</ScrollView> 
 	}

	getItemDrawable(weather){
		var drawable = icon_clear_sky;
	    if (weather.icon.match('01'))drawable=icon_clear_sky;               
        if (weather.icon.match('02'))drawable=icon_few_clouds;
        if (weather.icon.match('04')||weather.icon.match('03'))drawable=icon_clouds;
        if (weather.icon.match('09')||weather.icon.match('10'))drawable=icon_rain
        if (weather.icon.match('11'))drawable=icon_thunderstorm;
		if (weather.icon.match('13'))drawable=icon_snow;
		if (weather.icon.match('50'))drawable=icon_mist;
		return drawable;
	}
	getItemText(miliseconds){
		return 	moment(miliseconds).format("ddd, D").toUpperCase();
	}

	async getWeatherApi(position) {
		let lat = position.coords.latitude;
		var lon = position.coords.longitude;	
		console.log(lat, lon);
	    try {
	    let response = await fetch('http://api.openweathermap.org/data/2.5/forecast/daily?&appid=f98dbbd0a843d201a2a5b407d984b04e&cnt=15&lat='+lat+'&lon='+lon);
	    let responseJson = await response.json();
	    var weatherList  =responseJson.list;
	    
	    var goodDayArray=[];
		var weatherColorArray=[];
		for (var i = 0; i < weatherList.length; i++) {
			var item = weatherList[i];
			var icon = item.weather[0].icon;
			
			if (icon.match('01')){
		        goodDayArray.push(item);
				color = '#00F000';
		    } else{
		    	if(goodDayArray.length<this.state.carState) goodDayArray =[];
		    	color = '#FF6183';
		    }
		
		    if (icon.match('02')){
				color = '#FFC300';
			}
		
			if (icon.match('03')||icon.match('04')){
				color = '#FBFF3D';
		    }
		    
		    if (icon.match('03')||icon.match('04')){
				color = '#FBFF3D';
			}
			weatherColorArray.push(color,color);
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

	    console.log('goodDayArray',goodDayArray);
        
        if (goodDayArray.length>=this.state.carState){
        	goodDayArray[0].dt
	       this.setState({
				message:this.state.message='We recommend you to\n wash your car on:',
				washDate:this.state.washDate=moment(goodDayArray[0].dt*1000).format("dddd, D"),
			});
        }
	}
}

	

var styles = StyleSheet.create({
	container:{
		backgroundColor:'#046B9E',
		flex:1
	},
	itemStyle:{
		marginRight:1,
		width:72,
		height:95,
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
		bottom:10,
		resizeMode: 'contain',
		height:70,
		marginLeft:5,
		marginRight:5
	},

	buttonStyle:{
		flex:1,
		alignItems:'center',
		justifyContent:'center',
		
	},

 roundButtonStyle:{
	 	position:'absolute',

		height:40,
		width:120,

		borderColor:'white',
		backgroundColor:'white',
		// margin:10,
		borderRadius:20,	
	 },	
	textButtonStyle:{
		fontSize:12,
		color:"#6D90A5",
	},

	horizontalListView:{
		height:105,
	},	
	carViewStateStyle:{
		height:75,
		alignItems:'center',
		justifyContent:'center',
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
