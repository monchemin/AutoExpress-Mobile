import React, {Component} from 'react';
import { ScrollView } from "react-native";
import { Button } from "react-native-elements";
import {
  DrawerItems,
  NavigationInjectedProps,
  SafeAreaView,
  withNavigation
} from "react-navigation";
import Styles from '../../styles/Styles';

class BurgerMenu extends Component {

  callForm(form) {
    this.props.navigation.navigate(form)
    /*this.props.navigation.dispatch(StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: form, 
              params: { userId: this.state.responseData.customerInfo[0].PK } 
            })
          ]
        })) */
  }

  render () {
    return (      
        <ScrollView>
          <DrawerItems {...this.props} />
          <Button
          icon={{ name: "md-log-out", type: "ionicon" }}
          title='Déconnexion'
          iconContainerStyle={Styles.menuIcon}
          buttonStyle={styles.menuButton}
          titleStyle={styles.menuTitle}
          onPress={() => this.props.navigation.navigate("Login")}
        />
        </ScrollView>
        
    );
  }
}

export default withNavigation(BurgerMenu);