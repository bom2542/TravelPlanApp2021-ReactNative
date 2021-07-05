import firebase from 'firebase/app';
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAOWRsUteLpnZpxjZAykYjrlhnRXSZBcM8",
    authDomain: "travelplan2021-33fd1.firebaseapp.com",
    projectId: "travelplan2021-33fd1",
    storageBucket: "travelplan2021-33fd1.appspot.com",
    messagingSenderId: "744721056582",
    appId: "1:744721056582:web:6696e8bc9802b63172db47"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var firestore = firebase.firestore();

export default firestore;