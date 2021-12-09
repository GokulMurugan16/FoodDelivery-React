
import * as firebase from "firebase";



const firebaseConfig = {
    apiKey: "AIzaSyDYMbHVqvS8w0XeXFepnWEPJ0Uy7FEbj24",
    authDomain: "finalprojectreact-258b4.firebaseapp.com",
    databaseURL: "https://finalprojectreact-258b4.firebaseio.com",
    projectId: "finalprojectreact-258b4",
    storageBucket: "finalprojectreact-258b4.appspot.com",
    messagingSenderId: "138985721843",
    appId: "1:138985721843:web:dfaaa4518771d394dfcc86"
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);
  

  export default fire;