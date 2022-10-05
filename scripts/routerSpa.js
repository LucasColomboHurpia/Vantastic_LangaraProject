const mapDisplay = document.getElementById('mapDisplay');
const rootElement = document.getElementById('mainArea');

//this section will be updated soon, for now this works just fine
const login = `<div>this is the login page</div>`
const startScreen = `<div>this is the startScreen page</div>`
const register = `<div>this is the register page</div>`
const survey = `<div>this is the survey page</div>`
const profile = `<div>this is the profile page</div>`
const badges = `<div>this is the badges page</div>`
const challenges = `<div>this is the challenges page</div>`

const pageIndex = [
    { id: 'mainPage', defaulthtml: '', htmlPath: '' },
    { id: 'startScreen', defaulthtml: startScreen, htmlPath: '/Pages/startScreen.html' },
    { id: 'login', defaulthtml: login, htmlPath: '/Pages/login.html' },
    { id: 'register', defaulthtml: register, htmlPath: '/Pages/register.html' },
    { id: 'survey', defaulthtml: survey, htmlPath: '/Pages/survey.html' },
    { id: 'profile', defaulthtml: profile, htmlPath: '/Pages/profile.html' },
    { id: 'badges', defaulthtml: badges, htmlPath: '/Pages/badges.html' },
    { id: 'challenges', defaulthtml: challenges, htmlPath: '/Pages/challenges.html' },
]

async function routerSPA(id) {
    for (let page of pageIndex) {
        if (id == 'mainPage') { //the map is always loaded in the background, this reduces loading times when going back to the main page
            mapDisplay.style.display = 'block'
            rootElement.style.display = 'none'
            return;
        }
        //temporary fix
        else if (page.id == id) {
            mapDisplay.style.display = 'none'
            rootElement.style.display = 'block'
            rootElement.innerHTML = page.defaulthtml;
        }
        ///////GITHUB ERROR needs to be FIXED : //routerSpa.js:28 The Content Security Policy 'default-src 'none'; style-src 'unsafe-inline'; img-src data:; connect-src 'self'' was delivered via a <meta> element outside the document's <head>, which is disallowed. The policy has been ignored.
/*        else if (page.id == id) {
            try {
                mapDisplay.style.display = 'none'
                rootElement.style.display = 'block'
                const response = await fetch(page.htmlPath);
                const txt = await response.text();
                rootElement.innerHTML = txt;
                return;
            } catch (error) {
                console.error(error);
            }
        } */
    }
}

