import React from 'react';
import { StyleSheet } from 'react-native';
import home from "./home.js"
import signup from "./signUp.js"
import meals from "./meals.js"
import receipt from "./receipt.js"
import orderPlaced from "./oredrPlaced.js"
import orderHistory from "./orderHistory.js"
import locationFunc from "./location.js"

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack"

const Stack = createStackNavigator();

export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        
        <Stack.Screen name="Home" component={home}/>
        <Stack.Screen name="Sign Up" component={signup}/>
        <Stack.Screen name="Meal List" component={meals}/>
        <Stack.Screen name="Order Summary" component={receipt}/>
        <Stack.Screen name="Receipt" component={orderPlaced}/>
        <Stack.Screen name="Order History" component={orderHistory}/>
        {/* <Stack.Screen name="Location" component={locationFunc}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
