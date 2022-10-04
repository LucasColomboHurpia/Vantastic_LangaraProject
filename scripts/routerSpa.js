//Encountered problems with setting up a SPA router that works on GitHub, the following code works in a live server but not when using github pages
//For now, this code is being used for the routing
//the router.js script and the Pages folder are not being used at the current moment
//will update it soon

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
    { id: 'mainPage', innerhtml: ''},
    { id: 'startScreen', innerhtml: startScreen},
    { id: 'login', innerhtml: login},
    { id: 'register', innerhtml: register},
    { id: 'survey', innerhtml: survey},
    { id: 'profile', innerhtml: profile},
    { id: 'badges', innerhtml: badges},
    { id: 'challenges', innerhtml: challenges},
]

const routerSPA = (id) =>{
    for (let page of pageIndex) {
        if(id=='mainPage'){ //the map is always loaded in the background, this reduces loading times when going back to the main page
            mapDisplay.style.display = 'block'
            rootElement.style.display = 'none'
            break;
        }
        else if(page.id==id){
            mapDisplay.style.display = 'none'
            rootElement.style.display = 'block'
            rootElement.innerHTML = page.innerhtml
            break;
        }
    }
}

