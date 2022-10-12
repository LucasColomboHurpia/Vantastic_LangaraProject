const surveyOptions = [
    {
        opt1: {
            text: 'Day',
            value: [],
            marked: false,
        },
        opt2: {
            text: 'Night',
            value: [],
            marked: false,
        }
    },
    {
        opt1: {
            text: 'Adrenaline',
            value: [],
            marked: false,
        },
        opt2: {
            text: 'Relax',
            value: [],
            marked: false,
        }
    },
    {
        opt1: {
            text: 'Beach',
            value: [],
            marked: false,
        },
        opt2: {
            text: 'Lake',
            value: [],
            marked: false,
        }
    },
    {
        opt1: {
            text: 'Famous',
            value: [],
            marked: false,
        },
        opt2: {
            text: 'Hidden',
            value: [],
            marked: false,
        }
    },
    {
        opt1: {
            text: 'Outdoor',
            value: [],
            marked: false,
        },
        opt2: {
            text: 'Indoor',
            value: [],
            marked: false,
        }
    },
    {
        opt1: {
            text: 'History',
            value: [],
            marked: false,
        },
        opt2: {
            text: 'Culture',
            value: [],
            marked: false,
        }
    },
    {
        opt1: {
            text: 'Big City',
            value: [],
            marked: false,
        },
        opt2: {
            text: 'Small City',
            value: [],
            marked: false,
        }
    },
    {
        opt1: {
            text: 'LongWalk',
            value: [],
            marked: false,
        },
        opt2: {
            text: 'ShortWalk',
            value: [],
            marked: false,
        }
    },
    {
        opt1: {
            text: 'Group',
            value: [],
            marked: false,
        },
        opt2: {
            text: 'Individual',
            value: [],
            marked: false,
        }
    },
    {
        opt1: {
            text: 'Long Transit',
            value: [],
            marked: false,
        },
        opt2: {
            text: 'Short Transit',
            value: [],
            marked: false,
        }
    },
]
console.clear()

const surveyTitle = document.getElementById('surveyTitle')
const surveyOpt1 = document.getElementById('surveyOpt1')
const surveyOpt2 = document.getElementById('surveyOpt2')
const surveyPrev = document.getElementById('surveyPrev')
const surveyNext = document.getElementById('surveyNext')
const surveyBothButton = document.getElementById('surveyBothButton')

let surveyDelay = 300

let currentOptions = 0

const surveyUpdate = () => {
    surveyOpt1.innerHTML = optionHtmlString(surveyOptions[currentOptions].opt1);
    surveyOpt2.innerHTML = optionHtmlString(surveyOptions[currentOptions].opt2);

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
const startSurvey = () => {
    surveyPrev.style.display = "none";
    surveyNext.style.display = "none";
    surveyBothButton.style.display = "none";

    surveyOpt1.innerHTML = startSurveyHtmlString('high');
    surveyOpt2.innerHTML = startSurveyHtmlString('low');
}

const submitBudget = (budget) => {
    if(budget=='high'){
    surveyOpt1.classList.add('animationTest')}
    else if (budget=='low'){
        surveyOpt2.classList.add('animationTest')}
    console.log(budget)
    setTimeout(() => {
        surveyTitle.innerHTML = 'Between these two, what do you prefer?'
        surveyPrev.style.display = "inline";
        surveyNext.style.display = "inline";
        surveyBothButton.style.display = "inline";    
        surveyUpdate();SurveyAddEventListeners()}, 1000)
}

const checkSurvey = (text) => {
    for (item of surveyOptions) {
        if (item.opt1.text == text) {
            item.opt1.marked = !item.opt1.marked
            item.opt2.marked = !item.opt1.marked
            console.log(item.opt1)
        } else
            if (item.opt2.text == text) {
                item.opt2.marked = !item.opt2.marked
                item.opt1.marked = !item.opt2.marked

                console.log(item.opt2)
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


startSurvey()






//Library USERS
user = {
    userName: 'Lucas',
    email: 'lucas@email.com',
    password: 'encryptionKey',
    premium: true,
    dateOfBirth: '',
    gender: 'male',
    preferences: {
        budget: 'low',
        surveyResults: {
            restaurant: 2,
            library: 5,
            aquarium: 4,
            art_gallery: 3,
            bar: 1,
            movie_theater: 3,
            bowling_alley: 2,
            museum: 3,
            cafe: 3,
            night_club: 0,
            park: 5,
            shopping_mall: 2,
            stadium: 1,
            zoo: 3,
        }
    },
    challengesDone: ['idOfChallenge1', 'idOfChallenge2', 'idOfChallenge3'],
    badges: ['idOfBadge1', 'idOfBadge2', 'idOfBadge3',],
    placesVisited: ['idOfPlace1', 'idOfPlace2', 'idOfPlace3',],
    id: 'a8s72bn198gbs18y',
}

//Library BADGES
badges = {
    id: '',
    challengeId: '',
    icon: '',
    name: '',
    description: '',
}

//Library CHALLENGES
Challenge = {
    id: '',
    name: '',
    description: '',
    budget: '',
    placeId: '',
    areaCoordinates: { lat: 'lat', lng: 'lng' },
    premium: true,
}

