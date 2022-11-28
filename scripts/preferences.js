//GET INFO FROM LOCAL STORAGE
let challenges = JSON.parse(localStorage.getItem("challenges"));

//sets up some variables to be use later
let challengesFinalValues = ''
let placesFinalValues = ''

//sets up markers for map
const markerN1 = "../Assets/number 1 - marker.png";
const markerN2 = "../Assets/number 2 - marker.png";
const markerN3 = "../Assets/number 3 - marker.png";

const orangeMarkerN1 = "../Assets/number 1 - orange marker.png";
const orangeMarkerN2 = "../Assets/number 2 - orange marker.png";
const orangeMarkerN3 = "../Assets/number 3 - orange marker.png";

//gets user data from localStorage (soon to be firebase)
let userResults = JSON.parse(localStorage.getItem('user'))
let userPreferences = userResults.preferences
let surveyResults = userResults.preferences.surveyResults


const preferences = (surveyResults) => {
    //gets first favorite, then scond and third favorites
    //gets places favorites
    let highestValChallenges = { value: 0 }
    let secondHighestValChallenges = { value: 0 }
    let thirdHighestValChallenges = { value: 0 }

    for (item of surveyResults.placesPreferences) {

        //finds the biggest number
        if (item.value > highestValChallenges.value) {
            highestValChallenges = item
        }
        //finds the second biggest number
        if (item.value > secondHighestValChallenges.value && item.name != highestValChallenges.name) {
            secondHighestValChallenges = item
        }

        //finds the third biggest number
        if (item.value > thirdHighestValChallenges.value && item.name != highestValChallenges.name && item.name != secondHighestValChallenges.name) {
            thirdHighestValChallenges = item
        }
    }
    let bestPlaces = [highestValChallenges, secondHighestValChallenges, thirdHighestValChallenges]


    //calls API for number 1, 2 and 3
    ///------------------------------------------------------------------------------------

    //checks best challenges suited for the user based on survey results
    let comparisonValue = []
    let tagScore = 0
    for (let i = 0; i < challenges.length; i++) {
        let currentChallenge = challenges[i]
        for (let j = 0; j < currentChallenge.tags.length; j++) {
            let currentTag = challenges[i].tags[j]
            for (userTag of surveyResults.ChallengePreferences) {
                if (userTag == currentTag) {
                    tagScore++; //tag score increases every time the challenge's tags matches the user's results
                }
            }
        }
        comparisonValue.push(tagScore) 
        tagScore = 0
    }
    for (let i = 0; i < comparisonValue.length; i++) {
        challenges[i].surveyScore = comparisonValue[i] //adds tag score to challenge as an attribute
    }

    challenges.sort(function (a, b) { return a.surveyScore - b.surveyScore; }).reverse() //sorts

    //from now on, the challenges are properly ordered from most to least favorite
    console.log('challenges ordered', challenges)



    //show info in the side bar
    /*     showChallengeInfo(challenges[0])
        showChallengeInfo(challenges[1])
     */
    challengeLocationMarkers(challenges[0], bestPlaces, 1)

    setTimeout(() => { //sets up delay for animation to play
        challengeLocationMarkers(challenges[1], bestPlaces, 1)
    }, 3000);
    /*      setTimeout(() => {
            console.log(challenges[comparisonValue[2]]) ///this gets the challenges
            challengeLocationMarkers(challenges[comparisonValue[2]], bestPlaces, 1)
        }, 12000);  */

    setTimeout(() => { //sets up delay for animation to play
        librarians.aroundVancouverMarkers('tourist_attraction', 3)
    }, 2000);
}

/*  */

const challengeLocationMarkers = (challenge, bestPlaces, delay) => {
    let animationDelay = delay * 1000 //sets up delay for animation to play

    showChallengeInfo(challenge) //adds challenge info to interface

    librarians.challengeMarker(challenge) //marks the map

    //check if there are coordinates
    for (let i = 0; i < bestPlaces.length; i++) {
        setTimeout(() => { //sets up delay for animation to play
            librarians.placesAPIRequest(bestPlaces[i].name, challenge.areaCoordinates, 3, false, 1200)
        }, animationDelay * i);
    }
}

const showChallengeInfo = (challenge) => {
    let challengeContainer = document.getElementById('challengeContainer');

    //show information badsed on budget
    if (userPreferences.budget == 'low') { 

        //shows low budget challenge information
        challengeContainer.innerHTML += `
        <div class="challengeInfo">
            <div class="titleChallenge">${challenge.name}</div>
                <div class="challengeDesc">${challenge.description}</div>
                <div class="challengeStepsContainer">

                </div>
            <div class="challengeButton" onclick="panToChallenge(${challenge.areaCoordinates.lat},${challenge.areaCoordinates.lng})">See Challenge Area</div>
        </div>

    `
        //set up object to be used in API function
        let placeMarker = {
            position: { lat: '', lng: '' },
            title: '',
            name: '',
            icon: '',
            category: 'challengeStep',
            description: '',
            image: '',
            id: '',
        }

        //loops through ever step of the challenge
        for (let i = 0; i < challenge.steps.low.length; i++) {
            let challengeStep = challenge.steps.low[i]

            //checks if there are specific coordinates for the step
            if (challengeStep.coord == false) { console.log('has no coordinates') }
            else {
            //sets up marker and pins the map
                if (i == 0) { placeMarker.title = 'First Step!'; placeMarker.icon = markerN1; }
                if (i == 1) { placeMarker.title = 'Second Step!'; placeMarker.icon = markerN2; }
                if (i == 2) { placeMarker.title = 'Third Step!'; placeMarker.icon = markerN3; }
                placeMarker.title = challenge.name
                placeMarker.name = challenge.name
                placeMarker.description = challengeStep.desc
                placeMarker.image = challengeStep.image
                placeMarker.id = challenge.id
                placeMarker.position = { lat: challengeStep.coord.lat, lng: challengeStep.coord.lng }
                librarians.pinMaker(placeMarker)
            }

            //checks if there are specific TAGS for the step
            if (challengeStep.tag == false) { console.log('has no tags') }
            else {
                if (i == 0) { placeMarker.title = 'First Step!'; placeMarker.icon = orangeMarkerN1; }
                if (i == 1) { placeMarker.title = 'Second Step!'; placeMarker.icon = orangeMarkerN2; }
                if (i == 2) { placeMarker.title = 'Third Step!'; placeMarker.icon = orangeMarkerN3; }
                placeMarker.description = challengeStep.desc
                placeMarker.image = challengeStep.image
                let placeMarkerPosition = { lat: challengeStep.coord.lat, lng: challengeStep.coord.lng }
                setTimeout(() => {
                    //  librarians.placesAPIRequest(challengeStep.tag[0], placeMarkerPosition, 3, false,  1200) //(type, position, npins, remove, radius)
                }, i * 6000);
            }
        }
    }

    //show information badsed on budget
    if (userPreferences.budget == 'high') {

        //shows low budget challenge information
        challengeContainer.innerHTML += `
        <div class="challengeInfo">
            <div class="titleChallenge">${challenge.name}</div>
                <div class="challengeDesc">${challenge.description}</div>
                <div class="challengeStepsContainer">

                </div>
            <div class="challengeButton">Explore</div>
        </div>

    `
         //set up object to be used in API function
        let placeMarker = {
            position: { lat: '', lng: '' },
            title: '',
            icon: '',
            category: 'challengeStep'
        }
        //loops through ever step of the challenge
        for (let i = 0; i < challenge.steps.high.length; i++) {
            let challengeStep = challenge.steps.high[i]
            //checks if there are specific coordinates for the step
            if (challengeStep.coord == false) { return console.log('has no coordinates') }
            else {
                //sets up marker and pins the map
                if (i == 0) { placeMarker.title = 'First Step!'; placeMarker.icon = markerN1 }
                if (i == 1) { placeMarker.title = 'Second Step!'; placeMarker.icon = markerN2 }
                if (i == 2) { placeMarker.title = 'Third Step!'; placeMarker.icon = markerN3 }
                placeMarker.title = challenge.name
                placeMarker.name = challenge.name
                placeMarker.description = challengeStep.desc
                placeMarker.image = challengeStep.image
                placeMarker.id = challenge.id
                placeMarker.position = { lat: challengeStep.coord.lat, lng: challengeStep.coord.lng }
                librarians.pinMaker(placeMarker)
            }
        }
    }
}

//use this function to pan the current challenge
const panToChallenge = (lat, lng) => {
    let challengePos = { lat: lat, lng: lng }
    map.panTo(challengePos)
    map.setZoom(14)
}


//mobile style

//talk icons with sebastian