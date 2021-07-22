// Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDlZ6xt9Tz6XLh7uQxMVTjEEN7Xxga1vp8",
  authDomain: "dental-boda.firebaseapp.com",
  projectId: "dental-boda",
  storageBucket: "dental-boda.appspot.com",
  messagingSenderId: "489874140146",
  appId: "1:489874140146:web:1a146208fee70a77acd96b",
  measurementId: "G-02WN3EW4T3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize storage
const imageStorage = firebase.storage();

export { imageStorage }