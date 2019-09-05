import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDEhtkiZ_A4_Ki79iXutrVs_06VKGLK8R8",
    authDomain: "lukewarm-map.firebaseapp.com",
    databaseURL: "https://lukewarm-map.firebaseio.com",
    projectId: "lukewarm-map",
    storageBucket: "",
    messagingSenderId: "969126613996",
    appId: "1:969126613996:web:a138236f3e7fae9207e6c9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;