// firebase.config.js
const firebaseConfig = {
  apiKey: "AIzaSyDCqVQyVc5_S1ESzn_TaZzArPiQ6CBk49U",
  authDomain: "laptop-store-6ddef.firebaseapp.com",
  projectId: "laptop-store-6ddef",
  storageBucket: "laptop-store-6ddef.firebasestorage.app",
  messagingSenderId: "208632274358",
  appId: "1:208632274358:web:29c65be8cfe8e329e57517",
  measurementId: "G-1NXJX96L3G",
};

// Khởi tạo Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
