import React, { Component } from 'react';
import moment from 'moment';
import {
	View,StyleSheet,
    Image,ScrollView,ListView,Text
} from 'react-native';

import Interactable from 'react-native-interactable';
import LinearGradient from 'react-native-linear-gradient';
import AddCalendarEvent from 'react-native-add-calendar-event';



let background_street = require('./img/background_street.png');
let icon_clear_sky=require('./img/icon_clear_sky.png');
let icon_clouds=require('./img/icon_clouds.png');
let icon_few_clouds=require('./img/icon_few_clouds.png');
let icon_thunderstorm=require('./img/icon_thunderstorm.png');
let icon_rain= require('./img/icon_rain.png');
let icon_snow=require('./img/icon_snow.png');
let icon_mist=require('./img/icon_mist.png');
let car_wheel = require('./img/car_wheel.png')

export default class Forecast extends Component {
	constructor(props) {
	 super(props);
	     const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
 		this.state = {
 		dataSource:ds.cloneWithRows([]),
        colorSource:['transparent','transparent'],
		};
	}  

	componentDidMount() {
	    navigator.geolocation.getCurrentPosition(
	      (position) => {
		   		this.getWeatherApi(position.coords);
	      },
	      (error) =>{
	     	if(this.props.callbackLocationError!=null)this.props.callbackLocationError(error);
	      },
	      {enableHighAccuracy: false, timeout: 30000, maximumAge: 10000}
	    );
		    this.watchID = navigator.geolocation.watchPosition((position) => {
			this.getWeatherApi(position.coords);
		}); 	
	}
    render() {
		return <ScrollView
					showsHorizontalScrollIndicator={false}
 			        horizontal={true}>

				 	<View style={styles.scrollableView}>
							<Image style={styles.backgroundStyle}								
									source={background_street}/>
					    	
					 		<View style={this.props.isJustView? {height:0} : {height:105,bottom:10}}>
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


	async getWeatherApi(coords) {
		if (this.props.isJustView)return;
		let lat = coords.latitude;
		let lon = coords.longitude;	

	    fetch('http://api.openweathermap.org/data/2.5/forecast/daily?&appid=f98dbbd0a843d201a2a5b407d984b04e&cnt=15&lat='+lat+'&lon='+lon)
	        .then((response) => response.json())
			.then((responseJson) => {	
		    	this.analyseWeather(responseJson.list);		      
	    		if (this.props.callbackCity!=null)this.props.callbackCity(responseJson.city);
		      })
      		.catch((error) => {
     			if (this.props.callbackServerError!=null)this.props.callbackServerError("fail server");
     		 });
	}
	
	handleScroll=(event: Object)  => {		
			this.state.offset_x = event.nativeEvent.contentOffset.x; 
	 		this.setState({
				offset_x:this.state.offset_x
	 		});
	}
	analyseWeather(weatherList){
			var goodDayArray=[];
			var weatherColorArray=[];
			for (var i = 0; i < weatherList.length; i++) {
				var item = weatherList[i];
				var icon = item.weather[0].icon;
				
				if (icon.match('01')||icon.match('01')){
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
		    	dataSource: this.state.dataSource.cloneWithRows(weatherList),
	        	colorSource:this.state.colorSource=weatherColorArray	
				});
		if (this.props.callbackWashdate!=null)this.props.callbackWashdate (goodDayArray) 	
	}
}
var styles = StyleSheet.create({
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

 	backgroundStyle:{
		width:15*72+15*1,
 	},

 	scrollableView:{
 		alignItems:'flex-end',
 		justifyContent:'flex-end'
 	},
 });