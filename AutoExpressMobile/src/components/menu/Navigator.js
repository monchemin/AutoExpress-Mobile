import React, { Component } from "react";
import {
  createBottomTabNavigator,
  createDrawerNavigator,
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
  TabScene,
  NavigationScreenProps
} from "react-navigation";
import Styles from '../../styles/Styles';
import { Button, Icon } from "react-native-elements";
import Splash from '../Splash';
import HomeApp from '../HomeApp'
import RegisterForm from '../login/RegisterForm';
import Login from '../login/Login';
import ListRoute from '../reservation/ListRoute';
import ReservationRoute from '../reservation/ReservationRoute'
import Driver from '../driver/Driver'
import CreateRoute from '../route/CreateRoute'
import BurgerMenu from './BurgerMenu';


const homeNavigator = createDrawerNavigator(
	{ 
		HomeApp : {
		  screen: HomeApp
		}, 
		ListRoute: {
		  screen: (props=homeNavigator.props) => <ListRoute screenProps = {props} />
		},
		/*ListRoute: {
		  screen: (props=homeNavigator.props) => <ListRoute {...props}/>
		},*/
		Driver,
		CreateRoute
	}, 
    { initialRouteName: "HomeApp"},
	{ contentComponent: BurgerMenu }
);
homeNavigator.navigationOptions = ({ navigation }: NavigationScreenProps) => {
  let headerTitle = "Mon Etrange";
	let headerLeft =
	    <Icon
	      name="md-menu"
	      type="ionicon"
	      style={ Styles.menuIcon }
	      onPress={() => navigation.toggleDrawer()}
	    />
  return {
  	headerTitle,
  	headerLeft
  };
};

const LoginHomeNavigator = createStackNavigator(
  { Login, homeNavigator },
  { initialRouteName: "Login"}
);
LoginHomeNavigator.navigationOptions = ({ navigation }: NavigationScreenProps) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) { //faire une condition sur un screen plutot que index dans la navigation
    tabBarVisible = false;
  }
  return {
    tabBarLabel: "Login",
    tabBarIcon: ({ tintColor }: TabScene) => (
     <Icon name="ios-home" type="ionicon" color={tintColor} />
    ),
    tabBarVisible
  };
};

const LoginRegisterNavigator = createBottomTabNavigator(
	{ LoginHomeNavigator, RegisterForm },
	{ initialRouteName: "LoginHomeNavigator" }
	);

const RootSwitch = createSwitchNavigator(
  { Splash, LoginRegisterNavigator },
  { initialRouteName: "LoginRegisterNavigator" }
);

export default createAppContainer(RootSwitch);