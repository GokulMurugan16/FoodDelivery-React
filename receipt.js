import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, ImageBackground, Image, SafeAreaView } from 'react-native';
import fire from './firebase.js';

export default function receipt({route,navigation}){

const [display, setDisplay] = useState("none")
const [displayTotal, setDisplayTotal] = useState("none")
const [tip,setTip] = useState(0)
const [a,seta] = useState(0)
const subTotal = route.params.mealPrice * 7;
const tax = subTotal*0.13;
const [total,setTotal] = useState(0)


const totalFunc = ( )=>{
setTotal(subTotal+tip+tax)
}


const randomFunc = ()=>{
    let a = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
    let sku = ""
    for(let i=0;i<6;i++)
    {
        sku = sku + a[Math.floor(Math.random() * a.length)]
    }
    return sku
}

return(
    <ImageBackground source = {require("./assets/food.jpg")} style = {styles.container,{width:undefined,height:'100%',alignItems:"center",justifyContent:"center"}}>
            <SafeAreaView style = {styles.container}>
            <Text style = {{fontSize:40, marginTop:80, fontWeight : "bold", textAlign: "center"}}> Order Summary </Text>
            <Image source = {{uri : route.params.mealPic}} style = {{width : 200, height : 200}}/>
            <Text style = {styles.boldView}> {route.params.mealName} </Text>
            <Text style = {styles.views}> Sub Total : {subTotal} $ per 7 days</Text>
            <Text style = {styles.views}> Tax : {tax} $ </Text>
            <Text style = {styles.views}> Choose Tip : </Text>

            <View style={{flexDirection:"row",justifyContent : "space-evenly"}}>
          
            <View style = {styles.button}>
             <Button title = " 10% "  onPress={()=>{
                 setDisplay("none")
                 setTip(subTotal*0.1)
                 totalFunc();
                 setDisplayTotal("block")
                
            }}/>
            </View>
            <View style = {styles.button}>
            <Button title = " 15% " onPress={()=>{
                setDisplay("none")
                setTip (subTotal*0.15)
                totalFunc();
                setDisplayTotal("block")
            }}/>
            </View>
            <View style = {styles.button}>
            <Button title = "20%" onPress={()=>{
                setDisplay("none")
                setTip(subTotal*0.2)
                totalFunc();
                setDisplayTotal("block")
                
            }}/>
            </View>
            <View style = {styles.button}>
            <Button title = "Other"  onPress={()=>{
                setDisplay("block")
                setDisplayTotal("none")
            }}/>
            </View>
            </View>



            <View style = {{display:display}}>
                <TextInput style = {{textAlign : "center", padding:5, margin : 5}} placeholder = "Enter Tip" onChangeText={(value)=>{
                    seta(value)
                }}
                value = {`${a}`}
                ></TextInput>
                <Button title = "Ok" onPress={()=>{
                    setTip(parseInt(a));
                    totalFunc();
                    setDisplay("none")
                    setDisplayTotal("block")
                }}/>

            </View >
            <View style = {{display:displayTotal}}>
            <Text style = {styles.views}> Tip : {tip} $ </Text>
            <Text style = {styles.boldView}> Total : {(subTotal+tip)+tax} $ </Text>
            <Button title = "Place Order" onPress = {()=>{
                const receiptNumber = randomFunc();
                navigation.push("Receipt", {SKU : receiptNumber })
                fire.firestore()
                .collection('orderHistory')
                .add({
                    mName: route.params.mealName,
                    mPrice: total,
                    mPic : route.params.mealPic,
                    mRefNum : receiptNumber
                })
                .then(() => {
                    alert("Meal Order Placed Sucessfully")
                });
            }}/>

            </View>
            
            </SafeAreaView>
    </ImageBackground>
)
}

const styles = StyleSheet.create({
    container: {
    flex :1,
    width:"80%",
    padding :10,   
    borderRadius:20,
    backgroundColor:"white",
    alignItems: 'center',
    justifyContent: 'center',
    },
    button :{
        margin : 10
    },
    views :{
        fontSize : 20,
        padding : 5,
        margin : 5
    },
    boldView :{
        fontSize : 24,
        padding : 5,
        margin : 5,
        fontWeight : "bold"
        }

  });