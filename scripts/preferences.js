let surveyResults = {
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

challengesExample = [

    {
        id: '',
        name: 'THE HANGING BRIDGE CHALLENGE',
        description: '',
        steps: {
            low:[
                {desc:"Go to Lynn Valley Park in North Vancouver. When you’re there, take a picture with the welcome sign! Don’t forget that it might be dangerous being in the forest at night, so we recommend not going too late!", 
                coord:{ lat: 49.34292296418448, lng: -123.01977724677438}},
                {desc:"Hope you’re not afraid of heights! Take a picture standing on the hanging bridge, and don’t forget to take the time to enjoy the view! ", 
                coord:{ lat:49.34393808747806 , lng: -123.0180606869341}},
                {desc:"Delight yourself with this park’s captivating views by walking down the park. Find the waterfall and take a picture with it! ", 
                coord:{ lat:49.34393808747806 , lng: -123.0180606869341}},
            ],
            high:[
                {desc:"Go to Capilano in North Vancouver. When you’re there, take a picture with the welcome sign! Don’t forget that it might be dangerous being in the forest at night, so we recommend not going too late! ", 
                coord:{ lat: 49.3426884715942, lng: -123.11402141238946}},
                {desc:"	Hope you’re not afraid of heights! Take a picture standing on the hanging bridge, and don’t forget to take the time to enjoy the view! ", 
                coord:{ lat: 49.34287347137181, lng:-123.11492004060521}},
                {desc:"Delight yourself by having lunch -or a drink- in The Cliff House Restaurant and Bar while enjoying the captivating views. Share us a picture of what you decide to order! ", 
                coord:{ lat: -123.11492004060521, lng: -123.11380161190166}},
            ],
        },
        budget: '',
        placeId: '',
        areaCoordinates: { lat: 49.34292296418448, lng: -123.01977724677438 },
        premium: true,
        tags: ['day', 'AAA', 'BBB']
    },
    {
        id: '',
        name: 'challenge2',
        description: '',
        budget: '',
        placeId: '',
        areaCoordinates: { lat: 'lat', lng: 'lng' },
        premium: true,
        tags: ['day', 'AAA', 'history']
    },
    {
        id: '',
        name: 'challenge3',
        description: '',
        budget: '',
        placeId: '',
        areaCoordinates: { lat: 'lat', lng: 'lng' },
        premium: true,
        tags: ['CCCC', 'AAA', 'BBB']
    },




]

const challengesFinalValues = ''
const placesFinalValues = ''

const preferences = (surveyResults) => {
    //gets first favorite, then scond and third
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
    console.log('1', highestValChallenges)
    console.log('2', secondHighestValChallenges)
    console.log('3', thirdHighestValChallenges)
    //calls API for number 1, 2 and 3
    ///--------------------------------------------------
    //checks best challenges
    let comparisonValue = []
    let tagScore = 0
    console.log(challengesExample[0].tags)
    for (let i = 0; i < challengesExample.length; i++) {
        console.log(challengesExample[i].name)
        let currentChallenge = challengesExample[i]
        for (let j = 0; j < currentChallenge.tags.length; j++) {
            let currentTag = challengesExample[i].tags[j]
            for (userTag of surveyResults.ChallengePreferences) {
                if (userTag == currentTag) {
                    console.log('++')
                    tagScore++;
                }
            }
        }
        comparisonValue.push(tagScore)
        tagScore = 0
    }
    console.log(comparisonValue)
    //organize array from big to low
    comparisonValue = comparisonValue.sort().reverse()
    console.log(comparisonValue)
    //now we have the most and least prefered
   for (let i = 0; i < comparisonValue.length; i++) {
     console.log(challengesExample[comparisonValue[i]])
   }
}
/* preferences(surveyResults) */