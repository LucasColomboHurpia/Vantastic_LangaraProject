//GET INFO FROM LOCAL STORAGE
let challenges = JSON.parse(localStorage.getItem("challenges"));

const loadChallenges = () => {
    document.querySelector('h1').innerText = 'New Challenge';
    document.getElementById('returnButton').style.display = 'none'


    displayChallenge.innerHTML = '';
    for (let i = 0; i < challenges.length; i++) {
        displayChallenge.innerHTML += `
    <div class="challenge">
        <div class="challengeStart">
            <div ><img class="challengeImage" src="${challenges[i].image}" alt="start" id="clickChallenge"></a></div>
            <div class="start_link"><p onclick="loadChallenge('${challenges[i].id}')">START</p></div>
        </div>
        <div class="challengeInfo">
            <h3>${challenges[i].name}</h3>
            <div id="challengeDesc">
                <p>
                ${challenges[i].description}
                </p>
            </div>
        </div>
    </div>
    <hr>
    `
    }

}



const challengeActivity = (name, i) => {
    document.getElementById('returnButton').style.display = 'inline-block'

    document.querySelector('h1').innerText = name;

    if (displayChallenge.innerHTML !== "") {
        displayChallenge.innerHTML = "";
    }

    let challenge = challenges[i].steps.low //CHANGE THIS TO CHECK USER OBJECT
    console.log(challenge)

    for (let j = 0; j < challenge.length; j++) {

        let activity = 'Goal';
        if (j == 0) { activity = 'Goal 1' }
        if (j == 1) { activity = 'Goal 2' }
        if (j == 2) { activity = 'Goal 3' }

        let buttonRouteString = ''
        if(challenge[j].coord != false){
            buttonRouteString = `<button id="route" onclick="loadChallengeRoute(${challenge[j].coord.lat},${challenge[j].coord.lng})">See Route</button>`
        }

        displayChallenge.innerHTML += `
                <div class="actualChallengeContainer">
                    <div class="camera"><img class="challengeImage" src="${challenge[j].image}" alt="camera"></div>
                    <div class="activityInfo">
                        <h3>${activity}</h3>
                        <p>${challenge[j].desc}.</p>
                    </div>
                    <div>${buttonRouteString}</div>
                </div>
                    `
    }

}

const loadChallengeRoute = (lat, lng) => {
    console.log(lat,lng)

    let destination = {lat:lat,lng:lng}

    localStorage.setItem('destination', JSON.stringify(destination));

    window.location.href = './challengeStepRoute.html'
}

const loadChallenge = (id) => {

    for(challenge of challenges){
        if(challenge.id == id){
            localStorage.setItem('challenge', JSON.stringify(challenge));
        } 
    }

    window.location.href = './challengeRoute.html'


}


loadChallenges();

//////-------------------------- API FUNCTIONS ------------------------------------------------------------------------------------------------------------------



//challenge has to store whole thing