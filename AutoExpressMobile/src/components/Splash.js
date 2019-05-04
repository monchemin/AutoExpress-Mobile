import Styles from '../styles/Styles';
import React, { Component } from 'react';
import { Text, View } from 'react-native';

class Splash extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Splash Screen a realiser.</Text>
      </View>
    );
  }
}

export default Splash;