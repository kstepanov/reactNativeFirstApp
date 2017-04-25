/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
var minSecMs= require ('minutes-seconds-milliseconds');
import {	
TouchableOpacity, 
AppRegistry,
StyleSheet,
Text,Dimensions,
View,ListView,ScrollView,Image 
} from 'react-native';

var laps=[1,1,1,1,1,1,1,1,1,1]

export default class Carwash extends Component {
constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.initialState = {
            dataSource:ds.cloneWithRows(laps),
        };
       this.state = this.initialState;

    }

  render() {
    return (
    	<View style={styles.container}>
	    	    	   	
    		{this.showCarView()}
    		{this.showListViewWithBackground()}
			<View style={{height:75,flexDirection:'row'}}>
				{this.cleanButton()}
				{this.normalButton()}    	
				{this.dirtyButton()}
			</View>	
	   	</View>
    );
  }
 
	showCarView(){
		return <View 
			style={{justifyContent:'center',alignItems:'center'}}>
		 	<Image 
				style={styles.carWheelStyle}
    			source={require('./img/car_wheel.png')}/>
    	</View>
	}

	

	cleanButton(){
		return <View style={{flex:1,backgroundColor:'orange'}}></View>
	}

	normalButton(){
		return <View style={{flex:1,backgroundColor:'red'}}></View>
	}

	dirtyButton(){
		return <View style={{flex:1,backgroundColor:'blue'}}></View>
	}


	showListViewWithBackground(){
		let width = Dimensions.get('window').width

		return <View style={{ flex:1, backgroundColor: 'transparent' }}>
		<ScrollView 
	        showsHorizontalScrollIndicator={false}
	        horizontal={true}
	        style={{backgroundColor:'#165488'}}>
		 	
		 	<View>
				<Image
		        	style={{position: 'absolute', right:0, left:0,bottom:0}}
					source={require('./img/background_street.png')}/>
					<ListView style={styles.listViewBorder}
					  	    showsHorizontalScrollIndicator={false}
				  			horizontal={true}
							enableEmptySections={true}
					        dataSource={this.state.dataSource}
					        renderRow={(rowData,sectionID,rowID) => 
										<View style={styles.rowStyle}>
							    			<Image 
							    				style={styles.imageRowStyle}
							    				source={require('./img/icon_clear_sky.png')}/>
							  	  			<Text style={{fontSize:10,color:'#ffffff'}}>
													THU, 22
							  				</Text>
							  			</View>
						    			}	
						        	/>	 
		 	</View>
				</ScrollView> 
      </View>
	}
	
	handleLapPress = () => {
			laps=laps.concat(2);
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(laps),
			});	
	}
}

var styles = StyleSheet.create({
	container:{
		backgroundColor:'#1072A3',
		alignItems:'baseline',
		flex:1
	},
	rowStyle:{
		marginRight:1,
		width:72,
		height:95,
		backgroundColor:'#50321323',
		justifyContent:'center',
		alignItems:'center'
		},
	imageRowStyle:{
		marginBottom:10,
		width:50,
		height:50
	},
	carWheelStyle:{

		width:200,
		height:69,
		marginLeft:5,
		marginRight:5
	},

	listViewBorder:{
		borderTopColor:'red',
  		borderTopWidth:5
	},	

	topLeft:{
    position: 'absolute',
    left: 0,
    top: 0
  },
    topRight:{
    position: 'absolute',
    right: 0,
    top: 0
  },
    bottomLeft:{
    position: 'absolute',
    left: 0,
    bottom: 0
  },
    bottomRight:{
    position: 'absolute',
     right: 0,
    bottom: 0
  }
});

AppRegistry.registerComponent('FirstApp', () => Carwash);
