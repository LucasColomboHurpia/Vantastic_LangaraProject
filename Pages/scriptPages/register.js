const user = {
    userName: 'Default',
    email: 'email@default.com',
    password: 'encryptionKey',
    premium: false,
    dateOfBirth: '',
    gender: '',
    preferences: {
        surveyDone: false,
        budget: 'low',
        surveyResults: {
            placesPreferences: [
                { name: 'restaurant', value: 0, },
                { name: 'library', value: 0, },
                { name: 'art_gallery', value: 0, },
                { name: 'bar', value: 0, },
                { name: 'movie_theater', value: 0, },
                { name: 'bowling_alley', value: 0, },
                { name: 'museum', value: 0, },
                { name: 'cafe', value: 0, },
                { name: 'night_club', value: 0, },
                { name: 'park', value: 0, },
                { name: 'shopping_mall', value: 0, },
                { name: 'stadium', value: 0, },
                { name: 'zoo', value: 0, },
            ],
            ChallengePreferences: ['', '', '']
        }
    },
    challengesDone: ['', '', ''],
    badges: ['', '', '',],
    placesVisited: ['', '', '',],
    id: 'guest',
    }

const guestEntry = () =>{

    let guest = {
        userName: 'Guest',
        email: 'Guest@Email',
        password: 'encryptionKey',
        premium: true,
        dateOfBirth: '',
        gender: 'male',
        preferences: {
            surveyDone: false,
            budget: 'low',
            surveyResults: {
                placesPreferences: [
                    { name: 'restaurant', value: 2, },
                    { name: 'library', value: 3, },
                    { name: 'art_gallery', value: 3, },
                    { name: 'bar', value: 1, },
                    { name: 'movie_theater', value: 3, },
                    { name: 'bowling_alley', value: 3, },
                    { name: 'museum', value: 3, },
                    { name: 'cafe', value: 4, },
                    { name: 'night_club', value: 1, },
                    { name: 'park', value: 5, },
                    { name: 'shopping_mall', value: 3, },
                    { name: 'stadium', value: 1, },
                    { name: 'zoo', value: 2, },
                ],
                ChallengePreferences: ['Day', 'Relax', 'History']
            }
        },
        challengesDone: ['idOfChallenge1', 'idOfChallenge2', 'idOfChallenge3'],
        badges: ['idOfBadge1', 'idOfBadge2', 'idOfBadge3',],
        placesVisited: ['idOfPlace1', 'idOfPlace2', 'idOfPlace3',],
        id: 'a8s72bn198gbs18y',
    }
    localStorage.clear()
    localStorage.setItem("user", JSON.stringify(guest));

    window.location.href='../Pages/mainPage.html'
   

}

const register = () => {
    let registerEmail = (document.getElementById('email')).value;
    let registerPassword = (document.getElementById('password')).value;
    const fullName = `${(document.getElementById('firstName')).value} ${document.getElementById('lastName').value}`;

   user.userName = fullName
   user.email = registerEmail

    console.log(fullName);
    //localStorage.clear();
    localStorage.setItem('fullName', fullName);

    createUser(registerEmail, registerPassword);
}

// register the user in firebase
const createUser = (email, password) => {

    let userEmail = email;
    console.log(userEmail);
    let userPassword = password;
    
    firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword)
    .then((userCredential) => {

        let us = userCredential.user
      //gets auth id
        console.log(us);
        //-----------------
            let currentUser = firebase.auth().currentUser

            currentUser.updateProfile({
                displayName: user.userName
            }).then(()=>{
                console.log(firebase.auth().currentUser.displayName)
            })
        //-------------------
       window.location.href='./survey.html';
    })
    .catch((error) => {
        console.log(error.message);
        console.log(error.code);

        if (error.code === 'auth/email-already-in-use') {
            alert("Email already exists!!");
            window.location.href='./login.html';
        }
    })

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          var uid = user.uid;
          console.log("you are logged!")
          // ...
        } else {
          // User is signed out
          console.log("you not are logged!")
    
          // ...
        }
      });

}