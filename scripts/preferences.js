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
        name: 'challenge1',
        description: '',
        budget: '',
        placeId: '',
        areaCoordinates: { lat: 'lat', lng: 'lng' },
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
preferences(surveyResults)