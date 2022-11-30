
//set arrays
let firebaseBadges = [];
let firebaseChallenges = [];

///// Get badges -----------------------------------------------------
const getBadges = () => {

    db.collection("badges").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots

            let newBadge = {
                badgeName: doc.data().badgeName,
                badgeIcon: doc.data().badgeIcon,
                relation: doc.data().relation,
            }

            firebaseBadges.push(newBadge)



        });
        console.log(firebaseBadges)
        localStorage.setItem("badges", JSON.stringify(firebaseBadges));

    });
}
getBadges();

///// Get challenges -----------------------------------------------------

const getChallenges = () => {

    db.collection("challenges").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());


            let newChallenge = {
                areaCoordinates: doc.data().areaCoordinates,
                budget: doc.data().budget,
                description: doc.data().description,
                id: doc.data().id,
                image: doc.data().image,
                marker: doc.data().marker,
                name: doc.data().name,
                placeId: doc.data().placeId,
                premium: doc.data().premium,
                steps: doc.data().steps,
                surveyScore: doc.data().surveyScore,
                tags: doc.data().tags,
            }
            firebaseChallenges.push(newChallenge)



        });
        console.log(firebaseChallenges)
   //     localStorage.setItem("challenges", JSON.stringify(firebaseChallenges));

    });
}
getChallenges();


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

const logIn = () => {
    if (auth.currentUser) {
        console.log(auth.currentUser.uid)
        // with the auth uid we get the user from the firestore database

        db.collection("users").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                if (doc.data().id == auth.currentUser.uid) {
                    console.log('doc data is', doc.data().id)
                    console.log('auth.currentUser.uid is', auth.currentUser.uid)

                    let currentUser = doc.data()
                    console.log('user is ', currentUser)
                    localStorage.setItem("user", JSON.stringify(currentUser));
                }




            });
        });
        //with this user from firestore database, code works
    }
    else {
        //go back to login page
    }
}

////////////////////////////////////////


//0        //1          //2           //3        //4              //5                     //6                    //7                //8                          //9                         //10                   //11                     //12               //13                     //14               //15
const surveyTags = ['Day life', 'Night life', 'Adrenaline', 'To Relax', 'Beach Walks ', 'Lake and River Walks ', 'Outdoor Activities', 'Indoor Activities', 'History and Architecture', 'Gastronomy and Culture', 'Big City Environment', 'Small City Environment', 'Group activities', 'Individual activities', 'City Landscapes', 'Nature Landscapes']

challengesDatabase = [
    {
        id: '254yh24wtuh62utru2y24554y',
        name: 'THE HANGING BRIDGE CHALLENGE',
        description: "This challenge will take you to the Lynn Canyon Park. There you’ll find many hiking trails, a waterfall, and the main attraction… a suspension bridge! It sways 50 meters above the canyon. Grab your favorite sneakers and you’re ready to go!",
        steps: {
            low: [
                {
                    desc: "Go to Lynn Valley Park in North Vancouver. When you’re there, take a picture with the welcome sign! Don’t forget that it might be dangerous being in the forest at night, so we recommend not going too late!",
                    coord: { lat: 49.34292296418448, lng: -123.01977724677438 },
                    tag: false,
                    image: '../Assets/designer-assets/png-icons-uploadpicture-small.png',
                    done: false
                },
                {
                    desc: "Hope you’re not afraid of heights! Take a picture standing on the hanging bridge, and don’t forget to take the time to enjoy the view! ",
                    coord: { lat: 49.34393808747806, lng: -123.0180606869341 },
                    tag: false,
                    image: '../Assets/designer-assets/png-icons-uploadpicture-small.png',
                    done: false
                },
                {
                    desc: "Delight yourself with this park’s captivating views by walking down the park. Find the waterfall and take a picture with it! ",
                    coord: { lat: 49.34393808747806, lng: -123.0180606869341 },
                    tag: false,
                    image: '../Assets/designer-assets/png-icons-uploadpicture-small.png',
                    done: false
                },
            ],
            high: [
                {
                    desc: "Go to Capilano in North Vancouver. When you’re there, take a picture with the welcome sign! Don’t forget that it might be dangerous being in the forest at night, so we recommend not going too late! ",
                    coord: { lat: 49.3426884715942, lng: -123.11402141238946 },
                    tag: false,
                    image: '../Assets/designer-assets/png-icons-uploadpicture-small.png',
                    done: false
                },
                {
                    desc: "	Hope you’re not afraid of heights! Take a picture standing on the hanging bridge, and don’t forget to take the time to enjoy the view! ",
                    coord: { lat: 49.34287347137181, lng: -123.11492004060521 },
                    tag: false,
                    image: '../Assets/designer-assets/png-icons-uploadpicture-small.png',
                    done: false
                },
                {
                    desc: "Delight yourself by having lunch -or a drink- in The Cliff House Restaurant and Bar while enjoying the captivating views. Share us a picture of what you decide to order! ",
                    coord: { lat: -123.11492004060521, lng: -123.11380161190166 },
                    tag: false,
                    image: '../Assets/designer-assets/png-icons-uploadpicture-small.png',
                    done: false
                },
            ],
        },
        image: '../Assets/designer-assets/jpg-sunset-1.jpg',
        marker: '../Assets/designer-assets/png-pins-bridge.png',
        budget: '',
        placeId: '',
        areaCoordinates: { lat: 49.34470485653275, lng: -123.02505444279568 },
        premium: true,
        surveyScore: 0,
        tags: [surveyTags[15], surveyTags[0], surveyTags[2], surveyTags[5], surveyTags[6], surveyTags[9], surveyTags[13], surveyTags[11]]
    },

    {
        id: '9p8u07gty8bgvf7t9vcfg',
        name: 'THE SEAWALL CHALLENGE',
        description: 'In this challenge you’ll discover the longest uninterrupted waterfront in the world! You can swim in the summer or ride a bike in the fall. Also, you’ll find some of the better spots in the city to grab a bottle of wine and see the sunset. ',
        steps: {
            low: [
                {
                    desc: "Go to Sunset Beach and find the Inukshuk Stone Sculpture. Take a picture with it and share it with us! You will most likely see people playing games. Join them if you feel like it!",
                    coord: { lat: 49.284468944204576, lng: -123.14374494434401 },
                    tag: false,
                    image: '../Assets/designer-assets/png-icons-uploadpicture-small.png',
                    done: false
                },
                {
                    desc: "Vancouver has the world’s longest uninterrupted waterfront path. Now that you are in Sunset Beach you can enjoy it by walking a segment of it. Head to the north along the seawall until you reach English Bay, and don’t forget to take a picture of the views! ",
                    coord: { lat: 49.28978713432972, lng: -123.14486192683597 },
                    tag: false,
                    image: '../Assets/designer-assets/png-icons-uploadpicture-small.png',
                    done: false
                },
                {
                    desc: "The A-maze-ing Laughter bronze sculpture is there to bring a smile to the ones that see it. Share with us a picture of you smiling with the statues! ",
                    coord: { lat: 49.2877459713639, lng: -123.14186677222345 },
                    tag: false,
                    image: '../Assets/designer-assets/png-icons-uploadpicture-small.png',
                    done: false
                },
            ],
            high: [
                {
                    desc: "Go to Sunset Beach and find the Inukshuk Stone Sculpture. Take a picture with it and share it with us! You will most likely see people playing games. Join them if you feel like it!",
                    coord: { lat: 49.28430649257112, lng: -123.14375633650968 },
                    tag: false,
                    image: '../Assets/designer-assets/png-icons-uploadpicture-small.png',
                    done: false
                },
                {
                    desc: "	Vancouver has the world’s longest uninterrupted waterfront path. Now that you are in Sunset Beach you can enjoy it by walking a segment of it. Head to the north along the seawall until you reach English Bay, and don’t forget to take a picture of the views!",
                    coord: false,
                    tag: false,
                    image: '../Assets/designer-assets/png-icons-uploadpicture-small.png',
                    done: false
                },
                {
                    desc: "The A-maze-ing Laughter bronze sculpture is there to bring a smile to the ones that see it. Share with us a picture of you smiling with the statues!",
                    coord: { lat: 49.287596913119486, lng: -123.14192174110453 },
                    tag: false,
                    image: '../Assets/designer-assets/png-icons-uploadpicture-small.png',
                    done: false
                },
            ],
        },
        image: '../Assets/designer-assets/jpg-sunset-2.jpg',
        marker: '../Assets/designer-assets/png-pins-seawall.png',
        budget: '',
        placeId: '',
        areaCoordinates: { lat: 49.286614016719064, lng: -123.1424614420471 },
        premium: true,
        surveyScore: 0,
        tags: [surveyTags[14], surveyTags[0], surveyTags[1], surveyTags[3], surveyTags[4], surveyTags[6], surveyTags[8], surveyTags[10], surveyTags[12],]
    },

    {
        id: '21u7g4812knrsara',
        name: 'THE GRANVILLE ISLAND CHALLENGE',
        description: 'If you’re feeling a little hungry, this is the place to go. Here you’ll find a picturesque market where you can find seafood, bagels, and the best donuts in Vancouver! You can eat in the courtyard next to the sea while you’re listening to the buskers.',
        steps: {
            low: [
                {
                    desc: "Take a picture with the Granville welcome sign. ",
                    coord: { lat: 49.271462098991094, lng: -123.13392546147028 },
                    tag: false,
                    image: '../Assets/designer-assets/png-icons-uploadpicture-small.png',
                    done: false
                },
                {
                    desc: "Have lunch at the Granville market. Take a picture of your plate! ",
                    coord: { lat: 49.272862382088384, lng: -123.13515022900297 },
                    tag: false,
                    image: '../Assets/designer-assets/png-icons-uploadpicture-small.png',
                    done: false
                },
                {
                    desc: "Try the famous Lee Donuts. Share with us a pic of the doughnut you picked!  ",
                    coord: { lat: 49.27239008303922, lng: -123.13525514434446 },
                    tag: false,
                    image: '../Assets/designer-assets/png-icons-uploadpicture-small.png',
                    done: false
                },
            ],
            high: [
                {
                    desc: "Take a picture with the Granville welcome sign.",
                    coord: { lat: 49.27012311030005, lng: -123.1367827938784 },
                    tag: false,
                    image: '../Assets/designer-assets/png-icons-uploadpicture-small.png',
                    done: false
                },
                {
                    desc: "	Have lunch at the Sandbar. Take a picture of your plate!",
                    coord: false,
                    tag: ['restaurant', 'bar', 'cafe'],
                    image: '../Assets/designer-assets/png-icons-uploadpicture-small.png',
                    done: false
                },
                {
                    desc: "Try the famous Lee Donuts. Share with us a pic of the doughnut you picked!",
                    coord: { lat: 49.272265103234105, lng: -123.13527755710894 },
                    tag: false,
                    image: '../Assets/designer-assets/png-icons-uploadpicture-small.png',
                    done: false
                },
            ],
        },
        image: '../Assets/designer-assets/jpg-sunset-3.jpg',
        marker: '../Assets/designer-assets/png-pins-granville.png',
        budget: '',
        placeId: '',
        areaCoordinates: { lat: 49.27048109309838, lng: -123.13479550485158 },
        premium: true,
        surveyScore: 0,
        tags: [surveyTags[14], surveyTags[0], surveyTags[1], surveyTags[3], surveyTags[7], surveyTags[9], surveyTags[11], surveyTags[13]]
    },

    {
        id: 'dfsava8747543g',
        name: 'THE DOWNTOWN CHALLENGE', //
        description: 'Be ready for an exciting day exploring the iconic buildings of Vancouver. You’ll discover the most vibrant and unique areas of the city, from the oldest and charming neighborhoods to the most modern and busy ones. ',
        steps: {
            low: [
                {
                    desc: "Walk around Canada Place. Share with us a picture of when you reach the end!",
                    coord: { lat: 49.28895767206503, lng: -123.11104581435612 },
                    tag: false,
                    image: '../Assets/designer-assets/png-icons-uploadpicture-small.png',
                    done: false
                },
                {
                    desc: "Take a look at downtown from the Harbour Centre. Don’t forget to take a picture of the beautiful beach! ",
                    coord: { lat: 49.28482228933386, lng: -123.1118699039284 },
                    tag: false,
                    image: '../Assets/designer-assets/png-icons-uploadpicture-small.png',
                    done: false
                },
                {
                    desc: "Have lunch in Gastown. Share with us a picture of what you decided to order!",
                    coord: { lat: 49.284576542322675, lng: -123.10887160201466 },
                    tag: ['restaurant', 'bar', 'cafe'],
                    image: '../Assets/designer-assets/png-icons-uploadpicture-small.png',
                    done: false
                },
            ],
            high: [
                {
                    desc: "Walk around Canada Place. Share with us a picture of when you reach the end!",
                    coord: false,
                    tag: false,
                    image: '../Assets/designer-assets/png-icons-uploadpicture-small.png',
                    done: false
                },
                {
                    desc: "Take a look at downtown from the Harbour Centre. Don’t forget to take a picture of the beautiful beach!",
                    coord: false,
                    tag: false,
                    image: '../Assets/designer-assets/png-icons-uploadpicture-small.png',
                    done: false
                },
                {
                    desc: "Have lunch in Gastown. Share with us a picture of what you decided to order!",
                    coord: false,
                    tag: ['restaurant', 'bar', 'cafe'],
                    image: '../Assets/designer-assets/png-icons-uploadpicture-small.png',
                    done: false
                },
            ],
        },
        image: '../Assets/default_img.jpg',
        marker: '../Assets/designer-assets/png-pins-downtown.png',
        budget: '',
        placeId: '',
        areaCoordinates: { lat: 49.288334842288705, lng: -123.1124199551516 },
        premium: true,
        surveyScore: 0,
        tags: [surveyTags[14], surveyTags[0], surveyTags[1], surveyTags[2], surveyTags[6], surveyTags[10], surveyTags[13]]
    },

    {
        id: 'bnm4b198mb9nm42',
        name: 'THE WHISTLER CHALLENGE',
        description: 'With less than 2 hours of drive from Vancouver, you’ll arrive to the town of Whistler, that’s home of one of the largest ski resorts in North America! You’ll fall in love with this chalet-style village surrounded by mountains.',
        steps: {
            low: [
                {
                    desc: "Enjoy a coffee, a hot chocolate, or one of the amazing snacks at Purebread bakery. Show us a picture of your selection!",
                    coord: { lat: 50.120135833471615, lng: -122.95571203748781 },
                    tag: false,
                    image: '../Assets/designer-assets/png-icons-uploadpicture-small.png',
                    done: false
                },
                {
                    desc: "Amuse yourself with Olympic Village’s beautiful architecture. Share with us a pic of your favourite building!",
                    coord: { lat: 50.081325255158916, lng: -123.04097745907954 },
                    tag: false,
                    image: '../Assets/designer-assets/png-icons-uploadpicture-small.png',
                    done: false
                },
                {
                    desc: "Activity 3",
                    coord: false,
                    tag: false,
                    image: '../Assets/designer-assets/png-icons-uploadpicture-small.png',
                    done: false
                },
            ],
            high: [
                {
                    desc: "Enjoy a coffee, a hot chocolate, or one of the amazing snacks at Purebread bakery. Show us a picture of your selection!",
                    coord: { lat: 50.120135833471615, lng: -122.95571203748781 },
                    tag: false,
                    image: '../Assets/designer-assets/png-icons-uploadpicture-small.png',
                    done: false
                },
                {
                    desc: "Go to the top of the mountain and share with us a picture of the amazing views!",
                    coord: false,
                    tag: false,
                    image: '../Assets/designer-assets/png-icons-uploadpicture-small.png',
                    done: false
                },
                {
                    desc: "Activity 3",
                    coord: false,
                    tag: false,
                    image: '../Assets/designer-assets/png-icons-uploadpicture-small.png',
                    done: false
                },
            ],
        },
        image: '../Assets/default_img.jpg',
        marker: '../Assets/designer-assets/png-pins-whistler.png',
        budget: '',
        placeId: '',
        areaCoordinates: { lat: 50.12040687042842, lng: -122.95420441063983 },
        premium: true,
        surveyScore: 0,
        tags: [surveyTags[15], surveyTags[0], surveyTags[2], surveyTags[6], surveyTags[8], surveyTags[12], surveyTags[3]]
    },

]

localStorage.setItem("challenges", JSON.stringify(challengesDatabase));

let badges = [
    {
        badgeName: "Downtown Challenge",
        badgeIcon: "../Assets/designer-assets/png-icons-badges.png",
        relation: "dfsava8747543g",
    },
    {
        badgeName: "Langara Challenge",
        badgeIcon: "../Assets/designer-assets/png-icons-badges.png",
        relation: "",
    },
    {
        badgeName: "Beach Challenge",
        badgeIcon: "../Assets/designer-assets/png-icons-badges.png",
        relation: "",
    },
    {
        badgeName: "Seawall Challenge",
        badgeIcon: "../Assets/designer-assets/png-icons-badges.png",
        relation: "9p8u07gty8bgvf7t9vcfg",
    },
    {
        badgeName: "Bridge Challenge",
        badgeIcon: "../Assets/designer-assets/png-icons-badges.png",
        relation: "254yh24wtuh62utru2y24554y",
    },
    {
        badgeName: "Granville Challenge",
        badgeIcon: "../Assets/designer-assets/png-icons-badges.png",
        relation: "21u7g4812knrsara",
    },
    {
        badgeName: "Whistler Challenge",
        badgeIcon: "../Assets/designer-assets/png-icons-badges.png",
        relation: "bnm4b198mb9nm42",
    },
    {
        badgeName: "Survey Challenge",
        badgeIcon: "../Assets/designer-assets/png-icons-badges.png",
        relation: "",
    },

]

/* localStorage.setItem("badges", JSON.stringify(badges));
 */
console.log('foi')
