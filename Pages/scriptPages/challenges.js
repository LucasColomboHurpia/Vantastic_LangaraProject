let newChallenge = [
    {
        id: 0,
        img: "../../Assets/designer-assets/jpg-sunset-2.jpg",
        name: "Downtown Challenge",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit atque magnam unde exercitationem possimus harum sint adipisci in cupiditate delectus.",
        info1: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, quisquam.",
        info2: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, quisquam."

    },

    {
        id: 1,
        img: "../../Assets/designer-assets/jpg-sunset-3.jpg",
        name: "Park Challenge",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit atque magnam unde exercitationem possimus harum sint adipisci in cupiditate delectus.",
        info1: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, quisquam.",
        info2: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, quisquam."

    },
    {
        id: 2,
        img: "../../Assets/designer-assets/jpg-sunset-1.jpg",
        name: "Beach Challenge",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit atque magnam unde exercitationem possimus harum sint adipisci in cupiditate delectus.",
        info1: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, quisquam.",
        info2: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, quisquam."

    }
]

let downtownChallenge = [
    {
        img: "../../Assets/designer-assets/png-icons-uploadpicture.png",
        activity: "Drink Coffee",
        activity_desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse minus est animi eius, perferendis nostrum ipsum porro. Nesciunt, dignissimos ex.",
    },
    {
        img: "../../Assets/designer-assets/png-icons-uploadpicture.png",
        activity: "Drink Beer",
        activity_desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse minus est animi eius, perferendis nostrum ipsum porro. Nesciunt, dignissimos ex.",
    },
    {
        img: "../../Assets/designer-assets/png-icons-uploadpicture.png",
        activity: "Walk by English Bay",
        activity_desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse minus est animi eius, perferendis nostrum ipsum porro. Nesciunt, dignissimos ex.",
    }
]

let parkChallenge = [
    {
        img: "../../Assets/designer-assets/png-icons-uploadpicture.png",
        activity: "Walk to the river",
        activity_desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse minus est animi eius, perferendis nostrum ipsum porro. Nesciunt, dignissimos ex.",
    },
    {
        img: "../../Assets/designer-assets/png-icons-uploadpicture.png",
        activity: "Click pic with a tree",
        activity_desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse minus est animi eius, perferendis nostrum ipsum porro. Nesciunt, dignissimos ex.",
    },
    {
        img: "../../Assets/designer-assets/png-icons-uploadpicture.png",
        activity: "Click pic with a bird nest",
        activity_desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse minus est animi eius, perferendis nostrum ipsum porro. Nesciunt, dignissimos ex.",
    }
]



for (let i=0; i<newChallenge.length; i++) {
    displayChallenge.innerHTML += `
<div class="challenge">
    <div class="challengeStart">
        <div ><img class="challengeImage" src="${newChallenge[i].img}" alt="start" id="clickChallenge"></a></div>
        <div class="start_link"><p onclick="challengeActivity('${newChallenge[i].name}')">START</p></div>
    </div>
    <div class="challengeInfo">
        <h3>${newChallenge[i].name}</h3>
        <div id="challengeDesc">
            <p>
            ${newChallenge[i].description}
            </p>
            <ul>
                <li>${newChallenge[i].info1}</li>
                <li>${newChallenge[i].info2}</li>
            </ul>
        </div>
    </div>
</div>
<hr>
`
}

const challengeActivity = (name) => {

    let challengeName = name;
    console.log(challengeName)

    document.querySelector('h1').innerText = name;
    // document.getElementById('backButton').style.display = none;
    document.getElementById('challengeFilter').remove();
    const activity = document.createElement('h2');
    activity.innerHTML = "Activities:"
    document.body.insertBefore(activity, document.getElementById('displayChallenge'));

    if(displayChallenge.innerHTML !== "") {
        displayChallenge.innerHTML = "";
    }

    if(challengeName === "Downtown Challenge") {

        for( let j = 0; j < downtownChallenge.length; j++) {

                displayChallenge.innerHTML += `
                <div class="actualChallengeContainer">
                    <div class="camera"><img class="challengeImage" src="${downtownChallenge[j].img}" alt="camera"></div>
                    <div class="activityInfo">
                        <h3>${downtownChallenge[j].activity}</h3>
                        <p>${downtownChallenge[j].activity_desc}.</p>
                    </div>
                    <div><button id="route">See Route</button></div>
                </div>
                    `
        }
    }

    else if (challengeName === "Park Challenge") {
        for( let j = 0; j < parkChallenge.length; j++) {
            displayChallenge.innerHTML += `
            <div class="actualChallengeContainer">
                <div class="camera"><img class="challengeImage" src="${parkChallenge[j].img}" alt="camera"></div>
                <div class="activityInfo">
                    <h3>${parkChallenge[j].activity}</h3>
                    <p>${parkChallenge[j].activity_desc}.</p>
                </div>
                <div><button id="route">See Route</button></div>
            </div>
                `
        }
    }
}
