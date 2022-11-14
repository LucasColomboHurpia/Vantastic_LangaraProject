let user = JSON.parse(localStorage.getItem("user"))
let buttonText = 'Logout'
if (user.userName == 'Guest') { buttonText = 'Login' }

let header = document.createElement("div")
header.classList.add("header")
header.innerHTML = `
<div class="logo" id='logoDiv'> <img src="../Assets/designer-assets/png-logo06.png" alt='logo' class='logoIcon'> </div>
  
<div class="headerOptions">
        <div class="headerHome headerSection"  onclick="window.location.href='./mainPage.html';">Home</div>
        <div class="headerChallenges headerSection" onclick="window.location.href='./challenges.html';">Challenges</div>
        <div class="headerBadges headerSection" onclick="window.location.href='./badges.html';">Badges</div>
        <div class="headerProfile headerSection disabled">Find Places</div>
        <div class="hederSetting headerSection disabled">Profile</div>
    </div>
    <div class="menuMobileIcon" onclick="loadMobileMenu()"><img src="../Assets/designer-assets/png-icons-hamburguermenu.png" width="50px"/></div>

<div class="loginHeader" onclick="window.location.href='./login.html';">${buttonText}</div>

`

document.body.prepend(header)

let headerStyle = document.createElement('link');
headerStyle.rel = 'stylesheet';
headerStyle.type = 'text/css';
headerStyle.href = './stylePages/header.css';
document.body.append(headerStyle)

const loadMobileMenu = () => {
    openMenu();
}

let sideBarMenu = document.createElement('div');
sideBarMenu.id = 'sidebar-menu'
sideBarMenu.innerHTML = `
<div class="logo">
<span class="close" id="close" onclick="closeMenu();">&times;</span>
<img src="../Assets/designer-assets/png-logo03.png" alt="logo03">
</div>
<ul>
<li onclick="window.location.href='./mainPage.html';">
    <a id="homeB" >Home</a>
    <img src="../Assets/designer-assets/png-icons-home-small.png" alt="home button">
</li>
<li onclick="window.location.href='./challenges.html';">
    <a id="challengeB" >Challenges</a>
    <img src="../Assets/designer-assets/png-icons-challenges-small.png" alt="challenges button">
</li>
<li onclick="window.location.href='./badges.html';">
    <a id="badgeB" >Badges</a>
    <img src="../Assets/designer-assets/png-icons-badges-small.png" alt="badges button">
</li>
<li>
    <a id="profileB" class="disabled">Profile</a>
    <img src="../Assets/designer-assets/png-icons-profile-small.png" alt="profile button">
</li>

<div id="img-end">
    <img src="../Assets/designer-assets/png-explorer02.png" alt="">
</div>
</ul>
`

document.body.append(sideBarMenu)


//---------------------------------------
const openMenu = () => {
    let sideBarMenu = document.getElementById('sidebar-menu')
    sideBarMenu.style.display = 'flex'
}
const closeMenu = () => {
    let sideBarMenu = document.getElementById('sidebar-menu')
    sideBarMenu.style.display = 'none'
}
//---------------------------------------
//    visibility: hidden;

window.addEventListener('resize', checkSize);

function checkSize() {
    let width = document.documentElement.clientWidth;
    let height = document.documentElement.clientHeight;
    let sideBarMenu = document.getElementById('sidebar-menu')

    if (width > 600) {
        sideBarMenu.style.display = 'none'
    }

}