'use strict';
import React, { Component } from 'react';

import {
  StyleSheet,
  Text,View,Image
} from 'react-native';

var dayItem  = React.createClass({
	render: function(){
			return <View style={styles.item} >
						 <Image
		          			style={{width: 40, height: 40}}
		          			source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
		       			 />
						
						<Text style={styles.day}>
							{this.props.d}
						</Text>
					</View>
			
	}
});

const styles = StyleSheet.create({
	item:{
		alignItems:'center',
		justifyContent:'center'
	},
	day:{
		fontSize:16,
		paddingLeft:16,
		paddingRight:16,
		color:'#FFFFFF',
	}

});

module.exports=dayItem;
// export default dayItem;
