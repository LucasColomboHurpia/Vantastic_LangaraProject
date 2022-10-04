const pageIndex = [
    { id: '#mainPage', htmlPath: '/index.html', jsPath: '', stylePath: '' },
    { id: '#startScreen', htmlPath: '/Pages/startScreen.html', jsPath: '', stylePath: '' },
    { id: '#login', htmlPath: '/Pages/login.html', jsPath: '', stylePath: '' },
    { id: '#register', htmlPath: '/Pages/register.html', jsPath: '', stylePath: '' },
    { id: '#survey', htmlPath: '/Pages/survey.html', jsPath: '', stylePath: '' },
    { id: '#profile', htmlPath: '/Pages/profile.html', jsPath: '', stylePath: '' },
    { id: '#badges', htmlPath: '/Pages/badges.html', jsPath: '', stylePath: '' },
    { id: '#chellenges', htmlPath: '/Pages/chellenges.html', jsPath: '', stylePath: '' },
]

const mapDisplay = document.getElementById('mapDisplay');
const rootElement = document.getElementById('mainArea');

window.addEventListener('hashchange', function (e) { router() });

const router = () => {
    let urlHash = window.location.hash;
    if (urlHash.length > 0) {
        for (let page of pageIndex) {
            if (urlHash === page.id) {
                gotoPage(page)
                break;
            }
        }
    } else {
        gotoPage(pageIndex[0])
    }
}

async function gotoPage(page) {
    if (page.id=='#mainPage') {
        rootElement.style.display = 'none'
        mapDisplay.style.display = 'block'
        return
    }
    try {
        mapDisplay.style.display = 'none'
        rootElement.style.display = 'block'

        const response = await fetch(page.htmlPath);
        const txt = await response.text();
        rootElement.innerHTML = txt;
        if (page.jsPath) {
            console.log(googleScript)
            const script = document.createElement('script');
            script.setAttribute('src', '/Pages/scriptPages/mainPage.js');
            script.setAttribute('type', 'text/javascript');
            rootElement.appendChild(script);
        }
        //append Style
        if (page.stylePath) {
            const style = document.createElement('link');
            style.setAttribute('href', '../styles/style.css');
            style.setAttribute('rel', 'stylesheet');
            rootElement.appendChild(style);
        }

    } catch (error) {
        console.error(error);
    }
}

router()