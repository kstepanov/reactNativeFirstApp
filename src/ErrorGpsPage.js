import React, { Component } from 'react';
import {
	Button
} from 'react-native';
import { Navigator,Text,View} from 'react-native';


class ErrorGpsScreen extends Component {
    render() {
    return (
      <View style={{flex: 1, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color: 'white', fontSize: 32,}}>error gps</Text>
      </View>
    );
  }
}
module.exports = ErrorGpsScreen;