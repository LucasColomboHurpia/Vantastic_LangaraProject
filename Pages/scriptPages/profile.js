

let username = "Guest";

 firebase.auth().onAuthStateChanged((user) => {
   if (user) {
     // User is signed in, see docs for a list of available properties
     // https://firebase.google.com/docs/reference/js/firebase.User
     username = user.userName;
     profile_pic_container.innerHTML = `
     <div class="profile_picture"><img src="../Assets/designer-assets/png-icons-profile.png"  class="user_pic" alt="user_pic"></div>
     <div class="username"><p>${user.userName}</p></div>
     `;
   } else {
     // User is signed out
     // ...
   }
 });


profile_pic_container.innerHTML = `
<div class="profile_picture"><img src="../Assets/designer-assets/png-icons-profile.png"  class="user_pic" alt="user_pic"></div>
<div class="username"><p>${user.userName}</p></div>
`;

badgesEarned.innerHTML= `

<div class="badge_pic"><img src="../Assets/designer-assets/png-icons-badges.png" class="badge_pic" alt="badge"></div>
<hr>
<div id="badges" class="badges"> See all your badges 
<br></div>
`

let n = '75px'

let badges = JSON.parse(localStorage.getItem("badges"));

for (let i = 0; i < badges.length; i++) {
    let completed = false;

    for (badgesID of user.badges) {
        if (badges[i].relation == badgesID) {
            completed = true
        }
    }

    let badgesDiv = document.getElementById('badges');
    if (completed) {
        badgesDiv.innerHTML += `<img src="${badges[i].badgeIcon}" alt="badge" width=${n} height=${n}>`
    } else {
    }
}