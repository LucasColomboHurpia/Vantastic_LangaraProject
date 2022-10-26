let newChallenge = [
    {
        id: 0,
        img: "../Assets/designer-assets/jpg-sunset-2.jpg",
        name: "Downtown Challenge",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit atque magnam unde exercitationem possimus harum sint adipisci in cupiditate delectus.",
        info1: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, quisquam.",
        info2: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, quisquam."

    },

    {
        id: 1,
        img: "../Assets/designer-assets/jpg-sunset-3.jpg",
        name: "Park Challenge",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit atque magnam unde exercitationem possimus harum sint adipisci in cupiditate delectus.",
        info1: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, quisquam.",
        info2: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, quisquam."

    },
    {
        id: 2,
        img: "../Assets/designer-assets/jpg-sunset-1.jpg",
        name: "Beach Challenge",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit atque magnam unde exercitationem possimus harum sint adipisci in cupiditate delectus.",
        info1: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, quisquam.",
        info2: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, quisquam."

    }
]

let downtownChallenge = [
    {
        img: "../Assets/designer-assets/png-icons-uploadpicture.png",
        activity: "Drink Coffee",
        activity_desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse minus est animi eius, perferendis nostrum ipsum porro. Nesciunt, dignissimos ex.",
    },
    {
        img: "../Assets/designer-assets/png-icons-uploadpicture.png",
        activity: "Drink Beer",
        activity_desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse minus est animi eius, perferendis nostrum ipsum porro. Nesciunt, dignissimos ex.",
    },
    {
        img: "../Assets/designer-assets/png-icons-uploadpicture.png",
        activity: "Walk by English Bay",
        activity_desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse minus est animi eius, perferendis nostrum ipsum porro. Nesciunt, dignissimos ex.",
    }
]

let parkChallenge = [
    {
        img: "../Assets/designer-assets/png-icons-uploadpicture.png",
        activity: "Walk to the river",
        activity_desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse minus est animi eius, perferendis nostrum ipsum porro. Nesciunt, dignissimos ex.",
    },
    {
        img: "../Assets/designer-assets/png-icons-uploadpicture.png",
        activity: "Click pic with a tree",
        activity_desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse minus est animi eius, perferendis nostrum ipsum porro. Nesciunt, dignissimos ex.",
    },
    {
        img: "../Assets/designer-assets/png-icons-uploadpicture.png",
        activity: "Click pic with a bird nest",
        activity_desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse minus est animi eius, perferendis nostrum ipsum porro. Nesciunt, dignissimos ex.",
    }
]

const surveyTags = ['Day','Night','Adrenaline','Relax','Beach','Lake','Outdoor','Indoor','History','Culture','Big City','Small City','Group','Individual', 'City Landscapes', 'Nature Landscapes']

challengesExample = [
    {
        id: '254yh24wtuh62utru2y24554y',
        name: 'THE HANGING BRIDGE CHALLENGE',
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci itaque soluta ea!',
        steps: {
            low: [
                {
                    desc: "Go to Lynn Valley Park in North Vancouver. When you’re there, take a picture with the welcome sign! Don’t forget that it might be dangerous being in the forest at night, so we recommend not going too late!",
                    coord: { lat: 49.34292296418448, lng: -123.01977724677438 },
                    tag: false,
                    image: "../Assets/designer-assets/png-icons-uploadpicture.png",
                    done: false
                },
                {
                    desc: "Hope you’re not afraid of heights! Take a picture standing on the hanging bridge, and don’t forget to take the time to enjoy the view! ",
                    coord: { lat: 49.34393808747806, lng: -123.0180606869341 },
                    tag: false,
                    image: "../Assets/designer-assets/png-icons-uploadpicture.png",
                    done: false
                },
                {
                    desc: "Delight yourself with this park’s captivating views by walking down the park. Find the waterfall and take a picture with it! ",
                    coord: { lat: 49.34393808747806, lng: -123.0180606869341 },
                    tag: false,
                    image: "../Assets/designer-assets/png-icons-uploadpicture.png",
                    done: false
                },
            ],
            high: [
                {
                    desc: "Go to Capilano in North Vancouver. When you’re there, take a picture with the welcome sign! Don’t forget that it might be dangerous being in the forest at night, so we recommend not going too late! ",
                    coord: { lat: 49.3426884715942, lng: -123.11402141238946 },
                    tag: false,
                    image: "../Assets/designer-assets/png-icons-uploadpicture.png",
                    done: false
                },
                {
                    desc: "	Hope you’re not afraid of heights! Take a picture standing on the hanging bridge, and don’t forget to take the time to enjoy the view! ",
                    coord: { lat: 49.34287347137181, lng: -123.11492004060521 },
                    tag: false,
                    image: "../Assets/designer-assets/png-icons-uploadpicture.png",
                    done: false
                },
                {
                    desc: "Delight yourself by having lunch -or a drink- in The Cliff House Restaurant and Bar while enjoying the captivating views. Share us a picture of what you decide to order! ",
                    coord: { lat: -123.11492004060521, lng: -123.11380161190166 },
                    tag: false,
                    image: "../Assets/designer-assets/png-icons-uploadpicture.png",
                    done: false
                },
            ],
        },
        image: "../Assets/designer-assets/jpg-sunset-2.jpg",
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
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci itaque soluta ea!',
        steps: {
            low: [
                {
                    desc: "Go to Sunset Beach and find the Inukshuk Stone Sculpture. Take a picture with it and share it with us! You will most likely see people playing games. Join them if you feel like it!",
                    coord: { lat: 49.284468944204576, lng: -123.14374494434401 },
                    tag: false,
                    image: "../Assets/designer-assets/png-icons-uploadpicture.png",
                    done: false
                },
                {
                    desc: "Vancouver has the world’s longest uninterrupted waterfront path. Now that you are in Sunset Beach you can enjoy it by walking a segment of it. Head to the north along the seawall until you reach English Bay, and don’t forget to take a picture of the views! ",
                    coord: { lat: 49.28978713432972, lng: -123.14486192683597 },
                    tag: false,
                    image: "../Assets/designer-assets/png-icons-uploadpicture.png",
                    done: false
                },
                {
                    desc: "The A-maze-ing Laughter bronze sculpture is there to bring a smile to the ones that see it. Share with us a picture of you smiling with the statues! ",
                    coord: { lat: 49.2877459713639, lng: -123.14186677222345 },
                    tag: false,
                    image: "../Assets/designer-assets/png-icons-uploadpicture.png",
                    done: false
                },
            ],
            high: [ 
                {
                    desc: "Go to Sunset Beach and find the Inukshuk Stone Sculpture. Take a picture with it and share it with us! You will most likely see people playing games. Join them if you feel like it!",
                    coord: { lat: 49.28430649257112, lng: -123.14375633650968 },
                    tag: false,
                    image: "../Assets/designer-assets/png-icons-uploadpicture.png",
                    done: false
                },
                {
                    desc: "	Vancouver has the world’s longest uninterrupted waterfront path. Now that you are in Sunset Beach you can enjoy it by walking a segment of it. Head to the north along the seawall until you reach English Bay, and don’t forget to take a picture of the views!",
                    coord: false,
                    tag: false,
                    image: "../Assets/designer-assets/png-icons-uploadpicture.png",
                    done: false
                },
                { 
                    desc: "The A-maze-ing Laughter bronze sculpture is there to bring a smile to the ones that see it. Share with us a picture of you smiling with the statues!",
                    coord: { lat: 49.287596913119486, lng: -123.14192174110453 },
                    tag: false,
                    image: "../Assets/designer-assets/png-icons-uploadpicture.png",
                    done: false
                },
            ],
        },
        image: "../Assets/designer-assets/jpg-sunset-3.jpg",
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
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci itaque soluta ea!',
        steps: {
            low: [
                {
                    desc: "Take a picture with the Granville welcome sign. ",
                    coord: { lat: 49.271462098991094, lng: -123.13392546147028 },
                    tag: false,
                    image: "../Assets/designer-assets/png-icons-uploadpicture.png",
                    done: false
                },
                {
                    desc: "Have lunch at the Granville market. Take a picture of your plate! ",
                    coord: { lat: 49.272862382088384, lng: -123.13515022900297 },
                    tag: false,
                    image: "../Assets/designer-assets/png-icons-uploadpicture.png",
                    done: false
                },
                {
                    desc: "Try the famous Lee Donuts. Share with us a pic of the doughnut you picked!  ",
                    coord: { lat: 49.27239008303922, lng: -123.13525514434446 },
                    tag: false,
                    image: "../Assets/designer-assets/png-icons-uploadpicture.png",
                    done: false
                },
            ],
            high: [ 
                {
                    desc: "Take a picture with the Granville welcome sign.",
                    coord: { lat: 49.27012311030005, lng: -123.1367827938784 },
                    tag: false,
                    image: "../Assets/designer-assets/png-icons-uploadpicture.png",
                    done: false
                },
                {
                    desc: "	Have lunch at the Sandbar. Take a picture of your plate!",
                    coord: false,
                    tag: ['restaurant','bar','cafe'],
                    image: "../Assets/designer-assets/png-icons-uploadpicture.png",
                    done: false
                },
                { 
                    desc: "Try the famous Lee Donuts. Share with us a pic of the doughnut you picked!",
                    coord: { lat: 49.272265103234105, lng: -123.13527755710894 },
                    tag: false,
                    image: "../Assets/designer-assets/png-icons-uploadpicture.png",
                    done: false
                },
            ],
        },
        image: "../Assets/designer-assets/jpg-sunset-1.jpg",
        budget: '',
        placeId: '',
        areaCoordinates: { lat: 49.27048109309838, lng: -123.13479550485158},
        premium: true,
        surveyScore: 0,
        tags: [surveyTags[14], surveyTags[0], surveyTags[1], surveyTags[3], surveyTags[7], surveyTags[9], surveyTags[11], surveyTags[13]]
    },

    {
        id: 'dfsava8747543g',
        name: 'THE DOWNTOWN CHALLENGE', //
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci itaque soluta ea!',
        steps: {
            low: [
                {
                    desc: "Walk around Canada Place. Share with us a picture of when you reach the end!",
                    coord: { lat: 49.28895767206503, lng: -123.11104581435612 },
                    tag: false,
                    image: "../Assets/designer-assets/png-icons-uploadpicture.png",
                    done: false
                },
                {
                    desc: "Take a look at downtown from the Harbour Centre. Don’t forget to take a picture of the beautiful beach! ",
                    coord: { lat: 49.28482228933386, lng: -123.1118699039284 },
                    tag: false,
                    image: "../Assets/designer-assets/png-icons-uploadpicture.png",
                    done: false
                },
                {
                    desc: "Have lunch in Gastown. Share with us a picture of what you decided to order!",
                    coord: { lat: 49.284576542322675, lng: -123.10887160201466 },
                    tag: ['restaurant','bar','cafe'],
                    image: "../Assets/designer-assets/png-icons-uploadpicture.png",
                    done: false
                },
            ],
            high: [
                {
                    desc: "Walk around Canada Place. Share with us a picture of when you reach the end!",
                    coord: false,
                    tag: false,
                    image: "../Assets/designer-assets/png-icons-uploadpicture.png",
                    done: false
                },
                {
                    desc: "Take a look at downtown from the Harbour Centre. Don’t forget to take a picture of the beautiful beach!",
                    coord: false,
                    tag: false,
                    image: "../Assets/designer-assets/png-icons-uploadpicture.png",
                    done: false
                },
                {
                    desc: "Have lunch in Gastown. Share with us a picture of what you decided to order!",
                    coord: false,
                    tag: ['restaurant','bar','cafe'],
                    image: "../Assets/designer-assets/png-icons-uploadpicture.png",
                    done: false
                },
            ],
        },
        image: '../Assets/default_img.jpg',
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
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci itaque soluta ea!',
        steps: {
            low: [
                {
                    desc: "Enjoy a coffee, a hot chocolate, or one of the amazing snacks at Purebread bakery. Show us a picture of your selection!",
                    coord: { lat: 50.120135833471615, lng: -122.95571203748781 },
                    tag: false,
                    image: "../Assets/designer-assets/png-icons-uploadpicture.png",
                    done: false
                },
                {
                    desc: "Amuse yourself with Olympic Village’s beautiful architecture. Share with us a pic of your favourite building!",
                    coord: { lat: 50.081325255158916, lng: -123.04097745907954 },
                    tag: false,
                    image: "../Assets/designer-assets/png-icons-uploadpicture.png",
                    done: false
                },
                {
                    desc: "Activity 3",
                    coord: false,
                    tag: false,
                    image: "../Assets/designer-assets/png-icons-uploadpicture.png",
                    done: false
                },
            ],
            high: [
                {
                    desc: "Enjoy a coffee, a hot chocolate, or one of the amazing snacks at Purebread bakery. Show us a picture of your selection!",
                    coord: { lat: 50.120135833471615, lng: -122.95571203748781 },
                    tag: false,
                    image: "../Assets/designer-assets/png-icons-uploadpicture.png",
                    done: false
                },
                {
                    desc: "Go to the top of the mountain and share with us a picture of the amazing views!",
                    coord: false,
                    tag: false,
                    image: "../Assets/designer-assets/png-icons-uploadpicture.png",
                    done: false
                },
                {
                    desc: "Activity 3",
                    coord: false,
                    tag: false,
                    image: "../Assets/designer-assets/png-icons-uploadpicture.png",
                    done: false
                },
            ],
        },
        image: '../Assets/default_img.jpg',
        budget: '',
        placeId: '', 
        areaCoordinates: { lat: 50.12040687042842, lng: -122.95420441063983 },
        premium: true,
        surveyScore: 0,
        tags: [/* surveyTags[15], surveyTags[0], surveyTags[2], surveyTags[6], surveyTags[8], surveyTags[12], surveyTags[3]*/]
    }, 

]

const loadChallenges = () => {
    document.querySelector('h1').innerText = 'New Challenge';
    document.getElementById('returnButton').style.display = 'none'


    displayChallenge.innerHTML = '';
    for (let i=0; i<challengesExample.length; i++) {
        displayChallenge.innerHTML += `
    <div class="challenge">
        <div class="challengeStart">
            <div ><img class="challengeImage" src="${challengesExample[i].image}" alt="start" id="clickChallenge"></a></div>
            <div class="start_link"><p onclick="challengeActivity('${challengesExample[i].name}','${i}')">START</p></div>
        </div>
        <div class="challengeInfo">
            <h3>${challengesExample[i].name}</h3>
            <div id="challengeDesc">
                <p>
                ${challengesExample[i].description}
                </p>
                <ul>
                    <li>${challengesExample[i].steps.low[0].desc}</li>
                    <li>${challengesExample[i].steps.low[1].desc}</li>
                    <li>${challengesExample[i].steps.low[2].desc}</li>
                </ul>
            </div>
        </div>
    </div>
    <hr>
    `
    }

}



const challengeActivity = (name, i) => {
    document.getElementById('returnButton').style.display = 'inline-block'

    console.log(i)

    document.querySelector('h1').innerText = name;
   // document.getElementById('challengeFilter').remove();
/*     const activity = document.createElement('h2');
    activity.innerHTML = "Activities:"
    document.body.insertBefore(activity, document.getElementById('displayChallenge'));
 */
    if(displayChallenge.innerHTML !== "") {
        displayChallenge.innerHTML = "";
    }

        let challenge = challengesExample[i].steps.low
        for( let j = 0; j < challenge.length; j++) {

            let activity = 'Goal';
            if(j==0){ activity = 'Goal 1'}
            if(j==1){ activity = 'Goal 2'}
            if(j==2){ activity = 'Goal 3'}
            
                displayChallenge.innerHTML += `
                <div class="actualChallengeContainer">
                    <div class="camera"><img class="challengeImage" src="${challenge[j].image}" alt="camera"></div>
                    <div class="activityInfo">
                        <h3>${activity}</h3>
                        <p>${challenge[j].desc}.</p>
                    </div>
                    <div><button id="route" onclick="window.location.href='./challengeStepRoute.html'">See Route</button></div>
                </div>
                    `
        }
    
}

loadChallenges();