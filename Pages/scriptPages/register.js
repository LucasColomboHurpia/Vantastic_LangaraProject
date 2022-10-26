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

    window.location.href='/Pages/mainPage.html'

}
