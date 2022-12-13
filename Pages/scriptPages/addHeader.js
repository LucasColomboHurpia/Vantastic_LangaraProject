if(typeof firebaseApp !== "undefined"){
    console.log('firebase already works')
}else {
    const firebaseApp = firebase.initializeApp({ 
        apiKey: "AIzaSyAsess0m1wXNwckiyi-Pacj9j6e2K0p30g",
        authDomain: "travel-8561c.firebaseapp.com",
        projectId: "travel-8561c",
        storageBucket: "travel-8561c.appspot.com",
        messagingSenderId: "64893619706",
        appId: "1:64893619706:web:4ba1c29f1c3db3180ce843",
        measurementId: "G-4BXSG6Y8CG"
      });
      // firestore DB initialization
    const db = firebaseApp.firestore();
    console.log(db);

    // firestore auth initialization
    const auth = firebaseApp.auth()

    const signoutUser = () => {

        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            window.location.href='./login.html';
      
          }).catch((error) => {
            // An error happened.
            console.log(error.message);
          });
      }
}

let user = JSON.parse(localStorage.getItem("user"))
let buttonText = 'Logout'
if (user.id == 'guest') { buttonText = 'Login' }

let header = document.createElement("div")
header.classList.add("header")
header.innerHTML = `
<div class="logo" id='logoDiv'> <img src="../Assets/designer-assets/png-logo06.png" alt='logo' class='logoIcon'> </div>
  
<div class="headerOptions">
        <div class="headerHome headerSection"  onclick="window.location.href='./mainPage.html';">Home</div>
        <div class="headerChallenges headerSection" onclick="window.location.href='./challenges.html';">Challenges</div>
        <div class="headerBadges headerSection" onclick="window.location.href='./badges.html';">Badges</div>
        <div class="headerProfile headerSection disabled">Premium</div>
        <div class="hederSetting headerSection " onclick="window.location.href='./profile.html';">Profile</div>
    </div>
    <div class="menuMobileIcon" onclick="loadMobileMenu()"><img src="../Assets/designer-assets/png-icons-hamburguermenu.png" width="50px"/></div>

<div class="loginHeader" onclick="toggleLogin()">${buttonText}</div>

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
<li  onclick="window.location.href='./profile.html';">
    <a id="profileB" >Profile</a>
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

window.addEventListener('resize', checkSize);

function checkSize() {
    let width = document.documentElement.clientWidth;
    let height = document.documentElement.clientHeight;
    let sideBarMenu = document.getElementById('sidebar-menu')

    if (width > 600) {
        sideBarMenu.style.display = 'none'
    }

}

const toggleLogin = () => {
    if(firebase.auth().currentUser){
        console.log('logged in')
        signoutUser();

    } else {
        console.log('logged out')
        window.location.href='./login.html'
    }
}


  