const mapDisplay = document.getElementById('mapDisplay');
const rootElement = document.getElementById('mainArea');

const pageIndex = [
    { id: 'mainPage', htmlPath: '' },
    { id: 'startScreen', htmlPath: '/Pages/startScreen.html' },
    { id: 'login', htmlPath: '/Pages/login.html' },
    { id: 'register', htmlPath: '/Pages/register.html' },
    { id: 'survey', htmlPath: '/Pages/survey.html' },
    { id: 'profile', htmlPath: '/Pages/profile.html' },
    { id: 'badges', htmlPath: '/Pages/badges.html' },
    { id: 'challenges', htmlPath: '/Pages/challenges.html' },
]

async function routerSPA(id) {
    for (let page of pageIndex) {
        if (id == 'mainPage') { //the map is always loaded in the background, this reduces loading times when going back to the main page
            mapDisplay.style.display = 'block'
            rootElement.style.display = 'none'
            return;
        }
        else if (page.id == id) {
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
        }
    }
}

