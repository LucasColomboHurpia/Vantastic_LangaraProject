//value: ['restaurant','library','aquarium','art_gallery','bar','movie_theater','bowling_alley','museum','cafe','night_club','park','shopping_mall','stadium','spa','zoo'],

//0    //1     //2           //3     //4    //5     //6       //7      //8       //9       //10       //11        //12     //13          //14                   //15
// firebase app config details

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

// firestore auth initialization
//const auth = firebaseApp.auth();


//0    //1          //2           //3        //4            //5                     //6                  //7                //8                          //9                     //10                   //11                     //12               //13                     //14               //15
const surveyTags = ['Day life', 'Night life', 'Adrenaline', 'To Relax', 'Beach Walks ', 'Lake and River Walks ', 'Outdoor Activities', 'Indoor Activities', 'History and Architecture', 'Gastronomy and Culture', 'Big City Environment', 'Small City Environment', 'Group activities', 'Individual activities', 'City Landscapes', 'Nature Landscapes']

const surveyOptions = [
    {
        opt1: {
            text: surveyTags[0], //Day
            value: ['restaurant', 'library', 'aquarium', 'art_gallery', 'bar', 'movie_theater', 'bowling_alley', 'museum', 'cafe', 'park', 'shopping_mall', 'stadium', 'spa', 'zoo'],
            marked: false,
        },
        opt2: {
            text: surveyTags[1], //Night
            value: ['restaurant', 'bar', 'movie_theater', 'bowling_alley', 'night_club', 'shopping_mall', 'stadium', 'spa'],
            marked: false,
        }
    },
    {
        opt1: {
            text: surveyTags[2], //Adrenaline
            value: ['bar', 'bowling_alley', 'night_club', 'restaurant', 'shopping_mall', 'stadium',],
            marked: false,
        },
        opt2: {
            text: surveyTags[3], //Relax
            value: ['restaurant', 'library', 'aquarium', 'art_gallery', 'bar', 'movie_theater', 'museum', 'cafe', 'park', 'spa', 'zoo'],
            marked: false,
        }
    },
    {
        opt1: {
            text: surveyTags[4], //Beach
            value: ['aquarium', 'park'],
            marked: false,
        },
        opt2: {
            text: surveyTags[5], //Lake
            value: ['aquarium', 'park'],
            marked: false,
        }
    },
    {
        opt1: {
            text: surveyTags[6], //Outdoor
            value: ['park', 'aquarium'],
            marked: false,
        },
        opt2: {
            text: surveyTags[7], //Indoor
            value: ['restaurant', 'library', 'aquarium', 'art_gallery', 'bar', 'movie_theater', 'bowling_alley', 'museum', 'cafe', 'night_club', 'shopping_mall', 'stadium', 'spa'],
            marked: false,
        }
    },
    {
        opt1: {
            text: surveyTags[8], //History
            value: ['museum'],
            marked: false,
        },
        opt2: {
            text: surveyTags[9], //Culture
            value: ['restaurant', 'library', 'art_gallery', 'bar', 'museum', 'stadium'],
            marked: false,
        }
    },
    {
        opt1: {
            text: surveyTags[10], //Big City
            value: ['restaurant', 'art_gallery', 'bar', 'movie_theater', 'night_club', 'shopping_mall', 'stadium', 'zoo'],
            marked: false,
        },
        opt2: {
            text: surveyTags[11], //Small City
            value: ['cafe', 'park'],
            marked: false,
        }
    },
    {
        opt1: {
            text: surveyTags[12], //Group
            value: ['restaurant', 'aquarium', 'bar', 'movie_theater', 'bowling_alley', 'museum', 'cafe', 'night_club', 'park', 'shopping_mall', 'stadium', 'zoo'],
            marked: false,
        },
        opt2: {
            text: surveyTags[13], //Individual
            value: ['library', 'aquarium', 'art_gallery', 'bar', 'movie_theater', 'museum', 'cafe', 'night_club', 'park', 'shopping_mall', 'spa'],
            marked: false,
        }
    },
    {
        opt1: {
            text: surveyTags[14], //City Landscapes
            value: ['restaurant', 'art_gallery', 'bar', 'movie_theater', 'bowling_alley', 'museum', 'cafe', 'night_club', 'shopping_mall', 'stadium', 'spa'],
            marked: false,
        },
        opt2: {
            text: surveyTags[15], //Nature Landscapes
            value: ['library', 'aquarium', 'park',],
            marked: false,
        }
    },
]

let surveyTitle = ''
let surveyOpt1 = ''
let surveyOpt2 = ''
let surveyPrev = ''
let surveyNext = ''
let surveyBothButton = ''
let surveyProgress = ''

const getSurveyHtmlElements = () => {
    surveyTitle = document.getElementById('surveyTitle')
    surveyOpt1 = document.getElementById('surveyOpt1')
    surveyOpt2 = document.getElementById('surveyOpt2')
    surveyPrev = document.getElementById('surveyPrev')
    surveyNext = document.getElementById('surveyNext')
    surveyBothButton = document.getElementById('surveyBothButton')
    surveyProgress = document.getElementById('surveyProgress')
}

let surveyDelay = 1000;
let donevar = false;
let currentOptions = 0;

const introSurvey = () => {
    surveyWrapping.innerHTML = `
    <div class="finishSurvey">
        <div ><img class="finishSurveyImage" src="../Assets/designer-assets/png-check.png"/></div>
        <div class="finishThankYou">Just one more thing!</div>
        <div class="finishText">Please take a moment to answer this quick survey (around 1 minute) so we can have a better idea of what <b>YOU</b> like!</div>
        <div><span class="FinishButton" onclick="startSurvey();">Okay!</span></div>
    </div>
`
}

const startSurvey = () => {
    setsurveyHTML();
    getSurveyHtmlElements();

    surveyPrev.style.display = "none";
    surveyNext.style.display = "none";
    surveyBothButton.style.display = "none";

    surveyOpt1.innerHTML = startSurveyHtmlString('high');
    surveyOpt2.innerHTML = startSurveyHtmlString('low');
}

const setsurveyHTML = () => {
    surveyWrapping.innerHTML = `
        <div class="surveyTitle" id='surveyTitle'>Between these two, what do you prefer?</div>
        <div class="surveyWrapper">
            <div class="surveyFlex">
                <div class="surveyButton surveyHoverButton" id="surveyPrev">Prev </div>
                <div class="surveyOptFlex">
                    <div class="surveyOpt surveyHoverButton" id="surveyOpt1">Option 1</div>
                    <div class="surveyOpt surveyHoverButton" id="surveyOpt2">Option 2</div>
                </div>
                <div class="surveyButton surveyHoverButton" id="surveyNext">Next</div>
            </div> 
            <div class="surveyBoth surveyHoverButton" id="surveyBothButton">Both!</div>
        </div>
        <div class="surveyProgress" id="surveyProgress"><span class="surveyProgressMarker"></span></div>
    `
}


const submitBudget = (budget) => {
    if (budget == 'high') {
        surveyOpt1.classList.add('spinCard')
    }
    else if (budget == 'low') {
        surveyOpt2.classList.add('spinCard')
    }
    console.log(budget)
    setTimeout(() => {
        surveyTitle.innerHTML = 'Between these two, what do you prefer?'
        surveyPrev.style.display = "inline";
        surveyNext.style.display = "inline";
        surveyBothButton.style.display = "inline";
        surveyUpdate(); SurveyAddEventListeners()
    }, 1000)
}

const surveyUpdate = () => {
    surveyOpt1.innerHTML = optionHtmlString(surveyOptions[currentOptions].opt1);
    surveyOpt2.innerHTML = optionHtmlString(surveyOptions[currentOptions].opt2);
    surveyCheckProgress()
    return console.log(currentOptions)
}

const SurveyAddEventListeners = () => {
    surveyPrev.addEventListener('click', () => {
        currentOptions--;
        for (let i = 0; i < surveyOptions.length; i++) {
            if (currentOptions < 0) {
                currentOptions = surveyOptions.length - 1;
                surveyUpdate()
            }
            return surveyUpdate()
        }
    })

    surveyNext.addEventListener('click', () => {
        currentOptions++;
        for (let i = 0; i < surveyOptions.length; i++) {
            if (currentOptions == (surveyOptions.length)) {
                currentOptions = 0;
                surveyUpdate()
            }
            return surveyUpdate()
        }
    })

    surveyOpt1.addEventListener('click', () => {
        checkSurvey(surveyOptions[currentOptions].opt1.text)
        surveyParseAnswer(surveyOptions[currentOptions].opt1)

        surveyOpt1.classList.remove('spinCard');
        setTimeout(function () { surveyOpt1.classList.add('spinCard') }, 10);

        setTimeout(() => {
            currentOptions++;
            for (let i = 0; i < surveyOptions.length; i++) {
                if (currentOptions == (surveyOptions.length)) {
                    currentOptions = 0;
                    surveyUpdate()
                }
                return surveyUpdate()
            }
        }, surveyDelay)
    })

    surveyOpt2.addEventListener('click', () => {
        checkSurvey(surveyOptions[currentOptions].opt2.text)
        surveyParseAnswer(surveyOptions[currentOptions].opt2)

        surveyOpt2.classList.remove('spinCard');
        setTimeout(function () { surveyOpt2.classList.add('spinCard') }, 10);

        setTimeout(() => {
            currentOptions++;
            for (let i = 0; i < surveyOptions.length; i++) {
                if (currentOptions == (surveyOptions.length)) {
                    currentOptions = 0;
                    surveyUpdate()
                }
                return surveyUpdate()
            }
        }, surveyDelay)
    })

    surveyBothButton.addEventListener('click', () => {

        checkSurveyBoth(surveyOptions[currentOptions].opt1.text)
        surveyParseAnswer(surveyOptions[currentOptions].opt1)
        surveyParseAnswer(surveyOptions[currentOptions].opt2)

        surveyOpt1.classList.remove('spinCard');
        setTimeout(function () { surveyOpt1.classList.add('spinCard') }, 10);

        surveyOpt2.classList.remove('spinCard');
        setTimeout(function () { surveyOpt2.classList.add('spinCard') }, 10);

        setTimeout(() => {
            currentOptions++;
            for (let i = 0; i < surveyOptions.length; i++) {
                if (currentOptions == (surveyOptions.length)) {
                    currentOptions = 0;
                    surveyUpdate()
                }
                return surveyUpdate()
            }
        }, surveyDelay)

    })
}

const checkSurvey = (text) => {
    for (item of surveyOptions) {
        if (item.opt1.text == text) {
            item.opt1.marked = !item.opt1.marked
            item.opt2.marked = !item.opt1.marked
        } else
            if (item.opt2.text == text) {
                item.opt2.marked = !item.opt2.marked
                item.opt1.marked = !item.opt2.marked
            }
    }
    surveyUpdate()
}

const checkSurveyBoth = (text) => {
    for (item of surveyOptions) {
        if (item.opt1.text == text) {
            item.opt1.marked = true
            item.opt2.marked = true
        } else
            if (item.opt2.text == text) {
                item.opt2.marked = true
                item.opt1.marked = true
            }
    }
    surveyUpdate()
}

const surveyCheckProgress = () => {
    surveyProgress.innerHTML = ''
    let index = 0;
    for (item of surveyOptions) {
        if (item.opt1.marked || item.opt2.marked) {

            if (item.opt1.text == surveyOptions[currentOptions].opt1.text) {
                surveyProgress.innerHTML += `<span onclick="navigateSurvey(${index})" class="progressCurrent">x </span>`
            }
            else { surveyProgress.innerHTML += `<span onclick="navigateSurvey(${index})" style="cursor:pointer;">x </span>` }
        }
        if (!item.opt1.marked && !item.opt2.marked) {
            if (item.opt1.text == surveyOptions[currentOptions].opt1.text) {
                surveyProgress.innerHTML += `<span onclick="navigateSurvey(${index})" class="progressCurrent">o </span>`
            }
            else { surveyProgress.innerHTML += `<span onclick="navigateSurvey(${index})" style="cursor:pointer;">o </span>` }
        }
        index++;
    }

    for (item of surveyOptions) {
        if (!item.opt1.marked && !item.opt2.marked) {
            return console.log('not ready yet')
        }
    }

    if(donevar == false){
        donevar = true
        finishSurvey();
    } else {console.log('fixed jank code')}
}

const navigateSurvey = (i) => {
    currentOptions = i
    surveyUpdate();
}

const surveyParseAnswer = (opt) => {
    if (opt == 'high' || opt == 'low') {
        defaultSurveyResults.budget = opt
        return
    }

    let userChallengePreferences = defaultSurveyResults.surveyResults

    userChallengePreferences.ChallengePreferences.push(opt.text)
    console.log(userChallengePreferences.ChallengePreferences)

    let userPlacesPreferences = defaultSurveyResults.surveyResults.placesPreferences
    console.log(userPlacesPreferences)

    for (item of userPlacesPreferences) {
        for (pref of opt.value) {
            if (pref == item.name) {
                item.value++
            }
        }
    }
    console.log(defaultSurveyResults)

    user.preferences.surveyDone = true
    user.preferences.budget = defaultSurveyResults.budget
    user.preferences.surveyResults = defaultSurveyResults.surveyResults

    console.log('user', user)


    localStorage.clear()
    localStorage.setItem("user", JSON.stringify(user));

    //    let userPlacesPreferences = user.preferences.surveyResults.placesPreferences

}


///-----------------------------------------
const optionHtmlString = (opt) => {
    let checkBox = ''
    if (opt.marked) { checkBox = '<div class="surveyOptCheckbox" onclick="">X</div>' }
    else { checkBox = '<div class="surveyOptCheckbox" onclick=""> </div>' }

    let string = `
${checkBox}
<div class="surveyOptDescription">${opt.text}</div>
`
    return string
}

const startSurveyHtmlString = (budget) => {
    surveyTitle.innerHTML = 'You are on a:'

    let string;
    if (budget == 'high') {
        string = `
<div class="surveyBudgetWrapp" id = "surveyBudgetWrapp" onclick="submitBudget('high')">
    <div class="section1Budget">$$</div>
    <div class="section2Budget">High Budget</div>
    <div class="section3Budget">Willing to spend 60+ CAD per day</div>
</div>
`}
    if (budget == 'low') {
        string = `
<div class="surveyBudgetWrapp" onclick="submitBudget('low')">
    <div class="section1Budget">$</div>
    <div class="section2Budget">Low Budget</div>
    <div class="section3Budget">Willing to spend less than 50 CAD per day</div>
</div>
`}

    return string
}

// adding users to firestore database
const addUsers = () => {
    db.collection("users").doc().set(user).then(() => {
        console.log("Document successfully written!");
    });
}

// getting all docs from users collection from firestore database
const getUser = () => {
    db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    });
}



const finishSurvey = () => {
    console.log('All done!')

    //calling firebase addUser
    addUsers();

    /*     let userPlacesPreferences = user.preferences.surveyResults.placesPreferences
    */
    //console.log(user)
    //----------------------
    //sends result to object //creates localStorage object at register -> increments object here
    //-----------------------
    //shows finish screen
    let surveyWrapping = document.getElementById('surveyWrapping')
    surveyWrapping.innerHTML = `
    <div class="finishSurvey">
        <div ><img class="finishSurveyImage" src="../Assets/designer-assets/png-check.png"/></div>
        <div class="finishThankYou">Thank You!</div>
        <div class="finishText">Thank you for your time, you are now ready to make your stay in vancouver fantastic!</div>
        <div><span class="FinishButton" onclick="window.location.href='./mainPage.html';">Let's go!</span></div>
    </div>
`
}


startSurvey()



/* finishSurvey()
*/
//Library USERS
const user = {
    userName: 'usernameFromTheAuthentication',
    email: 'emailFromTheAuthentication',
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
            ChallengePreferences: ['Day', 'Relax', 'History']
        }
    },
    challengesDone: ['idOfChallenge1', 'idOfChallenge2', 'idOfChallenge3'],
    badges: ['idOfBadge1', 'idOfBadge2', 'idOfBadge3',],
    placesVisited: ['idOfPlace1', 'idOfPlace2', 'idOfPlace3',],
    id: 'a8s72bn198gbs18y',
}

//Library BADGES
/*  badges = {
id: '',
challengeId: '',
icon: '',
name: '',
description: '',
} */

//Library CHALLENGES


////////////////////////////////--------------------------------

//this comes from document storage


let defaultSurveyResults = {
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
        ChallengePreferences: [
            'Day', 'Relax', 'History',
        ]
    }
}

/* let surveyResults = {
budget: 'low',
surveyResults: {
    placesPreferences: [
        { name: 'restaurant', value: 2, },
        { name: 'library', value: 5, },
        { name: 'art_gallery', value: 3, },
        { name: 'bar', value: 1, },
        { name: 'movie_theater', value: 4, },
        { name: 'bowling_alley', value: 3, },
        { name: 'museum', value: 3, },
        { name: 'cafe', value: 4, },
        { name: 'night_club', value: 1, },
        { name: 'park', value: 5, },
        { name: 'shopping_mall', value: 3, },
        { name: 'stadium', value: 1, },
        { name: 'zoo', value: 2, },
    ],
    ChallengePreferences: [
        'Day', 'Relax', 'History',
    ]
}
} */

//this comes from document storage


