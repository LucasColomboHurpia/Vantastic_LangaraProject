let badges = [
    {
        badgeName: "Downtown Challenge",
        badgeIcon: "../../Assets/designer-assets/png-icons-badges.png",
        status: "Not Completed"
    },
    {
        badgeName: "Park Challenge",
        badgeIcon: "../../Assets/designer-assets/png-icons-badges.png",
        status: "Not Completed"
    },
    {
        badgeName: "Beach Challenge",
        badgeIcon: "../../Assets/designer-assets/png-icons-badges.png",
        status: "Not Completed"
    },
    {
        badgeName: "Seawall Challenge",
        badgeIcon: "../../Assets/designer-assets/png-icons-badges.png",
        status: "Not Completed"
    },
    {
        badgeName: "Game Challenge",
        badgeIcon: "../../Assets/designer-assets/png-icons-badges.png",
        status: "Not Completed"
    },
    {
        badgeName: "Shopping Challenge",
        badgeIcon: "../../Assets/designer-assets/png-icons-badges.png",
        status: "Not Completed"
    },
    {
        badgeName: "XXX",
        badgeIcon: "../../Assets/designer-assets/png-icons-badges.png",
        status: "Not Completed"
    },
    {
        badgeName: "XXX",
        badgeIcon: "../../Assets/designer-assets/png-icons-badges.png",
        status: "Not Completed"
    },

]

for (let i  = 0; i<badges.length; i++) {

    badgesDisplay.innerHTML += `
    <div class="challengeBadge">
        <div class="badgeImg"><img src="${badges[i].badgeIcon}" alt=""></div>
        <h3 class="badgeName">${badges[i].badgeName}</h3>
        <p class="status">${badges[i].status}</p>
    </div>
    `;
    
}
