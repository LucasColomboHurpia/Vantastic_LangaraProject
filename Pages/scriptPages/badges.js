let badges = [
    {
        badgeName: "Downtown Challenge",
        badgeIcon: "images/Trust_Badges_Icon-2-3.png",
        status: "Not Completed"
    },
    {
        badgeName: "Park Challenge",
        badgeIcon: "images/Trust_Badges_Icon-2-3.png",
        status: "Not Completed"
    },
    {
        badgeName: "Beach Challenge",
        badgeIcon: "images/Trust_Badges_Icon-2-3.png",
        status: "Not Completed"
    },
    {
        badgeName: "Seawall Challenge",
        badgeIcon: "images/Trust_Badges_Icon-2-3.png",
        status: "Not Completed"
    },
    {
        badgeName: "Game Challenge",
        badgeIcon: "images/Trust_Badges_Icon-2-3.png",
        status: "Not Completed"
    },
    {
        badgeName: "Shopping Challenge",
        badgeIcon: "images/Trust_Badges_Icon-2-3.png",
        status: "Not Completed"
    },
    {
        badgeName: "XXX",
        badgeIcon: "images/Trust_Badges_Icon-2-3.png",
        status: "Not Completed"
    },
    {
        badgeName: "XXX",
        badgeIcon: "images/Trust_Badges_Icon-2-3.png",
        status: "Not Completed"
    },

]

for (let i  = 0; i<badges.length; i++) {

    badgesDisplay.innerHTML += `
    <div class="challengeBadge">
        <h3 class="badgeName">${badges[i].badgeName}</h3>
        <div class="badgeImg"><img src="${badges[i].badgeIcon}" alt=""></div>
        <p class="status">${badges[i].status}</p>
    </div>
    `;
    
}
