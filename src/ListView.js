import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,ListView,
  View
} from 'react-native';

import Style from './Style';
import InputButton from './InputButton';

class ReactCalculator extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
    };
  }

  render() {
    return (
      <ListView

        horizontal={true}
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <Text>{rowData}</Text>}
      />
    );
  }
}
AppRegistry.registerComponent('ReactCalculator', () => ReactCalculator);
