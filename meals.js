
import React, {useState, useEffect} from 'react';
import { Text, View, Button, ImageBackground, FlatList,  Image, SafeAreaView } from 'react-native';
import fire from './firebase.js';

export default function meals({navigation}){

    const [mealList, setMealList] = useState([])
    
    useEffect(()=>{

        fire.firestore()
        .collection('meals')
        .get()
        .then(querySnapshot => {
        const list = []

        querySnapshot.forEach(documentSnapshot => {
            list.push({
                mId : documentSnapshot.id,
                mName : documentSnapshot.data().mName,
                mDesc : documentSnapshot.data().mDesc,
                mPrice : documentSnapshot.data().mPrice,
                mCalorie : documentSnapshot.data().mCalorie,
                mPic : documentSnapshot.data().mPic
            })
    });
    setMealList(list)
  });

    },[])

return(

    <ImageBackground source = {require("./assets/food.jpg")} style = {{width:undefined,height:'100%'}}>
    <SafeAreaView>
        <Text style = {{fontWeight:"bold",padding:20, fontSize : 50, color:"white", textAlign:"center", borderRadius:10, backgroundColor:"#C0C0C0"}}> Meal List</Text>
        <Button title = "Order History" onPress = {()=>{
            navigation.push("Order History")

        }}/>
        <FlatList
        style = {{ padding: 20}}
        data = {mealList}
        keyExtractor={(item, index) => index.toString()}
        renderItem = {({item})=>(
            
            <View
            style = {{margin : 3, backgroundColor:"white", borderRadius : 20 , padding : 20}}
            key = {item.id}
            >
                <Image source = {{uri : item.mPic}} style = {{width : 200, height : 200, padding:5, alignSelf:"center"}}></Image>
                <Text style = {{fontSize:24, fontWeight : "bold", textAlign: "center"}}> {item.mName}</Text>
                <Text style = {{fontSize:18, fontStyle : "italic"}}> {item.mDesc}</Text>
                <Text style = {{fontSize:20, fontWeight:"bold"}}> Price : {item.mPrice} $ per Meal</Text>
                <Text style = {{fontSize:18}}> Calorie Count : {item.mCalorie}</Text>
                <Button title = "Buy Meal"onPress={(itemcont)=>{
                navigation.push("Order Summary", {mealName : item.mName, mealPrice : item.mPrice, mealPic : item.mPic })
                }}/>
            </View>
        )}/>
    </SafeAreaView>
    </ImageBackground>
)

}