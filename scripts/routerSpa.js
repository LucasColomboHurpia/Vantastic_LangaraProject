const mapDisplay = document.getElementById('mapDisplay');
const rootElement = document.getElementById('mainArea');

let currentStyle = '/styles/style.css'



//this section will be updated soon, for now this works just fine
const login = `<div>this is the login page</div>`
const startScreen = `<div>this is the startScreen page</div>`
const register = `<div>this is the register page</div>`
const survey = `<div>this is the survey page</div>`
const profile = `<div>this is the profile page</div>`
const badges = `<div>this is the badges page</div>`
const challenges = `<div>this is the challenges page</div>`

const pageIndex = [
    { id: 'mainPage',    defaulthtml: '',          stylePath:'/styles/style.css',            scriptPath:'',                             htmlPath: '' },
    { id: 'startScreen', defaulthtml: startScreen, stylePath:'',                             scriptPath:'/Pages/scriptPages/test.js',   htmlPath: '/Pages/startScreen.html' },
    { id: 'login',       defaulthtml: login,       stylePath:'',                             scriptPath:'',                             htmlPath: '/Pages/login.html' },
    { id: 'register',    defaulthtml: register,    stylePath:'',                             scriptPath:'',                             htmlPath: '/Pages/register.html' },
    { id: 'survey',      defaulthtml: survey,      stylePath:'/Pages/stylePages/survey.css', scriptPath:'/Pages/scriptPages/survey.js', htmlPath: '/Pages/survey.html' },
    { id: 'profile',     defaulthtml: profile,     stylePath:'',                             scriptPath:'',                             htmlPath: '/Pages/profile.html' },
    { id: 'badges',      defaulthtml: badges,      stylePath:'',                             scriptPath:'',                             htmlPath: '/Pages/badges.html' },
    { id: 'challenges',  defaulthtml: challenges,  stylePath:'',                             scriptPath:'',                             htmlPath: '/Pages/challenges.html' },
]


/* let head = document.getElementsByTagName('head')[0];
let scripts = head.getElementsByTagName('script');
 */

 function routerSPA(id) {
    for (let page of pageIndex) {
        if (id == 'mainPage') { //the map is always loaded in the background, this reduces loading times when going back to the main page
            mapDisplay.style.display = 'block'
            rootElement.style.display = 'none'
            toggleStylesheet('',0)
            toggleStylesheet(page.stylePath,1)
            currentStyle = page.stylePath

            return;
        }
        //temporary fix
        else if (page.id == id) {
            mapDisplay.style.display = 'none'
            rootElement.style.display = 'block'
            rootElement.innerHTML = page.defaulthtml;
            toggleStylesheet('',0)
            toggleStylesheet(page.stylePath,1)
            currentStyle = page.stylePath
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

const toggleStylesheet = ( href, onoff ) => {
let styleList = document.body.getElementsByTagName('link')
    if(onoff==1){ //TURN ON:
        let link  = document.createElement('link');
        link.rel  = 'stylesheet';
        link.type = 'text/css';
        link.href = href;
        link.id='currentPageStyle'
        document.body.appendChild(link);
        console.log('current styles',document.body.getElementsByTagName('link'))

    }else{ //TURN OFF:
        if(onoff==0){
            for (style of styleList){
                if(style.id == 'currentPageStyle'){
                    document.body.removeChild(style);
                }
            }
        }
    }
    return onoff
}

/* console.log(document.body.getElementsByTagName('script'))
 */
const  toggleScript = (href, onoff) => {
    let body = document.body
    let  script = document.createElement('script');

    if(onoff == 1){
       script = document.createElement('script');
       script.src = href;
       script.type = 'text/javascript';
       script.id = "pageScript";
       body.appendChild(script)
    }
    else if(onoff == 0){
       let scripts = body.getElementsByTagName('script');
       for(let scriptTag of scripts){
            if(scriptTag.id=='pageScript'){
                body.removeChild(scriptTag);
            }
       }
/*        if(scripts.length > 0){
          head.removeChild(scripts[0]);
       } */
    }
  }

toggleStylesheet(currentStyle,1)
/* toggleScript('/Pages/scriptPages/test.js',1) */