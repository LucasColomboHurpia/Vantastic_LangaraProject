let header = document.createElement("div")
header.classList.add("header")
header.innerHTML = `
<div class="logo"><img src="../Assets/default_img.jpg" alt="logo" class="logoIcon"></div>
    <div class="headerOptions">
        <div class="headerHome headerSection"  onclick="window.location.href='./mainPage.html';">Home</div>
        <div class="headerChallenges headerSection" onclick="window.location.href='./challenges.html';">Challenges</div>
        <div class="headerBadges headerSection" onclick="window.location.href='./badges.html';">Badges</div>
        <div class="headerProfile headerSection">Profile</div>
        <div class="hederSetting headerSection">Settings</div>
    </div>
<div class="loginHeader">Login</div>
`


let headerString = `
<div class="header">
<div class="logoHeader"><img src="../Assets/default_img.jpg" alt="logo" class="logoIcon"></div>
<div class="headerOptions">
  <div class="headerHome headerSection"  onclick="window.location.href='./mainPage.html';">Home</div>
  <div class="headerChallenges headerSection" onclick="window.location.href='./challenges.html';">Challenges</div>
  <div class="headerBadges headerSection" onclick="window.location.href='./badges.html';">Badges</div>
  <div class="headerProfile headerSection">Profile</div>
  <div class="hederSetting headerSection">Settings</div>
</div>
<div class="loginHeader">Login</div>
</div>

<!--- /////////////////////////////////////////////////////// --->
`

document.body.prepend(header)


let headerStyle  = document.createElement('link');
headerStyle.rel  = 'stylesheet';
headerStyle.type = 'text/css';
headerStyle.href = './stylePages/header.css';
document.body.append(headerStyle)