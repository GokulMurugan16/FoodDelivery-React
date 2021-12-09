import React from 'react';
import { StyleSheet, Text, View, ImageBackground,Button } from 'react-native';


export default function orderPlaced({route,navigation})
{
    return(
        <ImageBackground source = {require("./assets/food.jpg")} style = {{width:undefined,height:'100%',alignItems:"center" ,justifyContent:"center"}}>
            <View style = {styles.container}>
                <Text style = {{fontWeight:"bold", fontSize:38}}> Order Placed </Text>
                <Text style = {{fontSize:24,fontWeight:"bold",marginBottom:10}}> Reference Number : {route.params.SKU}</Text>
                <Button title = "Pickup Order" onPress = {()=>{
                    navigation.push("Location")
                }}/>
            </View>
        </ImageBackground>
        
    )
}

const styles = StyleSheet.create({
    container: {
    position:"absolute",
    width:"80%",
    height:"90%",   
    borderRadius:20,
    backgroundColor:"white",
    alignItems: 'center',
    justifyContent: 'center',
    }
  });