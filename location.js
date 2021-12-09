// import { View, Button, Text,ImageBackground } from "react-native";
// import React, {useState} from 'react';
// import * as Location from "expo-location";
// import MapView,{Marker} from "react-native-maps"
// import * as geolib from 'geolib';

// export default function locationFunc(){

// const [userLat, setUserLat] = useState(0.0)
// const [userLon, setUserLon] = useState(0.0)
// const [distance, setDistance] = useState(0)
// const [buttonEnabled, setButtonEnabled] = useState(false)
// const [abuttonEnabled, setaButtonEnabled] = useState(false)
// const [timeRem, settimeRem] = useState(60)
// const [displaytv, setDisplay] = useState("none")
    
//     return(
//         <ImageBackground source = {require("./assets/food.jpg")} style = {{width:undefined,height:'100%'}}>
//         <View>
//             <Button title = "Alert Store" disabled = {abuttonEnabled} onPress = {()=>{

//                 let a = geolib.getPreciseDistance(
//                     { latitude: userLat, longitude: userLon },
//                     { latitude: 43.6761, longitude: -79.4105 }
//                 )

//                 setDistance(a)

//                 if(distance<100){
//                     setaButtonEnabled(true)
//                     alert("Company Started Preparing Order")

//                     let time = 10
//                     const timer = require("react-native-timer")
//                     timer.setInterval("timeDisp",() => {
//                         setDisplay("block")
//                         time = time-1
//                         settimeRem(time)
//                         if(time===0){
//                             timer.clearInterval("timeDisp")
//                             alert("Thank You For Your Order")
//                         }
//                     }, 1000);


//                 }
//                 else{
//                     alert("You are too far!!")
//                 }

//             }}/>

//             <Button title = "Update Location" disabled = {buttonEnabled} onPress = {async()=>{

//                     let { status } = await Location.requestPermissionsAsync();
                                
//                     if (status === "granted") {
//                     await Location.watchPositionAsync({timeInterval:5000}, (location)=>{
//                         setUserLat(location.coords.latitude)
//                         setUserLon(location.coords.longitude)
//                         setButtonEnabled(true)
//                         }
//                     )}
//                     else {
//                     console.log("Permission to access location was denied")
//                     }



//             }}/>
//             <MapView
//                 initialRegion = {{
//                     latitude : 43.6532,
//                     longitude : -79.3832,
//                     latitudeDelta : 0.1,
//                     longitudeDelta : 0.1
//                 }}
//                 style = {{width:"100%", height : "75%"}}
//             >
//                 <Marker 
//                 coordinate = {{latitude:43.6761,longitude:-79.4105}}
//                 title = "Restaurant"
//                 />
//                 <Marker 
//                 coordinate = {{latitude:userLat,longitude:userLon}}
//                 title = "Restaurant"
//                 />
//             </MapView>
            
//             <View style = {{display:displaytv}}>
//                 <Text  style = {{fontSize : 24, backgroundColor:"white", borderRadius:10}}> Your order will be ready in {timeRem} Seconds</Text>
//             </View>
            
//         </View>
//         </ImageBackground>
//     )


// }