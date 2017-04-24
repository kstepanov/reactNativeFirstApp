/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
var minSecMs= require ('minutes-seconds-milliseconds');
import {	
TouchableHighlight,
InputButton,
AppRegistry,
StyleSheet,
Text,
View,ListView
} from 'react-native';

var laps=[];

export default class testReact extends Component {
constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        
        this.initialState = {
            timeUpdate: 0,
            startTime:0,
            isTimerRunning:false,
            dataSource:ds.cloneWithRows([]),
        };
       this.state = this.initialState;

    }

  render() {
    return (
    	<View style={styles.container}>
    		<View style={styles.header}>
				<View style={styles.timer}>
					<Text style={styles.timerStyle}> 
	    				{minSecMs(this.state.timeUpdate)}
	    			</Text>
				</View>

 				<View style={styles.buttonView}>
					{this.startStopButton()}
        			{this.lapButton()}    	
 				</View>
    		</View>
    	    	
			<View style={styles.footer}>
	    			{this.lapsView()}
    		</View> 	
    	
    	</View>
    );
  }

  lapsView(){
  	return <ListView
		enableEmptySections={true}
        dataSource={this.state.dataSource}
        renderRow={(rowData,sectionID,rowID) => 
			<View style={styles.buttonView}>
  	  			<Text style={{fontSize:30}}>
  					Lap #{parseInt(rowID)+1}
  				</Text>
  				<Text style={{fontSize:30}}>
  					{minSecMs(rowData)}
  				</Text>
  			</View>
      }
        />
  }
startStopButton() {
 	var buttonColor= this.state.isTimerRunning?'green':'gray';
	var buttonStyle= {borderColor:buttonColor};
 	
 	return <TouchableHighlight
	 	style={[styles.buttonStyle,buttonStyle]}
	 	underlayColor={buttonColor}
	 	onPress={this.handleStartStopPress}>
			<Text style={styles.buttonTextStyle}>
				{this.state.isTimerRunning?'STOP':'START'}
			</Text>
    	</TouchableHighlight>
 }

	lapButton() {
	var buttonColor= this.state.isTimerRunning?'gray':'gray';
	var buttonStyle= {borderColor:buttonColor};
 	
 	return <TouchableHighlight
 	 	style={[styles.buttonStyle,buttonStyle]}
 		underlayColor='orange'
 		onPress={this.handleLapPress}>
    		<Text style={styles.buttonTextStyle}>
    			LAP
    		</Text>
    </TouchableHighlight>
 } 
	
	handleStartStopPress = () => {
		this.state.startTime = new Date();
		if (!this.state.isTimerRunning){
			laps=[];
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(laps),
			}) ;
	
		}else{
			clearInterval(this.interval);
			this.setState({
				timeUpdate:null,
				isTimerRunning:false,
				dataSource: this.state.dataSource.cloneWithRows(laps),
			}) ;	
			return;
		}
		this.interval = setInterval(()=>{
			this.setState({
				isTimerRunning:true,
		        timeUpdate: new Date()-this.state.startTime,
			 });
		}, 50);
	 };
	handleLapPress = () => {
		if (this.state.isTimerRunning){
			laps=laps.concat([this.state.timeUpdate]);
			this.setState({
				startTime:new Date(),
				dataSource: this.state.dataSource.cloneWithRows(laps),
			});	
		}
	}
}

var styles = StyleSheet.create({
	container:{
		alignItems:'stretch',
		flex:1
	},
	
	timer:{
		alignItems:'center',
		justifyContent:'center',
		flex:1.5,
	},


	 header:{
	 	flex:1,
		
	 },

	 footer:{
	 	borderWidth:4,
 		flex:1,
 		margin:16,
 		padding:8,
 		borderColor:'gray',
 	},
	
	buttonView:{
		flexDirection:'row',
		flex:1,
		justifyContent:'space-around', 
		alignItems:'center'
	},

	timerStyle:{
		fontSize: 70,
 		fontWeight: 'bold',
	},

	buttonStyle:{
		borderWidth:4,
		height:75,
		justifyContent:'center',
		alignItems:'center',
		width:150,
		borderRadius:50,	
	},
	buttonTextStyle:{
		fontSize: 20,
 		fontWeight: 'bold',

	},
	border:{
		borderColor:'#777777',
		borderWidth:4,
	}
});

AppRegistry.registerComponent('FirstApp', () => testReact);
