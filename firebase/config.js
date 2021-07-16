// Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyB2Wm7IULgs_QtwYki4-c_WjNniK0gf0GU", 
  authDomain: "moai-66cf2.firebaseapp.com", 
  projectId: "moai-66cf2", 
  storageBucket: "moai-66cf2.appspot.com", 
  messagingSenderId: "232421288988", 
  appId: "1:232421288988:android:f700b8c2c028a714b603d9" 
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize storage
const imageStorage = firebase.storage();

export { imageStorage }