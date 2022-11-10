const firebaseApp = firebase.initializeApp({ 
    apiKey: "AIzaSyAsess0m1wXNwckiyi-Pacj9j6e2K0p30g",
    authDomain: "travel-8561c.firebaseapp.com",
    projectId: "travel-8561c",
    storageBucket: "travel-8561c.appspot.com",
    messagingSenderId: "64893619706",
    appId: "1:64893619706:web:4ba1c29f1c3db3180ce843",
    measurementId: "G-4BXSG6Y8CG"
});

// firestore DB initialization
const db = firebaseApp.firestore();
console.log(db);

// firestore auth initialization
const auth = firebaseApp.auth();

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // if (user.displayName === null) {
    //     user.displayName = localStorage.getItem('fullName');
    // }
    console.log(user.displayName);
    console.log(user);
    localStorage.setItem('email', user.email);
    localStorage.setItem('id', user.uid)
    // ...
  } else {
    // User is signed out
    // ...
  }
});

// signing out user
const signoutUser = () => {

    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        alert('Signed out!!');
        window.location.href='./login.html';

      }).catch((error) => {
        // An error happened.
        console.log(error.message);
      });
}