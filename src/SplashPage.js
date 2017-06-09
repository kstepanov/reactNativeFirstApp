
import React, { Component} from 'react';
import { Navigator,Text,View,Image,StyleSheet} from 'react-native';

import Car from './Car';
import Forecast from './Forecast';

let logo = require('./img/logo.png')

class SplashPage extends Component {
  componentWillMount() {
    var navigator = this.props.navigator;
    setTimeout(() => {
      navigator.replace({
        id: 'MainPage',
      });
    }, 2000);
  }
  render() {
    return (
      <View style={styles.container}>
        
          <Forecast isJustView={true}/>
          <View style={styles.logoContainer}> 
              <Image style={styles.logoStyle}
                  source={logo}/>
          </View>
          <Car style={styles}/>  
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container:{
    backgroundColor:'#046B9E',
    flex:1
  },
  logoContainer:{
    position:'absolute',
    top:100,
    justifyContent: 'center',
    alignItems: 'center',
    right:0,
    left:0, 
  },
  logoStyle:{
    width:250,
    height:70,
    resizeMode: 'contain',
  },
  carStyle:{
    position: 'absolute',
    right:0,
    left:0,
    alignItems: 'center',
    bottom:10,
  },
});
module.exports = SplashPage;