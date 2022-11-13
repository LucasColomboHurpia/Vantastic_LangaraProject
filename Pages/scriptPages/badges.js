//GET INFO FROM LOCAL STORAGE
let badges = JSON.parse(localStorage.getItem("badges"));

for (let i = 0; i < badges.length; i++) {
    let completed = false;

    for (badgesID of user.badges) {
        if (badges[i].relation == badgesID) {
            completed = true
        }
    }
    if (completed) {
        badgesDisplay.innerHTML += `
        <div class="challengeBadgeCompleted">
            <div class="badgeImg"><img src="${badges[i].badgeIcon}" alt=""></div>
            <h3 class="badgeName">${badges[i].badgeName}</h3>
            <p class="status">${badges[i].status}</p>
        </div>
        `;
    } else {

        badgesDisplay.innerHTML += `
            <div class="challengeBadge">
                <div class="badgeImg"><img src="${badges[i].badgeIcon}" alt=""></div>
                <h3 class="badgeName">${badges[i].badgeName}</h3>
                <p class="status">${badges[i].status}</p>
            </div>
            `;
    }
}

