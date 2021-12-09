
import React, {useState,useEffect} from 'react';
import { StyleSheet, View, TextInput, Button, ImageBackground } from 'react-native';
import fire from "./firebase.js"
import * as Google from 'expo-google-app-auth';


export default function home({navigation}){
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")


  const login = async()=>{
    const { type, user } = await Google.logInAsync({
      iosClientId: `138985721843-ldh5rrshjrd78gr1utapdfubdt83s8kd.apps.googleusercontent.com`,
      webClientId: '138985721843-smh7u5u6lp3ktln56h96oql8a9b41jqi.apps.googleusercontent.com',
      behavior : 'web'
    });
    
    if (type === 'success') {
      navigation.push("Meal List")
      console.log(user);
    }
  }

    
   
    return (
      
        <ImageBackground source = {require("./assets/food.jpg")} style = {{width:undefined,height:'100%'}}>
          <View style={styles.container}>
              <TextInput style = {{marginTop:5, backgroundColor:'white', padding : 10, borderColor : '#007AFF', borderWidth : 2, borderRadius : 5, width:'50%'}} 
                          placeholder = "Enter User Name" 
                          value = {userName}
                          onChangeText = {(value)=>{
                setUserName(value)
              }}></TextInput>
  
              <TextInput style = {{backgroundColor:'white', marginBottom:20, padding : 10,borderColor : '#007AFF', borderWidth : 2, borderRadius : 5,width:'50%'}} 
                          placeholder = "Enter Password" 
                          secureTextEntry={true}
                          value = {password}
                          onChangeText = {(value)=>{
                setPassword(value)
              }}></TextInput>
        
             
            <View style ={styles.buttonContainer}>
            <View style = {{margin:10}}>
            <Button  title = "Login" onPress = {()=>{
                fire.auth()
                .signInWithEmailAndPassword(userName,password)
                .then(()=>{
                    navigation.push("Meal List")
                    setUserName("")
                    setPassword("")
                })
                .catch(() => {
                    alert("User Name or Password Not Found ")
                    setUserName("")
                    setPassword("")
                })
                }}
                /> 
            </View>
            
            <View style ={{margin : 10}}>
            <Button  title = "Sign Up" onPress = {()=>{
                    setUserName("")
                    setPassword("")
                    navigation.push("Sign Up")
                
              }}/>
            </View>
            
            
            </View>
              
            <Button
              title="Google Sign-In"
              onPress={() => {
                login()
              }}
            />
          </View>
        </ImageBackground>
        
      
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonContainer:{
        flexDirection : "row",
        justifyContent : "space-evenly"
    },

  });