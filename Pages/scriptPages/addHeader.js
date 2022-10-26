let user = JSON.parse(localStorage.getItem("user"))
let buttonText = 'Logout'
if(user.userName=='Guest'){buttonText='Login'}

let header = document.createElement("div")
header.classList.add("header")
header.innerHTML = `
<div class="logo" id='logoDiv'> <img src="../Assets/designer-assets/png-logo06.png" alt='logo' class='logoIcon'> </div>
    <div class="headerOptions">
        <div class="headerHome headerSection"  onclick="window.location.href='./mainPage.html';">Home</div>
        <div class="headerChallenges headerSection" onclick="window.location.href='./challenges.html';">Challenges</div>
        <div class="headerBadges headerSection" onclick="window.location.href='./badges.html';">Badges</div>
        <div class="headerProfile headerSection disabled">Profile</div>
        <div class="hederSetting headerSection disabled">Settings</div>
    </div>
<div class="loginHeader" onclick="window.location.href='./login.html';">${buttonText}</div>
`

document.body.prepend(header)

let headerStyle  = document.createElement('link');
headerStyle.rel  = 'stylesheet';
headerStyle.type = 'text/css';
headerStyle.href = './stylePages/header.css';
document.body.append(headerStyle)
