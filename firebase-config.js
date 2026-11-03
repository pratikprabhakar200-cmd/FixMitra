
// ======================================
// FIXMITRA - FIREBASE CONNECTION
// ======================================

const firebaseConfig = {
    apiKey: "AIzaSyB9ji8FJkyWp4Y4VnSknjKk5uWMpvuaPfE",
    authDomain: "fixmitra-a94a4.firebaseapp.com",
    databaseURL: "https://fixmitra-a94a4-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "fixmitra-a94a4",
    storageBucket: "fixmitra-a94a4.firebasestorage.app",
    messagingSenderId: "886786796836",
    appId: "1:886786796836:web:6a0f9425f0d91a108c17b1",
    measurementId: "G-GHN7S6VQGH"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Firebase services
const auth = firebase.auth();
const db = firebase.database();

// Make available to website files
window.fixmitraFirebase = {
    auth: auth,
    db: db
};

console.log("FixMitra Firebase Connected Successfully");

