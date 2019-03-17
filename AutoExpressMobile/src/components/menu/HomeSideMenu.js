import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';

import { 
  NavigationActions,
  StackNavigator
} from 'react-navigation';

import Styles from '../../styles/Styles';


class HomeSideMenu extends Component {
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render () {
    return (
      <View style={Styles.navContainer}>
        <ScrollView>
          <View>
            <Text style={Styles.sectionHeadingStyle}>
              Section 1
            </Text>
            <View style={Styles.navSectionStyle}>
              <Text style={Styles.navItemStyle} onPress={this.navigateToScreen('Page1')}>
              Page1
              </Text>
            </View>
          </View>
          <View>
            <Text style={Styles.sectionHeadingStyle}>
              Section 2
            </Text>
            <View style={Styles.navSectionStyle}>
              <Text style={Styles.navItemStyle} onPress={this.navigateToScreen('Page2')}>
                Page2
              </Text>
              <Text style={Styles.navItemStyle} onPress={this.navigateToScreen('Page3')}>
                Page3
              </Text>
            </View>            
          </View>
          <View>
            <Text style={Styles.sectionHeadingStyle}>
              Section 3
            </Text>
            <View style={Styles.navSectionStyle}>
              <Text style={Styles.navItemStyle} onPress={this.navigateToScreen('Page4')}>
              Page4
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={Styles.footerContainer}>
          <Text>This is my fixed footer</Text>
        </View>
      </View>
    );
  }
}

HomeSideMenu.propTypes = {
  navigation: PropTypes.object
};

export default HomeSideMenu;