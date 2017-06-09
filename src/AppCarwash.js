/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component} from 'react';
import {Navigator,AppRegistry,View} from 'react-native';

import ErrorInternetPage from './ErrorInternetPage';
import ErrorGpsPage from './ErrorGpsPage';
import MainPage from './MainPage';

import SplashPage from './SplashPage';

class AppCarwash extends Component {
  render() {
    return (
        <Navigator
          initialRoute={{id: 'SplashPage', name: 'Index'}}
          renderScene={this.renderScene.bind(this)}
          configureScene={(route) => {
            if (route.sceneConfig) {
              return route.sceneConfig;
            }
            return Navigator.SceneConfigs.FloatFromRight;
          }} />
    );
  }
 
  renderScene(route, navigator) {
    var routeId = route.id;
    if (routeId === 'SplashPage') {
      return (
        <SplashPage
          navigator={navigator} />
      );
    }
    if (routeId === 'MainPage') {
      return (
        <MainPage
          navigator={navigator} />
      );
    }
    if (routeId === 'LoadingPage') {
      return (
        <LoadingPage
          navigator={navigator} />
      );
    }
    if (routeId === 'ErrorGpsPage') {
      return (
        <ErrorGpsPage
          navigator={navigator} />
      );
    }
    if (routeId === 'ErrorInternetPage') {
      return (
        <ErrorInternetPage
          navigator={navigator} />
      );
    }
  }
}
AppRegistry.registerComponent('AppCarwash', () => AppCarwash);