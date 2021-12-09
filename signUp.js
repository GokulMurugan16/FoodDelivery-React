
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Button, ImageBackground,Image } from 'react-native';
import fire from './firebase.js';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';


export default function signUp({navigation}){

    const [userName, setUserName] =  useState("")
    const [passWord, setPassWord] =  useState("")
    const [phoneNumber, setPhoneNumber] =  useState("")
    const [image, setImage] = useState("'http://www.tiptoncommunications.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'")

    useEffect(() => {
        getPermissionAsync();
      }, [])
    
      const getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            try{
                const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
                if (status !== 'granted' || status2 !=='granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
            catch (error){
                console.log(error)
            }
          
        }
        
      };
      
    
      const imagePickLibrary = async () => {
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
          if (!result.cancelled) {
            setImage(result.uri );
          }
    
          console.log(result);
        } catch (E) {
          console.log(E);
        }
      };
  
return(

    <ImageBackground source = {require("./assets/food.jpg")} style = {{width:undefined,height:'100%'}}>
        <Text style = {{fontWeight:"bold",padding:20, fontSize : 50, color:"white", textAlign:"center", borderRadius:10, backgroundColor:"#C0C0C0"}}> Sign Up</Text>
        <View style = {styles.container}>
            <Image source={{uri:image}} style={{width:200,height:200,borderColor:"white", borderRadius:100, backgroundColor:"white",margin:10,padding:10}}/>
            <View style={{flexDirection:"row", margin:10, padding:10}}>
                <View style = {{marginRight:20}}>
                    <Button title="Choose From Library" onPress={()=>{
                    imagePickLibrary()
                    }}/>
                </View>
                <View style = {{marginRight:20}}>
                    <Button title="Open Camera" onPress={()=>{
                        OpenCamera()
                    }}/>
                </View>
            
            </View>

            <TextInput style = {{marginTop:5, backgroundColor:'white', padding : 10, borderColor : '#007AFF', borderWidth : 2, borderRadius : 5, width:'50%'}} 
                            placeholder = "Enter User Name" 
                            value = {userName}
                            onChangeText = {(value)=>{
                setUserName(value)
                }}></TextInput>
            <TextInput style = {{marginTop:5, backgroundColor:'white', padding : 10, borderColor : '#007AFF', borderWidth : 2, borderRadius : 5, width:'50%'}} 
                            placeholder = "Enter Password" 
                            value = {passWord}
                            secureTextEntry = {true}
                            onChangeText = {(value)=>{
                setPassWord(value)
                }}></TextInput>
            <TextInput style = {{margin:5, backgroundColor:'white', padding : 10, borderColor : '#007AFF', borderWidth : 2, borderRadius : 5, width:'50%'}} 
                            placeholder = "Phone Number" 
                            value = {phoneNumber}
                            onChangeText = {(value)=>{
                setPhoneNumber(value)
                }}></TextInput>
        <Button style = {{padding : 10}} title = "Creat User" onPress = {()=>{
            fire.auth()
                .createUserWithEmailAndPassword(userName, passWord)
                .then(() => {
                alert("User Created")
                navigation.popToTop()
                setUserName("")
                setPassWord("")
                setPhoneNumber("")
                })
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                    alert("Email Already in use")
                    setUserName("")
                    setPassWord("")
                    setPhoneNumber("")
                }
        
                if (error.code === 'auth/invalid-email') {
                    alert('That email address is invalid!');
                    setUserName("")
                    setPassWord("")
                    setPhoneNumber("")
                }
                if (error.code === "auth/weak-password"){
                    alert("Password should be at least 6 characters");
                    setUserName("")
                    setPassWord("")
                    setPhoneNumber("")
                }
        
                console.error(error);
                });
                
                }}/>

        </View>
    </ImageBackground>
)}

const styles = StyleSheet.create({
    container: {
      flex: 1,
  
      
      alignItems: 'center',
      justifyContent: 'center',
    },
  });