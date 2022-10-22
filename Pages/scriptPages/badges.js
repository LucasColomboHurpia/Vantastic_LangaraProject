localStorage.setItem("lastname", "Smith");
console.log('storage added')

let badges = [
    {
        badgeName: "Downtown Challenge",
        badgeIcon: "../../Assets/default_img.jpg",
        status: "Not Completed"
    },
    {
        badgeName: "Park Challenge",
        badgeIcon: "../../Assets/default_img.jpg",
        status: "Not Completed"
    },
    {
        badgeName: "Beach Challenge",
        badgeIcon: "../../Assets/default_img.jpg",
        status: "Not Completed"
    },
    {
        badgeName: "Seawall Challenge",
        badgeIcon: "../../Assets/default_img.jpg",
        status: "Not Completed"
    },
    {
        badgeName: "Game Challenge",
        badgeIcon: "../../Assets/default_img.jpg",
        status: "Not Completed"
    },
    {
        badgeName: "Shopping Challenge",
        badgeIcon: "../../Assets/default_img.jpg",
        status: "Not Completed"
    },
    {
        badgeName: "XXX",
        badgeIcon: "../../Assets/default_img.jpg",
        status: "Not Completed"
    },
    {
        badgeName: "XXX",
        badgeIcon: "../../Assets/default_img.jpg",
        status: "Not Completed"
    },

]

for (let i  = 0; i<badges.length; i++) {

    badgesDisplay.innerHTML += `
    <div class="challengeBadge">
        <h3 class="badgeName">${badges[i].badgeName}</h3>
        <div class="badgeImg"><img src="${badges[i].badgeIcon}" alt="" width="200px" height="120px"></div>
        <p class="status">${badges[i].status}</p>
    </div>
    `;
    
}
