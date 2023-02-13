const firebaseApp = firebase.initializeApp({ 

  //firebase credentials go here (deleted for security reasons)

});

// firestore DB initialization
const db = firebaseApp.firestore();
console.log(db);

// firestore auth initialization
const auth = firebaseApp.auth();

// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/firebase.User
//     const uid = user.uid;
//     // if (user.displayName === null) {
//     //     user.displayName = localStorage.getItem('fullName');
//     // }
//     console.log(user.displayName);
//     console.log(user);
//     localStorage.setItem('email', user.email);
//     localStorage.setItem('id', user.uid)
//     // ...
//   } else {
//     // User is signed out
//     // ...
//   }
// });

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

// db.collection("challenges").get().then(function(querySnapshot) {
//   console.log(querySnapshot.size);
// });


// THINGS TO DO
 
  //update firebase when local user is changed


  //if guest dont upload to firebase

