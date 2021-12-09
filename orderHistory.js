import { ImageBackground, View, Image,FlatList,Text } from "react-native";
import React, {useState,useEffect} from 'react';
import fire from "./firebase.js";

export default function orderHistory(){

    const [orderHistory, setOrderHistory] = useState([])
    
    useEffect(()=>{

        fire.firestore()
        .collection('orderHistory')
        .get()
        .then(querySnapshot => {
        const list = []

        querySnapshot.forEach(documentSnapshot => {
            list.push({
                mId : documentSnapshot.id,
                mName : documentSnapshot.data().mName,
                mPic : documentSnapshot.data().mPic,
                mPrice : documentSnapshot.data().mPrice,
                refNum : documentSnapshot.data().mRefNum
            })
    });
    setOrderHistory(list)
  });

    },[])



    return(
        <ImageBackground source = {require("./assets/food.jpg")} style = {{width:undefined,height:'100%'}}>
        <View>
            <Text style = {{fontWeight:"bold",padding:20, fontSize : 50, color:"white", textAlign:"center", borderRadius:10, backgroundColor:"#C0C0C0"}}> Order History</Text>
            <FlatList
            style = {{ padding: 20}}
            data = {orderHistory}
            renderItem = {({item})=>(
                <View style ={{flexDirection:"row",backgroundColor:"white",borderRadius:10,margin:5,padding:20}}>
                    <View style ={{flex:1, justifyContent:"center"}}>
                        <Image source = {{uri : item.mPic}} style = {{width : 100, height : 100, padding:5, alignSelf:"center"}}></Image>
                    </View>
                    <View style ={{flex:1,justifyContent:"center"}}>
                        <Text style={{fontWeight:"bold",margin:5,fontSize:16}}>Meal Name : {item.mName}</Text>
                        <Text style={{fontWeight:"bold",margin:5,fontSize:16}}>Price : {item.mPrice} $</Text>
                        <Text style={{fontWeight:"bold",margin:5,fontSize:16}}>Reference Number : {item.refNum}</Text>
                    </View>
                </View>
                
            

            )}/>        
        </View>
        </ImageBackground>
    )



}